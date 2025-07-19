import React, { useState } from 'react';
import IntroScreen from './components/IntroScreen';
import ScrollAnimationWrapper from './components/ScrollAnimationWrapper';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero';


import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AnimatedBackground from './components/AnimatedBackground';

function App() {
  const [showPortfolio, setShowPortfolio] = useState(false);

  if (!showPortfolio) {
    return <IntroScreen onEnter={() => setShowPortfolio(true)} />;
  }

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <AnimatedBackground />
      <Navbar />
      <ScrollAnimationWrapper direction="up">
        <Hero />
      </ScrollAnimationWrapper>
      <ScrollAnimationWrapper direction="left" delay={200}>
        <About />
      </ScrollAnimationWrapper>
      <ScrollAnimationWrapper direction="right" delay={300}>
        <Skills />
      </ScrollAnimationWrapper>
      <ScrollAnimationWrapper direction="left" delay={400}>
        <Projects />
      </ScrollAnimationWrapper>
      <ScrollAnimationWrapper direction="right" delay={500}>
        <Contact />
      </ScrollAnimationWrapper>
      <ScrollAnimationWrapper direction="up" delay={600}>
        <Footer />
      </ScrollAnimationWrapper>
    </div>
  );
}

export default App;