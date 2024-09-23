// api.js
import axiosInstance from './axiosInstance'; // Adjust the import path according to your project structure

export const createTournament = async (tournamentData) => {
  try {
    const response = await axiosInstance.post('', tournamentData); // No need to include the base URL again
    return response.data;
  } catch (error) {
    console.error('Error creating tournament:', error);
    throw error;
  }
};

export const fetchTournaments = async (page = 1, limit = 50) => {
  try {
    const response = await axiosInstance.get('', {
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
    const response = await axiosInstance.delete(`/${id}`); // Adjusted to match the base URL setup
    return response.data;
  } catch (error) {
    console.error(`Failed to delete tournament with id ${id}:`, error);
    throw error;
  }
};

export const showTournament = async (id) => {
  try {
    const response = await axiosInstance.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch tournament with id ${id}:`, error);
    throw error;
  }
};
