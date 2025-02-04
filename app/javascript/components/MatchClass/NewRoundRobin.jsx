import React, { useState, useEffect } from "react";
import axios from "axios";

const NewRoundRobin = ({
  selectedTournament,
  step,
  classSize,
  classData,
  addMatch,
}) => {
  const [tournamentVenues, setTournamentVenues] = useState([]);
  const [venueCounts, setVenueCounts] = useState([]);

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
    winnerCount,
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
    numberOfPlayers.length = e.target.value;

    numberOfPlayers.forEach((_, playerNo) => {
      venueCounts[selectedVenues[playerNo]] = numberOfPlayers
        .filter((_, no) => selectedVenues[no] == selectedVenues[playerNo])
        .map((n) => (n * (n - 1)) / 2)
        .reduce((a, b) => a + b, 0);
    });

    setFormData({
      ...formData,
      tableCount: parseInt(e.target.value),
      numberOfPlayers,
    });
  };

  const handleWinnerCountChange = (e) => {
    setFormData({ ...formData, winnerCount: parseInt(e.target.value) });
  };

  const handlePlayerCountChange = (e, index) => {
    numberOfPlayers[index] = parseInt(e.target.value);

    venueCounts[selectedVenues[index]] = numberOfPlayers
      .filter((_, no) => selectedVenues[no] == selectedVenues[index])
      .map((n) => (n * (n - 1)) / 2)
      .reduce((a, b) => a + b, 0);

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
    setVenueCounts(venueCounts);
  };

  const handleVenueChange = (e, index) => {
    const prevValue = selectedVenues[index];
    selectedVenues[index] = parseInt(e.target.value);

    venueCounts[prevValue] = numberOfPlayers
      .filter((_, no) => selectedVenues[no] == prevValue)
      .map((n) => (n * (n - 1)) / 2)
      .reduce((a, b) => a + b, 0);

    venueCounts[selectedVenues[index]] = numberOfPlayers
      .filter((_, no) => selectedVenues[no] == selectedVenues[index])
      .map((n) => (n * (n - 1)) / 2)
      .reduce((a, b) => a + b, 0);

    setFormData({
      ...formData,
      selectedVenues,
    });
    setVenueCounts(venueCounts);
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

    if (e.target.value)
      tables
        .filter((_, no) => selectedVenues[no] == selectedVenues[index])
        .forEach((table) => {
          table.forEach((row, rowNo) => {
            row.forEach((col, colNo) => {
              if (col == e.target.value) {
                row[colNo] = 0;
              }
            });
          });
        });
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
        <label>リーグ表数</label>
        <input
          type="number"
          name="tableCount"
          min={0}
          value={tableCount}
          onChange={handleTableCountChange}
        />
      </div>

      <div>
        <label>勝ち抜け数</label>
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
              <label>マスの数</label>
              <input
                type="number"
                className="form-control"
                min={0}
                onChange={(e) => handlePlayerCountChange(e, index)}
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
                            // <input
                            //   type="number"
                            //   min={0}
                            //   value={tables[index][rowIndex][colIndex]}
                            //   onChange={(e) =>
                            //     handleTableChange(e, index, rowIndex, colIndex)
                            //   }
                            // />
                            <select
                              value={tables[index][rowIndex][colIndex]}
                              onChange={(e) =>
                                handleTableChange(e, index, rowIndex, colIndex)
                              }
                            >
                              <option value={0}>0</option>
                              {selectedVenues[index] &&
                                Array.from({
                                  length: venueCounts[selectedVenues[index]],
                                }).map((_, num) => (
                                  <option key={num} value={num + 1}>
                                    {num + 1}
                                  </option>
                                ))}
                            </select>
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
        value={step < classSize ? `第${step + 1}試合に進む` : "完了"}
        className="btn bg-green1 text-white w-100 mt-4"
      />
    </form>
  );
};

export default NewRoundRobin;
