import React, { useState, useEffect } from "react";
import { Bracket, Seed, SeedItem, SeedTeam } from "react-brackets";

const ShowKnockout = ({ roundData, step, prevNoOfWinners, matchSize }) => {
  const { match_group, round_size, round_number } = roundData;

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
        temp[firstPlayerIndex][secondPlayerIndex] =
          cell.match.match_score_teamA;
        temp[secondPlayerIndex][firstPlayerIndex] =
          cell.match.match_score_teamB;
      } else {
        const firstPlayerIndex = group_player.findIndex(
          (player) => player.player_key == cell.player_key
        );
        const secondPlayerIndex = group_player.findIndex(
          (player) => player.player_key == cell.second_player_key
        );
        temp[firstPlayerIndex][secondPlayerIndex] =
          cell.match.match_score_teamA;
        temp[secondPlayerIndex][firstPlayerIndex] =
          cell.match.match_score_teamB;
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

  const showBracket = (group, index) => {
    let nPlayers = group.group_size;
    let matchArray = [];

    while (nPlayers > 1) {
      nPlayers = (nPlayers + 1) >> 1;
      let matches = [];
      for (let i = 0; i < nPlayers; i++) {
        const match = {
          id: i,
          scores: [
            tables[index][i * 2][i * 2 + 1],
            tables[index][i * 2 + 1][i],
          ],
          round: matchArray.length,
          teams: [group.group_player[i * 2], group.group_player[i * 2 + 1]],
        };
        matches.push(match);
      }
      const roundTitle = matchArray.length + 1;
      matchArray.push({ title: `Round ${roundTitle}`, seeds: matches });
    }
    return matchArray;
  };

  const CustomSeed = ({ seed, breakpoint }) => {
    const { round, teams, scores } = seed;

    return (
      <Seed mobileBreakpoint={breakpoint}>
        <SeedItem>
          <SeedTeam>
            <div>
              {!round && showPlayerName(teams[0]) + " Score: " + scores[0]}
            </div>
          </SeedTeam>
          <SeedTeam>
            <div>
              {!round && showPlayerName(teams[1]) + " Score: " + scores[1]}
            </div>
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
      {match_group.map((group, index) => (
        <Bracket
          key={group.id}
          rounds={showBracket(group, index)}
          renderSeedComponent={CustomSeed}
        />
      ))}
    </>
  );
};

export default ShowKnockout;
