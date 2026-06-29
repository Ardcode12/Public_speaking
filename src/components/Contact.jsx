import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import './Contact.css';


const initialForm = { name: '', email: '', phone: '', interest: '', message: '' };

const Contact = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Full name is required.';
    if (!form.email.trim()) errs.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email.';
    if (!form.message.trim()) errs.message = 'Please tell us about your goals.';
    return errs;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: null });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
      setForm(initialForm);
    }, 1500);
  };

  return (
    <section className="contact" id="contact">
      <div className="container contact__grid">
        {/* INFO SIDE */}
        <div className="contact__info" data-aos="fade-left">
          <span className="section-label">Get In Touch</span>
          <h2 className="section-title">Let's Start Your <span className="underline-accent">Speaking Journey</span></h2>
          <p className="section-subtitle">
            Ready to take the first step? Fill out the form and one of our coaches will
            reach out within 24 hours to schedule your free discovery session.
          </p>

          <div className="contact__details">
            {[
              { Icon: MapPin, label: 'Visit Us',      value: "14 Speaker's Row, London, UK — EC1A 1BB" },
              { Icon: Phone,  label: 'Call Us',        value: '+44 (0) 20 7123 4567' },
              { Icon: Mail,   label: 'Email Us',       value: 'hello@voiceforward.co.uk' },
              { Icon: Clock,  label: 'Office Hours',   value: 'Monday – Friday, 9am – 6pm GMT' },
            ].map(({ Icon, label, value }, i) => (
              <div key={i} className="contact__detail-item">
                <span className="contact__detail-icon"><Icon size={17} strokeWidth={1.8} /></span>
                <div>
                  <span className="contact__detail-label">{label}</span>
                  <span className="contact__detail-value">{value}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="contact__social">
            {[
              { name: 'LinkedIn', url: 'https://linkedin.com/company/voiceforward' },
              { name: 'Twitter', url: 'https://twitter.com/voiceforward' },
              { name: 'YouTube', url: 'https://youtube.com/@voiceforward' },
              { name: 'Instagram', url: 'https://instagram.com/voiceforward' },
            ].map((s, i) => (
              <a key={i} href={s.url} className="contact__social-link" target="_blank" rel="noopener noreferrer" aria-label={s.name} id={`contact-social-${s.name.toLowerCase()}`}>
                {s.name}
              </a>
            ))}
          </div>
        </div>

        {/* FORM SIDE */}
        <div className="contact__form-wrap" data-aos="fade-right">
          {submitted ? (
            <div className="contact__success">
              <div className="contact__success-icon">✅</div>
              <h3>Message Sent!</h3>
              <p>Thank you for reaching out. A VoiceForward coach will contact you within 24 hours.</p>
              <button className="btn-primary" onClick={() => setSubmitted(false)}>
                Send Another Message
              </button>
            </div>
          ) : (
            <form className="contact__form" onSubmit={handleSubmit} noValidate id="contact-form">
              <h3 className="contact__form-title">Book a Free Discovery Session</h3>

              <div className="contact__form-row">
                <div className="contact__field">
                  <label htmlFor="contact-name">Full Name *</label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    placeholder="Jane Smith"
                    value={form.name}
                    onChange={handleChange}
                    className={errors.name ? 'error' : ''}
                  />
                  {errors.name && <span className="contact__error">{errors.name}</span>}
                </div>
                <div className="contact__field">
                  <label htmlFor="contact-email">Email Address *</label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    placeholder="jane@example.com"
                    value={form.email}
                    onChange={handleChange}
                    className={errors.email ? 'error' : ''}
                  />
                  {errors.email && <span className="contact__error">{errors.email}</span>}
                </div>
              </div>

              <div className="contact__form-row">
                <div className="contact__field">
                  <label htmlFor="contact-phone">Phone (optional)</label>
                  <input
                    id="contact-phone"
                    type="tel"
                    name="phone"
                    placeholder="+44 7700 123456"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="contact__field">
                  <label htmlFor="contact-interest">I'm Interested In</label>
                  <select
                    id="contact-interest"
                    name="interest"
                    value={form.interest}
                    onChange={handleChange}
                  >
                    <option value="">— Select a program —</option>
                    <option value="corporate">Corporate Training</option>
                    <option value="coaching">1-on-1 Coaching</option>
                    <option value="workshop">Live Workshop</option>
                    <option value="online">Online Course</option>
                    <option value="other">Other / Not sure</option>
                  </select>
                </div>
              </div>

              <div className="contact__field">
                <label htmlFor="contact-message">Tell Us About Your Goals *</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  placeholder="E.g. I have an upcoming product launch presentation and need help with my delivery and confidence..."
                  value={form.message}
                  onChange={handleChange}
                  className={errors.message ? 'error' : ''}
                />
                {errors.message && <span className="contact__error">{errors.message}</span>}
              </div>

              <button
                type="submit"
                className="btn-primary contact__submit"
                id="contact-submit"
                disabled={sending}
              >
                {sending ? 'Sending…' : 'Send My Request'}
                {!sending && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
