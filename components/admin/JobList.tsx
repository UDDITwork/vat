import React, { useState } from 'react';
import { Job } from '../../types';
import { deleteJob, toggleJobActive } from '../../services/api';

interface JobListProps {
    jobs: Job[];
    applicationCounts: Record<string, number>;
    onEdit: (job: Job) => void;
    onRefresh: () => void;
    onViewApplications: (jobId: string) => void;
}

const JobList: React.FC<JobListProps> = ({
    jobs,
    applicationCounts,
    onEdit,
    onRefresh,
    onViewApplications
}) => {
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [togglingId, setTogglingId] = useState<string | null>(null);

    const handleToggleActive = async (job: Job) => {
        setTogglingId(job.id);
        await toggleJobActive(job.id);
        onRefresh();
        setTogglingId(null);
    };

    const handleDelete = async (job: Job) => {
        if (!confirm(`Are you sure you want to delete "${job.title}"? This will also delete all applications for this job.`)) {
            return;
        }
        setDeletingId(job.id);
        await deleteJob(job.id);
        onRefresh();
        setDeletingId(null);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    if (jobs.length === 0) {
        return (
            <div className="text-center py-20 bg-white/[0.02] border border-white/5 rounded-2xl">
                <svg className="w-16 h-16 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <h3 className="text-xl font-syncopate font-bold text-white mb-2">No Jobs Yet</h3>
                <p className="text-gray-400">Create your first job posting to get started.</p>
            </div>
        );
    }

    return (
        <div className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-white/10">
                            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-gray-500">
                                Title
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-gray-500">
                                Department
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-gray-500">
                                Location
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-gray-500">
                                Type
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-gray-500">
                                Status
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-gray-500">
                                Applications
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-gray-500">
                                Posted
                            </th>
                            <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-widest text-gray-500">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {jobs.map((job) => (
                            <tr key={job.id} className="hover:bg-white/[0.02] transition-colors">
                                <td className="px-6 py-4">
                                    <span className="text-white font-medium">{job.title}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-gray-400">{job.department}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-gray-400">{job.location}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-gray-400 capitalize">{job.type.replace('-', ' ')}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span
                                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-full ${
                                            job.is_active
                                                ? 'bg-emerald-500/20 text-emerald-400'
                                                : 'bg-gray-500/20 text-gray-400'
                                        }`}
                                    >
                                        <span className={`w-1.5 h-1.5 rounded-full ${job.is_active ? 'bg-emerald-400' : 'bg-gray-400'}`} />
                                        {job.is_active ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => onViewApplications(job.id)}
                                        className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
                                    >
                                        {applicationCounts[job.id] || 0} applications
                                    </button>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-gray-500 text-sm">{formatDate(job.posted_date)}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            onClick={() => handleToggleActive(job)}
                                            disabled={togglingId === job.id}
                                            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50"
                                            title={job.is_active ? 'Deactivate' : 'Activate'}
                                        >
                                            {togglingId === job.id ? (
                                                <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                                            ) : job.is_active ? (
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                                </svg>
                                            ) : (
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            )}
                                        </button>
                                        <button
                                            onClick={() => onEdit(job)}
                                            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                            title="Edit"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => handleDelete(job)}
                                            disabled={deletingId === job.id}
                                            className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
                                            title="Delete"
                                        >
                                            {deletingId === job.id ? (
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
    );
};

export default JobList;
