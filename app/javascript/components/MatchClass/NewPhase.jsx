import React, { useState } from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  const [matchType, setMatchType] = useState(false);

  const handleMatchTypeChange = (val) => {
    setMatchType(val);
  };

  const submitMatchData = (matchData) => {
    matchData.matchType = matchType;

    addMatch(matchData);
  };

  const camelCaseToPascalCase = (text) => {
    if (text) {
      return text
        .split("_")
        .map((word, index) =>
          index === 0
            ? word.toLowerCase()
            : word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join("");
    }
    return "";
  };

  return (
    <>
      <h3 className="fw-bold">マッチ作成</h3>
      <p>
        {selectedTournament.name + " " + t(`tournament.${camelCaseToPascalCase(category.category_type)}`)}
      </p>

      <div className="bg-light p-4">
        <div className="mb-3">
          <label>試合形式</label>
          <ul className="nav nav-pills">
            <li className="nav-item">
              <button
                type="button"
                className={`nav-link border-color-green border ${
                  !matchType ? "bg-green1 text-light" : "text-dark"
                }`}
                onClick={() => handleMatchTypeChange(false)}
              >
                リーグ戦
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
                トーナメント戦
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
