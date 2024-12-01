import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminHeader from "../../components/Shared/AdminHeader";
import AdminSidebar from "../../components/Shared/AdminSidebar";
import { Link, useParams } from "react-router-dom";

const TournamentTable = () => {
  const { id } = useParams();
  const [tournamentTable, setTournamentTable] = useState(null);

  useEffect(() => {
    const url = `/api/v1/tournament-tables/${id}`;
    axios.get(url).then((res) => {
      console.log(res.data);

      const { table, players } = res.data;

      setTournamentTable(table);
    });
  }, [id]);

  return (
    <main className="admin-wrapper d-flex w-100 flex-wrap bg-EEEEEE">
      <AdminSidebar />
      <section className="right-content-wrapper overflow-auto custom-scroll1">
        <AdminHeader />
        <div className="p-3">
          {tournamentTable && (
            <>
              <h1>
                {tournamentTable.table_type === "league"
                  ? "Round Robin Table"
                  : "Knockout Table"}{" "}
                - {tournamentTable.name}
              </h1>
              <h5>
                <strong>Tournament: </strong>
                {tournamentTable.tournament.name}
              </h5>
              <h5>
                <strong>Tournament Venue & Date: </strong>
                {tournamentTable.tournament_venue.venue_name +
                  " " +
                  tournamentTable.tournament_venue.venue_date}
              </h5>
              <h5>
                <strong>Tournament Category: </strong>
                {tournamentTable.tournament_category.category_type}
              </h5>
              <h5>
                <strong>Tournament Division: </strong>
                {tournamentTable.tournament_division.division}
              </h5>
              <h5>
                <strong>
                  {tournamentTable.table_type === "league"
                    ? "Table Size: "
                    : "Bracket Size: "}
                </strong>
                {tournamentTable.size}
              </h5>
              {tournamentTable.table_type === "tournament" && (
                <h5>
                  <strong>Bracket Direction: </strong>
                  {tournamentTable.bracket_direction}
                </h5>
              )}

              <Link to="edit" className="btn btn-primary">
                Edit Table
              </Link>
              <Link to="/tournament-tables" className="btn btn-secondary">
                Back to List
              </Link>
            </>
          )}
        </div>
      </section>
    </main>
  );
};

export default TournamentTable;
