import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import HelpModal from './HelpModal';
import ContactModal from './ContactModal';

const navItems = [
    {
        name: 'Dashboard',
        path: '/dashboard',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <polyline points="12 6 12 12 16 14" />
            </svg>
        ),
    },
    {
        name: 'Transactions',
        path: '/dashboard/transactions',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                <line x1="7" y1="7" x2="7.01" y2="7" />
            </svg>
        ),
    },
    {
        name: 'Schedules',
        path: '/dashboard/schedules',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
        ),
    },
    {
        name: 'Users',
        path: '/dashboard/users',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
            </svg>
        ),
    },
    {
        name: 'Settings',
        path: '/dashboard/settings',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
        ),
    },
];

export default function Sidebar({ mobileOpen, setMobileOpen }) {
    const [helpOpen, setHelpOpen] = useState(false);
    const [contactOpen, setContactOpen] = useState(false);

    return (
        <>
            {/* Mobile Backdrop */}
            {mobileOpen && (
                <div
                    onClick={() => setMobileOpen(false)}
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                />
            )}

            <aside
                className={`fixed lg:static top-0 left-0 bottom-0 z-50 w-60 bg-[#111111] text-white p-6 flex flex-col justify-between transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                    } m-0 lg:m-4 lg:rounded-[30px] shadow-2xl shrink-0`}
            >
                <div className="space-y-8">
                    {/* Logo */}
                    <div className="flex items-center justify-between">
                        <span className="text-3xl font-extrabold tracking-tight text-white">Board.</span>
                        <button
                            onClick={() => setMobileOpen(false)}
                            className="lg:hidden text-gray-400 hover:text-white"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="space-y-4">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                end={item.path === '/dashboard'}
                                onClick={() => setMobileOpen(false)}
                                className={({ isActive }) =>
                                    `flex items-center gap-3.5 px-2 py-1.5 text-xs font-semibold rounded-xl transition-colors ${isActive
                                        ? 'text-white font-bold'
                                        : 'text-gray-400 hover:text-white'
                                    }`
                                }
                            >
                                {item.icon}
                                <span>{item.name}</span>
                            </NavLink>
                        ))}
                    </nav>
                </div>

                {/* Footer links matching exact screenshot */}
                <div className="pt-6 border-t border-white/10 space-y-2 text-xs text-gray-400 font-medium">
                    <button
                        onClick={() => setHelpOpen(true)}
                        className="block hover:text-white transition-colors cursor-pointer text-left w-full"
                    >
                        Help
                    </button>
                    <button
                        onClick={() => setContactOpen(true)}
                        className="block hover:text-white transition-colors cursor-pointer text-left w-full"
                    >
                        Contact Us
                    </button>
                </div>
            </aside>

            {/* Help Modal */}
            <HelpModal isOpen={helpOpen} onClose={() => setHelpOpen(false)} />

            {/* Contact Modal */}
            <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
        </>
    );
}
