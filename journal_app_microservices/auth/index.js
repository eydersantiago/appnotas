import authRoutes from './routes/authRoutes.js';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import './firebase/config.js';

import fetch from 'node-fetch';
globalThis.fetch = fetch;

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`AUTH: Servidor escuchando en el puerto ${PORT}`);
});
