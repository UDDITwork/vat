import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SERVICES } from '../constants';
import { Service } from '../types';
import DeploymentOverlay from './DeploymentOverlay';

const ServiceCard: React.FC<{ service: Service, index: number, onSelect: (s: Service) => void }> = ({ service, index, onSelect }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "circOut" }}
      className={`flex flex-col md:flex-row items-center gap-12 py-24 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
    >
      <div className="flex-1 space-y-8">
        <h3 className="text-4xl md:text-5xl font-syncopate font-bold text-slate-900 dark:text-white transition-colors duration-300">
          {service.title}
        </h3>
        <p className="text-slate-600 dark:text-gray-400 text-lg leading-relaxed max-w-xl transition-colors duration-300">
          {service.description}
        </p>
        <ul className="grid grid-cols-1 gap-4">
          {service.capabilities.map((cap, i) => (
            <li key={i} className="flex items-center gap-4 text-sm text-cyan-600 dark:text-cyan-400 font-medium tracking-wider">
              <span className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
              {cap}
            </li>
          ))}
        </ul>

        <div className="flex flex-col items-start gap-3">
          <button
            onClick={() => onSelect(service)}
            className="group relative px-6 py-3 overflow-hidden border border-slate-200 dark:border-white/10 rounded-lg hover:border-cyan-400/50 transition-colors duration-300"
          >
            <span className="relative z-10 text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-300">
              {service.ctaText || 'Learn More'}
            </span>
            <div className="absolute inset-0 bg-slate-100 dark:bg-white/5 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300" />
          </button>
          <span className="text-[10px] text-slate-500 dark:text-gray-600 font-medium tracking-wide">
            Real systems. Real deployments. No mockups.
          </span>
        </div>
      </div>

      <div className="flex-1 relative group cursor-pointer" onClick={() => onSelect(service)}>
        <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/5 to-violet-500/5 dark:from-cyan-500/10 dark:to-violet-500/10 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500" />
        <div className="relative aspect-video rounded-3xl border border-slate-100 bg-white/90 shadow-lg shadow-slate-200/50 dark:border-white/5 dark:bg-white/5 dark:shadow-2xl dark:backdrop-blur-3xl overflow-hidden transition-colors duration-300">
          <img
            src={`https://picsum.photos/800/450?random=${index}`}
            className="w-full h-full object-cover opacity-90 dark:opacity-40 group-hover:scale-110 transition-transform duration-700 grayscale hover:grayscale-0"
            alt={service.title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent dark:from-black/80 dark:via-transparent dark:to-transparent transition-colors duration-300" />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-32 h-32 border border-cyan-500/30 dark:border-cyan-400/20 rounded-full flex items-center justify-center"
            >
              <div className="w-16 h-16 border-2 border-cyan-500/50 dark:border-cyan-400/40 rounded-full" />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Services: React.FC = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <section id="services" className="relative z-10 px-6 max-w-7xl mx-auto py-20">
      <div className="mb-20">
        <h2 className="text-xs uppercase tracking-[1em] text-cyan-400 mb-4">Core Ecosystem</h2>
        <div className="h-[1px] w-24 bg-cyan-400 mb-10" />
      </div>

      {SERVICES.map((service, index) => (
        <ServiceCard key={service.id} service={service} index={index} onSelect={setSelectedService} />
      ))}

      <DeploymentOverlay service={selectedService} onClose={() => setSelectedService(null)} />
    </section>
  );
};


export default Services;
