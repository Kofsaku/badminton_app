import React, { useState } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';

const TournamentForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1 fields
    name: '',
    eventDateTime: '',
    registrationStartTime: '',
    venueName: '',
    courtsNumber: '',
    organizationName: '',
    paymentMethod: '',
    matchStartTime: '',
    estimatedEndTime: '',
    venueAddress: '',
    matchOverview: '',
    organizer: '',
    administrator: '',
    sponsor: '',
    eventCategory: '',
    daysSchedule: '',
    receptionPeriod: '',
    competitionFormat: '',
    maxParticipants: '',
    competitionRules: '',
    ballType: '',
    participationEligibility: '',
    participationPaymentMethod: '',
    applicationMethod: '',
    applicationDeadline: '',
    pairingSelectionMethod: '',
    awardDetails: '',
    memberChanges: '',
    multipleEventsEntry: '',
    cancellationAfterApplication: '',
    participationFee: '',
    inquiryContactInfo: '',
    announcements: '',
    organizersURL: '',
    notes: '',
    // Step 2 fields
    // Add fields for Step 2
    field1Step2: '',
    field2Step2: '',
    // Step 3 fields
    // Add fields for Step 3
    field1Step3: '',
    field2Step3: '',
    // Add other step fields here...
  });

  const nextStep = () => setStep(prevStep => prevStep + 1);
  const prevStep = () => setStep(prevStep => prevStep - 1);

  const handleFormChange = (input, value) => {
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
          handleFormChange={handleFormChange}
        />
      );
    case 4:
      return (
        <Step4
          nextStep={nextStep}
          prevStep={prevStep}
          formData={formData}
          handleFormChange={handleFormChange}
        />
      );
    default:
      return null;
  }
};

export default TournamentForm;
