import React from 'react';

const teamMembers = [
  {
    name: "Ben Cobert",
    title: "FOUNDER & CEO",
    email: "email@email.com",
    image: "images/team-member-1.jpg",
  },
  {
    name: "Ben Cobert",
    title: "FOUNDER & CEO",
    email: "email@email.com",
    image: "images/team-member-2.jpg",
  },
  {
    name: "Ben Cobert",
    title: "FOUNDER & CEO",
    email: "email@email.com",
    image: "images/team-member-1.jpg",
  },
];

const TeamSection = () => {
  return (
    <section className="py-5 my-4">
      <div className="container">
        <div className="d-block w-100 mb-5 text-center">
          <h3 className="text-green3 fw-bold mt-0 mb-2 text-35">Badminton Team</h3>
          <p className="text-grey1 m-0 text-14">dedication. . Expertise. . passion.</p>
        </div>
        <div className="d-block w-100">
          <div className="row justify-content-center">
            <div className="col-lg-10 col-md-10 col-sm-12 col-12">
              <div className="row">
                {teamMembers.map((member, index) => (
                  <div className="col-md-4 col-lg-4 col-sm-4 col-12 mb-4" key={index}>
                    <div className="d-block w-100 team-member-wrapper">
                      <div className="d-block w-100 team-member-box position-relative">
                        <div className="d-block w-100">
                          <img src={member.image} alt={member.name} className="team-member-image" />
                        </div>
                        <div className="position-absolute top-0 start-0 h-100 d-block w-100 team-detail-box">
                          <div className="d-flex w-100 align-items-center h-100 justify-content-start flex-column">
                            <div className="align-items-center pt-4 d-flex flex-column h-100 justify-content-center text-center w-100">
                              <h5 className="text-white text-22 fw-bold mt-0 mb-2">{member.name}</h5>
                              <h6 className="text-white text-16 m-0">{member.title}</h6>
                            </div>
                            <div className="d-block w-100 text-center py-4">
                              <a href={`mailto:${member.email}`} className="text-white text-15 m-0">{member.email}</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
