import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function DashboardLayout() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();

    const getTitle = () => {
        if (location.pathname.includes('/analytics')) return 'Analytics';
        if (location.pathname.includes('/users')) return 'Users';
        if (location.pathname.includes('/transactions')) return 'Transactions';
        if (location.pathname.includes('/schedules')) return 'Schedules';
        if (location.pathname.includes('/settings')) return 'Settings';
        return 'Dashboard';
    };

    return (
        <div className="flex h-screen min-h-screen bg-gray-50 overflow-hidden">
            <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden w-0">
                <Header setMobileOpen={setMobileOpen} title={getTitle()} />
                <main className="flex-1 overflow-y-auto overflow-x-hidden p-3 sm:p-4 md:p-6 lg:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
