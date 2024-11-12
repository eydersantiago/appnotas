import axios from "axios";

const JOURNAL_API_URL = "http://localhost:4002/journal";

export const loadNotes = async (uid = '') => {

    if (!uid) throw new Error('El UID del usuario no existe');

    const response = await axios.post(`${JOURNAL_API_URL}/loadNotes`, {
        uid
    });

    return response.data.notes;
};
