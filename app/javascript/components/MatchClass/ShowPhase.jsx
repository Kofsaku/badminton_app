import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import ShowRoundRobin from "./ShowRoundRobin";
import ShowKnockout from "./ShowKnockout";

const ShowPhase = ({ step, matchData, goToPrev, goToNext }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const roundData = matchData.match_rounds[step - 1];
  const prevNoOfWinners =
    matchData.match_rounds[step - 2]?.number_of_winners ?? 0;

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
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="fw-bold">試合詳細</h3>
        <Link to="/match-management" className="btn btn-secondary">
          戻る
        </Link>
      </div>
      <p>
        {matchData.tournament.name + " " + t(`tournament.${camelCaseToPascalCase(matchData.tournament_category.category_type)}`)}
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
            前へ
          </button>
        }
        {step < matchData.size && (
          <button onClick={goToNext} className="btn btn-success">
            次へ
          </button>
        )}
      </div>
    </>
  );
};

export default ShowPhase;
