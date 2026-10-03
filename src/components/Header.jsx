import React from 'react';
import UserMenu from './UserMenu';

export default function Header({ setMobileOpen, title }) {
    return (
        <header className="bg-transparent px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-5 flex items-center justify-between gap-2 shrink-0">
            {/* Title & Mobile hamburger */}
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <button
                    onClick={() => setMobileOpen(true)}
                    className="lg:hidden text-gray-700 hover:text-gray-900 p-1.5 rounded-lg hover:bg-gray-100 transition-colors shrink-0"
                    aria-label="Open menu"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="3" y1="12" x2="21" y2="12" />
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <line x1="3" y1="18" x2="21" y2="18" />
                    </svg>
                </button>
                <h1 className="text-lg sm:text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight truncate">{title}</h1>
            </div>

            {/* Right controls */}
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4 shrink-0">
                {/* Search — hidden on very small, shown sm+ */}
                <div className="relative hidden sm:block w-32 md:w-44 lg:w-48">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full bg-white text-xs text-gray-700 placeholder-gray-400 pl-4 pr-9 py-2 rounded-full outline-none shadow-sm transition-all focus:ring-2 focus:ring-gray-900/10"
                    />
                    <svg
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                        width="13" height="13" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    >
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                </div>

                {/* Notification Bell */}
                <button className="text-gray-700 hover:text-gray-900 relative transition-colors p-1.5 rounded-lg hover:bg-gray-100">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                    </svg>
                </button>

                {/* Profile */}
                <UserMenu />
            </div>
        </header>
    );
}
