import React from 'react';
import { createTournament } from '../../api/tournamentApi';
import { useNavigate } from 'react-router-dom';

const Step3 = ({ nextStep, prevStep, handleFormChange, formData }) => {
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    handleFormChange(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Submit form data using the API function
      const result = await createTournament(formData);
      console.log('Tournament created successfully:', result);

      navigate('/tournament-management');
      // Handle success (e.g., redirect to another page or show success message)
    } catch (error) {
      // Handle error (e.g., show error message)
      console.error('Failed to create tournament:', error);
    }
  };

  return (
    <div className="d-block w-100 px-lg-4 px-md-4 px-sm-4 px-2 py-4">
      <div className="d-block w-100 mb-3">
        <div className="d-flex w-100 align-items-center justify-content-start">
          <div className="d-inline-block me-3">
            <button onClick={prevStep} className="bg-green1 p-2 rounded-2 d-flex align-items-center justify-content-center">
              <i className="fa fa-arrow-left text-14 text-white"> </i>
            </button>
          </div>
          <div className="d-inline-block min-width-clear">
            <h3 className="text-black text-20 mob-text-18 fw-bold merriweather-font m-0">Select the Tournament Timetable</h3>
          </div>
        </div>
      </div>
      <div className="d-block w-100 bg-silver5 rounded-3 border border-color-silver2 px-4 py-4">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-4">
              <div className="form-field5">
                <label>12/6 Tokyo Gym</label>
                <select
                  className="field-style5"
                  name="tokyoGym1"
                  value={formData.tokyoGym1}
                  onChange={handleChange}

                >
                  <option value="">Select Division</option>
                  <option value="mensSingle1">Men's single individual 1 division</option>
                  <option value="mensSingle2">Men's single individual 2 division</option>
                  <option value="mensSingle3">Men's single individual 3 division</option>
                  <option value="womensDouble1">Woman doubles team 1 division</option>
                  <option value="womensDouble2">Woman doubles team 2 division</option>
                  <option value="womensDouble3">Woman doubles team 3 division</option>
                </select>
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-4">
              <div className="form-field5">
                <label>12/7 Tokyo Gym</label>
                <select
                  className="field-style5"
                  name="tokyoGym2"
                  value={formData.tokyoGym2}
                  onChange={handleChange}

                >
                  <option value="">Select Division</option>
                  <option value="mensSingle1">Men's single individual 1 division</option>
                  <option value="mensSingle2">Men's single individual 2 division</option>
                  <option value="mensSingle3">Men's single individual 3 division</option>
                  <option value="womensDouble1">Woman doubles team 1 division</option>
                  <option value="womensDouble2">Woman doubles team 2 division</option>
                  <option value="womensDouble3">Woman doubles team 3 division</option>
                </select>
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-4">
              <div className="form-field5">
                <label>12/7 Hokkaido Gym</label>
                <select
                  className="field-style5"
                  name="hokkaidoGym"
                  value={formData.hokkaidoGym}
                  onChange={handleChange}

                >
                  <option value="">Select Division</option>
                  <option value="mensSingle1">Men's single individual 1 division</option>
                  <option value="mensSingle2">Men's single individual 2 division</option>
                  <option value="mensSingle3">Men's single individual 3 division</option>
                  <option value="womensDouble1">Woman doubles team 1 division</option>
                  <option value="womensDouble2">Woman doubles team 2 division</option>
                  <option value="womensDouble3">Woman doubles team 3 division</option>
                </select>
              </div>
            </div>
          </div>
          <div className="row pt-4">
            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
              <button type="submit" className="bg-green1 text-white text-15 w-100 px-3 py-2 rounded-3 merriweather-font border-0">
                Next
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Step3;
