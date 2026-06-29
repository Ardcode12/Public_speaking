import React from 'react';
import Slider from 'react-slick';
import './Testimonials.css';


const testimonials = [
  {
    id: 'testimonial-1',
    name: 'Rachel Thompson',
    role: 'VP of Marketing, TechNova',
    quote: 'VoiceForward completely changed how I show up in board meetings. Within six weeks I went from dreading presentations to owning the room. The ROI for our organisation has been extraordinary.',
    rating: 5,
    avatar: '👩‍💼',
  },
  {
    id: 'testimonial-2',
    name: 'Daniel Okonkwo',
    role: 'TEDx Speaker & Entrepreneur',
    quote: 'James helped me craft and deliver my TEDx talk to an audience of 2,000. His coaching didn\'t just polish my words — it transformed my entire relationship with public speaking. Worth every penny.',
    rating: 5,
    avatar: '👨‍💼',
  },
  {
    id: 'testimonial-3',
    name: 'Priya Nair',
    role: 'Senior Software Engineer, FinTech Corp',
    quote: 'I used to freeze up during technical presentations. After just 8 sessions with Sophia, I delivered a keynote at our company\'s all-hands meeting and received a standing ovation. Life-changing.',
    rating: 5,
    avatar: '👩‍💻',
  },
  {
    id: 'testimonial-4',
    name: 'Michael Strand',
    role: 'CEO, GreenPath Solutions',
    quote: 'We enrolled our entire leadership team in the Corporate Training program. The results were immediately visible — sharper investor pitches, more persuasive client presentations, stronger team alignment.',
    rating: 5,
    avatar: '👨‍🔬',
  },
  {
    id: 'testimonial-5',
    name: 'Amara Diallo',
    role: 'Law Graduate & Moot Court Champion',
    quote: 'I came to VoiceForward for an edge in my moot court competitions. I left as the national champion. Marcus\'s coaching on argumentation and presence was simply world-class.',
    rating: 5,
    avatar: '⚖️',
  },
  {
    id: 'testimonial-6',
    name: 'Lena Fischer',
    role: 'Head of HR, EuroBank',
    quote: 'The workshop format is brilliant — practical, energetic, and immediately applicable. Our HR team now runs internal communication training using the frameworks VoiceForward taught us.',
    rating: 5,
    avatar: '👩‍🏫',
  },
];

const StarRating = ({ count }) => (
  <div className="testimonial-stars">
    {Array.from({ length: count }).map((_, i) => (
      <span key={i} className="testimonial-star">★</span>
    ))}
  </div>
);

const Testimonials = () => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4500,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <div className="testimonials__header" data-aos="fade-up">
          <span className="section-label">Success Stories</span>
          <h2 className="section-title">Hear It From <span className="underline-accent">Our Speakers</span></h2>
          <p className="section-subtitle">
            Real people. Real transformations. Real results. Here's what our clients
            have to say about their journey with VoiceForward.
          </p>
        </div>

        <div className="testimonials__slider" data-aos="fade-up" style={{ transitionDelay: '0.2s' }}>
          <Slider {...settings}>
            {testimonials.map((t) => (
              <div key={t.id} className="testimonial-slide">
                <div className="testimonial-card" id={t.id}>
                  <div className="testimonial-card__top">
                    <div className="testimonial-avatar">{t.avatar}</div>
                    <StarRating count={t.rating} />
                  </div>
                  <blockquote className="testimonial-quote">"{t.quote}"</blockquote>
                  <div className="testimonial-author">
                    <strong className="testimonial-name">{t.name}</strong>
                    <span className="testimonial-role">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
