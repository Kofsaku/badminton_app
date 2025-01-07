import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import FirstRoundRobin from "./FirstRoundRobin";
import NewRoundRobin from "./NewRoundRobin";
import FirstKnockout from "./FirstKnockout";
import NewKnockout from "./NewKnockout";

const NewPhase = ({
  selectedTournament,
  category,
  step,
  classSize,
  classData,
  addMatch,
}) => {
  const navigate = useNavigate();
  const [matchType, setMatchType] = useState(false);

  const handleMatchTypeChange = (val) => {
    setMatchType(val);
  };

  const submitMatchData = (matchData) => {
    matchData.matchType = matchType;

    addMatch(matchData);
  };

  return (
    <>
      <h1>New Match</h1>
      <p>{selectedTournament.name + " " + category.category_type}</p>

      <div className="bg-light p-4">
        <div className="mb-3">
          <label>Match Format</label>
          <ul className="nav nav-pills">
            <li className="nav-item">
              <button
                type="button"
                className={`nav-link border-color-green border ${
                  !matchType ? "bg-green1 text-light" : "text-dark"
                }`}
                onClick={() => handleMatchTypeChange(false)}
              >
                Round Robin
              </button>
            </li>
            <li className="nav-item">
              <button
                type="button"
                className={`nav-link border-color-green border ${
                  matchType ? "bg-green1 text-light" : "text-dark"
                }`}
                onClick={() => handleMatchTypeChange(true)}
              >
                Knockout
              </button>
            </li>
          </ul>
        </div>

        {step == 1 && !matchType ? (
          <FirstRoundRobin
            selectedTournament={selectedTournament}
            step={step}
            classSize={classSize}
            addMatch={submitMatchData}
          />
        ) : step > 1 && !matchType ? (
          <NewRoundRobin
            selectedTournament={selectedTournament}
            step={step}
            classSize={classSize}
            classData={classData}
            addMatch={submitMatchData}
          />
        ) : step == 1 && matchType ? (
          <FirstKnockout
            selectedTournament={selectedTournament}
            step={step}
            classSize={classSize}
            addMatch={submitMatchData}
          />
        ) : (
          <NewKnockout
            selectedTournament={selectedTournament}
            step={step}
            classSize={classSize}
            classData={classData}
            addMatch={submitMatchData}
          />
        )}
      </div>
    </>
  );
};

export default NewPhase;
