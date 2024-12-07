import React, { useState } from "react";
import AdminHeader from "../../components/Shared/AdminHeader";
import AdminSidebar from "../../components/Shared/AdminSidebar";

const ScoreBoard = () => {
  const [players, setPlayers] = useState({
    teamA: { player1Name: "Player A", player2Name: "Player B", score: 0 },
    teamB: { player1Name: "Player C", player2Name: "Player D", score: 0 },
  });

  const [timer, setTimer] = useState({ minutes: 0, seconds: 0, running: false });
  const [matchLog, setMatchLog] = useState([]);
  const [intervalId, setIntervalId] = useState(null);

  const [currentServer, setCurrentServer] = useState({
    team: "teamA", // Starts with Team A
    player: "player1Name", // Player A starts serving
    consecutiveServes: 0, // Counter for the current player's consecutive serves
  });

  // Timer Logic
  const toggleGame = () => {
    if (!timer.running) {
      const id = setInterval(() => {
        setTimer((prev) => {
          const newSeconds = prev.seconds + 1;
          const newMinutes = prev.minutes + Math.floor(newSeconds / 60);
          return { minutes: newMinutes, seconds: newSeconds % 60, running: true };
        });
      }, 1000);
      setIntervalId(id);
    } else {
      clearInterval(intervalId);
      setTimer((prev) => ({ ...prev, running: false }));
    }
  };

  // Update the current server based on the scoring team
  const updateServer = (scoringTeam) => {
    setCurrentServer((prev) => {
      // If the current server has served twice
      if (prev.consecutiveServes >= 1) {
        if (scoringTeam === "teamA") {
          // Switch server within Team A
          return {
            team: "teamA",
            player: prev.player === "player1Name" ? "player2Name" : "player1Name",
            consecutiveServes: 0,
          };
        } else {
          // Switch server within Team B
          return {
            team: "teamB",
            player: prev.player === "player1Name" ? "player2Name" : "player1Name",
            consecutiveServes: 0,
          };
        }
      } else {
        // Continue with the same server
        return {
          ...prev,
          consecutiveServes: prev.consecutiveServes + 1,
        };
      }
    });
  };

  // Scoring Logic
  const incrementScore = (team) => {
    if (!timer.running) return;

    setPlayers((prev) => {
      const newScore = prev[team].score + 1;
      return {
        ...prev,
        [team]: { ...prev[team], score: newScore },
      };
    });

    // Update match log
    setMatchLog((prev) => [
      ...prev,
      { team, score: players[team].score + 1, timestamp: new Date().toLocaleTimeString() },
    ]);

    // Update server based on scoring team
    updateServer(team);
  };

  return (
    <main className="admin-wrapper d-flex w-100 flex-wrap bg-EEEEEE">
      <AdminSidebar />
      <section className="right-content-wrapper overflow-auto custom-scroll1">
        <AdminHeader />
        <div className="container mt-4 text-center">
          <h3>Badminton Scoreboard (Doubles)</h3>

          {/* Score Section */}
          <div className="row my-4">
            <div className="col">
              <div className="player-name">
                <h4>{players.teamA.player1Name}</h4>
                {currentServer.team === "teamA" && currentServer.player === "player1Name" && (
                  <div className="serve-indicator-pointer"></div>
                )}
              </div>
              <div className="player-name">
                <h4>{players.teamA.player2Name}</h4>
                {currentServer.team === "teamA" && currentServer.player === "player2Name" && (
                  <div className="serve-indicator-pointer"></div>
                )}
              </div>
              <h2>{players.teamA.score}</h2>
              <button
                className="btn btn-primary"
                onClick={() => incrementScore("teamA")}
                disabled={!timer.running}
              >
                +Score
              </button>
            </div>
            <div className="col">
              <div>
                <h4>Match Timer</h4>
                <h2>
                  {timer.minutes.toString().padStart(2, "0")}:
                  {timer.seconds.toString().padStart(2, "0")}
                </h2>
                <button className="btn btn-success mx-1" onClick={toggleGame}>
                  {timer.running ? "End Game" : "Start Game"}
                </button>
              </div>
            </div>
            <div className="col">
              <div className="player-name">
                <h4>{players.teamB.player1Name}</h4>
                {currentServer.team === "teamB" && currentServer.player === "player1Name" && (
                  <div className="serve-indicator-pointer"></div>
                )}
              </div>
              <div className="player-name">
                <h4>{players.teamB.player2Name}</h4>
                {currentServer.team === "teamB" && currentServer.player === "player2Name" && (
                  <div className="serve-indicator-pointer"></div>
                )}
              </div>
              <h2>{players.teamB.score}</h2>
              <button
                className="btn btn-primary"
                onClick={() => incrementScore("teamB")}
                disabled={!timer.running}
              >
                +Score
              </button>
            </div>
          </div>

          {/* Central Court Section */}
          <div className="court-container">
            <div className="court">
              {/* Court Lines */}
              <div className="line vertical center"></div>
              <div className="line horizontal top"></div>
              <div className="line horizontal bottom"></div>
              <div className="line vertical left"></div>
              <div className="line vertical right"></div>

              {/* Player Positions */}
              <div className="player top-left">P1</div>
              <div className="player top-right">P2</div>
              <div className="player bottom-left">P3</div>
              <div className="player bottom-right">P4</div>

              {/* Serving Indicator */}
              <div className="serve-indicator"></div>
            </div>
          </div>

          {/* Match Log */}
          <div className="table-responsive mt-5">
            <h4>Match Log</h4>
            <table className="table">
              <thead>
                <tr>
                  <th>Team</th>
                  <th>Score</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {matchLog.map((log, index) => (
                  <tr key={index}>
                    <td>{log.team}</td>
                    <td>{log.score}</td>
                    <td>{log.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ScoreBoard;
