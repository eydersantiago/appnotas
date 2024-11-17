import { useEffect, useMemo, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:4001/user"; // Ajusta la URL según tu entorno

export const useUsers = (initialUser = {}, userValidations = {}) => {
    const [formState, setFormState] = useState(initialUser);
    const [formValidation, setFormValidation] = useState({});
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        createValidators();
    }, [formState]);

    useEffect(() => {
        setFormState(initialUser);
    }, [initialUser]);

    // Validar si el formulario es válido
    const isFormValid = useMemo(() => {
        for (const formValue of Object.keys(formValidation)) {
            if (formValidation[formValue] !== null) {
                return false;
            }
        }
        return true;
    }, [formValidation]);

    // Manejar cambios en los inputs
    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    // Resetear el formulario
    const handleReset = () => {
        setFormState(initialUser);
    };

    // Crear validaciones
    const createValidators = () => {
        const formCheckValues = {};
        for (const formField of Object.keys(userValidations)) {
            const [fn, errorMessage] = userValidations[formField];
            formCheckValues[`${formField}Valid`] = fn(formState[formField])
                ? null
                : errorMessage;
        }
        setFormValidation(formCheckValues);
    };

    // Obtener lista de usuarios
    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${API_URL}/list`);
            setUsers(response.data);
        } catch (err) {
            setError(err.response?.data?.message || "Error al cargar usuarios");
        } finally {
            setLoading(false);
        }
    };

    // Crear un nuevo usuario
    const createUser = async (newUser) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(`${API_URL}/register`, newUser);
            setUsers((prevUsers) => [...prevUsers, response.data]);
        } catch (err) {
            setError(err.response?.data?.message || "Error al crear el usuario");
        } finally {
            setLoading(false);
        }
    };

    // Actualizar un usuario existente
    const updateUser = async (id, updatedUser) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.put(`${API_URL}/${id}`, updatedUser);
            setUsers((prevUsers) =>
                prevUsers.map((user) => (user.id === id ? response.data : user))
            );
        } catch (err) {
            setError(err.response?.data?.message || "Error al actualizar el usuario");
        } finally {
            setLoading(false);
        }
    };

    // Eliminar un usuario
    const deleteUser = async (id) => {
        setLoading(true);
        setError(null);
        try {
            await axios.delete(`${API_URL}/${id}`);
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        } catch (err) {
            setError(err.response?.data?.message || "Error al eliminar el usuario");
        } finally {
            setLoading(false);
        }
    };

    return {
        users,
        formState,
        onInputChange,
        handleReset,
        isFormValid,
        ...formValidation,
        loading,
        error,
        fetchUsers,
        createUser,
        updateUser,
        deleteUser,
    };
};
