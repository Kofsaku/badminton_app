import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import MatchOrder from "./MatchOrder";
import { useTranslation } from 'react-i18next';

const MatchList = ({detail}) => {
  const { t } = useTranslation();

  const [matches, setMatches] = useState([]);
  const [viewDetail, setViewDetail] = useState(detail || false)
  const [detailId, setDetailId] = useState(0)

  useEffect(() => {
    axios.get("/matches/team_matches").then((response) => {
      setMatches(response.  data);
    });
  }, []);

  const handleClick = (id) => {
    setDetailId(id)
    setViewDetail(true)
  }

  return (
    <>
      {detailId !== 0 && viewDetail ? (
        <MatchOrder id={detailId} setViewDetail={setViewDetail}/>
      ) : (
            <main className="admin-wrapper d-flex w-100 flex-wrap bg-EEEEEE">
              <section className="overflow-auto custom-scroll1">
                <div>
                  <div className="header-wrapper px-5 pt-5">
                    <h1 className="">参加試合予定一覧</h1>
                  </div>
                  <div className="content-wrapper bg-white m-5 p-4">
                    <table className="table mt-4">
                      <thead>
                        <tr>
                          <th className="text-center border-1 border-secondary">{t('teamMatches.name')}</th>
                          <th colSpan={3} className="text-center border-1 border-secondary">{t('teamMatches.members')}</th>
                          <th className="text-center border-1 border-secondary">{t('teamMatches.status')}</th>
                          <th className="text-center border-1 border-secondary">{t('teamMatches.actions')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {matches.map((match) => (
                          <tr key={match.id}>
                            <td className="border-1 border-secondary">{match.name}</td>
                            <td colSpan={3} className="border-1 border-secondary">{match.members}</td>
                            <td className="border-1 border-secondary">{match.input_status}</td>
                            <td className="border-1 border-secondary">
                              <Link onClick={() => handleClick(match.id)} className="btn btn-info">
                                View
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
            </main>
      )}
    </>
    
    
  );
};

export default MatchList;
