import React from 'react';

const StorySection = () => {
  return (
    <section className="pb-5 pt-4 mb-4">
      <div className="container">
        <div className="d-block w-100">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-5">
              <div className="d-block w-100 text-center">
                <img src="images/our-story.png" className="story-image" alt="Our Story" />
                <h4 className="story-tag">
                  <span className="bg-green1 rounded-3 px-4 py-3 text-25 mob-text-20 text-white"> Since 2002 </span>
                </h4>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-5">
              <div className="d-block w-100">
                <h3 className="text-green3 mt-0 fw-bold text-35 mb-3"> Our Story </h3>
                <p className="text-grey1 mb-3 mt-0">
                  Lorem ipsum dolor sit amet consectetur. Facilisi facilisi integer elementum duis gravida neque eu porta. Quis mauris sed hendrerit purus ultrices pellentesque ultrices sed.
                </p>
                <p className="text-grey1 mb-3 mt-0">
                  Lorem ipsum dolor sit amet consectetur. Facilisi facilisi integer elementum duis gravida neque eu porta. Quis mauris sed hendrerit purus ultrices pellentesque ultrices sed.
                </p>
                <p className="text-grey1 mb-3 mt-0">
                  Lorem ipsum dolor sit amet consectetur. Facilisi facilisi integer elementum duis gravida neque eu porta. Quis mauris sed hendrerit purus ultrices pellentesque ultrices sed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
