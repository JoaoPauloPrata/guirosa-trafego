import React from 'react';
import '../styles/Header.css';

const Header = ({ client }) => {
  const headerStyle = {
    backgroundColor: client?.defaultColor || '#000000',
    color: client?.textColor || '#FFFFFF' // Usa a cor do texto do relatório ou branco como fallback
  };

  return (
    <header className="header" style={headerStyle}>
      <div className="profile">
        <img src={client?.logo} alt={client?.name} className="logo" />
        <div className="profile-info">
          <h1 style={{ color: 'inherit' }}>{client?.name}</h1>
          <p style={{ color: 'inherit' }}>@{client?.name?.toLowerCase().replace(/\s+/g, '')}</p>
        </div>
      </div>
    </header>
  );
};

export default Header; 