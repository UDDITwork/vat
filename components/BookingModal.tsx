import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendBookingEmail } from '../services/emailService';

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type ViewState = 'date' | 'time' | 'form' | 'success';

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
    const [view, setView] = useState<ViewState>('date');
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [currentMonthDate, setCurrentMonthDate] = useState(new Date());

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        email: '',
        phone: ''
    });

    useEffect(() => {
        if (isOpen) {
            setCurrentMonthDate(new Date());
        }
    }, [isOpen]);

    const handleDateClick = (date: Date) => {
        setSelectedDate(date);
        setView('time');
    };

    const handleTimeClick = (time: string) => {
        setSelectedTime(time);
        setView('form');
    };

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedDate || !selectedTime) return;

        setIsSubmitting(true);

        await sendBookingEmail({
            name: formData.name,
            company: formData.company,
            email: formData.email,
            phone: formData.phone,
            date: selectedDate.toDateString(),
            time: selectedTime
        });

        setIsSubmitting(false);
        setView('success');
    };

    const resetModal = () => {
        setView('date');
        setSelectedDate(null);
        setSelectedTime(null);
        setFormData({ name: '', company: '', email: '', phone: '' });
        onClose();
    };

    // Calendar Logic
    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 (Sun) - 6 (Sat)

        // Adjust for Monday start (Monday = 0, Sunday = 6)
        const startDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

        const days = [];
        // Empty slots for previous month
        for (let i = 0; i < startDay; i++) {
            days.push(null);
        }
        // Days of current month
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(new Date(year, month, i));
        }
        return days;
    };

    const isDateDisabled = (date: Date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const checkDate = new Date(date);
        checkDate.setHours(0, 0, 0, 0);

        // Disable if past OR today (as per request "current day not available")
        return checkDate.getTime() <= today.getTime();
    };

    const formatMonthYear = (date: Date) => {
        return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' });
    };

    const changeMonth = (offset: number) => {
        const newDate = new Date(currentMonthDate);
        newDate.setMonth(newDate.getMonth() + offset);
        setCurrentMonthDate(newDate);
    };

    const calendarDays = getDaysInMonth(currentMonthDate);
    const weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

    const availableTimes = [
        "10:00am", "10:30am", "11:00am", "11:30am",
        "02:00pm", "02:30pm", "03:00pm", "04:00pm"
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={resetModal}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-4xl bg-[#111] border border-cyan-500/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px]"
                    >
                        {/* Left Panel: Branding & Info */}
                        <div className="md:w-1/3 bg-[#0a0a0a] p-8 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-between relative overflow-hidden">
                            {/* Decorative Gradient Blob */}
                            <div className="absolute top-0 left-0 w-full h-full bg-cyan-500/5 blur-3xl pointer-events-none" />

                            <div>
                                <div className="mb-8">
                                    <h3 className="text-xl font-bold font-syncopate tracking-wider text-white">VATALIQUE</h3>
                                </div>

                                <div className="mb-6">
                                    <p className="text-gray-400 text-sm font-medium mb-1">ai powered company</p>
                                    <h2 className="text-2xl text-white font-bold mb-4">Discovery Call</h2>

                                    <div className="flex items-center gap-3 text-gray-400 text-sm mb-2">
                                        <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        <span>30 min</span>
                                    </div>
                                    <div className="flex items-start gap-3 text-gray-400 text-sm">
                                        <svg className="w-5 h-5 text-cyan-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                                        <span>Web conferencing details provided upon confirmation.</span>
                                    </div>
                                </div>

                                <div className="text-gray-500 text-xs leading-relaxed">
                                    Hello,<br />
                                    Kindly book a meeting with us here to discuss your AI strategy.<br />
                                    Thank you.
                                </div>
                            </div>

                            <div className="mt-8 md:mt-0">
                                <button onClick={resetModal} className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors">
                                    Cookie settings
                                </button>
                            </div>
                        </div>

                        {/* Right Panel: Interactive Flow */}
                        <div className="md:w-2/3 bg-[#111] p-8 relative">
                            {/* Close Button */}
                            {/* Close Button */}
                            <button onClick={resetModal} className="absolute top-4 right-4 z-50 text-gray-500 hover:text-white transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>

                            {view === 'date' && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    key="date-view"
                                    className="h-full flex flex-col"
                                >
                                    <h2 className="text-xl text-white font-bold mb-6">Select a Date & Time</h2>

                                    <div className="flex items-center justify-between mb-6 px-4">
                                        <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-white/5 rounded-full text-gray-400 transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg></button>
                                        <span className="text-white font-medium">{formatMonthYear(currentMonthDate)}</span>
                                        <button onClick={() => changeMonth(1)} className="p-2 hover:bg-white/5 rounded-full text-gray-400 transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg></button>
                                    </div>

                                    <div className="grid grid-cols-7 gap-2 mb-4 text-center">
                                        {weekDays.map(d => (
                                            <div key={d} className="text-[10px] text-gray-500 font-bold tracking-wider">{d}</div>
                                        ))}
                                    </div>

                                    <div className="grid grid-cols-7 gap-2">
                                        {calendarDays.map((date, index) => {
                                            if (!date) return <div key={`empty-${index}`} />;

                                            const disabled = isDateDisabled(date);
                                            const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();

                                            return (
                                                <button
                                                    key={date.toISOString()}
                                                    disabled={disabled}
                                                    onClick={() => !disabled && handleDateClick(date)}
                                                    className={`
                                                        h-10 w-10 flex items-center justify-center rounded-full text-sm font-medium transition-all mx-auto
                                                        ${isSelected
                                                            ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                                                            : disabled
                                                                ? 'text-gray-600 cursor-not-allowed opacity-50'
                                                                : 'text-gray-300 hover:bg-white/10 hover:text-white'}
                                                    `}
                                                >
                                                    {date.getDate()}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    <div className="mt-auto pt-6 border-t border-white/10">
                                        <div className="flex items-center gap-2 text-sm text-gray-400">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                            <span>India Standard Time (12:42am)</span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {view === 'time' && selectedDate && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    key="time-view"
                                    className="h-full flex flex-col"
                                >
                                    <button onClick={() => setView('date')} className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 text-sm">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                                        Back to Calendar
                                    </button>
                                    <h2 className="text-xl text-white font-bold mb-2">Select a Time</h2>
                                    <p className="text-gray-400 text-sm mb-6">{formatDate(selectedDate)}</p>

                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
                                        {availableTimes.map(time => (
                                            <button
                                                key={time}
                                                onClick={() => handleTimeClick(time)}
                                                className="py-3 px-4 border border-cyan-500/30 text-cyan-400 font-medium rounded-lg hover:bg-cyan-500 hover:text-black transition-all text-center"
                                            >
                                                {time}
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {view === 'form' && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    key="form-view"
                                    className="h-full flex flex-col"
                                >
                                    <button onClick={() => setView('time')} className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 text-sm">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                                        Back to Time Selection
                                    </button>
                                    <h2 className="text-xl text-white font-bold mb-6">Enter Details</h2>

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <label className="block text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Name *</label>
                                            <input
                                                required
                                                type="text"
                                                value={formData.name}
                                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Company Name *</label>
                                            <input
                                                required
                                                type="text"
                                                value={formData.company}
                                                onChange={e => setFormData({ ...formData, company: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Email *</label>
                                            <input
                                                required
                                                type="email"
                                                value={formData.email}
                                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Phone Number *</label>
                                            <input
                                                required
                                                type="tel"
                                                value={formData.phone}
                                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className={`w-full bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-bold py-4 rounded-full mt-6 transition-all uppercase tracking-widest text-sm ${isSubmitting ? 'opacity-70 cursor-wait' : 'hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]'}`}
                                        >
                                            {isSubmitting ? 'Processing...' : 'Schedule Event'}
                                        </button>
                                    </form>
                                </motion.div>
                            )}

                            {view === 'success' && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="h-full flex flex-col items-center justify-center text-center"
                                >
                                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                                        <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    </div>
                                    <h2 className="text-2xl text-white font-bold mb-2">You are scheduled!</h2>
                                    <p className="text-gray-400 mb-8 max-w-xs">
                                        A calendar invitation has been sent to your email address.
                                    </p>
                                    <button
                                        onClick={resetModal}
                                        className="px-8 py-3 border border-white/20 hover:bg-white/10 rounded-full text-white text-sm font-bold transition-all"
                                    >
                                        Done
                                    </button>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default BookingModal;
