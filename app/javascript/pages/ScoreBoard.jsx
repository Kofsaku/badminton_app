import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import AdminHeader from "../components/Shared/AdminHeader";
import AdminSidebar from "../components/Shared/AdminSidebar";

const ScoreBoard = () => {
  const { id } = useParams(); 
  const [players, setPlayers] = useState({
    teamA: { player1Name: "Player A", player2Name: "Player B", score: 0 },
    teamB: { player1Name: "Player C", player2Name: "Player D", score: 0 },
  });
  const [timer, setTimer] = useState({ minutes: 0, seconds: 0, running: false });
  const [matchLog, setMatchLog] = useState([]);
  const [intervalId, setIntervalId] = useState(null);
  const [matchType, setMatchType] = useState('Doubles');
  const [winner, setWinner] = useState(null);
  const [status, setStatus] = useState(null);
  const [currentServer, setCurrentServer] = useState({
    team: "teamA",
    player: "player1Name",
    consecutiveServes: 0,
  });

  useEffect(() => {
    const fetchMatchData = async () => {
      try {
        const response = await axios.get(`/matches/${id}`);
        const data = response.data;

        setMatchType(data.match_type);
        setWinner(data.winner);
        setStatus(data.status);
        data.match_time && setTimer({ minutes: parseInt(data.match_time.split(':')[0]), seconds: parseInt(data.match_time.split(':')[1]), running: false });

        if (data.match_type === "single") {
          setPlayers({
            teamA: { player1Name: data.player1, score: data.match_score_teamA },
            teamB: { player1Name: data.player2, score: data.match_score_teamB },
          });
        } else {
          setPlayers({
            teamA: { player1Name: data.player1, player2Name: data.player2, score: data.match_score_teamA },
            teamB: { player1Name: data.player3, player2Name: data.player4, score: data.match_score_teamB },
          });
        }

        setMatchLog(JSON.parse(data.match_log) || []);
      } catch (error) {
        console.error("Error fetching match data:", error);
      }
    };

    fetchMatchData();
  }, [id]);

  useEffect(() => {
    if (status != 'completed') {
      checkWinner();
    }
  }, [players]);

  const toggleGame = (winner = '') => {
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
      saveMatchData(winner);
    }
  };

  const saveMatchData = async (winner = '') => {
    try {
      const payload = {
        match_log: matchLog,
        status: winner.length > 0 ? "completed" : '',
        match_time: `${timer.minutes}:${timer.seconds}`,
        match_score_teamA: players.teamA.score,
        match_score_teamB: players.teamB.score,
        winner: winner
      };

      await axios.put(`/matches/${id}`, payload);
    } catch (error) {
      console.error("Error saving match data:", error);
    }
  };

  const checkWinner = () => {
    const teamAScore = players.teamA.score;
    const teamBScore = players.teamB.score;
    const WINNING_SCORE = 21;
    const MAX_SCORE = 30;
    const MIN_DIFFERENCE = 2;

    if (
      teamAScore >= WINNING_SCORE &&
      (teamAScore - teamBScore >= MIN_DIFFERENCE || teamAScore === MAX_SCORE)
    ) {
      setWinner("Team A");
      toggleGame("Team A");
      alert("Team A has won the match!");
    }

    if (
      teamBScore >= WINNING_SCORE &&
      (teamBScore - teamAScore >= MIN_DIFFERENCE || teamBScore === MAX_SCORE)
    ) {
      setWinner("Team B");
      toggleGame("Team B");
      alert("Team B has won the match!");
    }

    return null;
  };

  const updateServer = (scoringTeam) => {
    const currentServerState = currentServer;
    const isSameTeam = currentServerState.team === scoringTeam;
    let updatedServer;

    if (matchType == 'single') {
      updatedServer = {
        team: scoringTeam,
        player: 'player1Name',
        consecutiveServes: 0
      }
    } else {
      const nextPlayer =
        currentServerState.player === "player1Name"
          ? "player2Name"
          : "player1Name";

      if (isSameTeam && currentServerState.consecutiveServes >= 1) {
        updatedServer = {
          team: scoringTeam,
          player: nextPlayer,
          consecutiveServes: 0,
        };
      } else {
        updatedServer = {
          team: scoringTeam,
          player: isSameTeam
            ? currentServerState.player
            : nextPlayer,
          consecutiveServes: isSameTeam
            ? currentServerState.consecutiveServes + 1
            : 1,
        };
      }
    }
  
    setCurrentServer(updatedServer);
  
    return updatedServer;
  };

  const incrementScore = (team) => {
    if (!timer.running) return;
    const scoreA = players.teamA.score;
    const scoreB = players.teamB.score;

    setPlayers((prev) => {
      const newScore = prev[team].score + 1;
      return {
        ...prev,
        [team]: { ...prev[team], score: newScore },
      };
    });

    let updatedServer = updateServer(team);

    if (currentServer.team === updatedServer.team) {
      updatedServer = currentServer 
    }

    const rally = matchLog[matchLog.length-1]?.rally || 0;
    let log = {}

    if (matchType == 'single') {
      if (updatedServer.team == 'teamA') {
        log = { rally: rally + 1, A: scoreA + 1, B: '' }
      } else {
        log = { rally: rally + 1, A: '', B: scoreB + 1 }
      }
    } else  {
      if (updatedServer.team == 'teamA') {
        if (updatedServer.player == 'player1Name') {
          log = { rally: rally + 1, A: scoreA + 1, B: '', C: '', D: '' }
        } else {
          log = { rally: rally + 1, A: '', B: scoreA + 1, C: '', D: '' }
        }
      } else {
        if (updatedServer.player == 'player1Name') {
          log = { rally: rally + 1, A: '', B: '', C: scoreB + 1, D: ''  }
        } else {
          log = { rally: rally + 1, A: '', B: '', C: '', D: scoreB + 1  }
        }
      }
    }

    setMatchLog((prev) => [...prev, log]);
  };

  return (
    <main className="admin-wrapper d-flex w-100 flex-wrap bg-EEEEEE">
      <AdminSidebar />
      <section className="right-content-wrapper overflow-auto custom-scroll1">
        <AdminHeader />
        <div className="container mt-4 text-center">
          <h3>Badminton Scoreboard ({matchType})</h3>

          {/* Score Section */}
          <div className="row my-4">
            <div className="col">
              {Object.keys(players.teamA).map((key, index) =>
                key.includes("player") ? (
                  <div className="player-name" key={index}>
                    <h4>{players.teamA[key]}</h4>
                    {currentServer.team === "teamA" && currentServer.player === key && (
                      <div className="serve-indicator-pointer"></div>
                    )}
                  </div>
                ) : null
              )}
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
              <h4>Match Timer</h4>
              <h2>
                {timer.minutes.toString().padStart(2, "0")}:
                {timer.seconds.toString().padStart(2, "0")}
              </h2>
              {!winner && <button className="btn btn-success" onClick={()=> toggleGame()}>
                {timer.running ? "Pause Game" : "Start Game"}
              </button>}
            </div>

            <div className="col">
              {Object.keys(players.teamB).map((key, index) =>
                key.includes("player") ? (
                  <div className="player-name" key={index}>
                    <h4>{players.teamB[key]}</h4>
                    {currentServer.team === "teamB" && currentServer.player === key && (
                      <div className="serve-indicator-pointer"></div>
                    )}
                  </div>
                ) : null
              )}
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
              {matchType == 'single' ? (
                <>
                  <div className="player top-left">P1</div>
                  <div className="player top-right">P2</div>
                </>
              ) : (
                <>
                  <div className="player top-left">P1</div>
                  <div className="player bottom-left">P2</div>
                  <div className="player top-right">P3</div>
                  <div className="player bottom-right">P4</div>
                </>
              ) }

              {/* Serving Indicator */}
              <div className="serve-indicator"></div>
            </div>
          </div>

          {/* Match Log */}
          <div className="table-responsive mt-5">
            <h4>Match Log</h4>
            <div className="table-responsive">
              <table className="table table-bordered text-center">
                <thead>
                  <tr>
                    <th style={{ width: '300px' }}>Players</th>
                    { !matchLog[matchLog.length-1] || matchLog[matchLog.length-1].rally <= 21 ? Array.from({ length: 21 }).map((_, index) => (
                      <th key={index + 1}>{index + 1}</th>
                    )) : (
                      matchLog.map((log, index) => (
                        <th key={index + 1}>{log.rally}</th>
                      ))
                    )}
                  </tr>
                </thead>
                <tbody>
                  {matchType == 'single' ? (
                    <>
                      <tr>
                        <td>{players.teamA.player1Name}</td>
                        {matchLog.map((log, index) => (
                          <td key={index}>{log.A}</td>
                        ))}
                      </tr>
                      <tr>
                        <td>{players.teamB.player1Name}</td>
                        {matchLog.map((log, index) => (
                          <td key={index}>{log.B}</td>
                        ))}
                      </tr>
                    </>
                  ) : (
                    <>
                      <tr>
                        <td>{players.teamA.player1Name}</td>
                        {matchLog.map((log, index) => (
                          <td key={index}>{log.A}</td>
                        ))}
                      </tr>
                      <tr>
                        <td>{players.teamA.player2Name}</td>
                        {matchLog.map((log, index) => (
                          <td key={index}>{log.B}</td>
                        ))}
                      </tr>
                      <tr>
                        <td>{players.teamB.player1Name}</td>
                        {matchLog.map((log, index) => (
                          <td key={index}>{log.C}</td>
                        ))}
                      </tr>
                      <tr>
                        <td>{players.teamB.player2Name}</td>
                        {matchLog.map((log, index) => (
                          <td key={index}>{log.D}</td>
                        ))}
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ScoreBoard;
