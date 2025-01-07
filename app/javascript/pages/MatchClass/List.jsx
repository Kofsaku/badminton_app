import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminHeader from "../../components/Shared/AdminHeader";
import AdminSidebar from "../../components/Shared/AdminSidebar";
import { Link } from "react-router-dom";

const MatchClasses = () => {
  const [matchClasses, setMatchClasses] = useState([]);

  useEffect(() => {
    const url = "/api/v1/match_classes";
    axios.get(url).then((res) => {
      console.log(res.data);

      setMatchClasses(res.data);
    });
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure?");
    if (confirmDelete) {
      const url = `/api/v1/match_classes/${id}`;
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

          setMatchClasses(matchClasses.filter((match) => match.id !== id));
        });
    }
  };

  return (
    <main className="admin-wrapper d-flex w-100 flex-wrap bg-EEEEEE">
      <AdminSidebar />
      <section className="right-content-wrapper overflow-auto custom-scroll1">
        <AdminHeader />
        <div className="p-3">
          <h1>Match Classes</h1>
          <Link to="/match-management/new" className="btn btn-primary">
            New Match Class
          </Link>

          <table className="table">
            <thead>
              <tr>
                <th>Tournament</th>
                <th>Category</th>
                <th>Division</th>
                <th>Size</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {matchClasses.map((matchClass) => (
                <tr key={matchClass.id}>
                  <td>{matchClass.tournament.name}</td>
                  <td>{matchClass.tournament_category.category_type}</td>
                  <td>{matchClass.tournament_division.division}</td>
                  <td>{matchClass.size}</td>
                  <td>
                    {/* <Link
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
                    </Link> */}
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(matchClass.id)}
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

export default MatchClasses;
