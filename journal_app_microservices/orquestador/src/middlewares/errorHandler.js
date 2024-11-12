const errorHandler = (err, req, res, next) => {
    console.error(err.message || 'Error interno');
    res.status(500).json({ error: err.message || 'Error interno del servidor' });
  };
  
  module.exports = errorHandler;