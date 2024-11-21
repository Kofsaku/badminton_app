import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import StepLayout from './StepLayout';

const CongratsProfile = () => {
  const navigate = useNavigate(); // Removed unused `dispatch`
  const fullName = useSelector((state) => state.user.fullName); // Renamed to `fullName` for consistency

  const handleContinue = () => {
    navigate('/tournament-management'); // Navigates to the dashboard page
  };

  return (
    <StepLayout>
      <div className="d-block w-100">
        <div className="d-block w-100 text-center">
          <h5 className="text-black1 mb-1 text-capitalize text-28 mob-text-22 fw-bold">
            Congratulations <br /> {fullName}!
          </h5>
          <p className="text-grey1 mt-0 mb-5 text-14">Your profile has been created.</p>
        </div>
        <div className="d-block w-100 mb-3">
          <div className="d-block w-100">
            <div className="row m-0 justify-content-center">
              <div className="col-lg-6 col-md-8 col-sm-12 col-11">
                <div className="d-block w-100">
                  <button
                    onClick={handleContinue}
                    className="custom-btn1 px-4 d-flex w-100 align-items-center justify-content-between"
                  >
                    <span className="d-inline-block pe-5">Continue</span>
                    <i className="fa fa-arrow-right"> </i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StepLayout>
  );
};

export default CongratsProfile;
