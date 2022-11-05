import { FirebaseApp } from 'firebase/app';
import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from 'firebase/auth';
import { addDoc, collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

export interface FirebaseAuth {
  auth: Auth;
  user: User | null | undefined;
  isAuthStateLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  logInWithEmailAndPassword: (email: string, password: string) => Promise<void>;
  registerWithEmailAndPassword: (name: string, email: string, password: string) => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
  logout: () => void;
}

export const useFirebaseAuth = (app: FirebaseApp): FirebaseAuth => {
  const auth = getAuth(app);
  const db = getFirestore(app);
  const googleProvider = new GoogleAuthProvider();
  const [user, isAuthStateLoading] = useAuthState(auth);

  const signInWithGoogle = async () => {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, 'users'), where('uid', '==', user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        name: user.displayName,
        authProvider: 'google',
        email: user.email,
      });
    }
  };

  const logInWithEmailAndPassword = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const registerWithEmailAndPassword = async (name: string, email: string, password: string) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      name,
      authProvider: 'local',
      email,
    });
  };

  const sendPasswordReset = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  const logout = () => {
    signOut(auth);
  };

  return {
    auth,
    user,
    isAuthStateLoading,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
  };
};
