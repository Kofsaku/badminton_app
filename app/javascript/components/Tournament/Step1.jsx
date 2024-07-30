import React from 'react';

const Step1 = ({ nextStep, formData, handleFormChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    handleFormChange(name, value);
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
            <a href="tournament-management.html" className="bg-green1 p-2 rounded-2 d-flex align-items-center justify-content-center">
              <i className="fa fa-arrow-left text-14 text-white"> </i>
            </a>
          </div>
          <div className="d-inline-block min-width-clear">
            <h3 className="text-black text-20 mob-text-18 fw-bold merriweather-font m-0"> Add New Tournament </h3>
          </div>
        </div>
      </div>

      <div className="d-block w-100 bg-silver5 rounded-3 border border-color-silver2 px-4 py-4">
        <form onSubmit={handleSubmit}>
          <div className="row">
            {Object.entries(formData).filter(([key]) => key in {
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
            }).map(([key, value], index) => (
              <div key={index} className="col-lg-6 col-md-6 col-sm-6 col-12 mb-4">
                <div className="form-field5">
                  <label>
                    {key.split(/(?=[A-Z])/).join(' ')} <sup>*</sup>
                  </label>
                  <input
                    type={key.includes('Time') || key.includes('Date') ? 'time' : 'text'}
                    placeholder={`Add ${key.split(/(?=[A-Z])/).join(' ')}`}
                    className="field-style5"
                    name={key}
                    value={value}
                    onChange={handleChange}
                  />
                </div>
              </div>
            ))}
            <div className="col-lg-12 col-md-12 col-sm-12 col-12 mb-4">
              <div className="form-field5">
                <label>Notes for Organizers</label>
                <textarea
                  className="field-style5"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
          </div>

          <div className="row pt-2">
            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
              <button className="bg-green1 text-white text-15 w-100 px-3 py-2 rounded-3 merriweather-font border-0">
                Save Tournament
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Step1;
