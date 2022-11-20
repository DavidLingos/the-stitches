import React, { useContext, createContext, useEffect } from 'react';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { FirebaseAuth, useFirebaseAuth } from './auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import qs from 'qs';
import { Firestore, getFirestore } from 'firebase/firestore';

interface FirebaseContextValue {
  app: FirebaseApp;
  auth: FirebaseAuth;
  db: Firestore;
}

const FirebaseContext = createContext<FirebaseContextValue>({} as FirebaseContextValue);

export const FirebaseContextProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const app = initializeApp({
    apiKey: 'AIzaSyB8MVknIURUvx02l52XjYnRTLw6tx2tMsg',
    authDomain: 'the-stitches.firebaseapp.com',
    databaseURL: 'https://the-stitches-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'the-stitches',
    storageBucket: 'the-stitches.appspot.com',
    messagingSenderId: '175093107859',
    appId: '1:175093107859:web:4b7a590cb66bcd8cb4d166',
    measurementId: 'G-13MBMS1YTE',
  });
  const db = getFirestore(app);
  const auth = useFirebaseAuth(app, db);
  const [user, loading] = useAuthState(auth.auth);

  useEffect(() => {
    if (!user && !loading) {
      navigate(`/login?redirectUrl=${location.pathname}`);
    } else if (user) {
      const redirectUrl = qs.parse(location.search, { ignoreQueryPrefix: true }).redirectUrl as string;
      if (redirectUrl) {
        navigate(redirectUrl);
      }
    }
  }, [user, loading]);

  if (loading) {
    return <>Loading...</>;
  }

  return <FirebaseContext.Provider value={{ app, auth, db }}>{children}</FirebaseContext.Provider>;
};

export const useFirebase = () => useContext(FirebaseContext);
