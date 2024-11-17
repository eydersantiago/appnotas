import React from 'react';
import UserDetailView from '../views/UserDetailView';

const UserDetailPage = ({ user }) => {
  return (
    <div className="user-detail-container">
      <h2>Detalle del Usuario</h2>
      <UserDetailView user={user} />
    </div>
  );
};

export default UserDetailPage;
