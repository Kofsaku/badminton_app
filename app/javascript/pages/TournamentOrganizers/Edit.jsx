import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import AdminHeader from "../../components/Shared/AdminHeader";
import AdminSidebar from "../../components/Shared/AdminSidebar";
import axiosInstance from "../../api/axiosInstance";

const TournamentOrganizer = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [tournamentOrganizer, setTournamentOrganizer] = useState({
    full_name: "",
    email: "",
    gender: "",
    role: "",
    date_of_birth: "",
  });

  useEffect(() => {
    const url = "/users/organizers-list/" + params.id;
    axios.get(url).then((res) => {
      console.log(res.data);
      const { full_name, email, profile } = res.data;

      setTournamentOrganizer({
        full_name,
        email,
        gender: profile.gender ?? "",
        role: profile.role,
        date_of_birth: profile.date_of_birth ?? "",
      });
    });
  }, []);

  const handleChange = (e) => {
    setTournamentOrganizer({
      ...tournamentOrganizer,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = {
      full_name: tournamentOrganizer.full_name,
      email: tournamentOrganizer.email,
      profile_attributes: {
        gender: tournamentOrganizer.gender,
        role: tournamentOrganizer.role,
        date_of_birth: tournamentOrganizer.date_of_birth,
      },
    };
    const url = `/users/organizers-list/${params.id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    axiosInstance
      .put(url, body, {
        headers: { "X-CSRF-Token": token, "Content-Type": "application/json" },
      })
      .then((res) => {
        console.log(res.data);

        alert("user updated successfully.");
        navigate("/organizer-management");
      });
  };

  return (
    <main className="admin-wrapper d-flex w-100 flex-wrap bg-EEEEEE">
      <AdminSidebar />
      <section className="right-content-wrapper overflow-auto custom-scroll1">
        <AdminHeader />
        <div className="p-3">
          <h1>Tournament Organizers</h1>

          <form onSubmit={handleSubmit}>
            {tournamentOrganizer && (
              <>
                <div>
                  <label>Name</label>
                  <input
                    type="text"
                    name="full_name"
                    value={tournamentOrganizer.full_name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>Email</label>
                  <input
                    type="text"
                    name="email"
                    value={tournamentOrganizer.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>Gender</label>
                  <select
                    name="gender"
                    value={tournamentOrganizer.gender}
                    onChange={handleChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div>
                  <label>Role</label>
                  <select
                    name="role"
                    value={tournamentOrganizer.role}
                    onChange={handleChange}
                  >
                    <option value="">Select Role</option>
                    <option value="Player">Player</option>
                    <option value="Tournament Organizer">
                      Tournament Organizer
                    </option>
                    <option value="Both">Both</option>
                  </select>
                </div>
                <div>
                  <label>Date of Birth</label>
                  <input
                    type="date"
                    name="date_of_birth"
                    value={tournamentOrganizer.date_of_birth}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}

            <input type="submit" value="Save" className="btn btn-success" />
            <Link to="/organizer-management" className="btn btn-primary">
              Back to List
            </Link>
          </form>
        </div>
      </section>
    </main>
  );
};

export default TournamentOrganizer;
