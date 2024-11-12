import journalRoutes from './routes/journalRoutes.js';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import './firebase/config.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/journal', journalRoutes);

const PORT = process.env.PORT || 4002;
app.listen(PORT, () => {
    console.log(`JOURNAL: Servidor escuchando en el puerto ${PORT}`);
});
