import React, { useEffect, useState } from 'react';
import { revenueData, weeklyVisitors, trafficSources } from '../data/chartData';
import { RevenueChart, VisitorsBarChart, TrafficPieChart } from '../components/ChartCards';
import { fetchPosts } from '../services/api';

const kpiMetrics = [
    { label: 'Avg. Session Duration', value: '4m 32s', change: '+12%', positive: true },
    { label: 'Bounce Rate', value: '38.4%', change: '-5.2%', positive: true },
    { label: 'Pages / Session', value: '3.8', change: '+0.4', positive: true },
    { label: 'Goal Completions', value: '1,247', change: '-1.8%', positive: false },
];

export default function AnalyticsPage() {
    const [posts, setPosts] = useState([]);
    const [postsLoading, setPostsLoading] = useState(true);
    const [postsError, setPostsError] = useState(null);

    useEffect(() => {
        fetchPosts()
            .then((data) => setPosts(data.slice(0, 5)))
            .catch((err) => setPostsError(err.message))
            .finally(() => setPostsLoading(false));
    }, []);

    return (
        <div className="space-y-4 sm:space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                    <h1 className="text-lg sm:text-xl font-bold text-gray-900">Analytics</h1>
                    <p className="text-xs text-gray-400 mt-0.5">Detailed performance insights</p>
                </div>
                <select className="text-xs border border-gray-200 rounded-xl px-3 py-2 text-gray-600 bg-white outline-none focus:ring-2 focus:ring-gray-900/10 self-start sm:self-auto">
                    <option>Last 12 months</option>
                    <option>Last 6 months</option>
                    <option>Last 30 days</option>
                </select>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {kpiMetrics.map((kpi, i) => (
                    <div key={i} className="stat-card">
                        <p className="text-xs text-gray-400 mb-2">{kpi.label}</p>
                        <p className="text-xl font-bold text-gray-900 mb-1">{kpi.value}</p>
                        <span className={`text-[11px] font-semibold ${kpi.positive ? 'text-green-600' : 'text-red-500'}`}>
                            {kpi.positive ? '↑' : '↓'} {kpi.change}
                        </span>
                    </div>
                ))}
            </div>

            {/* Revenue Chart */}
            <div className="dash-card">
                <div className="mb-4">
                    <h2 className="text-sm font-bold text-gray-900">Revenue &amp; Expenses</h2>
                    <p className="text-xs text-gray-400 mt-0.5">Monthly financial performance</p>
                </div>
                <RevenueChart data={revenueData} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                <div className="dash-card">
                    <div className="mb-4">
                        <h2 className="text-sm font-bold text-gray-900">Weekly Visitors</h2>
                        <p className="text-xs text-gray-400 mt-0.5">Traffic by day</p>
                    </div>
                    <VisitorsBarChart data={weeklyVisitors} />
                </div>
                <div className="dash-card">
                    <div className="mb-4">
                        <h2 className="text-sm font-bold text-gray-900">Traffic Sources</h2>
                        <p className="text-xs text-gray-400 mt-0.5">Channel distribution</p>
                    </div>
                    <TrafficPieChart data={trafficSources} />
                </div>
                <div className="dash-card">
                    <div className="mb-4">
                        <h2 className="text-sm font-bold text-gray-900">Recent Reports</h2>
                        <p className="text-xs text-gray-400 mt-0.5">API data — JSONPlaceholder</p>
                    </div>
                    {postsLoading && (
                        <div className="flex justify-center py-8">
                            <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                        </div>
                    )}
                    {postsError && (
                        <p className="text-xs text-red-500 bg-red-50 p-3 rounded-xl">{postsError}</p>
                    )}
                    {!postsLoading && !postsError && (
                        <div className="space-y-2">
                            {posts.map((post) => (
                                <div key={post.id} className="p-2.5 rounded-xl hover:bg-gray-50 transition-colors">
                                    <p className="text-xs font-semibold text-gray-700 capitalize line-clamp-1">{post.title}</p>
                                    <p className="text-[11px] text-gray-400 mt-0.5 line-clamp-1">{post.body}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
