import React, { useState } from 'react';

const faqs = [
    {
        q: 'How do I update my profile details?',
        a: 'Click on your avatar in the top-right corner of the header, select "My Profile", or navigate to Settings. You can update your display name, email, and preferences there.',
    },
    {
        q: 'How is data updated in the dashboard?',
        a: 'The Activities line chart and Top Products donut chart update dynamically based on the date range selected in the dropdown filters.',
    },
    {
        q: 'How does Google Authentication work?',
        a: 'Sign In uses Google OAuth via @react-oauth/google. Your session state is securely saved in browser storage.',
    },
    {
        q: 'How do I enable Dark Mode?',
        a: 'Go to Settings in the sidebar, check "Dark Interface Mode", and click "Apply". The theme will persist across page refreshes.',
    },
];

export default function HelpModal({ isOpen, onClose }) {
    const [search, setSearch] = useState('');

    if (!isOpen) return null;

    const filteredFaqs = faqs.filter(
        (f) =>
            f.q.toLowerCase().includes(search.toLowerCase()) ||
            f.a.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
            <div className="bg-white rounded-[24px] max-w-lg w-full p-6 shadow-2xl border border-gray-100 relative space-y-5 max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">Help & Support Center</h2>
                        <p className="text-xs text-gray-400 mt-0.5">Frequently asked questions and user guide</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-700 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        ✕
                    </button>
                </div>

                {/* Search */}
                <div>
                    <input
                        type="text"
                        placeholder="Search help articles..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:bg-white focus:ring-2 focus:ring-gray-900/10"
                    />
                </div>

                {/* FAQ List */}
                <div className="space-y-3">
                    {filteredFaqs.map((faq, i) => (
                        <div key={i} className="p-3.5 bg-gray-50/70 rounded-2xl border border-gray-100 space-y-1">
                            <h3 className="text-xs font-bold text-gray-900 flex items-center gap-2">
                                <span className="w-4 h-4 rounded-full bg-gray-900 text-white text-[10px] flex items-center justify-center shrink-0">?</span>
                                {faq.q}
                            </h3>
                            <p className="text-[11px] text-gray-600 pl-6 leading-relaxed">{faq.a}</p>
                        </div>
                    ))}

                    {filteredFaqs.length === 0 && (
                        <p className="text-xs text-center text-gray-400 py-6">No matching help articles found.</p>
                    )}
                </div>

                {/* Footer */}
                <div className="pt-2 text-center">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-gray-900 text-white text-xs font-bold rounded-xl hover:bg-gray-800 transition-all"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
