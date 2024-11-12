// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
import { getEnvironments } from "../helpers/getEnvironments";

const {
  VITE_APIKEY,
  VITE_AUTHDOMAIN,
  VITE_PROJECTID,
  VITE_STORAGEBUCKET,
  VITE_MESSAGINGSENDERID,
  VITE_APPID,
  VITE_MEASUREMENTID
} = getEnvironments();

//Variables de entorno Fronted
//console.log(import.meta.env)

//Variables de entorno Backend
//console.log(process.env);

//Dev/Prod
/* const firebaseConfig = {
    apiKey: "AIzaSyCpzY7-eG_lF0akHK2Fo0GRlSerlwUsRug",
    authDomain: "journalapp-8b365.firebaseapp.com",
    projectId: "journalapp-8b365",
    storageBucket: "journalapp-8b365.appspot.com",
    messagingSenderId: "185235316767",
    appId: "1:185235316767:web:c9e6bd48bd5f2159a2752a"
}; */

//Testing
/* const firebaseConfig = {
  apiKey: "AIzaSyAMVeO_PwcNgVseFb9q2HTlE0vYa3zCqlc",
  authDomain: "journalapp-testing-b0c73.firebaseapp.com",
  projectId: "journalapp-testing-b0c73",
  storageBucket: "journalapp-testing-b0c73.appspot.com",
  messagingSenderId: "402107802313",
  appId: "1:402107802313:web:efef06d2a09a5180de2318",
  measurementId: "G-JE24DG4XHY"
  }; */

const firebaseConfig = {
  apiKey: VITE_APIKEY,
  authDomain: VITE_AUTHDOMAIN,
  projectId: VITE_PROJECTID,
  storageBucket: VITE_STORAGEBUCKET,
  messagingSenderId: VITE_MESSAGINGSENDERID,
  appId: VITE_APPID,
  measurementId: VITE_MEASUREMENTID,
};

console.log(firebaseConfig)


export const firebaseApp = initializeApp(firebaseConfig); //inicializar firebase
export const firebaseAuth = getAuth(firebaseApp); //funcionalidades de autenticacion
export const firebaseDB = getFirestore(firebaseApp); //configuracion de base de datos

