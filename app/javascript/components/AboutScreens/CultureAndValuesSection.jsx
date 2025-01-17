import React from 'react';
import { useTranslation } from 'react-i18next';

const CultureAndValuesSection = () => {
  const { t } = useTranslation();

  const values = [
    { 
      img: "images/genuine-icon.png", 
      key: "genuine"
    },
    { 
      img: "images/global-icon.png", 
      key: "global"
    },
    { 
      img: "images/thanks-icon.png", 
      key: "thanks"
    },
    { 
      img: "images/honesty-icon.png", 
      key: "honesty"
    }
  ];

  return (
    <section className="bg-silver4 py-5">
      <div className="d-block w-100 py-4">
        <div className="container">
          <div className="d-block w-100 mb-5">
            <h3 className="text-green3 m-0 p-0 text-center fw-bold text-35">
              {t('about.cultureAndValues.title')}
            </h3>
          </div>
          <div className="d-block w-100">
            <div className="row">
              {values.map((value, index) => (
                <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-4" key={index}>
                  <div className="d-block w-100 border border-color-silver rounded-5 bg-silver4 px-2 py-3">
                    <div className="d-flex flex-lg-row flex-md-row flex-sm-row flex-column w-100 align-items-center justify-content-start">
                      <div className="d-inline-block min-width-clear">
                        <img 
                          src={value.img} 
                          className="culture-icon" 
                          alt={t(`about.cultureAndValues.values.${value.key}.title`)} 
                        />
                      </div>
                      <div className="d-inline-block w-100 ps-4">
                        <h3 className="text-green4 mt-0 mb-2 text-22 fw-bold">
                          {t(`about.cultureAndValues.values.${value.key}.title`)}
                        </h3>
                        <p className="text-grey1 text-14 m-0">
                          {t(`about.cultureAndValues.values.${value.key}.description`)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CultureAndValuesSection;
