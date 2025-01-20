import React, { useState } from 'react';

const Entry = ({  }) => {
  const [step, setStep] = useState(1);

  return (
    <div className='pd-60 bg-white'>
      <div className="">
        <div className="d-flex gap-60">
          <div className="bg-silver6 w-100 flex-1"></div>
          <div className="flex-1">
            <div className="fw-bold fz-24 text-black2">大会名</div>
            <div className="fz-18 c-grey-1 m-t-20">2024年5月11日(日)開催</div>
            <div className="fz-18 c-grey-1 m-t-10">東京都 墨田区</div>
            <div className="fz-18 c-grey-1 m-t-10">主催：</div>
          </div>
        </div>
        <div className="pd-30 m-t-60 bg-green4 fz-24">
          <div className="d-flex bg-white border-radius-08 pd-20">
            <div className="text-black3 flex-1">エントリー日時</div>
            <div className="c-grey-1 flex-1-5">エントリー日時</div>
          </div>
          <div className="d-flex bg-white border-radius-08 m-t-20 pd-20 align-items-center">
            <div className="text-black3 flex-0-5">決済方法</div>
            <div className="c-grey-1 flex-1-5">その他3,000円/直接支払い</div>
            <div className="cursor-pointer fz-18 bg-green3 text-white bg-green1 border-radius-06 pd-09">詳細へ</div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Entry;
