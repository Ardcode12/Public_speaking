import React from 'react';
import './CTABanner.css';


const CTABanner = () => {

  return (
    <section className="cta-banner" id="cta-banner">
      <div className="cta-banner__bg" />
      <div className="container cta-banner__content" data-aos="fade-up">
        <div className="cta-banner__text">
          <span className="cta-banner__label">Ready to Transform?</span>
          <h2 className="cta-banner__title">
            One Conversation Can Change Your <span>Career.</span>
          </h2>
          <p className="cta-banner__subtitle">
            Book your free 30-minute discovery session today. No commitment, no pressure —
            just a conversation about where you want to go and how we can help you get there.
          </p>
        </div>
        <div className="cta-banner__actions">
          <a href="#contact" className="cta-banner__btn-primary btn-dark" id="cta-banner-book">
            Book Free Session
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <a href="tel:+442071234567" className="cta-banner__btn-phone" id="cta-banner-call">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.5a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            +44 (0) 20 7123 4567
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
