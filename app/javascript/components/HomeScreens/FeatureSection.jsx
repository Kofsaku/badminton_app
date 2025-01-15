import React from 'react';
import { useTranslation } from 'react-i18next';

const FeatureSection = () => {
  const { t } = useTranslation();

  const features = [
    { icon: 'feature-icon1.png', key: 'affordablePrice' },
    { icon: 'feature-icon2.png', key: 'apps' },
    { icon: 'feature-icon3.png', key: 'playerFriendly' },
    { icon: 'feature-icon4.png', key: 'maintenance' },
    { icon: 'feature-icon5.png', key: 'easyToUse' },
    { icon: 'feature-icon6.png', key: 'allFeatures' },
  ];

  return (
    <section className="py-5 bg-sec1">
      <div className="container">
        <div className="d-block w-100 pb-5">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12 order-lg-1 order-md-1 order-sm-2 order-2">
              <div className="d-block w-100">
                <h3 className="text-green3 fw-bold mt-0 mb-4 text-35 mob-text-30">
                  {t('home.features.title')}
                </h3>
                <div className="row">
                  {features.map((feature, index) => (
                    <div key={index} className="col-lg-6 col-md-6 col-sm-6 col-12 mb-3">
                      <div className="d-flex align-items-center justify-content-start">
                        <div className="d-inline-block">
                          <img 
                            src={`images/${feature.icon}`} 
                            alt={t(`home.features.items.${feature.key}`)} 
                          />
                        </div>
                        <div className="d-inline-block ps-3">
                          <span className="text-green3 fw-bold text-17 w-100 d-block">
                            {t(`home.features.items.${feature.key}`)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <a 
                  href="" 
                  className="bg-green1 bg-hover-black mt-3 text-white rounded-pill px-4 py-2 lh-lg border-0 text-16"
                >
                  {t('home.features.joinButton')}
                  <i className="fa fa-arrow-right ms-2 text-16"></i>
                </a>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12 order-lg-2 order-md-2 order-sm-1 order-1">
              <div className="d-block w-100">
                <img 
                  src="images/player-mockup.png" 
                  alt="Player Mockup" 
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
