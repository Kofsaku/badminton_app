import React, { useState, useEffect } from 'react';
import { TournamentCategoryModel } from '../../models/TournamentCategoryModel';
import { TournamentDivisionModel } from '../../models/TournamentDivisionModel';
import { useTranslation } from 'react-i18next';

const Step2 = ({ nextStep, prevStep, formData, handleFormChange }) => {
  const [categories, setCategories] = useState([TournamentCategoryModel()]);
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    nextStep();
  };

  const handleCategoryChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const newCategories = [...categories];
    newCategories[index][name] = type === 'checkbox' ? checked : value;

    if (name === "division_number") {
      const divisionCount = parseInt(value) || 0;
      newCategories[index].tournament_divisions_attributes = Array.from({ length: divisionCount }, (_, i) => TournamentDivisionModel());
    }
    
    setCategories(newCategories);
    handleFormChange('tournament_categories_attributes', newCategories);
  };

  const handleDivisionChange = (catIndex, divIndex, e) => {
    const { name, value } = e.target;
    const newCategories = [...categories];
    newCategories[catIndex].tournament_divisions_attributes[divIndex][name] = value;
    setCategories(newCategories);
    handleFormChange('tournament_categories_attributes', newCategories);
  };

  const addCategory = () => {
    setCategories([...categories, TournamentCategoryModel()]);
  };

  return (
    <div className="d-block w-100 px-lg-4 px-md-4 px-sm-4 px-2 py-4">
      <div className="d-block w-100 mb-3">
        <div className="d-flex w-100 align-items-center justify-content-start">
          <div className="d-inline-block me-3">
            <button onClick={prevStep} className="bg-green1 p-2 rounded-2 d-flex align-items-center justify-content-center">
              <i className="fa fa-arrow-left text-14 text-white"></i>
            </button>
          </div>
          <div className="d-inline-block min-width-clear">
            <h3 className="text-black text-20 mob-text-18 fw-bold merriweather-font m-0">
              {t('tournament.selectCategory')}
            </h3>
          </div>
        </div>
      </div>
      <div className="d-block w-100 bg-silver5 rounded-3 border border-color-silver2 px-4 py-4">
        <form onSubmit={handleSubmit}>
          {categories.map((category, catIndex) => (
            <div key={catIndex} className="row mb-4">
              <div className="col-lg-8 col-md-8 col-sm-6 col-12 mb-4">
                <div className="form-field5">
                  <label>
                    Category Type <sup>*</sup>
                  </label>
                  <select
                    className="field-style5"
                    name="category_type"
                    value={category.category_type}
                    onChange={(e) => handleCategoryChange(catIndex, e)}
                  >
                    <option value="mens_singles_individual">{t('tournament.mensSinglesIndividual')}</option> {/* Translation key */}
                    <option value="womens_singles_individual">{t('tournament.womensSinglesIndividual')}</option> {/* Translation key */}
                    <option value="mens_doubles_individual">{t('tournament.mensDoublesIndividual')}</option> {/* Translation key */}
                    <option value="womens_doubles_individual">{t('tournament.womensDoublesIndividual')}</option> {/* Translation key */}
                    <option value="mens_triples_individual">{t('tournament.mensTriplesIndividual')}</option> {/* Translation key */}
                    <option value="womens_triples_individual">{t('tournament.womensTriplesIndividual')}</option> {/* Translation key */}
                    <option value="mixed_triples_individual">{t('tournament.mixedTriplesIndividual')}</option> {/* Translation key */}
                    <option value="mens_doubles_team">{t('tournament.mensDoublesTeam')}</option> {/* Translation key */}
                    <option value="womens_doubles_team">{t('tournament.womensDoublesTeam')}</option> {/* Translation key */}
                    <option value="mixed_doubles_team">{t('tournament.mixedDoublesTeam')}</option> {/* Translation key */}
                    <option value="mens_singles_doubles_team">{t('tournament.mensSinglesDoublesTeam')}</option> {/* Translation key */}
                    <option value="womens_singles_doubles_team">{t('tournament.womensSinglesDoublesTeam')}</option> {/* Translation key */}
                    <option value="mixed_singles_doubles_team">{t('tournament.mixedSinglesDoublesTeam')}</option> {/* Translation key */}
                    <option value="mens_triples_team">{t('tournament.mensTriplesTeam')}</option> {/* Translation key */}
                    <option value="womens_triples_team">{t('tournament.womensTriplesTeam')}</option> {/* Translation key */}
                    <option value="mixed_triples_team">{t('tournament.mixedTriplesTeam')}</option> {/* Translation key */}
                  </select>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-4 col-12 mb-4 align-self-end">
                <div className="d-flex w-100 align-items-center justify-content-start">
                  <div className="checkbox-style1 me-2 mb-2 d-flex rounded-2 align-items-center justify-content-start">
                    <input
                      className="m-0 min-width-clear mt-0"
                      type="checkbox"
                      id={`isTournament_${catIndex}`}
                      name="is_tournament"
                      checked={category.is_tournament}
                      onChange={(e) => handleCategoryChange(catIndex, e)}
                    />
                    <label className="text-black text-14 ms-2 pt-1 w-auto merriweather-font fw-bold" htmlFor={`isTournament_${catIndex}`}>
                      {t('tournament.tournament')}
                    </label>
                  </div>
                  <div className="checkbox-style1 me-2 mb-2 d-flex rounded-2 align-items-center justify-content-start">
                    <input
                      className="m-0 min-width-clear mt-0"
                      type="checkbox"
                      id={`isLeague_${catIndex}`}
                      name="is_league"
                      checked={category.is_league}
                      onChange={(e) => handleCategoryChange(catIndex, e)}
                    />
                    <label className="text-black text-14 ms-2 pt-1 w-auto merriweather-font fw-bold" htmlFor={`isLeague_${catIndex}`}>
                      {t('tournament.league')}
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-6 col-12 mb-4">
                <div className="form-field5">
                  <label>
                    {t('tournament.numberOfGames')} <sup>*</sup>
                  </label>
                  <input
                    type="text"
                    placeholder="Game Number"
                    className="field-style5"
                    name="number_of_games"
                    value={category.number_of_games}
                    onChange={(e) => handleCategoryChange(catIndex, e)}
                  />
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-6 col-12 mb-4">
                <div className="form-field5">
                  <label>
                    {t('tournament.score')} <sup>*</sup>
                  </label>
                  <div className="d-flex w-100 align-items-center justify-content-start">
                    <div className="checkbox-style1 me-2 d-inline-block">
                      <input
                        className="m-0 min-width-clear mt-0"
                        type="checkbox"
                        name="show_score"
                        checked={category.show_score}
                        onChange={(e) => handleCategoryChange(catIndex, e)}
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Score"
                      className="field-style5"
                      name="score"
                      value={category.score}
                      onChange={(e) => handleCategoryChange(catIndex, e)}
                      disabled={!category.show_score}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-6 col-12 mb-4">
                <div className="form-field5">
                  <label>
                    {t('tournament.timeLimit')} <sup>*</sup>
                  </label>
                  <div className="d-flex w-100 align-items-center justify-content-start">
                    <div className="checkbox-style1 me-2 d-inline-block">
                      <input
                        className="m-0 min-width-clear mt-0"
                        type="checkbox"
                        name="show_time_limit"
                        value={category.show_time_limit}
                        onChange={(e) => handleCategoryChange(catIndex, e)}
                      />
                    </div>
                    <select
                      className="field-style5"
                      name="time_limit"
                      value={category.time_limit}
                      onChange={(e) => handleCategoryChange(catIndex, e)}
                      disabled={!category.show_time_limit}
                    >
                      <option value="">{ t('tournament.selectTimeLimit') }</option>
                      <option value="15">{ t('tournament.fifteenMinutes') }</option>
                      <option value="30">{ t('tournament.thirtyMinutes') }</option>
                      <option value="60">{ t('tournament.sixtyMinutes') }</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-12 mb-4">
                <div className="form-field5">
                  <label>{ t('tournament.intervals') }</label>
                </div>
                <div className="d-flex align-items-center justify-content-start w-100">
                  <div className="d-inline-block min-width-clear">
                    <div className="checkbox-style1 me-2 d-flex align-items-center justify-content-start">
                      <input
                        className="m-0 min-width-clear mt-0"
                        type="checkbox"
                        name="show_intervals"
                        value={category.show_intervals}
                        onChange={(e) => handleCategoryChange(catIndex, e)}
                      />
                    </div>
                  </div>
                  <div className="d-inline-block w-100 border rounded-3 px-3 py-2 border border-color-silver">
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-lg-0 mb-md-0 mb-sm-0 mb-4">
                        <div className="form-field5">
                          <label>
                            { t('tournament.breakPoint') } <sup>*</sup>
                          </label>
                          <select
                            className="field-style5"
                            name="break_point"
                            value={category.break_point}
                            onChange={(e) => handleCategoryChange(catIndex, e)}
                            disabled={!category.show_intervals}
                          >
                            <option value="">{ t('tournament.selectBreakPoint') }</option>
                            <option value="10Points">{ t('tournament.tenPoints') }</option>
                            <option value="20Points">{ t('tournament.twentyPoints') }</option>
                            <option value="30Points">{ t('tournament.thirtyPoints') }</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-field5">
                          <label>
                            { t('tournament.intervalDurationPlaceholder') } <sup>*</sup>
                          </label>
                          <input
                            type="text"
                            placeholder="Internal Duration"
                            className="field-style5"
                            name="interval_duration"
                            value={category.interval_duration}
                            disabled={!category.show_intervals}
                            onChange={(e) => handleCategoryChange(catIndex, e)}
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
                    { t('tournament.changeEnds') }
                  </label>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 col-12 mb-4">
                <div className="form-field5">
                  <label>
                    { t('tournament.switchDuringGame') }<sup>*</sup>
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
                      { t('tournament.yes') }
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="switch_during_game"
                        value="no"
                        checked={category.switch_during_game === 'no'}
                        onChange={(e) => handleCategoryChange(catIndex, e)}
                      />{' '}
                      { t('tournament.no') }
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 col-12 mb-4">
                <div className="form-field5">
                  <label>
                    { t('tournament.switchScoreDuringGame') }<sup>*</sup>
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
                    { t('tournament.switchBetweenGame') }<sup>*</sup>
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
                      { t('tournament.yes') }
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="switch_between_games"
                        value="no"
                        checked={category.switch_between_games === 'no'}
                        onChange={(e) => handleCategoryChange(catIndex, e)}
                      />{' '}
                      { t('tournament.no') }
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-6 col-12 mb-4">
                {category.division_name === "free_writing" ? (
                  <div className="form-field5">
                    <input
                      type="text"
                      placeholder="Division Number"
                      className="field-style5"
                      name="division_number"
                      value={category.division_number}
                      onChange={(e) => handleCategoryChange(catIndex, e)}
                    />
                  </div>
                ) : (
                  <div className="form-field5">
                    <label>
                      { t('tournament.divisionNumber') } <sup>*</sup>
                    </label>
                    <select
                      className="field-style5"
                      name="division_number"
                      value={category.division_number || ''}
                      onChange={(e) => handleCategoryChange(catIndex, e)}
                    >
                      <option value="">{ t('tournament.selectDivisionNumber') }</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </select>
                  </div>
                )}
              </div>
              <div className="col-lg-4 col-md-4 col-sm-6 col-12 mb-4">
                <div className="form-field5">
                  <label>
                    {t('tournament.divisionName')} <sup>*</sup>
                  </label>
                </div>
                <div className="d-flex w-100 align-items-center justify-content-start">
                  <div className="checkbox-style1 me-2 mb-2 d-flex rounded-2 align-items-center justify-content-start">
                    <input
                      className="m-0 min-width-clear mt-0"
                      type="radio"
                      name="division_name_type"
                      value="number"
                      checked={category.division_name_type === 'number'}
                      onChange={(e) => handleCategoryChange(catIndex, e)}
                    />
                    <label
                      className="text-black text-14 ms-2 pt-1 w-auto merriweather-font fw-bold"
                      htmlFor="divisionNameTournament"
                    >
                      {t('tournament.number')}
                    </label>
                  </div>
                  
                  <div className="checkbox-style1 me-2 mb-2 d-flex rounded-2 align-items-center justify-content-start">
                    <input
                      className="m-0 min-width-clear mt-0"
                      type="radio"
                      name="division_name_type"  // Same name attribute for grouping
                      value="free_writing"
                      checked={category.division_name_type === 'free_writing'}
                      onChange={(e) => handleCategoryChange(catIndex, e)}
                    />
                    <label
                      className="text-black text-14 ms-2 pt-1 w-auto merriweather-font fw-bold"
                      htmlFor="divisionNameFreeWriting"
                    >
                      {t('tournament.freeWriting')}
                    </label>
                  </div>
                </div>
              </div>

              <div className="row">
                {(category.tournament_divisions_attributes || []).map((division, division_index) => (
                  <div key={division_index} className="col-lg-4 col-md-4 col-sm-4 col-12 mb-4">
                    <div className="form-field5">
                      <label>
                        Division {division_index + 1} Name <sup>*</sup>
                      </label>
                      <input
                        type="text"
                        className="field-style5"
                        name="division"
                        value={division.division || ''}
                        onChange={(e) => handleDivisionChange(catIndex, division_index, e)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <button type="button" onClick={addCategory} className="btn btn-link p-0 text-decoration-none">
            {t('tournament.addCategory')}
          </button>
          <div className="d-flex w-100 justify-content-end">
            <button type="submit" className="bg-green1 py-2 px-4 text-white rounded-2">
              {t('tournament.next')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Step2;
