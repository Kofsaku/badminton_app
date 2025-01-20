import React, { useState } from 'react';

const Entry = ({  }) => {
  const [step, setStep] = useState(1);

  return (
    <div className="pd-24-0-60-sm">
      <div className='pd-60 bg-white pd-0-sm bg-none-sm'>
        <div className="d-none d-block-sm container-sm">
          <div className="d-flex">
            <i
              className="fa-solid fa-arrow-left d-flex text-white justify-content-center align-items-center width-24 height-24 border-radius-06 bg-green1"></i>
            <div className="fw-bold fz-16 text-black2 ml-12">マッチ作成</div>
          </div>
        </div>
        <div className="mt-40-sm">
          <div className="d-flex gap-60 d-block-sm">
            <div className="bg-silver6 w-100 flex-1 bg-white-sm height-188-sm"></div>
            <div className="flex-1 mt-20-sm">
              <div className="fw-bold fz-24 text-black2 fz-20-sm mt-15-sm">大会名</div>
              <div className="fz-18 c-grey-1 m-t-20 fz-14-sm mt-7-sm">2024年5月11日(日)開催</div>
              <div className="fz-18 c-grey-1 m-t-10 fz-14-sm mt-7-sm">東京都 墨田区</div>
              <div className="fz-18 c-grey-1 m-t-10 fz-14-sm mt-7-sm">主催：</div>
            </div>
          </div>
          <div className="pd-30 m-t-60 bg-green4 fz-24 pd-32-16-sm fz-14-sm mt-20-sm">
            <div className="d-flex bg-white border-radius-08 pd-20 p-15-sm">
              <div className="text-black3 flex-1">エントリー日時</div>
              <div className="c-grey-1 flex-1-5">エントリー日時</div>
            </div>
            <div className="d-flex bg-white border-radius-08 m-t-20 pd-20 align-items-center p-15-sm">
              <div className="text-black3 flex-0-5 flex-1-sm">決済方法</div>
              <div className="flex-1-5 d-flex justify-content-between flex-direction-column-sm align-items-center align-items-none-sm">
                <div className="c-grey-1">その他3,000円/直接支払い</div>
                <div
                  className="cursor-pointer fz-18 bg-green3 text-white bg-green1
                  border-radius-06 pd-09 fz-14-sm border-radius-08-sm width-68-sm height-31-sm
                  d-flex align-items-center justify-content-center
                  ">詳細へ
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Entry;
