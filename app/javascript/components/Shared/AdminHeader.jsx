import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setUser, logoutUser } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';

const AdminHeader = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const notificationItems = [
    { text: t('adminHeader.notifications.menu.action') },
    { text: t('adminHeader.notifications.menu.anotherAction') },
    { text: t('adminHeader.notifications.menu.somethingElse') }
  ];

  const logout = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
    navigate('/login');
  };

  return (
    <div className="d-block top-bar-sec w-100 py-2 px-3">
      <div className="d-flex w-100 align-items-center justify-content-lg-end justify-content-md-center justify-content-sm-center justify-content-center">
        <div className="d-inline-block search-form-wrapper ms-3">
          <form className="d-flex search-form bg-EEEEEE rounded-3 overflow-hidden w-100">
            <input
              type="text"
              placeholder={t('adminHeader.search.placeholder')}
              className="merriweather-font bg-transparent text-14 px-2 py-2 text-black px-1 border-0 outline-none"
            />
            <button className="search-btn">
              <img 
                src="/images/search-icon.png" 
                alt={t('adminHeader.search.button.alt')} 
              />
            </button>
          </form>
        </div>
        
        <div className="d-lg-inline-block d-md-none d-sm-none d-none ms-4">
          <div className="dropdown user-dropdown">
            <button
              className="border-0 bg-transparent user-dropdown-btn shadow-none p-0 dropdown-toggle no-caret"
              type="button"
              id="notificationDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img 
                src="/images/bell-icon.png" 
                alt={t('adminHeader.notifications.alt')} 
              />
            </button>
            <ul className="dropdown-menu" aria-labelledby="notificationDropdown">
              {notificationItems.map((item, index) => (
                <li key={index}>
                  <a className="dropdown-item" href="#">{item.text}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="d-lg-inline-block d-md-none d-sm-none d-none ms-3">
          <div className="dropdown notif-dropdown">
            <button
              className="border-0 bg-transparent notif-dropdown-btn shadow-none p-0 dropdown-toggle no-caret"
              type="button"
              id="userMenuDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img 
                src="/images/user-menu-icon.png" 
                alt={t('adminHeader.userMenu.alt')} 
              />
            </button>
            <ul className="dropdown-menu" aria-labelledby="userMenuDropdown">
              {isLoggedIn ? (
                <>
                  <li>
                    <a className="dropdown-item" href="#">
                      {t('adminHeader.userMenu.items.profile')}
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#" onClick={logout}>
                      {t('adminHeader.userMenu.items.logout')}
                    </a>
                  </li>
                </>
              ) : (
                <li>
                  <a className="dropdown-item" href="#">
                    {t('adminHeader.userMenu.items.login')}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
