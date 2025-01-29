import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import AdminHeader from "../../components/Shared/AdminHeader";
import AdminSidebar from "../../components/Shared/AdminSidebar";
import NewPhase from "../../components/MatchClass/NewPhase";

const NewMatchClass = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [selectedTournament, setSelectedTournament] = useState(0);
  const [tournaments, setTournaments] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [tournamentCategories, setTournamentCategories] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState(0);
  const [tournamentDivisions, setTournamentDivisions] = useState([]);
  const [classSize, setClassSize] = useState(1);
  const [tournamentPlayers, setTournamentPlayers] = useState([]);

  const [step, setStep] = useState(0);
  const [classData, setClassData] = useState([]);

  useEffect(() => {
    const url = "/api/v1/tournaments";
    axios.get(url).then((res) => {
      setTournaments(res.data);
      if (res.data.length) setSelectedTournament(res.data[0].id);
    });
  }, []);

  useEffect(() => {
    if (!selectedTournament) return;

    const url = `/api/v1/tournaments/${selectedTournament}/tournament-data`;
    axios.get(url).then((res) => {
      const { tournament_categories, tournament_players } = res.data;
      setTournamentCategories(tournament_categories);
      setTournamentPlayers(tournament_players);
      if (tournament_categories.length) {
        setSelectedCategory(tournament_categories[0].id);
      }
    });
  }, [selectedTournament]);

  useEffect(() => {
    if (!selectedCategory) return;

    const url = `/api/v1/categories/${selectedCategory}/divisions`;
    axios.get(url).then((res) => {
      const { divisions } = res.data;
      setTournamentDivisions(divisions);

      if (divisions.length) setSelectedDivision(divisions[0].id);
    });
  }, [selectedCategory]);

  const onChange = (e, setFunction) => {
    setFunction(parseInt(e.target.value));
  };

  const goToFirstStep = () => {
    setStep(1);
  };

  const addMatch = (matchData) => {
    classData[step - 1] = matchData;

    setClassData(classData);

    if (step < classSize) setStep(step + 1);
    else completeAdding();
  };

  const completeAdding = () => {
    console.log("class data:", classData);

    const body = {
      tournament: selectedTournament,
      category: selectedCategory,
      division: selectedDivision,
      class_size: classSize,
      class_data: classData,
    };
    const url = "/api/v1/match_classes";
    const token = document.querySelector('meta[name="csrf-token"]').content;

    console.log("this is body", body);

    axios
      .post(url, body, {
        headers: { "X-CSRF-Token": token, "Content-Type": "application/json" },
      })
      .then((res) => {
        console.log(res.data);
        navigate("/match-management");
      });
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
    <main className="admin-wrapper d-flex w-100 flex-wrap bg-EEEEEE">
      <AdminSidebar />
      <section className="right-content-wrapper overflow-auto custom-scroll1">
        <AdminHeader />
        <div className="p-3">
          {!step ? (
            <>
              <h1>試合登録</h1>
              <div className="bg-light p-4">
                <div className="mb-3">
                  <label>大会選択</label>
                  <select
                    name="tournament"
                    className="form-control"
                    onChange={(e) => onChange(e, setSelectedTournament)}
                  >
                    {tournaments.map((tournament) => (
                      <option key={tournament.id} value={tournament.id}>
                        {tournament.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label>種目</label>
                  <select
                    name="tournament_category"
                    className="form-control"
                    onChange={(e) => onChange(e, setSelectedCategory)}
                  >
                    {tournamentCategories &&
                      tournamentCategories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {t(`tournament.${camelCaseToPascalCase(category.category_type)}`)}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label>部</label>
                  <select
                    name="tournament_division"
                    className="form-control"
                    onChange={(e) => onChange(e, setSelectedDivision)}
                    value={selectedDivision}
                  >
                    {tournamentDivisions &&
                      tournamentDivisions.map((division) => (
                        <option key={division.id} value={division.id}>
                          {division.division}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label>試合数</label>
                  <input
                    type="number"
                    name="size"
                    className="form-control"
                    value={classSize}
                    min={1}
                    onKeyDown={(e) => e.preventDefault()}
                    onChange={(e) => onChange(e, setClassSize)}
                  />
                </div>

                <button className="btn btn-primary" onClick={goToFirstStep}>
                  Next
                </button>
                <Link to="/match-management" className="btn btn-secondary">
                  Cancel
                </Link>
              </div>
            </>
          ) : (
            <NewPhase
              selectedTournament={tournaments.find(
                (val) => val.id == selectedTournament
              )}
              category={tournamentCategories.find(
                (val) => val.id == selectedCategory
              )}
              step={step}
              classSize={classSize}
              classData={classData}
              addMatch={addMatch}
            />
          )}
        </div>
      </section>
    </main>
  );
};

export default NewMatchClass;
