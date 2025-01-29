import React, { useState, useEffect } from "react";

const ShowRoundRobin = ({ roundData, step, matchSize }) => {
  const { match_groups, round_size, round_number, number_of_winners } =
    roundData;

  let tables = match_groups.map((group) => {
    let temp = Array.from({ length: group.group_size }).map((_) =>
      Array.from({ length: group.group_size })
    );

    const { group_players, timetable_cell } = group;
    timetable_cell.forEach((cell) => {
      if (!round_number) {
        const firstPlayerIndex = group_players.findIndex(
          (player) => player.tournament_player_id == cell.tournament_player_id
        );
        const secondPlayerIndex = group_players.findIndex(
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
        const firstPlayerIndex = group_players.findIndex(
          (player) => player.player_key == cell.player_key
        );
        const secondPlayerIndex = group_players.findIndex(
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
        <p>試合形式</p>
        <h5>リーグ戦</h5>
      </div>
      <div className="d-flex justify-content-between">
        <p>リーグ表の数</p>
        <h5>{round_size}</h5>
      </div>
      <div className="d-flex justify-content-between">
        <p>勝ち抜け数</p>
        <h5>{number_of_winners}</h5>
      </div>
      {match_groups.map((group, index) => (
        <div key={group.id}>
          <h6>{String.fromCharCode("A".charCodeAt(0) + index)}</h6>
          <div className="border d-flex">
            <div className="flex-fill p-2">
              <p className="mb-0">マスの数</p>
              <p className="mb-0 border">{group.group_size / 2}</p>
            </div>
            <div className="flex-fill p-2">
              <p className="mb-0">試合日数</p>
              <p className="mb-0 border">{group.tournament_venue.venue_name}</p>
            </div>
          </div>

          <table className="table">
            <thead>
              <tr>
                <th></th>
                {group.group_players.map((player) => (
                  <th key={player.id}>{showPlayerName(player)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {group.group_players.map((player, rowIndex) => (
                <tr key={rowIndex}>
                  <th>{showPlayerName(player)}</th>
                  {tables[index][rowIndex].map((col, colIndex) => (
                    <td key={colIndex}>{col}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </>
  );
};

export default ShowRoundRobin;
