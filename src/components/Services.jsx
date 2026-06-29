import React from 'react';
import { Building2, Target, Users, Monitor, ArrowRight, Check } from 'lucide-react';
import './Services.css';


const services = [
  {
    icon: Building2,
    title: 'Corporate Training',
    desc: 'Intensive group sessions designed for teams. Build a culture of confident, clear communication across every level of your organisation.',
    features: ['Team workshops', 'Leadership alignment', 'Presentation coaching', 'Executive briefings'],
    badge: 'Most Popular',
    id: 'service-corporate',
  },
  {
    icon: Target,
    title: '1-on-1 Coaching',
    desc: 'Highly personalised one-to-one sessions tailored to your specific speaking challenges, career goals, and communication style.',
    features: ['Personal voice analysis', 'Custom action plan', 'Weekly sessions', 'Video review & feedback'],
    badge: null,
    id: 'service-coaching',
  },
  {
    icon: Users,
    title: 'Live Workshops',
    desc: 'High-energy, interactive workshops where participants practise in real-time with immediate expert feedback from our trainers.',
    features: ['2-day intensives', 'Small group format', 'Role-play exercises', 'Certificate awarded'],
    badge: null,
    id: 'service-workshops',
  },
  {
    icon: Monitor,
    title: 'Online Courses',
    desc: 'Self-paced digital courses that let you build your public speaking skills from anywhere, on your own schedule.',
    features: ['40+ video lessons', 'Lifetime access', 'Community forum', 'Progress tracking'],
    badge: 'New',
    id: 'service-online',
  },
];

const Services = () => {

  return (
    <section className="services" id="services">
      <div className="container">
        <div className="services__header" data-aos="fade-up">
          <span className="section-label">What We Offer</span>
          <h2 className="section-title">Programs Built for <span className="underline-accent">Every Speaker</span></h2>
          <p className="section-subtitle">
            Whether you are preparing for a TED talk, a sales pitch, or simply
            want to speak with more confidence — we have a program for you.
          </p>
        </div>

        <div className="services__grid">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                id={service.id}
                className="service-card" data-aos="fade-up"
                style={{ transitionDelay: `${i * 0.12}s` }}
              >
                {service.badge && (
                  <span className={`service-card__badge ${service.badge === 'New' ? 'service-card__badge--new' : ''}`}>
                    {service.badge}
                  </span>
                )}
                <div className="service-card__icon-wrap">
                  <Icon size={26} strokeWidth={1.8} className="service-card__icon" />
                </div>
                <h3 className="service-card__title">{service.title}</h3>
                <p className="service-card__desc">{service.desc}</p>
                <ul className="service-card__features">
                  {service.features.map((f, j) => (
                    <li key={j}>
                      <Check size={13} strokeWidth={3} className="service-card__check" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="#contact" className="service-card__link">
                  Learn More
                  <ArrowRight size={14} strokeWidth={2.5} />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
