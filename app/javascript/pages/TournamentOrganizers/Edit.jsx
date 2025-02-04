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
          <h1>トーナメント主催者</h1>

          <form onSubmit={handleSubmit}>
            {tournamentOrganizer && (
              <>
                <div>
                  <label>名前</label>
                  <input
                    type="text"
                    name="full_name"
                    value={tournamentOrganizer.full_name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>電子メール</label>
                  <input
                    type="text"
                    name="email"
                    value={tournamentOrganizer.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>性別</label>
                  <select
                    name="gender"
                    value={tournamentOrganizer.gender}
                    onChange={handleChange}
                  >
                    <option value="">性別を選択してください</option>
                    <option value="male">男性</option>
                    <option value="female">女性</option>
                  </select>
                </div>
                <div>
                  <label>役割</label>
                  <select
                    name="role"
                    value={tournamentOrganizer.role}
                    onChange={handleChange}
                  >
                    <option value="">役割の選択</option>
                    <option value="Player">Player</option>
                    <option value="Tournament Organizer">
                      大会運営者
                    </option>
                    <option value="Both">Both</option>
                  </select>
                </div>
                <div>
                  <label>生年月日</label>
                  <input
                    type="date"
                    name="date_of_birth"
                    value={tournamentOrganizer.date_of_birth}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}

            <input type="submit" value="保存" className="btn btn-success"/>
            <Link to="/organizer-management" className="btn btn-primary">
              戻る
            </Link>
          </form>
        </div>
      </section>
    </main>
  );
};

export default TournamentOrganizer;
