
import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import BookingModal from './BookingModal';

const Hero: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  // Mouse position state for subtle parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    // Disable on touch devices or reduced motion
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isTouch || isReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      // Normalize to -1 to 1 range
      mouseX.set((clientX / innerWidth) * 2 - 1);
      mouseY.set((clientY / innerHeight) * 2 - 1);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Smooth spring physics for "organic" feel
  const springConfig = { stiffness: 100, damping: 30, mass: 0.5 };
  const springX = useSpring(useTransform(mouseX, [-1, 1], [-8, 8]), springConfig);
  const springY = useSpring(useTransform(mouseY, [-1, 1], [-8, 8]), springConfig);

  return (
    <section className="min-h-screen flex flex-col px-6 pt-20 relative">
      <div className="flex-grow flex flex-col items-center justify-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center max-w-5xl"
        >
          <motion.h2
            className="text-cyan-700 dark:text-cyan-400 font-syncopate tracking-[0.3em] text-xs md:text-sm mb-6 uppercase transition-colors duration-300"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Pioneering the Agentic Era
          </motion.h2>

          <motion.h1
            style={{ x: springX, y: springY }}
            className="text-5xl md:text-8xl font-syncopate font-bold leading-tight mb-8 text-slate-950 dark:text-white transition-colors duration-300"
          >
            WE BUILD <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-700 to-violet-700 dark:from-cyan-400 dark:to-violet-500 transition-all duration-300">AI THAT WORKS</span> FOR YOU.
          </motion.h1>

          <p className="text-slate-800 dark:text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium tracking-wide leading-relaxed transition-colors duration-300">
            We design and deploy custom AI agents that automate sales, support, operations, and decision-making — tailored to your business.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <motion.button
              onClick={() => setIsModalOpen(true)}
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0, 255, 255, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-slate-900 text-white hover:bg-black dark:bg-white dark:text-black dark:hover:bg-gray-200 font-bold uppercase tracking-widest text-sm rounded-full transition-all duration-300 shadow-xl dark:shadow-none border border-transparent dark:border-white/10"
            >
              Book Call
            </motion.button>
          </div>

          <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="mt-8 text-[10px] md:text-xs text-slate-500 dark:text-gray-400 font-light tracking-wider uppercase transition-colors duration-300"
          >
            Built for founders, startups, and growing teams who want AI that actually ships — not demos.
          </motion.p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="pb-10 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.5em] text-slate-400 dark:text-gray-500 transition-colors duration-300">Scroll to Explore</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-[1px] h-12 bg-gradient-to-b from-cyan-600 to-transparent dark:from-cyan-400 dark:to-transparent transition-colors duration-300"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
