import React, { useState, useEffect } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import { UserModel } from '../../models/UserModel';

const AccountForm = ({ initialData }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(UserModel);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const nextStep = () => setStep(prevStep => prevStep + 1);
  const prevStep = () => setStep(prevStep => prevStep - 1);

  const handleFormChange = (input, value) => {
    console.log(formData);
    setFormData({ ...formData, [input]: value });
  };

  switch (step) {
    case 1:
      return (
        <Step1
          nextStep={nextStep}
          formData={formData}
          handleFormChange={handleFormChange}
        />
      );
    case 2:
      return (
        <Step2
          nextStep={nextStep}
          formData={formData}
          handleFormChange={handleFormChange}
        />
      );
    case 3:
      return (
        <Step3
          formData={formData}
          handleFormChange={handleFormChange}
        />
      );
    default:
      return null;
  }
};

export default AccountForm;
