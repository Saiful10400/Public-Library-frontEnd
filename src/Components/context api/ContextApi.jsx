import React, { createContext, useEffect, useState } from "react";
import {
  signOut,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase";
export const dataProvider = createContext(null);
const ContextApi = ({ children }) => {
  // is user on the loading state.
  const [loading, setLoading] = useState(true);

  // get user after successfull signin
  const [person, setPerson] = useState(null);
useEffect(()=>{
    const unsubscribe=onAuthStateChanged(auth,(user)=>{
        setPerson(user)
        setLoading(false)
    })
    return ()=>unsubscribe
},[])

  // all necessary login credentials is here.................

  // 1.logout handle.
  const logoutHandle = () => {
    return signOut(auth);
  };
  // 2.google login.
  const googleLoginHandle = () => {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithRedirect(auth, googleAuthProvider);
  };
  // 3.signup with e-mail and password.
  const emailAndPasswordsignup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // 4.signin with email and password.
  const login=(email,password)=>{
    return signInWithEmailAndPassword(auth,email,password)
  }

  const contextData = {
    logoutHandle,
    googleLoginHandle,
    emailAndPasswordsignup,
    person,loading,login
  };
  return (
    <dataProvider.Provider value={contextData}>
      {children}
    </dataProvider.Provider>
  );
};

export default ContextApi;
