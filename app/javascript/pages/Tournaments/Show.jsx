import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import Header from "../../components/Shared/Header";
import Footer from "../../components/Shared/Footer";
import axiosInstance from "../../api/axiosInstance";

import { useTranslation } from "react-i18next";

export default function TournamentDetail() {
  const { t } = useTranslation();
  const { id } = useParams();
  const [tournament, setTournament] = useState({});
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    axiosInstance
      .get(`/tournaments/${id}`)
      .then((res) => {
        const data = res.data.tournament;
        setTournament(data);
        setVenues(data.tournament_venues_attributes || []);
        console.log(res.data.tournament);
      })
      .catch((e) => {
        console.error("Error fetching tournament data:", e);
      });
  }, [id]);

  const formatDate = (dateStr, options = {}) => {
    if (!dateStr) return "----/--/--";
    return new Date(dateStr).toLocaleDateString("ja-JP", options);
  };

  const camelCaseToPascalCase = (text) => {
    if (text) {
      return text
        .split("_")
        .map((word, index) =>
          index === 0
            ? word.toLowerCase()
            : word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join("");
    }
    return "";
  };

  return (
    <>
      <Header />
      <main>
        {/* Tournament Header */}
        <section className="tournament-header bg-green2 p-5 d-flex flex-wrap justify-content-between align-items-center">
          <div>
            <h6 className="text-muted">
              {formatDate(tournament.created_at, { year: "2-digit", month: "2-digit", day: "2-digit" })}
              &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
              {tournament.prefecture || "北海道"}
            </h6>
            <h1 className="fw-bold">{tournament.name || "大会名サンプル"}</h1>

            <div className="d-flex flex-wrap gap-2 mt-2">
              {tournament.tournament_categories_attributes &&
                tournament.tournament_categories_attributes.map((category) => {
                  const categoryKey = `tournament.${camelCaseToPascalCase(category.category_type)}`;
                  return (
                    <span key={category.id} className="badge bg-light text-dark p-2">
                      {t(categoryKey) || category.category_type}
                    </span>
                  );
                })}
            </div>
          </div>
          <div className="text-center mt-3 mt-md-0">
            <Link
              to={`/tournament/${id}/entry`}
              className="btn btn-success px-4 py-2 rounded-pill text-decoration-none"
              style={{ fontSize: "1rem" }}
            >
              エントリーする！
            </Link>
          </div>
        </section>

        {/* Tournament Overview */}
        <section className="tournament-overview p-5">
          <div className="text-center mb-5">
            <img src="/images/result-2.png" alt="Tournament Overview" className="img-fluid" />
            <h5 className="fw-bold mt-4">
              <Link to={`/tournament/${id}/entry`} className="text-decoration-none text-primary">
                エントリーの種類を選んでください
              </Link>
            </h5>
          </div>
          <div className="mt-5">
            <h3>{tournament.name || ""}</h3>
            <hr />
            {/* 開催日 */}
            <div className="d-flex mb-3">
              <div className="col-12 col-md-3">
                <h5>大会に関する情報</h5>
              </div>
              <div className="col-12 col-md-9">
              <p>{tournament.description || ""}</p>
              </div>
            </div>
            <hr />
            <div className="d-flex mb-3">
              <div className="col-12 col-md-3">
                <h5>参加対象者</h5>
              </div>
              <div className="col-12 col-md-9">
              <p>{tournament.note_for_participants || ""}</p>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <h3>運営団体</h3>
            <hr />
            {/* 開催日 */}
            <div className="d-flex mb-3">
              <div className="col-12 col-md-3">
                <h5>主催</h5>
              </div>
              <div className="col-12 col-md-9">
              <p>{tournament.organizer || ""}</p>
              </div>
            </div>
            <hr />
            <div className="d-flex mb-3">
              <div className="col-12 col-md-3">
                <h5>スポンサー</h5>
              </div>
              <div className="col-12 col-md-9">
              <p>{tournament.sponsor || ""}</p>
              </div>
            </div>
          </div>

          {/* Tournament Details */}
          <div className="mt-5">
            <h3>開催概要</h3>
            <hr />
            {/* 開催日 */}
            <div className="d-flex mb-3">
              <div className="col-12 col-md-3">
                <h5>開催日</h5>
              </div>
              <div className="col-12 col-md-9">
                {venues.length > 0 ? (
                  venues.map((venue) => (
                    <div key={venue.id} className="mb-2">
                      <p><strong>日程:</strong> {formatDate(venue.venue_date, { year: "numeric", month: "long", day: "numeric" }) || ""}</p>
                      <p><strong>会場名:</strong> {venue.venue_name || ""}</p>
                      <p><strong>住所:</strong> {venue.venue_address || ""}</p>
                    </div>
                  ))
                ) : (
                  <p>会場情報準備中</p>
                )}
              </div>
            </div>
            <hr />

            {/* 試合当日のスケジュール */}
            <div className="d-flex mb-3">
              <div className="col-12 col-md-3">
                <h5>試合当日のスケジュール</h5>
              </div>
              <div className="col-12 col-md-9">
                <p>
                  開場{formatDate(tournament.match_start_time, { hour: "2-digit", minute: "2-digit" })} 〜
                  {/* {formatDate(tournament.match_end_time, { hour: "2-digit", minute: "2-digit" })} */}
                </p>
              </div>
            </div>
            <hr />
            
            {/* エントリー受付期間*/}
            <div className="d-flex mb-3">
              <div className="col-12 col-md-3">
                <h5>エントリー受付期間</h5>
              </div>
              <div className="col-12 col-md-9">
                <p>
                  {formatDate(tournament.registeration_time, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    weekday: 'long',
                    hour: "2-digit",
                    minute: "2-digit"
                  }).replace(/(\d+)月/, '$1月').replace(/(\d+)日/, '$1日').replace(/年 /, '年')} 〜
                  {formatDate(tournament.application_deadline, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    weekday: 'long',
                    hour: "2-digit",
                    minute: "2-digit"
                  }).replace(/(\d+)月/, '$1月').replace(/(\d+)日/, '$1日').replace(/年 /, '年')}
                </p>
              </div>
            </div>
            <hr />

            {/* 競技方式 */}
            <div className="d-flex mb-3">
              <div className="col-12 col-md-3 d-flex align-items-center">
                <h5>競技規則</h5>
                <i className="fa fa-question-circle text-success ms-2" title="詳細説明を表示"></i>
              </div>
              <div className="col-12 col-md-9">
                <p>{tournament.competition_format || "競技方式サンプル"}</p>
              </div>
            </div>
            <hr />

            {/* 参加資格 */}
            <div className="d-flex mb-3">
              <div className="col-12 col-md-3">
                <h5>参加資格</h5>
              </div>
              <div className="col-12 col-md-9">
                <p>{tournament.participation_eligibility || "参加資格サンプル"}</p>
              </div>
            </div>
            <hr />

            {/* 競技規則 */}
            <div className="d-flex mb-3">
              <div className="col-12 col-md-3">
                <h5>競技規則</h5>
              </div>
              <div className="col-12 col-md-9">
                <p>{tournament.competition_rules || "競技規則サンプル"}</p>
              </div>
            </div>
            <hr />

            {/* 総定員数 */}
            <div className="d-flex mb-3">
              <div className="col-12 col-md-3 d-flex align-items-center">
                <h5>総定員数</h5>
                <i className="fa fa-question-circle text-success ms-2" title="詳細説明を表示"></i>
              </div>
              <div className="col-12 col-md-9">
                <p>{tournament.max_participants || ""}チーム</p>
                <small className="text-muted">
                  エントリー期間中であっても、総定員数に達した時点でエントリーを締め切らせていただく場合があります。
                </small>
              </div>
            </div>
            <hr />

            {/* メンバーチェンジについて */}
            <div className="d-flex mb-3">
              <div className="col-12 col-md-3">
                <h5>メンバーチェンジについて</h5>
              </div>
              <div className="col-12 col-md-9">
                <p>
                  {tournament.presence_of_member_changes === 'yes' 
                    ? '許可する' 
                    : tournament.presence_of_member_changes === 'no' 
                      ? '許可しない' 
                      : ''}
                </p>
              </div>
            </div>
            <hr />

            {/* 複数種目への重複エントリー */}
            <div className="d-flex mb-3">
              <div className="col-12 col-md-3">
                <h5>複数種目への重複エントリー</h5>
              </div>
              <div className="col-12 col-md-9">
                <p>{tournament.entry_in_multiple_events || "重複エントリーについてサンプル"}</p>
              </div>
            </div>
            <hr />

            {/* 申込後のキャンセル */}
            <div className="d-flex mb-3">
              <div className="col-12 col-md-3">
                <h5>申込後のキャンセル</h5>
              </div>
              <div className="col-12 col-md-9">
                <p>{tournament.cancellation_after_application || ""}</p>
              </div>
            </div>
            <hr />

            {/* 服装について */}
            <div className="d-flex mb-3">
              <div className="col-12 col-md-3">
                <h5>服装について</h5>
              </div>
              <div className="col-12 col-md-9">
                <p>{tournament.costume_detail || ""}</p>
              </div>
            </div>
            <hr />

            {/* シャトルについて */}
            {/* <div className="d-flex mb-3">
              <div className="col-12 col-md-3">
                <h5>シャトルについて</h5>
              </div>
              <div className="col-12 col-md-9">
                <p>{tournament.transport_information || "シャトルについてサンプル"}</p>
              </div>
            </div>
            <hr /> */}

            {/* その他備考 */}
            {/* <div className="d-flex mb-3">
              <div className="col-12 col-md-3">
                <h5>その他備考</h5>
              </div>
              <div className="col-12 col-md-9">
                <p>{tournament.note_for_participants || "その他備考サンプル"}</p>
              </div>
            </div> */}
          </div>

          {/* Tournament Categories Accordion */}
          <div className="accordion mt-4" id="categories-accordion">
            {tournament.tournament_categories_attributes &&
              tournament.tournament_categories_attributes.map((category, index) => {
                const categoryKey = `tournament.${camelCaseToPascalCase(category.category_type)}`;
                return (
                  <div
                    key={category.id}
                    className="accordion-item border rounded-3 border-color-silver overflow-hidden mb-3"
                  >
                    <h2 className="accordion-header" id={`heading${index}`}>
                      <button
                        className={`accordion-button ${index !== 0 ? "collapsed" : ""}`}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse${index}`}
                        aria-expanded={index === 0 ? "true" : "false"}
                        aria-controls={`collapse${index}`}
                      >
                        {t(categoryKey) || `カテゴリー ${index + 1}`}
                      </button>
                    </h2>
                    <div
                      id={`collapse${index}`}
                      className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`}
                      aria-labelledby={`heading${index}`}
                      data-bs-parent="#categories-accordion"
                    >
                      <div className="accordion-body">
                        <p><strong>種目:</strong> {t(categoryKey) || "種目サンプル"}</p>
                        <p><strong>種目:</strong> {category.division_number || "部数"}</p>
                        <p><strong>種目別定員:</strong> {tournament.capacity || "定員サンプル"}</p>
                        <p><strong>メンバー人数:</strong> {category.number_of_members || "人数サンプル"}</p>
                        <p><strong>参加費用:</strong> {tournament.participation_fee || "費用サンプル"}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>

          {/* Categories List */}
          <div className="d-flex flex-wrap gap-2 mt-2">
            {tournament.tournament_categories_attributes &&
              tournament.tournament_categories_attributes.map((category) => {
                const categoryKey = `tournament.${camelCaseToPascalCase(category.category_type)}`;
                return (
                  <span key={category.id} className="badge bg-light text-dark p-2">
                    {t(categoryKey)}
                  </span>
                );
              })}
          </div>
        </section>

        {/* Contact Information */}
        <section className="contact-information p-5 bg-light">
          <h3>お問い合わせ先</h3>
          <div className="row">
            <div className="col-md-6 mb-4">
              <div className="contact-box p-3 border rounded">
                <h5>{tournament.organization_name}</h5>
                <p><strong>受付担当:</strong> {tournament.organizer}</p>
                {/* <p>TEL: <a href="tel:09069964270">090-6996-4270</a></p> */}
                <p>Mail: <a href="mailto:kstyle0327@gmail.com">{tournament.inquiry_contact_information}</a></p>
              </div>
            </div>
          </div>
        </section>

        {/* Past Tournament Results */}
        <section className="past-results p-5">
          <h3>過去の大会結果</h3>
          {tournament.past_results && tournament.past_results.length > 0 ? (
            <ul className="list-group">
              {tournament.past_results.map((result, index) => (
                <li key={index} className="list-group-item">
                  {result}
                </li>
              ))}
            </ul>
          ) : (
            <p>過去の大会結果はございません。</p>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
