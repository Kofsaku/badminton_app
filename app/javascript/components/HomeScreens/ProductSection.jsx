import React from 'react';
import { useTranslation } from 'react-i18next';

const ProductSection = () => {
  const { t } = useTranslation();

  const products = [
    { image: "images/racket-1.png", id: 1 },
    { image: "images/racket-1.png", id: 2 },
    { image: "images/racket-1.png", id: 3 },
    { image: "images/racket-1.png", id: 4 },
    { image: "images/racket-1.png", id: 5 },
    { image: "images/racket-1.png", id: 6 }
  ];

  return (
    <section className="bg-silver4 py-5">
      <div className="container">
        <div className="d-block w-100 py-4">
          <div className="d-block w-100 mb-5 text-center">
            <h3 className="text-green3 text-35 mob-text-30 m-0">
              <span className="d-inline-block border-bottom border-color-green fw-bold">
                {t('home.products.title')}
              </span>
            </h3>
          </div>
          <div className="d-block w-100">
            <div className="row">
              {products.map((product) => (
                <div key={product.id} className="col-lg-4 col-md-4 col-sm-6 col-12 mb-4">
                  <div className="d-block w-100 product-box text-center py-4 px-2">
                    <img 
                      src={product.image} 
                      alt={`Product ${product.id}`} 
                      className="mb-3" 
                    />
                    <h4 className="mt-0 mb-2 text-green3 text-18 fw-bold">
                      {t('home.products.storeName')}
                    </h4>
                    <p className="m-0 text-grey1 text-15">
                      {t('home.products.itemName')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
