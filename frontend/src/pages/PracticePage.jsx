import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const PracticePage = () => {
  const [step, setStep] = useState('start');
  const [image, setImage] = useState(null);
  const [timer, setTimer] = useState(30);
  const [writingTimer, setWritingTimer] = useState(300);

  const intervalRef = useRef(null);
  const navigate = useNavigate();

  // Ringer sound ref
  const audioRef = useRef(new Audio('/ringer.mp3'));

  const playRinger = () => {
    const audio = audioRef.current;
    audio.currentTime = 0;
    audio.play().catch(() => {
      // Handle play() failure if needed (e.g. user hasn't interacted yet)
    });
  };

  const fetchRandomImage = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/images/random');
      const data = await res.json();
      setImage(data.image);
    } catch (error) {
      alert('Failed to load image');
    }
  };

  // Observe image timer (30 sec)
  useEffect(() => {
    if (step === 'showImage') {
      fetchRandomImage();
      setTimer(30);
      playRinger(); // 🔔 start observation sound

      intervalRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            clearInterval(intervalRef.current);
            playRinger(); // 🔔 end observation sound
            setStep('writeStory');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [step]);

  // Writing story timer (5 min)
  useEffect(() => {
    if (step === 'writeStory') {
      setWritingTimer(300);
      playRinger(); // 🔔 start writing timer

      intervalRef.current = setInterval(() => {
        setWritingTimer((prev) => {
          if (prev === 1) {
            clearInterval(intervalRef.current);
            playRinger(); // 🔔 end writing timer
            setStep('finished');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [step]);

  // Disable browser navigation (back/forward) during writeStory step
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (step === 'writeStory') {
        e.preventDefault();
        e.returnValue = ''; // Standard way to trigger confirmation dialog
        return '';
      }
    };

    const handlePopState = () => {
      if (step === 'writeStory') {
        // Push the same state again to prevent back navigation
        window.history.pushState(null, '', window.location.href);
        alert('Navigation is disabled during story writing. Please use Emergency Exit.');
      }
    };

    if (step === 'writeStory') {
      // Push state to prevent going back initially
      window.history.pushState(null, '', window.location.href);
      window.addEventListener('popstate', handlePopState);
      window.addEventListener('beforeunload', handleBeforeUnload);
    } else {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [step]);

  const handleStartClick = () => setStep('confirm');

  const handleConfirm = (answer) => {
    if (answer === 'yes') setStep('showImage');
    else setStep('start');
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const containerStyle = {
    textAlign: 'center',
    padding: '2rem',
    maxWidth: '800px',
    margin: '0 auto'
  };

  const buttonStyle = {
    padding: '0.5rem 1rem',  // smaller size
    fontSize: '1rem',
    margin: '0.5rem',
    cursor: 'pointer'
  };

  const emergencyButtonStyle = {
    background: '#e74c3c',
    color: 'white',
    padding: '0.3rem 0.8rem',  // even smaller for emergency
    fontSize: '0.9rem',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '4px'
  };

  return (
    <div style={containerStyle}>
      {/* Emergency Exit button */}
      {step !== 'finished' && (
        <div style={{ textAlign: 'right', marginBottom: '1rem' }}>
          <button onClick={() => navigate('/')} style={emergencyButtonStyle}>
            Emergency Exit
          </button>
        </div>
      )}

      {step === 'start' && (
        <>
        <p>Prepare youself for PP&DT - All the best!</p>
        <button onClick={handleStartClick} style={buttonStyle}>
          Start
        </button>
        </>
      )}

      {step === 'confirm' && (
        <>
          <p>Are you sure you want to start the practice?</p>
          <button onClick={() => handleConfirm('yes')} style={buttonStyle}>
            Yes
          </button>
          <button onClick={() => handleConfirm('no')} style={buttonStyle}>
            No
          </button>
        </>
      )}

      {step === 'showImage' && (
        <>
          <h2>Observe the image</h2>
          {image ? (
            <img
              src={`http://localhost:5000${image}`}
              alt="PPDT"
              style={{ maxWidth: '100%', maxHeight: '60vh', margin: '1rem 0' }}
            />
          ) : (
            <p>Loading image...</p>
          )}
          <p>Time left: {formatTime(timer)}</p>
        </>
      )}

      {step === 'writeStory' && (
        <>
          <h2>Write your story now</h2>
          <p>Timer: {formatTime(writingTimer)}</p>
          <p>(No input field here, just timer as per requirements.)</p>
          <p style={{ color: 'red', fontWeight: 'bold' }}>
            Browser navigation is disabled during story writing. Please use Emergency Exit to leave.
          </p>
        </>
      )}

      {step === 'finished' && (
        <>
          <h2>Practice finished!</h2>
          <p>Well done. You can restart with another image.</p>
          <button onClick={() => setStep('confirm')} style={buttonStyle}>
            Restart
          </button>
        </>
      )}
    </div>
  );
};

export default PracticePage;
