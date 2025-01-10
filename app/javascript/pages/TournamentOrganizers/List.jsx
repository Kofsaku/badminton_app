import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminHeader from "../../components/Shared/AdminHeader";
import AdminSidebar from "../../components/Shared/AdminSidebar";
import { Link } from "react-router-dom";

const TournamentOrganizers = () => {
  const [tournamentOrganizers, setTournamentOrganizers] = useState([]);

  useEffect(() => {
    const url = "/users/organizers-list";
    axios.get(url).then((res) => {
      console.log(res.data);

      setTournamentOrganizers(res.data);
    });
  }, []);

  //   const handleDelete = (id) => {
  //     const confirmDelete = window.confirm("Are you sure?");
  //     if (confirmDelete) {
  //       const url = `/api/v1/tournament-tables/${id}`;
  //       const token = document.querySelector('meta[name="csrf-token"]').content;

  //       axios
  //         .delete(url, {
  //           headers: {
  //             "X-CSRF-Token": token,
  //             "Content-Type": "application/json",
  //           },
  //         })
  //         .then((res) => {
  //           console.log(res.data);

  //           setTournamentTables(
  //             tournamentTables.filter((table) => table.id !== id)
  //           );
  //         });
  //     }
  //   };

  return (
    <main className="admin-wrapper d-flex w-100 flex-wrap bg-EEEEEE">
      <AdminSidebar />
      <section className="right-content-wrapper overflow-auto custom-scroll1">
        <AdminHeader />
        <div className="p-3">
          <h1>Tournament Organizers</h1>

          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Role</th>
                <th>Date of Birth</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tournamentOrganizers.map((organizer) => (
                <tr key={organizer.id}>
                  <td>{organizer.full_name}</td>
                  <td>{organizer.email}</td>
                  <td>{organizer.profile.gender}</td>
                  <td>{organizer.profile.role}</td>
                  <td>{organizer.profile.date_of_birth}</td>
                  <td>
                    <Link
                      to={"/organizer-management/" + organizer.id}
                      className="btn btn-info"
                    >
                      Show
                    </Link>
                    <Link
                      to={"/organizer-management/" + organizer.id + "/edit"}
                      className="btn btn-warning"
                    >
                      Edit
                    </Link>
                    {/* <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(organizer.id)}
                    >
                      Delete
                    </button> */}
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

export default TournamentOrganizers;
