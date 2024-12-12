import { useState, useEffect } from "react";
import axios from "axios";

export const useUserInfo = () => {
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("/user/all"); // Endpoint configurado
                setUsers(response.data.users); // Cambia a response.data.users si la estructura incluye 'users'
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
    
        fetchUsers();
    }, []);
    

    useEffect(() => {
        // Identify the currently logged-in user
        const fetchCurrentUser = async () => {
            try {
                const response = await axios.get("/user/current"); // Ajusta esto según el endpoint configurado
                setCurrentUser(response.data.user); // Cambia si el backend tiene una estructura distinta
            } catch (error) {
                console.error("Error fetching current user:", error);
            }
        };

        fetchCurrentUser();
    }, []);

    return { users, currentUser };
};
