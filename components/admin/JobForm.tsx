import React, { useState } from 'react';
import { Job, JobFormData } from '../../types';
import { createJob, updateJob } from '../../services/api';

interface JobFormProps {
    job?: Job | null;
    onSave: () => void;
    onCancel: () => void;
}

const JobForm: React.FC<JobFormProps> = ({ job, onSave, onCancel }) => {
    const [formData, setFormData] = useState<JobFormData>({
        title: job?.title || '',
        department: job?.department || '',
        location: job?.location || '',
        type: job?.type || 'full-time',
        description: job?.description || '',
        requirements: job?.requirements || '',
        responsibilities: job?.responsibilities || '',
        salary_range: job?.salary_range || '',
        is_active: job?.is_active ?? true,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            if (job) {
                await updateJob(job.id, formData);
            } else {
                await createJob(formData);
            }
            onSave();
        } catch (err) {
            setError('Failed to save job. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-3xl">
            <h2 className="text-2xl font-syncopate font-bold text-white mb-8">
                {job ? 'Edit Job' : 'Create New Job'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                        Job Title *
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none transition-colors"
                        placeholder="e.g., Senior Full-Stack Developer"
                    />
                </div>

                {/* Department & Location */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                            Department *
                        </label>
                        <input
                            type="text"
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none transition-colors"
                            placeholder="e.g., Engineering"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                            Location *
                        </label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none transition-colors"
                            placeholder="e.g., Remote / Mumbai, India"
                        />
                    </div>
                </div>

                {/* Type & Salary */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                            Employment Type *
                        </label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition-colors"
                        >
                            <option value="full-time">Full-time</option>
                            <option value="part-time">Part-time</option>
                            <option value="contract">Contract</option>
                            <option value="internship">Internship</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                            Salary Range <span className="text-gray-600">(Optional)</span>
                        </label>
                        <input
                            type="text"
                            name="salary_range"
                            value={formData.salary_range}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none transition-colors"
                            placeholder="e.g., ₹12-18 LPA"
                        />
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                        Job Description *
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none transition-colors resize-none"
                        placeholder="Describe the role and what the candidate will be doing..."
                    />
                </div>

                {/* Requirements */}
                <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                        Requirements *
                    </label>
                    <textarea
                        name="requirements"
                        value={formData.requirements}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none transition-colors resize-none"
                        placeholder="List the required skills and qualifications (one per line)..."
                    />
                    <p className="text-gray-600 text-xs mt-1">Enter each requirement on a new line</p>
                </div>

                {/* Responsibilities */}
                <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                        Responsibilities <span className="text-gray-600">(Optional)</span>
                    </label>
                    <textarea
                        name="responsibilities"
                        value={formData.responsibilities}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none transition-colors resize-none"
                        placeholder="List the key responsibilities (one per line)..."
                    />
                </div>

                {/* Is Active */}
                <div className="flex items-center gap-3">
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            name="is_active"
                            checked={formData.is_active}
                            onChange={handleChange}
                            className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                    </label>
                    <span className="text-gray-400">Publish immediately (visible on careers page)</span>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                        <p className="text-red-400 text-sm">{error}</p>
                    </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-4 pt-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-8 py-3 bg-cyan-500 text-black font-bold uppercase tracking-widest hover:bg-cyan-400 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors rounded-lg flex items-center gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                Saving...
                            </>
                        ) : (
                            job ? 'Update Job' : 'Create Job'
                        )}
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-8 py-3 bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest hover:bg-white/10 transition-colors rounded-lg"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default JobForm;
