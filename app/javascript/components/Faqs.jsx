import React from 'react';
import { useTranslation } from 'react-i18next';
import Header from './Shared/Header';
import CtaSection from './Shared/CtaSection';
import Footer from './Shared/Footer';

const Faqs = () => {
  const { t } = useTranslation();
  const faqs = t('faqs.questions', { returnObjects: true });

  return (
    <div>
      <Header />
      <section className="py-5 my-2">
        <div className="container">
          <div className="d-block w-100 text-center">
            <h3 className="text-green3 mt-0 mb-2 text-32 fw-bold">
              {t('faqs.title')}
            </h3>
          </div>
        </div>
      </section>

      <section className="pb-5">
        <div className="container">
          <div className="accordion" id="faqs-accordion">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="accordion-item border rounded-3 border-color-silver overflow-hidden mb-3"
              >
                <h2 
                  className="accordion-header bg-transparent outline-none shadow-none" 
                  id={`heading${index}`}
                >
                  <button
                    className={`accordion-button outline-none text-16 fw-bold shadow-none text-green3 ${index !== 0 ? 'collapsed' : ''}`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse${index}`}
                    aria-expanded={index === 0 ? 'true' : 'false'}
                    aria-controls={`collapse${index}`}
                  >
                    {faq.question}
                  </button>
                </h2>
                <div
                  id={`collapse${index}`}
                  className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
                  aria-labelledby={`heading${index}`}
                  data-bs-parent="#faqs-accordion"
                >
                  <div className="accordion-body">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
      <Footer />
    </div>
  );
};

export default Faqs;
