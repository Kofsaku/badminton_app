// api.js
import axiosInstance from './axiosInstance';

// Fetch tournaments with pagination
export const fetchPlayers = async (page = 0, limit = 50, tournament_id = null) => {
  try {
    // Include `.json` suffix for the API format requirement
    const response = await axiosInstance.get('users/players-list.json', {
      params: {
        page,
        limit,
        tournament_id
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching tournaments:', error);
    throw error;
  }
};