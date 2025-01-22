import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TeamOrderForm from './TeamOrderForm';

const TeamOrderContainer = ({ tournamentPlayerId }) => {
  const [availablePlayers, setAvailablePlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get(`/api/tournament_players/${tournamentPlayerId}/available_players`);
        setAvailablePlayers(response.data);
        setLoading(false);
      } catch (err) {
        setError('選手データの取得に失敗しました');
        setLoading(false);
      }
    };

    fetchPlayers();
  }, [tournamentPlayerId]);

  const handleSubmit = async (orders) => {
    try {
      await axios.post(`/api/tournament_players/${tournamentPlayerId}/team_orders`, {
        order: orders
      });
      alert('オーダー表が保存されました');
    } catch (err) {
      alert('保存に失敗しました');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <TeamOrderForm 
      availablePlayers={availablePlayers}
      onSubmit={handleSubmit}
    />
  );
};

export default TeamOrderContainer; 