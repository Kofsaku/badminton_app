import axios from 'axios';

const API_BASE_URL = '/tournaments.json';

export const createTournament = async (tournamentData) => {
  try {
    const response = await axios.post(API_BASE_URL, tournamentData);
    return response.data;
  } catch (error) {
    console.error('Error creating tournament:', error);
    throw error;
  }
};

export const fetchTournaments = async (page = 1, limit = 50) => {
  try {
    const response = await axios.get(API_BASE_URL, {
      params: {
        page,
        limit,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching tournaments:', error);
    throw error;
  }
};


export const deleteTournament = async (id) => {
  try {
    const response = await axios.delete(`/api/tournaments/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to delete tournament with id ${id}:`, error);
    throw error;
  }
};

export const showTournament = async (id) => {
  try {
    const response = await axios.get(`/api/tournaments/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch tournament with id ${id}:`, error);
    throw error;
  }
};

