import React, { useState } from 'react';

const ContactForm = () => {
  // State variables to hold form data
  const [formData, setFormData] = useState({
    fullName: '',
    emailAddress: '',
    telephoneNumber: '',
    message: ''
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform any form submission logic here (e.g., send data to server)
    console.log(formData); // Example: Log form data
    // You can add further logic to handle form submission (e.g., API call)
  };

  return (
    <div>
      <section className="py-5 my-4">
        <div className="container">
          <div className="d-block w-100 mb-5 text-center">
            <h3 className="text-32 text-green3 mob-text-26 fw-bold m-0">Please fill out the form below</h3>
          </div>
          <div className="d-block w-100">
            <div className="row justify-content-center">
              <div className="col-lg-8 col-md-10 col-sm-12 col-12">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-4 col-12 mb-4">
                      <div className="form-field3">
                        <input
                          type="text"
                          className="field-style3"
                          placeholder="Full Name*"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-4 col-12 mb-4">
                      <div className="form-field3">
                        <input
                          type="email"
                          className="field-style3"
                          placeholder="Email Address*"
                          name="emailAddress"
                          value={formData.emailAddress}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-4 col-12 mb-4">
                      <div className="form-field3">
                        <input
                          type="tel"
                          className="field-style3"
                          placeholder="Telephone Number*"
                          name="telephoneNumber"
                          value={formData.telephoneNumber}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-12 mb-4">
                      <div className="form-field3">
                        <textarea
                          className="field-style3"
                          placeholder="How can we help?"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows="5"
                          required
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-12 mb-4">
                      <div className="d-block w-100 text-center">
                        <button
                          type="submit"
                          className="px-4 border-0 bg-hover-black py-2 text-15 lh-lg text-white rounded-pill bg-green1"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactForm;
