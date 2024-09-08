import React, { useState, useEffect } from 'react';

const Step2 = ({ nextStep, prevStep, formData, handleFormChange }) => {
  const [divisions, setDivisions] = useState([{ division: null, participants_limit: null }]);
  const [showPointsLimit, setShowPointsLimit] = useState(false);
  const [showChangeEnds, setShowChangeEnds] = useState(false);
  const [showIntervals, setShowIntervals] = useState(false);
  const [divisionNumbers, setDivisionNumbers] = useState([]); // To store division numbers array

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    handleFormChange(name, type === 'checkbox' ? checked : value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    nextStep();
  };

  const handleDivisionChange = (index, e) => {
    const { name, value } = e.target;
    const newDivisions = [...divisions];
    newDivisions[index][name] = value;
    setDivisions(newDivisions);

    // Update the formData with the divisions array
    handleFormChange('tournament_divisions_attributes', newDivisions);
  };

  const addDivision = () => {
    const newDivisions = [...divisions, { division: null, participants_limit: null }];
    setDivisions(newDivisions);
  };

  const handleCheckboxChange = (e, setState) => {
    const { checked } = e.target;
    setState(checked);
  };

  // Handle dynamic division number field generation
  const handleDivisionNumberChange = (e) => {
    const selectedNumber = parseInt(e.target.value, 10);
    const divisionArray = Array.from({ length: selectedNumber }, (_, i) => i + 1);
    setDivisionNumbers(divisionArray); // Update the state with new array
    handleFormChange('division_number', selectedNumber); // Update formData with selected number
  };

  const handleDivisionTextFieldChange = (index, e) => {
    const { name, value } = e.target;
    const updatedDivisionNumbers = [...formData.division_numbers];
    updatedDivisionNumbers[index] = value;
    handleFormChange('division_numbers', updatedDivisionNumbers); // Update formData with division numbers
  };

  useEffect(() => {
    if (formData.pointsLimit) setShowPointsLimit(true);
    if (formData.changeEnds) setShowChangeEnds(true);
    if (formData.breakPoint || formData.internalDuration) setShowIntervals(true);
  }, [formData]);

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
                >
                  <option value="mens_singles_individual">Men's Singles Individual Event</option>
                  <option value="womens_singles_individual">Women's Singles Individual Event</option>
                  <option value="mens_doubles_individual">Men's Doubles Individual Event</option>
                  <option value="womens_doubles_individual">Women's Doubles Individual Event</option>
                  <option value="mens_triples_individual">Men's Triples Individual Event</option>
                  <option value="womens_triples_individual">Women's Triples Individual Event</option>
                  <option value="mixed_triples_individual">Mixed Triples Individual Event</option>
                  <option value="mens_doubles_team">Men's Doubles Team Event</option>
                  <option value="womens_doubles_team">Women's Doubles Team Event</option>
                  <option value="mixed_doubles_team">Mixed Doubles Team Event</option>
                  <option value="mens_singles_doubles_team">Men's Singles & Doubles Team Event</option>
                  <option value="womens_singles_doubles_team">Women's Singles & Doubles Team Event</option>
                  <option value="mixed_singles_doubles_team">Mixed Singles & Doubles Team Event</option>
                  <option value="mens_triples_team">Men's Triples Team Event</option>
                  <option value="womens_triples_team">Women's Triples Team Event</option>
                  <option value="mixed_triples_team">Mixed Triples Team Event</option>
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
                    name="is_tournament"
                    checked={formData.is_tournament}
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
                    id="isLeague"
                    name="is_league"
                    checked={formData.is_league}
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
                  Game Number <sup>*</sup>
                </label>
                <input
                  type="text"
                  placeholder="Game Number"
                  className="field-style5"
                  name="game_number"
                  value={formData.game_number}
                  onChange={handleChange}
                />
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

                  />
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mb-4">
              <div className="form-field5">
                <label>
                  Time Limit <sup>*</sup>
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
                    placeholder="Time Limit"
                    className="field-style5"
                    name="time_limit"
                    value={formData.time_limit}
                    onChange={handleChange}

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
                      name="intervalsCheckbox"
                      checked={showIntervals}
                      onChange={(e) => handleCheckboxChange(e, setShowIntervals)}
                    />
                  </div>
                </div>
                {showIntervals && (
                  <div className="d-inline-block w-100 border rounded-3 px-3 py-2 border border-color-silver">
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-lg-0 mb-md-0 mb-sm-0 mb-4">
                        <div className="form-field5">
                          <label>
                            Break Point <sup>*</sup>
                          </label>
                          <select
                            className="field-style5"
                            name="break_point"
                            value={formData.break_point}
                            onChange={handleChange}

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
                            name="internal_duration"
                            value={formData.internal_duration}
                            onChange={handleChange}

                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
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
                      checked={showPointsLimit}
                      onChange={(e) => handleCheckboxChange(e, setShowPointsLimit)}
                    />
                  </div>
                  {showPointsLimit && (
                    <input
                      type="text"
                      placeholder="Points Limit"
                      className="field-style5"
                      name="points_limit"
                      value={formData.points_limit}
                      onChange={handleChange}
                    />
                  )}
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
                      checked={showChangeEnds}
                      onChange={(e) => handleCheckboxChange(e, setShowChangeEnds)}
                    />
                  </div>
                  {showChangeEnds && (
                    <input
                      type="text"
                      placeholder="Change Ends"
                      className="field-style5"
                      name="change_ends"
                      value={formData.change_ends}
                      onChange={handleChange}
                    />
                  )}
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
                  name="division_number"
                  value={formData.division_number || ''}
                  onChange={handleDivisionNumberChange} // Updated to handle number of divisions
                >
                  <option value="">Select Division Number</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
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

            {divisionNumbers.map((division, index) => (
              <div key={index} className="col-lg-4 col-md-4 col-sm-4 col-12 mb-4">
                <div className="form-field5">
                  <label>
                    Division {index + 1} Name <sup>*</sup>
                  </label>
                  <input
                    type="text"
                    className="field-style5"
                    name={`division_number_${index}`}
                    value={formData.division_numbers?.[index] || ''}
                    onChange={(e) => handleDivisionTextFieldChange(index, e)} // Handle individual text field changes
                  />
                </div>
              </div>
            ))}

            { divisions.map((division, index) => (
              <div key={index} className="row mb-4">
                <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-6">
                  <div className="form-field5">
                    <label>Division <sup>*</sup></label>
                    <select
                      className="field-style5"
                      name="division"
                      value={division.division}
                      onChange={(e) => handleDivisionChange(index, e)}
                    >
                      <option value="">Select Division</option>
                      {[...Array(50).keys()].map((num) => (
                        <option key={num + 1} value={num + 1}>
                          {num + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-6">
                  <div className="form-field5">
                    <label>Participants Limit <sup>*</sup></label>
                    <input
                      type="text"
                      placeholder="Add Participants Limit"
                      className="field-style5"
                      name="participants_limit"
                      value={division.participants_limit}
                      onChange={(e) => handleDivisionChange(index, e)}
                    />
                  </div>
                </div>
              </div>
            ))}

            <div className="row mb-4">
              <div className="col-auto">
                <button type="button" onClick={addDivision} className="btn btn-link p-0 text-decoration-none">
                  Add Another division
                </button>
              </div>
            </div>

            <div className="row pt-4">
              <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                <button type="submit" className="bg-green1 text-white text-15 w-100 px-3 py-2 rounded-3 merriweather-font border-0">
                  Continue
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

