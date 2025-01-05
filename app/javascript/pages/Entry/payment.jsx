import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Header from "../../components/Shared/Header";
import Footer from "../../components/Shared/Footer";
import CtaSection from '../../components/Shared/CtaSection';
import {paymentTournament} from "../../api/tournamentApi";

export default function () {
  const params = useParams()
  const [cardNumber, setCardNumber] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardMonth, setCardMonth] = useState('');
  const [cardYear, setCardYear] = useState('');

  const handleChangeCardNumber = (event) => {
    let value = event.target.value
    setCardNumber(value)
  }
  const handleChangeCardMonth = (event) => {
    let value = event.target.value
    setCardMonth(value)
  }
  const handleChangeCardYear = (event) => {
    let value = event.target.value
    setCardYear(value)
  }
  const handleChangeCardCvv = (event) => {
    let value = event.target.value
    setCardCvv(value)
  }

  const handleSubmit = async () => {
    let formData = {
      card_number: cardNumber,
      card_cvv: cardCvv,
      card_year: cardYear,
      card_month: cardMonth,
    }
    const response = await paymentTournament(params.id,formData)
    console.log(response)
  }

  useEffect(() => {
  }, []);

  return (
    <>
      <Header />
      <main>
        <div className="bg-green2 pt-5 pb-5 w-100 d-flex justify-content-between">
          <div className="container">
            <div className="d-flex gap-70 align-items-center">
              <div
                className="bg-white  text-green3 width-160 height-60 fw-bold fz-26 text-center border-radius-10 align-content-center cursor-pointer">キャンセル
              </div>
              <div className="d-flex gap-40 align-items-center">
                <img src="/images/result-2.png" alt="" className="width-200 height-200 border-radius-50"/>
                <div className="">
                  <div className="text-green4 fz-28 fw-bold">第6回朝日市民バドミントン大会</div>
                  <div className="text-green4 fz-42 fw-bold">エントリー内容の入力</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-5 pb-5 w-100">
          <div className="container">
            <div>
              <div
                className="bg-green2 height-76 fz-28 fw-bold text-center b-t-r-right-left-8 align-content-center">この内容でエントリーを行います。よろしいですか？
              </div>
              <div className="pd-40 bg-green4 b-b-r-right-left-8">
                <div className="height-80 border-radius-10 text-center bg-white align-content-center">
                  <span className="fw-bold fz-24">お支払い金額：</span>
                  <span className="fw-bold fz-32 c-red-1">4,000円</span>
                </div>

                <div
                  className="p-d-l-41 p-d-r-41 height-80 border-radius-06 align-content-center mt-83 p-d-r-41 fz-24 fw-bold bg-white">男子ダブルス2位
                </div>
                <div className="p-d-l-41 p-d-r-41 fz-24 m-t-25 c-grey-1">通常参加費：2,000 × 2名 = 4,000円</div>
                <div className="mg-0-41 division"></div>
                <div className="p-d-l-41 p-d-r-41">
                  <span className="fz-24 text-grey1">種目小計：</span>
                  <span className="fz-32 c-red-1 c-red-1 fw-bold">4,000円</span>
                </div>
                <div className="mt-55"></div>
                <div className="fw-bold fz-24">参加者一覧</div>
                <div className="mt-16 bg-white border-radius-08 d-flex border-gray-1">
                  <div className="d-flex align-items-center gap-23 border-r-1 pd-43 flex-1">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ6th-oTbkDMbDOPGU_kkRMM55lfvRYgM8JA&s"
                      alt="" className="width-114 height-114 border-radius-50"/>
                    <div>
                      <div className="fw-bold fz-24 text-green3">Kofworkshard</div>
                      <div className="fz-20 text-green3">通常参加費：2,000円</div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-23 pd-43 flex-1">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ6th-oTbkDMbDOPGU_kkRMM55lfvRYgM8JA&s"
                      alt="" className="width-114 height-114 border-radius-50"/>
                    <div>
                      <div className="fw-bold fz-24 text-green3">Kofworkshard</div>
                      <div className="fz-20 text-green3">通常参加費：2,000円</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="triangle-down"></div>
            </div>

            <div className="m-t-20">
              <div
                className="bg-green2 height-76 fz-28 fw-bold text-center b-t-r-right-left-8 align-content-center">参加費のお支払い方法について
              </div>
              <div className="pd-40 bg-green4 b-b-r-right-left-8">
                <div
                  className="text-center c-grey-1 fz-24">当日受付の際にお支払いください。お釣りのないようにご協力お願いいたします。
                </div>

                <div className="lead">
                  クレジットカード情報をご入力のうえ、「決済する」ボタンをクリックしてください。<br/>
                  ※ VISA / MasterCard のみご利用いただけます。<br/>
                  <p className="logo">
                    <i className="fa-brands fa-cc-amex"></i>
                    <i className="fa-brands fa-cc-visa"></i>
                    <i className="fa-brands fa-cc-mastercard"></i>
                    <i className="fa-brands fa-cc-jcb"></i>
                  </p>
                </div>
                <div className="mt-20">
                  <div className="fz-24 bg-green3 height-76 text-white pd-25-40 fw-bold">クレジットカード情報</div>
                  <div className="bg-white pd-25-40">
                    <div className="fz-24">カード番号</div>
                    <input type="text" placeholder="カード番号"
                           className="fz-24 height-80 text-indent-20 border-radius-10 bg-green3 bg-green4 m-t-10 w-100 border-0"
                           onChange={(e) => handleChangeCardNumber(e)}
                    />
                    <div className="fz-24 mt-20">カード有効期限</div>
                    <select onChange={(e) => handleChangeCardMonth(e)}
                            className="fz-24 height-80 text-indent-20 border-radius-10 bg-green3 bg-green4 m-t-10 w-30 border-0">
                      <option value="">--</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                    </select><i></i><span>月 /</span>
                    <select onChange={(e) => handleChangeCardYear(e)}
                            className="fz-24 height-80 text-indent-20 border-radius-10 bg-green3 bg-green4 m-t-10 w-30 border-0">
                      <option value="">--</option>
                      <option value="2025">2025</option>
                      <option value="2026">2026</option>
                      <option value="2027">2027</option>
                      <option value="2028">2028</option>
                      <option value="2029">2029</option>
                      <option value="2030">2030</option>
                      <option value="2031">2031</option>
                      <option value="2032">2032</option>
                      <option value="2033">2033</option>
                      <option value="2034">2034</option>
                      <option value="2035">2035</option>
                    </select><i></i><span>年</span>
                    <div className="fz-24 mt-20">セキュリティコード</div>
                    <input type="text" placeholder="セキュリティコード"
                           className="fz-24 height-80 text-indent-20 border-radius-10 bg-green3 bg-green4 m-t-10 w-30 border-0"
                           onChange={(e) => handleChangeCardCvv(e)}
                    />
                  </div>
                </div>
                <div className="text-center c-grey-1 fz-24 m-t-60">
                  <div className="d-flex justify-content-center">
                    <label className="checkbox-style2">
                      <input type="checkbox" className="d-none"/>
                      <span className="checkmark"></span>
                      <div>上記内容（参加費の支払い方法）を確認しました。</div>
                    </label>

                  </div>
                  <div className="m-t-40 d-flex justify-content-center gap-10">
                    <button
                      className="bg-white text-green5 height-57 border-radius-06 fw-bold fz-20 border-0 width-198">キャンセル
                    </button>
                    <button className="bg-green3 height-57 border-radius-06 fw-bold fz-20 border-0 text-white width-360"
                            disabled={cardNumber === '' || cardMonth === '' || cardYear === '' || cardCvv === ''}
                            onClick={handleSubmit}
                    >進み
                    </button>
                  </div>
                </div>
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
