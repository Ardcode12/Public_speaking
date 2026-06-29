import React from 'react';
import './Footer.css';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" id="footer">
      <div className="footer__main container">
        {/* BRAND */}
        <div className="footer__brand">
          <a href="#home" className="footer__logo">
            <span className="footer__logo-icon">🎤</span>
            <span>Voice<span className="footer__logo-accent">Forward</span></span>
          </a>
          <p className="footer__tagline">
            Transforming voices. Building leaders. Creating impact — one speaker at a time.
          </p>
          <div className="footer__social">
            {[
              { label: 'LinkedIn', id: 'footer-linkedin', url: 'https://linkedin.com/company/voiceforward', icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/>
                </svg>
              )},
              { label: 'Twitter', id: 'footer-twitter', url: 'https://twitter.com/voiceforward', icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                </svg>
              )},
              { label: 'YouTube', id: 'footer-youtube', url: 'https://youtube.com/@voiceforward', icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/>
                </svg>
              )},
              { label: 'Instagram', id: 'footer-instagram', url: 'https://instagram.com/voiceforward', icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              )},
            ].map((s) => (
              <a key={s.id} href={s.url} id={s.id} className="footer__social-link" target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* QUICK LINKS */}
        <div className="footer__col">
          <h4 className="footer__col-title">Quick Links</h4>
          <ul className="footer__links">
            {[
              ['Home', '#home'],
              ['About Us', '#about'],
              ['Services', '#services'],
              ['Why Choose Us', '#why-us'],
              ['Trainers', '#trainers'],
              ['Testimonials', '#testimonials'],
              ['Gallery', '#gallery'],
              ['Contact', '#contact'],
            ].map(([label, href]) => (
              <li key={href}><a href={href} className="footer__link">{label}</a></li>
            ))}
          </ul>
        </div>

        {/* SERVICES */}
        <div className="footer__col">
          <h4 className="footer__col-title">Programs</h4>
          <ul className="footer__links">
            {[
              'Corporate Training',
              '1-on-1 Coaching',
              'Live Workshops',
              'Online Courses',
              'TEDx Speaker Prep',
              'Media Training',
              'Youth Programs',
            ].map((item) => (
              <li key={item}><a href="#services" className="footer__link">{item}</a></li>
            ))}
          </ul>
        </div>

        {/* CONTACT INFO */}
        <div className="footer__col">
          <h4 className="footer__col-title">Contact</h4>
          <ul className="footer__contact-list">
            <li>
              <span className="footer__contact-icon">📍</span>
              14 Speaker's Row, London EC1A 1BB, UK
            </li>
            <li>
              <span className="footer__contact-icon">📞</span>
              <a href="tel:+442071234567" className="footer__link">+44 (0) 20 7123 4567</a>
            </li>
            <li>
              <span className="footer__contact-icon">✉️</span>
              <a href="mailto:hello@voiceforward.co.uk" className="footer__link">hello@voiceforward.co.uk</a>
            </li>
            <li>
              <span className="footer__contact-icon">🕐</span>
              Mon–Fri, 9am – 6pm GMT
            </li>
          </ul>

          <a href="#contact" className="btn-primary footer__cta" id="footer-cta">
            Book Free Session
          </a>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>&copy; {year} VoiceForward. All rights reserved.</p>
          <div className="footer__bottom-links">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
            <a href="/cookies">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
