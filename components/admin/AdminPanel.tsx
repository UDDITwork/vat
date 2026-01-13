import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Job, Application } from '../../types';
import { getAllJobs, getApplicationCountsByJob } from '../../services/api';
import JobList from './JobList';
import JobForm from './JobForm';
import ApplicationsList from './ApplicationsList';

interface AdminPanelProps {
    onLogout: () => void;
}

type Tab = 'jobs' | 'applications';
type JobView = 'list' | 'create' | 'edit';

const AdminPanel: React.FC<AdminPanelProps> = ({ onLogout }) => {
    const [activeTab, setActiveTab] = useState<Tab>('jobs');
    const [jobView, setJobView] = useState<JobView>('list');
    const [jobs, setJobs] = useState<Job[]>([]);
    const [applicationCounts, setApplicationCounts] = useState<Record<string, number>>({});
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [filterJobId, setFilterJobId] = useState<string | null>(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setIsLoading(true);
        const [jobsData, countsData] = await Promise.all([
            getAllJobs(),
            getApplicationCountsByJob()
        ]);
        setJobs(jobsData);
        setApplicationCounts(countsData);
        setIsLoading(false);
    };

    const handleCreateJob = () => {
        setSelectedJob(null);
        setJobView('create');
    };

    const handleEditJob = (job: Job) => {
        setSelectedJob(job);
        setJobView('edit');
    };

    const handleJobSaved = () => {
        setJobView('list');
        setSelectedJob(null);
        loadData();
    };

    const handleViewApplications = (jobId: string) => {
        setFilterJobId(jobId);
        setActiveTab('applications');
    };

    const handleLogout = () => {
        sessionStorage.removeItem('admin_auth');
        onLogout();
    };

    return (
        <div className="fixed inset-0 z-[200] bg-[#050505] overflow-auto">
            {/* Header */}
            <header className="sticky top-0 z-10 bg-[#0a0a0a] border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <h1 className="text-xl font-syncopate font-bold text-white">
                            VATAL<span className="text-cyan-400">IQUE</span>
                        </h1>
                        <span className="text-xs font-bold uppercase tracking-widest text-gray-500 bg-white/5 px-3 py-1 rounded-full">
                            Admin
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                window.location.hash = '';
                                window.location.reload();
                            }}
                            className="text-gray-400 text-sm hover:text-white transition-colors"
                        >
                            View Site
                        </a>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex gap-8">
                        <button
                            onClick={() => {
                                setActiveTab('jobs');
                                setJobView('list');
                            }}
                            className={`py-4 text-sm font-bold uppercase tracking-widest border-b-2 transition-colors ${
                                activeTab === 'jobs'
                                    ? 'text-cyan-400 border-cyan-400'
                                    : 'text-gray-500 border-transparent hover:text-gray-300'
                            }`}
                        >
                            Job Postings
                        </button>
                        <button
                            onClick={() => {
                                setActiveTab('applications');
                                setFilterJobId(null);
                            }}
                            className={`py-4 text-sm font-bold uppercase tracking-widest border-b-2 transition-colors ${
                                activeTab === 'applications'
                                    ? 'text-cyan-400 border-cyan-400'
                                    : 'text-gray-500 border-transparent hover:text-gray-300'
                            }`}
                        >
                            Applications
                        </button>
                    </div>
                </div>
            </header>

            {/* Content */}
            <main className="max-w-7xl mx-auto px-6 py-8">
                {isLoading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : (
                    <>
                        {activeTab === 'jobs' && (
                            <>
                                {jobView === 'list' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        {/* Header with Add Button */}
                                        <div className="flex items-center justify-between mb-8">
                                            <div>
                                                <h2 className="text-2xl font-syncopate font-bold text-white">Job Postings</h2>
                                                <p className="text-gray-500 text-sm mt-1">{jobs.length} total jobs</p>
                                            </div>
                                            <button
                                                onClick={handleCreateJob}
                                                className="px-6 py-3 bg-cyan-500 text-black font-bold uppercase tracking-widest hover:bg-cyan-400 transition-colors rounded-lg flex items-center gap-2"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                </svg>
                                                Add Job
                                            </button>
                                        </div>

                                        <JobList
                                            jobs={jobs}
                                            applicationCounts={applicationCounts}
                                            onEdit={handleEditJob}
                                            onRefresh={loadData}
                                            onViewApplications={handleViewApplications}
                                        />
                                    </motion.div>
                                )}

                                {(jobView === 'create' || jobView === 'edit') && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        <button
                                            onClick={() => setJobView('list')}
                                            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                            </svg>
                                            Back to Jobs
                                        </button>

                                        <JobForm
                                            job={selectedJob}
                                            onSave={handleJobSaved}
                                            onCancel={() => setJobView('list')}
                                        />
                                    </motion.div>
                                )}
                            </>
                        )}

                        {activeTab === 'applications' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <ApplicationsList
                                    jobs={jobs}
                                    filterJobId={filterJobId}
                                    onClearFilter={() => setFilterJobId(null)}
                                />
                            </motion.div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
};

export default AdminPanel;
