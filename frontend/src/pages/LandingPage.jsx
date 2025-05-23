import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const tests = [
    {
      name: 'PPDT',
      description: 'Picture Perception & Discussion Test',
      route: '/practice',
    },
    {
      name: 'TAT',
      description: 'Thematic Apperception Test',
      route: '/tat',
    },
    {
      name: 'WAT',
      description: 'Word Association Test',
      route: '/wat',
    },
    {
      name: 'SRT',
      description: 'Situation Reaction Test',
      route: '/srt',
    },
  ];

  const cardStyle = {
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '1.5rem',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    transition: '0.3s',
    background: '#fff',
  };

  const gridContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '2rem',
    maxWidth: '800px',
    margin: '2rem auto',
  };

  const buttonStyle = {
    marginTop: '1rem',
    padding: '0.6rem 1.2rem',
    fontSize: '1rem',
    cursor: 'pointer',
    border: 'none',
    background: '#3498db',
    color: 'white',
    borderRadius: '5px',
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Welcome to SSB Practice</h1>
      <p>Select a test to begin your preparation:</p>

      <div style={gridContainerStyle}>
        {tests.map((test) => (
          <div key={test.name} style={cardStyle}>
            <h2>{test.name}</h2>
            <p>{test.description}</p>
            <button
              onClick={() => navigate(test.route)}
              style={buttonStyle}
              disabled={test.route !== '/practice'} // Disable others for now
              title={test.route !== '/practice' ? 'Coming Soon' : ''}
            >
              Start
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
