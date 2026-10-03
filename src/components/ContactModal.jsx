import React, { useState } from 'react';

export default function ContactModal({ isOpen, onClose }) {
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [sent, setSent] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        setSent(true);
        setTimeout(() => {
            setSent(false);
            setSubject('');
            setMessage('');
            onClose();
        }, 2000);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
            <div className="bg-white rounded-[24px] max-w-md w-full p-6 shadow-2xl border border-gray-100 relative space-y-5">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">Contact Support</h2>
                        <p className="text-xs text-gray-400 mt-0.5">We are available 24/7 to assist you</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-700 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        ✕
                    </button>
                </div>

                {/* Support details */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                        <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Email Us</span>
                        <span className="font-semibold text-gray-800 text-[11px] block truncate">support@board.io</span>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                        <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Live Chat</span>
                        <span className="font-semibold text-emerald-600 text-[11px] flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            Online Now
                        </span>
                    </div>
                </div>

                {/* Message Form */}
                <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                    <div>
                        <label className="block font-semibold text-gray-700 mb-1">Subject</label>
                        <input
                            type="text"
                            required
                            placeholder="e.g. Question about analytics export"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-gray-900/10 font-medium"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold text-gray-700 mb-1">Message</label>
                        <textarea
                            required
                            rows={3}
                            placeholder="Describe your inquiry or feedback..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-gray-900/10 font-medium resize-none"
                        />
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-2">
                        {sent && (
                            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                                ✓ Message Sent!
                            </span>
                        )}
                        <button
                            type="submit"
                            className="px-6 py-2 bg-gray-900 text-white text-xs font-bold rounded-xl hover:bg-gray-800 transition-all shadow-sm"
                        >
                            Send Message
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
