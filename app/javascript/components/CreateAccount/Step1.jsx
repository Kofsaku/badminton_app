import React from 'react';
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import StepLayout from './StepLayout';

const Step1 = ({ nextStep, formData, handleFormChange }) => {
  const { t } = useTranslation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    handleFormChange(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    nextStep();
  };

  const socialButtons = [
    { icon: "google-icon.svg", alt: "Google", ariaLabel: t('signup.step1.socialLogin.google') },
    { icon: "apple-icon.svg", alt: "Apple", ariaLabel: t('signup.step1.socialLogin.apple') },
    { icon: "fb-icon.svg", alt: "Facebook", ariaLabel: t('signup.step1.socialLogin.facebook') }
  ];

  return (
    <StepLayout>
      <div className="d-block w-100">
        <div className="d-block w-100 text-center">
          <h5 className="text-black1 mb-1 text-capitalize text-25 mob-text-22 fw-bold">
            {t('signup.step1.title')}
          </h5>
          <p className="text-grey1 mt-0 mb-4 text-14">
            {t('signup.step1.subtitle')}
          </p>
        </div>
        <div className="d-block w-100 mb-3">
          <form onSubmit={handleSubmit}>
            <div className="d-block w-100">
              <div className="row m-0 justify-content-center">
                <div className="col-lg-6 col-md-8 col-sm-12 col-11">
                  <div className="form-field1 mb-3 px-3 py-2 d-flex w-100 align-items-center justify-content-start rounded-3 bg-silver1">
                    <img src="images/user-icon.png" className="me-2" alt={t('signup.step1.fields.fullName.placeholder')} />
                    <input
                      type="text"
                      placeholder={t('signup.step1.fields.fullName.placeholder')}
                      className="text-black w-100 outline-none border-0 bg-transparent text-15"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-field1 mb-3 px-3 py-2 d-flex w-100 align-items-center justify-content-start rounded-3 bg-silver1">
                    <img src="images/email-icon.svg" className="me-2" alt={t('signup.step1.fields.email.placeholder')} />
                    <input
                      type="email"
                      placeholder={t('signup.step1.fields.email.placeholder')}
                      className="text-black w-100 outline-none border-0 bg-transparent text-15"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-field1 mb-3 px-3 py-2 d-flex w-100 align-items-center justify-content-start rounded-3 bg-silver1">
                    <img src="images/password-icon.svg" className="me-2" alt={t('signup.step1.fields.password.placeholder')} />
                    <input
                      type="password"
                      placeholder={t('signup.step1.fields.password.placeholder')}
                      className="text-black w-100 outline-none border-0 bg-transparent text-15"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="d-block w-100">
                    <button type="submit" className="custom-btn3 w-100 mb-3">
                      {t('signup.step1.createButton')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="d-block w-100 px-2">
          <p className="text-center w-100 text-14">
            {t('signup.step1.login.text')}&nbsp;
            <Link to="/login" className="text-green2">
              {t('signup.step1.login.link')}
            </Link>
          </p>
        </div>
      </div>
    </StepLayout>
  );
};

export default Step1;
