import React from 'react';
import '../styles/ErrorPopup.css';

const ErrorPopup = ({ message, onClose }) => {
  return (
    <div className="error-popup-overlay">
      <div className="error-popup">
        <div className="error-popup-content">
          <div className="error-icon">⚠️</div>
          <h3>Erro</h3>
          <p>{message}</p>
          <button onClick={onClose}>OK</button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPopup; 