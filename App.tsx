
import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import ThreeScene from './components/ThreeScene';
import Hero from './components/Hero';
import Services from './components/Services';
import AIConcierge from './components/AIConcierge';
import InteractiveDashboard from './components/InteractiveDashboard';

const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
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
    <div className="relative w-full overflow-hidden bg-[#050505]">
      {/* Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-cyan-400 z-[110] origin-left" style={{ scaleX }} />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-[100] px-6 md:px-12 py-8 flex items-center justify-between mix-blend-difference">
        <div className="font-syncopate font-bold text-2xl tracking-tighter">
          VATA<span className="text-cyan-400">LIQUE</span>
        </div>
        <div className="hidden md:flex items-center gap-10">
          {['Services', 'Ecosystem', 'Results', 'Architecture'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-[10px] uppercase font-bold tracking-[0.3em] text-gray-400 hover:text-white transition-colors"
            >
              {item}
            </a>
          ))}
          <button className="px-6 py-2 border border-white/20 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
            What we do ?
          </button>
        </div>
        <div className="md:hidden">
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
        <footer className="relative py-20 px-6 border-t border-white/5 bg-black">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-6">
              <div className="font-syncopate font-bold text-2xl tracking-tighter">
                VATA<span className="text-cyan-400">LIQUE</span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                AI systems that automate work, replace manual effort, and scale businesses.
              </p>
            </div>
            <div>
              <h5 className="text-[10px] uppercase tracking-widest text-white font-bold mb-6">Contact</h5>
              <div className="space-y-4 text-gray-500 text-sm font-medium">
                <p>35N, HR ESTATE, Bodla, Bichpuri, road, agra, 282010</p>
                <p>+91 7906147228</p>
                <p>support@vatalique.com</p>
                <p className="text-xs text-gray-600">GSTIN: 09EYNPR9219B1ZX</p>
              </div>
            </div>
            <div>
              <h5 className="text-[10px] uppercase tracking-widest text-white font-bold mb-6">Connect</h5>
              <ul className="space-y-4 text-gray-500 text-sm">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">X / Twitter</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Instagram</a></li>
              </ul>
            </div>
          </div>
        </footer>
      </main>

      {/* AI Concierge Overlay */}
      <AIConcierge />
    </div>
  );
};

export default App;
