import React, { useEffect, useRef, useState } from 'react';
import { Target, Trophy, Globe2, ArrowRight } from 'lucide-react';
import './About.css';


const pillars = [
  { Icon: Target, title: 'Personalised Coaching', desc: 'Tailored programs built around your unique voice and goals.' },
  { Icon: Trophy, title: 'Proven Methodology',    desc: 'Science-backed techniques used by world-class communicators.' },
  { Icon: Globe2, title: 'Real-World Results',    desc: 'Training that works in boardrooms, stages, and interviews.' },
];

const About = () => {
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const imgRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!imgRef.current) return;
      const rect = imgRef.current.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      setParallaxOffset(center * 0.12);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="about" id="about">
      <div className="container about__grid">
        {/* IMAGE SIDE */}
        <div className="about__image-wrap" data-aos="fade-left" ref={imgRef}>
          <div className="about__image-inner" style={{ transform: `translateY(${parallaxOffset}px)` }}>
            <img src="/images/about.png" alt="VoiceForward training workshop in action" className="about__img" />
          </div>
          <div className="about__image-badge">
            <span className="about__badge-number">10+</span>
            <span className="about__badge-text">Years Transforming Speakers</span>
          </div>
          <div className="about__image-dot about__image-dot--tl" />
          <div className="about__image-dot about__image-dot--br" />
        </div>

        {/* TEXT SIDE */}
        <div className="about__text" data-aos="fade-right">
          <span className="section-label">Our Mission</span>
          <h2 className="section-title">
            We Help People <span className="underline-accent">Find Their Voice</span> and Lead with Confidence
          </h2>
          <p className="about__lead">
            VoiceForward was founded on a simple belief: <strong>every person has a powerful voice</strong>
            — most have just never been shown how to use it.
          </p>
          <p className="section-subtitle">
            Since 2014, we have trained executives, entrepreneurs, students, and professionals
            across industries to communicate with clarity, command rooms with presence,
            and deliver messages that actually move people.
          </p>

          {/* MISSION PILLARS */}
          <div className="about__pillars">
            {pillars.map(({ Icon, title, desc }, i) => (
              <div key={i} className="about__pillar">
                <div className="about__pillar-icon-wrap">
                  <Icon size={20} strokeWidth={1.8} className="about__pillar-icon" />
                </div>
                <div>
                  <h4 className="about__pillar-title">{title}</h4>
                  <p className="about__pillar-desc">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <a href="#contact" className="btn-primary" id="about-cta">
            Start Your Journey
            <ArrowRight size={16} strokeWidth={2.5} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
