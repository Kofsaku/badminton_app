import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminHeader from "../components/Shared/AdminHeader";
import AdminSidebar from "../components/Shared/AdminSidebar";

const NewMatch = () => {
  const [match, setMatch] = useState({
    match_type: "single",
    player1: "",
    player2: "",
    player3: "",
    player4: "",
    server: "player_1",
    receiver: "player_3"
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
    <main className="admin-wrapper d-flex w-100 flex-wrap bg-gray-100">
      <AdminSidebar />
      <section className="right-content-wrapper overflow-auto p-8">
        <AdminHeader />
        <div className="form-container bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
            Create New Match
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6 m-4">
            <div className="form-group">
              <label className="block text-lg font-semibold text-gray-700 mb-2 me-4">Match Type:</label>
              <select
                name="match_type"
                value={match.match_type}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              >
                <option value="single">Single</option>
                <option value="double">Double</option>
              </select>
            </div>

            <div className="form-group">
              <label className="block text-lg font-semibold text-gray-700 mb-2 me-4">Player1:</label>
              <input
                name="player1"
                value={match.player1}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                required
              />
            </div>

            <div className="form-group">
              <label className="block text-lg font-semibold text-gray-700 mb-2 me-4">Player2:</label>
              <input
                name="player2"
                value={match.player2}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                required
              />
            </div>

            {match.match_type === "double" && (
              <>
                <div className="form-group">
                  <label className="block text-lg font-semibold text-gray-700 mb-2 me-4">Player3:</label>
                  <input
                    name="player3"
                    value={match.player3}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="block text-lg font-semibold text-gray-700 mb-2 me-4">Player4:</label>
                  <input
                    name="player4"
                    value={match.player4}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                    required
                  />
                </div>
              </>
            )}

            <div className="form-group">
              <label className="block text-lg font-semibold text-gray-700 mb-2 me-4">Select Server:</label>
              <select
                name="server"
                value={match.server}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              >
                <option value="player_1">Player 1</option>
                <option value="player_2">Player 2</option>
                {match.match_type === "double" && (
                  <>
                    <option value="player_3">Player 3</option>
                    <option value="player_4">Player 4</option>
                  </>
                )}
              </select>
            </div>

            <div className="form-group">
              <label className="block text-lg font-semibold text-gray-700 mb-2 me-4">Select Receiver:</label>
              <select
                name="receiver"
                value={match.receiver}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              >
                <option value="player_1">Player 1</option>
                <option value="player_2">Player 2</option>
                {match.match_type === "double" && (
                  <>
                    <option value="player_3">Player 3</option>
                    <option value="player_4">Player 4</option>
                  </>
                )}
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-primary text-white font-semibold rounded-md transition duration-300 mb-4"
            >
              Create Match
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default NewMatch;
