import React from 'react';
import './Spinner.css'

const Spinner = () => {
  return (
    <div id="spinner">
      <div className="spinner-container">
        <div className="spinner-border spinner" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  )
}

export default Spinner;
