import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/actions"; // Action to set user in Redux store
import { useNavigate } from "react-router-dom";

const CreateAccount = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/users.json", formData); // Ensure your API endpoint is correct
      dispatch(setUser({ apiKey: response.data.api_key, isLoggedIn: true })); // Store API key in Redux
      console.log("User created:", response.data);

      // Redirect to the tournaments management page
      navigate("/tournament-management");
    } catch (error) {
      console.error(
        "Error creating user:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <section className="all-wrapper">
      <div className="d-flex row w-100 m-0 overflow-hidden">
        <div className="col-lg-6 col-md-6 col-sm-6 col-12 p-0 d-lg-flex d-md-flex d-sm-flex d-none">
          <div className="d-flex h-100 align-items-center justify-content-center bg-gradient-1 w-100">
            <img
              className="logo-image-1"
              src="images/badminton-white-logo.png"
              alt="Logo"
            />
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-6 col-12 p-0">
          <div className="d-flex flex-column align-items-center bg-gradient-3 justify-content-lg-center justify-content-md-center justify-content-sm-center justify-content-start w-100 full-heighted-content custom-scroll1 py-lg-0 py-md-0 py-sm-0 py-2">
            <div className="d-lg-none d-md-none d-sm-none w-100 text-center py-4">
              <img
                className="logo-image-3"
                src="images/logo-square.png"
                alt="Logo"
              />
            </div>
            <div className="d-block w-100">
              <div className="d-block w-100 text-center">
                <h5 className="text-black1 mb-1 text-capitalize text-25 mob-text-22 fw-bold">
                  create an account
                </h5>
                <p className="text-grey1 mt-0 mb-4 text-14">
                  Fill in your details.
                </p>
              </div>
              <div className="d-block w-100 mb-3">
                <form onSubmit={handleSubmit}>
                  <div className="d-block w-100">
                    <div className="row m-0 justify-content-center">
                      <div className="col-lg-6 col-md-8 col-sm-12 col-11">
                        <div className="form-field1 mb-3 px-3 py-2 d-flex w-100 align-items-center justify-content-start rounded-3 bg-silver1">
                          <img
                            src="images/user-icon.png"
                            className="me-2"
                            alt="User Icon"
                          />
                          <input
                            type="text"
                            placeholder="Full Name"
                            className="text-black w-100 outline-none border-0 bg-transparent text-15"
                            name="full_name"
                            value={formData.full_name}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-field1 mb-3 px-3 py-2 d-flex w-100 align-items-center justify-content-start rounded-3 bg-silver1">
                          <img
                            src="images/email-icon.svg"
                            className="me-2"
                            alt="Email Icon"
                          />
                          <input
                            type="email"
                            placeholder="Email Address"
                            className="text-black w-100 outline-none border-0 bg-transparent text-15"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-field1 mb-3 px-3 py-2 d-flex w-100 align-items-center justify-content-start rounded-3 bg-silver1">
                          <img
                            src="images/password-icon.svg"
                            className="me-2"
                            alt="Password Icon"
                          />
                          <input
                            type="password"
                            placeholder="Password"
                            className="text-black w-100 outline-none border-0 bg-transparent text-15"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="d-block w-100">
                          <button
                            type="submit"
                            className="custom-btn3 w-100 mb-3"
                          >
                            Create An Account
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="d-block w-100 text-center px-2 mb-5">
                <h5 className="text-grey1 text-16 mt-0 mb-3">
                  Or continue to be a habit
                </h5>
                <div className="d-flex w-100 align-items-center justify-content-center">
                  <div className="d-inline-block text-center mx-2">
                    <button className="bg-silver2 d-flex align-items-center justify-content-center rounded-circle p-3 border-0">
                      <img
                        className="social-icon1"
                        src="images/google-icon.svg"
                        alt="Google Icon"
                      />
                    </button>
                  </div>
                  <div className="d-inline-block text-center mx-2">
                    <button className="bg-silver2 d-flex align-items-center justify-content-center rounded-circle p-3 border-0">
                      <img
                        className="social-icon1"
                        src="images/apple-icon.svg"
                        alt="Apple Icon"
                      />
                    </button>
                  </div>
                  <div className="d-inline-block text-center mx-2">
                    <button className="bg-silver2 d-flex align-items-center justify-content-center rounded-circle p-3 border-0">
                      <img
                        className="social-icon1"
                        src="images/fb-icon.svg"
                        alt="Facebook Icon"
                      />
                    </button>
                  </div>
                </div>
              </div>
              <div className="d-block w-100 px-2">
                <p className="text-center w-100 text-14">
                  Already have an account?&nbsp;
                  <Link to="/login" className="text-green2">
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateAccount;
