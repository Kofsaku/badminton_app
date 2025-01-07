import React, { useState, useEffect } from "react";
import axios from "axios";

const FirstRoundRobin = ({ selectedTournament, step, classSize, addMatch }) => {
  const [tournamentVenues, setTournamentVenues] = useState([]);
  const [tournamentPlayers, setTournamentPlayers] = useState([]);

  const [formData, setFormData] = useState({
    tableCount: 0,
    winnerCount: 1,
    numberOfPlayers: [],
    selectedPlayers: [],
    tables: [],
  });
  const { tableCount, winnerCount, numberOfPlayers, selectedPlayers, tables } =
    formData;

  useEffect(() => {
    if (!selectedTournament) return;

    const url = `/api/v1/tournaments/${selectedTournament.id}/tournament-data`;
    axios.get(url).then((res) => {
      console.log(res.data);

      const { tournament_venues, tournament_players } = res.data;
      setTournamentVenues(tournament_venues);
      setTournamentPlayers(tournament_players);
    });
  }, [selectedTournament]);

  const handleTableCountChange = (e) => {
    setFormData({ ...formData, tableCount: parseInt(e.target.value) });
  };

  const handleWinnerCountChange = (e) => {
    setFormData({ ...formData, winnerCount: parseInt(e.target.value) });
  };

  const handlePlayerCountChange = (e, index) => {
    numberOfPlayers[index] = parseInt(e.target.value);

    if (!Array.isArray(selectedPlayers[index]))
      selectedPlayers[index] = new Array();

    tables[index] = Array.from({ length: numberOfPlayers[index] }).map((_) =>
      Array.from({ length: numberOfPlayers[index] }).fill(0)
    );

    setFormData({
      ...formData,
      numberOfPlayers,
      selectedPlayers,
      tables,
    });
  };

  const handlePlayerChange = (e, index, colIndex) => {
    selectedPlayers[index][colIndex] = parseInt(e.target.value);

    setFormData({
      ...formData,
      selectedPlayers,
    });
  };

  const handleTableChange = (e, index, rowIndex, colIndex) => {
    console.log(e.target.value, index, rowIndex, colIndex);

    tables[index][rowIndex][colIndex] = parseInt(e.target.value);
    tables[index][colIndex][rowIndex] = parseInt(e.target.value);

    setFormData({
      ...formData,
      tables: tables,
    });
  };

  const showPlayerName = (index, rowIndex) => {
    const playerIndex = selectedPlayers[index][rowIndex];

    console.log(playerIndex);

    return (
      String.fromCharCode("A".charCodeAt(0) + playerIndex / 2) +
      " - " +
      ((playerIndex % 2) + 1)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addMatch(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Number of tables</label>
        <input
          type="number"
          name="tableCount"
          min={0}
          value={tableCount}
          onChange={handleTableCountChange}
        />
      </div>

      <div>
        <label>Number of winners</label>
        <input
          type="number"
          name="winnerCount"
          min={0}
          value={winnerCount}
          onChange={handleWinnerCountChange}
        />
      </div>

      {Array.from({ length: tableCount }).map((_, index) => (
        <div key={index}>
          <h6>{String.fromCharCode("A".charCodeAt(0) + index)}</h6>
          <div className="border d-flex">
            <div className="flex-fill">
              <label>Number of players</label>
              <input
                type="number"
                className="form-control"
                min={0}
                onChange={(e) => handlePlayerCountChange(e, index)}
              />
            </div>
            <div className="flex-fill">
              <label>Match days</label>
              <select name="" id="" className="form-control">
                {tournamentVenues.map((venue) => (
                  <option key={venue.id} value={venue.id}>
                    {venue.venue_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th></th>
                {Array.from({ length: numberOfPlayers[index] }).map(
                  (_, colIndex) => (
                    <th key={colIndex}>
                      <select
                        onChange={(e) => handlePlayerChange(e, index, colIndex)}
                      >
                        <option value="">Select</option>
                        {tournamentPlayers.map((player) => (
                          <option key={player.id} value={player.id}>
                            {player.player_type === "User"
                              ? player.player.full_name
                              : player.player.title}
                          </option>
                        ))}
                      </select>
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: numberOfPlayers[index] }).map(
                (_, rowIndex) => (
                  <tr key={rowIndex}>
                    <th>{showPlayerName(index, rowIndex)}</th>
                    {Array.from({ length: numberOfPlayers[index] }).map(
                      (_, colIndex) => (
                        <td key={colIndex}>
                          {rowIndex < colIndex ? (
                            <input
                              type="number"
                              min={0}
                              value={tables[index][rowIndex][colIndex]}
                              onChange={(e) =>
                                handleTableChange(e, index, rowIndex, colIndex)
                              }
                            />
                          ) : rowIndex > colIndex ? (
                            tables[index][rowIndex][colIndex]
                          ) : (
                            <></>
                          )}
                        </td>
                      )
                    )}
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      ))}

      <input
        type="submit"
        value={step < classSize ? `Proceed to Match ${step + 1}` : "Complete"}
        className="btn bg-green1 text-white w-100 mt-4"
      />
    </form>
  );
};

export default FirstRoundRobin;
