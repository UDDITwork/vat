import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="relative py-20 px-6 border-t border-gray-200 dark:border-white/5 bg-slate-100 dark:bg-black transition-colors duration-300">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="space-y-6">
                    <div className="font-syncopate font-bold text-2xl tracking-tighter text-slate-900 dark:text-white">
                        VATA<span className="text-cyan-600 dark:text-cyan-400">LIQUE</span>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                        AI systems that automate work, replace manual effort, and scale businesses.
                    </p>
                </div>
                <div>
                    <h5 className="text-[10px] uppercase tracking-widest text-gray-900 dark:text-white font-bold mb-6">Contact</h5>
                    <div className="space-y-4 text-gray-500 text-sm font-medium">
                        {/* Address */}
                        <a
                            href="https://maps.app.goo.gl/UfRWPLNtTNtBr4kG6"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-start gap-3 hover:text-cyan-400 transition-colors group"
                        >
                            <svg className="w-5 h-5 text-cyan-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="leading-relaxed">35N, HR ESTATE, Bodla, Bichpuri, road, agra, 282010</span>
                        </a>

                        {/* Phone */}
                        <a
                            href="tel:+917906147228"
                            className="flex items-center gap-3 hover:text-cyan-400 transition-colors group"
                        >
                            <svg className="w-5 h-5 text-cyan-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <span>+91 7906147228</span>
                        </a>

                        {/* Email */}
                        <a
                            href="mailto:support@vatalique.com"
                            className="flex items-center gap-3 hover:text-cyan-400 transition-colors group"
                        >
                            <svg className="w-5 h-5 text-cyan-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span>support@vatalique.com</span>
                        </a>

                        {/* GSTIN */}
                        <div className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-cyan-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span>GSTIN: 09EYNPR9219B1ZX</span>
                        </div>
                    </div>
                </div>
                <div>
                    <h5 className="text-[10px] uppercase tracking-widest text-gray-900 dark:text-white font-bold mb-6">Connect</h5>
                    <ul className="space-y-4 text-gray-500 text-sm">
                        <li>
                            <a href="https://x.com/vatalique" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-cyan-400 transition-colors group">
                                <svg className="w-5 h-5 text-cyan-500 shrink-0 p-0.5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zl-1.161-.031a.031.031 0 0 1-.029-.003.031.031 0 0 1-.005-.029l-3-10zM14.28 17H16.1L4.82 2.25H3L14.28 17z" />
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.613-7.352 5.837 7.621z" opacity="0" />
                                    {/* Standard X logo path corrected for simple fill */}
                                    <path d="M18.901 0h3.666l-8.007 9.155L24 23h-7.376l-5.776-7.551L4.038 23H.372l8.528-9.752L0 0h7.568l5.247 6.936L18.901 0ZM17.616 20.806h2.03L6.38 2.052H4.202l13.414 18.754Z" />
                                </svg>
                                <span>X / Twitter</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.linkedin.com/company/vatalique/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-cyan-400 transition-colors group">
                                <svg className="w-5 h-5 text-cyan-500 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                                <span>LinkedIn</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.instagram.com/the.vatalique?igsh=MWx3bWV0OThteXAxcQ==" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-cyan-400 transition-colors group">
                                <svg className="w-5 h-5 text-cyan-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 011.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772 4.915 4.915 0 01-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.791.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.454 2.525c.637-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 7a5 5 0 100 10 5 5 0 000-10z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.5 6.5h.01" />
                                </svg>
                                <span>Instagram</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};
