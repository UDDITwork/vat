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
import PastWorkPage from './components/PastWorkPage';
import ServicesPage from './components/ServicesPage';
import TeamPage from './components/TeamPage';
import InsightsPage from './components/InsightsPage';

const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showWhyUs, setShowWhyUs] = useState(false);
  const [activeView, setActiveView] = useState('home'); // 'home' | 'past-work' | 'team' | 'insights' | 'services'
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

  const handleNavClick = (view: string, id?: string) => {
    setActiveView(view);
    window.scrollTo(0, 0);

    if (id) {
      // Allow time for render if switching views
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

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
          <div
            onClick={() => handleNavClick('home')}
            className="font-syncopate font-bold text-2xl tracking-tighter text-slate-900 dark:text-white cursor-pointer select-none"
          >
            VATA<span className="text-cyan-600 dark:text-cyan-400">LIQUE</span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-10">
          {[
            { label: 'Services', view: 'services' },
            { label: 'Past Work', view: 'past-work' },
            { label: 'Our Team', view: 'team' },
            { label: 'Insights', view: 'insights' }
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.view, (item as any).id)}
              className={`text-[10px] uppercase font-bold tracking-[0.3em] transition-colors ${activeView === item.view ? 'text-cyan-400' : 'text-gray-400 hover:text-cyan-400'}`}
            >
              {item.label}
            </button>
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
        <AnimatePresence mode="wait">
          {activeView === 'home' && (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Hero />
              <Services />
              <InteractiveDashboard />
            </motion.div>
          )}

          {activeView === 'services' && (
            <motion.div key="services" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ServicesPage />
            </motion.div>
          )}

          {activeView === 'past-work' && (
            <motion.div key="past-work" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <PastWorkPage />
            </motion.div>
          )}

          {activeView === 'team' && (
            <motion.div key="team" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <TeamPage />
            </motion.div>
          )}

          {activeView === 'insights' && (
            <motion.div key="insights" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <InsightsPage />
            </motion.div>
          )}
        </AnimatePresence>

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
