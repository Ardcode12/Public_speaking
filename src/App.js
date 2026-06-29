import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
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
import GlobalLoader from './components/GlobalLoader';
import './App.css';

function App() {
  const [isAppLoaded, setIsAppLoaded] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <div className="App">
      <GlobalLoader isLoaded={isAppLoaded} />
      <Navbar />
      <Hero onModelLoaded={() => setIsAppLoaded(true)} />
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
