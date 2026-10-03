import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { topProductsData, scheduleData, activitiesData } from '../data/chartData';
import { ActivityChart, ProductsChart } from '../components/ChartCards';

const statsCards = [
    {
        title: 'Total Revenues',
        value: '$2,129,430',
        bg: '#DDEFE0',
        darkClass: 'stat-card-green',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="6" width="20" height="12" rx="2" /><circle cx="12" cy="12" r="3" /><path d="M6 12h.01M18 12h.01" />
            </svg>
        ),
    },
    {
        title: 'Total Transactions',
        value: '1,520',
        bg: '#F4EAE1',
        darkClass: 'stat-card-cream',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" />
            </svg>
        ),
    },
    {
        title: 'Total Likes',
        value: '9,721',
        bg: '#F4E2E2',
        darkClass: 'stat-card-pink',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2h3" />
            </svg>
        ),
    },
    {
        title: 'Total Users',
        value: '892',
        bg: '#E5E7F9',
        darkClass: 'stat-card-purple',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        ),
    },
];

const dateOptions = ['May - June 2021', 'July - August 2021', 'Sept - Oct 2021', 'Nov - Dec 2021'];

export default function DashboardPage() {
    const navigate = useNavigate();
    const [actDate, setActDate] = useState('May - June 2021');
    const [actOpen, setActOpen] = useState(false);

    const [prodDate, setProdDate] = useState('May - June 2021');
    const [prodOpen, setProdOpen] = useState(false);

    return (
        <div className="space-y-4 sm:space-y-6">
            {/* ── 4 Stats Cards ── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
                {statsCards.map((card, i) => (
                    <div
                        key={i}
                        className={`rounded-[20px] p-5 flex flex-col justify-between shadow-xs transition-transform hover:-translate-y-0.5 ${card.darkClass}`}
                        style={{ backgroundColor: card.bg }}
                    >
                        <div className="flex items-start justify-between">
                            <span className="text-xs font-semibold text-gray-800">{card.title}</span>
                            <span className="text-gray-900">{card.icon}</span>
                        </div>
                        <div className="mt-4">
                            <span className="text-2xl font-extrabold text-gray-900 tracking-tight">{card.value}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Activities Chart Card ── */}
            <div className="bg-white rounded-[20px] p-4 sm:p-6 shadow-xs border border-gray-100/50">
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h2 className="text-base font-bold text-gray-900">Activities</h2>

                        {/* Interactive Dropdown */}
                        <div className="relative inline-block text-left mt-0.5">
                            <button
                                onClick={() => setActOpen(!actOpen)}
                                className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors focus:outline-none cursor-pointer"
                            >
                                <span>{actDate}</span>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
                            </button>

                            {actOpen && (
                                <div className="absolute left-0 top-6 w-40 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-30 animate-fadeIn">
                                    {dateOptions.map((opt) => (
                                        <button
                                            key={opt}
                                            onClick={() => {
                                                setActDate(opt);
                                                setActOpen(false);
                                            }}
                                            className={`w-full text-left px-3 py-1.5 text-xs ${actDate === opt ? 'font-bold text-gray-900 bg-gray-50' : 'text-gray-600 hover:bg-gray-50'
                                                }`}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-6 text-xs">
                        <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#EE8484]" />
                            <span className="text-gray-700 font-medium">Guest</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#98D89E]" />
                            <span className="text-gray-700 font-medium">User</span>
                        </div>
                    </div>
                </div>
                <ActivityChart data={activitiesData} />
            </div>

            {/* ── Bottom Row: Top Products + Today's Schedule ── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
                {/* Top Products */}
                <div className="bg-white rounded-[20px] p-6 shadow-xs border border-gray-100/50 flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-base font-bold text-gray-900">Top products</h2>

                        {/* Interactive Dropdown */}
                        <div className="relative inline-block text-left">
                            <button
                                onClick={() => setProdOpen(!prodOpen)}
                                className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors focus:outline-none cursor-pointer"
                            >
                                <span>{prodDate}</span>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
                            </button>

                            {prodOpen && (
                                <div className="absolute right-0 top-6 w-40 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-30 animate-fadeIn">
                                    {dateOptions.map((opt) => (
                                        <button
                                            key={opt}
                                            onClick={() => {
                                                setProdDate(opt);
                                                setProdOpen(false);
                                            }}
                                            className={`w-full text-left px-3 py-1.5 text-xs ${prodDate === opt ? 'font-bold text-gray-900 bg-gray-50' : 'text-gray-600 hover:bg-gray-50'
                                                }`}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <ProductsChart data={topProductsData} />
                </div>

                {/* Today's Schedule */}
                <div className="bg-white rounded-[20px] p-6 shadow-xs border border-gray-100/50 flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-base font-bold text-gray-900">Today&apos;s schedule</h2>

                        {/* Functional See All Link */}
                        <button
                            onClick={() => navigate('/dashboard/schedules')}
                            className="text-xs text-gray-400 hover:text-gray-900 flex items-center gap-1 font-medium transition-colors cursor-pointer"
                        >
                            <span>See All</span>
                            <span>&gt;</span>
                        </button>
                    </div>

                    <div className="space-y-4">
                        {scheduleData.map((item) => (
                            <div key={item.id} className="flex items-start gap-3.5">
                                <div
                                    className="w-1.5 self-stretch rounded-full shrink-0 min-h-[44px]"
                                    style={{ backgroundColor: item.color }}
                                />
                                <div>
                                    <p className="text-xs font-bold text-gray-700 leading-snug">{item.title}</p>
                                    <p className="text-[11px] text-gray-400 mt-0.5">{item.time}</p>
                                    <p className="text-[11px] text-gray-400">{item.location}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
