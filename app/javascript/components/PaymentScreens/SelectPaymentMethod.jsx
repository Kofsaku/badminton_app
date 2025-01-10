import React, { useState } from 'react';
import PaymentConfirmation from './PaymentConfirmation';

const SelectPaymentMethod = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleButtonClick = () => {
    if (!selectedPaymentMethod) {
      alert('Please select a payment method.');
    } else {
      setShowConfirmation(true);
    }
  };

  if (showConfirmation) {
    return <PaymentConfirmation paymentMethod={selectedPaymentMethod} />;
  }

  return (
    <section className="all-wrapper-dashboard">
      <div className="new-sidebar-left position-relative">
        <div className="sidebar-holder ">
          <div className="new-sidebar-logo">
            <div className="d-inline-block">
              <a href="">
                {" "}
                <img src="images/placeholder-logo.png" />{" "}
              </a>
            </div>
            <div className="new-sidebar-hamburger d-lg-none d-md-none d-sm-inline-block d-inline-block">
              <button
                className="bg-transparent border-0 shadow-none text-white text-25"
                id="new-menu-toggle"
              >
                <i className="fa fa-bars"> </i>
              </button>
            </div>
          </div>
          <div className="new-sidebar-menu">
            <button className="d-flex w-100 align-items-center justify-content-start bg-transparent border-0 py-3">
              <img src="images/menu-entry-icon.png" />
              <span className="d-inline-block ps-3 text-white font-weight-500">
                {" "}
                Player Entry
              </span>
            </button>
            <button className="d-flex w-100 align-items-center justify-content-start bg-transparent border-0 py-3">
              <img src="images/menu-table-icon.png" />
              <span className="d-inline-block ps-3 text-white font-weight-500">
                {" "}
                For Table{" "}
              </span>
            </button>
            <button className="d-flex w-100 align-items-center justify-content-start bg-transparent border-0 py-3">
              <img src="images/menu-results-icon.png" />
              <span className="d-inline-block ps-3 text-white font-weight-500">
                {" "}
                Match Results
              </span>
            </button>
            <button className="d-flex w-100 align-items-center justify-content-start bg-transparent border-0 py-3">
              <img src="images/menu-notification-icon.png" />
              <span className="d-inline-block ps-3 text-white font-weight-500">
                {" "}
                Notification{" "}
              </span>
            </button>
            <button className="new-logout-btn">Logout</button>
          </div>
        </div>
      </div>
      <div className="new-content-right">
        {/* Top Bar Starts Here */}
        <div className="d-block w-100 mb-lg-3 mb-md-3 mb-sm-3 mb-4 pb-2">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-inline-block">
              <h4 className="text-black font-weight-600 text-22 mob-text-18 m-0">
                Athlete Entry Criteria
              </h4>
            </div>
            <div className="d-inline-block">
              <div className="d-flex align-items-center justify-content-end">
                <div className="d-inline-block">
                  <div className="dropdown position-relative d-inline-block">
                    <button
                      className="btn text-muted position-relative bg-white rounded-circle p-lg-2 p-md-2 p-sm-2 p-1 shadow-sm border-0 outline-none   shadow-none custom-dropdown-btn dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton2"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img src="images/bell-green-icon.png" className="bell-icon" />
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton2"
                    >
                      <li>
                        <a className="dropdown-item text-14" href="#">
                          Action
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item text-14" href="#">
                          Another action
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item text-14" href="#">
                          Something else here
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="d-inline-block bg-white px-lg-3 px-md-3 px-sm-3 px-2 py-lg-2 py-md-2 py-sm-2 py-1 rounded-pill ms-lg-3 ms-md-3 ms-sm-3 ms-2">
                  <div className="d-flex align-items-center justify-content-start">
                    <img
                      src="images/new-avatar1.png"
                      className="new-avatar-1 me-2"
                    />
                    <span className="text-15 font-weight-600 d-lg-inline-block d-md-inline-block d-sm-inline-block d-none me-2">
                      {" "}
                      Player 1{" "}
                    </span>
                    <div className="dropdown position-relative d-inline-block">
                      <button
                        className="btn text-muted position-relative p-1 bg-transparent border-0 outline-none p-0 shadow-none custom-dropdown-btn dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="fa fa-ellipsis-vertical text-black text-16">
                          {" "}
                        </i>
                      </button>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton1"
                      >
                        <li>
                          <a className="dropdown-item text-14" href="#">
                            Action
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item text-14" href="#">
                            Another action
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item text-14" href="#">
                            Something else here
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Top Bar Ends Here */}
        {/* Page Content Starts Here */}
        <div className="d-lg-block d-md-block d-sm-block d-none w-100 bg-white rounded-2 border border-color-silver px-3 py-3 mb-5">
          <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-4 col-12">
              <div className="d-flex flex-column align-items-center justify-content-center">
                <div className="d-inline-block text-center w-100 position-relative">
                  <span className="custom-line-3" />
                  <span>
                    <i className="fa fa-check text-success2 z-index-9 position-relative text-18 bg-white p-1 border border-success2 rounded-circle">
                      {" "}
                    </i>
                  </span>
                </div>
                <h5 className="text-success3 font-weight-600 text-14 mb-0 mt-3">
                  {" "}
                  Elective Match Class
                </h5>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-4 col-12">
              <div className="d-flex flex-column align-items-center justify-content-center">
                <div className="d-inline-block text-center w-100 position-relative">
                  <span className="custom-line-4" />
                  <span>
                    <i className="fa fa-circle text-success2 shadow-lg z-index-9 position-relative text-12 mt-1 bg-white p-1 border border-success2 rounded-circle">
                      {" "}
                    </i>
                  </span>
                </div>
                <h5 className="text-black font-weight-600 text-14 mb-0 mt-3">
                  {" "}
                  Select Payment Method
                </h5>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-4 col-12">
              <div className="d-flex flex-column align-items-center justify-content-center">
                <div className="d-inline-block text-center w-100 position-relative">
                  <span>
                    <i className="fa fa-check text-muted z-index-9 position-relative text-18 bg-white p-1 border border-color-silver rounded-circle">
                      {" "}
                    </i>
                  </span>
                </div>
                <h5 className="text-muted font-weight-600 text-14 mb-0 mt-3">
                  {" "}
                  Immigration Confirmation{" "}
                </h5>
              </div>
            </div>
          </div>
        </div>
        <div className="d-lg-none d-md-none d-sm-none d-block w-100 mb-4">
          <div className="border border-success3 rounded-3 px-2 py-2 d-flex align-items-center justify-content-start">
            <div className="d-inline-block mt-2">
              <i className="fa fa-check bg-success3 text-white rounded-circle p-1 text-12">
                {" "}
              </i>
            </div>
            <div className="d-flex align-items-center justify-content-center mt-1 w-100">
              <i className="fa fa-circle text-success3 border border-success3 p-1 text-10 rounded-circle">
                {" "}
              </i>
              <span className="font-weight-600 text-15 text-success3 ps-2">
                {" "}
                Select Payment Method{" "}
              </span>
            </div>
          </div>
        </div>
        <div className="d-block w-100">
          <div className="d-block w-100 mb-4">
            <h4 className="text-black font-weight-600 text-16 m-0">
              Select your preferred payment method
            </h4>
          </div>
          <div className="d-block w-100">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-3">
                <div className="d-block w-100">
                  <div className="checkbox-style3 bg-white w-100 px-3 py-3 border rounded-3 d-flex align-items-center justify-content-start">
                    <input
                      className="m-0"
                      type="radio"
                      id="payment-stripe"
                      name="payment"
                      onChange={() => setSelectedPaymentMethod('Stripe Payment')}
                    />
                    <label
                      className="text-black text-15 font-weight-500 ms-2 w-100"
                      htmlFor="payment-stripe"
                    >
                      Stripe Payment
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-3">
                <div className="d-block w-100">
                  <div className="checkbox-style3 bg-white w-100 px-3 py-3 border rounded-3 d-flex align-items-center justify-content-start">
                    <input
                      className="m-0"
                      type="radio"
                      id="payment-visacard"
                      name="payment"
                      onChange={() => setSelectedPaymentMethod('Visa Card Payment')}
                    />
                    <label
                      className="text-black text-15 font-weight-500 ms-2 w-100"
                      htmlFor="payment-visacard"
                    >
                      Visa Card Payment
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-3">
                <div className="d-block w-100">
                  <div className="checkbox-style3 bg-white w-100 px-3 py-3 border rounded-3 d-flex align-items-center justify-content-start">
                    <input
                      className="m-0"
                      type="radio"
                      id="payment-mastercard"
                      name="payment"
                      onChange={() => setSelectedPaymentMethod('Mastercard Payment')}
                    />
                    <label
                      className="text-black text-15 font-weight-500 ms-2 w-100"
                      htmlFor="payment-mastercard"
                    >
                      Mastercard Payment
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-3">
                <div className="d-block w-100">
                  <div className="checkbox-style3 bg-white w-100 px-3 py-3 border rounded-3 d-flex align-items-center justify-content-start">
                    <input
                      className="m-0"
                      type="radio"
                      id="payment-amex"
                      name="payment"
                      onChange={() => setSelectedPaymentMethod('AMEX Payment')}
                    />
                    <label
                      className="text-black text-15 font-weight-500 ms-2 w-100"
                      htmlFor="payment-amex"
                    >
                      AMEX Payment
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-12 mt-5 pt-4">
                <button
                  className="bg-green2 w-100 py-2 text-white border-0 rounded-3 text-15 font-weight-600"
                  onClick={handleButtonClick}
                >
                  次
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SelectPaymentMethod;