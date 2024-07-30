import React from 'react';

const Step2 = ({ nextStep, prevStep, formData, handleFormChange }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    handleFormChange(name, type === 'checkbox' ? checked : value);
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
            <h3 className="text-black text-20 mob-text-18 fw-bold merriweather-font m-0">
              Select the Tournament Category
            </h3>
          </div>
        </div>
      </div>
      <div className="d-block w-100 bg-silver5 rounded-3 border border-color-silver2 px-4 py-4">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-lg-8 col-md-8 col-sm-6 col-12 mb-4">
              <div className="form-field5">
                <label>
                  Category Type <sup>*</sup>
                </label>
                <select
                  className="field-style5"
                  name="categoryType"
                  value={formData.categoryType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Category Type</option>
                  <option value="type1">Category type 1</option>
                  <option value="type2">Category type 2</option>
                  <option value="type3">Category type 3</option>
                </select>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mb-4 align-self-end">
              <div className="d-flex w-100 align-items-center justify-content-start">
                <div className="checkbox-style1 me-2 mb-2 d-flex rounded-2 align-items-center justify-content-start">
                  <input
                    className="m-0 min-width-clear mt-0"
                    type="checkbox"
                    id="mensdoubleplace"
                    name="tournament"
                    checked={formData.tournament}
                    onChange={handleChange}
                  />
                  <label className="text-black text-14 ms-2 pt-1 w-auto merriweather-font fw-bold" htmlFor="mensdoubleplace">
                    Tournament
                  </label>
                </div>
                <div className="checkbox-style1 me-2 mb-2 d-flex rounded-2 align-items-center justify-content-start">
                  <input
                    className="m-0 min-width-clear mt-0"
                    type="checkbox"
                    id="league"
                    name="league"
                    checked={formData.league}
                    onChange={handleChange}
                  />
                  <label className="text-black text-14 ms-2 pt-1 w-auto merriweather-font fw-bold" htmlFor="league">
                    League
                  </label>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mb-4">
              <div className="form-field5">
                <label>
                  Gender Number <sup>*</sup>
                </label>
                <select
                  className="field-style5"
                  name="genderNumber"
                  value={formData.genderNumber}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Gender Number</option>
                  <option value="#12434">#12434</option>
                  <option value="#12435">#12435</option>
                </select>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mb-4">
              <div className="form-field5">
                <label>
                  Score <sup>*</sup>
                </label>
                <div className="d-flex w-100 align-items-center justify-content-start">
                  <div className="checkbox-style1 me-2 d-inline-block">
                    <input
                      className="m-0 min-width-clear mt-0"
                      type="checkbox"
                      id="score"
                      name="scoreCheckbox"
                      checked={formData.scoreCheckbox}
                      onChange={handleChange}
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Score"
                    className="field-style5"
                    name="score"
                    value={formData.score}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mb-4">
              <div className="form-field5">
                <label>
                  Deadline <sup>*</sup>
                </label>
                <div className="d-flex w-100 align-items-center justify-content-start">
                  <div className="checkbox-style1 me-2 d-inline-block">
                    <input
                      className="m-0 min-width-clear mt-0"
                      type="checkbox"
                      id="deadline"
                      name="deadlineCheckbox"
                      checked={formData.deadlineCheckbox}
                      onChange={handleChange}
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Deadline"
                    className="field-style5"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-12 mb-4">
              <div className="form-field5">
                <label>Intervals</label>
              </div>
              <div className="d-flex align-items-center justify-content-start w-100">
                <div className="d-inline-block min-width-clear">
                  <div className="checkbox-style1 me-2 d-flex align-items-center justify-content-start">
                    <input
                      className="m-0 min-width-clear mt-0"
                      type="checkbox"
                      id="intervals"
                      name="intervals"
                      checked={formData.intervals}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="d-inline-block w-100 border rounded-3 px-3 py-2 border border-color-silver">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-lg-0 mb-md-0 mb-sm-0 mb-4">
                      <div className="form-field5">
                        <label>
                          Break Point <sup>*</sup>
                        </label>
                        <select
                          className="field-style5"
                          name="breakPoint"
                          value={formData.breakPoint}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Break Point</option>
                          <option value="10Points">10 Points</option>
                          <option value="20Points">20 Points</option>
                          <option value="30Points">30 Points</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-field5">
                        <label>
                          Internal Duration <sup>*</sup>
                        </label>
                        <input
                          type="text"
                          placeholder="Internal Duration"
                          className="field-style5"
                          name="internalDuration"
                          value={formData.internalDuration}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-4">
              <div className="form-field5">
                <label>
                  Points Limit <sup>*</sup>
                </label>
                <div className="d-flex w-100 align-items-center justify-content-start">
                  <div className="checkbox-style1 me-2 d-inline-block">
                    <input
                      className="m-0 min-width-clear mt-0"
                      type="checkbox"
                      id="pointsLimit"
                      name="pointsLimitCheckbox"
                      checked={formData.pointsLimitCheckbox}
                      onChange={handleChange}
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Points Limit"
                    className="field-style5"
                    name="pointsLimit"
                    value={formData.pointsLimit}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-4">
              <div className="form-field5">
                <label>
                  Change Ends <sup>*</sup>
                </label>
                <div className="d-flex w-100 align-items-center justify-content-start">
                  <div className="checkbox-style1 me-2 d-inline-block">
                    <input
                      className="m-0 min-width-clear mt-0"
                      type="checkbox"
                      id="changeEnds"
                      name="changeEndsCheckbox"
                      checked={formData.changeEndsCheckbox}
                      onChange={handleChange}
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Change Ends"
                    className="field-style5"
                    name="changeEnds"
                    value={formData.changeEnds}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-8 col-md-8 col-sm-6 col-12 mb-4">
              <div className="form-field5">
                <label>
                  Division Number <sup>*</sup>
                </label>
                <select
                  className="field-style5"
                  name="divisionNumber"
                  value={formData.divisionNumber}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Division Number</option>
                  <option value="#2323">#2323</option>
                  <option value="#4545">#4545</option>
                </select>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mb-4">
              <div className="form-field5">
                <label>
                  Division Name <sup>*</sup>
                </label>
              </div>
              <div className="d-flex w-100 align-items-center justify-content-start">
                <div className="checkbox-style1 me-2 mb-2 d-flex rounded-2 align-items-center justify-content-start">
                  <input
                    className="m-0 min-width-clear mt-0"
                    type="checkbox"
                    id="divisionNameTournament"
                    name="divisionNameTournament"
                    checked={formData.divisionNameTournament}
                    onChange={handleChange}
                  />
                  <label className="text-black text-14 ms-2 pt-1 w-auto merriweather-font fw-bold" htmlFor="divisionNameTournament">
                    Tournament
                  </label>
                </div>
                <div className="checkbox-style1 me-2 mb-2 d-flex rounded-2 align-items-center justify-content-start">
                  <input
                    className="m-0 min-width-clear mt-0"
                    type="checkbox"
                    id="divisionNameFreeWriting"
                    name="divisionNameFreeWriting"
                    checked={formData.divisionNameFreeWriting}
                    onChange={handleChange}
                  />
                  <label className="text-black text-14 ms-2 pt-1 w-auto merriweather-font fw-bold" htmlFor="divisionNameFreeWriting">
                    Free Writing
                  </label>
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default Step2;

