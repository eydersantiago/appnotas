import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { UserInfoPage } from '../components/UserInfoPage'; // Asegúrate de que esta ruta sea correcta
//import { UserListPage } from './components/UserListPage'; // Una página adicional para listar usuarios (opcional)

export const UserRoutes = () => {
    return (
        <Routes>
            {/* Ruta para la información del usuario actual */}
            <Route path="/user-info" element={<UserInfoPage />} />

            {/* Ruta para listar todos los usuarios
            <Route path="/user-list" element={<UserListPage />} /> */}
        </Routes>
    );
};
