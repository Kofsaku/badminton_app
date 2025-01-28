import React from 'react';
import Header from './Shared/Header';
import CtaSection from './Shared/CtaSection';
import Footer from './Shared/Footer';

const PrivacyPolicy = () => {

  return (
    <div>
      <Header />
      <section className="py-5 my-2">
        <div className="container">
          <div className="d-block w-100 text-center">
            <h3 className="text-green3 mt-0 mb-2 text-32 fw-bold">特定商取引法</h3>
          </div>
        </div>
      </section>
      <section className="pb-5">
        <div className="container">
          <div className="d-block w-100">
            <div className="d-block text-16 mt-0 mb-3 text-green3 lh-normal">
              <p>特定商取引法に基づく表記</p>
              <p>
                <div>事業者</div>
                <div>株式会社ワープ</div>
              </p>
              <p>
                <div>運営責任者</div>
                <div>亀井　弘樹</div>
              </p>
              <p>
                <div>住所</div>
                <div>〒577-0028　大阪府　東大阪市　新家西町6-8　新家ｸﾞﾗﾝﾄﾞﾊｲﾂ402</div>
              </p>
              <p>
                <div>電話番号</div>
                <div>06-6784-2343</div>
                <div>メールアドレス</div>
                <div>warp-osaka@nifty.com</div>
              </p>
              <p>
                <div>役務の対価</div>
                <div>各サービスの申込ページに表示</div>
              </p>
              <p>
                <div>対価以外に必要となる費用</div>
                <div>消費税、サービス利用時・問い合わせ時の通信料、参加費用支払時に支払を選択した際の決済手数料</div>
              </p>
              <p>
                <div>代金の支払方法</div>
                <div>クレジットカード決済</div>
              </p>
              <p>
                <div>代金の支払時期</div>
                <div>各サービスの申込時に入力したクレジットカードに課金します。</div>
              </p>
              <p>
                <div>役務の提供時期</div>
                <div>即時</div>
              </p>
              <p>
                <div>キャンセル（返品・交換/返品特約）</div>
                <div>申込後のキャンセルはできません。</div>
              </p>
              <p>
                <div>対応環境</div>
                <div>Chrome, Safari</div>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
