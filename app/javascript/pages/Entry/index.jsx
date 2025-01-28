//デフォルトの値が入っているので修正する
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Shared/Header";
import Footer from "../../components/Shared/Footer";
import CtaSection from '../../components/Shared/CtaSection';
import {useTranslation} from "react-i18next";
import {showTournament} from "../../api/tournamentApi";
import {Button, Col, Form, Modal, Row} from "react-bootstrap";

export default function () {
  const { t } = useTranslation();
  const params = useParams();
  const [tournament, setTournament] = useState(null);
  const [categories, setCategories] = useState();
  const [participationFee, setParticipationFee] = useState(0);
  const [teamMember, setTeamMember] = useState([]);
  const [newMemberName, setNewMemberName] = useState("");
  const [isAddMember, setIsAddMember] = useState(false);

  useEffect(async () => {
    if (params.id){
      const res = await showTournament(params.id)
      setCategories(res.tournament.tournament_categories_attributes)
      setParticipationFee(res.tournament.participation_fee)
    }
  }, [params.id]);

  const showModalAddMember = () => {
    setIsAddMember(true)
  }
  const handleCloseAddMemberModal = () => {
    setNewMemberName("");
    setIsAddMember(false)
  }
  const handleSubmitAddMemberModal = () => {
    if (newMemberName.trim() !== "") {
      setTeamMember([...teamMember, newMemberName]);
      handleCloseAddMemberModal();
    } else {
      alert("名前を入力してください"); // Alert if the input is empty
    }
  }
  const handleRemoveMember = (index) => {
    setTeamMember((prevMembers) => prevMembers.filter((_, i) => i !== index));
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
                align-content-center cursor-pointer w-100-sm fz-16-sm bg-green3-sm c-white-sm border-radius-06-sm height-52-sm">キャンセル
              </div>
              <div className="d-flex gap-40 align-items-center w-100-sm">
                <img src="/images/result-2.png" alt="" className="width-200 height-200 border-radius-50 width-80-sm height-80-sm"/>
                <div className="">
                  <div className="text-green4 fz-28 fw-bold fz-16-sm">第6回朝日市民バドミントン大会</div>
                  <div className="text-green4 fz-42 fw-bold fz-24-sm">エントリー内容の入力</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-5 pb-5 w-100">
          <div className="container pd-0-sm">
            <div className="pd-40 bg-green09 border-radius-10 border-radius-0-sm p-12-sm">
              <div className="fw-bold fz-28 text-green3 fz-18-sm">チーム名を入力してください</div>
              <input type="text" className="mt-15 w-100 border-radius-10 height-80 border-0 text-indent-20 fz-24 fz-16-sm
              border-radius-06-sm height-52-sm mt-12-sm"
                     placeholder="チーム名入りました"/>
            </div>
          </div>
          <div className="container mt-4 mt-0-sm p-t-64-sm">
            <div className="fw-bold fz-28 text-green3 fz-20-sm">エントリーの種類を選んでください</div>
            <div className="d-flex gap-10 mt-1 flex-direction-column-sm flex-wrap">
              {categories?.map((category, index) => (
                <div
                  key={index}
                  className="d-flex flex-1-1 gap-10 height-60 bg-silver6 border-radius-06 pd-20 flex-grow-1 align-items-baseline fz-16-sm mw-100-sm"
                >
                  <i className="fa-solid fa-circle-check height-20 width-20"></i>
                  <div>{t(`tournament.${category.category_type}`)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-green2 pt-5 pb-5 w-100 pt-0-sm">
          <div className="container p-l-r-0-sm">
            <div className="d-flex gap-70 flex-direction-column-sm gap-0-sm">
              <div className="flex-2-5">
                <div>
                  <div
                    className="fz-24 bg-green3 height-76 text-white pd-25-40 fw-bold fz-18-sm pd-22-12-sm">男子ダブルス１位
                  </div>
                  <div className="bg-white pd-25-40 pd-28-12-sm">
                    <div className="fz-24 fz-16-sm">メンバー：{teamMember.length}名</div>
                    <div className="bg-green4 pd-30 mt-15 border-radius-08 pd-25-sm">
                      { teamMember.map((member, index)=> (
                        <div key={index} className={`d-flex align-items-center justify-content-between ${index !== 0 ? 'mt-30' : ''}`}>
                          <img
                            src="/images/avatar-1.png"
                            alt="" className="width-80 height-80 border-radius-50 width-86-sm height-86-sm"/>
                          <div
                            className="d-flex align-items-center gap-16 gap-03-sm flex-direction-column-sm align-items-flex-start-sm">
                            <div className="text-green3 fw-bold fz-24 fz-20-sm">{member}</div>
                            <select name="" id=""
                                    className="height-60 border-0 pd-17-19 border-radius-08 height-38-sm border-radius-06-sm pd-0-13-sm fz-14-sm">
                              <option value="1">通常参加費：{Number(participationFee).toLocaleString()}円</option>
                            </select>
                            <div className="fz-18 cursor-pointer fz-14-sm align-self-flex-end-sm"
                                 onClick={() => handleRemoveMember(index)}
                            >削除</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="w-100 height-60 bg-silver7 border-radius-08
                    align-content-center text-center cursor-pointer mt-20 fz-14-sm pd-22-12-sm"
                         onClick={showModalAddMember}
                    >ダブルスの参加者を追加</div>
                  </div>
                </div>
                <div className="mt-20 mt-10-sm">
                  <div
                    className="fz-24 bg-green3 height-76 text-white pd-25-40 fw-bold pd-22-12-sm">エントリー代表者情報
                  </div>
                  <div className="bg-white pd-25-40 pd-22-12-sm">
                    <div className="fz-24 fz-16-sm">郵便番号</div>
                    <input type="text" placeholder="郵便番号へ。"
                           className="fz-24 height-80 text-indent-20 border-radius-10 bg-green3 bg-green4 m-t-10 w-100 border-0 fz-15-sm height-53-sm border-radius-06-sm"/>
                    <div className="fz-24 mt-20 fz-16-sm">アドレス</div>
                    <input type="text" placeholder="アドレスへ。" className="fz-24 height-80 text-indent-20 border-radius-10 bg-green3 bg-green4 m-t-10 w-100 border-0 fz-15-sm height-53-sm border-radius-06-sm"/>
                    <div className="fz-24 mt-20 fz-16-sm">電話番号</div>
                    <input type="text" placeholder="電話番号へ。" className="fz-24 height-80 text-indent-20 border-radius-10 bg-green3 bg-green4 m-t-10 w-100 border-0 fz-15-sm height-53-sm border-radius-06-sm"/>
                  </div>
                </div>
                <div className="mt-20 mt-10-sm">
                  <div className="fz-24 bg-green3 height-76 text-white pd-25-40 fw-bold pd-22-12-sm">備考</div>
                  <div className="bg-white height-200"></div>
                </div>
              </div>
              <div className="flex-1 mt-10-sm">
                <div>
                  <div className="fz-24 bg-green3 height-76 text-white pd-25-40 fw-bold">エントリー金額</div>
                  <div className="pd-25-40 bg-white pd-22-12-sm">
                    <div className="fz-24 fz-18-sm">男子ダブルス</div>
                    <div className="fz-18 mt-30 fz-14-sm">通常参加費：{Number(participationFee).toLocaleString()}円×{teamMember.length}名</div>
                    <div className="fz-18 fz-14-sm">小計{Number(participationFee * teamMember.length).toLocaleString()}円</div>
                    <div className="text-right fz-24 fw-bold mt-57 fz-17-sm">合計：{Number(participationFee * teamMember.length).toLocaleString()}円</div>
                  </div>
                  <div className="pd-0-12-sm pb-22-sm bg-white-sm">
                    <div
                      className="text-center fz-16 bg-silver7 height-60 align-content-center cursor-pointer fz-14-sm border-radius-06-sm">保存
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-between mt-113 mt-0-sm pd-64-12-24-sm">
              <div
                className="bg-white text-green3 width-180 height-70 fw-bold fz-26 text-center border-radius-10
                 align-content-center cursor-pointer fz-16-sm height-52-sm width-111-sm border-radius-06-sm">キャンセル
              </div>
              <a href={`/tournament/${params.id}/entry/payment?teamMembers=${encodeURIComponent(
                JSON.stringify(teamMember)
              )}`}>
                <div
                  className="text-white bg-green3 width-300 height-70 fw-bold fz-26 text-center
                   border-radius-10 align-content-center cursor-pointer fz-16-sm height-52-sm width-220-sm border-radius-06-sm">エントリーに進む
                </div>
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer/>
      <Modal show={isAddMember} onHide={handleCloseAddMemberModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add new Member</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formTeamName">
              <Form.Label>名前</Form.Label>
              <Form.Control
                type="text"
                placeholder="名前"
                value={newMemberName}
                onChange={(e) => setNewMemberName(e.target.value)}
              />
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddMemberModal}>
            閉じる
          </Button>
          <Button variant="primary" onClick={handleSubmitAddMemberModal}>
            追加
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
