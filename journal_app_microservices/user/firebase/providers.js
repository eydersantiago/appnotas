import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { firebaseAuth, firebaseDB } from "./config.js";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

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

export const getAllUsers = async () => {
  try {
    const usersCollection = collection(firebaseDB, "user");
    console.log("Obteniendo usuarios de Firestore...");
    const usersSnapshot = await getDocs(usersCollection);
    const users = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log("Usuarios obtenidos:", users);
    return {
      ok: true,
      users,
    };
  } catch (error) {
    console.error("Error al obtener usuarios de Firebase:", error.message);
    return {
      ok: false,
      errorMessage: error.message,
    };
  }
};

export const getCurrentUser = async () => {
  try {
    const user = firebaseAuth.currentUser; // Obtiene el usuario actual autenticado
    if (!user) {
      return {
        ok: false,
        errorMessage: "No user is currently logged in.",
      };
    }

    const { uid, email, displayName, photoURL } = user;

    return {
      ok: true,
      uid,
      email,
      displayName,
      photoURL,
    };
  } catch (error) {
    return {
      ok: false,
      errorMessage: error.message,
    };
  }
};
