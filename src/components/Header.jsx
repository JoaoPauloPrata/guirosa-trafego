import React from 'react';
import logo from '../assets/logo.png';

const Header = () => {
  return (
    <header className="header">
      <div className="profile">
        <img src={logo} alt="Alphatex" className="logo" />
        <div className="profile-info">
          <h1>Alphatex</h1>
          <p>@alphatextecidos</p>
        </div>
      </div>
    </header>
  );
};

export default Header; 