import React from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import UserProfilePage from '../pages/UserProfilePage';
import UserEditPage from '../pages/UserEditPage';

export const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<UserProfilePage />} />
      <Route path="/edit" element={<UserEditPage />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};
