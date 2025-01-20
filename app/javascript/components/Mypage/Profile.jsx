import React, { useState, useEffect } from 'react';
import {updateProfile} from "../../api/profileApi";

const Profile = ({ userData, setUserData }) => {
  const [activeTab, setActiveTab] = useState(1);
  const [isEdit, setIsEdit] = useState(false);

  const handleActiveTab = (value) => {
    setActiveTab(value)
  }
  const handleCancelUpdate = () => {
    setIsEdit(false)
  }
  const handleSubmitUpdate = async () => {
    setIsEdit(false)
    await updateProfile(userData)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUserData((prevState) => {
      const { user } = prevState;

      if (name === "full_name" || name === "email" || name === "password") {
        return {
          ...prevState,
          user: {
            ...user,
            [name]: value,
          },
        };
      }

      return {
        ...prevState,
        user: {
          ...user,
          profile_attributes: {
            ...user.profile_attributes,
            [name]: value,
          },
        },
      };
    });
  };

  return (
    <div>
      <div className="d-flex height-60 border-radius-10 border-green">
        <div className={`flex-1 fz-18 border-radius-10 text-black3 cursor-pointer d-grid align-items-center text-center ${activeTab === 1 ? 'active-tab-1' : ''}`}
             onClick={()=> handleActiveTab(1)}>
          基本情報
        </div>
        <div className={`flex-1 fz-18 border-radius-10 text-black3 cursor-pointer d-grid align-items-center text-center ${activeTab === 2 ? 'active-tab-1' : ''}`}
             onClick={()=> handleActiveTab(2)}>
          協会・審判資格
        </div>
      </div>
      <div className="mt-30">
        <div className="pd-60-60-70 bg-white">
          <div className="border-b-2 fz-18 c-grey-1 d-flex pt-25 pb-25 align-items-center">
            <div className="flex-1">ニックネーム</div>
            <input className={`flex-2 c-grey-1 bg-white ${isEdit ? '' : 'border-0'}`}
                   disabled={!isEdit}
                   type="text"
                   name='nick_name'
                   value={userData.user?.profile_attributes?.nick_name}
                   onChange={handleInputChange}
            />
          </div>
          <div className="border-b-2 fz-18 c-grey-1 d-flex pt-25 pb-25 align-items-center">
            <div className="flex-1">お名前</div>
            <input className={`flex-2 c-grey-1 bg-white ${isEdit ? '' : 'border-0'}`}
                   disabled={!isEdit}
                   type="text"
                   name='full_name'
                   value={userData.user?.full_name}
                   onChange={handleInputChange}
            />
          </div>
          <div className="border-b-2 fz-18 c-grey-1 d-flex pt-25 pb-25 align-items-center">
            <div className="flex-1">フリガナ</div>
            <input className={`flex-2 c-grey-1 bg-white ${isEdit ? '' : 'border-0'}`}
                   disabled={!isEdit}
                   type="text"
                   name='furigana_name'
                   value={userData.user?.profile_attributes?.furigana_name}
                   onChange={handleInputChange}
            />
          </div>
          <div className="border-b-2 fz-18 c-grey-1 d-flex pt-25 pb-25 align-items-center">
            <div className="flex-1">性別</div>
            <select
              className={`flex-2 c-grey-1 bg-white ${isEdit ? '' : 'border-0'}`}
              disabled={!isEdit}
              name="gender"
              value={userData.user?.profile_attributes?.gender}
              onChange={handleInputChange}
            >
              <option value="male">男性</option>
              <option value="female">女性</option>
            </select>
          </div>
          <div className="border-b-2 fz-18 c-grey-1 d-flex pt-25 pb-25 align-items-center">
            <div className="flex-1">生年月日</div>
            <input className={`flex-2 c-grey-1 bg-white ${isEdit ? '' : 'border-0'}`}
                   disabled={!isEdit}
                   type="date"
                   name='date_of_birth'
                   value={userData.user?.profile_attributes?.date_of_birth}
                   onChange={handleInputChange}
            />
          </div>
          <div className="border-b-2 fz-18 c-grey-1 d-flex pt-25 pb-25 align-items-center">
            <div className="flex-1">電話番号</div>
            <input className={`flex-2 c-grey-1 bg-white ${isEdit ? '' : 'border-0'}`}
                   disabled={!isEdit}
                   type="text"
                   name='telephone_number'
                   value={userData.user?.profile_attributes?.telephone_number}
                   onChange={handleInputChange}
            />
          </div>
          <div className="border-b-2 fz-18 c-grey-1 d-flex pt-25 pb-25 align-items-center">
            <div className="flex-1">メールアドレス</div>
            <input className={`flex-2 c-grey-1 bg-white ${isEdit ? '' : 'border-0'}`}
                   disabled={!isEdit}
                   type="text"
                   name='email'
                   value={userData.user?.email}
                   onChange={handleInputChange}
            />
          </div>
          <div className="border-b-2 fz-18 c-grey-1 d-flex pt-25 pb-25 align-items-center">
            <div className="flex-1">住所</div>
            <input className={`flex-2 c-grey-1 bg-white ${isEdit ? '' : 'border-0'}`}
                   disabled={!isEdit}
                   type="text"
                   name='address'
                   value={userData.user?.profile_attributes?.address}
                   onChange={handleInputChange}
            />
          </div>
          <div className="border-b-2 fz-18 c-grey-1 d-flex pt-25 pb-25 align-items-center">
            <div className="flex-1">主な活動地域</div>
            <input className={`flex-2 c-grey-1 bg-white ${isEdit ? '' : 'border-0'}`}
                   disabled={!isEdit}
                   type="text"
                   name='job'
                   value={userData.user?.profile_attributes?.job}
                   onChange={handleInputChange}
            />
          </div>
          <div className="border-b-2 fz-18 c-grey-1 d-flex pt-25 pb-25 align-items-center">
            <div className="flex-1">パスワード</div>
            {isEdit ? (
              <input
                className={`flex-2 c-grey-1 bg-white ${isEdit ? '' : 'border-0'}`}
                disabled={!isEdit}
                type="password"
                name="password"
                value={userData?.user?.password || ''}
                onChange={handleInputChange}
              />
            ) : (
              <div className="flex-2 c-grey-1 bg-white">
                ●●●●●●●
              </div>
            )}
          </div>

        </div>
        <div className="pd-45-60 bg-silver8">
          {isEdit ? (
            <div className="d-flex">
              <div
                className="bg-white height-60 w-50 fw-bold fz-20 c-grey-1 cursor-pointer d-grid align-items-center justify-content-center"
                onClick={handleCancelUpdate}
              >キャンセル
              </div>
              <div
                className="bg-green1 height-60 w-50 fw-bold fz-20 text-white cursor-pointer d-grid align-items-center justify-content-center"
                onClick={handleSubmitUpdate}
              >保存</div>
            </div>
          ) : (
            <div
              className="bg-green1 height-60 w-100 fw-bold fz-20 text-white cursor-pointer d-grid align-items-center justify-content-center"
              onClick={()=> setIsEdit(true)}
            >変更する</div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Profile;
