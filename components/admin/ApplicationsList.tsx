import React, { useState, useEffect } from 'react';
import { Application, Job } from '../../types';
import { getAllApplications, getApplicationsByJob, updateApplicationStatus, deleteApplication } from '../../services/api';

interface ApplicationsListProps {
    jobs: Job[];
    filterJobId: string | null;
    onClearFilter: () => void;
}

const statusColors: Record<Application['status'], string> = {
    pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    reviewed: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    shortlisted: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    rejected: 'bg-red-500/20 text-red-400 border-red-500/30',
};

const ApplicationsList: React.FC<ApplicationsListProps> = ({ jobs, filterJobId, onClearFilter }) => {
    const [applications, setApplications] = useState<Application[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedStatus, setSelectedStatus] = useState<string>('all');
    const [updatingId, setUpdatingId] = useState<string | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    useEffect(() => {
        loadApplications();
    }, [filterJobId]);

    const loadApplications = async () => {
        setIsLoading(true);
        let data: Application[];
        if (filterJobId) {
            data = await getApplicationsByJob(filterJobId);
        } else {
            data = await getAllApplications();
        }
        setApplications(data);
        setIsLoading(false);
    };

    const handleStatusChange = async (application: Application, newStatus: Application['status']) => {
        setUpdatingId(application.id);
        await updateApplicationStatus(application.id, newStatus);
        await loadApplications();
        setUpdatingId(null);
    };

    const handleDelete = async (application: Application) => {
        if (!confirm(`Are you sure you want to delete the application from ${application.applicant_name}?`)) {
            return;
        }
        setDeletingId(application.id);
        await deleteApplication(application.id);
        await loadApplications();
        setDeletingId(null);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const filteredApplications = applications.filter(app => {
        if (selectedStatus === 'all') return true;
        return app.status === selectedStatus;
    });

    const filterJob = filterJobId ? jobs.find(j => j.id === filterJobId) : null;

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-syncopate font-bold text-white">Applications</h2>
                    {filterJob && (
                        <div className="flex items-center gap-2 mt-2">
                            <span className="text-gray-500 text-sm">Filtering by:</span>
                            <span className="text-cyan-400 text-sm font-medium">{filterJob.title}</span>
                            <button
                                onClick={onClearFilter}
                                className="text-gray-500 hover:text-white transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>

                {/* Status Filter */}
                <div className="flex items-center gap-2">
                    <span className="text-gray-500 text-sm">Filter:</span>
                    <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:border-cyan-400 focus:outline-none transition-colors"
                    >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="shortlisted">Shortlisted</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>
            </div>

            {/* Applications List */}
            {filteredApplications.length === 0 ? (
                <div className="text-center py-20 bg-white/[0.02] border border-white/5 rounded-2xl">
                    <svg className="w-16 h-16 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="text-xl font-syncopate font-bold text-white mb-2">No Applications</h3>
                    <p className="text-gray-400">
                        {filterJobId
                            ? 'No applications for this job yet.'
                            : 'No applications have been submitted yet.'}
                    </p>
                </div>
            ) : (
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-gray-500">
                                        Applicant
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-gray-500">
                                        Contact
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-gray-500">
                                        Job
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-gray-500">
                                        Applied
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-gray-500">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-gray-500">
                                        Resume
                                    </th>
                                    <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-widest text-gray-500">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filteredApplications.map((application) => (
                                    <tr key={application.id} className="hover:bg-white/[0.02] transition-colors">
                                        <td className="px-6 py-4">
                                            <span className="text-white font-medium">{application.applicant_name}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="space-y-1">
                                                <a
                                                    href={`mailto:${application.applicant_email}`}
                                                    className="text-cyan-400 hover:text-cyan-300 text-sm block"
                                                >
                                                    {application.applicant_email}
                                                </a>
                                                <a
                                                    href={`tel:${application.applicant_phone}`}
                                                    className="text-gray-400 hover:text-white text-sm block"
                                                >
                                                    {application.applicant_phone}
                                                </a>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-gray-400">{application.job_title || 'Unknown'}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-gray-500 text-sm">{formatDate(application.applied_date)}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <select
                                                value={application.status}
                                                onChange={(e) => handleStatusChange(application, e.target.value as Application['status'])}
                                                disabled={updatingId === application.id}
                                                className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full border ${statusColors[application.status]} bg-transparent focus:outline-none cursor-pointer disabled:opacity-50`}
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="reviewed">Reviewed</option>
                                                <option value="shortlisted">Shortlisted</option>
                                                <option value="rejected">Rejected</option>
                                            </select>
                                        </td>
                                        <td className="px-6 py-4">
                                            <a
                                                href={application.resume_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-cyan-400 hover:bg-white/10 transition-colors text-sm"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                                View
                                            </a>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end">
                                                <button
                                                    onClick={() => handleDelete(application)}
                                                    disabled={deletingId === application.id}
                                                    className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
                                                    title="Delete"
                                                >
                                                    {deletingId === application.id ? (
                                                        <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                                                    ) : (
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    )}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Stats */}
            <div className="mt-6 flex items-center gap-6 text-sm text-gray-500">
                <span>Total: {filteredApplications.length} applications</span>
                <span>Pending: {filteredApplications.filter(a => a.status === 'pending').length}</span>
                <span>Shortlisted: {filteredApplications.filter(a => a.status === 'shortlisted').length}</span>
            </div>
        </div>
    );
};

export default ApplicationsList;
