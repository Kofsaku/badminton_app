import React, { useState, useEffect } from 'react';
import { TournamentCategoryModel } from '../../models/TournamentCategoryModel';
import { TournamentDivisionModel } from '../../models/TournamentDivisionModel';

const Step2 = ({ nextStep, prevStep, formData, handleFormChange }) => {
  const [categories, setCategories] = useState([new TournamentCategoryModel()]);

  const handleSubmit = (e) => {
    e.preventDefault();
    nextStep();
  };

  const handleCategoryChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const newCategories = [...categories];
    newCategories[index][name] = type === 'checkbox' ? checked : value;
    setCategories(newCategories);
    handleFormChange('tournament_categories_attributes', newCategories);
  };

  const handleDivisionChange = (categoryIndex, divisionIndex, e) => {
    const { name, value } = e.target;
    const newCategories = [...categories];
    newCategories[categoryIndex].tournament_divisions_attributes[divisionIndex][name] = value;
    setCategories(newCategories);
    handleFormChange('tournament_categories_attributes', newCategories);
  };

  const addDivision = (categoryIndex) => {
    const newCategories = [...categories];
    newCategories[categoryIndex].tournament_divisions_attributes.push(new TournamentDivisionModel());
    setCategories(newCategories);
  };

  const removeDivision = (categoryIndex, divisionIndex) => {
    const newCategories = [...categories];
    newCategories[categoryIndex].tournament_divisions_attributes.splice(divisionIndex, 1);
    setCategories(newCategories);
  };

  const addCategory = () => {
    setCategories([...categories, new TournamentCategoryModel()]);
  };

  useEffect(() => {
    if (formData.pointsLimit) setShowPointsLimit(true);
    if (formData.changeEnds) setShowChangeEnds(true);
    if (formData.breakPoint || formData.internalDuration) setShowIntervals(true);
  }, [formData]);

  
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
    handleFormChange('division_numbers', updatedDivisionNumbers);
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
          {categories.map((category, catIndex) => (
            <div key={catIndex} className="mb-4">
              <div className="col-lg-8 col-md-8 col-sm-6 col-12 mb-4">
                <div className="form-field5">
                  <label>
                    Category Type <sup>*</sup>
                  </label>
                  <select
                    className="field-style5"
                    name="categoryType"
                    value={category.categoryType}
                    onChange={(e) => handleCategoryChange(catIndex, e)}
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
                      checked={category.is_tournament}
                      onChange={(e) => handleCategoryChange(catIndex, e)}
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
                      checked={category.is_league}
                      onChange={(e) => handleCategoryChange(catIndex, e)}
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
                    value={category.game_number}
                    onChange={(e) => handleCategoryChange(catIndex, e)}
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
                        checked={showScore}
                        onChange={() => setShowScore(true)}
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Score"
                      className="field-style5"
                      name="score"
                      value={category.score}
                      onChange={(e) => handleCategoryChange(catIndex, e)}
                      disabled={!showScore} // Disable if showScore is false
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
                        checked={!showScore}
                        onChange={() => setShowScore(false)}
                      />
                    </div>
                    <select
                      className="field-style5"
                      name="time_limit"
                      value={category.time_limit}
                      onChange={(e) => handleCategoryChange(catIndex, e)}
                      disabled={showScore}
                    >
                      <option value="">Select Time Limit</option>
                      <option value="7">7 minutes</option>
                      <option value="8">8 minutes</option>
                      <option value="15">15 minutes</option>
                    </select>
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
                            value={category.break_point}
                            onChange={(e) => handleCategoryChange(catIndex, e)}
                            disabled={!showIntervals}
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
                            value={category.internal_duration}
                            onChange={(e) => handleCategoryChange(catIndex, e)}
                            disabled={!showIntervals}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="form-field5">
                  <label>
                    Change Ends
                  </label>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 col-12 mb-4">
                <div className="form-field5">
                  <label>
                    Switch During Game<sup>*</sup>
                  </label>
                  <div className="d-flex w-100 align-items-center justify-content-start">
                    <label className="mr-2 custom_label_width">
                      <input
                        type="radio"
                        name="switch_during_game"
                        value="yes"
                        checked={category.switch_during_game === 'yes'}
                        onChange={(e) => handleCategoryChange(catIndex, e)}
                      />{' '}
                      Yes
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="switch_during_game"
                        value="no"
                        checked={category.switch_during_game === 'no'}
                        onChange={(e) => handleCategoryChange(catIndex, e)}
                      />{' '}
                      No
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 col-12 mb-4">
                <div className="form-field5">
                  <label>
                    Switch Score During Game<sup>*</sup>
                  </label>
                  <div className="d-flex w-100 align-items-center justify-content-start">
                    <input
                      type="text"
                      placeholder="Change Ends"
                      className="field-style5"
                      name="change_ends"
                      value={category.switch_score_during_game}
                      onChange={(e) => handleCategoryChange(catIndex, e)}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 col-12 mb-4">
                <div className="form-field5">
                  <label>
                    Switch Between Game<sup>*</sup>
                  </label>
                  <div className="d-flex w-100 align-items-center justify-content-start">
                    <label className="mr-2 custom_label_width">
                      <input
                        type="radio"
                        name="switch_between_games"
                        value="yes"
                        checked={category.switch_between_games === 'yes'}
                        onChange={(e) => handleCategoryChange(catIndex, e)}
                      />{' '}
                      Yes
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="switch_between_games"
                        value="no"
                        checked={category.switch_between_games === 'no'}
                        onChange={(e) => handleCategoryChange(catIndex, e)}
                      />{' '}
                      No
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-6 col-12 mb-4">
                <div className="form-field5">
                  <label>
                    Division Number <sup>*</sup>
                  </label>
                  <select
                    className="field-style5"
                    name="division_number"
                    value={category.division_number || ''}
                    onChange={(e) => handleCategoryChange(catIndex, e)} // Handle division number change
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
                      type="radio"
                      id={`divisionNameTournament-${catIndex}`}
                      name={`divisionName-${catIndex}`} // Grouping name by category index
                      value="tournament"
                      checked={category.divisionName === 'tournament'}
                      onChange={(e) => handleDivisionChange(catIndex, -1, e)} // Handle division name change
                    />
                    <label
                      className="text-black text-14 ms-2 pt-1 w-auto merriweather-font fw-bold"
                      htmlFor={`divisionNameTournament-${catIndex}`}
                    >
                      Number
                    </label>
                  </div>
                  
                  <div className="checkbox-style1 me-2 mb-2 d-flex rounded-2 align-items-center justify-content-start">
                    <input
                      className="m-0 min-width-clear mt-0"
                      type="radio"
                      id={`divisionNameFreeWriting-${catIndex}`}
                      name={`divisionName-${catIndex}`} // Grouping name by category index
                      value="freeWriting"
                      checked={category.divisionName === 'freeWriting'}
                      onChange={(e) => handleDivisionChange(catIndex, -1, e)} // Handle division name change
                    />
                    <label
                      className="text-black text-14 ms-2 pt-1 w-auto merriweather-font fw-bold"
                      htmlFor={`divisionNameFreeWriting-${catIndex}`}
                    >
                      Free Writing
                    </label>
                  </div>
                </div>
              </div>
              <div className="row">
                {category.divisions.map((division, index) => (
                  <div key={index} className="col-lg-4 col-md-4 col-sm-4 col-12 mb-4">
                    <div className="form-field5">
                      <label>
                        Division {index + 1} Name <sup>*</sup>
                      </label>
                      <input
                        type="text"
                        className="field-style5"
                        name={`division_number_${index}`}
                        value={division.divisionName || ''} // Assuming divisionName is part of the model
                        onChange={(e) => handleDivisionChange(catIndex, index, e)} // Handle individual text field changes
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="row pt-4">
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                  <button type="submit" className="bg-green1 text-white text-15 w-100 px-3 py-2 rounded-3 merriweather-font border-0">
                    Continue
                  </button>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Step2;

