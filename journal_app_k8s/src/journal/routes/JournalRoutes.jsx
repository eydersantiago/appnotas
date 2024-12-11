import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { JournalPage } from '../pages/JournalPage';
import { UserInfoPage } from '../../user/components/UserInfoPage'; //en la espera de crearse

export const JournalRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<JournalPage />} />
            <Route path='/user/user-info' element={<UserInfoPage />} />
            <Route path='/*' element={<Navigate to='/' />} />
        </Routes>
    );
};
//Se añade la ruta, para que cuando el usuario de clic en la tuerca de opciones al lado 
//del nombre del usuario, redirija a componente UserInfoPage