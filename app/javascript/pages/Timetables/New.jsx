import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

import AdminHeader from "../../components/Shared/AdminHeader";
import AdminSidebar from "../../components/Shared/AdminSidebar";

const CreateTimetable = () => {
  const [selectedTournament, setSelectedTournament] = useState(0);
  const [tournaments, setTournaments] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [tournamentVenues, setTournamentVenues] = useState([]);
  const [rowCount, setRowCount] = useState(0);

  useEffect(() => {
    const url = "/api/v1/tournaments";
    axios.get(url).then((res) => {
      console.log(res.data);

      setTournaments(res.data);
      if (res.data.length) setSelectedTournament(res.data[0].id);
    });
  }, []);

  useEffect(() => {
    if (!selectedTournament) return;

    const url = `/api/v1/tournaments/${selectedTournament}/tournament-venues`;
    axios.get(url).then((res) => {
      console.log(res.data);

      setTournamentVenues(res.data);
      if (res.data.length) setSelectedVenue(res.data[0]);
    });
  }, [selectedTournament]);

  const handleTournamentChange = (e) => {
    console.log(e.target.value);
    setSelectedTournament(e.target.value);
  };

  const handleVenueChange = (e) => {
    console.log(e.target.value);
    const venue = tournamentVenues.find((venue) => venue.id == e.target.value);
    console.log(venue);

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
                    {tournamentVenue.venue_name +
                      " " +
                      tournamentVenue.venue_date}
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
