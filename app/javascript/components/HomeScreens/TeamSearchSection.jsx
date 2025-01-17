import React from 'react';

const TeamSearchSection = () => {
  return (
    <section className="py-5 bg-silver4">
      <div className="container">
        <div className="d-block w-100 text-center my-4">
          <h3 className="text-green4 text-35 mt-0 mb-5 text-underline fw-bold mob-text-24">
            Team member search, pair matching
          </h3>
          <a href="#" className="bg-green1 text-white rounded-pill px-lg-5 px-md-5 px-4 py-2 lh-lg border-0 text-16">
            <span className="d-inline-block px-lg-3 px-md-3 px-0 py-lg-2 py-md-2 py-0">
              Go to Team Member Search
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default TeamSearchSection;
