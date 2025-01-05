import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Header from "../../components/Shared/Header";
import Footer from "../../components/Shared/Footer";
import CtaSection from '../../components/Shared/CtaSection';


import axiosInstance from "../../api/axiosInstance";

export default function () {
  const params = useParams();
  const [tournamentData, setTournamentData] = useState(null);

  useEffect(() => {
    console.log(1112)
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
            <div className="pd-40 bg-green09 border-radius-10">
              <div className="fw-bold fz-28 text-green3">チーム名を入力してください</div>
              <input type="text" className="mt-15 w-100 border-radius-10 height-80 border-0 text-indent-20 fz-24"
                     placeholder="チーム名入りました"/>
            </div>
          </div>
          <div className="container mt-4">
            <div className="fw-bold fz-28 text-green3">エントリーの種類を選んでください</div>
            <div className="d-flex gap-10 mt-1">
              <div className="d-flex gap-10 height-60 bg-silver6 border-radius-06 pd-20 flex-grow-1 align-items-baseline">
                <i className="fa-solid fa-circle-check height-20 width-20"></i>
                <div>男子2部1位</div>
              </div>
              <div className="d-flex gap-10 height-60 bg-silver6 border-radius-06 pd-20 flex-grow-1 align-items-baseline">
                <i className="fa-solid fa-circle-check height-20 width-20"></i>
                <div>男子ダブルス2位</div>
              </div>
              <div className="d-flex gap-10 height-60 bg-silver6 border-radius-06 pd-20 flex-grow-1 align-items-baseline">
                <i className="fa-solid fa-circle-check height-20 width-20"></i>
                <div>女子ダブルス1位</div>
              </div>
              <div className="d-flex gap-10 height-60 bg-silver6 border-radius-06 pd-20 flex-grow-1 align-items-baseline">
                <i className="fa-solid fa-circle-check height-20 width-20"></i>
                <div>女子ダブルス2位</div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-green2 pt-5 pb-5 w-100">
          <div className="container">
            <div className="d-flex gap-70">
              <div className="flex-2-5">
                <div>
                  <div className="fz-24 bg-green3 height-76 text-white pd-25-40 fw-bold">男子ダブルス１位</div>
                  <div className="bg-white pd-25-40">
                    <div>メンバー：１ペア</div>
                    <div className="bg-green4 pd-30 mt-15 border-radius-08">
                      <div className="d-flex align-items-center justify-content-between">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ6th-oTbkDMbDOPGU_kkRMM55lfvRYgM8JA&s" alt="" className="width-80 height-80 border-radius-50"/>
                        <div className="text-green3 fw-bold fz-24">Kofworkshard</div>
                        <select name="" id="" className="height-60 border-0 pd-17-19 border-radius-08">
                          <option value="1">通常参加費：2,000円</option>
                        </select>
                        <div className="fz-18 cursor-pointer">削除</div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mt-30">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ6th-oTbkDMbDOPGU_kkRMM55lfvRYgM8JA&s" alt="" className="width-80 height-80 border-radius-50"/>
                        <div className="text-green3 fw-bold fz-24">Kofworkshard</div>
                        <select name="" id="" className="height-60 border-0 pd-17-19 border-radius-08">
                          <option value="1">通常参加費：2,000円</option>
                        </select>
                        <div className="fz-18 cursor-pointer">削除</div>
                      </div>
                    </div>
                    <div className="w-100 height-60 bg-silver7 border-radius-08 align-content-center text-center cursor-pointer mt-20">ダブルスの参加者を追加</div>
                  </div>
                </div>
                <div className="mt-20">
                  <div className="fz-24 bg-green3 height-76 text-white pd-25-40 fw-bold">エントリー代表者情報</div>
                  <div className="bg-white pd-25-40">
                    <div className="fz-24">郵便番号</div>
                    <input type="text" placeholder="郵便番号へ。" className="fz-24 height-80 text-indent-20 border-radius-10 bg-green3 bg-green4 m-t-10 w-100 border-0"/>
                    <div className="fz-24 mt-20">アドレス</div>
                    <input type="text" placeholder="アドレスへ。" className="fz-24 height-80 text-indent-20 border-radius-10 bg-green3 bg-green4 m-t-10 w-100 border-0"/>
                    <div className="fz-24 mt-20">電話番号</div>
                    <input type="text" placeholder="電話番号へ。" className="fz-24 height-80 text-indent-20 border-radius-10 bg-green3 bg-green4 m-t-10 w-100 border-0"/>
                  </div>
                </div>
                <div className="mt-20">
                  <div className="fz-24 bg-green3 height-76 text-white pd-25-40 fw-bold">備考</div>
                  <div className="bg-white height-200"></div>
                </div>
              </div>
              <div className="flex-1">
                <div>
                  <div className="fz-24 bg-green3 height-76 text-white pd-25-40 fw-bold">エントリー金額</div>
                  <div className="pd-25-40 bg-white">
                    <div className="fz-24">男子ダブルス</div>
                    <div className="fz-18 mt-30">通常参加費：2,000円×2名</div>
                    <div className="fz-18">小計4,000円</div>
                    <div className="text-right fz-24 fw-bold mt-57 ">合計：4,000円</div>
                  </div>
                  <div className="text-center fz-16 bg-silver7 height-60 align-content-center cursor-pointer">保存</div>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-between mt-113">
              <div
                className="bg-white text-green3 width-180 height-70 fw-bold fz-26 text-center border-radius-10 align-content-center cursor-pointer">キャンセル
              </div>
              <a href={`/tournament/${params.id}/entry/payment`}>
                <div
                  className="text-white bg-green3 width-300 height-70 fw-bold fz-26 text-center border-radius-10 align-content-center cursor-pointer">エントリーに進む
                </div>
              </a>
            </div>
          </div>
        </div>
      </main>
      <CtaSection/>
      <Footer/>
    </>
  );
}
