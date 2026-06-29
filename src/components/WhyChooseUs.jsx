import React, { useEffect, useRef, useState } from 'react';
import { Mic2, CalendarDays, Star, Building2, Brain, GraduationCap, BarChart3, Globe, Handshake, Medal } from 'lucide-react';
import './WhyChooseUs.css';

const useInView = (threshold = 0.15) => {
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

const useCounter = (target, duration = 2000, active = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, active]);
  return count;
};

const stats = [
  { value: 500, suffix: '+', label: 'Speakers Trained',    Icon: Mic2 },
  { value: 10,  suffix: '+', label: 'Years Experience',    Icon: CalendarDays },
  { value: 98,  suffix: '%', label: 'Client Satisfaction', Icon: Star },
  { value: 50,  suffix: '+', label: 'Corporate Clients',   Icon: Building2 },
];

const reasons = [
  { Icon: Brain,          title: 'Science-Backed Methods',   desc: 'Our curriculum is built on cognitive psychology and proven communication research.' },
  { Icon: GraduationCap, title: 'Certified Expert Trainers', desc: 'Every coach is a certified professional with 10+ years of real-world speaking experience.' },
  { Icon: BarChart3,      title: 'Measurable Progress',      desc: 'Track your growth with our proprietary assessment tools and detailed progress reports.' },
  { Icon: Globe,          title: 'Flexible Formats',         desc: 'Train in-person, online, or hybrid — we adapt to your schedule and learning style.' },
  { Icon: Handshake,      title: 'Post-Training Support',    desc: 'Lifetime access to our speaker community and 3 months of post-training check-ins.' },
  { Icon: Medal,          title: 'Industry Recognition',     desc: 'Our certifications are recognised by 200+ companies and professional bodies globally.' },
];

const StatCounter = ({ stat, active }) => {
  const count = useCounter(stat.value, 2200, active);
  const { Icon } = stat;
  return (
    <div className="why__stat">
      <Icon size={28} strokeWidth={1.5} className="why__stat-icon" />
      <span className="why__stat-number">{count}{stat.suffix}</span>
      <span className="why__stat-label">{stat.label}</span>
    </div>
  );
};

const WhyChooseUs = () => {
  const [sectionRef, inView] = useInView(0.15);

  return (
    <section className="why" id="why-us" ref={sectionRef}>
      {/* STATS BAND */}
      <div className="why__stats-band">
        <div className="container why__stats-grid">
          {stats.map((stat, i) => (
            <StatCounter key={i} stat={stat} active={inView} />
          ))}
        </div>
      </div>

      {/* REASONS */}
      <div className="container why__body">
        <div className="why__header" data-aos="fade-up">
          <span className="section-label">Why VoiceForward</span>
          <h2 className="section-title">The Difference Is In <span className="underline-accent">The Details</span></h2>
          <p className="section-subtitle">
            We don't just teach people to speak — we help them transform how they are
            perceived, heard, and remembered.
          </p>
        </div>

        <div className="why__reasons-grid">
          {reasons.map(({ Icon, title, desc }, i) => (
            <div
              key={i}
              className="why__reason" data-aos="fade-up"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="why__reason-icon-wrap">
                <Icon size={22} strokeWidth={1.8} className="why__reason-icon" />
              </div>
              <h4 className="why__reason-title">{title}</h4>
              <p className="why__reason-desc">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
