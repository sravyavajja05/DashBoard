import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardLayout from './pages/DashboardLayout';
import DashboardPage from './pages/DashboardPage';
import TransactionsPage from './pages/TransactionsPage';
import SchedulesPage from './pages/SchedulesPage';
import UsersPage from './pages/UsersPage';
import SettingsPage from './pages/SettingsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />

            {/* Protected Dashboard Routes */}
            <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<DashboardLayout />}>
                    <Route index element={<DashboardPage />} />
                    <Route path="transactions" element={<TransactionsPage />} />
                    <Route path="schedules" element={<SchedulesPage />} />
                    <Route path="users" element={<UsersPage />} />
                    <Route path="settings" element={<SettingsPage />} />
                    <Route path="analytics" element={<AnalyticsPage />} />
                </Route>
            </Route>

            {/* Default fallback */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
    );
}
