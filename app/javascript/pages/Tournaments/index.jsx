import React, { useEffect, useState } from 'react';
import AdminHeader from '../../components/Shared/AdminHeader';
import AdminSidebar from '../../components/Shared/AdminSidebar';
import { Link } from 'react-router-dom';
import { fetchTournaments, deleteTournament } from '../../api/tournamentApi';

const Tournaments = () => {
  const [tournaments, setTournaments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const tournamentsPerPage = 50; // Number of tournaments per page

  useEffect(() => {
    const getTournaments = async () => {
      try {
        const data = await fetchTournaments(currentPage, tournamentsPerPage);
        setTournaments(data.tournaments);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error('Error fetching tournaments:', error);
      }
    };

    getTournaments();
  }, [currentPage]);

  const handleDelete = async (id) => {
    try {
      await deleteTournament(id);
      setTournaments(tournaments.filter(tournament => tournament.id !== id));
    } catch (error) {
      console.error(`Failed to delete tournament with id ${id}:`, error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <main className="admin-wrapper d-flex w-100 flex-wrap bg-EEEEEE">
      <AdminSidebar />
      <section className="right-content-wrapper overflow-auto custom-scroll1">
        <AdminHeader />

        <div className="d-block w-100 px-lg-4 px-md-4 px-sm-4 px-2 py-4">
          <div className="d-block w-100 mb-3">
            <div className="d-flex flex-wrap w-100 align-items-center justify-content-between">
              <div className="d-inline-block min-width-clear mb-lg-0 mb-md-0 mb-sm-0 mb-3">
                <h3 className="text-black text-20 mob-text-18 fw-bold merriweather-font mt-0 mb-2">
                  Tournament Management
                </h3>
                <p className="text-grey1 text-15 m-0">
                  General Conference:
                  <span className="bg-green1 px-1 rounded-3 text-white d-inline-block ms-1">
                    {tournaments?.length}
                  </span>
                </p>
              </div>
              <div className="d-inline-block">
                <Link to="/tournament-creation" className="custom-btn5 mb-2">
                  <i className="fa fa-plus text-14 me-2"> </i>
                  Create New Tournament
                </Link>
                <a className="custom-btn5">
                  <i className="fa fa-file text-14 me-2"> </i>
                  Download PDF Report
                </a>
              </div>
            </div>
          </div>
          <div className="d-block w-100">
            <div className="d-block w-100 custom-scroll1 table-overflow">
              <div className="d-block w-100 rounded-3">
                <table className="w-100">
                  <thead>
                    <tr>
                      <th className="bg-silver1 border border-color-silver2 text-14 px-3 py-2 merriweather-font">
                        S.N
                      </th>
                      <th className="bg-silver1 border border-color-silver2 text-14 px-3 py-2 merriweather-font">
                        Name
                      </th>
                      <th className="bg-silver1 border border-color-silver2 text-14 px-3 py-2 merriweather-font">
                        Date & Time
                      </th>
                      <th className="bg-silver1 border border-color-silver2 text-14 px-3 py-2 merriweather-font">
                        Organizer
                      </th>
                      <th className="bg-silver1 border border-color-silver2 text-14 px-3 py-2 merriweather-font">
                        Organization
                      </th>
                      <th className="bg-silver1 border border-color-silver2 text-14 px-3 py-2 merriweather-font text-center">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {tournaments?.map((tournament, index) => (
                      <tr key={tournament.id}>
                        <td className="bg-silver4 px-3 py-2 merriweather-font fw-medium text-14 border border-color-silver2">
                          {(index + 1 + (currentPage - 1) * tournamentsPerPage).toString().padStart(2, '0')}
                        </td>
                        <td className="bg-silver4 px-3 py-2 merriweather-font fw-medium text-14 border border-color-silver2">
                          {tournament.name}
                        </td>
                        <td className="bg-silver4 px-3 py-2 merriweather-font fw-medium text-14 border border-color-silver2">
                          {tournament.event_date} & {tournament.match_start_time}
                        </td>
                        <td className="bg-silver4 px-3 py-2 merriweather-font fw-medium text-14 border border-color-silver2">
                          {tournament.organizer}
                        </td>
                        <td className="bg-silver4 px-3 py-2 merriweather-font fw-medium text-14 border border-color-silver2">
                          {tournament.organization_name}
                        </td>
                        <td className="bg-silver4 px-3 py-2 merriweather-font fw-medium text-14 border border-color-silver2 text-center">
                          <div className="dropdown d-inline-block action-dropdown">
                            <button
                              className="border-0 bg-green1 px-2 py-1 d-flex align-items-center justify-content-center rounded-3 notif-dropdown-btn shadow-none p-0 dropdown-toggle no-caret"
                              type="button"
                              id={`dropdownMenuButton${index}`}
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i className="fa fa-ellipsis text-20 m-0 text-white"> </i>
                            </button>
                            <ul
                              className="dropdown-menu"
                              aria-labelledby={`dropdownMenuButton${index}`}
                            >
                              <li>
                                <Link
                                  to={`/tournaments/${tournament.id}/edit`}
                                  className="dropdown-item text-14"
                                >
                                  Edit
                                </Link>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item text-14"
                                  href="#"
                                  onClick={() => handleDelete(tournament.id)}
                                >
                                  Delete
                                </a>
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td
                        className="bg-silver4 px-3 py-3 merriweather-font fw-medium text-14 border border-color-silver2 text-end"
                        colSpan="6"
                      >
                        <div className="d-flex justify-content-end">
                          <button
                            className="bg-white border-0 mx-1 d-flex align-items-center justify-content-center shadow-sm rounded-3 px-2 py-1"
                            onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                          >
                            <i className="fa fa-angle-left text-14"> </i>
                          </button>
                          {[...Array(totalPages)].map((_, pageIndex) => (
                            <button
                              key={pageIndex + 1}
                              className={`border-0 dmsans-font mx-1 d-flex align-items-center justify-content-center shadow-sm rounded-3 px-2 py-1 ${
                                currentPage === pageIndex + 1 ? 'bg-green1 text-white' : 'bg-silver2'
                              }`}
                              onClick={() => handlePageChange(pageIndex + 1)}
                            >
                              {pageIndex + 1}
                            </button>
                          ))}
                          <button
                            className="bg-white border-0 mx-1 d-flex align-items-center justify-content-center shadow-sm rounded-3 px-2 py-1"
                            onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                          >
                            <i className="fa fa-angle-right text-14"> </i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Tournaments;
