import React, { useState } from 'react';

export default function ProfileModal({ isOpen, onClose, user, onUpdateUser }) {
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [role, setRole] = useState(user?.role || 'Administrator');
    const [saved, setSaved] = useState(false);

    if (!isOpen || !user) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        const updated = {
            ...user,
            name,
            email,
            role,
        };
        localStorage.setItem('user', JSON.stringify(updated));
        if (onUpdateUser) onUpdateUser(updated);
        setSaved(true);
        setTimeout(() => {
            setSaved(false);
            onClose();
        }, 600);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-0 sm:p-4 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl shadow-2xl border border-gray-100 overflow-hidden max-h-[92vh] overflow-y-auto">
                {/* Modal Header */}
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                    <h3 className="text-base font-bold text-gray-900">My Profile</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-700 p-1 rounded-lg hover:bg-gray-200/50 transition-colors"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                    </button>
                </div>

                {/* Modal Body */}
                <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-5">
                    {/* User Avatar Section */}
                    <div className="flex items-center gap-4">
                        {user.picture ? (
                            <img
                                src={user.picture}
                                alt={name}
                                className="w-16 h-16 rounded-full ring-2 ring-gray-900/10 object-cover"
                            />
                        ) : (
                            <div className="w-16 h-16 rounded-full bg-gray-900 text-white font-extrabold flex items-center justify-center text-xl shadow-md">
                                {name?.[0]?.toUpperCase() || 'U'}
                            </div>
                        )}
                        <div>
                            <h4 className="text-sm font-bold text-gray-900">{name || 'User'}</h4>
                            <p className="text-xs text-gray-400">{email || 'user@example.com'}</p>
                            <span className="inline-block mt-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                                Active Member
                            </span>
                        </div>
                    </div>

                    <div className="border-t border-gray-100 pt-4 space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name</label>
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-gray-900/10 transition-all font-medium text-gray-800"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-gray-900/10 transition-all font-medium text-gray-800"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Account Role</label>
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-gray-900/10 transition-all font-medium text-gray-800"
                            >
                                <option value="Administrator">Administrator</option>
                                <option value="Manager">Manager</option>
                                <option value="Analyst">Analyst</option>
                                <option value="Viewer">Viewer</option>
                            </select>
                        </div>
                    </div>

                    {/* Modal Actions */}
                    <div className="flex items-center justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2 text-xs font-semibold text-white bg-gray-900 hover:bg-gray-800 rounded-xl transition-all shadow-sm flex items-center gap-2"
                        >
                            {saved ? '✓ Saved!' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
