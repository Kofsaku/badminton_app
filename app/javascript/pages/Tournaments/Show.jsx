import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Header from "../../components/Shared/Header";
import Footer from "../../components/Shared/Footer";
import axiosInstance from "../../api/axiosInstance";

export default function () {
  const params = useParams();
  const [tournamentData, setTournamentData] = useState({});
  const [venues, setVenues] = useState({})

  useEffect(() => {
    axiosInstance
      .get(`/tournaments/${params.id}`)
      .then((res) => {
        console.log(res.data.tournament);
        setTournamentData(res.data.tournament);
        setVenues(res.data.tournament.tournament_venues)
      })
      .catch((e) => {});
  }, []);

  const dateOptions = {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit'
  }

  return (
    <>
      <Header />
      <main>
        <div className="bg-green2 p-5 w-100 d-flex justify-content-between">
          <div>
            <h5>
              {new Date (tournamentData.created_at).toLocaleDateString("en-US", dateOptions)}
              &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
              {tournamentData?.prefecture}
            </h5>
            <h4 className="fw-bold">{tournamentData.name}</h4>
            <div className="d-flex flex-wrap gap-2">
              {tournamentData.tournament_categories_attributes && tournamentData.tournament_categories_attributes.map((category) => (
                <p key={category.id} className="bg-light p-3">{category.category_type}</p>
              ))}
              <p className="bg-light p-3">{tournamentData.registeration_time}</p>
              <p className="bg-light p-3">{tournamentData.award_details}</p>
            </div>
          </div>
          <div className="col-2">
            <h5 className="bg-light p-3 text-center">{tournamentData.organization_name}</h5>
            <h4 className="bg-light p-3 text-center">{tournamentData.organizer}</h4>
          </div>
        </div>
        <div className="p-5">
          <h6 className="text-green2 fw-bold mb-3">
            <a href={`/tournament/${params.id}/entry`}>
              エントリーの種類を選んでください
            </a>
          </h6>
          <img src="/images/result-2.png" alt="tournament"/>
          <h5 className="fw-bold mt-5">
            <a href={`/tournament/${params.id}/entry`}>
              エントリーの種類を選んでください
            </a>
          </h5>
          <div className="mt-5">
            <h6>◆Annoucements◆</h6>
            <p>{tournamentData.announcements}</p>
          </div>
          <div className="mt-5">
            <h6>◆Description◆</h6>
            <p>{tournamentData.description}</p>
          </div>
          <h5 className="fw-bold mt-5">
            <a href={`/tournament/${params.id}/entry`}>エントリーの種類を選んでください</a>
          </h5>
          <div className="mt-5">
            <h3>開催概要</h3>
            <hr />
            <div className="d-flex">
              <div className="col-3 mr-4">
                <h3>開催日</h3>
              </div>
              <div className="col-9">
                <div>{new Date(tournamentData.event_date).toLocaleDateString('ja-JP')}</div>
                {tournamentData.tournament_venues_attributes && tournamentData.tournament_venues_attributes.map((venue) => (
                  <div key={venue.id}>
                    <p>{'会場名: ' + venue.venue_name}</p>
                    <p>{'住所: ' + venue.venue_address}</p>
                  </div>
                ))}
              </div>
            </div>
            <hr />
            <div>
              <div className="d-flex">
                <div className="col-3 mr-4">
                  <h3>試合当日の スケジュール</h3>
                </div>
                <div className="col-9">
                  <div>{new Date(tournamentData.match_start_time).toLocaleDateString('ja-JP') + '~' + new Date(tournamentData.match_end_time).toLocaleDateString('ja-JP')}</div>
                </div>
              </div>
              <hr />
              <div className="d-flex">
                <div className="col-3 mr-4">
                  <h3>競技方式
                    <i className="fa fa-question-circle text-success"></i>
                  </h3>
                </div>
                <div className="col-9">
                  {tournamentData.competition_format}
                </div>
              </div>
              <hr />
              <div className="d-flex">
                <div className="col-3 mr-4">
                  <h3>参加資格</h3>
                </div>
                <div className="col-9">
                  {tournamentData.participation_eligibility}
                </div>
              </div>
              <hr />
              <div className="d-flex">
                <div className="col-3 mr-4">
                  <h3>競技規則</h3>
                </div>
                <div className="col-9">
                  {tournamentData.competition_rules}
                </div>
              </div>
              <hr />
              <div className="d-flex">
                <div className="col-3 mr-4">
                  <h3>総定員数
                    <i className="fa fa-question-circle text-success"></i>
                  </h3>
                </div>
                <div className="col-9">
                  {tournamentData.max_participants}
                </div>
              </div>
              <hr />
              <div className="d-flex">
                <div className="col-3 mr-4">
                  <h3>メンバーチェンジ について</h3>
                  <i class="bi bi-question-circle"></i>
                </div>
                <div className="col-9">
                  {tournamentData.presence_of_member_changes}
                </div>
              </div>
              <hr />
              <div className="d-flex">
                <div className="col-3 mr-4">
                  <h3>複数種目への 重複エントリー</h3>
                </div>
                <div className="col-9">
                  {tournamentData.entry_in_multiple_events}
                </div>
              </div>
              <hr />
              <div className="d-flex">
                <div className="col-3 mr-4">
                  <h3>申込後の キャンセル</h3>
                </div>
                <div className="col-9">
                  {tournamentData.cancellation_after_application}
                </div>
              </div>
              <hr />
              <div className="d-flex">
                <div className="col-3 mr-4">
                  <h3>服装について</h3>
                </div>
                <div className="col-9">
                  {tournamentData.costume_detail}
                </div>
              </div>
              <hr />
              <div className="d-flex">
                <div className="col-3 mr-4">
                  <h3>シャトルについて</h3>
                </div>
                <div className="col-9">
                  {tournamentData.transport_information}
                </div>
              </div>
              <hr />
              <div className="d-flex">
                <div className="col-3 mr-4">
                  <h3>その他備考</h3>
                </div>
                <div className="col-9">
                  {tournamentData.note_for_participants}
                </div>
              </div>
            </div>
            <div className="accordion mt-4" id="categories-accordion">
              {tournamentData.tournament_categories_attributes && tournamentData.tournament_categories_attributes.map((category, index) => (
                <div 
                  key={index} 
                  className="accordion-item border rounded-3 border-color-silver overflow-hidden mb-3"
                >
                  <h2 
                    className="accordion-header bg-transparent outline-none shadow-none" 
                    id={`heading${index}`}
                  >
                    <button
                      className={`accordion-button bg-light outline-none text-16 fw-bold shadow-none ${index !== 0 ? 'collapsed' : ''}`}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse${index}`}
                      aria-expanded={index === 0 ? 'true' : 'false'}
                      aria-controls={`collapse${index}`}
                    >
                      {category.category_type}
                    </button>
                  </h2>
                  <div
                    id={`collapse${index}`}
                    className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
                    aria-labelledby={`heading${index}`}
                    data-bs-parent="#categories-accordion"
                  >
                    <div className="accordion-body">
                      <p>{'種目: ' + category.category_type}</p>
                      <p>{'種目別定員: ' + tournamentData.capacity}</p>
                      <p>{'メンバー人数: ' + category.number_of_members}</p>
                      <p>{'参加費用: ' + tournamentData.participation_fee}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer/>
    </>
  );
}

// エントリーの種類を選んでください

// クロスミントン

// シングルス大会

// クロスミントン

// エントリーの種類を選んでください

// ◆クロスミントン◆

// 「クロスミントン」は欧米で話題の新スポーツで、一言で言えば「ネットのないバドミントン」です。

// いつでもどこでも誰とでも遊べるのが特徴です。ヨーロッパを中心に世界中で人気があり、世界各国でトーナメン トが開催されています。

// 日本はアジア、そして世界のリーダーであり、国内のプレーヤーの数は増加しています。近い将来日本でも流行ると 言われている新しいスポーツです。

// ◆概要◆

// 日本クロスミントン協会が主催するシングルスのレベル別全国大会です。 参加者には全国ランキングポイントが付与されます。

// ※エントリーはレベル別クラス制となりますので、競技レベルに関わらずご参加いただけます。

// <カテゴリー>

// ・男子チャレンジリーグ<7月14日(日) 開催>→7月5日(金)申込締切

// ・女子チャレンジリーグ<7月14日(日) 開催>→7月5日(金) 申込締切・男子トップリーグ (2部) ) <7月20日 (土)開催>・女子トップリーグ (2部) <7月20日(土)開催>

// ・男子トップリーグ (1部) オープン (男女共) <7月27日(土)開催>
