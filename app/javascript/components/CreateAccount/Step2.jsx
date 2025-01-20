import React from "react";
import { useTranslation } from 'react-i18next';
import StepLayout from './StepLayout';

const Step2 = ({ nextStep, formData, handleFormChange }) => {
  const { t } = useTranslation();

  const handleRoleSelection = (role) => {
    const updatedProfileAttributes = { ...formData.profile_attributes, role };
    handleFormChange("profile_attributes", updatedProfileAttributes);
    nextStep();
  };

  const roles = [
    { key: 'player', value: t('signup.step2.roles.player') },
    { key: 'organizer', value: t('signup.step2.roles.organizer') },
    { key: 'both', value: t('signup.step2.roles.both') }
  ];

  return (
    <StepLayout>
      <div className="d-block w-100">
        <div className="d-block w-100 text-center">
          <h5 className="text-black1 mb-1 text-capitalize text-26 mob-text-22 fw-bold">
            {t('signup.step2.welcome', { name: formData.full_name })}
          </h5>
          <p className="text-grey1 mt-0 mb-5 text-14">
            {t('signup.step2.subtitle')}
          </p>
        </div>
        <div className="d-block w-100">
          <div className="row m-0 justify-content-center">
            <div className="col-lg-9 col-md-10 col-sm-12 col-12">
              <div className="d-flex flex-wrap align-items-start justify-content-center">
                {roles.map(({ key, value }) => (
                  <div
                    key={key}
                    className={`d-flex flex-column align-items-center justify-content-center role-selector mb-3 ${
                      formData.profile_attributes.role === value ? "selected" : ""
                    }`}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="d-flex align-items-center justify-content-center bg-silver2 text-center p-4 rounded-circle position-relative overflow-hidden">
                      <input
                        type="radio"
                        id={`role-${key}`}
                        name="profile_attributes.role"
                        value={value}
                        checked={formData.profile_attributes.role === value}
                        onChange={() => handleRoleSelection(value)}
                        className="w-100 cursor-pointer h-100 position-absolute top-0 start-0 opacity-0"
                        aria-label={value}
                      />
                      <i className="fa fa-user fs-large-1 m-0 p-0 text-white d-flex align-items-center justify-content-center"></i>
                    </div>
                    <h4 className="text-black1 fw-bold text-center text-18 mb-0 mt-3">
                      {value}
                    </h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </StepLayout>
  );
};

export default Step2;
