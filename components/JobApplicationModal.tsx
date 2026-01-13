import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Job } from '../types';
import { createApplication } from '../services/api';
import { uploadResume } from '../services/cloudinaryService';

interface JobApplicationModalProps {
    isOpen: boolean;
    onClose: () => void;
    job: Job;
}

type ViewState = 'form' | 'uploading' | 'success' | 'error';

const JobApplicationModal: React.FC<JobApplicationModalProps> = ({ isOpen, onClose, job }) => {
    const [view, setView] = useState<ViewState>('form');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        coverLetter: '',
    });
    const [resumeFile, setResumeFile] = useState<File | null>(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.type !== 'application/pdf') {
                setErrorMessage('Please upload a PDF file only');
                return;
            }
            if (file.size > 10 * 1024 * 1024) {
                setErrorMessage('File size must be less than 10MB');
                return;
            }
            setResumeFile(file);
            setErrorMessage('');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage('');

        if (!resumeFile) {
            setErrorMessage('Please upload your resume');
            return;
        }

        try {
            setView('uploading');
            setUploadProgress(20);

            // Upload resume to Cloudinary
            const resumeUrl = await uploadResume(resumeFile);
            setUploadProgress(60);

            // Submit application
            await createApplication({
                job_id: job.id,
                applicant_name: formData.name,
                applicant_email: formData.email,
                applicant_phone: formData.phone,
                resume_url: resumeUrl,
                cover_letter: formData.coverLetter || undefined,
            });

            setUploadProgress(100);
            setView('success');
        } catch (error) {
            console.error('Application submission error:', error);
            setErrorMessage(error instanceof Error ? error.message : 'Failed to submit application');
            setView('error');
        }
    };

    const handleClose = () => {
        setView('form');
        setFormData({ name: '', email: '', phone: '', coverLetter: '' });
        setResumeFile(null);
        setUploadProgress(0);
        setErrorMessage('');
        onClose();
    };

    const renderForm = () => (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Job Info */}
            <div className="bg-white/5 rounded-xl p-4 mb-6">
                <p className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-1">Applying for</p>
                <h3 className="text-lg font-syncopate font-bold text-white">{job.title}</h3>
                <p className="text-gray-400 text-sm">{job.department} • {job.location}</p>
            </div>

            {/* Name */}
            <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                    Full Name *
                </label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none transition-colors"
                    placeholder="John Doe"
                />
            </div>

            {/* Email */}
            <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                    Email Address *
                </label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none transition-colors"
                    placeholder="john@example.com"
                />
            </div>

            {/* Phone */}
            <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                    Phone Number *
                </label>
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none transition-colors"
                    placeholder="+91 98765 43210"
                />
            </div>

            {/* Resume Upload */}
            <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                    Resume (PDF) *
                </label>
                <div className="relative">
                    <input
                        type="file"
                        accept=".pdf,application/pdf"
                        onChange={handleFileChange}
                        className="hidden"
                        id="resume-upload"
                    />
                    <label
                        htmlFor="resume-upload"
                        className={`flex items-center justify-center gap-3 w-full px-4 py-4 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                            resumeFile
                                ? 'border-cyan-400/50 bg-cyan-400/5'
                                : 'border-white/10 hover:border-white/20 bg-white/5'
                        }`}
                    >
                        {resumeFile ? (
                            <>
                                <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-cyan-400 font-medium">{resumeFile.name}</span>
                            </>
                        ) : (
                            <>
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                                <span className="text-gray-400">Click to upload PDF (max 10MB)</span>
                            </>
                        )}
                    </label>
                </div>
            </div>

            {/* Cover Letter */}
            <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                    Cover Letter <span className="text-gray-600">(Optional)</span>
                </label>
                <textarea
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none transition-colors resize-none"
                    placeholder="Tell us why you're interested in this role..."
                />
            </div>

            {/* Error Message */}
            {errorMessage && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <p className="text-red-400 text-sm">{errorMessage}</p>
                </div>
            )}

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full px-6 py-4 bg-cyan-500 text-black font-bold uppercase tracking-widest hover:bg-cyan-400 transition-colors rounded-lg"
            >
                Submit Application
            </button>
        </form>
    );

    const renderUploading = () => (
        <div className="text-center py-12">
            <div className="w-20 h-20 mx-auto mb-6 relative">
                <svg className="w-20 h-20 animate-spin" viewBox="0 0 100 100">
                    <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="8"
                        fill="none"
                    />
                    <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="#22d3ee"
                        strokeWidth="8"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={`${uploadProgress * 2.51} 251`}
                        transform="rotate(-90 50 50)"
                    />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-cyan-400 font-bold">
                    {uploadProgress}%
                </span>
            </div>
            <h3 className="text-xl font-syncopate font-bold text-white mb-2">Submitting Application</h3>
            <p className="text-gray-400">Please wait while we upload your resume...</p>
        </div>
    );

    const renderSuccess = () => (
        <div className="text-center py-12">
            <div className="w-20 h-20 mx-auto mb-6 bg-emerald-500/20 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
            </div>
            <h3 className="text-xl font-syncopate font-bold text-white mb-2">Application Submitted!</h3>
            <p className="text-gray-400 mb-8">
                Thank you for applying. We'll review your application and get back to you soon.
            </p>
            <button
                onClick={handleClose}
                className="px-8 py-3 bg-white text-black font-bold uppercase tracking-widest hover:bg-cyan-400 transition-colors rounded-lg"
            >
                Done
            </button>
        </div>
    );

    const renderError = () => (
        <div className="text-center py-12">
            <div className="w-20 h-20 mx-auto mb-6 bg-red-500/20 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
            <h3 className="text-xl font-syncopate font-bold text-white mb-2">Submission Failed</h3>
            <p className="text-gray-400 mb-8">{errorMessage || 'Something went wrong. Please try again.'}</p>
            <button
                onClick={() => setView('form')}
                className="px-8 py-3 bg-white text-black font-bold uppercase tracking-widest hover:bg-cyan-400 transition-colors rounded-lg"
            >
                Try Again
            </button>
        </div>
    );

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                >
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        onClick={view === 'form' ? handleClose : undefined}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.2 }}
                        className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
                    >
                        {/* Header */}
                        <div className="sticky top-0 bg-[#0a0a0a] border-b border-white/10 px-6 py-4 flex items-center justify-between z-10">
                            <h2 className="text-lg font-syncopate font-bold text-white">Apply for Position</h2>
                            {view === 'form' && (
                                <button
                                    onClick={handleClose}
                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            {view === 'form' && renderForm()}
                            {view === 'uploading' && renderUploading()}
                            {view === 'success' && renderSuccess()}
                            {view === 'error' && renderError()}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default JobApplicationModal;
