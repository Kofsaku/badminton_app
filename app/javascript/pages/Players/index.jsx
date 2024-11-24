import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AdminHeader from '../../components/Shared/AdminHeader';
import AdminSidebar from '../../components/Shared/AdminSidebar';
import { fetchPlayers } from '../../api/userApi'; // Adjust the import paths
import { fetchTournamentIds, addPlayersTournament } from '../../api/tournamentApi';


const Players = () => {
  const { tournament_id } = useParams();
  const [players, setPlayers] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [selectedTournament, setSelectedTournament] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingTournaments, setLoadingTournaments] = useState(true);
  const [buttonStates, setButtonStates] = useState({});
  const limit = 50;

  // Fetch tournaments for the dropdown
  useEffect(() => {
    const loadTournaments = async () => {
      setLoadingTournaments(true);
      try {
        const data = await fetchTournamentIds();
        setTournaments(data.tournaments || []);
      } catch (error) {
        console.error('Error fetching tournaments:', error);
      } finally {
        setLoadingTournaments(false);
      }
    };

    loadTournaments();
  }, []);

  // Fetch players based on the page and selected tournament
  useEffect(() => {
    const loadPlayers = async () => {
      setLoading(true);
      try {
        const data = await fetchPlayers(page, limit, selectedTournament);
        setPlayers(data.users || []);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error('Error fetching players:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPlayers();
  }, [page, selectedTournament]);

  const handleAddPlayer = async (playerId) => {
    if (!selectedTournament) {
      alert('Please select a tournament before adding a player.');
      return;
    }

    setButtonStates((prevState) => ({ ...prevState, [playerId]: 'loading' }));

    try {
      await addPlayersTournament(selectedTournament, playerId);
      setButtonStates((prevState) => ({ ...prevState, [playerId]: 'added' }));
    } catch (error) {
      console.error('Error adding player:', error);
      setButtonStates((prevState) => ({ ...prevState, [playerId]: 'error' }));
    }
  };


  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleTournamentChange = (e) => {
    setSelectedTournament(e.target.value);
    setPage(1); // Reset to the first page when filtering
  };

  return (
    <main className="admin-wrapper d-flex w-100 flex-wrap bg-EEEEEE">
      <AdminSidebar />
      <section className="right-content-wrapper overflow-auto custom-scroll1">
        <AdminHeader />

        <div className="d-block w-100 px-lg-4 px-md-4 px-sm-4 px-2 py-4">
          <div className="d-block w-100 mb-3">
            <div className="row align-items-center mb-3">
              {/* Dropdown: Takes 10 columns */}
              <div className="col-md-12 col-sm-12">
                {loadingTournaments ? (
                  <select className="form-select" disabled>
                    <option>Loading tournaments...</option>
                  </select>
                ) : (
                  <select
                    className="form-select"
                    value={selectedTournament}
                    onChange={handleTournamentChange}
                  >
                    <option value="">All Tournaments</option>
                    {tournaments.map((tournament) => (
                      <option key={tournament.id} value={tournament.id}>
                        {tournament.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>
            <div className="d-flex flex-wrap w-100 align-items-center justify-content-between">
              <div className="d-inline-block min-width-clear mb-lg-0 mb-md-0 mb-sm-0 mb-3">
                <h3 className="text-black text-20 mob-text-18 fw-bold merriweather-font mt-0 mb-2">Applicants</h3>
                <p className="text-grey1 text-15 m-0">
                  Total Applicants
                  <span className="bg-green1 px-1 rounded-3 text-white d-inline-block ms-1">{players.length}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="d-block w-100">
            {loading ? (
              <p>Loading players...</p>
            ) : (
              <div className="d-block w-100 custom-scroll1 table-overflow">
                <div className="d-block w-100 rounded-3">
                  <table className="w-100">
                    <thead>
                      <tr>
                        <th className="bg-silver1 border border-color-silver2 text-14 px-3 py-2 merriweather-font">Name</th>
                        <th className="bg-silver1 border border-color-silver2 text-14 px-3 py-2 merriweather-font">Email</th>
                        <th className="bg-silver1 border border-color-silver2 text-14 px-3 py-2 merriweather-font">Date of Birth</th>
                        <th className="bg-silver1 border border-color-silver2 text-14 px-3 py-2 merriweather-font">Prefecture</th>
                        <th className="bg-silver1 border border-color-silver2 text-14 px-3 py-2 merriweather-font">Gender</th>
                        <th className="bg-silver1 border border-color-silver2 text-14 px-3 py-2 merriweather-font">Experience</th>
                        <th className="bg-silver1 border border-color-silver2 text-14 px-3 py-2 merriweather-font">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {players.map((player, index) => (
                        <tr key={player.id}>
                          <td className="bg-silver4 px-3 py-2 merriweather-font fw-medium text-14 border border-color-silver2">{player.full_name}</td>
                          <td className="bg-silver4 px-3 py-2 merriweather-font fw-medium text-14 border border-color-silver2">{player.email}</td>
                          <td className="bg-silver4 px-3 py-2 merriweather-font fw-medium text-14 border border-color-silver2">{player.profile.date_of_birth}</td>
                          <td className="bg-silver4 px-3 py-2 merriweather-font fw-medium text-14 border border-color-silver2">{player.profile.prefecture}</td>
                          <td className="bg-silver4 px-3 py-2 merriweather-font fw-medium text-14 border border-color-silver2">{player.profile.gender}</td>
                          <td className="bg-silver4 px-3 py-2 merriweather-font fw-medium text-14 border border-color-silver2">{player.profile.years_of_experience}</td>
                          <td className="bg-silver4 px-3 py-2 merriweather-font fw-medium text-14 border border-color-silver2">
                            {player.part_of_tournament || buttonStates[player.id] === 'added' ? (
                              <span className="text-muted">
                                {player.part_of_tournament ? 'Already in Tournament' : 'Added'}
                              </span>
                            ) : (
                              <button
                                className="btn btn-primary"
                                disabled={buttonStates[player.id] === 'loading'}
                                onClick={() => handleAddPlayer(player.id)}
                              >
                                {buttonStates[player.id] === 'loading' ? 'Adding...' : 'Add It'}
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td className="bg-silver4 px-3 py-3 merriweather-font fw-medium text-14 border border-color-silver2 text-end" colSpan="7">
                          <div className="d-flex justify-content-end">
                            <button
                              className="bg-white border-0 mx-1 shadow-sm rounded-3 px-2 py-1"
                              onClick={() => handlePageChange(page - 1)}
                              disabled={page === 1}
                            >
                              <i className="fa fa-angle-left text-14"></i>
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => (
                              <button
                                key={i + 1}
                                className={`border-0 dmsans-font mx-1 shadow-sm rounded-3 px-2 py-1 ${
                                  page === i + 1 ? 'bg-green1 text-white' : 'bg-silver2'
                                }`}
                                onClick={() => handlePageChange(i + 1)}
                              >
                                {i + 1}
                              </button>
                            ))}
                            <button
                              className="bg-white border-0 mx-1 shadow-sm rounded-3 px-2 py-1"
                              onClick={() => handlePageChange(page + 1)}
                              disabled={page === totalPages}
                            >
                              <i className="fa fa-angle-right text-14"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Players;
