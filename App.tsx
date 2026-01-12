import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import ThreeScene from './components/ThreeScene';
import Hero from './components/Hero';
import Services from './components/Services';
import AIConcierge from './components/AIConcierge';
import InteractiveDashboard from './components/InteractiveDashboard';
import { ThemeToggle } from './components/ThemeToggle';
import WhyUsPage from './components/WhyUsPage';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showWhyUs, setShowWhyUs] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) {
    return (
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[200]">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "200px" }}
          transition={{ duration: 1 }}
          className="h-[1px] bg-cyan-400 mb-4"
        />
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="font-syncopate text-[10px] tracking-[1em] text-cyan-400"
        >
          VATALIQUE INITIALIZING
        </motion.span>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden bg-slate-50 dark:bg-[#050505] transition-colors duration-300">
      {/* Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-cyan-400 z-[110] origin-left" style={{ scaleX }} />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-[100] px-6 md:px-12 py-8 flex items-center justify-between mix-blend-difference text-gray-900 dark:text-white">
        <div className="flex items-center gap-2">
          <div className="font-syncopate font-bold text-2xl tracking-tighter text-slate-900 dark:text-white cursor-pointer select-none">
            VATA<span className="text-cyan-600 dark:text-cyan-400">LIQUE</span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-10">
          {['Services', 'Ecosystem', 'Results', 'Architecture'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-[10px] uppercase font-bold tracking-[0.3em] text-gray-400 hover:text-cyan-400 transition-colors"
            >
              {item}
            </a>
          ))}
          <ThemeToggle />
          <button
            onClick={() => setShowWhyUs(true)}
            className="px-6 py-2 border border-black/20 dark:border-white/20 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
          >
            WHY US?
          </button>
        </div>
        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </div>
      </nav>

      {/* Main Content */}
      <ThreeScene />

      <main className="relative z-10">
        <Hero />
        <Services />
        <InteractiveDashboard />

        {/* Footer */}
        <Footer />
      </main>

      {/* Overlays */}
      <AnimatePresence>
        {showWhyUs && <WhyUsPage onClose={() => setShowWhyUs(false)} />}
      </AnimatePresence>

      {/* AI Concierge Overlay */}
      <AIConcierge />
    </div >
  );
};

export default App;
