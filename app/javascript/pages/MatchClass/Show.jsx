import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import AdminHeader from "../../components/Shared/AdminHeader";
import AdminSidebar from "../../components/Shared/AdminSidebar";
import ShowPhase from "../../components/MatchClass/ShowPhase";

const ShowMatchClass = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [step, setStep] = useState(0);
  const [matchData, setMatchData] = useState(null);

  useEffect(() => {
    const url = `/api/v1/match_classes/${params.id}`;
    axios.get(url).then((res) => {
      setMatchData(res.data);
    });
  }, []);

  const goToFirstStep = () => {
    setStep(1);
  };

  const goToPrev = () => {
    setStep(step - 1);
  };

  const goToNext = () => {
    setStep(step + 1);
  };

  return (
    <main className="admin-wrapper d-flex w-100 flex-wrap bg-EEEEEE">
      <AdminSidebar />
      <section className="right-content-wrapper overflow-auto custom-scroll1">
        <AdminHeader />
        <div className="p-3">
          {!step ? (
            <>
              <div className="d-flex justify-content-between align-items-center">
                <h1>Show Match Class</h1>
                <Link to="/match-management" className="btn btn-secondary">
                  Back
                </Link>
              </div>

              {matchData && (
                <div className="bg-light p-4">
                  <div className="mb-3">
                    <p>Tournament</p>
                    <h5>{matchData.tournament.name}</h5>
                  </div>

                  <div className="mb-3">
                    <p>Tournament Category</p>
                    <h5>{matchData.tournament_category.category_type}</h5>
                  </div>

                  <div className="mb-3">
                    <p>Tournament Division</p>
                    <h5>{matchData.tournament_division.division}</h5>
                  </div>

                  <div className="mb-3">
                    <p>Match Size</p>
                    <h6>{matchData.size}</h6>
                  </div>

                  <button className="btn btn-primary" onClick={goToFirstStep}>
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <ShowPhase
              step={step}
              matchData={matchData}
              goToPrev={goToPrev}
              goToNext={goToNext}
            />
          )}
        </div>
      </section>
    </main>
  );
};

export default ShowMatchClass;
