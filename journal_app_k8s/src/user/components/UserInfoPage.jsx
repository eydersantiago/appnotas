import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startFetchingUsers, startFetchingCurrentUser } from '../../store/user';

export const UserInfoPage = () => {
    const dispatch = useDispatch();

    // Selecciona el estado del store
    const { users = [], currentUser } = useSelector((state) => state.user); // Asegura que `users` tenga un valor predeterminado como array vacío

    // Llama a los thunks para obtener los datos al montar el componente
    useEffect(() => {
        dispatch(startFetchingUsers());
        dispatch(startFetchingCurrentUser());
    }, [dispatch]);

    return (
        <div>
            <h1>Información del Usuario</h1>
            
            <h2>Usuario Actual</h2>
            {currentUser ? (
                <div>
                    <p><strong>Nombre:</strong> {currentUser.displayName || 'N/A'}</p>
                    <p><strong>Email:</strong> {currentUser.email}</p>
                    <p><strong>UID:</strong> {currentUser.uid}</p>
                    <img 
                        src={currentUser.photoURL || 'https://via.placeholder.com/150'} 
                        alt="Foto del Usuario" 
                        width="150"
                    />
                </div>
            ) : (
                <p>Cargando información del usuario actual...</p>
            )}

            <h2>Lista de Todos los Usuarios</h2>
            {users.length > 0 ? (
                <ul>
                    {users.map((user) => (
                        <li key={user.id}>
                            <p><strong>Nombre:</strong> {user.name || 'N/A'}</p>
                            <p><strong>Email:</strong> {user.email || 'N/A'}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay usuarios disponibles.</p>
            )}

        </div>
    );
};
