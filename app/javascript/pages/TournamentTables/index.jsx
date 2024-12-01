import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminHeader from "../../components/Shared/AdminHeader";
import AdminSidebar from "../../components/Shared/AdminSidebar";
import { Link } from "react-router-dom";

const TournamentTables = () => {
  const [tournamentTables, setTournamentTables] = useState([]);

  useEffect(() => {
    const url = "/api/v1/tournament-tables";
    axios.get(url).then((res) => {
      console.log(res.data);

      setTournamentTables(res.data);
    });
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure?");
    if (confirmDelete) {
      const url = `/api/v1/tournament-tables/${id}`;
      const token = document.querySelector('meta[name="csrf-token"]').content;

      axios
        .delete(url, {
          headers: {
            "X-CSRF-Token": token,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log(res.data);
        });
    }
  };

  return (
    <main className="admin-wrapper d-flex w-100 flex-wrap bg-EEEEEE">
      <AdminSidebar />
      <section className="right-content-wrapper overflow-auto custom-scroll1">
        <AdminHeader />
        <div className="p-3">
          <h1>Tournament Tables</h1>
          <Link
            to="/tournament-tables/new-round-robin"
            className="btn btn-primary"
          >
            New Round Robin Table
          </Link>
          <Link
            to="/tournament-tables/new-knockout"
            className="btn btn-primary"
          >
            New Knockout Table
          </Link>

          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Tournament</th>
                <th>Category</th>
                <th>Division</th>
                <th>Size</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tournamentTables.map((tournamentTable) => (
                <tr key={tournamentTable.id}>
                  <td>{tournamentTable.name}</td>
                  <td>{tournamentTable.table_type}</td>
                  <td>{tournamentTable.tournament.name}</td>
                  <td>{tournamentTable.tournament_category.category_type}</td>
                  <td>{tournamentTable.tournament_division.division}</td>
                  <td>{tournamentTable.size}</td>
                  <td>
                    <Link
                      to={"/tournament-tables/" + tournamentTable.id}
                      className="btn btn-info"
                    >
                      Show
                    </Link>
                    <Link
                      to={"/tournament-tables/" + tournamentTable.id + "/edit"}
                      className="btn btn-warning"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(tournamentTable.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};

export default TournamentTables;
