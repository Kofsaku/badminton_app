import React, { useState } from 'react';
import { TournamentVenueModel } from '../../models/TournamentVenueModel';
import { useTranslation } from 'react-i18next';

const Step1 = ({ nextStep, formData, handleFormChange }) => {
  const [venues, setVenues] = useState([TournamentVenueModel()]); // Call the model function
  const { t } = useTranslation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    handleFormChange(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    nextStep();
  };

  const handleVenueChange = (index, e) => {
    const { name, value } = e.target;
    const newVenues = [...venues];
    newVenues[index][name] = value;
    setVenues(newVenues);

    handleFormChange('tournament_venues_attributes', newVenues);
  };

  const addVenue = () => {
    setVenues([...venues, TournamentVenueModel()]); // Call the model function
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
            <h3 className="text-black text-20 mob-text-18 fw-bold merriweather-font m-0"> {t('tournament.add_new_tournament')} </h3>
          </div>
        </div>
      </div>

      <div className="d-block w-100 bg-silver5 rounded-3 border border-color-silver2 px-4 py-4">
        <form onSubmit={handleSubmit}>
          <div className="row">
            {[
              { label: t('tournament.name'), name: 'name', type: 'text' },
              { label: t('tournament.event_date_time'), name: 'event_date', type: 'datetime-local' },
              { label: t('tournament.registration_time'), name: 'registration_time', type: 'time' },
              { label: t('tournament.organization_name'), name: 'organization_name', type: 'text' },
              { label: t('tournament.payment_method'), name: 'payment_method', type: 'text' },
              { label: t('tournament.match_start_time'), name: 'match_start_time', type: 'time' },
              { label: t('tournament.match_overview'), name: 'match_overview', type: 'text' },
              { label: t('tournament.organizer'), name: 'organizer', type: 'text' },
              { label: t('tournament.administrator'), name: 'administrator', type: 'text' },
              { label: t('tournament.sponsor'), name: 'sponsor', type: 'text' },
              { label: t('tournament.event_category'), name: 'event_category', type: 'text' },
              { label: t('tournament.days_schedule'), name: 'days_schedule', type: 'text' },
              { label: t('tournament.reception_period'), name: 'reception_period', type: 'text' },
              { label: t('tournament.competition_format'), name: 'competition_format', type: 'text' },
              { label: t('tournament.max_participants'), name: 'max_participants', type: 'number' },
              { label: t('tournament.competition_rules'), name: 'competition_rules', type: 'text' },
              { label: t('tournament.ball_type'), name: 'ball_type', type: 'text' },
              { label: t('tournament.participation_eligibility'), name: 'participation_eligibility', type: 'text' },
              { label: t('tournament.participation_payment_method'), name: 'participation_payment_method', type: 'text' },
              { label: t('tournament.application_method'), name: 'application_method', type: 'text' },
              { label: t('tournament.application_deadline'), name: 'application_deadline', type: 'date' },
              { label: t('tournament.pairing_selection_method'), name: 'pairing_selection_method', type: 'text' },
              { label: t('tournament.award_details'), name: 'award_details', type: 'text' },
              { label: t('tournament.member_changes'), name: 'member_changes', type: 'text' },
              { label: t('tournament.entry_in_multiple_events'), name: 'entry_in_multiple_events', type: 'text' },
              { label: t('tournament.cancellation_after_application'), name: 'cancellation_after_application', type: 'text' },
              { label: t('tournament.participation_fee'), name: 'participation_fee', type: 'text' },
              { label: t('tournament.inquiry_contact_information'), name: 'inquiry_contact_information', type: 'text' },
              { label: t('tournament.announcements'), name: 'announcements', type: 'textarea' },
              { label: t('tournament.notes_for_organizers'), name: 'notes_for_organizers', type: 'textarea' },
            ].map(({ label, name, type }) => (
              <div 
                className={type === 'textarea' ? "col-lg-12 col-md-12 col-sm-12 col-12 mb-4" : "col-lg-6 col-md-6 col-sm-6 col-12 mb-4"}
                key={name}
              >
                <div className="form-field5">
                  <label>{label} <sup>*</sup></label>
                  {type === 'textarea' ? (
                    <textarea
                      className="field-style5"
                      name={name}
                      placeholder={`Add ${label}`}
                      value={formData[name] || ''}
                      onChange={handleChange}
                    />
                  ) : (
                    <input
                      type={type}
                      placeholder={`Add ${label}`}
                      className="field-style5"
                      name={name}
                      value={formData[name] || ''}
                      onChange={handleChange}
                    />
                  )}
                </div>
              </div>
            ))}

            {/* Venue Section */}
            <div className="col-12 mb-4">
              <h4>Venues</h4>
              {venues.map((venue, index) => (
                <div key={index} className="row mb-4">
                  <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-4">
                    <div className="form-field5">
                      <label>{t('tournament.venue_name')}<sup>*</sup></label>
                      <input
                        type="text"
                        placeholder={t('tournament.venue_name')}
                        className="field-style5"
                        name="venue_name"
                        value={venue.venue_name}
                        onChange={(e) => handleVenueChange(index, e)}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-4">
                    <div className="form-field5">
                      <label>{t('tournament.venue_address')}<sup>*</sup></label>
                      <input
                        type="text"
                        placeholder={t('tournament.venue_address')}
                        className="field-style5"
                        name="venue_address"
                        value={venue.venue_address}
                        onChange={(e) => handleVenueChange(index, e)}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-4">
                    <div className="form-field5">
                      <label>{t('tournament.number_of_courts')}<sup>*</sup></label>
                      <input
                        type="number"
                        placeholder={t('tournament.number_of_courts')}
                        className="field-style5"
                        name="no_of_courts"
                        value={venue.no_of_courts}
                        onChange={(e) => handleVenueChange(index, e)}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-4">
                    <div className="form-field5">
                      <label>{t('tournament.venue_date')} <sup>*</sup></label>
                      <input
                        type="date"
                        placeholder={t('tournament.venue_date')} 
                        className="field-style5"
                        name="venue_date"
                        value={venue.venue_date}
                        onChange={(e) => handleVenueChange(index, e)}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <div className="row mb-4">
                <div className="col-auto">
                  <button type="button" onClick={addVenue} className="btn btn-link p-0 text-decoration-none">
                    {t('tournament.add_more_venues')}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="row pt-2">
            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
              <button className="bg-green1 text-white text-15 w-100 rounded-2 p-3" type="submit">
                {t('tournament.next')}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Step1;
