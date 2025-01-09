import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

import AdminHeader from "../../components/Shared/AdminHeader";
import AdminSidebar from "../../components/Shared/AdminSidebar";

const ShowTimetable = () => {
  const [timetable, setTimetable] = useState({ tournament_venue: null });
  const { id } = useParams();

  const {
    tournament,
    venue_name,
    venue_date,
    no_of_courts,
    timetable_cells: timeCells,
  } = timetable;

  useEffect(() => {
    const url = `/api/v1/timetables/${id}`;
    axios.get(url).then((res) => {
      console.log(res.data);

      setTimetable(res.data);
    });
  }, [id]);

  const showTableBody = () => {
    const completedRows = parseInt(timeCells.length / no_of_courts);
    const isIncompleted = timeCells.length % no_of_courts ? 1 : 0;

    const rowCount = completedRows + isIncompleted;

    const rowArray = Array.from({ length: rowCount }).map((_, rowIndex) => {
      return (
        <tr key={rowIndex}>
          <td>Time {rowIndex + 1}</td>
          {rowIndex === rowCount - 1 && timeCells.length % no_of_courts
            ? Array.from({
                length: timeCells.length % no_of_courts,
              })
                .map(
                  (_, colIndex) => timeCells[no_of_courts * rowIndex + colIndex]
                )
                .map((timeCell) => (
                  <td key={timeCell.id}>
                    <Link to={`/matches/${timeCell.match?.id}/scoreboard`}>
                      {(timeCell.tournament_player.player_type === "User"
                        ? timeCell.tournament_player.player.full_name
                        : timeCell.tournament_player.player.title) +
                        " : " +
                        (timeCell.second_tournament_player.player_type ===
                        "User"
                          ? timeCell.second_tournament_player.player.full_name
                          : timeCell.second_tournament_player.player.title)}
                    </Link>
                  </td>
                ))
            : Array.from({ length: no_of_courts })
                .map(
                  (_, colIndex) => timeCells[no_of_courts * rowIndex + colIndex]
                )
                .map((timeCell) => (
                  <td key={timeCell.id}>
                    <Link to={`/matches/${timeCell.match?.id}/scoreboard`}>
                      {(timeCell.tournament_player.player_type === "User"
                        ? timeCell.tournament_player.player.full_name
                        : timeCell.tournament_player.player.title) +
                        " : " +
                        (timeCell.second_tournament_player.player_type ===
                        "User"
                          ? timeCell.second_tournament_player.player.full_name
                          : timeCell.second_tournament_player.player.title)}
                    </Link>
                  </td>
                ))}
        </tr>
      );
    });

    return rowArray;
  };

  return (
    <main className="admin-wrapper d-flex w-100 flex-wrap bg-EEEEEE">
      <AdminSidebar />
      <section className="right-content-wrapper overflow-auto custom-scroll1">
        <AdminHeader />
        <div>
          <h1>Timetable</h1>
          {tournament && (
            <>
              <h5>
                <strong>Tournament:</strong>
                {" " + tournament.name}
              </h5>
              <h5>
                <strong>Tournament Venue:</strong>
                {" " + venue_name + " " + venue_date}
              </h5>
              <table className="table">
                <thead>
                  <tr>
                    <th>Time / Court</th>
                    {Array.from({ length: no_of_courts }).map((_, index) => (
                      <th key={index}>Court {index + 1}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>{showTableBody()}</tbody>
              </table>
            </>
          )}
          <Link to="/timetables" className="btn btn-primary">
            Back to Tables
          </Link>
        </div>
      </section>
    </main>
  );
};

export default ShowTimetable;
