
import React from 'react';
import { motion } from 'framer-motion';
import BookingModal from './BookingModal';

const Hero: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

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
            className="text-cyan-400 font-syncopate tracking-[0.3em] text-xs md:text-sm mb-6 uppercase"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Pioneering the Agentic Era
          </motion.h2>

          <h1 className="text-5xl md:text-8xl font-syncopate font-bold leading-tight mb-8">
            WE BUILD <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">AI THAT WORKS</span> FOR YOU.
          </h1>

          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light tracking-wide leading-relaxed">
            We design and deploy custom AI agents that automate sales, support, operations, and decision-making — tailored to your business.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <motion.button
              onClick={() => setIsModalOpen(true)}
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0, 255, 255, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-white text-black font-bold uppercase tracking-widest text-sm rounded-full transition-colors duration-300"
            >
              Book Call
            </motion.button>
          </div>

          <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="mt-8 text-[10px] md:text-xs text-gray-400 font-light tracking-wider uppercase"
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
        <span className="text-[10px] uppercase tracking-[0.5em] text-gray-500">Scroll to Explore</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-[1px] h-12 bg-gradient-to-b from-cyan-400 to-transparent"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
