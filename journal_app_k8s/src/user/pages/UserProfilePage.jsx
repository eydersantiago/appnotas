import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../store/user/thunks';
import { useNavigate } from 'react-router-dom';
import '../styles/userCreate.css'; // Importar los estilos específicos

const UserProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUser()); // Obtener información del usuario al montar el componente
  }, [dispatch]);

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  if (!user) {
    return <p>No se encontró el usuario.</p>;
  }

  return (
    <div className="user-profile-container">
      <h2>Perfil de Usuario</h2>
      <p><strong>Nombre:</strong> {user.nombre}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <button onClick={() => navigate('/edit')} className="edit-button">
        Editar Información
      </button>
    </div>
  );
};

export default UserProfilePage;
