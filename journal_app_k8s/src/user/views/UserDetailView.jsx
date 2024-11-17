import React from 'react';

const UserDetailView = ({ user }) => {
  return (
    <div className="user-detail-view">
      <p><strong>Nombre:</strong> {user.nombre}</p>
      <p><strong>Apellido:</strong> {user.apellido}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Dirección:</strong> {user.direccion}</p>
      <p><strong>Fecha de Nacimiento:</strong> {user.birthDate}</p>
      <p><strong>Número de Celular:</strong> {user.numCelular}</p>
    </div>
  );
};

export default UserDetailView;
