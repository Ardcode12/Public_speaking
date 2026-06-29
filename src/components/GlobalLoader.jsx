import React, { useEffect, useState } from 'react';
import './GlobalLoader.css';

const GlobalLoader = ({ isLoaded }) => {
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => {
        setShouldRender(false);
        document.body.style.overflow = 'auto';
      }, 700);
      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = 'hidden';
    }
  }, [isLoaded]);

  if (!shouldRender) return null;

  return (
    <div className={`global-loader ${isLoaded ? 'global-loader--fade-out' : ''}`}>
      {/* Background particles */}
      <div className="global-loader__particles">
        {[...Array(12)].map((_, i) => (
          <div key={i} className={`particle particle--${i + 1}`} />
        ))}
      </div>

      <div className="global-loader__content">
        {/* Logo */}
        <div className="global-loader__logo-wrap">
          <div className="global-loader__logo-ring global-loader__logo-ring--outer" />
          <div className="global-loader__logo-ring global-loader__logo-ring--inner" />
          <img
            src="/images/newlogo.png"
            alt="Kural"
            className="global-loader__logo-img"
          />
        </div>

        {/* Brand name */}
        <div className="global-loader__brand">
          <p className="global-loader__kural-name">KURAL</p>
          <h1 className="global-loader__title">VoiceForward</h1>
          <p className="global-loader__tagline">Let Every Kural Initiate a Change</p>
        </div>

        {/* Loading bar */}
        <div className="global-loader__bar-wrap">
          <div className="global-loader__bar" />
        </div>

        <span className="global-loader__hint">Preparing your experience...</span>
      </div>
    </div>
  );
};

export default GlobalLoader;
