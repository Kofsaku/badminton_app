import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import AdminHeader from "../../components/Shared/AdminHeader";
import AdminSidebar from "../../components/Shared/AdminSidebar";
import ShowPhase from "../../components/MatchClass/ShowPhase";
import { useTranslation } from 'react-i18next';

const ShowMatchClass = () => {
  const navigate = useNavigate();
  const params = useParams();

  const { t } = useTranslation();
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

  const camelCaseToPascalCase = (text) => {
    if (text) {
      return text
        .split('_')
        .map((word, index) =>
          index === 0
            ? word.toLowerCase()
            : word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join('');
    }
    return ''; // Return an empty string if text is falsy
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
                <h1>試合詳細</h1>
                <Link to="/match-management" className="btn btn-secondary">
                  戻る
                </Link>
              </div>

              {matchData && (
                <div className="bg-light p-4">
                  <div className="mb-3">
                    <p>大会名</p>
                    <h5>{matchData.tournament.name}</h5>
                  </div>

                  <div className="mb-3">
                    <p>種目名</p>
                    <h5>{t(`tournament.${camelCaseToPascalCase(matchData.tournament_category.category_type)}`)}</h5>
                        
                  </div>

                  <div className="mb-3">
                    <p>部</p>
                    <h5>{matchData.tournament_division.division}部</h5>
                  </div>

                  <div className="mb-3">
                    <p>試合数</p>
                    <h6>{matchData.size}</h6>
                  </div>

                  <button className="btn btn-primary" onClick={goToFirstStep}>
                    次へ
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
