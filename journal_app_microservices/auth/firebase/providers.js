import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { firebaseAuth } from "./config.js";
import { onAuthStateChanged } from "firebase/auth";

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

export const getAuthenticatedUser = async (req, res) => {

  try {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        res.status(200).json({ user });
      } else {
        res.status(401).json({ error: "El usuario no se ha autenticado" });
      }
    });
  } catch (error) {
    res.status(401).json({ error: "El usuario no se ha autenticado" });
  }
};