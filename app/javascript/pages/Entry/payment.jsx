import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Shared/Header";
import Footer from "../../components/Shared/Footer";
import CtaSection from '../../components/Shared/CtaSection';
import {paymentTournament, showTournament} from "../../api/tournamentApi";

export default function () {
  const params = useParams()
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardMonth, setCardMonth] = useState('');
  const [cardYear, setCardYear] = useState('');
  const [categories, setCategories] = useState();
  const [participationFee, setParticipationFee] = useState(0)
  const [teamMember, setTeamMember] = useState([]);

  useEffect(async () => {
    if (params.id){
      const res = await showTournament(params.id)
      setCategories(res.tournament.tournament_categories_attributes)
      setParticipationFee(res.tournament.participation_fee)
      setTeamMember(JSON.parse(searchParams.get("teamMembers")))
    }
  }, [params.id]);

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
      team_member: teamMember,
      tournament_id: params.id
    }
    const response = await paymentTournament(params.id,formData)
    if(response.status === 'ok') {
      navigate('/dashboard#team')
    }
  }
  function isEven(index) {
    return index % 2 === 0;
  }
  return (
    <>
      <Header />
      <main>
        <div className="bg-green2 pt-5 pb-5 w-100 d-flex justify-content-between p-12-0-sm">
          <div className="container">
            <div className="d-flex gap-70 align-items-center entry-header gap-24-sm">
              <div
                className="bg-white text-green3 width-160 height-60 fw-bold fz-26 text-center border-radius-10
                align-content-center cursor-pointer w-100-sm fz-16-sm bg-green3-sm c-white-sm border-radius-06-sm height-52-sm">入力画面へ
              </div>
              <div className="d-flex gap-40 align-items-center w-100-sm">
                <img src="/images/result-2.png" alt=""
                     className="width-200 height-200 border-radius-50 width-80-sm height-80-sm"/>
                <div className="">
                  <div className="text-green4 fz-28 fw-bold fz-16-sm">第6回朝日市民バドミントン大会</div>
                  <div className="text-green4 fz-42 fw-bold fz-24-sm">エントリー内容の確認</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-5 pb-5 w-100 pd-0-sm">
          <div className="container pd-40-0-sm">
            <div>
              <div
                className="bg-green2 height-76 fz-28 fw-bold text-center b-t-r-right-left-8
                align-content-center fz-18-sm pd-22-12-sm border-radius-0-sm text-left-sm height-92-sm">この内容でエントリーを行います。よろしいですか？
              </div>
              <div className="pd-40 bg-green4 b-b-r-right-left-8 pd-22-12-sm border-radius-0-sm">
                <div className="height-80 border-radius-10 text-center bg-white align-content-center height-53-sm border-radius-06-sm">
                  <span className="fw-bold fz-24 fz-14-sm">お支払い金額：</span>
                  <span className="fw-bold fz-32 c-red-1 fz-24-sm">{Number(participationFee * teamMember.length).toLocaleString()}円</span>
                </div>

                <div
                  className="p-d-l-41 p-d-r-41 height-80 border-radius-06 align-content-center
                  mt-83 fz-24 fw-bold bg-white fz-14-sm height-53-sm p-d-r-22-sm p-d-l-22-sm mt-40-sm">男子ダブルス2位
                </div>
                <div className="p-d-l-41 p-d-r-41 fz-24 m-t-25 c-grey-1 p-d-r-22-sm p-d-l-22-sm fz-14-sm">通常参加費：{Number(participationFee).toLocaleString()} × {teamMember.length}名 = {Number(participationFee * teamMember.length).toLocaleString()}円</div>
                <div className="mg-0-41 division mg-0-22-sm"></div>
                <div className="p-d-l-41 p-d-r-41 p-d-r-22-sm p-d-l-22-sm">
                  <span className="fz-24 c-grey-1 fz-14-sm">種目小計：</span>
                  <span className="fz-32 c-red-1 c-red-1 fw-bold fz-18-sm">{Number(participationFee * teamMember.length).toLocaleString()}円</span>
                </div>
                <div className="mt-55 mt-30-sm"></div>
                <div className="fw-bold fz-24 fz-14-sm">参加者一覧</div>
                <div className="mt-16 bg-white border-radius-08 d-flex flex-direction-column-sm flex-wrap">
                  { teamMember.map((member, index)=> (
                    <div
                      className={`d-flex align-items-center gap-23 ${isEven(index) ? "border-r-1" : ''} pd-43 flex-1 border-r-0-sm border-b-1-sm pd-25-sm flex-1-1-50 mw-100-sm`}>
                      <img
                        src="/images/avatar-1.png"
                        alt="" className="width-114 height-114 border-radius-50 width-86-sm height-86-sm"/>
                      <div>
                        <div className="fw-bold fz-24 text-green3 fz-20-sm">{member}</div>
                        <div className="fz-20 text-green3 fz-16-sm">通常参加費：{Number(participationFee).toLocaleString()}円</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="triangle-down"></div>
            </div>

            <div className="m-t-20">
              <div
                className="bg-green2 height-76 fz-28 fw-bold text-center
                b-t-r-right-left-8 align-content-center fz-18-sm height-68-sm pd-22-12-sm border-radius-0-sm text-left-sm">参加費のお支払い方法について
              </div>
              <div className="pd-40 bg-green4 b-b-r-right-left-8 pd-22-12-sm border-radius-0-sm">
                <div
                  className="text-center c-grey-1 fz-24 fz-14-sm text-left-sm">当日受付の際にお支払いください。お釣りのないようにご協力お願いいたします。
                </div>

                <div className="lead">
                  <p className="logo">
                    <i className="fa-brands fa-cc-amex"></i>
                    <i className="fa-brands fa-cc-visa"></i>
                    <i className="fa-brands fa-cc-mastercard"></i>
                    <i className="fa-brands fa-cc-jcb"></i>
                  </p>
                </div>
                <div className="mt-20">
                  <div className="fz-24 bg-green3 height-76 text-white pd-25-40 fw-bold fz-16-sm pd-22-12-sm">クレジットカード情報</div>
                  <div className="bg-white pd-25-40 pd-22-12-sm">
                    <div className="fz-24 fz-16-sm">カード番号</div>
                    <input type="text" placeholder="カード番号"
                           className="fz-24 height-80 text-indent-20 border-radius-10 bg-green3
                            bg-green4 m-t-10 w-100 border-0 fz-16-sm height-53-sm border-radius-06-sm"
                           onChange={(e) => handleChangeCardNumber(e)}
                    />
                    <div className="fz-24 mt-20 fz-16-sm">カード有効期限</div>
                    <select onChange={(e) => handleChangeCardMonth(e)}
                            className="fz-24 height-80 text-indent-20 border-radius-10 bg-green3
                             bg-green4 m-t-10 w-30 border-0 fz-16-sm height-53-sm border-radius-06-sm w-40-sm">
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
                            className="fz-24 height-80 text-indent-20 border-radius-10 bg-green3 bg-green4
                             m-t-10 w-30 border-0 fz-16-sm height-53-sm border-radius-06-sm w-40-sm">
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
                    <div className="fz-24 mt-20 fz-16-sm">セキュリティコード</div>
                    <input type="text" placeholder="セキュリティコード"
                           className="fz-24 height-80 text-indent-20 border-radius-10 bg-green3
                           bg-green4 m-t-10 w-30 border-0 fz-16-sm height-53-sm border-radius-06-sm w-100-sm"
                           onChange={(e) => handleChangeCardCvv(e)}
                    />
                  </div>
                </div>
                <div className="text-center c-grey-1 fz-24 m-t-60">
                  <div className="d-flex justify-content-center justify-content-start-sm">
                    <label className="checkbox-style2 fz-14-sm">
                      <input type="checkbox" className="d-none"/>
                      <span className="checkmark"></span>
                      <div>上記内容（参加費の支払い方法）を確認しました。</div>
                    </label>

                  </div>
                  <div className="m-t-40 d-flex justify-content-center gap-10">
                    <button
                      className="bg-white text-green5 height-57 border-radius-06 fw-bold fz-20 border-0 width-198 height-52-sm fz-16-sm">キャンセル
                    </button>
                    <button className="bg-green3 height-57 border-radius-06 fw-bold fz-20 border-0 text-white width-360  height-52-sm fz-16-sm"
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
