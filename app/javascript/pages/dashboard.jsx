import React, { useEffect, useState } from "react";

import Header from "../components/Shared/Header";
import Footer from "../components/Shared/Footer";
import CtaSection from '../components/Shared/CtaSection';
import Profile from '../components/Mypage/Profile';
import Entry from '../components/Mypage/Entry';
import { fetchProfile } from '../api/profileApi'
import {logoutUser} from "../redux/actions";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import MatchList from "./TeamMatchList/TeamMatchList";

export default function () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = useSelector((state) => state.user.role);
  const sidebar = [
    { key: 'profile', title: 'あなたのプロフィール', sidebarTitle: 'プロフィール'},
    { key: 'team', title: '参加予定試合管理', sidebarTitle: '参加予定試合管理'},
    { key: 'entry', title: 'あなたのエントリー・決済履歴', sidebarTitle: 'エントリー履歴・　決済'},
    { key: 'notice', title: 'お知らせ', sidebarTitle: 'お知らせ'},
    { key: 'setting', title: 'システム設定', sidebarTitle: 'システム設定'},
  ];
  const [sidebarActive, setSidebarActive] = useState({ key: 'profile', title: 'あなたのプロフィール', sidebarTitle: 'プロフィール'})
  const [userData, setUserData] = useState({})

  const changeActiveSidebar = (key) => {
    const item = sidebar.find(item => item.key === key);
    setSidebarActive(item)
  }

  useEffect(async () => {
    if( role !== 'player') {
      navigate('/')
    } else {
      const profile = await fetchProfile();
      setUserData(profile)
    }
  }, []);

  const logout = (e) => {
    e.preventDefault();
    dispatch(logoutUser()); // Dispatch LOGOUT_USER action
    navigate('/login');     // Redirect to login page
  };

  return (
    <>
      <Header />
      <main>
        <div className="w-100 d-flex justify-content-between p-12-0-sm box-shadow-1 position-relative">
          <div className="container">
              <div className="d-flex gap-32 align-items-center justify-content-center w-100-sm pd-67 pd-0-sm gap-12-sm">
                <img src="/images/avatar-1.png" alt=""
                     className="width-123 height-123 border-radius-50 width-80-sm height-80-sm"/>
                <div className="">
                  <div className="text-green3 fz-44 fw-bold text-decoration-underline fz-24-sm text-decoration-none-sm">{sidebarActive.title}</div>
                </div>
              </div>
          </div>
        </div>
        <div className="pad-top-60 pad-bot-100 w-100 pd-0-sm bg-silver6">
          <div className="container">
            <div className="d-flex gap-70">
              <div className="left-item d-none-sm pd-40-0-60-sm">
                {sidebar.map((item) => (
                  <div
                    className={`pd-17-21 d-flex justify-content-between width-316 height-60 border-b-1 fz-18 c-grey-1 cursor-pointer align-items-center ${item.key === sidebarActive.key ? 'active-sidebar' : ''}`}
                    key={item.key}
                    onClick={() => changeActiveSidebar(item.key)}
                  >
                    {item.sidebarTitle}
                    <i className={`fa-solid fa-angle-right bg-grey1 ${item.key === sidebarActive.key ? 'bg-black1' : 'bg-grey1'}`}></i>
                  </div>
                ))}
                <div className="pd-17-21 d-flex justify-content-center width-316 height-60 fz-18 bg-silver8 c-grey-1 cursor-pointer"
                     onClick={logout}
                >
                  ログアウト
                </div>
              </div>
              <div className="right-item w-100">
                {sidebarActive.key === 'profile' ? (
                  <Profile userData={userData}
                           setUserData={setUserData}
                  />
                ) : sidebarActive.key === 'team' ? (
                  <MatchList detail={false}/>
                ) : sidebarActive.key === 'entry' ? (
                  <Entry />
                ) : sidebarActive.key === 'notice' ? (
                  <div>Notice Content</div>
                ) : sidebarActive.key === 'setting' ? (
                  <div>Settings Content</div>
                ) : (
                  <div>Default Content</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <CtaSection/>
      <Footer/>
    </>
  );
}
