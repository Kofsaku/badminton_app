import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import AdminHeader from "../../components/Shared/AdminHeader";
import AdminSidebar from "../../components/Shared/AdminSidebar";
import { Link, useParams } from "react-router-dom";

const EditTournamentTable = () => {
  const { id } = useParams();
  const [tournamentTable, setTournamentTable] = useState({
    name: "",
    size: 0,
    tournament_table_players: [],
  });
  const [tournamentPlayers, setTournamentPlayers] = useState([]);

  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [matchNumbers, setMatchNumbers] = useState([]);

  const { name: tableName, size: tableSize } = tournamentTable;

  useEffect(() => {
    const url = `/api/v1/tournament-tables/${id}`;
    axios.get(url).then((res) => {
      console.log(res.data);
      const { table, players, match_numbers } = res.data;
      const { tournament_table_players } = table;

      setTournamentTable(table);
      setTournamentPlayers(players);
      setSelectedPlayers(
        table.tournament_table_players.map(
          (player) => player.tournament_player_id
        )
      );

      setMatchNumbers(
        Array.from({ length: tournament_table_players.length }).map((_, row) =>
          Array(tournament_table_players.length)
            .fill(0)
            .map((_, col) => {
              if (row < col) {
                const cell = match_numbers.find(
                  (cell) =>
                    cell.tournament_player_id ===
                      tournament_table_players[row].tournament_player_id &&
                    cell.second_tournament_player_id ===
                      tournament_table_players[col].tournament_player_id
                );
                return cell.number % 1000;
              } else if (row > col) {
                const cell = match_numbers.find(
                  (cell) =>
                    cell.tournament_player_id ===
                      tournament_table_players[col].tournament_player_id &&
                    cell.second_tournament_player_id ===
                      tournament_table_players[row].tournament_player_id
                );
                return cell.number % 1000;
              }
              return 0;
            })
        )
      );
    });
  }, [id]);

  useEffect(() => {}, [selectedPlayers]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = {
      name: tableName,
      size: tableSize,
      players: selectedPlayers,
      match_numbers: matchNumbers,
    };
    const url = `/api/v1/tournament-tables/${id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    axios
      .put(url, body, {
        headers: { "X-CSRF-Token": token, "Content-Type": "application/json" },
      })
      .then((res) => {
        console.log(res.data);

        // const { table } = res.data;
        // setTournamentTable(table);
      });
  };

  const handlePlayerSelection = (event) => {
    const { value, checked } = event.target;

    let new_players;
    if (checked) {
      new_players = [...selectedPlayers, parseInt(value)];
      setSelectedPlayers(new_players);
    } else {
      new_players = selectedPlayers.filter((item) => item !== parseInt(value));
      setSelectedPlayers(new_players);
    }

    setMatchNumbers(
      Array.from({ length: new_players.length }, () =>
        Array(new_players.length).fill(0)
      )
    );
  };

  const handleMatchNumberChange = (row, col, value) => {
    const updatedMatchNumbers = [...matchNumbers];
    updatedMatchNumbers[row][col] = parseInt(value);
    updatedMatchNumbers[col][row] = parseInt(value);
    console.log(updatedMatchNumbers);

    setMatchNumbers(updatedMatchNumbers);
  };

  const showKnockout = () => {
    let match_pairs = [];

    for (let i = 0; i < selectedPlayers.length; i += 2) {
      match_pairs.push(
        <li key={i}>
          Player {selectedPlayers[i]} - Player {selectedPlayers[i + 1]}
          <input
            type="number"
            className="form-control"
            value={matchNumbers[i][i + 1]}
            onChange={(e) => handleMatchNumberChange(i, i + 1, e.target.value)}
          />
        </li>
      );
    }

    return match_pairs;
  };

  return (
    <main className="admin-wrapper d-flex w-100 flex-wrap bg-EEEEEE">
      <AdminSidebar />
      <section className="right-content-wrapper overflow-auto custom-scroll1">
        <AdminHeader />
        <div className="p-3">
          <h1>
            Edit
            {tournamentTable.table_type === "league"
              ? " Round Robin Table"
              : " Knockout Table"}
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Table Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={tableName}
                onChange={(e) =>
                  setTournamentTable({
                    ...tournamentTable,
                    name: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group">
              <label>Size (e.g., number of teams)</label>
              <input
                type="number"
                className="form-control"
                name="size"
                min={2}
                max={tournamentPlayers.length}
                value={tableSize}
                onKeyDown={(e) => e.preventDefault()}
                onChange={(e) =>
                  setTournamentTable({
                    ...tournamentTable,
                    size: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <h3>Assign Players or Teams</h3>
              <ul>
                {tournamentPlayers.map((player) => (
                  <li key={player.id}>
                    <input
                      type="checkbox"
                      onChange={handlePlayerSelection}
                      value={player.id}
                      checked={selectedPlayers.includes(player.id)}
                    />
                    {player.player_type === "User"
                      ? player.player.full_name
                      : player.player.title}
                  </li>
                ))}
              </ul>
            </div>

            {tournamentTable.table_type === "league" ? (
              <table className="table">
                <thead>
                  <tr>
                    <th>Player</th>
                    {selectedPlayers
                      .map((playerId) =>
                        tournamentPlayers.find(
                          (player) => player.id === playerId
                        )
                      )
                      .map((player) => (
                        <th key={player.id}>
                          {player.player_type === "User"
                            ? player.player.full_name
                            : player.player.title}
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {selectedPlayers
                    .map((playerId) =>
                      tournamentPlayers.find((player) => player.id === playerId)
                    )
                    .map((player, rowIndex) => (
                      <tr key={rowIndex}>
                        <th key={rowIndex}>
                          {player.player_type === "User"
                            ? player.player.full_name
                            : player.player.title}
                        </th>
                        {Array.from({ length: matchNumbers.length }).map(
                          (_, colIndex) =>
                            rowIndex < colIndex ? (
                              <td key={colIndex}>
                                <input
                                  type="number"
                                  value={matchNumbers[rowIndex][colIndex]}
                                  min={1}
                                  onChange={(e) =>
                                    handleMatchNumberChange(
                                      rowIndex,
                                      colIndex,
                                      e.target.value
                                    )
                                  }
                                />
                              </td>
                            ) : rowIndex > colIndex ? (
                              <td key={colIndex}>
                                {matchNumbers[rowIndex][colIndex]}
                              </td>
                            ) : (
                              <td key={colIndex}></td>
                            )
                        )}
                      </tr>
                    ))}
                </tbody>
              </table>
            ) : (
              <>
                <h4>Select Player</h4>
                <ul>{showKnockout()}</ul>
              </>
            )}

            <input
              type="submit"
              className="btn btn-primary"
              value="Save"
              disabled={
                tournamentTable.table_type === "league"
                  ? selectedPlayers.length != tableSize
                  : selectedPlayers.length % 2
              }
            />
            <Link to="/tournament-tables" className="btn btn-secondary">
              Back to List
            </Link>
          </form>
        </div>
      </section>
    </main>
  );
};

export default EditTournamentTable;
