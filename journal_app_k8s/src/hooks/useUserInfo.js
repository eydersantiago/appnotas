import { useState, useEffect } from "react";
import axios from "axios";

export const useUserInfo = () => {
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        // Fetch all users from the backend
        const fetchUsers = async () => {
            try {
                const response = await axios.get("/api/users"); // Adjust endpoint if needed
                setUsers(response.data.users);
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
                const response = await axios.get("/api/auth/user"); // Adjust endpoint if needed
                setCurrentUser(response.data.user);
            } catch (error) {
                console.error("Error fetching current user:", error);
            }
        };

        fetchCurrentUser();
    }, []);

    return { users, currentUser };
}
