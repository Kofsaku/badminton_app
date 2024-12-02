import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const MatchList = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    axios.get("/matches/all").then((response) => {
      setMatches(response.data);
    });
  }, []);

  return (
    <div>
      <h1>All Matches</h1>
      <Link to="/matches/new" className="btn btn-primary">
        Create New Match
      </Link>
      <table className="table mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Players</th>
            <th>Status</th>
            <th>Winner</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((match) => (
            <tr key={match.id}>
              <td>{match.id}</td>
              <td>{match.match_type}</td>
              <td>
                {match.player1} vs {match.player2}
                {match.match_type === "double" &&
                  ` and ${match.player3} vs ${match.player4}`}
              </td>
              <td>{match.status}</td>
              <td>{match.winner || "N/A"}</td>
              <td>
                <Link to={`/scoreboard/${match.id}`} className="btn btn-info">
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MatchList;
