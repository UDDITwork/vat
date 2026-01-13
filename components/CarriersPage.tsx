import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Job } from '../types';
import { getActiveJobs } from '../services/api';
import JobApplicationModal from './JobApplicationModal';

const JobTypeBadge: React.FC<{ type: Job['type'] }> = ({ type }) => {
    const colors: Record<Job['type'], string> = {
        'full-time': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
        'part-time': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
        'contract': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
        'internship': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    };

    return (
        <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full border ${colors[type]}`}>
            {type.replace('-', ' ')}
        </span>
    );
};

const JobCard: React.FC<{
    job: Job;
    index: number;
    onApply: () => void;
}> = ({ job, index, onApply }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="group relative bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-colors"
        >
            {/* Header */}
            <div className="p-6 border-b border-white/5">
                <div className="flex items-start justify-between gap-4 mb-4">
                    <h3 className="text-xl font-syncopate font-bold text-white group-hover:text-cyan-400 transition-colors">
                        {job.title}
                    </h3>
                    <JobTypeBadge type={job.type} />
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        {job.department}
                    </span>
                    <span className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {job.location}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                    {job.description}
                </p>

                {job.salary_range && (
                    <p className="text-cyan-400 text-sm font-medium">
                        {job.salary_range}
                    </p>
                )}

                <button
                    onClick={onApply}
                    className="w-full mt-4 px-6 py-3 bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest text-sm hover:bg-cyan-500 hover:border-cyan-500 hover:text-black transition-all rounded-lg"
                >
                    Apply Now
                </button>
            </div>
        </motion.div>
    );
};

const CarriersPage: React.FC = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        loadJobs();
    }, []);

    const loadJobs = async () => {
        setIsLoading(true);
        const activeJobs = await getActiveJobs();
        setJobs(activeJobs);
        setIsLoading(false);
    };

    const handleApply = (job: Job) => {
        setSelectedJob(job);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedJob(null);
    };

    return (
        <div className="pt-32 pb-20 min-h-screen">
            {/* SECTION 1: OPENING STATEMENT */}
            <section className="px-6 md:px-12 max-w-7xl mx-auto mb-20 text-center md:text-left">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-4xl md:text-6xl font-syncopate font-bold text-white mb-6 leading-tight">
                        Join <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Our Team</span>
                    </h1>
                    <p className="text-gray-400 max-w-2xl text-lg md:text-xl font-light leading-relaxed mx-auto md:mx-0">
                        We're building systems that change how businesses operate. Join us if you want to be part of something that matters.
                    </p>
                </motion.div>
            </section>

            {/* SECTION 2: WHY JOIN US */}
            <section className="px-6 md:px-12 max-w-7xl mx-auto mb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    {[
                        {
                            title: 'Impact-Driven Work',
                            description: 'Work on real systems that transform how businesses operate and scale.',
                            icon: (
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            ),
                            accent: 'text-cyan-400'
                        },
                        {
                            title: 'Growth & Learning',
                            description: 'Continuous learning environment with exposure to cutting-edge AI technologies.',
                            icon: (
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                            ),
                            accent: 'text-purple-400'
                        },
                        {
                            title: 'Collaborative Culture',
                            description: 'Work with a tight-knit team where every voice matters and ideas become reality.',
                            icon: (
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            ),
                            accent: 'text-emerald-400'
                        }
                    ].map((item, index) => (
                        <div
                            key={index}
                            className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 hover:border-white/10 transition-colors"
                        >
                            <div className={`${item.accent} mb-4`}>{item.icon}</div>
                            <h3 className="text-lg font-syncopate font-bold text-white mb-2">{item.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                        </div>
                    ))}
                </motion.div>
            </section>

            {/* SECTION 3: JOB LISTINGS */}
            <section className="px-6 md:px-12 max-w-7xl mx-auto mb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-2xl font-syncopate font-bold text-white mb-8">
                        Open <span className="text-cyan-400">Positions</span>
                    </h2>

                    {isLoading ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                        </div>
                    ) : jobs.length === 0 ? (
                        <div className="text-center py-20 bg-white/[0.02] border border-white/5 rounded-2xl">
                            <svg className="w-16 h-16 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <h3 className="text-xl font-syncopate font-bold text-white mb-2">No Open Positions</h3>
                            <p className="text-gray-400 max-w-md mx-auto">
                                We don't have any open positions right now, but we're always looking for exceptional talent. Feel free to reach out.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {jobs.map((job, index) => (
                                <JobCard
                                    key={job.id}
                                    job={job}
                                    index={index}
                                    onApply={() => handleApply(job)}
                                />
                            ))}
                        </div>
                    )}
                </motion.div>
            </section>

            {/* SECTION 4: CTA */}
            <section className="px-6 md:px-12 max-w-4xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="border border-white/10 bg-white/[0.01] rounded-3xl p-12 md:p-16"
                >
                    <h2 className="text-2xl font-syncopate font-bold text-white mb-4">
                        Don't See Your Role?
                    </h2>
                    <p className="text-gray-400 text-lg leading-relaxed max-w-xl mx-auto mb-8">
                        We're always looking for exceptional people. If you think you'd be a great fit, reach out anyway.
                    </p>
                    <a
                        href="mailto:careers@vatalique.com"
                        className="inline-block px-8 py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-cyan-400 hover:text-black transition-colors rounded-full"
                    >
                        Get in Touch
                    </a>
                </motion.div>
            </section>

            {/* Application Modal */}
            {selectedJob && (
                <JobApplicationModal
                    isOpen={isModalOpen}
                    onClose={handleModalClose}
                    job={selectedJob}
                />
            )}
        </div>
    );
};

export default CarriersPage;
