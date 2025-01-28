import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const CtaSection = () => {
  const { t } = useTranslation();

  const storeLinks = [
    { 
      image: 'apple-store.png', 
      alt: t('ctaSection.stores.apple.alt'),
      className: '' 
    },
    { 
      image: 'google-store.png', 
      alt: t('ctaSection.stores.google.alt'),
      className: 'ms-3' 
    }
  ];

  return (
    <section className="bg-green1 py-4">
      <div className="container">
        <div className="row align-items-center my-2">
          <div className="col-lg-6 col-md-6 col-sm-12 col-12 mb-lg-0 mb-md-0 mb-4">
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
