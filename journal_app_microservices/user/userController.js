import {
  registerUserWithEmailPassword,
  signInWithGoogle
} from "./firebase/providers.js";

export const startGoogleSignIt = async (req, res) => {
  res.status(200).json({
    ok: false
  });

};

export const creatingUserWithEmailPassword = async (req, res) => {

  const { email, password, displayName } = req.body;

  try {
    const { ok, uid, photoURL, errorMessage } =
      await registerUserWithEmailPassword({ displayName, email, password });
    res.status(200).json({ ok, displayName, photoURL, uid, errorMessage });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
