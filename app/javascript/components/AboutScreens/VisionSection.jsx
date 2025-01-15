import React from 'react';
import { useTranslation } from 'react-i18next';

const VisionSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-5 mt-4">
      <div className="container">
        <div className="d-block w-100">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-5 order-lg-1 order-md-1 order-sm-1 order-2">
              <div className="d-block w-100">
                <span className="d-inline-block px-3 py-2 text-green3 border fw-bold rounded-pill mb-3">
                  {t('about.vision.label')}
                </span>
                <h3 className="text-green3 mt-0 fw-bold text-35 mob-text-30 mb-3">
                  {t('about.vision.title')}
                </h3>
                {t('about.vision.paragraphs', { returnObjects: true }).map((paragraph, index) => (
                  <p key={index} className="text-grey1 mb-3 mt-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-5 order-lg-2 order-md-2 order-sm-2 order-1">
              <div className="d-block w-100 text-center">
                <img 
                  src="images/video-thumbnail1.png" 
                  className="vision-image" 
                  alt={t('about.vision.label')} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
