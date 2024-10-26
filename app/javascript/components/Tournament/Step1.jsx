import React, { useState } from 'react';
import { TournamentVenueModel } from '../../models/TournamentVenueModel';

const Step1 = ({ nextStep, formData, handleFormChange }) => {
  const [venues, setVenues] = useState([TournamentVenueModel()]); // Call the model function

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
            <h3 className="text-black text-20 mob-text-18 fw-bold merriweather-font m-0"> Add New Tournament </h3>
          </div>
        </div>
      </div>

      <div className="d-block w-100 bg-silver5 rounded-3 border border-color-silver2 px-4 py-4">
        <form onSubmit={handleSubmit}>
          <div className="row">
            {[
              { label: 'Name', name: 'name', type: 'text' },
              { label: 'Event Date Time', name: 'event_date', type: 'datetime-local' },
              { label: 'Registration Start Time', name: 'registration_time', type: 'time' },
              { label: 'Organization Name', name: 'organization_name', type: 'text' },
              { label: 'Payment Method', name: 'payment_method', type: 'text' },
              { label: 'Match Start Time', name: 'match_start_time', type: 'time' },
              { label: 'Match Overview', name: 'match_overview', type: 'text' },
              { label: 'Organizer', name: 'organizer', type: 'text' },
              { label: 'Administrator', name: 'administrator', type: 'text' },
              { label: 'Sponsor', name: 'sponsor', type: 'text' },
              { label: 'Event Category', name: 'event_category', type: 'text' },
              { label: 'Days Schedule', name: 'days_schedule', type: 'text' },
              { label: 'Reception Period', name: 'reception_period', type: 'text' },
              { label: 'Competition Format', name: 'competition_format', type: 'text' },
              { label: 'Max Participants', name: 'max_participants', type: 'number' },
              { label: 'Competition Rules', name: 'competition_rules', type: 'text' },
              { label: 'Ball Type', name: 'ball_type', type: 'text' },
              { label: 'Participation Eligibility', name: 'participation_eligibility', type: 'text' },
              { label: 'Participation Payment Method', name: 'participation_payment_method', type: 'text' },
              { label: 'Application Method', name: 'application_method', type: 'text' },
              { label: 'Application Deadline', name: 'application_deadline', type: 'date' },
              { label: 'Pairing Selection Method', name: 'pairing_selection_method', type: 'text' },
              { label: 'Award Details', name: 'award_details', type: 'text' },
              { label: 'Member Changes', name: 'member_changes', type: 'text' },
              { label: 'Add Multiple Events Entry', name: 'entry_in_multiple_events', type: 'text' },
              { label: 'Add Cancellation After Application', name: 'cancellation_after_application', type: 'text' },
              { label: 'Participation Fee', name: 'participation_fee', type: 'text' },
              { label: 'Inquiry Contact Info', name: 'inquiry_contact_information', type: 'text' },
              { label: 'Announcements', name: 'announcements', type: 'textarea' },
              { label: 'Notes for Organizers', name: 'notes_for_organizers', type: 'textarea' },
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
                      <label>Venue Name <sup>*</sup></label>
                      <input
                        type="text"
                        placeholder="Venue Name"
                        className="field-style5"
                        name="venue_name"
                        value={venue.venue_name}
                        onChange={(e) => handleVenueChange(index, e)}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-4">
                    <div className="form-field5">
                      <label>Venue Address <sup>*</sup></label>
                      <input
                        type="text"
                        placeholder="Venue Address"
                        className="field-style5"
                        name="venue_address"
                        value={venue.venue_address}
                        onChange={(e) => handleVenueChange(index, e)}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-4">
                    <div className="form-field5">
                      <label>Number of Courts <sup>*</sup></label>
                      <input
                        type="number"
                        placeholder="Add Courts Number"
                        className="field-style5"
                        name="no_of_courts"
                        value={venue.no_of_courts}
                        onChange={(e) => handleVenueChange(index, e)}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-4">
                    <div className="form-field5">
                      <label>Venue Date <sup>*</sup></label>
                      <input
                        type="date"
                        placeholder="Add Venue Date"
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
                    Add More Venues
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="row pt-2">
            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
              <button className="bg-green1 text-white text-15 w-100 rounded-2 p-3" type="submit">
                Next
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Step1;
