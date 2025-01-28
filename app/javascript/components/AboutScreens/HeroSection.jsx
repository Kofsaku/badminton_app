import React from 'react';
import { useTranslation } from 'react-i18next';

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-5 bg-green2">
      <div className="container">
        <div className="d-block w-100">
          <div className="row align-items-center">
            <div className="col-lg-8 col-md-8 col-sm-12 col-12">
              <div className="d-block w-100">
                <h3 className="text-green4 text-42 mob-text-30 fw-bold mt-0 mb-2">
                  {t('about.hero.title')}
                </h3>
                <p className="text-green4 text-15 mt-0 mb-0 small-width2">
                  {t('about.hero.description')}
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 col-12">
              <div className="d-block w-100 text-center">
                <img 
                  className="about-symbol" 
                  src="images/logoblack.png" 
                  alt={t('about.hero.title')} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
