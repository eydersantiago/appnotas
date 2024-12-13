import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startFetchingUsers, startFetchingCurrentUser } from '../../store/user';
import '../styles/userInfo.css';


export const UserInfoPage = () => {
    const dispatch = useDispatch();

    // Selecciona el estado del store
    const { users = [], currentUser } = useSelector((state) => state.user); // Asegura que `users` tenga un valor predeterminado como array vacío

    const { displayName, email, uid } = useSelector(state => state.auth);

    // Llama a los thunks para obtener los datos al montar el componente
    useEffect(() => {
        dispatch(startFetchingUsers());
        dispatch(startFetchingCurrentUser());
    }, [dispatch]);

    return (
        <div className="container">
            <h1>Información del Usuario</h1>
            
            <h2>Usuario Actual</h2>
            <div className="user-info">
                {displayName ? (
                    <div>
                        <p><strong>Nombre:</strong> {displayName}</p>
                        <p><strong>Email:</strong> {email}</p>
                        <p><strong>UID:</strong> {uid}</p>
                    </div>
                ) : (
                    <p>No hay usuario autenticado.</p>
                )}
            </div>

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
