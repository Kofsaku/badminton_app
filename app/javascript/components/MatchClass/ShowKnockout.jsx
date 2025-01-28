import React, { useState, useEffect } from "react";
import { Bracket, Seed, SeedItem, SeedTeam } from "react-brackets";

const ShowKnockout = ({ roundData, step, prevNoOfWinners, matchSize }) => {
  const { match_groups, round_size, round_number } = roundData;
  const [tables, setTables] = useState([]);

  useEffect(() => {
    match_groups.forEach((group, index) => {
      const { timetable_cell, group_size } = group;

      tables[index] = Array.from({
        length: getNumberOfMatches(group_size).nRounds,
      }).map((_) => Array.from({ length: group_size / 2 }).fill(0));
      let cellIndex = 0;

      timetable_cell.forEach((cell) => {
        if (cellIndex == group_size / 2) return;
        if (!round_number) {
          if (cell.tournament_player_id && cell.second_tournament_player_id) {
            tables[index][0][cellIndex] = cell.number;

            addChildMatch(
              index,
              timetable_cell,
              cell.number,
              1,
              cellIndex,
              group_size / 2
            );
            cellIndex++;
          }
        } else {
          tables[index][0][cellIndex] = cell.number % 1000;
          addChildMatch(
            index,
            timetable_cell,
            cell.number % 1000,
            1,
            cellIndex,
            group_size / 2
          );
          cellIndex++;
        }
      });
    });

    console.log("this is tables", tables);

    setTables([...tables]);
  }, []);

  const getNumberOfMatches = (group_size) => {
    let nPlayers = group_size;
    let nMatches = 0,
      nRounds = 0;

    while (nPlayers > 1) {
      nPlayers = (nPlayers + 1) >> 1;
      nMatches += nPlayers;
      nRounds++;
    }

    return { nMatches, nRounds };
  };

  const addChildMatch = (
    index,
    timetable_cell,
    number,
    round,
    cellIndex,
    block_size
  ) => {
    if (!tables[index][round]) return;

    const cell = timetable_cell.find(
      (item, no) => item.player_key == number && no >= block_size
    );

    if (!cell) return;

    tables[index][round][parseInt(cellIndex / 2)] = cell.number % 1000;
    setTables(tables);

    addChildMatch(
      index,
      timetable_cell,
      cell.number % 1000,
      round + 1,
      parseInt(cellIndex / 2),
      block_size
    );
  };

  const showPlayerName = (player) => {
    if (!round_number)
      return (
        player.tournament_player.player.full_name ??
        player.tournament_player.player.title
      );
    else
      return (
        String.fromCharCode(
          "A".charCodeAt(0) + player.player_key / prevNoOfWinners
        ) +
        " - " +
        ((player.player_key % prevNoOfWinners) + 1)
      );
  };

  const showBracket = (group, index) => {
    if (!tables.length) return [];

    const { group_size, group_players, timetable_cell } = group;

    let nPlayers = group_size;
    let matchArray = [];

    while (nPlayers > 1) {
      nPlayers = (nPlayers + 1) >> 1;
      let matches = [];
      for (let i = 0; i < nPlayers; i++) {
        console.log("this is group", tables[index][matchArray.length][i]);

        const match = {
          id: i,
          tableNumber: index,
          scores: [
            tables[index][matchArray.length][i]
              ? timetable_cell.find(
                  (cell) =>
                    cell.number % 1000 == tables[index][matchArray.length][i]
                ).match.match_score_teamA
              : null,
            tables[index][matchArray.length][i]
              ? timetable_cell.find(
                  (cell) =>
                    cell.number % 1000 == tables[index][matchArray.length][i]
                ).match.match_score_teamB
              : null,
          ],
          round: matchArray.length,
          teams: [group_players[i * 2], group_players[i * 2 + 1]],
        };
        matches.push(match);
      }
      const roundTitle = matchArray.length + 1;
      matchArray.push({ title: `Round ${roundTitle}`, seeds: matches });
    }
    return matchArray;
  };

  const CustomSeed = ({ seed, breakpoint }) => {
    const { tableNumber, round, teams, scores, id } = seed;

    return (
      <Seed mobileBreakpoint={breakpoint}>
        <SeedItem>
          <SeedTeam>
            {!round ? (
              <>
                <p className="mb-0">{showPlayerName(teams[0])}:</p>
                <p className="mb-0">{scores[0]}</p>
              </>
            ) : tables[tableNumber][round - 1][id * 2] ? (
              <>
                <p className="mb-0">
                  Round {round} - {tables[tableNumber][round - 1][id * 2]}:
                </p>
                <p className="mb-0">{scores[0]}</p>
              </>
            ) : round > 1 &&
              tables[tableNumber][round - 2][id * 2 * 2] &&
              tables[tableNumber][round - 2][id * 2 * 2 + 1] ? (
              <p className="mb-0">None</p>
            ) : round > 1 && tables[tableNumber][round - 2][id * 2 * 2] ? (
              <>
                <p className="mb-0">
                  Round {round} - {tables[tableNumber][round - 2][id * 2 * 2]}
                </p>
                <p className="mb-0">{scores[0]}</p>
              </>
            ) : round > 1 && tables[tableNumber][round - 2][id * 2 * 2 + 1] ? (
              <>
                <p className="mb-0">
                  Round {round} -{" "}
                  {tables[tableNumber][round - 2][id * 2 * 2 + 1]}
                </p>
                <p className="mb-0">{scores[0]}</p>
              </>
            ) : (
              <p className="mb-0">None</p>
            )}
          </SeedTeam>
          <SeedTeam>
            {!round ? (
              <>
                <p className="mb-0">{showPlayerName(teams[1])}:</p>
                <p className="mb-0">{scores[1]}</p>
              </>
            ) : tables[tableNumber][round - 1][id * 2 + 1] ? (
              <>
                <p className="mb-0">
                  Round {round} - {tables[tableNumber][round - 1][id * 2 + 1]}:
                </p>
                <p className="mb-0">{scores[1]}</p>
              </>
            ) : round > 1 &&
              tables[tableNumber][round - 2][(id * 2 + 1) * 2] &&
              tables[tableNumber][round - 2][(id * 2 + 1) * 2 + 1] ? (
              <p className="mb-0">None</p>
            ) : round > 1 &&
              tables[tableNumber][round - 2][(id * 2 + 1) * 2] ? (
              <>
                <p className="mb-0">
                  Round {round} -{" "}
                  {tables[tableNumber][round - 2][(id * 2 + 1) * 2]}:
                </p>
                <p className="mb-0">{scores[1]}</p>
              </>
            ) : round > 1 &&
              tables[tableNumber][round - 2][(id * 2 + 1) * 2 + 1] ? (
              <>
                <p className="mb-0">
                  Round {round} -{" "}
                  {tables[tableNumber][round - 2][(id * 2 + 1) * 2 + 1]}:
                </p>
                <p className="mb-0">{scores[1]}</p>
              </>
            ) : (
              <p className="mb-0">None</p>
            )}
          </SeedTeam>
        </SeedItem>
      </Seed>
    );
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <p>Match Format</p>
        <h5>Tournament matches</h5>
      </div>
      <div className="d-flex justify-content-between">
        <p>Number of tournament brackets</p>
        <h5>{round_size}</h5>
      </div>
      {match_groups.map((group, index) => (
        <div key={group.id}>
          <h6>{String.fromCharCode("A".charCodeAt(0) + index)}</h6>
          <div className="border d-flex">
            <div className="flex-fill p-2">
              <p className="mb-0">ブロック数</p>
              <p className="mb-0 border">{group.group_size / 2}</p>
            </div>
            <div className="flex-fill p-2">
              <p className="mb-0">試合日数</p>
              <p className="mb-0 border">{group.tournament_venue.venue_name}</p>
            </div>
          </div>

          <Bracket
            rounds={showBracket(group, index)}
            renderSeedComponent={CustomSeed}
          />
        </div>
      ))}
    </>
  );
};

export default ShowKnockout;
