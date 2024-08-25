import React, { useState } from 'react';

const Step1 = ({ nextStep, formData, handleFormChange }) => {
  const [venues, setVenues] = useState([{ venue_name: '', venue_address: '', no_of_courts: null, venue_date: null }]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    handleFormChange(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    nextStep();
  };

  const handleVenueChange = (index, e) => {
    const { venue_name, value, no_of_courts, venue_date } = e.target;
    const newVenues = [...venues];
    newVenues[index][name] = value;
    setVenues(newVenues);

    // Update the formData with the venues array
    handleFormChange('tournament_venues_attributes', newVenues);
  };

  const addVenue = () => {
    const newVenues = [...venues, { venue_name: '', venue_address: '', no_of_courts: null, venue_date: null }];
    setVenues(newVenues);
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
            <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-4">
              <div className="form-field5">
                <label>Name <sup>*</sup></label>
                <input
                  type="text"
                  placeholder="Add Name"
                  className="field-style5"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-4">
              <div className="form-field5">
                <label>Event Date Time <sup>*</sup></label>
                <input
                  type="datetime-local"
                  placeholder="Add Event Date Time"
                  className="field-style5"
                  name="event_date"
                  value={formData.event_date}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-4">
              <div className="form-field5">
                <label>Registration Start Time <sup>*</sup></label>
                <input
                  type="time"
                  placeholder="Add Registration Start Time"
                  className="field-style5"
                  name="registeration_time"
                  value={formData.registeration_time}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-4">
              <div className="form-field5">
                <label>Organization Name <sup>*</sup></label>
                <input
                  type="text"
                  placeholder="Add Organization Name"
                  className="field-style5"
                  name="organization_name"
                  value={formData.organization_name}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-4">
              <div className="form-field5">
                <label>Payment Method <sup>*</sup></label>
                <input
                  type="text"
                  placeholder="Add Payment Method"
                  className="field-style5"
                  name="payment_method"
                  value={formData.payment_method}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-4">
              <div className="form-field5">
                <label>Match Start Time <sup>*</sup></label>
                <input
                  type="time"
                  placeholder="Add Match Start Time"
                  className="field-style5"
                  name="match_start_time"
                  value={formData.match_start_time}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-4">
              <div className="form-field5">
                <label>Match Overview <sup>*</sup></label>
                <input
                  type="text"
                  placeholder="Add Match Overview"
                  className="field-style5"
                  name="match_overview"
                  value={formData.match_overview}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-4">
              <div className="form-field5">
                <label>Organizer <sup>*</sup></label>
                <input
                  type="text"
                  placeholder="Add Organizer"
                  className="field-style5"
                  name="organizer"
                  value={formData.organizer}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-4">
              <div className="form-field5">
                <label>Administrator <sup>*</sup></label>
                <input
                  type="text"
                  placeholder="Add Administrator"
                  className="field-style5"
                  name="administrator"
                  value={formData.administrator}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-4">
              <div className="form-field5">
                <label>Sponsor <sup>*</sup></label>
                <input
                  type="text"
                  placeholder="Add Sponsor"
                  className="field-style5"
                  name="sponsor"
                  value={formData.sponsor}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-4">
              <div className="form-field5">
                <label>Event Category <sup>*</sup></label>
                <input
                  type="text"
                  placeholder="Add Event Category"
                  className="field-style5"
                  name="event_category"
                  value={formData.event_category}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-4">
              <div className="form-field5">
                <label>Days Schedule <sup>*</sup></label>
                <input
                  type="text"
                  placeholder="Add Days Schedule"
                  className="field-style5"
                  name="days_schedule"
                  value={formData.days_schedule}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-4">
              <div className="form-field5">
                <label>Reception Period <sup>*</sup></label>
                <input
                  type="text"
                  placeholder="Add Reception Period"
                  className="field-style5"
                  name="reception_period"
                  value={formData.reception_period}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-4">
              <div className="form-field5">
                <label>Competition Format <sup>*</sup></label>
                <input
                  type="text"
                  placeholder="Add Competition Format"
                  className="field-style5"
                  name="competition_format"
                  value={formData.competition_format}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-4">
              <div className="form-field5">
                <label>Max Participants <sup>*</sup></label>
                <input
                  type="number"
                  placeholder="Add Max Participants"
                  className="field-style5"
                  name="max_participants"
                  value={formData.max_participants}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-4">
              <div className="form-field5">
                <label>Competition Rules <sup>*</sup></label>
                <input
                  type="text"
                  placeholder="Add Competition Rules"
                  className="field-style5"
                  name="competition_rules"
                  value={formData.competition_rules}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-4">
              <div className="form-field5">
                <label>Ball Type <sup>*</sup></label>
                <input
                  type="text"
                  placeholder="Add Ball Type"
                  className="field-style5"
                  name="ball_type"
                  value={formData.ball_type}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-4">
              <div className="form-field5">
                <label>Participation Eligibility <sup>*</sup></label>
                <input
                  type="text"
                  placeholder="Add Participation Eligibility"
                  className="field-style5"
                  name="participation_eligibility"
                  value={formData.participation_eligibility}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-4">
              <div className="form-field5">
                <label>Participation Payment Method <sup>*</sup></label>
                <input
                  type="text"
                  placeholder="Add Participation Payment Method"
                  className="field-style5"
                  name="participation_payment_method"
                  value={formData.participation_payment_method}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-4">
              <div className="form-field5">
                <label>Application Method <sup>*</sup></label>
                <input
                  type="text"
                  placeholder="Add Application Method"
                  className="field-style5"
                  name="application_method"
                  value={formData.application_method}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-4">
              <div className="form-field5">
                <label>Application Deadline <sup>*</sup></label>
                <input
                  type="date"
                  placeholder="Add Application Deadline"
                  className="field-style5"
                  name="application_deadline"
                  value={formData.application_deadline}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-4">
              <div className="form-field5">
                <label>Pairing Selection Method <sup>*</sup></label>
                <input
                  type="text"
                  placeholder="Add Pairing Selection Method"
                  className="field-style5"
                  name="pairing_selection_method"
                  value={formData.pairing_selection_method}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-4">
              <div className="form-field5">
                <label>Award Details <sup>*</sup></label>
                <input
                  type="text"
                  placeholder="Add Award Details"
                  className="field-style5"
                  name="award_details"
                  value={formData.award_details}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-4">
              <div className="form-field5">
                <label>Member Changes <sup>*</sup></label>
                <input
                  type="text"
                  placeholder="Add Member Changes"
                  className="field-style5"
                  name="member_changes"
                  value={formData.member_changes}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-4">
              <div className="form-field5">
                <label>Multiple Events Entry <sup>*</sup></label>
                <input
                  type="text"
                  placeholder="Add Multiple Events Entry"
                  className="field-style5"
                  name="entry_in_multiple_events"
                  value={formData.entry_in_multiple_events}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-4">
              <div className="form-field5">
                <label>Cancellation After Application <sup>*</sup></label>
                <input
                  type="text"
                  placeholder="Add Cancellation After Application"
                  className="field-style5"
                  name="cancellation_after_application"
                  value={formData.cancellation_after_application}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-4">
              <div className="form-field5">
                <label>Participation Fee <sup>*</sup></label>
                <input
                  type="number"
                  placeholder="Add Participation Fee"
                  className="field-style5"
                  name="participation_fee"
                  value={formData.participation_fee}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-4">
              <div className="form-field5">
                <label>Inquiry Contact Info <sup>*</sup></label>
                <input
                  type="text"
                  placeholder="Add Inquiry Contact Info"
                  className="field-style5"
                  name="inquiry_contact_information"
                  value={formData.inquiry_contact_information}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-4">
              <div className="form-field5">
                <label>Organizers URL <sup>*</sup></label>
                <input
                  type="url"
                  placeholder="Add Organizers URL"
                  className="field-style5"
                  name="organizers_url"
                  value={formData.organizers_url}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12 col-12 mb-4">
              <div className="form-field5">
                <label>Announcements <sup>*</sup></label>
                <textarea
                  className="field-style5"
                  name="announcements"
                  value={formData.announcements}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12 col-12 mb-4">
              <div className="form-field5">
                <label>Notes for Organizers</label>
                <textarea
                  className="field-style5"
                  name="notes_for_organizers"
                  value={formData.notes_for_organizers}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
          </div>

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
