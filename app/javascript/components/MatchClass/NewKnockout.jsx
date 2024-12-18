import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminHeader from "../../components/Shared/AdminHeader";
import AdminSidebar from "../../components/Shared/AdminSidebar";
import { Link, useNavigate } from "react-router-dom";

const NewKnockout = () => {
  const navigate = useNavigate();

  const [selectedTournament, setSelectedTournament] = useState(0);
  const [tournaments, setTournaments] = useState([]);
  const [tableName, setTableName] = useState("");
  const [selectedTournamentVenue, setSelectedTournamentVenue] = useState(0);
  const [tournamentVenues, setTournamentVenues] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [tournamentCategories, setTournamentCategories] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState(0);
  const [tournamentDivisions, setTournamentDivisions] = useState([]);
  const [bracketSize, setBracketSize] = useState(0);
  const [bracketDirection, setBracketDirection] = useState("");
  const [tournamentPlayers, setTournamentPlayers] = useState([]);

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

    const url = `/api/v1/tournaments/${selectedTournament}/tournament-data`;
    axios.get(url).then((res) => {
      console.log(res.data);

      const { tournament_venues, tournament_categories, tournament_players } =
        res.data;
      setTournamentVenues(tournament_venues);
      setTournamentCategories(tournament_categories);
      setTournamentPlayers(tournament_players);
      setBracketSize(tournament_players.length);

      if (tournament_venues.length)
        setSelectedTournamentVenue(tournament_venues[0].id);
      if (tournament_categories.length) {
        setSelectedCategory(tournament_categories[0].id);
        console.log("selected category changed");
      }
    });
  }, [selectedTournament]);

  useEffect(() => {
    if (!selectedCategory) return;

    const url = `/api/v1/categories/${selectedCategory}/divisions`;
    axios.get(url).then((res) => {
      console.log(res.data);

      const { divisions } = res.data;
      setTournamentDivisions(divisions);

      if (divisions.length) setSelectedDivision(divisions[0].id);
    });
  }, [selectedCategory]);

  const onChange = (e, setFunction) => {
    console.log(e.target.value);

    setFunction(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = {
      table_type: "tournament",
      name: tableName,
      tournament_id: selectedTournament,
      tournament_venue_id: selectedTournamentVenue,
      tournament_category_id: selectedCategory,
      tournament_division_id: selectedDivision,
      size: bracketSize,
      bracket_direction: bracketDirection,
    };
    const url = "/api/v1/tournament-tables";
    const token = document.querySelector('meta[name="csrf-token"]').content;

    axios
      .post(url, body, {
        headers: { "X-CSRF-Token": token, "Content-Type": "application/json" },
      })
      .then((res) => {
        console.log(res.data);
        navigate(`/tournament-tables/${res.data.id}`);
      });

    console.log(token, body);
  };

  return (
    <main className="admin-wrapper d-flex w-100 flex-wrap bg-EEEEEE">
      <AdminSidebar />
      <section className="right-content-wrapper overflow-auto custom-scroll1">
        <AdminHeader />
        <div className="p-3">
          <h1>New Knockout Table</h1>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Table Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                onChange={(e) => onChange(e, setTableName)}
              />
            </div>

            <div className="mb-3">
              <label>Tournament</label>
              <select
                name="tournament"
                className="form-control"
                onChange={(e) => onChange(e, setSelectedTournament)}
              >
                {tournaments.map((tournament) => (
                  <option key={tournament.id} value={tournament.id}>
                    {tournament.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label>Tournament Venue and Date</label>
              <select
                name="tournament_venue"
                className="form-control"
                onChange={(e) => onChange(e, setSelectedTournamentVenue)}
              >
                {tournamentVenues &&
                  tournamentVenues.map((venue) => (
                    <option key={venue.id} value={venue.id}>
                      {venue.venue_name + " " + venue.venue_date}
                    </option>
                  ))}
              </select>
            </div>

            <div className="mb-3">
              <label>Tournament Category</label>
              <select
                name="tournament_category"
                className="form-control"
                onChange={(e) => onChange(e, setSelectedCategory)}
              >
                {tournamentCategories &&
                  tournamentCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.category_type}
                    </option>
                  ))}
              </select>
            </div>

            <div className="mb-3">
              <label>Tournament Division</label>
              <select
                name="tournament_division"
                className="form-control"
                onChange={(e) => onChange(e, setSelectedDivision)}
              >
                {tournamentDivisions &&
                  tournamentDivisions.map((division) => (
                    <option key={division.id} value={division.id}>
                      {division.division}
                    </option>
                  ))}
              </select>
            </div>

            <div className="mb-3">
              <label>Bracket Size (e.g., 4, 8, 16)</label>
              <input
                type="number"
                name="size"
                className="form-control"
                value={bracketSize}
                min={2}
                max={tournamentPlayers.length}
                onKeyDown={(e) => e.preventDefault()}
                onChange={(e) => onChange(e, setBracketSize)}
              />
            </div>

            <div>
              <label>Bracket Direction</label>
              <select
                className="form-control"
                onChange={(e) => onChange(e, setBracketDirection)}
              >
                <option value="">Select Direction</option>
                <option value="left_to_right">left_to_right</option>
                <option value="right_to_left">right_to_left</option>
              </select>
            </div>

            <input type="submit" value="Save" className="btn btn-primary" />
            <Link to="/tournament-tables" className="btn btn-secondary">
              Cancel
            </Link>
          </form>
        </div>
      </section>
    </main>
  );
};

export default NewKnockout;
