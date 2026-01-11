import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Service, Deployment } from '../types';

interface DeploymentOverlayProps {
    service: Service | null;
    onClose: () => void;
}

const DeploymentCard = ({ deployment, index }: { deployment: Deployment, index: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="bg-white/5 border border-white/10 p-6 rounded-xl hover:bg-white/10 transition-colors group"
    >
        <div className="flex justify-between items-start mb-4">
            <h4 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">{deployment.title}</h4>
            <div className="p-2 bg-black/50 rounded-lg border border-white/5">
                <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
            </div>
        </div>

        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
            {deployment.description}
        </p>

        <div className="space-y-3">
            <div>
                <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold block mb-1">Built</span>
                <p className="text-sm text-gray-300">{deployment.built}</p>
            </div>
            <div>
                <span className="text-[10px] uppercase tracking-widest text-cyan-400/80 font-bold block mb-1">Outcome</span>
                <p className="text-sm text-white font-medium">{deployment.outcome}</p>
            </div>
        </div>
    </motion.div>
);

const DeploymentOverlay: React.FC<DeploymentOverlayProps> = ({ service, onClose }) => {
    if (!service) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[200] flex items-center justify-center">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/60 backdrop-blur-xl"
                />

                {/* Content Panel */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-6xl h-[90vh] bg-[#0a0a0a] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
                >
                    {/* Header */}
                    <div className="p-8 md:p-12 border-b border-white/10 flex items-start justify-between bg-gradient-to-r from-cyan-900/10 to-transparent">
                        <div>
                            <motion.span
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-cyan-400 text-xs font-bold uppercase tracking-[0.2em] mb-2 block"
                            >
                                Operational Deployed Systems
                            </motion.span>
                            <motion.h2
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-3xl md:text-5xl font-syncopate font-bold text-white mb-4"
                            >
                                {service.title}
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.6 }}
                                transition={{ delay: 0.2 }}
                                className="text-gray-400 max-w-2xl text-lg"
                            >
                                Real-world deployments executing in production environments.
                            </motion.p>
                        </div>

                        <button
                            onClick={onClose}
                            className="p-3 hover:bg-white/10 rounded-full transition-colors text-white"
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                    </div>

                    {/* Scrollable Grid */}
                    <div className="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                            {service.deployments?.map((deployment, idx) => (
                                <DeploymentCard key={idx} deployment={deployment} index={idx} />
                            ))}
                        </div>

                        {(!service.deployments || service.deployments.length === 0) && (
                            <div className="flex items-center justify-center h-full text-gray-500">
                                No public deployments listed for this category.
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="p-6 border-t border-white/10 bg-[#050505] flex justify-between items-center">
                        <span className="text-[10px] text-gray-600 uppercase tracking-widest">VATALIQUE // SYSTEM DEPLOYMENTS</span>
                        <button onClick={onClose} className="text-xs font-bold text-white uppercase tracking-widest hover:text-cyan-400 transition-colors">
                            Close View
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default DeploymentOverlay;
