import React from 'react';
import { useTranslation } from 'react-i18next';
import Header from './Shared/Header';
import CtaSection from './Shared/CtaSection';
import Footer from './Shared/Footer';

const TermsOfService: React.FC = () => {
  const { t } = useTranslation();
  const paragraphs = t('termsOfService.paragraphs', { returnObjects: true }) as string[];

  return (
    <div>
      <Header />
      <section className="py-5 my-2">
        <div className="container">
          <div className="d-block w-100 text-center">
            <h3 className="text-green3 mt-0 mb-2 text-32 fw-bold">
              {t('termsOfService.title')}
            </h3>
          </div>
        </div>
      </section>

      <section className="pb-5">
        <div className="container">
          <div className="d-block w-100">
            <div className="d-block">
              {paragraphs.map((paragraph, index) => (
                <p 
                  key={index} 
                  className="text-16 mt-0 mb-3 text-green3 lh-normal"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaSection />
      <Footer />
    </div>
  );
};

export default TermsOfService;
