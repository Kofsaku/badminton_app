import React, { useState, useEffect } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import { TournamentFormModel } from '../../models/TournamentFormModel';
import { Form } from 'react-router-dom';

const TournamentForm = ({ initialData, editMode }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(TournamentFormModel);
  const [banner, setBanner] = useState()

  useEffect(() => {
    if (initialData) {
      setFormData(initialData); // Populate form with initial data when editing
    }
  }, [initialData]);

  const nextStep = () => setStep(prevStep => prevStep + 1);
  const prevStep = () => setStep(prevStep => prevStep - 1);

  const handleFormChange = (input, value) => {
    setFormData({ ...formData, [input]: value });
  };

  const addCategory = () => {
    setStep(2);
  };

  switch (step) {
    case 1:
      return (
        <Step1
          nextStep={nextStep}
          formData={formData}
          setBanner={setBanner}
          handleFormChange={handleFormChange}
          addCategory={addCategory}
        />
      );
    case 2:
      return (
        <Step2
          nextStep={nextStep}
          prevStep={prevStep}
          formData={formData}
          handleFormChange={handleFormChange}
        />
      );
    case 3:
      return (
        <Step3
          nextStep={nextStep}
          prevStep={prevStep}
          formData={formData}
          banner={banner}
          setFormData={setFormData}
          handleFormChange={handleFormChange}
          editMode={editMode}
        />
      );
    default:
      return null;
  }
};

export default TournamentForm;
