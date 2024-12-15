const express = require('express');
const cors = require('cors'); // Importar CORS
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const journalRoutes = require('./routes/journalRoutes')
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Habilitar CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000', // Cambia según el dominio del frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Permitir el envío de cookies o encabezados de autenticación
}));

app.use(express.json());

// Rutas
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/journal', journalRoutes);

// Middleware de errores
app.use(errorHandler);

module.exports = app;



// const express = require('express');
// const authRoutes = require('./routes/authRoutes');
// const errorHandler = require('./middlewares/errorHandler');

// const app = express();
// app.use(express.json());

// // Rutas
// app.use('/auth', authRoutes);

// // Middleware de errores
// app.use(errorHandler);

// module.exports = app;