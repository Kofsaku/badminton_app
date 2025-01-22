import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import ShowRoundRobin from "./ShowRoundRobin";
import ShowKnockout from "./ShowKnockout";

const ShowPhase = ({ step, matchData, goToPrev, goToNext }) => {
  const navigate = useNavigate();

  const roundData = matchData.match_rounds[step - 1];
  const prevNoOfWinners =
    matchData.match_rounds[step - 2]?.number_of_winners ?? 0;

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="fw-bold">Match Details</h3>
        <Link to="/match-management" className="btn btn-secondary">
          Back
        </Link>
      </div>
      <p>
        {matchData.tournament.name +
          " " +
          matchData.tournament_category.category_type}
      </p>

      <div className="bg-light p-4">
        {!roundData.round_type ? (
          <ShowRoundRobin
            roundData={roundData}
            step={step}
            prevNoOfWinners={prevNoOfWinners}
            matchSize={matchData.size}
          />
        ) : (
          <ShowKnockout
            roundData={roundData}
            step={step}
            prevNoOfWinners={prevNoOfWinners}
            matchSize={matchData.size}
          />
        )}

        {
          <button onClick={goToPrev} className="btn btn-success">
            Prev
          </button>
        }
        {step < matchData.size && (
          <button onClick={goToNext} className="btn btn-success">
            Next
          </button>
        )}
      </div>
    </>
  );
};

export default ShowPhase;
