import React from 'react';
import { useTranslation } from 'react-i18next';

const UseSection = () => {
  const { t } = useTranslation();

  const renderPoint = (number) => (
    <div className="d-flex w-100 align-items-start justify-content-start mb-4">
      <div className="d-inline-block">
        <span className="counter-number1">{number.padStart(2, '0')}</span>
      </div>
      <div className="d-inline-block ps-3">
        <h4 className="text-green4 mt-0 mb-1 fw-bold text-18">
          {t(`home.use.points.${number}.title`)}
        </h4>
        <p className="text-grey1 m-0 text-14">
          {t(`home.use.points.${number}.description`)}
        </p>
      </div>
    </div>
  );

  return (
    <section className="py-5 my-4">
      <div className="container">
        <div className="d-block w-100 text-center mb-5 pb-3">
          <h3 className="text-green4 fw-bold text-35 mob-text-30 m-0">
            {t('home.use.title')}
          </h3>
        </div>
        <div className="d-block w-100">
          <div className="row align-items-center mb-4">
            <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-5">
              <div className="d-block w-100">
                {renderPoint('1')}
                {renderPoint('2')}
                {renderPoint('3')}
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-5">
              <div className="d-block w-100 text-center">
                <img src="images/use-1.png" alt={t('home.use.title')} className="custom-image3" />
              </div>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-5">
              <div className="d-block w-100 text-center">
                <img src="images/use-1.png" alt={t('home.use.title')} className="custom-image3" />
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-5">
              <div className="d-block w-100">
                {renderPoint('4')}
                {renderPoint('5')}
                {renderPoint('6')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseSection;
