
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

      <div className="relative group overflow-hidden rounded-[2rem] border border-white/5 h-[500px]">
        <img
          src="https://picsum.photos/1200/600?random=dashboard"
          className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale group-hover:scale-105 transition-transform duration-1000"
          alt="The Vatalique Way"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent p-8 md:p-12 flex flex-col justify-end">
          <div className="mb-8">
            <h4 className="text-3xl font-syncopate font-bold mb-2 text-white">THE VATALIQUE WAY</h4>
            <p className="text-gray-400 max-w-lg text-sm">A clear execution philosophy behind every system we deploy.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 border-t border-white/10 pt-8">
            {/* Step 1 */}
            <div className="space-y-2">
              <span className="text-cyan-500 font-mono text-xs font-bold block">01</span>
              <h5 className="text-white font-syncopate font-bold text-lg">Observe</h5>
              <p className="text-gray-500 text-xs leading-relaxed">We study your workflows, data flows, and operational bottlenecks.</p>
            </div>
            {/* Step 2 */}
            <div className="space-y-2">
              <span className="text-cyan-500 font-mono text-xs font-bold block">02</span>
              <h5 className="text-white font-syncopate font-bold text-lg">Architect</h5>
              <p className="text-gray-500 text-xs leading-relaxed">We design custom agentic systems aligned to your business logic.</p>
            </div>
            {/* Step 3 */}
            <div className="space-y-2">
              <span className="text-cyan-500 font-mono text-xs font-bold block">03</span>
              <h5 className="text-white font-syncopate font-bold text-lg">Deploy</h5>
              <p className="text-gray-500 text-xs leading-relaxed">AI agents go live across chat, voice, CRM, and internal operations.</p>
            </div>
            {/* Step 4 */}
            <div className="space-y-2">
              <span className="text-cyan-500 font-mono text-xs font-bold block">04</span>
              <h5 className="text-white font-syncopate font-bold text-lg">Evolve</h5>
              <p className="text-gray-500 text-xs leading-relaxed">Systems continuously learn, optimize, and scale autonomously.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveDashboard;
