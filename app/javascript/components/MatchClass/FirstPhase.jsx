import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminHeader from "../Shared/AdminHeader";
import AdminSidebar from "../Shared/AdminSidebar";
import { Link, useNavigate } from "react-router-dom";

const FirstPhase = ({
  selectedTournament,
  category,
  step,
  classSize,
  classData,
  addMatch,
}) => {
  const navigate = useNavigate();

  //   const [selectedTournament, setSelectedTournament] = useState(0);
  const [tournaments, setTournaments] = useState([]);
  const [tableName, setTableName] = useState("");
  const [selectedTournamentVenue, setSelectedTournamentVenue] = useState(0);
  const [tournamentVenues, setTournamentVenues] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [tournamentCategories, setTournamentCategories] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState(0);
  const [tournamentDivisions, setTournamentDivisions] = useState([]);
  const [tableSize, setTableSize] = useState(0);
  const [tournamentPlayers, setTournamentPlayers] = useState([]);

  const [formData, setFormData] = useState({
    matchType: false,
    tableCount: 0,
    winnerCount: 1,
    numberOfPlayers: [],
    selectedPlayers: [],
    tables: [],
  });
  const {
    matchType,
    tableCount,
    winnerCount,
    numberOfPlayers,
    selectedPlayers,
    tables,
  } = formData;

  //   useEffect(() => {
  //     const url = "/api/v1/tournaments";
  //     axios.get(url).then((res) => {
  //       console.log(res.data);

  //       setTournaments(res.data);
  //       if (res.data.length) setSelectedTournament(res.data[0].id);
  //     });
  //   }, []);

  useEffect(() => {
    if (!selectedTournament) return;

    const url = `/api/v1/tournaments/${selectedTournament.id}/tournament-data`;
    axios.get(url).then((res) => {
      console.log(res.data);

      const { tournament_venues, tournament_categories, tournament_players } =
        res.data;
      setTournamentVenues(tournament_venues);
      //   setTournamentCategories(tournament_categories);
      setTournamentPlayers(tournament_players);
      //   setTableSize(tournament_players.length);

      if (tournament_venues.length)
        setSelectedTournamentVenue(tournament_venues[0].id);
      if (tournament_categories.length) {
        setSelectedCategory(tournament_categories[0].id);
        console.log("selected category changed");
      }
    });
  }, [selectedTournament]);

  //   useEffect(() => {
  //     if (!selectedCategory) return;

  //     const url = `/api/v1/categories/${selectedCategory}/divisions`;
  //     axios.get(url).then((res) => {
  //       console.log(res.data);

  //       const { divisions } = res.data;
  //       setTournamentDivisions(divisions);

  //       if (divisions.length) setSelectedDivision(divisions[0].id);
  //     });
  //   }, [selectedCategory]);

  //   const onChange = (e, setFunction) => {
  //     console.log(e.target.value);

  //     setFunction(e.target.value);
  //   };

  const handleMatchTypeChange = (val) => {
    setFormData({ ...formData, matchType: val });
  };

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
    const player = tournamentPlayers.find(
      (player) => player.id === selectedPlayers[index][rowIndex]
    );
    console.log(player, selectedPlayers[index][rowIndex]);

    return !player
      ? "To be selected"
      : player.player_type === "User"
      ? player.player.full_name
      : player.player.title;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addMatch(formData);
  };

  return (
    <>
      <h1>New Match</h1>
      <p>{selectedTournament.name + " " + category.category_type}</p>

      <div className="bg-light p-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Match Format</label>
            <ul className="nav nav-pills">
              <li className="nav-item">
                <button
                  type="button"
                  className={`nav-link border-color-green border ${
                    !matchType ? "bg-green1 text-light" : "text-dark"
                  }`}
                  onClick={() => handleMatchTypeChange(false)}
                >
                  Round Robin
                </button>
              </li>
              <li className="nav-item">
                <button
                  type="button"
                  className={`nav-link border-color-green border ${
                    matchType ? "bg-green1 text-light" : "text-dark"
                  }`}
                  onClick={() => handleMatchTypeChange(true)}
                >
                  Knockout
                </button>
              </li>
            </ul>
          </div>

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
                            onChange={(e) =>
                              handlePlayerChange(e, index, colIndex)
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
                                    handleTableChange(
                                      e,
                                      index,
                                      rowIndex,
                                      colIndex
                                    )
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
            value={
              step < classSize ? `Proceed to Match ${step + 1}` : "Complete"
            }
            className="btn bg-green1 text-white w-100 mt-4"
          />
        </form>
      </div>
    </>
  );
};

export default FirstPhase;
