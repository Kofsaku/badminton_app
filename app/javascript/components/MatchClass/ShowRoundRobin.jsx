import React, { useState, useEffect } from "react";

const ShowRoundRobin = ({ roundData, step, matchSize }) => {
  const { match_group, round_size, round_number, number_of_winners } =
    roundData;

  let tables = match_group.map((group) => {
    let temp = Array.from({ length: group.group_size }).map((_) =>
      Array.from({ length: group.group_size })
    );

    const { group_player, timetable_cell } = group;
    timetable_cell.forEach((cell) => {
      if (!round_number) {
        const firstPlayerIndex = group_player.findIndex(
          (player) => player.tournament_player_id == cell.tournament_player_id
        );
        const secondPlayerIndex = group_player.findIndex(
          (player) =>
            player.tournament_player_id == cell.second_tournament_player_id
        );
        temp[firstPlayerIndex][
          secondPlayerIndex
        ] = `${cell.match.match_score_teamA} : ${cell.match.match_score_teamB}`;
        temp[secondPlayerIndex][
          firstPlayerIndex
        ] = `${cell.match.match_score_teamB} : ${cell.match.match_score_teamA}`;
      } else {
        const firstPlayerIndex = group_player.findIndex(
          (player) => player.player_key == cell.player_key
        );
        const secondPlayerIndex = group_player.findIndex(
          (player) => player.player_key == cell.second_player_key
        );
        temp[firstPlayerIndex][
          secondPlayerIndex
        ] = `${cell.match.match_score_teamA} : ${cell.match.match_score_teamB}`;
        temp[secondPlayerIndex][
          firstPlayerIndex
        ] = `${cell.match.match_score_teamB} : ${cell.match.match_score_teamA}`;
      }
    });

    return temp;
  });

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

  return (
    <>
      <div className="d-flex justify-content-between">
        <p>Match Format</p>
        <h5>League matches</h5>
      </div>
      <div className="d-flex justify-content-between">
        <p>Number of league tables</p>
        <h5>{round_size}</h5>
      </div>
      <div className="d-flex justify-content-between">
        <p>Number of winners</p>
        <h5>{number_of_winners}</h5>
      </div>
      {match_group.map((group, index) => (
        <table key={group.id} className="table">
          <thead>
            <tr>
              <th></th>
              {group.group_player.map((player) => (
                <th key={player.id}>{showPlayerName(player)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {group.group_player.map((player, rowIndex) => (
              <tr key={rowIndex}>
                <th>{showPlayerName(player)}</th>
                {tables[index][rowIndex].map((col, colIndex) => (
                  <td key={colIndex}>{col}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ))}
    </>
  );
};

export default ShowRoundRobin;
