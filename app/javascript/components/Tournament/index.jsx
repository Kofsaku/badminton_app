import React from 'react';
import TeamOrderContainer from './TeamOrderContainer';

const Tournament = ({ tournamentPlayerId }) => {
  return (
    <div>
      <TeamOrderContainer tournamentPlayerId={tournamentPlayerId} />
    </div>
  );
};

export default Tournament; 