import React from 'react';
import Header from './Shared/Header';
import CtaSection from './Shared/CtaSection';
import Footer from './Shared/Footer';

const Faqs = () => {
  return (
    <div>
      <Header />
      <section className="py-5 my-2">
        <div className="container">
          <div className="d-block w-100 text-center">
            <h3 className="text-green3 mt-0 mb-2 text-32 fw-bold">FAQs</h3>
          </div>
        </div>
      </section>
      {/* Page Title Ends Here */}
      {/* Page Content Starts Here */}
      <section className="pb-5">
        <div className="container">
          <div className="accordion" id="faqs-accordion">
            {/* FAQ Item 1 */}
            <div className="accordion-item border rounded-3 border-color-silver overflow-hidden mb-3">
              <h2 className="accordion-header bg-transparent outline-none shadow-none" id="headingOne">
                <button
                  className="accordion-button outline-none text-16 fw-bold shadow-none text-green3"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  Question #1
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#faqs-accordion"
              >
                <div className="accordion-body">
                  Lorem ipsum dolor sit amet consectetur. Lacus lectus elementum sollicitudin elementum tellus sed egestas. Nec amet felis sed facilisi sed ut eros feugiat pretium. Volutpat bibendum odio hac tincidunt sollicitudin aliquam. Sit laoreet eu id turpis non non nisi quam. In vestibulum a nec rhoncus eget. Ridiculus cras viverra nec mi justo euismod morbi. Mi praesent laoreet auctor purus et auctor senectus in. Lacinia gravida nascetur bibendum mattis at nunc. Nibh ac in sed enim aliquam viverra tincidunt.
                </div>
              </div>
            </div>

            {/* FAQ Item 2 */}
            <div className="accordion-item border rounded-3 border-color-silver overflow-hidden mb-3">
              <h2 className="accordion-header" id="headingTwo">
                <button
                  className="accordion-button outline-none text-16 fw-bold shadow-none text-green3 collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  Question #2
                </button>
              </h2>
              <div
                id="collapseTwo"
                className="accordion-collapse collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#faqs-accordion"
              >
                <div className="accordion-body">
                  <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                </div>
              </div>
            </div>

            {/* FAQ Item 3 */}
            <div className="accordion-item border rounded-3 border-color-silver overflow-hidden mb-3">
              <h2 className="accordion-header" id="headingThree">
                <button
                  className="accordion-button outline-none text-16 fw-bold shadow-none text-green3 collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  Question #3
                </button>
              </h2>
              <div
                id="collapseThree"
                className="accordion-collapse collapse"
                aria-labelledby="headingThree"
                data-bs-parent="#faqs-accordion"
              >
                <div className="accordion-body">
                  <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                </div>
              </div>
            </div>

            {/* FAQ Item 4 */}
            <div className="accordion-item border rounded-3 border-color-silver overflow-hidden mb-3">
              <h2 className="accordion-header" id="headingfour">
                <button
                  className="accordion-button outline-none text-16 fw-bold shadow-none text-green3 collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapsefour"
                  aria-expanded="false"
                  aria-controls="collapsefour"
                >
                  Question #4
                </button>
              </h2>
              <div
                id="collapsefour"
                className="accordion-collapse collapse"
                aria-labelledby="headingfour"
                data-bs-parent="#faqs-accordion"
              >
                <div className="accordion-body">
                  <strong>This is the fourth item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                </div>
              </div>
            </div>

            {/* FAQ Item 5 */}
            <div className="accordion-item border rounded-3 border-color-silver overflow-hidden mb-3">
              <h2 className="accordion-header" id="headingfive">
                <button
                  className="accordion-button outline-none text-16 fw-bold shadow-none text-green3 collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapsefive"
                  aria-expanded="false"
                  aria-controls="collapsefive"
                >
                  Question #5
                </button>
              </h2>
              <div
                id="collapsefive"
                className="accordion-collapse collapse"
                aria-labelledby="headingfive"
                data-bs-parent="#faqs-accordion"
              >
                <div className="accordion-body">
                  <strong>This is the fifth item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                </div>
              </div>
            </div>

            {/* FAQ Item 6 */}
            <div className="accordion-item border rounded-3 border-color-silver overflow-hidden mb-3">
              <h2 className="accordion-header" id="headingsix">
                <button
                  className="accordion-button outline-none text-16 fw-bold shadow-none text-green3 collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapsesix"
                  aria-expanded="false"
                  aria-controls="collapsesix"
                >
                  Question #6
                </button>
              </h2>
              <div
                id="collapsesix"
                className="accordion-collapse collapse"
                aria-labelledby="headingsix"
                data-bs-parent="#faqs-accordion"
              >
                <div className="accordion-body">
                  <strong>This is the sixth item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <CtaSection />
      <Footer />
    </div>
  );
};

export default Faqs;
