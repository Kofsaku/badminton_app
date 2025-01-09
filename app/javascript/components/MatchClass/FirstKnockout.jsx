import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bracket, Seed, SeedItem, SeedTeam } from "react-brackets";

const FirstKnockout = ({ selectedTournament, step, classSize, addMatch }) => {
  const [tournamentVenues, setTournamentVenues] = useState([]);
  const [tournamentPlayers, setTournamentPlayers] = useState([]);

  const [formData, setFormData] = useState({
    tableCount: 0,
    winnerCount: 1,
    numberOfPlayers: [],
    selectedVenues: [],
    selectedPlayers: [],
    tables: [],
  });
  const {
    tableCount,
    numberOfPlayers,
    selectedVenues,
    selectedPlayers,
    tables,
  } = formData;

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

  const handleBlockCountChange = (e, index) => {
    numberOfPlayers[index] = parseInt(e.target.value) * 2;

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

  const handleVenueChange = (e, index) => {
    selectedVenues[index] = parseInt(e.target.value);

    setFormData({
      ...formData,
      selectedVenues,
    });
  };

  const handlePlayerChange = (e, index, colIndex) => {
    selectedPlayers[index][colIndex] = parseInt(e.target.value);
    if (colIndex % 2 == 0)
      tables[index][colIndex][colIndex + 1] = colIndex / 2 + 1;
    else tables[index][colIndex - 1][colIndex] = parseInt(colIndex / 2) + 1;

    setFormData({
      ...formData,
      selectedPlayers,
      tables,
    });
  };

  const showBracket = (index) => {
    let nPlayers = numberOfPlayers[index];
    let matchArray = [];

    while (nPlayers > 1) {
      nPlayers = (nPlayers + 1) >> 1;
      let matches = [];
      for (let i = 0; i < nPlayers; i++) {
        const match = {
          id: i,
          tableNumber: index,
          round: matchArray.length,
          teams: ["team 1", "team 2"],
        };
        matches.push(match);
      }
      const roundTitle = matchArray.length + 1;
      matchArray.push({ title: `Round ${roundTitle}`, seeds: matches });
    }
    return matchArray;
  };

  const CustomSeed = ({ seed, breakpoint }) => {
    const { round } = seed;

    return (
      <Seed mobileBreakpoint={breakpoint}>
        <SeedItem>
          <SeedTeam>
            <div>
              {!round && (
                <select
                  onChange={(e) =>
                    handlePlayerChange(e, seed.tableNumber, seed.id * 2)
                  }
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
              )}
            </div>
          </SeedTeam>
          <SeedTeam>
            <div>
              {!round && (
                <select
                  onChange={(e) =>
                    handlePlayerChange(e, seed.tableNumber, seed.id * 2 + 1)
                  }
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
              )}
            </div>
          </SeedTeam>
        </SeedItem>
      </Seed>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addMatch(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>トーナメント表の数</label>
        <input
          type="number"
          name="tableCount"
          min={0}
          value={tableCount}
          onChange={handleTableCountChange}
        />
      </div>

      {Array.from({ length: tableCount }).map((_, index) => (
        <div key={index}>
          <h6>{String.fromCharCode("A".charCodeAt(0) + index)}</h6>
          <div className="border d-flex">
            <div className="flex-fill">
              <label>ブロック数</label>
              <input
                type="number"
                className="form-control"
                min={0}
                onChange={(e) => handleBlockCountChange(e, index)}
              />
            </div>
            <div className="flex-fill">
              <label>試合日数</label>
              <select
                className="form-control"
                onChange={(e) => handleVenueChange(e, index)}
              >
                {tournamentVenues.map((venue) => (
                  <option key={venue.id} value={venue.id}>
                    {venue.venue_name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <Bracket
            rounds={showBracket(index)}
            renderSeedComponent={CustomSeed}
          />
          {/* {Array.from({ length: numberOfPlayers[index] }).map((_, colIndex) => (
            <select
              key={colIndex}
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
          ))} */}
        </div>
      ))}

      <input
        type="submit"
        value={step < classSize ? `第${step + 1}試合に進む` : "完了"}
        className="btn bg-green1 text-white w-100 mt-4"
      />
    </form>
  );
};

export default FirstKnockout;
