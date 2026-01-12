import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Footer } from './Footer';

interface WhyUsPageProps {
    onClose: () => void;
}

const WhyUsPage: React.FC<WhyUsPageProps> = ({ onClose }) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = 'unset'; };
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[250] bg-black text-white overflow-y-auto"
        >
            {/* Background Ambience */}
            <div className="fixed inset-0 pointer-events-none opacity-20">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-900 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-900 rounded-full blur-[100px]" />
            </div>

            {/* Header / Nav */}
            <div className="sticky top-0 z-50 px-6 py-6 flex justify-between items-center bg-black/80 backdrop-blur-md border-b border-white/5">
                <h2 className="text-xs font-bold tracking-widest uppercase text-gray-400">Why Choose Vatalique</h2>
                <button
                    onClick={onClose}
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 hover:bg-white hover:text-black transition-all"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* 1. HERO SECTION */}
            <section className="relative z-10 px-6 pt-20 pb-32 max-w-7xl mx-auto flex flex-col items-center text-center">


                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-syncopate font-bold leading-tight mb-8"
                >
                    WHY CHOOSE VATA<span className="text-cyan-500">LIQUE ?</span>
                </motion.h1>

                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-lg md:text-xl text-gray-400 max-w-2xl"
                >
                    Not because we use AI — but because we engineer intelligence that runs businesses.
                </motion.p>
            </section>

            {/* 2. VISUAL COMPARISON */}
            <section className="relative z-10 px-6 py-20 bg-white/[0.02] border-y border-white/5">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h3 className="text-3xl font-syncopate font-bold">VATALIQUE VS EVERYONE ELSE</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                        {/* Typical Agencies */}
                        <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] flex flex-col gap-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                            <h4 className="text-xl font-bold uppercase tracking-widest text-gray-500">Typical AI Agencies</h4>
                            <ul className="space-y-4 text-gray-400">
                                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-red-500/50 rounded-full" />Generic Chatbots</li>
                                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-red-500/50 rounded-full" />Prompt-based Logic</li>
                                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-red-500/50 rounded-full" />SaaS Lock-in</li>
                                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-red-500/50 rounded-full" />Demo-Focused</li>
                                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-red-500/50 rounded-full" />Shallow Automation</li>
                                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-red-500/50 rounded-full" />No Real Ownership</li>
                            </ul>
                        </div>

                        {/* Vatalique */}
                        <div className="p-8 rounded-3xl border border-cyan-500/30 bg-cyan-900/[0.1] flex flex-col gap-6 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent pointer-events-none" />
                            <h4 className="text-xl font-bold uppercase tracking-widest text-cyan-400">Vatalique</h4>
                            <ul className="space-y-4 text-white">
                                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee]" />Agentic Systems</li>
                                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee]" />Autonomous Reasoning</li>
                                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee]" />Fully Custom Builds</li>
                                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee]" />Production-Ready</li>
                                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee]" />Deep Workflow Automation</li>
                                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee]" />Client-Owned Systems</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. HOW VATALIQUE THINKS */}
            <section className="relative z-10 px-6 py-24 max-w-7xl mx-auto">
                <h3 className="text-3xl font-syncopate font-bold text-center mb-16">HOW VATALIQUE THINKS</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[
                        { step: "01", title: "Observe", desc: "Understand workflows, data, bottlenecks" },
                        { step: "02", title: "Architect", desc: "Design agentic intelligence layers" },
                        { step: "03", title: "Deploy", desc: "Live AI across chat, voice, CRM, ops" },
                        { step: "04", title: "Evolve", desc: "Continuous optimization & learning" }
                    ].map((item, i) => (
                        <motion.div
                            key={item.step}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="p-6 border-l border-white/10 hover:border-cyan-500/50 transition-colors bg-white/[0.02]"
                        >
                            <span className="text-cyan-500 font-mono text-sm mb-2 block">{item.step}</span>
                            <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                            <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 4. PROOF OF SERIOUSNESS */}
            <section className="relative z-10 px-6 py-20 bg-zinc-900 border-y border-white/5">
                <div className="max-w-7xl mx-auto text-center">
                    <h3 className="text-2xl md:text-3xl font-syncopate font-bold mb-12">BUILT FOR REALITY, NOT EXPERIMENTS</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {["We don't ship demos", "We don't sell subscriptions", "No platform lock-in", "We replace human effort"].map((text, i) => (
                            <div key={i} className="p-8 border border-white/10 rounded-2xl bg-black/50 hover:bg-white/[0.05] transition-colors">
                                <p className="font-bold text-gray-200">{text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. WHO THIS IS FOR */}
            <section className="relative z-10 px-6 py-24 max-w-6xl mx-auto">
                <h3 className="text-3xl font-syncopate font-bold text-center mb-16">WHO WE WORK WITH</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
                    <div className="space-y-6">
                        <h4 className="text-red-400 font-bold uppercase tracking-widest text-sm mb-4">This is NOT for you if...</h4>
                        <ul className="space-y-4 text-gray-400">
                            <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-red-500/50 rounded-full" />You want quick demos</li>
                            <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-red-500/50 rounded-full" />You want cheap automation</li>
                            <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-red-500/50 rounded-full" />You want surface-level AI</li>
                        </ul>
                    </div>
                    <div className="space-y-6">
                        <h4 className="text-cyan-400 font-bold uppercase tracking-widest text-sm mb-4">This IS for you if...</h4>
                        <ul className="space-y-4 text-white">
                            <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />You want leverage</li>
                            <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />You want AI that actually runs operations</li>
                            <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />You think long-term</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* 6. CLOSING */}
            <section className="relative z-10 px-6 py-20 text-center border-t border-white/5 bg-gradient-to-b from-black to-zinc-900">
                <h3 className="text-3xl md:text-5xl font-syncopate font-bold mb-8">THE DIFFERENCE IS THINKING</h3>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-12">
                    Anyone can connect an API. Very few can design intelligence.<br />
                    Vatalique exists for teams who understand that difference.
                </p>
            </section>

            <Footer />
        </motion.div>
    );
};

export default WhyUsPage;
