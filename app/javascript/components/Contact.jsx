import React from 'react';
import Header from './Shared/Header';
import CtaSection from './Shared/CtaSection';
import ContactForm from './ContactScreens/ContactForm';
import Footer from './Shared/Footer';

const Contact = () => {
  return (
    <div>
      <Header />

      <section className="py-5 bg-green2">
        <div className="container">
          <div className="d-block w-100 my-5">
            <h3 className="text-green4 text-42 mob-text-30 fw-bold mt-0 mb-2">inquiry!</h3>
            <p className="text-green4 text-15 mt-0 mb-0 small-width2">Lorem ipsum dolor sit amet consectetur. Magnis placerat eros id adipiscing non. Egestas pellentesque sed aliquam dolor quis.</p>
          </div>
        </div>
      </section>

      <ContactForm />

      <section className="pb-5 my-3">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-4">
              <div className="d-flex w-100 bg-silver4 rounded-5 px-4 py-4 align-items-center justify-content-between">
                <div className="d-inline-block">
                  <div className="d-flex w-100 align-items-center justify-content-start">
                    <div className="d-inline-block">
                      <img className="contact-icon" src="images/talk-icon.png" alt="Talk with us" />
                    </div>
                    <div className="d-inline-block ps-3">
                      <h4 className="text-green3 mt-0 mb-1 text-20 fw-bold">talk with us</h4>
                      <p className="text-grey1 m-0 text-14">We are here for you in real time.</p>
                    </div>
                  </div>
                </div>
                <div className="d-inline-block">
                  <a href="#" className="p-0 m-0">
                    <i className="fa fa-arrow-right text-28 text-green3"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-4">
              <div className="d-flex w-100 bg-silver4 rounded-5 px-4 py-4 align-items-center justify-content-between">
                <div className="d-inline-block">
                  <div className="d-flex w-100 align-items-center justify-content-start">
                    <div className="d-inline-block">
                      <img className="contact-icon" src="images/call-icon.png" alt="Contact us by phone" />
                    </div>
                    <div className="d-inline-block ps-3">
                      <h4 className="text-green3 mt-0 mb-1 text-20 fw-bold">Contact us by phone</h4>
                      <p className="text-grey1 m-0 text-14">You can contact us 24 hours a day, 365 days a year.</p>
                    </div>
                  </div>
                </div>
                <div className="d-inline-block">
                  <a href="#" className="p-0 m-0">
                    <i className="fa fa-arrow-right text-28 text-green3"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-4">
              <div className="d-flex w-100 bg-silver4 rounded-5 px-4 py-4 align-items-center justify-content-between">
                <div className="d-inline-block">
                  <div className="d-flex w-100 align-items-center justify-content-start">
                    <div className="d-inline-block">
                      <img className="contact-icon" src="images/email-icon.png" alt="Please contact us by email" />
                    </div>
                    <div className="d-inline-block ps-3">
                      <h4 className="text-green3 mt-0 mb-1 text-20 fw-bold">Please contact us by email</h4>
                      <p className="text-grey1 m-0 text-14">You can contact us 24 hours a day, 365 days a year.</p>
                    </div>
                  </div>
                </div>
                <div className="d-inline-block">
                  <a href="#" className="p-0 m-0">
                    <i className="fa fa-arrow-right text-28 text-green3"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-4">
              <div className="d-flex w-100 bg-silver4 rounded-5 px-4 py-4 align-items-center justify-content-between">
                <div className="d-inline-block">
                  <div className="d-flex w-100 align-items-center justify-content-start">
                    <div className="d-inline-block">
                      <img className="contact-icon" src="images/community-icon.png" alt="Join our community" />
                    </div>
                    <div className="d-inline-block ps-3">
                      <h4 className="text-green3 mt-0 mb-1 text-20 fw-bold">join our community</h4>
                      <p className="text-grey1 m-0 text-14">You can contact us 24 hours a day, 365 days a year.</p>
                    </div>
                  </div>
                </div>
                <div className="d-inline-block">
                  <a href="#" className="p-0 m-0">
                    <i className="fa fa-arrow-right text-28 text-green3"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-4">
              <div className="d-flex w-100 bg-silver4 rounded-5 px-4 py-4 align-items-center justify-content-between">
                <div className="d-inline-block">
                  <div className="d-flex w-100 align-items-center justify-content-start">
                    <div className="d-inline-block">
                      <img className="contact-icon" src="images/complaint-icon.png" alt="File a complaint" />
                    </div>
                    <div className="d-inline-block ps-3">
                      <h4 className="text-green3 mt-0 mb-1 text-20 fw-bold">file a complaint</h4>
                      <p className="text-grey1 m-0 text-14">You can contact us 24 hours a day, 365 days a year.</p>
                    </div>
                  </div>
                </div>
                <div className="d-inline-block">
                  <a href="#" className="p-0 m-0">
                    <i className="fa fa-arrow-right text-28 text-green3"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 bg-silver4">
        <div className="container">
          <div className="row my-5 align-items-center">
            <div className="col-lg-7 col-md-7 col-sm-6 col-12 order-lg-1 order-md-1 order-sm-1 order-2">
              <div className="d-block w-100 text-lg-start text-md-start text-sm-start text-center">
                <h3 className="text-green3 text-33 fw-bold mt-0 mb-3 mob-text-28">Book meetings like <br/> Calendly</h3>
                <p className="text-grey1 text-15 mt-0 mb-4">Lorem ipsum dolor sit amet consectetur. Faretra dignissim brandit kiss org. Proin mattis Phasellus Phasellus facilis vulputate dictumst non-consequat. Fringilla of elite bellproinhendrerit adipisingeget.</p>
                <button className="px-4 border-0 bg-hover-black py-2 text-15 lh-lg text-white rounded-pill bg-green1">
                  Book now
                </button>
              </div>
            </div>
            <div className="col-lg-5 col-md-5 col-sm-6 col-12 order-lg-2 order-md-2 order-sm-2 order-1">
              <div className="d-block w-100 text-center mb-lg-0 mb-md-0 mb-sm-0 mb-4">
                <img className="custom-image1" src="images/calendar-booking.png" alt="Book meetings" />
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

export default Contact;
