
import React from 'react';
import { motion } from 'framer-motion';

const KPI = ({ label, value, sub }: { label: string, value: string, sub: string }) => (
  <div className="flex flex-col gap-2 p-8 border border-white/5 bg-white/[0.02] backdrop-blur-xl rounded-3xl">
    <span className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">{label}</span>
    <span className="text-4xl md:text-5xl font-syncopate font-bold text-white">{value}</span>
    <span className="text-cyan-400 text-xs font-medium">{sub}</span>
  </div>
);

const InteractiveDashboard: React.FC = () => {
  return (
    <section id="proof" className="relative z-10 px-6 max-w-7xl mx-auto py-32">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-6xl font-syncopate font-bold mb-6">REAL INTELLIGENCE. <br /> <span className="text-gray-600">MEASURABLE IMPACT.</span></h2>
        <p className="text-gray-500 max-w-2xl mx-auto">We don't build toys. We build efficiency engines. Our agency focus is on the radical reduction of manual overhead via sovereign AI.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <KPI label="Workload Reduction" value="Up to 70%" sub="Reduction in manual workload" />
        <KPI label="Autonomous Operations" value="Thousands" sub="of automated actions monthly" />
        <KPI label="Execution Speed" value="Instant" sub="Near-instant response & execution" />
      </div>

      <div className="relative group overflow-hidden rounded-[2rem] border border-white/5">
        <img
          src="https://picsum.photos/1200/600?random=dashboard"
          className="w-full h-[500px] object-cover opacity-20 grayscale group-hover:scale-105 transition-transform duration-1000"
          alt="Dashboard"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent p-12 flex flex-col justify-end">
          <h4 className="text-2xl font-syncopate font-bold mb-4">The VATALIQUE Pulse</h4>
          <p className="text-gray-400 max-w-lg mb-8">Our proprietary monitoring layer allows clients to see every agentic decision in real-time. Complete transparency, complete control.</p>
          <div className="flex gap-4">
            {[1, 2, 3, 4, 5].map(i => (
              <motion.div
                key={i}
                animate={{ height: [20, 60, 40, 80, 30] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                className="w-2 bg-cyan-400/50 rounded-full"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveDashboard;
