// api.js
import axiosInstance from './axiosInstance';

// Create a new tournament
export const createTournament = async (tournamentData) => {
  try {
    // Add `.json` suffix for the API format requirement
    const response = await axiosInstance.post('tournaments.json', tournamentData);
    return response.data;
  } catch (error) {
    console.error('Error creating tournament:', error);
    throw error;
  }
};

// Fetch tournaments with pagination
export const fetchTournaments = async (page = 1, limit = 50) => {
  try {
    // Include `.json` suffix for the API format requirement
    const response = await axiosInstance.get('tournaments.json', {
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

// Delete a tournament by ID
export const deleteTournament = async (id) => {
  try {
    // Construct the URL with the ID and `.json` suffix
    const response = await axiosInstance.delete(`tournaments/${id}.json`);
    return response.data;
  } catch (error) {
    console.error(`Failed to delete tournament with id ${id}:`, error);
    throw error;
  }
};

// Show tournament details by ID
export const showTournament = async (id) => {
  try {
    // Construct the URL with the ID and `.json` suffix
    const response = await axiosInstance.get(`tournaments/${id}.json`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch tournament with id ${id}:`, error);
    throw error;
  }
};
