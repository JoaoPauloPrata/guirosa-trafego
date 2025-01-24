import React from 'react';
import logo from '../assets/logo.png';

const Header = () => {
  return (
    <header className="header">
      <div className="profile">
        <img src={logo} alt="Logo" className="logo" />
        <div className="profile-info">
          <h1>Fractal</h1>
          <p>@Fractal</p>
        </div>
      </div>
    </header>
  );
};

export default Header; 