import React from 'react';

const Step3 = ({ nextStep, prevStep, handleFormChange, formData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    handleFormChange(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    nextStep();
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
            <h3 className="text-black text-20 mob-text-18 fw-bold merriweather-font m-0"> Select the Tournament Division </h3>
          </div>
        </div>
      </div>
      <div className="d-block w-100 bg-silver5 rounded-3 border border-color-silver2 px-4 py-4">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-4">
              <div className="form-field5">
                <label>
                  Division <sup>*</sup>
                </label>
                <select
                  className="field-style5"
                  name="division"
                  value={formData.division}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Division</option>
                  <option value="division1">Division 1</option>
                  <option value="division2">Division 2</option>
                </select>
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-4">
              <div className="form-field5">
                <label>
                  No. of Matches <sup>*</sup>
                </label>
                <select
                  className="field-style5"
                  name="numberOfMatches"
                  value={formData.numberOfMatches}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Number of Matches</option>
                  <option value="match1">Match 1</option>
                  <option value="match2">Match 2</option>
                </select>
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-4">
              <div className="form-field5">
                <label>
                  Match Type <sup>*</sup>
                </label>
                <select
                  className="field-style5"
                  name="matchType"
                  value={formData.matchType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Type</option>
                  <option value="singleDouble">Single Double</option>
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