import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminHeader from "../../components/Shared/AdminHeader";
import AdminSidebar from "../../components/Shared/AdminSidebar";
import { Link } from "react-router-dom";

const Timetables = () => {
  const [timetables, setTimetables] = useState([]);

  useEffect(() => {
    const url = "/api/v1/timetables";
    axios.get(url).then((res) => {
      console.log(res.data);

      setTimetables(res.data);
    });
  }, []);

  return (
    <main className="admin-wrapper d-flex w-100 flex-wrap bg-EEEEEE">
      <AdminSidebar />
      <section className="right-content-wrapper overflow-auto custom-scroll1">
        <AdminHeader />
        <div>
          <h1>タイムテーブル</h1>

          <table className="table">
            <thead>
              <tr>
                <th>大会名</th>
                <th>会場名</th>
                <th>開催日</th>
                <th>大会住所</th>
                <th>アクション</th>
              </tr>
            </thead>
            <tbody>
              {timetables.map((timetable) => (
                <tr key={timetable.id}>
                  <td>{timetable.tournament.name}</td>
                  <td>{timetable.venue_name}</td>
                  <td>{timetable.venue_date}</td>
                  <td>{timetable.venue_address}</td>
                  <td>
                    <Link
                      to={"/timetables/" + timetable.id}
                      className="btn btn-info"
                    >
                      詳細
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

export default Timetables;
