import React, { useState, useEffect } from 'react';

import {createTournament, updateTournament} from '../../api/tournamentApi';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {Spinner} from "react-bootstrap";
import Loading from "../Loading";

const Step3 = ({ nextStep, prevStep, handleFormChange, formData, setFormData, editMode }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [listTitle, setListTitle] = useState([])
  const [listOption, setListOption] = useState([])
  const [updateMode, setUpdateMode] = useState(editMode)
  const [isSubmit, setIsSubmit] = useState(false)

  const handleChange = (e, index) => {
    const selectedCategoryType = e.target.value;
    const selectedOption = listOption.find(option => option.category_type === selectedCategoryType);

    if (selectedOption) {
      const updatedFormData = {
        ...formData,
        tournament_venues_attributes: formData.tournament_venues_attributes.map((item, i) =>
          i === index ? { ...item, category_type: selectedOption.category_type, division_number: selectedOption.division_number  } : item
        )
      };
      setFormData(updatedFormData);

    } else {
      console.log("No valid option selected");
    }
  };
  const camelCaseToPascalCase = (text) => {
    if (text) {
      return text
        .split('_')
        .map((word, index) =>
          index === 0
            ? word.toLowerCase() // Keep the first word in lowercase
            : word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join('');
    }
    return ''; // Return an empty string if text is falsy
  };

  useEffect(() => {
    const dataRevenue = formData.tournament_venues_attributes
    const dataCategory = formData.tournament_categories_attributes
    if (dataRevenue) {
      const titles = dataRevenue.map(item => {
        if (item) {
          const [year, month, day] = item.venue_date.split("-");
          return `${day}/${month} ${item.venue_name.charAt(0).toUpperCase()}${item.venue_name.slice(1)}`;
        } else {
          return ''
        }

      });
      setListTitle(titles)
    }
    if (dataRevenue) {
      const categories = dataCategory.map(item => {
        const formattedCategory = t(`tournament.${camelCaseToPascalCase(item.category_type)}`);
        return {
          category_type: item.category_type,
          division_number: item.division_number,
          title: `${formattedCategory} ${item.division_number} division`
        };
      });
      setListOption(categories)
    }

  }, [formData]);

  const handleCreate = async () => {
    try {
      // Submit form data using the API function
      if (formData.id) {
        await updateTournament(formData,formData.id);
      } else {
        await createTournament(formData);
      }
      // console.log('Tournament created successfully:', result);

      navigate('/tournament-management');
      // Handle success (e.g., redirect to another page or show success message)
    } catch (error) {
      // Handle error (e.g., show error message)
      console.error('Failed to create tournament:', error);
    }
  }

  const handleUpdate = async () => {
    try {
      // Submit form data using the API function
      const result = await updateTournament(formData);
      console.log('Tournament created successfully:', result);

      navigate('/tournament-management');
      // Handle success (e.g., redirect to another page or show success message)
    } catch (error) {
      // Handle error (e.g., show error message)
      console.error('Failed to create tournament:', error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true)
    console.log(111)
    // if (updateMode) {
    //   handleUpdate()
    // } else {
    //   handleCreate()
    // }
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
                    value={formData.tournament_venues_attributes[index].category_type || ''}
                    onChange={(e) => handleChange(e, index)}
                  >
                    <option value="">Select Division</option>
                    {listOption.map((option, ind) => (
                      <option key={ind} value={option.category_type}>{option.title}</option>
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
                Next
              </button>
            </div>
          </div>
        </form>
      </div>
      <Loading isShow={isSubmit}/>
    </div>
  );
};

export default Step3;
