import React, { useState, useEffect } from 'react';
import { createTournament, updateTournament } from '../../api/tournamentApi';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Loading from "../Loading";

const Step3 = ({ nextStep, prevStep, handleFormChange, banner, formData, setFormData, editMode }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [listTitle, setListTitle] = useState([]);
  const [listOption, setListOption] = useState([]);
  const [updateMode, setUpdateMode] = useState(editMode);
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e, index) => {
    // Array.from()を使用して選択された値を配列として取得
    const selectedValues = Array.from(e.target.selectedOptions, option => option.value);

    const updatedFormData = {
      ...formData,
      tournament_venues_attributes: formData.tournament_venues_attributes.map((item, i) =>
        i === index 
          ? { 
              ...item, 
              category_type: selectedValues
            }
          : item
      )
    };

    setFormData(updatedFormData);
    handleFormChange('tournament_venues_attributes', updatedFormData.tournament_venues_attributes);

    // デバッグ用ログ
    console.log('Selected values:', selectedValues);
    console.log('Updated formData:', updatedFormData);
  };

  const camelCaseToPascalCase = (text) => {
    if (text) {
      return text
        .split('_')
        .map((word, index) =>
          index === 0
            ? word.toLowerCase()
            : word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join('');
    }
    return ''; // Return an empty string if text is falsy
  };

  useEffect(() => {
    const dataRevenue = formData.tournament_venues_attributes;
    const dataCategory = formData.tournament_categories_attributes;
    
    if (dataRevenue) {
      const titles = dataRevenue.map(item => {
        if (item && item.venue_date && item.venue_name) {
          const [year, month, day] = item.venue_date.split("-");
          return `${day}/${month} ${item.venue_name.charAt(0).toUpperCase()}${item.venue_name.slice(1)}`;
        } else {
          return '';
        }
      });
      setListTitle(titles);
    }

    if (dataCategory) {
      const categories = dataCategory.flatMap(item => {
        const formattedCategory = t(`tournament.${camelCaseToPascalCase(item.category_type)}`);
        return Array.from({ length: item.division_number }, (_, index) => ({
          category_type: `${item.category_type}_division${index + 1}`,
          division_number: index + 1,
          title: `${formattedCategory} ${index + 1}部`
        }));
      });
      setListOption(categories);
    }
  }, [formData.tournament_categories_attributes]); // 依存配列を修正

  const handleCreate = async () => {
    try {
      // Submit form data using the API function
      if (formData.id) {
        await updateTournament(formData, banner);
      } else {
        await createTournament(formData);
      }

      navigate('/tournament-management');
      // Handle success (e.g., redirect to another page or show success message)
    } catch (error) {
      // Handle error (e.g., show error message)
      console.error('Failed to create tournament:', error);
    }
  }

  const handleUpdate = async () => {
    try {
      const result = await updateTournament(formData, banner);
      console.log('Tournament updated successfully:', result);

      navigate('/tournament-management');
      // Handle success (e.g., redirect to another page or show success message)
    } catch (error) {
      // Handle error (e.g., show error message)
      console.error('Failed to update tournament:', error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    if (updateMode) {
      await handleUpdate();
    } else {
      await handleCreate();
    }
    setIsSubmit(false); // リセット
  };

  return (
    <div className="d-block w-100 px-lg-4 px-md-4 px-sm-4 px-2 py-4">
      <div className="d-block w-100 mb-3">
        <div className="d-flex w-100 align-items-center justify-content-start">
          <div className="d-inline-block me-3">
            <button onClick={prevStep}
                    className="bg-green1 p-2 rounded-2 d-flex align-items-center justify-content-center">
              <i className="fa fa-arrow-left text-14 text-white"> </i>
            </button>
          </div>
          <div className="d-inline-block min-width-clear">
            <h3
              className="text-black text-20 mob-text-18 fw-bold merriweather-font m-0">{t('tournament.selectTournamentTimetable')}</h3>
          </div>
        </div>
      </div>
      <div className="d-block w-100 bg-silver5 rounded-3 border border-color-silver2 px-4 py-4">
        <form onSubmit={handleSubmit}>
          <div className="row">
            {listTitle.map((title, index) => (
              <div key={index} className="col-lg-6 col-md-6 col-sm-6 col-12 mb-4">
                <div className="form-field5">
                  <label>{title}</label>
                  <select
                    className="field-style5"
                    multiple // マルチセレクトを有効にする
                    size="5" // 表示するオプションの数を設定（必要に応じて調整）
                    value={formData.tournament_venues_attributes[index].category_type || []} // 初期値を配列に設定
                    onChange={(e) => handleChange(e, index)}
                    style={{ minHeight: '150px' }} // 選択エリアの高さを調整
                  >
                    <option value="">Select Division</option>
                    {listOption.map((option, ind) => (
                      <option key={ind} value={option.category_type}>
                        {option.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
          <div className="row pt-4">
            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
              <button type="submit" disabled={isSubmit}
                      className="bg-green1 text-white text-15 w-100 px-3 py-2 rounded-3 merriweather-font border-0">
                保存
              </button>
            </div>
          </div>
        </form>
      </div>
      <Loading isShow={isSubmit} />
    </div>
  );
};

export default Step3;
