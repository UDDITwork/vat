import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { adminLogin } from '../../services/api';

interface AdminLoginProps {
    onLogin: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const success = await adminLogin(password);
            if (success) {
                sessionStorage.setItem('admin_auth', 'true');
                onLogin();
            } else {
                setError('Invalid password');
            }
        } catch (err) {
            setError('Login failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[200] bg-[#050505] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                {/* Logo */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-syncopate font-bold text-white">
                        VATAL<span className="text-cyan-400">IQUE</span>
                    </h1>
                    <p className="text-gray-500 text-sm mt-2">Admin Panel</p>
                </div>

                {/* Login Card */}
                <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8">
                    <h2 className="text-xl font-syncopate font-bold text-white mb-6 text-center">
                        Administrator Access
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none transition-colors"
                                placeholder="Enter admin password"
                                autoFocus
                            />
                        </div>

                        {error && (
                            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                                <p className="text-red-400 text-sm text-center">{error}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading || !password}
                            className="w-full px-6 py-3 bg-cyan-500 text-black font-bold uppercase tracking-widest hover:bg-cyan-400 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors rounded-lg flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                    Verifying...
                                </>
                            ) : (
                                'Login'
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                window.location.hash = '';
                                window.location.reload();
                            }}
                            className="text-gray-500 text-sm hover:text-cyan-400 transition-colors"
                        >
                            ← Back to Website
                        </a>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
