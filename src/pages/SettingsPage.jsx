import React, { useState, useEffect } from 'react';

export default function SettingsPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [notifications, setNotifications] = useState(true);
    const [emailAlerts, setEmailAlerts] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [applied, setApplied] = useState(false);

    useEffect(() => {
        const userJson = localStorage.getItem('user');
        if (userJson) {
            const user = JSON.parse(userJson);
            setName(user.name || '');
            setEmail(user.email || '');
        }

        const isDark = localStorage.getItem('darkMode') === 'true';
        setDarkMode(isDark);
    }, []);

    const handleApply = (e) => {
        e.preventDefault();

        // 1. Save user info
        const userJson = localStorage.getItem('user');
        const existing = userJson ? JSON.parse(userJson) : {};
        const updated = {
            ...existing,
            name,
            email,
        };
        localStorage.setItem('user', JSON.stringify(updated));

        // 2. Save and apply dark mode theme
        localStorage.setItem('darkMode', darkMode ? 'true' : 'false');
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        // 3. Dispatch global custom events so all components update state instantly
        window.dispatchEvent(new Event('userUpdated'));
        window.dispatchEvent(new Event('themeUpdated'));

        setApplied(true);
        setTimeout(() => setApplied(false), 2500);
    };

    return (
        <div className="space-y-4 sm:space-y-6 w-full max-w-3xl">
            <div>
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">Account Settings</h1>
                <p className="text-xs text-gray-400 mt-0.5">Manage your preferences and system options</p>
            </div>

            <form onSubmit={handleApply} className="space-y-6">
                {/* Profile Settings */}
                <div className="bg-white rounded-[20px] p-6 border border-gray-100/60 shadow-xs space-y-4">
                    <h2 className="text-sm font-bold text-gray-900">Profile Information</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div>
                            <label className="block font-semibold text-gray-700 mb-1">Display Name</label>
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Your Name"
                                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-gray-900/10 transition-all font-medium text-gray-800"
                            />
                        </div>
                        <div>
                            <label className="block font-semibold text-gray-700 mb-1">Email Address</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your.email@gmail.com"
                                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-gray-900/10 transition-all font-medium text-gray-800"
                            />
                        </div>
                    </div>
                </div>

                {/* Preferences */}
                <div className="bg-white rounded-[20px] p-6 border border-gray-100/60 shadow-xs space-y-4">
                    <h2 className="text-sm font-bold text-gray-900">Notification Preferences</h2>
                    <div className="space-y-3 text-xs">
                        <label className="flex items-center justify-between cursor-pointer">
                            <span className="font-medium text-gray-700">Push Notifications</span>
                            <input
                                type="checkbox"
                                checked={notifications}
                                onChange={(e) => setNotifications(e.target.checked)}
                                className="w-4 h-4 rounded text-gray-900 focus:ring-0 cursor-pointer"
                            />
                        </label>
                        <label className="flex items-center justify-between cursor-pointer">
                            <span className="font-medium text-gray-700">Email Alerts</span>
                            <input
                                type="checkbox"
                                checked={emailAlerts}
                                onChange={(e) => setEmailAlerts(e.target.checked)}
                                className="w-4 h-4 rounded text-gray-900 focus:ring-0 cursor-pointer"
                            />
                        </label>
                        <label className="flex items-center justify-between cursor-pointer">
                            <span className="font-medium text-gray-700">Dark Interface Mode</span>
                            <input
                                type="checkbox"
                                checked={darkMode}
                                onChange={(e) => setDarkMode(e.target.checked)}
                                className="w-4 h-4 rounded text-gray-900 focus:ring-0 cursor-pointer"
                            />
                        </label>
                    </div>
                </div>

                {/* Apply Button */}
                <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-3 pt-2">
                    {applied && (
                        <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3.5 py-1.5 rounded-xl border border-emerald-200 animate-fadeIn text-center">
                            ✓ Applied Successfully!
                        </span>
                    )}
                    <button
                        type="submit"
                        className="px-8 py-2.5 text-xs font-bold text-white bg-gray-900 hover:bg-gray-800 rounded-xl transition-all shadow-sm cursor-pointer"
                    >
                        Apply
                    </button>
                </div>
            </form>
        </div>
    );
}
