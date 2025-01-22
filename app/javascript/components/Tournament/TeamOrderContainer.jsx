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
        const response = await axios.get(
          `/api/v1/tournament_players/${tournamentPlayerId}/team_orders/available_players`,
          {
            headers: {
              'Content-Type': 'application/json',
              'X-CSRF-Token': document.querySelector('[name="csrf-token"]')?.content
            }
          }
        );
        setAvailablePlayers(response.data);
        setLoading(false);
      } catch (err) {
        setError('選手データの取得に失敗しました');
        setLoading(false);
        console.error('Error fetching players:', err);
      }
    };

    fetchPlayers();
  }, [tournamentPlayerId]);

  const handleSubmit = async (orders) => {
    try {
      const response = await axios.post(
        `/api/v1/tournament_players/${tournamentPlayerId}/team_orders`,
        { order: orders },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': document.querySelector('[name="csrf-token"]')?.content
          }
        }
      );
      alert('オーダー表が保存されました');
    } catch (err) {
      alert('保存に失敗しました: ' + (err.response?.data?.error || err.message));
      console.error('Error submitting orders:', err);
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