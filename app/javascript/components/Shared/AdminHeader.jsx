import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, logoutUser } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';

const AdminHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  // Logout function
  const logout = (e) => {
    e.preventDefault();
    dispatch(logoutUser()); // Dispatch LOGOUT_USER action
    navigate('/login');     // Redirect to login page
  };

  return (
    <div className="d-block top-bar-sec w-100 py-2 px-3">
      <div className="d-flex w-100 align-items-center justify-content-lg-end justify-content-md-center justify-content-sm-center justify-content-center">
        <div className="d-inline-block search-form-wrapper ms-3">
          <form className="d-flex search-form bg-EEEEEE rounded-3 overflow-hidden w-100">
            <input
              type="text"
              placeholder="Search"
              className="merriweather-font bg-transparent text-14 px-2 py-2 text-black px-1 border-0 outline-none"
            />
            <button className="search-btn">
              <img src="/images/search-icon.png" alt="Search" />
            </button>
          </form>
        </div>
        <div className="d-lg-inline-block d-md-none d-sm-none d-none ms-4">
          <div className="dropdown user-dropdown">
            <button
              className="border-0 bg-transparent user-dropdown-btn shadow-none p-0 dropdown-toggle no-caret"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img src="/images/bell-icon.png" alt="Notifications" />
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li><a className="dropdown-item" href="#">Action</a></li>
              <li><a className="dropdown-item" href="#">Another action</a></li>
              <li><a className="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </div>
        </div>
        <div className="d-lg-inline-block d-md-none d-sm-none d-none ms-3">
          <div className="dropdown notif-dropdown">
            <button
              className="border-0 bg-transparent notif-dropdown-btn shadow-none p-0 dropdown-toggle no-caret"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img src="/images/user-menu-icon.png" alt="User Menu" />
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              {/* Conditionally show logout if user is logged in */}
              {isLoggedIn ? (
                <>
                  <li><a className="dropdown-item" href="#">Profile</a></li>
                  <li><a className="dropdown-item" href="#" onClick={logout}>Logout</a></li>
                </>
              ) : (
                <li><a className="dropdown-item" href="#">Login</a></li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
