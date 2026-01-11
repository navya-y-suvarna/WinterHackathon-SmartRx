import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";

import { auth } from "../firebase/firebaseConfig";

// Email/Password Signup
export const signupWithEmail = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

// Email/Password Login
export const loginWithEmail = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

// Google Login
const googleProvider = new GoogleAuthProvider();
export const loginWithGoogle = () =>
  signInWithPopup(auth, googleProvider);

// Logout
export const logoutUser = () => signOut(auth);

// Auth listener
export const onAuthChange = (callback) =>
  onAuthStateChanged(auth, callback);

// 🔐 Forgot Password
export const resetPassword = (email) =>
  sendPasswordResetEmail(auth, email);