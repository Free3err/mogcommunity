import React from 'react';
import './style.css';

const Loading = ({ loading, children }) => {
  return (
    <div className="loading-container">
      {loading ? (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      ) : null}
      <div className={loading ? 'content-hidden' : ''}>
        {children}
      </div>
    </div>
  );
};

export default Loading;