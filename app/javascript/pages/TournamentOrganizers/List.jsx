import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminHeader from "../../components/Shared/AdminHeader";
import AdminSidebar from "../../components/Shared/AdminSidebar";
import { Link } from "react-router-dom";

const TournamentOrganizers = () => {
  const [tournamentOrganizers, setTournamentOrganizers] = useState([]);
  const [destroyUser, setDestroyUser] = useState(false)

  useEffect(() => {
    const url = "/users/organizers-list";
    axios.get(url).then((res) => {
      console.log(res.data);

      setTournamentOrganizers(res.data);
    });
  }, [destroyUser]);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure?');
    if (!confirmDelete) return null;

    const url = `/users/organizers-list/${id}`
    axios.delete(url).then((res) => {
      console.log(res.message)

      setDestroyUser(true)
    })
  }

  return (
    <main className="admin-wrapper d-flex w-100 flex-wrap bg-EEEEEE">
      <AdminSidebar />
      <section className="right-content-wrapper overflow-auto custom-scroll1">
        <AdminHeader />
        <div className="p-3">
          <h1>トーナメント主催者</h1>

          <table className="table">
            <thead>
              <tr>
                <th>名前</th>
                <th>電子メール</th>
                <th>性別</th>
                <th>役割</th>
                <th>生年月日</th>
                <th>アクション</th>
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
                      詳細
                    </Link>
                    <Link
                      to={"/organizer-management/" + organizer.id + "/edit"}
                      className="btn btn-warning"
                    >
                      編集
                    </Link>
                    <Link
                      onClick={() => handleDelete(organizer.id)}
                      className="btn btn-danger"
                    >
                      消去
                    </Link>
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
