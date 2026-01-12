import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BookingModal from './BookingModal';

// --- VISUALS ---
const AbstractVisual = ({ index }: { index: number }) => (
    <div className="w-full h-48 bg-white/5 relative overflow-hidden group-hover:bg-white/10 transition-colors duration-500">
        <div className="absolute inset-0 opacity-20">
            {/* Generative Abstract Patterns based on index */}
            {index % 3 === 0 && (
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <motion.path
                        d="M0,50 Q25,0 50,50 T100,50"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="0.5"
                        className="text-cyan-400"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        transition={{ duration: 2 }}
                    />
                    <motion.path
                        d="M0,60 Q25,10 50,60 T100,60"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="0.5"
                        className="text-purple-400"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        transition={{ duration: 2.5 }}
                    />
                </svg>
            )}
            {index % 3 === 1 && (
                <div className="w-full h-full grid grid-cols-6 grid-rows-4 gap-2 p-4">
                    {[...Array(24)].map((_, i) => (
                        <motion.div
                            key={i}
                            className={`rounded-sm ${i % 2 === 0 ? 'bg-emerald-400' : 'bg-gray-600'}`}
                            initial={{ opacity: 0.1 }}
                            whileInView={{ opacity: [0.1, 0.4, 0.1] }}
                            transition={{ duration: 3, delay: i * 0.1, repeat: Infinity }}
                        />
                    ))}
                </div>
            )}
            {index % 3 === 2 && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                        className="w-24 h-24 border border-orange-400/30 rounded-full"
                        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                        className="absolute w-16 h-16 border border-blue-400/30 rounded-full"
                        animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    />
                </div>
            )}
        </div>
    </div>
);


// --- DATA ---
interface Insight {
    id: number;
    title: string;
    thesis: string;
    content: React.ReactNode;
}

const INSIGHTS: Insight[] = [
    {
        id: 1,
        title: "AI Tools Don’t Scale. Systems Do.",
        thesis: "Most businesses fail with AI because they adopt tools, not systems. Scale only comes from automation designed around business logic.",
        content: (
            <>
                <p>The modern AI landscape is flooded with "tools"—chatbots, generators, copilots. Companies adopt them expecting magic, but get fragmentation instead. A tool requires a human operator. A system removes the need for one.</p>
                <p>When we build for scale, we stop looking at individual tasks (writing an email, summarizing a specific PDF) and look at the entire data lifecycle. True scalability happens when intelligence is embedded into the architecture itself, not pasted on as a UI feature.</p>
                <div className="my-8 border-l-2 border-cyan-500 pl-6 py-2 bg-white/5">
                    <h4 className="text-white font-bold mb-2">The Takeaway</h4>
                    <p className="text-gray-400 text-sm">Stop buying subscriptions for your team. Start architecting pipelines that your team manages.</p>
                </div>
            </>
        )
    },
    {
        id: 2,
        title: "Automation Without Intelligence Breaks Fast",
        thesis: "Blind automation creates fragility. Real automation requires decision-making, context, and adaptability.",
        content: (
            <>
                <p>Traditional automation (RPA) is rigid. It breaks if a button moves or a data format changes. AI introduces resiliency—the ability to understand intent rather than just following coordinates.</p>
                <p>We see "blind automation" destroying customer trust every day: auto-replies that miss the point, workflows that dead-end because of a typo. Intelligent automation means giving the system the authority to reason, verify, and ask for help when it's unsure, rather than failing silently.</p>
                <div className="my-8 border-l-2 border-purple-500 pl-6 py-2 bg-white/5">
                    <h4 className="text-white font-bold mb-2">The Takeaway</h4>
                    <p className="text-gray-400 text-sm">Do not automate what you cannot monitor. Build logic that handles ambiguity, not just happy paths.</p>
                </div>
            </>
        )
    },
    {
        id: 3,
        title: "Why Most AI Projects Never Reach Production",
        thesis: "AI demos are easy. Production systems require reliability, integration, and ownership.",
        content: (
            <>
                <p>It takes a weekend to build a cool demo. It takes months to build a system that runs 24/7 without hallucinating or crashing. The gap is not in the model quality; it's in the engineering.</p>
                <p>Production AI requires: Evaluation frameworks, rate limiting, fallback strategies, latency optimization, and strict data governance. Founders often ignore these for the "wow" factor, only to find their system unusable in the real world.</p>
                <div className="my-8 border-l-2 border-emerald-500 pl-6 py-2 bg-white/5">
                    <h4 className="text-white font-bold mb-2">The Takeaway</h4>
                    <p className="text-gray-400 text-sm">Treat AI as infrastructure, not magic. If it can't run reliably at 3 AM, it's not a product.</p>
                </div>
            </>
        )
    },
    {
        id: 4,
        title: "Human-in-the-Loop Is a Transition, Not a Destination",
        thesis: "The goal of AI is not assistance — it is eventual autonomy with supervision.",
        content: (
            <>
                <p>Current "Co-pilot" paradigms are a safety net. They exist because models aren't fully trusted yet. But the economic value of AI lies in autonomy.</p>
                <p>We design systems where the human role shifts from "execution" to "review," and eventually to "audit." The loop should get looser over time as the system proves its competence. Designing for permanent hand-holding limits the ROI of the technology.</p>
                <div className="my-8 border-l-2 border-orange-500 pl-6 py-2 bg-white/5">
                    <h4 className="text-white font-bold mb-2">The Takeaway</h4>
                    <p className="text-gray-400 text-sm">Plan for the day your system runs alone. Build the metrics that will let you trust it.</p>
                </div>
            </>
        )
    },
    {
        id: 5,
        title: "AI ROI Comes From Removing People From Loops",
        thesis: "The real value of AI is not efficiency gains, but eliminating entire categories of manual work.",
        content: (
            <>
                <p>Making a slow process 20% faster is good. Removing the process entirely is revolutionary. Incremental gains often distract from the real opportunity: structural change.</p>
                <p>If you have a team of 10 people doing data entry, making them 2x faster means you still have 10 people doing data entry. A true AI system changes the workflow so the data enters itself, freeing those 10 minds for higher-value problems.</p>
                <div className="my-8 border-l-2 border-blue-500 pl-6 py-2 bg-white/5">
                    <h4 className="text-white font-bold mb-2">The Takeaway</h4>
                    <p className="text-gray-400 text-sm">Don't just optimize. Eliminate.</p>
                </div>
            </>
        )
    },
    {
        id: 6,
        title: "Interfaces Must Adapt to Intelligence",
        thesis: "Static UX cannot support intelligent systems. Interfaces must evolve with decision-making logic.",
        content: (
            <>
                <p>A static dashboard was fine for static data. But when data is generated in real-time by an agent, the interface needs to be fluid. It needs to show *reasoning*, not just results.</p>
                <p>We are moving from "point and click" to "intent and approve." The UI of the future handles ambiguity, suggests next steps, and visualizes the AI's thought process. Sticking a chat bubble in the corner is not enough.</p>
                <div className="my-8 border-l-2 border-rose-500 pl-6 py-2 bg-white/5">
                    <h4 className="text-white font-bold mb-2">The Takeaway</h4>
                    <p className="text-gray-400 text-sm">Your UX should be as dynamic as your model. Designing for AI means designing for change.</p>
                </div>
            </>
        )
    }
];

const InsightsPage: React.FC = () => {
    const [selectedInsight, setSelectedInsight] = useState<Insight | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="pt-32 pb-20 min-h-screen">

            {/* SECTION 1: OPENING */}
            <section className="px-6 md:px-12 max-w-7xl mx-auto mb-32">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl md:text-7xl font-syncopate font-bold text-white mb-8 leading-tight">
                        How We Think <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">About AI</span>
                    </h1>
                    <p className="text-gray-400 max-w-2xl text-xl font-light leading-relaxed">
                        Insights from building real AI systems — what works, what fails, and what actually scales.
                    </p>
                </motion.div>
            </section>

            {/* SECTION 2: INSIGHTS GRID */}
            <section className="px-6 md:px-12 max-w-7xl mx-auto mb-32">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {INSIGHTS.map((insight, index) => (
                        <motion.div
                            key={insight.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group flex flex-col h-full bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden hover:border-white/20 transition-all cursor-pointer"
                            onClick={() => setSelectedInsight(insight)}
                        >
                            {/* Visual */}
                            <AbstractVisual index={index} />

                            {/* Content */}
                            <div className="p-8 flex-1 flex flex-col">
                                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors leading-tight min-h-[3.5rem]">{insight.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-1">
                                    {insight.thesis}
                                </p>
                                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-600 group-hover:text-white transition-colors">
                                    Read Insight
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* SECTION 3: DETAIL VIEW (MODAL) */}
            <AnimatePresence>
                {selectedInsight && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-xl"
                        onClick={() => setSelectedInsight(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-[#0a0a0a] border border-white/10 rounded-2xl max-w-3xl w-full max-h-full overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-8 md:p-12 relative">
                                <button
                                    onClick={() => setSelectedInsight(null)}
                                    className="absolute top-6 right-6 p-2 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>

                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 pr-12 leading-tight">{selectedInsight.title}</h2>
                                <div className="h-1 w-20 bg-cyan-500 mb-8" />

                                <div className="prose prose-invert prose-lg max-w-none text-gray-300 leading-loose">
                                    <p className="text-xl font-light text-white mb-8 border-b border-white/10 pb-8">{selectedInsight.thesis}</p>
                                    {selectedInsight.content}
                                </div>

                                <div className="mt-12 pt-8 border-t border-white/10 flex items-center justify-between">
                                    <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Vatalique Intelligence</span>
                                    <button
                                        onClick={() => { setSelectedInsight(null); setIsModalOpen(true); }}
                                        className="text-cyan-400 hover:text-cyan-300 text-sm font-bold uppercase tracking-widest transition-colors"
                                    >
                                        Discuss This Strategy →
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* SECTION 4: THOUGHTS -> EXECUTION */}
            <section className="px-6 md:px-12 max-w-4xl mx-auto mb-32 text-center">
                <div className="border border-white/10 bg-white/[0.01] rounded-3xl p-12 relative overflow-hidden">
                    {/* Background Flow */}
                    <div className="absolute inset-0 opacity-10">
                        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <motion.path
                                d="M-10,50 Q50,0 110,50"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="0.5"
                                className="text-cyan-500"
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                transition={{ duration: 2 }}
                            />
                        </svg>
                    </div>

                    <h2 className="text-2xl font-syncopate font-bold text-white mb-6 relative z-10">Thinking Is Useless Without Execution</h2>
                    <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto relative z-10">
                        Every insight here comes from building, deploying, and maintaining real systems — not theory, not speculation.
                    </p>
                </div>
            </section>

            {/* SECTION 5: CLOSE */}
            <section className="py-24 text-center px-6 border-t border-white/5 bg-white/[0.02]">
                <h2 className="text-2xl md:text-3xl font-syncopate font-bold text-white max-w-4xl mx-auto leading-normal mb-12">
                    “If your AI strategy doesn’t survive reality,<br />
                    <span className="text-cyan-400">it’s not a strategy.”</span>
                </h2>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-8 py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-cyan-400 hover:text-black transition-colors rounded-full"
                >
                    Book Call
                </button>
            </section>

            <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

        </div>
    );
};

export default InsightsPage;
