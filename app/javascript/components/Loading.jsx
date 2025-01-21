import React from 'react';

const Loading = ({isShow}) => {
  return (
    <>
      {isShow && (
        <div className="d-flex justify-content-center sprin-custom position-absolute top-0 start-0 bg-silver9 w-100 h-100">
          <div className="spinner-border m-auto" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Loading;
