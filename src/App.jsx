import React, { useState, useEffect, useRef } from 'react';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [inputDate, setInputDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [flowers, setFlowers] = useState([]);
  const [hearts, setHearts] = useState([]);
  const audioRef = useRef(null);

  // Generate flowers
  useEffect(() => {
    if (currentPage === 'birthday') {
      const newFlowers = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 10 + Math.random() * 5,
        type: ['🌸', '🌺', '🌷', '🌹', '💐', '🏵️'][Math.floor(Math.random() * 6)],
        size: 30 + Math.random() * 20
      }));
      setFlowers(newFlowers);

      const newHearts = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 4,
        duration: 8 + Math.random() * 4,
        size: 20 + Math.random() * 15
      }));
      setHearts(newHearts);
    }
  }, [currentPage]);

  const handleDateChange = (e) => {
    setInputDate(e.target.value);
    setErrorMessage('');
  };

  const handleOpen = () => {
    if (!inputDate) {
      setErrorMessage("Please enter a date 🎂");
      return;
    }
    
    const [year, month, day] = inputDate.split('-').map(Number);
    
    if (month === 11 && day === 4) {
      // Play music
      if (audioRef.current) {
        audioRef.current.play().catch(e => console.log('Audio play failed:', e));
      }
      setCurrentPage('birthday');
    } else {
      setErrorMessage("Looks like it's not your birthday yet 🎂");
    }
  };

  if (currentPage === 'home') {
    return (
      <div style={styles.homeContainer}>
        <div style={styles.floatingFlowers}>
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              style={{
                ...styles.floatingFlower,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${15 + Math.random() * 10}s`
              }}
            >
              {['🌸', '🌺', '🌷'][Math.floor(Math.random() * 3)]}
            </div>
          ))}
        </div>

        <div style={styles.glowingFrame}>
          <div style={styles.flowerDecoration}>🌸 🌺 🌸</div>
          <h1 style={styles.homeTitle}>🎀 Enter your birthday 🎀</h1>
          <input
            type="date"
            value={inputDate}
            onChange={handleDateChange}
            style={styles.dateInput}
            placeholder="YYYY-MM-DD"
          />
          <button 
            onClick={handleOpen}
            style={styles.openButton}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.boxShadow = '0 0 30px rgba(255, 105, 180, 0.8)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0 0 20px rgba(255, 105, 180, 0.6)';
            }}
          >
            Open 💝
          </button>
          {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}
          <div style={styles.flowerDecoration}>🌺 🌸 🌺</div>
        </div>
        <audio ref={audioRef} loop>
          <source src="C:\Users\asus\my-app\public\birthday.mp3" type="audio/mpeg" />
        </audio>
      </div>
    );
  }

  return (
    <div style={styles.birthdayContainer}>
      <div style={styles.sparkles}>
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            style={{
              ...styles.sparkle,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          >
            ✨
          </div>
        ))}
      </div>

      {flowers.map(flower => (
        <div
          key={flower.id}
          style={{
            ...styles.flower,
            left: `${flower.left}%`,
            fontSize: `${flower.size}px`,
            animationDelay: `${flower.delay}s`,
            animationDuration: `${flower.duration}s`
          }}
        >
          {flower.type}
        </div>
      ))}

      {hearts.map(heart => (
        <div
          key={heart.id}
          style={{
            ...styles.heart,
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`
          }}
        >
          💖
        </div>
      ))}

      <div style={styles.birthdayContent}>
        <div style={styles.flowerBorder}>
          <h1 style={styles.birthdayTitle}>Happy Birthday, Арайлым! 💖</h1>
          <p style={styles.birthdayMessage}>
            Пусть твой день будет наполнен радостью, любовью и прекрасными воспоминаниями. 🌸
          </p>
        </div>

        <div style={styles.photoGallery}>
          <div style={styles.photoCard}>
            <div style={styles.photoPlaceholder}>
              <span style={styles.photoText}>Photo 1</span>
              <div style={styles.photoDecor}>🌸</div>
            </div>
          </div>
          <div style={styles.photoCard}>
            <div style={styles.photoPlaceholder}>
              <span style={styles.photoText}>Photo 2</span>
              <div style={styles.photoDecor}>💐</div>
            </div>
          </div>
          <div style={styles.photoCard}>
            <div style={styles.photoPlaceholder}>
              <span style={styles.photoText}>Photo 3</span>
              <div style={styles.photoDecor}>🌺</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  homeContainer: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #ffe6f0 0%, #ffc9e0 50%, #ffb3d9 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Poppins', sans-serif",
    padding: '20px',
    position: 'relative',
    overflow: 'hidden',
  },
  floatingFlowers: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: 1,
  },
  floatingFlower: {
    position: 'absolute',
    fontSize: '40px',
    animation: 'gentleFloat 20s ease-in-out infinite',
    opacity: 0.6,
  },
  glowingFrame: {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 230, 240, 0.9))',
    border: '3px solid #ff69b4',
    borderRadius: '30px',
    padding: '60px 40px',
    boxShadow: '0 0 40px rgba(255, 105, 180, 0.4), inset 0 0 30px rgba(255, 192, 203, 0.2)',
    animation: 'softPulse 3s ease-in-out infinite',
    textAlign: 'center',
    maxWidth: '500px',
    width: '100%',
    position: 'relative',
    zIndex: 2,
  },
  flowerDecoration: {
    fontSize: '32px',
    marginBottom: '20px',
    animation: 'sway 3s ease-in-out infinite',
  },
  homeTitle: {
    fontSize: '32px',
    background: 'linear-gradient(135deg, #ff1493, #ff69b4, #ffb6c1)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textShadow: '0 2px 10px rgba(255, 105, 180, 0.3)',
    marginBottom: '30px',
    fontWeight: '700',
    animation: 'shimmer 3s ease-in-out infinite',
  },
  dateInput: {
    width: '100%',
    padding: '15px',
    fontSize: '18px',
    borderRadius: '15px',
    border: '2px solid #ff69b4',
    background: 'rgba(255, 255, 255, 0.8)',
    color: '#d63384',
    marginBottom: '20px',
    outline: 'none',
    transition: 'all 0.4s ease',
    fontFamily: "'Poppins', sans-serif",
  },
  openButton: {
    width: '100%',
    padding: '15px',
    fontSize: '20px',
    fontWeight: 'bold',
    borderRadius: '15px',
    border: 'none',
    background: 'linear-gradient(135deg, #ff1493, #ff69b4)',
    color: 'white',
    cursor: 'pointer',
    boxShadow: '0 0 20px rgba(255, 105, 180, 0.6)',
    transition: 'all 0.4s ease',
  },
  errorMessage: {
    color: '#ff1493',
    marginTop: '20px',
    fontSize: '16px',
    fontWeight: '500',
  },
  birthdayContainer: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #fff0f5 0%, #ffe4e9 25%, #ffd1dc 50%, #ffb6c8 75%, #ffc9e0 100%)',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Poppins', sans-serif",
    padding: '40px 20px',
  },
  sparkles: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: 1,
  },
  sparkle: {
    position: 'absolute',
    fontSize: '20px',
    animation: 'twinkle 3s ease-in-out infinite',
  },
  flower: {
    position: 'fixed',
    bottom: '-100px',
    animation: 'floatUp 12s ease-in infinite',
    zIndex: 2,
  },
  heart: {
    position: 'fixed',
    bottom: '-100px',
    animation: 'floatUp 10s ease-in infinite',
    zIndex: 2,
  },
  birthdayContent: {
    position: 'relative',
    zIndex: 3,
    textAlign: 'center',
    maxWidth: '900px',
    animation: 'fadeInUp 1.5s ease-in',
  },
  flowerBorder: {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 240, 245, 0.95))',
    borderRadius: '30px',
    padding: '50px 40px',
    marginBottom: '60px',
    boxShadow: '0 10px 50px rgba(255, 105, 180, 0.3)',
    border: '3px solid #ffb6c1',
    position: 'relative',
  },
  birthdayTitle: {
    fontSize: '48px',
    background: 'linear-gradient(135deg, #ff1493, #ff69b4, #ffb6c1, #ff1493)',
    backgroundSize: '200% auto',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '30px',
    fontWeight: '700',
    animation: 'gradientShift 3s ease infinite',
  },
  birthdayMessage: {
    fontSize: '24px',
    color: '#d63384',
    lineHeight: '1.8',
    fontWeight: '400',
  },
  photoGallery: {
    display: 'flex',
    gap: '30px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  photoCard: {
    width: '250px',
    height: '250px',
    borderRadius: '20px',
    overflow: 'hidden',
    border: '4px solid #ffb6c1',
    boxShadow: '0 10px 30px rgba(255, 105, 180, 0.3)',
    transition: 'all 0.4s ease',
    cursor: 'pointer',
    background: 'white',
  },
  photoPlaceholder: {
    width: '100%',
    height: '100%',
    background: 'linear-gradient(135deg, rgba(255, 182, 193, 0.3), rgba(255, 192, 203, 0.3))',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  photoText: {
    color: '#ff69b4',
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '10px',
  },
  photoDecor: {
    fontSize: '40px',
    animation: 'bounce 2s ease infinite',
  },
};

// Add keyframe animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');
  
  @keyframes softPulse {
    0%, 100% { 
      box-shadow: 0 0 40px rgba(255, 105, 180, 0.4), inset 0 0 30px rgba(255, 192, 203, 0.2);
      transform: scale(1);
    }
    50% { 
      box-shadow: 0 0 60px rgba(255, 105, 180, 0.6), inset 0 0 40px rgba(255, 192, 203, 0.3);
      transform: scale(1.02);
    }
  }
  
  @keyframes shimmer {
    0%, 100% { filter: brightness(1); }
    50% { filter: brightness(1.3); }
  }
  
  @keyframes floatUp {
    0% { transform: translateY(0) rotate(0deg); opacity: 1; }
    100% { transform: translateY(-120vh) rotate(360deg); opacity: 0; }
  }
  
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(40px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes gentleFloat {
    0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
    25% { transform: translateY(-30px) translateX(20px) rotate(10deg); }
    50% { transform: translateY(-50px) translateX(-10px) rotate(-5deg); }
    75% { transform: translateY(-20px) translateX(30px) rotate(15deg); }
  }
  
  @keyframes sway {
    0%, 100% { transform: rotate(-5deg); }
    50% { transform: rotate(5deg); }
  }
  
  @keyframes twinkle {
    0%, 100% { opacity: 0.3; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.2); }
  }
  
  @keyframes gradientShift {
    0% { background-position: 0% center; }
    50% { background-position: 100% center; }
    100% { background-position: 0% center; }
  }
  
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  div[style*="photoCard"]:hover {
    transform: translateY(-10px) scale(1.05);
    box-shadow: 0 15px 40px rgba(255, 105, 180, 0.5) !important;
  }
`;
document.head.appendChild(styleSheet);

export default App;