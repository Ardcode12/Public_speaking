import React, { useEffect, useState } from 'react';
import { ArrowRight, Play, Mic2, ChevronDown } from 'lucide-react';
import HeroModel from './HeroModel';
import './Hero.css';

const STATS = [
    { value: '500+', label: 'Speakers Trained' },
    { value: '10+',  label: 'Years Experience' },
    { value: '98%',  label: 'Success Rate' },
    { value: '50+',  label: 'Corporate Clients' },
];

const Hero = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setVisible(true), 100);
        return () => clearTimeout(t);
    }, []);

    return (
        <section className="hero" id="home">
            {/* DARK BACKGROUND */}
            <div className="hero__bg-solid" />

            {/* GRID LAYOUT: left text | right 3D */}
            <div className={`hero__layout container ${visible ? 'hero__layout--visible' : ''}`}>

                {/* ── LEFT: CONTENT ── */}
                <div className="hero__content">
                    <div className="hero__badge">
                        <Mic2 size={13} strokeWidth={2.5} />
                        Trusted by 500+ Speakers Worldwide
                    </div>

                    <h1 className="hero__title">
                        Your Voice Is Your<br />
                        <span className="hero__title-accent">Greatest</span> Asset.
                        <br />Use It.
                    </h1>

                    <p className="hero__subtitle">
                        Professional public speaking training, corporate coaching, and
                        leadership workshops — transforming how you communicate on stage,
                        in boardrooms, and beyond.
                    </p>

                    <div className="hero__actions">
                        <a href="#contact" className="btn-primary hero__btn-primary" id="hero-cta-primary">
                            Book a Free Session
                            <ArrowRight size={17} strokeWidth={2.5} />
                        </a>
                        <a href="#services" className="hero__btn-ghost" id="hero-cta-services">
                            <Play size={14} strokeWidth={2.5} className="hero__play-icon" />
                            Explore Courses
                        </a>
                    </div>

                    {/* STATS */}
                    <div className="hero__stats">
                        {STATS.map((s, i) => (
                            <div key={i} className="hero__stat">
                                <span className="hero__stat-value">{s.value}</span>
                                <span className="hero__stat-label">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── RIGHT: 3D MODEL ── */}
                <div className="hero__model-side">
                    <HeroModel />
                </div>
            </div>

            {/* SCROLL INDICATOR */}
            <div className="hero__scroll-hint">
                <span>Scroll to explore</span>
                <ChevronDown size={18} className="hero__scroll-icon" />
            </div>
        </section>
    );
};

export default Hero;
