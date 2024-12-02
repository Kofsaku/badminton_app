import React from "react";
import StepLayout from "./StepLayout";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from '../../redux/actions';

const Step3 = ({ formData, handleFormChange }) => {
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    const updatedProfileAttributes = {
      ...formData.profile_attributes, [name]: value,
    };
    handleFormChange("profile_attributes", updatedProfileAttributes);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/users.json', formData); // Ensure your API endpoint is correct
      dispatch(setUser({ apiKey: response.data.api_key, isLoggedIn: true, fullName: formData.full_name, role: formData.profile_attributes.role })); // Store API key in Redux
      console.log('User created:', response.data);

      // Redirect to the tournaments management page
      navigate('/congrats-profile');
    } catch (error) {
      console.error('Error creating user:', error.response?.data || error.message);
    }
  };

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
            Next, let's find out
          </h5>
          <p className="text-grey1 mt-0 mb-4 text-14 small-width1">
            Creating a personalized profile allows you to tailor it to your customers' preferences
          </p>
        </div>
        <div className="d-block w-100 mb-3">
          <div className="row m-0 justify-content-center">
            <div className="col-lg-10 col-md-10 col-sm-11 col-11">
              <div className="row m-0">
                <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-3">
                  <div className="form-field2">
                    <input
                      type="text"
                      className="field-style2 outline-none"
                      placeholder="Real Name"
                      name="real_name"
                      value={formData.profile_attributes.real_name || ""}
                      onChange={handleProfileChange}
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-3">
                  <div className="form-field2">
                    <input
                      type="text"
                      className="field-style2 outline-none"
                      placeholder="Pet Name"
                      name="pet_name"
                      value={formData.profile_attributes.pet_name || ""}
                      onChange={handleProfileChange}
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-3">
                  <div className="form-field2">
                    <input
                      type="number"
                      className="field-style2 outline-none"
                      placeholder="Telephone Number"
                      name="telephone_number"
                      value={formData.profile_attributes.telephone_number || ""}
                      onChange={handleProfileChange}
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-3">
                  <div className="form-field2">
                    <input
                      type="text"
                      className="field-style2 outline-none"
                      placeholder="Prefecture"
                      name="prefecture"
                      value={formData.profile_attributes.prefecture || ""}
                      onChange={handleProfileChange}
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-3">
                  <div className="form-field2">
                    <input
                      type="text"
                      className="field-style2 outline-none"
                      placeholder="City/Town"
                      name="city_town"
                      value={formData.profile_attributes.city_town || ""}
                      onChange={handleProfileChange}
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-3">
                  <div className="form-field2 position-relative">
                    <span className="d-block w-100 position-absolute top-0 ms-1 start-0 px-3 text-muted text-14">
                      Gender
                    </span>
                    <select
                      className="field-style2 outline-none"
                      name="gender"
                      value={formData.profile_attributes.gender || ""}
                      onChange={handleProfileChange}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-3">
                  <div className="form-field2 position-relative">
                    <input
                      type="date"
                      className="field-style2 outline-none"
                      placeholder="Date of Birth"
                      name="date_of_birth"
                      value={formData.profile_attributes.date_of_birth || ""}
                      onChange={handleProfileChange}
                    />
                    <span className="d-block w-100 position-absolute top-0 start-0 px-3 text-muted text-14">
                      Date of Birth
                    </span>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-3">
                  <div className="form-field2">
                    <input
                      type="text"
                      className="field-style2 outline-none"
                      placeholder="Years of Experience (optional)"
                      name="years_of_experience"
                      value={formData.profile_attributes.years_of_experience || ""}
                      onChange={handleProfileChange}
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-3">
                  <div className="form-field2">
                    <input
                      type="text"
                      className="field-style2 outline-none"
                      placeholder="My Racket (optional)"
                      name="my_racket"
                      value={formData.profile_attributes.my_racket || ""}
                      onChange={handleProfileChange}
                    />
                  </div>
                </div>
              </div>
              <div className="row m-0 justify-content-end">
                <div className="mt-4 col-lg-6 col-md-6 col-sm-6 col-12">
                  <button
                    className="custom-btn3 px-4 d-flex w-100 align-items-center justify-content-between"
                    onClick={handleSubmit}
                  >
                    <span className="d-inline-block pe-5">Continue</span>
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
