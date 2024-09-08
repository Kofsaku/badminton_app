import React, { useEffect, useState } from 'react';
import TournamentForm from '../../components/Tournament/TournamentForm';
import AdminHeader from '../../components/Shared/AdminHeader';
import AdminSidebar from '../../components/Shared/AdminSidebar';
import { showTournament } from '../../api/tournamentApi';
import { useParams } from 'react-router-dom'; // Use params for dynamic id

const EditTournament = () => {
  const { id } = useParams(); // Get the tournament ID from the URL params
  const [tournamentData, setTournamentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTournament = async () => {
      try {
        const data = await showTournament(id);
        console.log(data);
        setTournamentData(data.tournament);
        setLoading(false);
      } catch (err) {
        setError('Failed to load tournament data');
        setLoading(false);
      }
    };

    fetchTournament();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main className="admin-wrapper d-flex w-100 flex-wrap bg-EEEEEE">
      <AdminSidebar />
      <section className="right-content-wrapper overflow-auto custom-scroll1">
        <AdminHeader />
        {tournamentData && (
          <TournamentForm initialData={tournamentData} />
        )}
      </section>
    </main>
  );
};

export default EditTournament;
