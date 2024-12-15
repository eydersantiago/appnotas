import authRoutes from './routes/authRoutes.js';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import fetch from 'node-fetch';
import promClient from 'prom-client';

globalThis.fetch = fetch;
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Registro global de métricas
const register = new promClient.Registry();

// Colección de métricas por defecto (GC, CPU, memoria, etc.)
promClient.collectDefaultMetrics({
    register,
    prefix: 'auth_service_'
});

// Ruta de métricas
app.get('/metrics', async (req, res) => {
    try {
        res.set('Content-Type', register.contentType);
        res.end(await register.metrics());
    } catch (ex) {
        res.status(500).end(ex);
    }
});

app.use('/auth', authRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`AUTH: Servidor escuchando en el puerto ${PORT}`);
});