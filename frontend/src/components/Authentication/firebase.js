// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import React, { useState,useEffect } from 'react'; 
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGwdNT5V2s1Y8Wpfdv6tXcu33GTBplYz0",
  authDomain: "mp2-auth.firebaseapp.com",
  projectId: "mp2-auth",
  storageBucket: "mp2-auth.appspot.com",
  messagingSenderId: "723715926031",
  appId: "1:723715926031:web:2c178dc461aa22d796db7a",
  measurementId: "G-3GTVJGKRW8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

export function signUp(email,password){
    return createUserWithEmailAndPassword(auth,email,password);

}

export function logOut(){
  return signOut(auth);

}
export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function useAuth()
{
  const [currentUser, setCurrentUser] = useState()

  useEffect(() => {
     const unsub = onAuthStateChanged(auth,(user)=> setCurrentUser(user))
    return unsub;
  
  }, []) 

  return currentUser;


}