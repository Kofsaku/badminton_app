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

// Add players in tournament
export const addPlayersTournament = async (tournamentId, playerId) => {
  try {
    // Add `.json` suffix for the API format requirement
    const response = await axiosInstance.post(`tournaments/${tournamentId}/add_player.json`, {"player_id": playerId});
    return response.data;
  } catch (error) {
    console.error('Error creating tournament:', error);
    throw error;
  }
};

// Add new player to a tournament
export const addNewPlayersTournament = async (tournamentId, playerData) => {
  try {
    const response = await axiosInstance.post(
      `tournaments/${tournamentId}/add_new_player.json`, 
      { player: playerData }
    );
    return response.data;
  } catch (error) {
    console.error('Error adding new player to tournament:', error);
    throw error;
  }
};

// Add new team to a tournament
export const addNewTeamsTournament = async (tournamentId, teamData) => {
  try {
    const response = await axiosInstance.post(
      `tournaments/${tournamentId}/add_new_team.json`, 
      { team: teamData }
    );
    return response.data;
  } catch (error) {
    console.error('Error adding new team to tournament:', error);
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

export const fetchTournamentIds = async() => {
  try {
    // Include `.json` suffix for the API format requirement
    const response = await axiosInstance.get('tournament-ids.json');
    return response.data;
  } catch (error) {
    console.error('Error fetching tournament Ids:', error);
    throw error;
  }
}

export const fetchTournamentDivisions = async(tournamentId) => {
  try {
    // Include `.json` suffix for the API format requirement
    const response = await axiosInstance.get(`tournaments/${tournamentId}/tournament_divisions.json`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tournament Ids:', error);
    throw error;
  }
}

export const fetchTournamentCategories = async(tournamentId) => {
  try {
    // Include `.json` suffix for the API format requirement
    const response = await axiosInstance.get(`tournaments/${tournamentId}/tournament_categories.json`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tournament Ids:', error);
    throw error;
  }
}

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
