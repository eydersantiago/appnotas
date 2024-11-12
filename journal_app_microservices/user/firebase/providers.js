import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { firebaseAuth } from "./config.js";

// const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  console.log("🚀 ~ googleProvider:", googleProvider);
  try {
    const result = await signInWithPopup(firebaseAuth, googleProvider);
    console.log("🚀 ~ signInWithGoogle ~ result:", result);
    const { displayName, email, photoURL, uid } = result.user;

    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid,
    };
  } catch (error) {
    const errorMessage = error.message;

    return {
      ok: false,
      errorMessage,
    };
  }
};

export const registerUserWithEmailPassword = async ({
  displayName,
  email,
  password,
}) => {
  try {
    const resp = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    const { uid, photoURL } = resp.user;
    await updateProfile(firebaseAuth.currentUser, { displayName });

    return {
      ok: true,
      uid,
      photoURL,
      email,
      password,
    };
  } catch (error) {
    const errorMessage = error.message;

    return {
      ok: false,
      errorMessage: errorMessage,
    };
  }
};

export const loginWithEmailPassword = async ({ email, password }) => {

  try {
    const resp = await signInWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    const { displayName, photoURL, uid } = resp.user;

    return {
      ok: true,
      uid,
      photoURL,
      email,
      displayName,
    };
  } catch (error) {
    console.log("🚀 ~ loginWithEmailPassword ~ error:", error)
    const errorMessage = error.message;

    return {
      ok: false,
      errorMessage: errorMessage,
    };
  }
};

export const logoutFirebase = async () => {
  return await firebaseAuth.signOut();
};
