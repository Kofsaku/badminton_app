import React from "react";
import { useTranslation } from 'react-i18next';
import StepLayout from "./StepLayout";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from '../../redux/actions';

const Step3 = ({ formData, handleFormChange }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    const updatedProfileAttributes = {
      ...formData.profile_attributes,
      [name]: value,
    };
    handleFormChange("profile_attributes", updatedProfileAttributes);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/users.json', formData);
      dispatch(setUser({
        apiKey: response.data.api_key,
        isLoggedIn: true,
        fullName: formData.full_name,
        role: formData.profile_attributes.role
      }));
      navigate('/congrats-profile');
    } catch (error) {
      console.error('Error creating user:', error.response?.data || error.message);
    }
  };

  const formFields = [
    { name: 'real_name', type: 'text', translationKey: 'realName' },
    { name: 'pet_name', type: 'text', translationKey: 'petName' },
    { name: 'telephone_number', type: 'number', translationKey: 'telephone' },
    { name: 'prefecture', type: 'text', translationKey: 'prefecture' },
    { name: 'city_town', type: 'text', translationKey: 'cityTown' },
    { name: 'years_of_experience', type: 'text', translationKey: 'experience' },
    { name: 'my_racket', type: 'text', translationKey: 'racket' }
  ];

  return (
    <StepLayout>
      <div className="d-block w-100">
        <div className="d-lg-none d-md-none d-sm-none px-4 w-100 mb-4">
          <button className="p-2 border border-color-black2 border-2 rounded-circle d-flex align-items-center justify-content-center bg bg-transparent">
            <i className="fa fa-arrow-left text-black2 text-20"></i>
          </button>
        </div>
        <div className="d-block w-100 text-center mb-5">
          <h5 className="text-black1 mb-2 text-capitalize text-25 tab-text-22 fw-bold">
            {t('signup.step3.title')}
          </h5>
          <p className="text-grey1 mt-0 mb-4 text-14 small-width1">
            {t('signup.step3.subtitle')}
          </p>
        </div>
        <div className="d-block w-100 mb-3">
          <div className="row m-0 justify-content-center">
            <div className="col-lg-10 col-md-10 col-sm-11 col-11">
              <div className="row m-0">
                {formFields.map((field) => (
                  <div key={field.name} className="col-lg-6 col-md-6 col-sm-6 col-12 mb-3">
                    <div className="form-field2">
                      <input
                        type={field.type}
                        className="field-style2 outline-none"
                        placeholder={t(`signup.step3.fields.${field.translationKey}.placeholder`)}
                        name={field.name}
                        value={formData.profile_attributes[field.name] || ""}
                        onChange={handleProfileChange}
                      />
                    </div>
                  </div>
                ))}

                <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-3">
                  <div className="form-field2 position-relative">
                    <span className="d-block w-100 position-absolute top-0 ms-1 start-0 px-3 text-muted text-14">
                      {t('signup.step3.fields.gender.label')}
                    </span>
                    <select
                      className="field-style2 outline-none"
                      name="gender"
                      value={formData.profile_attributes.gender || ""}
                      onChange={handleProfileChange}
                    >
                      <option value="">{t('signup.step3.fields.gender.placeholder')}</option>
                      {Object.entries(t('signup.step3.fields.gender.options', { returnObjects: true })).map(([key, value]) => (
                        <option key={key} value={value}>{value}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-3">
                  <div className="form-field2 position-relative">
                    <input
                      type="date"
                      className="field-style2 outline-none"
                      placeholder={t('signup.step3.fields.dateOfBirth.placeholder')}
                      name="date_of_birth"
                      value={formData.profile_attributes.date_of_birth || ""}
                      onChange={handleProfileChange}
                    />
                    <span className="d-block w-100 position-absolute top-0 start-0 px-3 text-muted text-14">
                      {t('signup.step3.fields.dateOfBirth.label')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="row m-0 justify-content-end">
                <div className="mt-4 col-lg-6 col-md-6 col-sm-6 col-12">
                  <button
                    className="custom-btn3 px-4 d-flex w-100 align-items-center justify-content-between"
                    onClick={handleSubmit}
                  >
                    <span className="d-inline-block pe-5">{t('signup.step3.continue')}</span>
                    <i className="fa fa-arrow-right"></i>
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

export default Step3;
