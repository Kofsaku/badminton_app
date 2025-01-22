import React, { useState, useEffect } from 'react';

const TeamOrderForm = ({ availablePlayers, onSubmit }) => {
  const [orders, setOrders] = useState(Array(5).fill(''));

  const handlePlayerSelect = (index, playerId) => {
    // Check if player is already selected in another position
    const isPlayerSelected = orders.some((order, idx) => 
      idx !== index && order === playerId
    );

    if (isPlayerSelected) {
      alert('同じ選手は複数回選択できません');
      return;
    }

    const newOrders = [...orders];
    newOrders[index] = playerId;
    setOrders(newOrders);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(orders);
  };

  return (
    <div className="container">
      <h2>オーダー表登録</h2>
      
      <form onSubmit={handleSubmit}>
        <table className="table">
          <thead>
            <tr>
              <th>順番</th>
              <th>選手名</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((selectedPlayer, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <select
                    value={selectedPlayer}
                    onChange={(e) => handlePlayerSelect(index, e.target.value)}
                    className="form-control"
                  >
                    <option value="">選手を選択</option>
                    {availablePlayers.map(player => (
                      <option key={player.id} value={player.id}>
                        {player.user_name}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-center mt-4">
          <button type="submit" className="btn btn-primary">
            オーダー表を保存
          </button>
        </div>
      </form>
    </div>
  );
};

export default TeamOrderForm; 