import React, { useState } from 'react';
import { TournamentCategoryModel } from '../../models/TournamentCategoryModel';
import { TournamentDivisionModel } from '../../models/TournamentDivisionModel';
import { useTranslation } from 'react-i18next';

const Step2 = ({ nextStep, prevStep, formData, handleFormChange }) => {
  // ゲーム数に基づいて games 配列を初期化する関数
  const initializeGames = (number_of_games) => {
    const gameCount = parseInt(number_of_games, 10) || 0;
    return Array.from({ length: gameCount }, () => ({
      interval_duration: '',            // 各ゲームのインターバル時間
      switch_ends: false,               // エンドチェンジの有無
      switch_score_during_game: '',     // エンドチェンジ時のスコア
    }));
  };

  // 初期状態で number_of_games を3に設定し、games 配列を初期化
  const [categories, setCategories] = useState(() => {
    // formData に既にカテゴリデータが存在する場合はそれを使用
    if (formData.tournament_categories_attributes && formData.tournament_categories_attributes.length > 0) {
      return formData.tournament_categories_attributes.map(category => ({
        ...TournamentCategoryModel(),
        ...category,
        number_of_games: category.number_of_games || 3,
        show_intervals: category.show_intervals !== undefined ? category.show_intervals : false,
        games: category.games || initializeGames(category.number_of_games || 3), // 既存のgamesを使用
      }));
    } else {
      // 既定のカテゴリを1つ追加
      const initialCategory = TournamentCategoryModel();
      initialCategory.number_of_games = 3;
      initialCategory.show_intervals = false;
      initialCategory.games = initializeGames(initialCategory.number_of_games);
      return [initialCategory];
    }
  });

  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    nextStep();
  };

  // カテゴリの変更を処理する関数
  const handleCategoryChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const newCategories = [...categories];
    const category = { ...newCategories[index] };

    if (type === 'radio') {
      // ラジオボタンの場合、値をブール値に変換
      category[name] = value === 'true';
    } else if (type === 'checkbox') {
      category[name] = checked;
    } else if (name === 'number_of_games' || name === 'score') {
      // 数値フィールドの場合、数値に変換
      category[name] = parseInt(value, 10) || '';
    } else {
      category[name] = value;
    }

    // division_number の変更に応じて tournament_divisions_attributes を更新
    if (name === "division_number") {
      const divisionCount = parseInt(value, 10) || 0;
      category.tournament_divisions_attributes = Array.from({ length: divisionCount }, () => TournamentDivisionModel());
    }

    // number_of_games の変更に応じて games 配列を更新
    if (name === 'number_of_games') {
      const gameCount = parseInt(value, 10) || 0;
      category.games = initializeGames(gameCount);
    }

    newCategories[index] = category;
    setCategories(newCategories);
    handleFormChange('tournament_categories_attributes', newCategories);

    // デバッグ用ログ
    console.log('handleCategoryChange - Updated Categories:', newCategories);
  };

  // ディビジョンの変更を処理する関数
  const handleDivisionChange = (catIndex, divIndex, e) => {
    const { name, value } = e.target;
    const newCategories = [...categories];
    newCategories[catIndex].tournament_divisions_attributes[divIndex][name] = value;
    setCategories(newCategories);
    handleFormChange('tournament_categories_attributes', newCategories);

    // デバッグ用ログ
    console.log('handleDivisionChange - Updated Categories:', newCategories);
  };

  // ゲーム設定の変更を処理する関数を修正
  const handleGameChange = (catIndex, gameIndex, e) => {
    const { name, value, type } = e.target;
    const newCategories = [...categories];
    const category = { ...newCategories[catIndex] };
    const games = [...(category.games || [])];
    const game = { ...games[gameIndex] };

    if (name.startsWith('switch_ends_')) {
      game.switch_ends = value === 'true';
    } else if (type === 'number') {
      game[name] = parseInt(value, 10) || '';
    } else {
      game[name] = value;
    }

    games[gameIndex] = game;
    category.games = games;
    newCategories[catIndex] = category;

    setCategories(newCategories);
    handleFormChange('tournament_categories_attributes', newCategories);

    // デバッグログ
    console.log('Game settings updated:', game);
    console.log('Updated categories:', newCategories);
  };

  // 新しいカテゴリを追加する関数
  const addCategory = () => {
    const newCategory = TournamentCategoryModel();
    newCategory.number_of_games = 3;            // 新規カテゴリでもデフォルトで3ゲーム
    newCategory.show_intervals = false;         // インターバルをデフォルトで非表示
    newCategory.games = initializeGames(newCategory.number_of_games);
    const updatedCategories = [...categories, newCategory];
    setCategories(updatedCategories);
    handleFormChange('tournament_categories_attributes', updatedCategories);

    // デバッグ用ログ
    console.log('addCategory - Updated Categories:', updatedCategories);
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
              {/* Category Type */}
              <div className="col-lg-8 col-md-8 col-sm-6 col-12 mb-4">
                <div className="form-field5">
                  <label>
                    {t('tournament.categoryType')} <sup>*</sup>
                  </label>
                  <select
                    className="field-style5"
                    name="category_type"
                    value={category.category_type || ''}
                    onChange={(e) => handleCategoryChange(catIndex, e)}
                  >
                    <option value="">{t('tournament.selectTournamentCategory')}</option>
                    <option value="mens_singles_individual">{t('tournament.mensSinglesIndividual')}</option>
                    <option value="womens_singles_individual">{t('tournament.womensSinglesIndividual')}</option>
                    <option value="mens_doubles_individual">{t('tournament.mensDoublesIndividual')}</option>
                    <option value="womens_doubles_individual">{t('tournament.womensDoublesIndividual')}</option>
                    <option value="mens_triples_individual">{t('tournament.mensTriplesIndividual')}</option>
                    <option value="womens_triples_individual">{t('tournament.womensTriplesIndividual')}</option>
                    <option value="mixed_triples_individual">{t('tournament.mixedTriplesIndividual')}</option>
                    <option value="mens_doubles_team">{t('tournament.mensDoublesTeam')}</option>
                    <option value="womens_doubles_team">{t('tournament.womensDoublesTeam')}</option>
                    <option value="mixed_doubles_team">{t('tournament.mixedDoublesTeam')}</option>
                    <option value="mens_singles_doubles_team">{t('tournament.mensSinglesDoublesTeam')}</option>
                    <option value="womens_singles_doubles_team">{t('tournament.womensSinglesDoublesTeam')}</option>
                    <option value="mixed_singles_doubles_team">{t('tournament.mixedSinglesDoublesTeam')}</option>
                    <option value="mens_triples_team">{t('tournament.mensTriplesTeam')}</option>
                    <option value="womens_triples_team">{t('tournament.womensTriplesTeam')}</option>
                    <option value="mixed_triples_team">{t('tournament.mixedTriplesTeam')}</option>
                  </select>
                </div>
              </div>

              {/* Tournament & League Checkboxes */}
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

              {/* Number of Games */}
              <div className="col-lg-4 col-md-4 col-sm-6 col-12 mb-4">
                <div className="form-field5">
                  <label>
                    {t('tournament.numberOfGames')} <sup>*</sup>
                  </label>
                  <input
                    type="number" // 数値入力に変更
                    placeholder="Game Number"
                    className="field-style5"
                    name="number_of_games"
                    value={category.number_of_games}
                    onChange={(e) => handleCategoryChange(catIndex, e)}
                    min="1"
                  />
                </div>
              </div>

              {/* Score */}
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
                      type="number" // 数値入力に変更
                      placeholder="Score"
                      className="field-style5"
                      name="score"
                      value={category.score}
                      onChange={(e) => handleCategoryChange(catIndex, e)}
                      disabled={!category.show_score}
                      min="1"
                    />
                  </div>
                </div>
              </div>

              {/* Time Limit */}
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
                        checked={category.show_time_limit}
                        onChange={(e) => handleCategoryChange(catIndex, e)}
                      />
                    </div>
                    <select
                      className="field-style5"
                      name="time_limit"
                      value={category.time_limit || ''}
                      onChange={(e) => handleCategoryChange(catIndex, e)}
                      disabled={!category.show_time_limit}
                    >
                      <option value="">{t('tournament.selectTimeLimit')}</option>
                      <option value="15">{t('tournament.fifteenMinutes')}</option>
                      <option value="30">{t('tournament.thirtyMinutes')}</option>
                      <option value="60">{t('tournament.sixtyMinutes')}</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Intervals and Game Settings */}
              <div className="col-lg-12 col-md-12 col-sm-12 col-12 mb-4">
                <div className="form-field5">
                  <label>{t('tournament.intervals')}</label>
                </div>
                <div className="d-flex align-items-start justify-content-start w-100">
                  <div className="d-inline-block me-2">
                    <div className="checkbox-style1 d-flex align-items-center justify-content-start">
                      <input
                        className="m-0 min-width-clear mt-0"
                        type="checkbox"
                        name="show_intervals"
                        checked={category.show_intervals}
                        onChange={(e) => handleCategoryChange(catIndex, e)}
                      />
                      <label className="text-black text-14 ms-2 pt-1 w-auto merriweather-font fw-bold">
                        {t('tournament.enableIntervals')}
                      </label>
                    </div>
                  </div>
                </div>
                {category.show_intervals && (
                  <div className="mt-3">
                    {/* ゲーム設定フォームの追加 */}
                    {category.games?.map((game, gameIndex) => (
                      <div key={gameIndex} className="border p-3 mb-2">
                        <h5>第{gameIndex + 1}{t('tournament.game')}</h5>
                        {/* インターバルの長さ */}
                        <div className="form-group">
                          <label>{t('tournament.intervalDuration')}</label>
                          <input
                            type="number"
                            name="interval_duration"
                            value={game.interval_duration || ''}
                            onChange={(e) => handleGameChange(catIndex, gameIndex, e)}
                            className="field-style5"
                            min="1"
                            placeholder={t('tournament.intervalDurationPlaceholder')}
                          />
                        </div>
                        {/* エンドチェンジの有無 */}
                        <div className="form-group">
                          <label>{t('tournament.switchEnds')}</label>
                          <div>
                            <label className="me-3">
                              <input
                                type="radio"
                                name={`switch_ends_${catIndex}_${gameIndex}`} // グループ名をユニークに
                                value="true"
                                checked={game.switch_ends === true}
                                onChange={(e) => handleGameChange(catIndex, gameIndex, e)}
                              />
                              {t('tournament.yes')}
                            </label>
                            <label>
                              <input
                                type="radio"
                                name={`switch_ends_${catIndex}_${gameIndex}`} // グループ名をユニークに
                                value="false"
                                checked={game.switch_ends === false}
                                onChange={(e) => handleGameChange(catIndex, gameIndex, e)}
                              />
                              {t('tournament.no')}
                            </label>
                          </div>
                        </div>
                        {/* エンドチェンジが有効な場合のスコア */}
                        {game.switch_ends && (
                          <div className="form-group">
                            <label>{t('tournament.switchScoreDuringGame')}</label>
                            <input
                              type="number"
                              name="switch_score_during_game"
                              value={game.switch_score_during_game || ''}
                              onChange={(e) => handleGameChange(catIndex, gameIndex, e)}
                              className="field-style5"
                              min="1"
                              placeholder={t('tournament.switchScorePlaceholder')}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Division Number */}
              <div className="col-lg-4 col-md-4 col-sm-6 col-12 mb-4">
                {category.division_name_type === "free_writing" ? (
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
                      {t('tournament.divisionNumber')} <sup>*</sup>
                    </label>
                    <select
                      className="field-style5"
                      name="division_number"
                      value={category.division_number || ''}
                      onChange={(e) => handleCategoryChange(catIndex, e)}
                    >
                    <option value="">{t('tournament.selectDivisionNumber')}</option>
                    {Array.from({ length: 50 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>


              {/* Division Names */}
              <div className="row">
                {(category.tournament_divisions_attributes || []).map((division, division_index) => (
                  <div key={division_index} className="col-lg-4 col-md-4 col-sm-4 col-12 mb-4">
                    <div className="form-field5">
                      <label>
                      {division_index + 1}{t('tournament.divisionName')}  <sup>*</sup>
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
          <div className="d-flex w-100 justify-content-end mt-3">
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
