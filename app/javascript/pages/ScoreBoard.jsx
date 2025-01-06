import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
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
  const [currentSet, setCurrentSet] = useState(1);
  const [status, setStatus] = useState(null);
  const [currentServer, setCurrentServer] = useState({
    team: "teamA",
    player: "player1Name"
  });
  const [show, setShow] = useState(false);
  const [server, setServer] = useState('player_1');
  const [receiver, setReceiver] = useState('player_1');
  const [totalSet, setTotalSet] = useState(3);
  const [winningPoints, setWinningPoints] = useState(21);
  const [corrections, setCorrections] = useState([]);

  const handleClose = () => setShow(false);
  const handleModalShow = () => setShow(true);

  useEffect(() => {
    const fetchMatchData = async () => {
      try {
        const response = await axios.get(`/matches/${id}`);
        const data = response.data;
        const matchLog = JSON.parse(data.match_log) || [{ log: []}];
        const set = matchLog[matchLog.length-1];

        setCurrentSet(matchLog.length);
        setMatchType(data.match_type);
        // setWinner(set.winner);
        setStatus(data.status);
        setTotalSet(data.number_of_sets);
        setWinningPoints(data.winning_points);
        set.match_time && setTimer({ minutes: parseInt(set.match_time.split(':')[0]), seconds: parseInt(set.match_time.split(':')[1]), running: false });

        if (set.server) {
          let team;
          const serverNumber = parseInt(set.server.split('_')[1]);
          const newServer = `player${serverNumber}Name`;

          if (data.match_type === "double") {
            team = serverNumber > 2 ? "teamB" : "teamA";
          } else {
            team = serverNumber === 1 ? "teamA" : "teamB";
          }

          setCurrentServer({
            team: team,
            player: newServer
          });
        } else {
          handleModalShow();
        }

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
      let status = winner.length > 0 && matchLog.length >= totalSet ? "completed" : '';

      if (winner.length > 0 && matchLog.length <= totalSet - 1) {
        matchLog.push({ server: set.server, receiver: set.receiver, log: [] });
      }

      const payload = {
        match_log: matchLog,
        status: status,
      };

      setStatus(status)

      await axios.put(`/matches/${id}`, payload);
    } catch (error) {
      console.error("Error saving match data:", error);
    }
  };

  const checkWinner = () => {
    const teamAScore = players.teamA.score;
    const teamBScore = players.teamB.score;
    const MAX_SCORE = winningPoints + 9;
    const MIN_DIFFERENCE = 2;

    if (
      teamAScore >= winningPoints &&
      (teamAScore - teamBScore >= MIN_DIFFERENCE || teamAScore === MAX_SCORE)
    ) {
      // setWinner("Team A");
      toggleGame("Team A");
      if (currentSet >= totalSet) {
        alert("Team A has won the match!");
      } else {
        alert("Team A has won the set! Start New Set");
        setPlayers((prev) => ({
          teamA: { ...prev.teamA, score: 0 },
          teamB: { ...prev.teamB, score: 0 },
        }));        
        setCurrentSet(prev => prev + 1)
        setTimer({ minutes: 0, seconds: 0, running: false });
      }
    }

    if (
      teamBScore >= winningPoints &&
      (teamBScore - teamAScore >= MIN_DIFFERENCE || teamBScore === MAX_SCORE)
    ) {
      // setWinner("Team B");
      toggleGame("Team B");
      if (currentSet >= totalSet) {
        alert("Team B has won the match!");
      } else {
        alert("Team B has won the set! Start New Set");
        setPlayers((prev) => ({
          teamA: { ...prev.teamA, score: 0 },
          teamB: { ...prev.teamB, score: 0 },
        }));
        setCurrentSet(prev => prev + 1)
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
      }
    } else {
      let nextPlayer;
      if (currentServerState.team === 'teamA')
      {
        nextPlayer =
        currentServerState.player === "player1Name"
          ? "player2Name"
          : "player1Name";
      } else {
        nextPlayer = currentServerState.player;
      }

      if (isSameTeam) {
        updatedServer = {
          team: scoringTeam,
          player: currentServerState.player,
        };
      } else {
        updatedServer = {
          team: scoringTeam,
          player: nextPlayer
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

  const handleModalSubmit = () => {
    let team;
    const serverNumber = parseInt(server.split('_')[1]);
    const newServer = `player${serverNumber}Name`;

    if (matchType === "double") {
      team = serverNumber > 2 ? "teamB" : "teamA";
    } else {
      team = serverNumber === 1 ? "teamA" : "teamB";
    }

    setCurrentServer({
      team: team,
      player: newServer
    });

    setMatchLog(prevMatchLog => {
      const updatedMatchLog = [...prevMatchLog];
      const lastSet = { ...updatedMatchLog[updatedMatchLog.length - 1] };
      lastSet.receiver = receiver;
      lastSet.server = server;
      updatedMatchLog[updatedMatchLog.length - 1] = lastSet;
      return updatedMatchLog;
    });

    handleClose();
  }

  const moveBackOnePoint = () => {
    clearInterval(intervalId);
    setTimer((prev) => ({ ...prev, running: false }));
    const logs = matchLog[matchLog.length-1].log
    const lastLog = logs[logs.length - 1];

    if (!lastLog) return

    setCorrections(prev => [...prev, lastLog]);

    setPlayers((prev) => {
      let team;
      if (lastLog.A || lastLog.B){
        team = 'teamA';
      } else if (lastLog.C || lastLog.D) {
        team = 'teamB';
      }

      const newScore = prev[team].score - 1;
      return {
        ...prev,
        [team]: { ...prev[team], score: newScore },
      };
    });

    setMatchLog(prevMatchLog => {
      const updatedMatchLog = [...prevMatchLog];
      const lastSet = { ...updatedMatchLog[updatedMatchLog.length - 1] };
      lastSet.log = lastSet.log.slice(0, -1);
      updatedMatchLog[updatedMatchLog.length - 1] = lastSet;
      return updatedMatchLog;
    });
  }

  const moveForwardOnePoint = () => {
    clearInterval(intervalId);
    setTimer((prev) => ({ ...prev, running: false }));

    if (corrections.length > 0){
      const lastLog = corrections[corrections.length - 1];
      setCorrections(prev => prev.slice(0, -1));

      setPlayers((prev) => {
        let team;
        if (lastLog.A || lastLog.B){
          team = 'teamA';
        } else if (lastLog.C || lastLog.D) {
          team = 'teamB';
        }
  
        const newScore = prev[team].score + 1;
        return {
          ...prev,
          [team]: { ...prev[team], score: newScore },
        };
      });

      setMatchLog(prevMatchLog => {
        const updatedMatchLog = [...prevMatchLog];
        const lastSet = { ...updatedMatchLog[updatedMatchLog.length - 1] };
        lastSet.log = [...lastSet.log, lastLog];
        updatedMatchLog[updatedMatchLog.length - 1] = lastSet;
        return updatedMatchLog;
      });
    }
  }

  return (
    <main className="admin-wrapper d-flex w-100 flex-wrap bg-EEEEEE">
      <AdminSidebar />
      <section className="right-content-wrapper overflow-auto custom-scroll1">
        <AdminHeader />
        <div className="container mt-4 text-center">
          <h3>Badminton Scoreboard ({matchType})-({currentSet})</h3>

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
              {status != 'completed' && <button className="btn btn-success" onClick={()=> toggleGame()}>
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

            {status != 'completed' && <div className="d-flex justify-content-center">
              <button
                className="btn btn-primary me-2"
                onClick={moveBackOnePoint}
                disabled={status == 'completed'}
              >
                 {'<-'} Return
              </button>

              <button
                className="btn btn-primary"
                onClick={moveForwardOnePoint}
                disabled={status == 'completed'}
              >
                Advance {'->'}
              </button>
            </div>}
          </div>

          {/* Central Court Section */}
          <div className="court-container position-relative">
            <img
              src="/images/court.jpeg"
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
                      <tr >
                        <th style={{ minWidth: "200px" }}>Players</th>
                        <th></th>
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

      <Modal show={show}>
        <Modal.Header closeButton>
          <Modal.Title>Please Select Server And Reciver</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label className="block text-lg font-semibold text-gray-700 mb-2 me-4">
              Select Server:
            </label>
            <select
              name="server"
              value={server}
              onChange={(e)=> setServer(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            >
              <option value="player_1">Player 1</option>
              <option value="player_2">Player 2</option>
              {matchType === "double" && (
                <>
                  <option value="player_3">Player 3</option>
                  <option value="player_4">Player 4</option>
                </>
              )}
            </select>
          </div>

          <div className="form-group">
            <label className="block text-lg font-semibold text-gray-700 mb-2 me-4">
              Select Receiver:
            </label>
            <select
              name="receiver"
              value={receiver}
              onChange={(e)=> setReceiver(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            >
              <option value="player_1">Player 1</option>
              <option value="player_2">Player 2</option>
              {matchType === "double" && (
                <>
                  <option value="player_3">Player 3</option>
                  <option value="player_4">Player 4</option>
                </>
              )}
            </select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleModalSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
};

export default ScoreBoard;
