import React, { useEffect, useRef, useState } from 'react';
import './Gallery.css';

const useInView = (threshold = 0.1) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
};

const galleryItems = [
  { id: 'gallery-1', img: '/images/hero.png', label: 'Annual Leadership Summit 2024', span: 'wide' },
  { id: 'gallery-2', img: '/images/gallery1.png', label: 'Corporate Workshop — TechNova', span: 'tall' },
  { id: 'gallery-3', img: '/images/about.png', label: 'Executive Coaching Session', span: 'normal' },
  { id: 'gallery-4', img: '/images/gallery1.png', label: 'TEDx Speaker Bootcamp', span: 'normal' },
  { id: 'gallery-5', img: '/images/hero.png', label: 'Women in Leadership Workshop', span: 'normal' },
  { id: 'gallery-6', img: '/images/about.png', label: 'International Speaker Conference', span: 'normal' },
];

const Gallery = () => {
  const [sectionRef, inView] = useInView(0.08);
  const [activeItem, setActiveItem] = useState(null);

  return (
    <section className="gallery" id="gallery" ref={sectionRef}>
      <div className="container">
        <div className={`gallery__header fade-in-up ${inView ? 'visible' : ''}`}>
          <span className="section-label">Gallery & Events</span>
          <h2 className="section-title">Where Great Speakers <span className="underline-accent">Are Made</span></h2>
          <p className="section-subtitle">
            A glimpse into our workshops, bootcamps, and speaking events from around the world.
          </p>
        </div>

        <div className="gallery__grid">
          {galleryItems.map((item, i) => (
            <div
              key={item.id}
              id={item.id}
              className={`gallery__item gallery__item--${item.span} fade-in-up ${inView ? 'visible' : ''}`}
              style={{ transitionDelay: `${i * 0.08}s` }}
              onClick={() => setActiveItem(item)}
            >
              <img src={item.img} alt={item.label} className="gallery__img" />
              <div className="gallery__overlay">
                <span className="gallery__label">{item.label}</span>
                <span className="gallery__zoom">↗</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* LIGHTBOX */}
      {activeItem && (
        <div className="gallery__lightbox" onClick={() => setActiveItem(null)}>
          <button className="gallery__lightbox-close" aria-label="Close lightbox">✕</button>
          <img src={activeItem.img} alt={activeItem.label} className="gallery__lightbox-img" />
          <p className="gallery__lightbox-caption">{activeItem.label}</p>
        </div>
      )}
    </section>
  );
};

export default Gallery;
