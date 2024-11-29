import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NewMatch = () => {
  const [match, setMatch] = useState({
    match_type: "single",
    player1: "",
    player2: "",
    player3: "",
    player4: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setMatch({ ...match, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("/matches", match).then((response) => {
      navigate(`/matches/${response.data.id}/scoreboard`);
    });
  };

  return (
    <div>
      <h1>Create New Match</h1>
      <form onSubmit={handleSubmit}>
        <label>Match Type:</label>
        <select name="match_type" onChange={handleChange}>
          <option value="single">Single</option>
          <option value="double">Double</option>
        </select>
        <label>Player1:</label>
        <input name="player1" onChange={handleChange} />
        <label>Player2:</label>
        <input name="player2" onChange={handleChange} />
        {match.match_type === "double" && (
          <>
            <label>Player3:</label>
            <input name="player3" onChange={handleChange} />
            <label>Player4:</label>
            <input name="player4" onChange={handleChange} />
          </>
        )}
        <button type="submit">Create Match</button>
      </form>
    </div>
  );
};

export default NewMatch;
