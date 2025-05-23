import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ navDisabled }) => {
  const linkStyle = {
    color: navDisabled ? '#aaa' : 'white',
    textDecoration: 'none',
    marginRight: '1.5rem',
    pointerEvents: navDisabled ? 'none' : 'auto',
    cursor: navDisabled ? 'not-allowed' : 'pointer'
  };

  return (
    <nav style={{
      background: '#222',
      padding: '1rem',
      color: 'white',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap'
    }}>
      <h2 style={{ margin: 0 }}>SSB Practice App</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/practice" style={linkStyle}>PPDT</Link>
        <Link to="/tat" style={linkStyle}>TAT</Link>
        <Link to="/wat" style={linkStyle}>WAT</Link>
        <Link to="/srt" style={{ ...linkStyle, marginRight: 0 }}>SRT</Link>
      </div>
    </nav>
  );
};

export default Navbar;
