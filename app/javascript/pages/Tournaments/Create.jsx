import React from 'react';
import TournamentForm from '../../components/Tournament/TournamentForm';
import AdminHeader from '../../components/Shared/AdminHeader';
import AdminSidebar from '../../components/Shared/AdminSidebar';

const CreateTournament = () => {
  return (
    <main className="admin-wrapper d-flex w-100 flex-wrap bg-EEEEEE">
      <AdminSidebar />
      <section className="right-content-wrapper overflow-auto custom-scroll1">
        <AdminHeader />
        <TournamentForm />
      </section>
    </main>
  );
};

export default CreateTournament;
