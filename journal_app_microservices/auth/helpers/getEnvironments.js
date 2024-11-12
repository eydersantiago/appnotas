import dotenv from 'dotenv';
dotenv.config();

export const getEnvironments = () => {
  return {
    VITE_APIKEY: process.env.VITE_APIKEY,
    VITE_AUTHDOMAIN: process.env.VITE_AUTHDOMAIN,
    VITE_PROJECTID: process.env.VITE_PROJECTID,
    VITE_STORAGEBUCKET: process.env.VITE_STORAGEBUCKET,
    VITE_MESSAGINGSENDERID: process.env.VITE_MESSAGINGSENDERID,
    VITE_APPID: process.env.VITE_APPID,
    VITE_MEASUREMENTID: process.env.VITE_MEASUREMENTID,
  };
};
