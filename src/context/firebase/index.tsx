import React, { useContext, createContext } from 'react';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { FirebaseAuth, useFirebaseAuth } from './auth';

interface FirebaseContextValue {
  app: FirebaseApp;
  auth: FirebaseAuth;
}

const FirebaseContext = createContext<FirebaseContextValue>({} as FirebaseContextValue);

export const FirebaseContextProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
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
  const auth = useFirebaseAuth(app);

  return <FirebaseContext.Provider value={{ app, auth }}>{children}</FirebaseContext.Provider>;
};

export const useFirebase = () => useContext(FirebaseContext);
