import React from 'react';
import { useTranslation } from 'react-i18next';

const PartnersSection = () => {
  const { t } = useTranslation();

  const partnerLogos = [
    "partner-logo1.png",
    "partner-logo2.png",
    "partner-logo3.png",
    "partner-logo4.png"
  ];

  return (
    <section className="bg-green1 py-5">
      <div className="container">
        <div className="d-block w-100 mb-5 text-center">
          <h3 className="text-white text-25 m-0 fw-bold">
            {t('about.partners.title')}
          </h3>
        </div>
        <div className="d-flex flex-wrap w-100 align-items-center justify-content-center">
          {partnerLogos.map((logo, index) => (
            <img
              src={`images/${logo}`}
              className="mx-4 mb-lg-0 mb-md-0 mb-sm-3 mb-3"
              alt={`${t('about.partners.altText')} ${index + 1}`}
              key={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
