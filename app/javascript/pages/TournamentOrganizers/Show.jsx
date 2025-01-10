import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminHeader from "../../components/Shared/AdminHeader";
import AdminSidebar from "../../components/Shared/AdminSidebar";
import { Link, useParams } from "react-router-dom";

const TournamentOrganizer = () => {
  const params = useParams();
  const [tournamentOrganizer, setTournamentOrganizer] = useState(null);

  useEffect(() => {
    const url = "/users/organizers-list/" + params.id;
    axios.get(url).then((res) => {
      console.log(res.data);

      setTournamentOrganizer(res.data);
    });
  }, []);

  return (
    <main className="admin-wrapper d-flex w-100 flex-wrap bg-EEEEEE">
      <AdminSidebar />
      <section className="right-content-wrapper overflow-auto custom-scroll1">
        <AdminHeader />
        <div className="p-3">
          <h1>Tournament Organizers</h1>

          {tournamentOrganizer && (
            <>
              <div>
                <h4>Name</h4>
                <p>{tournamentOrganizer.full_name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{tournamentOrganizer.email}</p>
              </div>
              <div>
                <h4>Gender</h4>
                <p>{tournamentOrganizer.profile.gender}</p>
              </div>
              <div>
                <h4>Role</h4>
                <p>{tournamentOrganizer.profile.role}</p>
              </div>
              <div>
                <h4>Date of Birth</h4>
                <p>{tournamentOrganizer.profile.date_of_birth}</p>
              </div>
            </>
          )}

          <Link to="/organizer-management" className="btn btn-primary">
            Back to List
          </Link>
        </div>
      </section>
    </main>
  );
};

export default TournamentOrganizer;
