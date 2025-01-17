import React from 'react';
import { useTranslation } from 'react-i18next';
import Header from './Shared/Header';
import CtaSection from './Shared/CtaSection';
import ContactForm from './ContactScreens/ContactForm';
import Footer from './Shared/Footer';

const Contact = () => {
  const { t } = useTranslation();

  const contactIcons = [
    "talk-icon.png",
    "call-icon.png",
    "email-icon.png",
    "community-icon.png",
    "complaint-icon.png"
  ];

  return (
    <div>
      <Header />

      <section className="py-5 bg-green2">
        <div className="container">
          <div className="d-block w-100 my-5">
            <h3 className="text-green4 text-42 mob-text-30 fw-bold mt-0 mb-2">
              {t('contact.hero.title')}
            </h3>
            <p className="text-green4 text-15 mt-0 mb-0 small-width2">
              {t('contact.hero.description')}
            </p>
          </div>
        </div>
      </section>

      <ContactForm />

      <section className="pb-5 my-3">
        <div className="container">
          <div className="row justify-content-center">
            {t('contact.contactMethods', { returnObjects: true }).map((method, index) => (
              <div key={index} className="col-lg-6 col-md-6 col-sm-6 col-12 mb-4">
                <div className="d-flex w-100 bg-silver4 rounded-5 px-4 py-4 align-items-center justify-content-between">
                  <div className="d-inline-block">
                    <div className="d-flex w-100 align-items-center justify-content-start">
                      <div className="d-inline-block">
                        <img 
                          className="contact-icon" 
                          src={`images/${contactIcons[index]}`} 
                          alt={method.alt} 
                        />
                      </div>
                      <div className="d-inline-block ps-3">
                        <h4 className="text-green3 mt-0 mb-1 text-20 fw-bold">
                          {method.title}
                        </h4>
                        <p className="text-grey1 m-0 text-14">
                          {method.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="d-inline-block">
                    <a href="#" className="p-0 m-0">
                      <i className="fa fa-arrow-right text-28 text-green3"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-5 bg-silver4">
        <div className="container">
          <div className="row my-5 align-items-center">
            <div className="col-lg-7 col-md-7 col-sm-6 col-12 order-lg-1 order-md-1 order-sm-1 order-2">
              <div className="d-block w-100 text-lg-start text-md-start text-sm-start text-center">
                <h3 className="text-green3 text-33 fw-bold mt-0 mb-3 mob-text-28">
                  {t('contact.booking.title')}
                </h3>
                <p className="text-grey1 text-15 mt-0 mb-4">
                  {t('contact.booking.description')}
                </p>
                <button className="px-4 border-0 bg-hover-black py-2 text-15 lh-lg text-white rounded-pill bg-green1">
                  {t('contact.booking.button')}
                </button>
              </div>
            </div>
            <div className="col-lg-5 col-md-5 col-sm-6 col-12 order-lg-2 order-md-2 order-sm-2 order-1">
              <div className="d-block w-100 text-center mb-lg-0 mb-md-0 mb-sm-0 mb-4">
                <img 
                  className="custom-image1" 
                  src="images/calendar-booking.png" 
                  alt={t('contact.booking.alt')} 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaSection />
      <Footer />
    </div>
  );
};

export default Contact;
