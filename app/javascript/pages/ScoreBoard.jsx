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
  const [matchLog, setMatchLog] = useState([{ log: []}]);
  const [intervalId, setIntervalId] = useState(null);
  const [matchType, setMatchType] = useState('Doubles');
  const [winner, setWinner] = useState(null);
  const [set, setSet] = useState(1);
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
        const matchLog = JSON.parse(data.match_log) || [{ log: []}];
        const set = matchLog[matchLog.length-1];

        setSet(matchLog.length);
        setMatchType(data.match_type);
        // setWinner(set.winner);
        setStatus(data.status);
        set.match_time && setTimer({ minutes: parseInt(set.match_time.split(':')[0]), seconds: parseInt(set.match_time.split(':')[1]), running: false });

        if (data.match_type === "single") {
          setPlayers({
            teamA: { player1Name: data.player1, score: set.match_score_teamA || 0 },
            teamB: { player1Name: data.player2, score: set.match_score_teamB || 0 },
          });
        } else {
          setPlayers({
            teamA: { player1Name: data.player1, player2Name: data.player2, score: set.match_score_teamA || 0 },
            teamB: { player1Name: data.player3, player2Name: data.player4, score: set.match_score_teamB || 0 },
          });
        }

        setMatchLog(matchLog);
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

  useEffect(() => {
    if (set <= 3) {
      setMatchLog((prev) => [...prev, { log: [] }]);
    }
  }, [set]);

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
      const set = matchLog[matchLog.length-1]
      set.set_winner =  winner
      set.match_time = `${timer.minutes}:${timer.seconds}`
      set.match_score_teamA = players.teamA.score
      set.match_score_teamB = players.teamB.score

      const payload = {
        match_log: matchLog,
        status: winner.length > 0 ? "completed" : '',
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
      // setWinner("Team A");
      toggleGame("Team A");
      if (set >= 3) {
        alert("Team A has won the match!");
      } else {
        alert("Team A has won the set! Start New Set");
        setPlayers((prev) => ({
          teamA: { ...prev.teamA, score: 0 },
          teamB: { ...prev.teamB, score: 0 },
        }));        
        setSet(prev => prev + 1)
        setTimer({ minutes: 0, seconds: 0, running: false });
      }
    }

    if (
      teamBScore >= WINNING_SCORE &&
      (teamBScore - teamAScore >= MIN_DIFFERENCE || teamBScore === MAX_SCORE)
    ) {
      // setWinner("Team B");
      toggleGame("Team B");
      if (set >= 3) {
        alert("Team B has won the match!");
      } else {
        alert("Team B has won the set! Start New Set");
        setPlayers((prev) => ({
          teamA: { ...prev.teamA, score: 0 },
          teamB: { ...prev.teamB, score: 0 },
        }));
        setSet(prev => prev + 1)
        setTimer({ minutes: 0, seconds: 0, running: false });
      }
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

    const set = matchLog[matchLog.length-1].log
    const rally = set[set.length-1]?.rally || 0;
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

    setMatchLog(prevMatchLog => {
      const updatedMatchLog = [...prevMatchLog];
      const lastSet = { ...updatedMatchLog[updatedMatchLog.length - 1] };
      lastSet.log = [...lastSet.log, log];
      updatedMatchLog[updatedMatchLog.length - 1] = lastSet;
      return updatedMatchLog;
    });
  };

  return (
    <main className="admin-wrapper d-flex w-100 flex-wrap bg-EEEEEE">
      <AdminSidebar />
      <section className="right-content-wrapper overflow-auto custom-scroll1">
        <AdminHeader />
        <div className="container mt-4 text-center">
          <h3>Badminton Scoreboard ({matchType})-({set})</h3>

          {/* Score Section */}
          <div className="row my-4">
            <div className="col">
              {Object.keys(players.teamA).map((key, index) =>
                key.includes("player") ? (
                  <div className="player-name" key={index}>
                    <h4>{players.teamA[key]}</h4>
                    {status != 'completed' && currentServer.team === "teamA" && currentServer.player === key && (
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
                    {status != 'completed' && currentServer.team === "teamB" && currentServer.player === key && (
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
          <div className="court-container position-relative">
            <img
              src="/images/badminton-court.jpg"
              alt="Badminton Court"
              className="court-image"
            />

            {/* Player Names */}
            <div className="player-names player-left">
              {Object.keys(players.teamA).map((key, index) =>
                key.includes("player") ? (
                  <div className="player-badge" key={index}>
                    {players.teamA[key]}
                    {status != 'completed' && currentServer.team === "teamA" && currentServer.player === key && (
                      <>
                        <img src="/images/shuttle.png" alt="shuttle image" className="shuttle-indicator"/>
                        {currentServer.player === 'player1Name' ? (
                          <img src="/images/arrow.png" alt="arrow image" className="left-top-arrow-image" />
                        ) : (
                          <img src="/images/arrow.png" alt="arrow image" className="left-bottom-arrow-image" />
                        )}
                      </>
                    )}
                  </div>
                ) : null
              )}
            </div>

            <div className="player-names player-right">
              {Object.keys(players.teamB).map((key, index) =>
                key.includes("player") ? (
                  <div className="player-badge" key={index}>
                    {players.teamB[key]}
                    {status != 'completed' && currentServer.team === "teamB" && currentServer.player === key && (
                      <>
                        <img src="/images/shuttle.png" alt="shuttle image" className="shuttle-indicator"/>
                        {currentServer.player === 'player1Name' ? (
                          <img src="/images/arrow.png" alt="arrow image" className="right-top-arrow-image" />
                        ) : (
                          <img src="/images/arrow.png" alt="arrow image" className="right-bottom-arrow-image" />
                        )}
                      </>
                    )}
                  </div>
                ) : null
              )}
            </div>
          </div>

          {/* Match Log */}
          <div className="table-responsive mt-5">
            <h4>Match Log</h4>
            {matchLog.map((set, index) => (
              <div key={index}>
                <h4>Set {index + 1}</h4>
                <div className="table-responsive">
                  <table className="table table-bordered text-center">
                    <thead>
                      <tr>
                        <th style={{ width: '300px' }}>Players</th>
                        {set.log.length === 0 || set.log[set.log.length - 1]?.rally <= 21
                          ? Array.from({ length: 21 }).map((_, rallyIndex) => (
                              <th key={rallyIndex + 1}>{rallyIndex + 1}</th>
                            ))
                          : set.log.map((log) => (
                              <th key={log.rally}>{log.rally}</th>
                            ))}
                      </tr>
                    </thead>
                    <tbody>
                      {players?.teamA && players?.teamB && (
                        matchType === "single" ? (
                          <>
                            {/* Single Match */}
                            <tr>
                              <td>{players.teamA.player1Name}</td>
                              <td>{(set.server == 'player_1' ? 'S' : (set.receiver == 'player_1' ? 'R' : ''))}</td>
                              {set.log.map((log, logIndex) => (
                                <td key={logIndex}>{log.A}</td>
                              ))}
                            </tr>
                            <tr>
                              <td>{players.teamB.player1Name}</td>
                              <td>{(set.server == 'player_2' ? 'S' : (set.receiver == 'player_2' ? 'R' : ''))}</td>
                              {set.log.map((log, logIndex) => (
                                <td key={logIndex}>{log.B}</td>
                              ))}
                            </tr>
                          </>
                        ) : (
                          <>
                            {/* Double Match */}
                            <tr>
                              <td>{players.teamA.player1Name}</td>
                              <td>{(set.server == 'player_1' ? 'S' : (set.receiver == 'player_1' ? 'R' : ''))}</td>
                              {set.log.map((log, logIndex) => (
                                <td key={logIndex}>{log.A}</td>
                              ))}
                            </tr>
                            <tr>
                              <td>{players.teamA.player2Name}</td>
                              <td>{(set.server == 'player_2' ? 'S' : (set.receiver == 'player_2' ? 'R' : ''))}</td>
                              {set.log.map((log, logIndex) => (
                                <td key={logIndex}>{log.B}</td>
                              ))}
                            </tr>
                            <tr>
                              <td>{players.teamB.player1Name}</td>
                              <td>{(set.server == 'player_3' ? 'S' : (set.receiver == 'player_3' ? 'R' : ''))}</td>
                              {set.log.map((log, logIndex) => (
                                <td key={logIndex}>{log.C}</td>
                              ))}
                            </tr>
                            <tr>
                              <td>{players.teamB.player2Name}</td>
                              <td>{(set.server == 'player_4' ? 'S' : (set.receiver == 'player_4' ? 'R' : ''))}</td>
                              {set.log.map((log, logIndex) => (
                                <td key={logIndex}>{log.D}</td>
                              ))}
                            </tr>
                          </>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ScoreBoard;
