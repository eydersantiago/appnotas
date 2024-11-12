import userRoutes from './routes/userRoutes.js';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import './firebase/config.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/user', userRoutes);

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
    console.log(`USER: Servidor escuchando en el puerto ${PORT}`);
});
