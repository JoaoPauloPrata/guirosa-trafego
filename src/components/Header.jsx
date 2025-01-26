import React from 'react';
import '../styles/Header.css';

const Header = ({ client, onBack }) => {
  return (
    <header className="header">
      <div className="profile">
        {onBack && (
          <button className="back-button" onClick={onBack}>
            ←
          </button>
        )}
        <img src={client?.logo} alt={client?.name} className="logo" />
        <div className="profile-info">
          <h1>{client?.name}</h1>
          <p>@{client?.name.toLowerCase().replace(/\s+/g, '')}</p>
        </div>
      </div>
    </header>
  );
};

export default Header; 