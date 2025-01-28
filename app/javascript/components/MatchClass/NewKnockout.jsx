import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bracket, Seed, SeedItem, SeedTeam } from "react-brackets";

const NewKnockout = ({
  selectedTournament,
  step,
  classSize,
  classData,
  addMatch,
}) => {
  const [tournamentVenues, setTournamentVenues] = useState([]);

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

      const { tournament_venues } = res.data;
      setTournamentVenues(tournament_venues);
    });
  }, [selectedTournament]);

  const handleTableCountChange = (e) => {
    setFormData({ ...formData, tableCount: parseInt(e.target.value) });
  };

  const handleBlockCountChange = (e, index) => {
    numberOfPlayers[index] = parseInt(e.target.value) * 2;

    if (!Array.isArray(selectedPlayers[index]))
      selectedPlayers[index] = new Array();

    tables[index] = Array.from({
      length: getNumberOfMatches(index).nRounds,
    }).map((_) => Array.from({ length: numberOfPlayers[index] / 2 }).fill(0));

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

    setFormData({
      ...formData,
      selectedPlayers,
    });
  };

  const getNumberOfMatches = (index) => {
    let nPlayers = numberOfPlayers[index];
    let nMatches = 0,
      nRounds = 0;

    while (nPlayers > 1) {
      nPlayers = (nPlayers + 1) >> 1;
      nMatches += nPlayers;
      nRounds++;
    }

    return { nMatches, nRounds };
  };

  const startMatchNumberClear = (tableNumber, round, id) => {
    if (!tables[tableNumber][round + 1]) return;

    tables[tableNumber][round + 1][parseInt(id / 2)] = 0;
    console.log(
      "match number cleared",
      tableNumber,
      round + 1,
      parseInt(id / 2)
    );

    startMatchNumberClear(tableNumber, round + 1, parseInt(id / 2));
  };

  const handleMatchNumberChange = (e, tableNumber, round, id) => {
    tables[tableNumber][round][id] = parseInt(e.target.value);
    if (e.target.value == 0) startMatchNumberClear(tableNumber, round, id);

    setFormData({
      ...formData,
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
    const { round, tableNumber, id } = seed;

    let isFirstPlayerSelected = false;
    let isSecondPlayerSelected = false;

    if (round > 1) {
      isFirstPlayerSelected =
        (tables[tableNumber][round - 2][id * 2 * 2] &&
          !tables[tableNumber][round - 2][id * 2 * 2 + 1]) ||
        (!tables[tableNumber][round - 2][id * 2 * 2] &&
          tables[tableNumber][round - 2][id * 2 * 2 + 1]);

      isSecondPlayerSelected =
        (tables[tableNumber][round - 2][(id * 2 + 1) * 2] &&
          !tables[tableNumber][round - 2][(id * 2 + 1) * 2 + 1]) ||
        (!tables[tableNumber][round - 2][(id * 2 + 1) * 2] &&
          tables[tableNumber][round - 2][(id * 2 + 1) * 2 + 1]);

      console.log(
        "first player:",
        isFirstPlayerSelected,
        tables[tableNumber][round - 2][id * 2 * 2],
        tables[tableNumber][round - 2][id * 2 * 2 + 1]
      );
    }

    let isSelectionNeeded =
      (round &&
        tables[tableNumber][round - 1][id * 2] &&
        tables[tableNumber][round - 1][id * 2 + 1]) ||
      (round > 1 &&
        ((isFirstPlayerSelected && isSecondPlayerSelected) ||
          (isFirstPlayerSelected &&
            tables[tableNumber][round - 1][id * 2 + 1]) ||
          (isSecondPlayerSelected &&
            tables[tableNumber][round - 1][id * 2]))) ||
      !round;

    return (
      <Seed mobileBreakpoint={breakpoint}>
        <SeedItem>
          <div className="d-flex justify-content-between align-items-center pe-2">
            <div>
              <SeedTeam>
                <div>
                  {!round ? (
                    <select
                      onChange={(e) =>
                        handlePlayerChange(e, seed.tableNumber, seed.id * 2)
                      }
                    >
                      <option value="">Select</option>
                      {Array.from({
                        length:
                          classData[step - 2].winnerCount *
                          classData[step - 2].tableCount,
                      }).map((_, index) => {
                        return (
                          <option key={index} value={index}>
                            {String.fromCharCode(
                              "A".charCodeAt(0) +
                                index / classData[step - 2].winnerCount
                            ) +
                              " - " +
                              ((index % classData[step - 2].winnerCount) + 1)}
                          </option>
                        );
                      })}
                    </select>
                  ) : tables[tableNumber][round - 1][id * 2] ? (
                    <p>
                      Round {round} - {tables[tableNumber][round - 1][id * 2]}
                    </p>
                  ) : round > 1 &&
                    tables[tableNumber][round - 2][id * 2 * 2] &&
                    tables[tableNumber][round - 2][id * 2 * 2 + 1] ? (
                    <p>None</p>
                  ) : round > 1 &&
                    tables[tableNumber][round - 2][id * 2 * 2] ? (
                    <p>
                      Round {round} -{" "}
                      {tables[tableNumber][round - 2][id * 2 * 2]}
                    </p>
                  ) : round > 1 &&
                    tables[tableNumber][round - 2][id * 2 * 2 + 1] ? (
                    <p>
                      Round {round} -{" "}
                      {tables[tableNumber][round - 2][id * 2 * 2 + 1]}
                    </p>
                  ) : (
                    <p>None</p>
                  )}
                </div>
              </SeedTeam>
              <SeedTeam>
                <div>
                  {!round ? (
                    <select
                      onChange={(e) =>
                        handlePlayerChange(e, seed.tableNumber, seed.id * 2 + 1)
                      }
                    >
                      <option value="">Select</option>
                      {Array.from({
                        length:
                          classData[step - 2].winnerCount *
                          classData[step - 2].tableCount,
                      }).map((_, index) => {
                        return (
                          <option key={index} value={index}>
                            {String.fromCharCode(
                              "A".charCodeAt(0) +
                                index / classData[step - 2].winnerCount
                            ) +
                              " - " +
                              ((index % classData[step - 2].winnerCount) + 1)}
                          </option>
                        );
                      })}
                    </select>
                  ) : tables[tableNumber][round - 1][id * 2 + 1] ? (
                    <p>
                      Round {round} -{" "}
                      {tables[tableNumber][round - 1][id * 2 + 1]}
                    </p>
                  ) : round > 1 &&
                    tables[tableNumber][round - 2][(id * 2 + 1) * 2] &&
                    tables[tableNumber][round - 2][(id * 2 + 1) * 2 + 1] ? (
                    <p>None</p>
                  ) : round > 1 &&
                    tables[tableNumber][round - 2][(id * 2 + 1) * 2] ? (
                    <p>
                      Round {round} -{" "}
                      {tables[tableNumber][round - 2][(id * 2 + 1) * 2]}
                    </p>
                  ) : round > 1 &&
                    tables[tableNumber][round - 2][(id * 2 + 1) * 2 + 1] ? (
                    <p>
                      Round {round} -{" "}
                      {tables[tableNumber][round - 2][(id * 2 + 1) * 2 + 1]}
                    </p>
                  ) : (
                    <p>None</p>
                  )}
                </div>
              </SeedTeam>
            </div>
            <div>
              {isSelectionNeeded && (
                <select
                  value={tables[tableNumber][round][id]}
                  onChange={(e) =>
                    handleMatchNumberChange(e, tableNumber, round, id)
                  }
                >
                  <option value={0}>0</option>
                  {Array.from({
                    length: getNumberOfMatches(tableNumber).nMatches,
                  }).map((_, no) => (
                    <option key={no} value={no + 1}>
                      {no + 1}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>
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
                <option>Select</option>
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
              {Array.from({
                length:
                  classData[step - 2].winnerCount *
                  classData[step - 2].tableCount,
              }).map((_, index) => {
                return (
                  <option key={index} value={index}>
                    {String.fromCharCode(
                      "A".charCodeAt(0) +
                        index / classData[step - 2].winnerCount
                    ) +
                      " - " +
                      ((index % classData[step - 2].winnerCount) + 1)}
                  </option>
                );
              })}
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

export default NewKnockout;
