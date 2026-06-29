import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import Trainers from './components/Trainers';
import Testimonials from './components/Testimonials';
import Gallery from './components/Gallery';
import CTABanner from './components/CTABanner';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <WhyChooseUs />
      <Trainers />
      <Testimonials />
      <Gallery />
      <CTABanner />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
