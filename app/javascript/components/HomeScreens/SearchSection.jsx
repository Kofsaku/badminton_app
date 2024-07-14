import React from 'react';

const SearchSection = () => {
  return (
    <section className="py-5">
      <div className="container">
        <div className="d-block w-100 mb-5">
          <h3 className="text-green3 fw-bold text-32 mob-text-28 m-0">SEARCH</h3>
        </div>
        <div className="d-block w-100">
          <div className="row">
            <div className="col-lg-3 col-md-3 col-sm-6 col-12 mb-5">
              <div className="d-block w-100">
                <h5 className="text-green3 mt-0 mb-3 text-18 fw-bold">Name of Tournament / Event</h5>
                <input type="text" className="field-style4" />
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12 mb-5">
              <div className="d-block w-100">
                <h5 className="text-green3 mt-0 mb-3 text-18 fw-bold">Classification</h5>
                <div className="d-flex w-100 align-items-start justify-content-start flex-wrap checkbox-selector-all">
                  <div className="d-inline-block checkbox-selector-wrapper checkbox-selector-active border border-color-silver2 rounded-2 px-4 me-2 py-2 position-relative">
                    <span className="text-14 d-inline-block">all</span>
                    <input type="checkbox" className="position-absolute checkbox-selector-1 opacity-0 top-0 start-0 w-100 h-100" />
                  </div>
                  <div className="d-inline-block checkbox-selector-wrapper border border-color-silver2 rounded-2 px-2 me-2 py-2 position-relative">
                    <span className="text-14 d-inline-block">tournament</span>
                    <input type="checkbox" className="position-absolute checkbox-selector-1 opacity-0 top-0 start-0 w-100 h-100" />
                  </div>
                  <div className="d-inline-block checkbox-selector-wrapper border border-color-silver2 rounded-2 px-2 py-2 position-relative">
                    <span className="text-14 d-inline-block">event</span>
                    <input type="checkbox" className="position-absolute checkbox-selector-1 opacity-0 top-0 start-0 w-100 h-100" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12 mb-5">
              <div className="d-block w-100">
                <h5 className="text-green3 mt-0 mb-3 text-18 fw-bold">Dates</h5>
                <div className="row align-items-center">
                  <div className="col-lg-5 col-md-5 col-sm-5 col-5">
                    <input type="date" className="field-style4 w-100" />
                  </div>
                  <div className="col-lg-2 col-md-2 col-sm-2 col-2">
                    <span className="d-block text-center text-16 text-block">~</span>
                  </div>
                  <div className="col-lg-5 col-md-5 col-sm-5 col-5">
                    <input type="date" className="field-style4 w-100" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12 mb-5">
              <div className="d-block w-100">
                <h5 className="text-green3 mt-0 mb-3 text-18 fw-bold">Status</h5>
                <div className="d-flex w-100 align-items-start justify-content-start flex-wrap checkbox-selector-all">
                  <div className="d-inline-block checkbox-selector-wrapper border border-color-silver2 rounded-2 px-4 me-2 py-2 position-relative">
                    <span className="text-14 d-inline-block">all</span>
                    <input type="checkbox" className="position-absolute checkbox-selector-1 opacity-0 top-0 start-0 w-100 h-100" />
                  </div>
                  <div className="d-inline-block checkbox-selector-wrapper border border-color-silver2 rounded-2 px-2 me-2 py-2 position-relative">
                    <span className="text-14 d-inline-block">tournament</span>
                    <input type="checkbox" className="position-absolute checkbox-selector-1 opacity-0 top-0 start-0 w-100 h-100" />
                  </div>
                  <div className="d-inline-block checkbox-selector-wrapper checkbox-selector-active border border-color-silver2 rounded-2 px-2 py-2 position-relative">
                    <span className="text-14 d-inline-block">event</span>
                    <input type="checkbox" className="position-absolute checkbox-selector-1 opacity-0 top-0 start-0 w-100 h-100" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12 mb-5">
              <div className="d-block w-100">
                <h5 className="text-green3 mt-0 mb-3 text-18 fw-bold">Region</h5>
                <div className="d-flex w-100 align-items-start justify-content-start flex-wrap checkbox-selector-all">
                  <div className="d-inline-block mb-2 checkbox-selector-wrapper border border-color-silver2 rounded-2 px-4 me-2 py-2 position-relative">
                    <span className="text-14 d-inline-block">all</span>
                    <input type="checkbox" className="position-absolute checkbox-selector-1 opacity-0 top-0 start-0 w-100 h-100" />
                  </div>
                  <div className="d-inline-block mb-2 checkbox-selector-wrapper border border-color-silver2 rounded-2 px-2 me-2 py-2 position-relative">
                    <span className="text-14 d-inline-block">Hokkaido</span>
                    <input type="checkbox" className="position-absolute checkbox-selector-1 opacity-0 top-0 start-0 w-100 h-100" />
                  </div>
                  <div className="d-inline-block checkbox-selector-wrapper checkbox-selector-active border border-color-silver2 rounded-2 mb-2 me-2 px-2 py-2 position-relative">
                    <span className="text-14 d-inline-block">northeast</span>
                    <input type="checkbox" className="position-absolute checkbox-selector-1 opacity-0 top-0 start-0 w-100 h-100" />
                  </div>
                  <div className="d-inline-block checkbox-selector-wrapper border border-color-silver2 rounded-2 mb-2 me-2 px-2 py-2 position-relative">
                    <span className="text-14 d-inline-block">Kanto</span>
                    <input type="checkbox" className="position-absolute checkbox-selector-1 opacity-0 top-0 start-0 w-100 h-100" />
                  </div>
                  <div className="d-inline-block checkbox-selector-wrapper border border-color-silver2 rounded-2 me-2 mb-2 px-2 py-2 position-relative">
                    <span className="text-14 d-inline-block">Hokuriku</span>
                    <input type="checkbox" className="position-absolute checkbox-selector-1 opacity-0 top-0 start-0 w-100 h-100" />
                  </div>
                  <div className="d-inline-block checkbox-selector-wrapper border border-color-silver2 rounded-2 me-2 mb-2 px-2 py-2 position-relative">
                    <span className="text-14 d-inline-block">Koshinetsu</span>
                    <input type="checkbox" className="position-absolute checkbox-selector-1 opacity-0 top-0 start-0 w-100 h-100" />
                  </div>
                  <div className="d-inline-block checkbox-selector-wrapper border border-color-silver2 rounded-2 me-2 mb-2 px-2 py-2 position-relative">
                    <span className="text-14 d-inline-block">Tokai</span>
                    <input type="checkbox" className="position-absolute checkbox-selector-1 opacity-0 top-0 start-0 w-100 h-100" />
                  </div>
                  <div className="d-inline-block checkbox-selector-wrapper border border-color-silver2 rounded-2 me-2 mb-2 px-2 py-2 position-relative">
                    <span className="text-14 d-inline-block">China</span>
                    <input type="checkbox" className="position-absolute checkbox-selector-1 opacity-0 top-0 start-0 w-100 h-100" />
                  </div>
                  <div className="d-inline-block checkbox-selector-wrapper border border-color-silver2 rounded-2 me-2 mb-2 px-2 py-2 position-relative">
                    <span className="text-14 d-inline-block">Shikoku</span>
                    <input type="checkbox" className="position-absolute checkbox-selector-1 opacity-0 top-0 start-0 w-100 h-100" />
                  </div>
                  <div className="d-inline-block checkbox-selector-wrapper border border-color-silver2 rounded-2 me-2 mb-2 px-2 py-2 position-relative">
                    <span className="text-14 d-inline-block">Kinki</span>
                    <input type="checkbox" className="position-absolute checkbox-selector-1 opacity-0 top-0 start-0 w-100 h-100" />
                  </div>
                  <div className="d-inline-block checkbox-selector-wrapper border border-color-silver2 rounded-2 me-2 mb-2 px-2 py-2 position-relative">
                    <span className="text-14 d-inline-block">Kyushu</span>
                    <input type="checkbox" className="position-absolute checkbox-selector-1 opacity-0 top-0 start-0 w-100 h-100" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12 mb-5">
              <div className="d-block w-100">
                <h5 className="text-green3 mt-0 mb-3 text-18 fw-bold">Venue</h5>
                <div className="d-flex w-100 align-items-start justify-content-start flex-wrap checkbox-selector-all">
                  <div className="d-inline-block checkbox-selector-wrapper border border-color-silver2 rounded-2 px-4 me-2 py-2 position-relative">
                    <span className="text-14 d-inline-block">all</span>
                    <input type="checkbox" className="position-absolute checkbox-selector-1 opacity-0 top-0 start-0 w-100 h-100" />
                  </div>
                  <div className="d-inline-block checkbox-selector-wrapper border border-color-silver2 rounded-2 px-2 me-2 py-2 position-relative">
                    <span className="text-14 d-inline-block">main venue</span>
                    <input type="checkbox" className="position-absolute checkbox-selector-1 opacity-0 top-0 start-0 w-100 h-100" />
                  </div>
                  <div className="d-inline-block checkbox-selector-wrapper border border-color-silver2 rounded-2 px-2 py-2 position-relative">
                    <span className="text-14 d-inline-block">remote venue</span>
                    <input type="checkbox" className="position-absolute checkbox-selector-1 opacity-0 top-0 start-0 w-100 h-100" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12 mb-5">
              <div className="d-block w-100">
                <h5 className="text-green3 mt-0 mb-3 text-18 fw-bold">Match Format</h5>
                <div className="d-flex w-100 align-items-start justify-content-start flex-wrap checkbox-selector-all">
                  <div className="d-inline-block checkbox-selector-wrapper border border-color-silver2 rounded-2 px-4 me-2 py-2 position-relative">
                    <span className="text-14 d-inline-block">all</span>
                    <input type="checkbox" className="position-absolute checkbox-selector-1 opacity-0 top-0 start-0 w-100 h-100" />
                  </div>
                  <div className="d-inline-block checkbox-selector-wrapper border border-color-silver2 rounded-2 px-2 me-2 py-2 position-relative">
                    <span className="text-14 d-inline-block">team</span>
                    <input type="checkbox" className="position-absolute checkbox-selector-1 opacity-0 top-0 start-0 w-100 h-100" />
                  </div>
                  <div className="d-inline-block checkbox-selector-wrapper border border-color-silver2 rounded-2 px-2 py-2 position-relative">
                    <span className="text-14 d-inline-block">single</span>
                    <input type="checkbox" className="position-absolute checkbox-selector-1 opacity-0 top-0 start-0 w-100 h-100" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12 mb-5">
              <div className="d-block w-100">
                <h5 className="text-green3 mt-0 mb-3 text-18 fw-bold">Participation Type</h5>
                <div className="d-flex w-100 align-items-start justify-content-start flex-wrap checkbox-selector-all">
                  <div className="d-inline-block checkbox-selector-wrapper border border-color-silver2 rounded-2 px-4 me-2 py-2 position-relative">
                    <span className="text-14 d-inline-block">all</span>
                    <input type="checkbox" className="position-absolute checkbox-selector-1 opacity-0 top-0 start-0 w-100 h-100" />
                  </div>
                  <div className="d-inline-block checkbox-selector-wrapper border border-color-silver2 rounded-2 px-2 me-2 py-2 position-relative">
                    <span className="text-14 d-inline-block">domestic</span>
                    <input type="checkbox" className="position-absolute checkbox-selector-1 opacity-0 top-0 start-0 w-100 h-100" />
                  </div>
                  <div className="d-inline-block checkbox-selector-wrapper border border-color-silver2 rounded-2 px-2 py-2 position-relative">
                    <span className="text-14 d-inline-block">international</span>
                    <input type="checkbox" className="position-absolute checkbox-selector-1 opacity-0 top-0 start-0 w-100 h-100" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-12 mb-5">
              <button type="button" className="btn btn-lg text-16 text-white bg-green3 d-inline-flex align-items-center justify-content-center">Search</button>
            </div>

            <div className="d-block w-100">
               <a href="" className="bg-green1 bg-hover-black text-white rounded-pill px-4 py-2 lh-lg border-0 text-16">
                 <i className="fa fa-search text-16 me-2"> </i>
                 Search for tournaments with these conditions
               </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
