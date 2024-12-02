import React from 'react';

const StepLayout = ({ children }) => {
  return (
    <section className="all-wrapper">
      <div className="d-flex row w-100 m-0 overflow-hidden">
        <div className="col-lg-6 col-md-6 col-sm-6 col-12 p-0 d-lg-flex d-md-flex d-sm-flex d-none">
          <div className="d-flex h-100 align-items-center justify-content-center bg-gradient-1 w-100">
            <img className="logo-image-1" src="images/badminton-white-logo.png" alt="Logo" />
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-6 col-12 p-0">
          <div className="d-flex flex-column align-items-center bg-gradient-3 justify-content-lg-center justify-content-md-center justify-content-sm-center justify-content-start w-100 full-heighted-content custom-scroll1 py-lg-0 py-md-0 py-sm-0 py-2">
            <div className="d-lg-none d-md-none d-sm-none w-100 text-center py-4">
              <img className="logo-image-3" src="images/logo-square.png" alt="Logo" />
            </div>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StepLayout;
