import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ContactForm = () => {
  const { t } = useTranslation();
  
  const [formData, setFormData] = useState({
    fullName: '',
    emailAddress: '',
    telephoneNumber: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Add your form submission logic here
  };

  return (
    <div>
      <section className="py-5 my-4">
        <div className="container">
          <div className="d-block w-100 mb-5 text-center">
            <h3 className="text-32 text-green3 mob-text-26 fw-bold m-0">
              {t('contact.form.title')}
            </h3>
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
                          placeholder={t('contact.form.fields.fullName.placeholder')}
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          required
                          aria-label={t('contact.form.fields.fullName.label')}
                        />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-4 col-12 mb-4">
                      <div className="form-field3">
                        <input
                          type="email"
                          className="field-style3"
                          placeholder={t('contact.form.fields.email.placeholder')}
                          name="emailAddress"
                          value={formData.emailAddress}
                          onChange={handleInputChange}
                          required
                          aria-label={t('contact.form.fields.email.label')}
                        />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-4 col-12 mb-4">
                      <div className="form-field3">
                        <input
                          type="tel"
                          className="field-style3"
                          placeholder={t('contact.form.fields.telephone.placeholder')}
                          name="telephoneNumber"
                          value={formData.telephoneNumber}
                          onChange={handleInputChange}
                          required
                          aria-label={t('contact.form.fields.telephone.label')}
                        />
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-12 mb-4">
                      <div className="form-field3">
                        <textarea
                          className="field-style3"
                          placeholder={t('contact.form.fields.message.placeholder')}
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows="5"
                          required
                          aria-label={t('contact.form.fields.message.label')}
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-12 mb-4">
                      <div className="d-block w-100 text-center">
                        <button
                          type="submit"
                          className="px-4 border-0 bg-hover-black py-2 text-15 lh-lg text-white rounded-pill bg-green1"
                        >
                          {t('contact.form.submit')}
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
