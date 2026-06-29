import React from 'react';
import './Trainers.css';


const trainers = [
  {
    id: 'trainer-james',
    name: 'James Hartwell',
    title: 'Founder & Lead Coach',
    expertise: ['Executive Speaking', 'Leadership Communication', 'Media Training'],
    bio: 'With 15+ years coaching Fortune 500 executives and TED speakers, James brings unmatched expertise in transforming nervous presenters into commanding communicators.',
    img: '/images/trainer1.png',
    social: { linkedin: '#', twitter: '#' },
    sessions: '300+',
  },
  {
    id: 'trainer-sophia',
    name: 'Sophia Mercer',
    title: 'Senior Communication Coach',
    expertise: ['Storytelling', 'Confidence Building', 'Voice & Tone'],
    bio: 'Former BBC broadcaster turned coach, Sophia specialises in helping professionals discover their authentic voice and tell stories that captivate any audience.',
    img: '/images/trainer1.png',
    social: { linkedin: '#', twitter: '#' },
    sessions: '250+',
  },
  {
    id: 'trainer-marcus',
    name: 'Marcus Chen',
    title: 'Corporate Trainer & Facilitator',
    expertise: ['Team Workshops', 'Debate & Persuasion', 'Digital Presence'],
    bio: 'Marcus has facilitated workshops for over 80 organisations across Asia and Europe, with a speciality in high-stakes persuasion and cross-cultural communication.',
    img: '/images/trainer1.png',
    social: { linkedin: '#', twitter: '#' },
    sessions: '200+',
  },
];

const Trainers = () => {

  return (
    <section className="trainers" id="trainers">
      <div className="container">
        <div className="trainers__header" data-aos="fade-up">
          <span className="section-label">Meet the Team</span>
          <h2 className="section-title">World-Class <span className="underline-accent">Trainers</span>, Real Results</h2>
          <p className="section-subtitle">
            Our coaches are not just teachers — they are seasoned speakers, broadcasters,
            and corporate leaders who have walked the talk.
          </p>
        </div>

        <div className="trainers__grid">
          {trainers.map((trainer, i) => (
            <div
              key={trainer.id}
              id={trainer.id}
              className="trainer-card" data-aos="fade-up"
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              <div className="trainer-card__img-wrap">
                <img src={trainer.img} alt={trainer.name} className="trainer-card__img" />
                <div className="trainer-card__sessions">
                  <span>{trainer.sessions}</span>
                  <small>Sessions Delivered</small>
                </div>
              </div>
              <div className="trainer-card__body">
                <h3 className="trainer-card__name">{trainer.name}</h3>
                <p className="trainer-card__title">{trainer.title}</p>
                <p className="trainer-card__bio">{trainer.bio}</p>
                <div className="trainer-card__expertise">
                  {trainer.expertise.map((e, j) => (
                    <span key={j} className="trainer-card__tag">{e}</span>
                  ))}
                </div>
                <div className="trainer-card__social">
                  <a href={trainer.social.linkedin} className="trainer-card__social-link" aria-label="LinkedIn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
                      <circle cx="4" cy="4" r="2"/>
                    </svg>
                  </a>
                  <a href={trainer.social.twitter} className="trainer-card__social-link" aria-label="Twitter">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trainers;
