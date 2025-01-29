import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import AdminHeader from "../../components/Shared/AdminHeader";
import AdminSidebar from "../../components/Shared/AdminSidebar";

const CreateTimetable = () => {
  const [selectedTournament, setSelectedTournament] = useState(0);
  const [tournaments, setTournaments] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [tournamentVenues, setTournamentVenues] = useState([]);
  const [rowCount, setRowCount] = useState(0);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await axios.get("/api/v1/tournaments");
        setTournaments(response.data);
        console.log(response.data);
        if (response.data.length) setSelectedTournament(response.data[0].id);
      } catch (error) {
        console.error("Error fetching tournaments:", error);
      }
    };

    fetchTournaments();
  }, []);

  useEffect(() => {
    if (!selectedTournament) return;

    const fetchTournamentVenues = async () => {
      try {
        const response = await axios.get(`/api/v1/tournaments/${selectedTournament}/tournament-venues`);
        setTournamentVenues(response.data);
        if (response.data.length) setSelectedVenue(response.data[0]);
      } catch (error) {
        console.error("Error fetching tournament venues:", error);
      }
    };

    fetchTournamentVenues();
  }, [selectedTournament]);

  const handleTournamentChange = (e) => {
    setSelectedTournament(e.target.value);
  };

  const handleVenueChange = (e) => {
    const venue = tournamentVenues.find((venue) => venue.id == e.target.value);
    setSelectedVenue(venue);
  };

  const addRow = () => {
    setRowCount(rowCount + 1);
  };

  return (
    <main className="admin-wrapper d-flex w-100 flex-wrap bg-EEEEEE">
      <AdminSidebar />
      <section className="right-content-wrapper overflow-auto custom-scroll1">
        <AdminHeader />
        <div className="p-3">
          <h1>Create New TimeTable</h1>
          <Link to="/timetables" className="btn btn-primary">
            Back to Timetables
          </Link>
          <form action="">
            <div className="form-group">
              <label>Tournament</label>
              <select
                className="form-control"
                onChange={handleTournamentChange}
                value={selectedTournament}
              >
                {tournaments.map((tournament) => (
                  <option key={tournament.id} value={tournament.id}>
                    {tournament.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Select Venue and Date</label>
              <select className="form-control" onChange={handleVenueChange}>
                {tournamentVenues.map((tournamentVenue) => (
                  <option key={tournamentVenue.id} value={tournamentVenue.id}>
                    {tournamentVenue.venue_name + " " + tournamentVenue.venue_date}
                  </option>
                ))}
              </select>
            </div>
          </form>

          <button className="btn btn-success my-3" onClick={addRow}>
            Add Row
          </button>

          {selectedVenue && (
            <table className="table">
              <thead>
                <tr>
                  <th>Time</th>
                  {Array.from({ length: selectedVenue.no_of_courts }).map(
                    (_, index) => (
                      <th key={index}>コート {index + 1}</th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: rowCount }).map((_, index) => (
                  <tr key={index}>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </main>
  );
};

export default CreateTimetable;
