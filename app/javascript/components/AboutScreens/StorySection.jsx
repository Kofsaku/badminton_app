import React from 'react';
import { useTranslation } from 'react-i18next';

const StorySection = () => {
  const { t } = useTranslation();

  return (
    <section className="pb-5 pt-4 mb-4">
      <div className="container">
        <div className="d-block w-100">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-5">
              <div className="d-block w-100 text-center">
                <img 
                  src="images/our-story.png" 
                  className="story-image" 
                  alt={t('about.story.title')} 
                />
                <h4 className="story-tag">
                  <span className="bg-green1 rounded-3 px-4 py-3 text-25 mob-text-20 text-white">
                    {t('about.story.since')}
                  </span>
                </h4>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-5">
              <div className="d-block w-100">
                <h3 className="text-green3 mt-0 fw-bold text-35 mb-3">
                  {t('about.story.title')}
                </h3>
                {t('about.story.paragraphs', { returnObjects: true }).map((paragraph, index) => (
                  <p key={index} className="text-grey1 mb-3 mt-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
