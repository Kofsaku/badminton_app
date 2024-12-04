import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminHeader from "../../components/Shared/AdminHeader";
import AdminSidebar from "../../components/Shared/AdminSidebar";
import { fetchPlayers } from "../../api/userApi"; // Adjust the import paths
import {
  fetchTournamentIds,
  addPlayersTournament,
  addNewPlayersTournament,
  addNewTeamsTournament,
} from "../../api/tournamentApi";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";

const Players = () => {
  const { tournament_id } = useParams();
  const [players, setPlayers] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [selectedTournament, setSelectedTournament] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingTournaments, setLoadingTournaments] = useState(true);
  const [buttonStates, setButtonStates] = useState({});
  const limit = 50;
  const [isPlayerModalOpen, setIsPlayerModalOpen] = useState(false);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [newPlayer, setNewPlayer] = useState({
    name: "",
    email: "",
    gender: "",
    date_of_birth: "",
    years_of_experience: "",
    age: "",
  });
  const [newTeam, setNewTeam] = useState({
    teamName: "",
    numberOfPlayers: 0,
    players: [],
  });

  // Fetch tournaments for the dropdown
  useEffect(() => {
    const loadTournaments = async () => {
      setLoadingTournaments(true);
      try {
        const data = await fetchTournamentIds();
        setTournaments(data.tournaments || []);
      } catch (error) {
        console.error("Error fetching tournaments:", error);
      } finally {
        setLoadingTournaments(false);
      }
    };

    loadTournaments();
  }, []);

  // Fetch players based on the page and selected tournament
  useEffect(() => {
    loadPlayers();
  }, [page, selectedTournament]);

  const loadPlayers = async () => {
    setLoading(true);
    try {
      const data = await fetchPlayers(page, limit, selectedTournament);
      setPlayers(data.users || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error("Error fetching players:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPlayer = async (playerId) => {
    if (!selectedTournament) {
      alert("Please select a tournament before adding a player.");
      return;
    }

    setButtonStates((prevState) => ({ ...prevState, [playerId]: "loading" }));

    try {
      await addPlayersTournament(selectedTournament, playerId);
      setButtonStates((prevState) => ({ ...prevState, [playerId]: "added" }));
    } catch (error) {
      console.error("Error adding player:", error);
      setButtonStates((prevState) => ({ ...prevState, [playerId]: "error" }));
    }
  };

  const handleAddPlayerModal = () => {
    setIsPlayerModalOpen(!isPlayerModalOpen);
  };

  const handleAddTeamModal = () => {
    setIsTeamModalOpen(!isTeamModalOpen);
  };

  const handlePlayerChange = (field, value) => {
    setNewPlayer((prev) => ({ ...prev, [field]: value }));
  };

  const handleTeamChange = (field, value) => {
    setNewTeam((prev) => ({ ...prev, [field]: value }));
    if (field === "numberOfPlayers") {
      setNewTeam((prev) => ({
        ...prev,
        players: Array.from({ length: value }, () => ({
          name: "",
          email: "",
          gender: "",
          date_of_birth: "",
          years_of_experience: "",
          age: "",
        })),
      }));
    }
  };

  const handlePlayerInTeamChange = (index, field, value) => {
    const updatedPlayers = [...newTeam.players];
    updatedPlayers[index][field] = value;
    setNewTeam((prev) => ({ ...prev, players: updatedPlayers }));
  };

  const handlePlayerSubmit = async () => {
    console.log("New Player Data:", newPlayer);
    // Add your API call logic here

    if (!selectedTournament) {
      alert("Please select a tournament before adding a player.");
      return;
    }

    try {
      console.log("New Player Data:", newPlayer);

      // Call API to add the new player
      await addNewPlayersTournament(selectedTournament, newPlayer);

      setIsPlayerModalOpen(false);
      setNewPlayer({
        name: "",
        email: "",
        gender: "",
        date_of_birth: "",
        years_of_experience: "",
        age: "",
      }); // Reset player form
      loadPlayers();
      alert("Player added successfully!");
    } catch (error) {
      console.error("Error submitting player:", error);
      alert("Failed to add player. Please try again.");
    }
  };

  const handleTeamSubmit = async () => {
    if (!selectedTournament) {
      alert("Please select a tournament before adding a player.");
      return;
    }

    try {
      console.log("New Team Data:", newTeam);

      // Call API to add the new team
      await addNewTeamsTournament(selectedTournament, newTeam);

      setIsTeamModalOpen(false);
      setNewTeam({
        teamName: "",
        numberOfPlayers: 0,
        players: [],
      }); // Reset team form
      loadPlayers();
      alert("Team added successfully!");
    } catch (error) {
      console.error("Error submitting team:", error);
      alert("Failed to add team. Please try again.");
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

            <div className="d-flex justify-content-between mb-4">
              <Button variant="primary" onClick={handleAddPlayerModal}>
                Add New Player
              </Button>
              <button
                className="btn btn-secondary"
                onClick={handleAddTeamModal}
              >
                Add New Team
              </button>
            </div>

            <Modal show={isPlayerModalOpen} onHide={handleAddPlayerModal}>
              <Modal.Header closeButton>
                <Modal.Title>Add New Player</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="formPlayerName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter name"
                      value={newPlayer.name}
                      onChange={(e) =>
                        handlePlayerChange("name", e.target.value)
                      }
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formPlayerEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={newPlayer.email}
                      onChange={(e) =>
                        handlePlayerChange("email", e.target.value)
                      }
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formPlayerGender">
                    <Form.Label>Gender</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter gender"
                      value={newPlayer.gender}
                      onChange={(e) =>
                        handlePlayerChange("gender", e.target.value)
                      }
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formPlayerDOB">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                      type="date"
                      value={newPlayer.date_of_birth}
                      onChange={(e) =>
                        handlePlayerChange("date_of_birth", e.target.value)
                      }
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formPlayerExperience">
                    <Form.Label>Years of Experience</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter years of experience"
                      value={newPlayer.years_of_experience}
                      onChange={(e) =>
                        handlePlayerChange(
                          "years_of_experience",
                          e.target.value
                        )
                      }
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formPlayerAge">
                    <Form.Label>Age</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter age"
                      value={newPlayer.age}
                      onChange={(e) =>
                        handlePlayerChange("age", e.target.value)
                      }
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleAddPlayerModal}>
                  Close
                </Button>
                <Button variant="primary" onClick={handlePlayerSubmit}>
                  Submit
                </Button>
              </Modal.Footer>
            </Modal>

            <Modal show={isTeamModalOpen} onHide={handleAddTeamModal}>
              <Modal.Header closeButton>
                <Modal.Title>Add New Team</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="formTeamName">
                    <Form.Label>Team Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter team name"
                      value={newTeam.teamName}
                      onChange={(e) =>
                        handleTeamChange("teamName", e.target.value)
                      }
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formNumberOfPlayers">
                    <Form.Label>Number of Players</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter number of players"
                      value={newTeam.numberOfPlayers}
                      onChange={(e) =>
                        handleTeamChange("numberOfPlayers", e.target.value)
                      }
                    />
                  </Form.Group>

                  {newTeam.players.map((player, index) => (
                    <div key={index} className="mb-3 border p-3 rounded">
                      <h5>Player {index + 1}</h5>
                      <Row>
                        <Col md={4}>
                          <Form.Group
                            className="mb-3"
                            controlId={`playerName${index}`}
                          >
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter player name"
                              value={player.name}
                              onChange={(e) =>
                                handlePlayerInTeamChange(
                                  index,
                                  "name",
                                  e.target.value
                                )
                              }
                            />
                          </Form.Group>
                        </Col>
                        <Col md={4}>
                          <Form.Group
                            className="mb-3"
                            controlId={`playerEmail${index}`}
                          >
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                              type="email"
                              placeholder="Enter player email"
                              value={player.email}
                              onChange={(e) =>
                                handlePlayerInTeamChange(
                                  index,
                                  "email",
                                  e.target.value
                                )
                              }
                            />
                          </Form.Group>
                        </Col>
                        <Col md={4}>
                          <Form.Group
                            className="mb-3"
                            controlId={`playerEmail${index}`}
                          >
                            <Form.Label>Age</Form.Label>
                            <Form.Control
                              type="number"
                              placeholder="Enter player email"
                              value={player.age}
                              onChange={(e) =>
                                handlePlayerInTeamChange(
                                  index,
                                  "age",
                                  e.target.value
                                )
                              }
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                    </div>
                  ))}
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleAddTeamModal}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleTeamSubmit}>
                  Submit
                </Button>
              </Modal.Footer>
            </Modal>
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
                        <th className="bg-silver1 border border-color-silver2 text-14 px-3 py-2 merriweather-font">
                          Name
                        </th>
                        <th className="bg-silver1 border border-color-silver2 text-14 px-3 py-2 merriweather-font">
                          Email
                        </th>
                        <th className="bg-silver1 border border-color-silver2 text-14 px-3 py-2 merriweather-font">
                          Date of Birth
                        </th>
                        <th className="bg-silver1 border border-color-silver2 text-14 px-3 py-2 merriweather-font">
                          Prefecture
                        </th>
                        <th className="bg-silver1 border border-color-silver2 text-14 px-3 py-2 merriweather-font">
                          Gender
                        </th>
                        <th className="bg-silver1 border border-color-silver2 text-14 px-3 py-2 merriweather-font">
                          Experience
                        </th>
                        <th className="bg-silver1 border border-color-silver2 text-14 px-3 py-2 merriweather-font">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {players.map((player, index) => (
                        <tr key={player.id}>
                          <td className="bg-silver4 px-3 py-2 merriweather-font fw-medium text-14 border border-color-silver2">
                            {player.full_name}
                          </td>
                          <td className="bg-silver4 px-3 py-2 merriweather-font fw-medium text-14 border border-color-silver2">
                            {player.email}
                          </td>
                          <td className="bg-silver4 px-3 py-2 merriweather-font fw-medium text-14 border border-color-silver2">
                            {player.profile.date_of_birth}
                          </td>
                          <td className="bg-silver4 px-3 py-2 merriweather-font fw-medium text-14 border border-color-silver2">
                            {player.profile.prefecture}
                          </td>
                          <td className="bg-silver4 px-3 py-2 merriweather-font fw-medium text-14 border border-color-silver2">
                            {player.profile.gender}
                          </td>
                          <td className="bg-silver4 px-3 py-2 merriweather-font fw-medium text-14 border border-color-silver2">
                            {player.profile.years_of_experience}
                          </td>
                          <td className="bg-silver4 px-3 py-2 merriweather-font fw-medium text-14 border border-color-silver2">
                            {player.part_of_tournament ||
                            buttonStates[player.id] === "added" ? (
                              <span className="text-muted">
                                {player.part_of_tournament
                                  ? "Already in Tournament"
                                  : "Added"}
                              </span>
                            ) : (
                              <button
                                className="btn btn-primary"
                                disabled={buttonStates[player.id] === "loading"}
                                onClick={() => handleAddPlayer(player.id)}
                              >
                                {buttonStates[player.id] === "loading"
                                  ? "Adding..."
                                  : "Add It"}
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td
                          className="bg-silver4 px-3 py-3 merriweather-font fw-medium text-14 border border-color-silver2 text-end"
                          colSpan="7"
                        >
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
                                  page === i + 1
                                    ? "bg-green1 text-white"
                                    : "bg-silver2"
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
