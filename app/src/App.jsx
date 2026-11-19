import { useState } from 'react';
import { MotionConfig } from 'framer-motion';
import { CursorGlow, ScrollProgress } from './components/Atmosphere';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Intro from './components/Intro';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [activeSkill, setActiveSkill] = useState(null);
  return (
    // reducedMotion="user": Framer drops transform/layout animations when the OS asks for reduced motion.
    <MotionConfig reducedMotion="user">
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <main className="relative z-[2] overflow-x-clip">
        <Hero />
        <Intro />
        <TechStack activeSkill={activeSkill} setActiveSkill={setActiveSkill} />
        <Projects activeSkill={activeSkill} />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}
