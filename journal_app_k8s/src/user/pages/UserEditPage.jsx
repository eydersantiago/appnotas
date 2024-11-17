import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserThunk } from '../store/user/thunks';
import UserFormView from '../views/UserFormView';
import '../styles/userCreate.css'; // Importar estilos si es necesario

const UserEditPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleUserSubmit = (formData) => {
    dispatch(updateUserThunk(formData));
  };

  if (!user) {
    return <p>No se encontró el usuario.</p>;
  }

  return (
    <div className="user-edit-container">
      <h2>Editar Información</h2>
      <UserFormView initialData={user} onSubmit={handleUserSubmit} />
    </div>
  );
};

export default UserEditPage;
