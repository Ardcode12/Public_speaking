import React from 'react';
import { ArrowRight, Play, ChevronDown } from 'lucide-react';
import HeroModel from './HeroModel';
import './Hero.css';

const Hero = ({ onModelLoaded }) => {
    return (
        <section className="hero" id="home">
            {/* DARK BACKGROUND */}
            <div className="hero__bg-solid" />

            {/* GRID LAYOUT: left text | right 3D */}
            <div className="hero__layout container" data-aos="fade-up">

                {/* ── LEFT: CONTENT ── */}
                <div className="hero__content">

                    {/* KURAL big name */}
                    <div className="hero__kural-brand">
                        <span className="hero__kural-name">KURAL</span>
                        <span className="hero__kural-sub">LET EVERY KURAL INITIATE A CHANGE</span>
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
                </div>

                {/* ── RIGHT: 3D MODEL ── */}
                <div className="hero__model-side">
                    <HeroModel onModelLoaded={onModelLoaded} />
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
