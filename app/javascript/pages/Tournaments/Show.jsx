import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Header from "../../components/Shared/Header";
import Footer from "../../components/Shared/Footer";
import axiosInstance from "../../api/axiosInstance";

export default function () {
  const params = useParams();
  const [tournamentData, setTournamentData] = useState(null);

  useEffect(() => {
    axiosInstance
      .get(`/tournaments/${params.id}`)
      .then((res) => {
        console.log(res.data);
        setTournamentData(res.data.tournament);
      })
      .catch((e) => {});
  }, []);

  return (
    <>
      <Header />
      <main>
        <div className="bg-green2 p-5 w-100 d-flex justify-content-between">
          <div>
            <h5>
              {tournamentData?.name}
              &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
              {tournamentData?.name}
            </h5>
            <h4 className="fw-bold">入国詳細に入る</h4>
            <div className="d-flex flex-wrap gap-2">
              <p className="bg-light p-3">{tournamentData?.name}</p>
              <p className="bg-light p-3">{tournamentData?.name}</p>
              <p className="bg-light p-3">{tournamentData?.name}</p>
              <p className="bg-light p-3">{tournamentData?.name}</p>
              <p className="bg-light p-3">{tournamentData?.name}</p>
            </div>
          </div>
          <div>
            <h5 className="bg-light p-3 text-center">{tournamentData?.name}</h5>
            <h4 className="bg-light p-5 text-center">{tournamentData?.name}</h4>
          </div>
        </div>
        <div className="p-5">
          <h6 className="text-green2 fw-bold mb-3">
            エントリーの種類を選んでください
          </h6>
          <img src="/images/result-2.png" alt="tournament" />
          <h5 className="fw-bold mt-5">エントリーの種類を選んでください</h5>
          <div className="mt-5">
            <h6>◆クロスミントン◆</h6>
            <p>
              「クロスミントン」は欧米で話題の新スポーツで、一言で言えば「ネットのないバドミントン」です。
            </p>
            <p>
              いつでもどこでも誰とでも遊べるのが特徴です。ヨーロッパを中心に世界中で人気があり、世界各国でトーナメン
              トが開催されています。
            </p>
            <p>
              日本はアジア、そして世界のリーダーであり、国内のプレーヤーの数は増加しています。近い将来日本でも流行ると
              言われている新しいスポーツです。
            </p>
          </div>
          <div className="mt-5">
            <h6>◆概要◆</h6>
            <p>
              日本クロスミントン協会が主催するシングルスのレベル別全国大会です。
              参加者には全国ランキングポイントが付与されます。
            </p>
            <p>
              ※エントリーはレベル別クラス制となりますので、競技レベルに関わらずご参加いただけます。
            </p>
            <p>&lt;カテゴリー&gt;</p>
            <ul>
              <li>
                男子チャレンジリーグ&lt;7月14日(日) 開催&gt;→7月5日(金)申込締切
              </li>
              <li>
                女子チャレンジリーグ&lt;7月14日(日) 開催&gt;→7月5日(金)
                申込締切・男子トップリーグ (2部) ) &lt;月20日
                (土)開催&gt;・女子トップリーグ (2部) &lt;7月20日(土)開催&gt;
              </li>
              <li>
                男子トップリーグ (1部) オープン (男女共) &lt;7月27日(土)開催&gt;
              </li>
            </ul>
          </div>
          <h5 className="fw-bold mt-5">エントリーの種類を選んでください</h5>
          <div className="mt-5">
            <h6>◆クロスミントン◆</h6>
            <p>
              「クロスミントン」は欧米で話題の新スポーツで、一言で言えば「ネットのないバドミントン」です。
            </p>
            <p>
              いつでもどこでも誰とでも遊べるのが特徴です。ヨーロッパを中心に世界中で人気があり、世界各国でトーナメン
              トが開催されています。
            </p>
            <p>
              日本はアジア、そして世界のリーダーであり、国内のプレーヤーの数は増加しています。近い将来日本でも流行ると
              言われている新しいスポーツです。
            </p>
          </div>
          <div className="mt-5">
            <h6>◆概要◆</h6>
            <p>
              日本クロスミントン協会が主催するシングルスのレベル別全国大会です。
              参加者には全国ランキングポイントが付与されます。
            </p>
            <p>
              ※エントリーはレベル別クラス制となりますので、競技レベルに関わらずご参加いただけます。
            </p>
            <p>&lt;カテゴリー&gt;</p>
            <ul>
              <li>
                男子チャレンジリーグ&lt;7月14日(日) 開催&gt;→7月5日(金)申込締切
              </li>
              <li>
                女子チャレンジリーグ&lt;7月14日(日) 開催&gt;→7月5日(金)
                申込締切・男子トップリーグ (2部) ) &lt;月20日
                (土)開催&gt;・女子トップリーグ (2部) &lt;7月20日(土)開催&gt;
              </li>
              <li>
                男子トップリーグ (1部) オープン (男女共) &lt;7月27日(土)開催&gt;
              </li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
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
