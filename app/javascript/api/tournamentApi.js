// api.js
import axiosInstance from './axiosInstance';

// Create a new IMG
export const createImg = async (file) => {
  console.log('Creating banner', file);
  const data = new FormData();
  data.append('file', file);
  data.append('pinataMetadata', JSON.stringify({ name: 'File to upload' }));

  try {
    const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
      method: 'POST',
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI0ZTIwMzJiNy1kZGE1LTQwNDgtOWJhNS1mZTI5ODE4NmM2M2UiLCJlbWFpbCI6ImNoYXJtaW5nLmRldjc3N0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiNzYyZGE5MjA4ZmY3MzBkNjIyZTYiLCJzY29wZWRLZXlTZWNyZXQiOiI5YjExY2Y3NjBiOWY5Mzc3YzNhOWEyODVlM2Q1MzA4NTg3NWJmYzNkYTRhOGY4ZmI0MTFhMTMzNjgxZjcwMTljIiwiZXhwIjoxNzY5NjQ4ODE1fQ.4vvx4XA3tf3_qnrUXAtU1CNMsq0E0pdYltISrDgFyjo`, // Use your environment variable
      },
      body: data,
    });

    if (!response.ok) {
      throw new Error('Failed to upload to IPFS');
    }

    const result = await response.json();
    return result.IpfsHash;
    
  } catch (err) {
    console.error(err);
  }
};
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

export const updateTournament = async (tournamentData) => {
  try {
    const response = await axiosInstance.put(`tournaments/${tournamentData.id}.json`, {...tournamentData})
    return response.data;
  } catch (error) {
    console.error('Error updating tournament', error);
    throw error;
  }
}

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

// Remove player from a tournament
export const removePlayerFromTournament = async (tournamentId, playerId) => {
  try {
    const response = await axiosInstance.delete(
      `tournaments/${tournamentId}/remove_player_from_tournament.json`,
      { params: { "player_id": playerId }}
    );
    return response.data;
  } catch (e) {
    console.error('Error removing player from to tournament', error);
    throw error;
  }
}

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

export const paymentTournament = async (tournamentId, formData) => {
  try {
    const response = await axiosInstance.post(`/api/v1/payments/charge.json`, formData);
    return response.data;
  } catch (error) {
    console.error('Error creating tournament:', error);
    throw error;
  }
};

export const reOrderTeamMatch = async (matchId, formData) => {
  try {
    const response = await axiosInstance.patch(`matches/${matchId}/reorder_team_match`, formData)
    return response.data
  } catch (e) {
    console.error(`Failed to submit order`)
    throw e
  }
}
