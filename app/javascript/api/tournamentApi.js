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
