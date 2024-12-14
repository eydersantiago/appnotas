import CircuitBreaker from 'opossum';
import { loginWithEmailPassword } from './firebase/providers.js';

// Función que llama a Firebase para autenticar al usuario
async function authenticateWithEmailPassword({ email, password }) {
  try {
    const { ok, displayName, photoURL, uid, errorMessage } =
      await loginWithEmailPassword({ email, password });
    return { ok, displayName, photoURL, uid, errorMessage };
  } catch (error) {
    throw new Error('Firebase authentication failed: ' + error.message);
  }
}

// Configuración del Circuit Breaker
const options = {
  timeout: 3000, // Tiempo máximo para la llamada
  errorThresholdPercentage: 50, // Umbral de fallos para abrir el circuito
  resetTimeout: 10000, // Tiempo para intentar reabrir el circuito
};

const authCircuitBreaker = new CircuitBreaker(authenticateWithEmailPassword, options);

// Fallback en caso de que el Circuit Breaker esté abierto
authCircuitBreaker.fallback(() => {
  throw new Error('El servicio de autenticación está temporalmente fuera de servicio');
});

export default authCircuitBreaker;
