const axios = require('axios');
const AUTH_API_URL = process.env.JOURNAL_API_URL || 'http://journal-service/journal';

const journalSave = async (journal) => {
  const { data } = await axios.put(`${AUTH_API_URL}/saveNote`, journal);
  return data;
};

const newNote=  async (journal) => {
  const { data } = await axios.post(`${AUTH_API_URL}/newNote`, journal);
  return data;
};

const loadNotes=  async (journal) => {
  const { data } = await axios.post(`${AUTH_API_URL}/loadNotes`, journal);
  return data;
};

const deleteNote=  async (journal) => {
  const { data } = await axios.post(`${AUTH_API_URL}/deleteNote`, journal);
  return data;
};

module.exports = { journalSave,newNote,loadNotes, deleteNote};


