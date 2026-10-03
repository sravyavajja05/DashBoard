import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileModal from './ProfileModal';

export default function UserMenu() {
    const [open, setOpen] = useState(false);
    const [signingOut, setSigningOut] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [user, setUser] = useState(null);
    const ref = useRef(null);
    const navigate = useNavigate();

    const syncUser = () => {
        const userJson = localStorage.getItem('user');
        if (userJson) {
            setUser(JSON.parse(userJson));
        }
    };

    useEffect(() => {
        syncUser();
        // Listen for custom userUpdated event for instant reactivity
        window.addEventListener('userUpdated', syncUser);
        return () => window.removeEventListener('userUpdated', syncUser);
    }, []);

    useEffect(() => {
        const handler = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const handleLogout = () => {
        setOpen(false);
        setSigningOut(true);
        setTimeout(() => {
            localStorage.removeItem('user');
            navigate('/login');
        }, 2000);
    };

    const handleUpdateUser = (updated) => {
        setUser(updated);
        window.dispatchEvent(new Event('userUpdated'));
    };

    if (!user) return null;

    // Full-screen sign-out overlay
    if (signingOut) {
        return (
            <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center gap-4">
                <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                <p className="text-white text-sm font-semibold tracking-wide">Signing out…</p>
            </div>
        );
    }

    return (
        <>
            <div className="relative flex items-center gap-2" ref={ref}>
                <button
                    onClick={() => setOpen(!open)}
                    className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
                >
                    {user.picture ? (
                        <img
                            src={user.picture}
                            alt={user.name || 'User'}
                            className="w-8 h-8 rounded-full object-cover shadow-sm ring-1 ring-black/5"
                        />
                    ) : (
                        <div className="w-8 h-8 rounded-full bg-gray-900 text-white font-bold flex items-center justify-center text-xs shadow-sm">
                            {user.name?.[0]?.toUpperCase() || 'U'}
                        </div>
                    )}
                    <span className="hidden md:block text-xs font-bold text-gray-800">
                        {user.name || 'User'}
                    </span>
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        className={`text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`}
                    >
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </button>

                {open && (
                    <div className="absolute right-0 top-10 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-fadeIn">
                        <div className="px-4 py-2.5 border-b border-gray-100">
                            <p className="text-xs font-bold text-gray-900">{user.name || 'User'}</p>
                            <p className="text-[11px] text-gray-400 truncate">{user.email || ''}</p>
                        </div>
                        <button
                            onClick={() => {
                                setOpen(false);
                                setProfileOpen(true);
                            }}
                            className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 transition-colors font-semibold cursor-pointer"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                            My Profile
                        </button>
                        <div className="border-t border-gray-100 my-1">
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-red-500 hover:bg-red-50 transition-colors font-semibold cursor-pointer"
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
                                Sign Out
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Profile Modal */}
            <ProfileModal
                isOpen={profileOpen}
                onClose={() => setProfileOpen(false)}
                user={user}
                onUpdateUser={handleUpdateUser}
            />
        </>
    );
}
