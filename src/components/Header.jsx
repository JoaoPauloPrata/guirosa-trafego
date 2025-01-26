import React from 'react';
import '../styles/Header.css';

const Header = ({ client }) => {
  return (
    <header className="header">
      <div className="profile">
       
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