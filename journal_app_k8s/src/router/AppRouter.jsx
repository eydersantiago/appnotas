import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { useCheckAuth } from '../hooks';
import { JournalRoutes } from '../journal/routes/JournalRoutes';
import { UserRoutes } from '../user/routes/UserRoutes'; // Importa las rutas de usuario
import { CheckingAuth } from '../ui/';

export const AppRouter = () => {

    const { status } = useCheckAuth();

    if (status === 'checking') {
        return <CheckingAuth />;
    }

    return (
        <Routes>
            {
                status === 'authenticated'
                    ? (
                        <>
                            {/* Rutas para usuarios autenticados */}
                            <Route path="/*" element={<JournalRoutes />} />
                            <Route path="/user/*" element={<UserRoutes />} /> {/* Añadido */}
                        </>
                    )
                    : (
                        // Rutas para usuarios no autenticados
                        <Route path="/auth/*" element={<AuthRoutes />} />
                    )
            }

            {/* Redirección por defecto */}
            <Route path="/*" element={<Navigate to="/auth/login" />} />
        </Routes>
    );
};
