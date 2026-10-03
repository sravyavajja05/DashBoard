import React from 'react';
import {
    AreaChart, Area, BarChart, Bar,
    XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer,
    PieChart, Pie, Cell,
} from 'recharts';

/* ── Custom tooltip ── */
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white border border-gray-100 rounded-xl shadow-lg p-3 text-xs min-w-[120px]">
                <p className="text-gray-500 font-medium mb-1.5">{label}</p>
                {payload.map((entry, i) => (
                    <p key={i} className="font-semibold capitalize" style={{ color: entry.color }}>
                        {entry.name}: {entry.value?.toLocaleString()}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

/* ── Activities line chart matching Figma screenshot ── */
export function ActivityChart({ data }) {
    return (
        <ResponsiveContainer width="100%" height={210}>
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                    <linearGradient id="gGuest" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#EE8484" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#EE8484" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gUser" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#98D89E" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#98D89E" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: '#9ca3af', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#9ca3af', fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 500]} ticks={[0, 100, 200, 300, 400, 500]} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="guest" name="Guest" stroke="#EE8484" strokeWidth={2.5}
                    fill="url(#gGuest)" dot={false} activeDot={{ r: 4 }} />
                <Area type="monotone" dataKey="user" name="User" stroke="#98D89E" strokeWidth={2.5}
                    fill="url(#gUser)" dot={false} activeDot={{ r: 4 }} />
            </AreaChart>
        </ResponsiveContainer>
    );
}

/* ── Top Products donut chart matching exact Figma screenshot side-by-side layout ── */
export function ProductsChart({ data }) {
    return (
        <div className="flex items-center justify-between gap-4 py-2">
            {/* Left: Pie Chart */}
            <div className="w-[140px] h-[140px] shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={0}
                            outerRadius={65}
                            paddingAngle={0}
                            dataKey="value"
                            stroke="none"
                        >
                            {data.map((entry, index) => (
                                <Cell key={index} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip formatter={(v) => [`${v}%`, '']} />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Right: Legend list matching Figma design */}
            <div className="flex-1 space-y-3">
                {data.map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                        <span
                            className="w-3 h-3 rounded-full mt-0.5 shrink-0"
                            style={{ backgroundColor: item.color }}
                        />
                        <div>
                            <p className="text-xs font-bold text-gray-800 leading-tight">{item.name}</p>
                            <p className="text-[11px] text-gray-400 font-medium mt-0.5">{item.value}%</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ── Revenue area chart (analytics page) ── */
export function RevenueChart({ data }) {
    return (
        <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                    <linearGradient id="colRev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#111111" stopOpacity={0.12} />
                        <stop offset="95%" stopColor="#111111" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: '#9ca3af', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#9ca3af', fontSize: 11 }} axisLine={false} tickLine={false}
                    tickFormatter={(v) => `$${v / 1000}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#111111" strokeWidth={2.5}
                    fill="url(#colRev)" dot={false} activeDot={{ r: 4 }} />
            </AreaChart>
        </ResponsiveContainer>
    );
}

/* ── Visitors bar chart ── */
export function VisitorsBarChart({ data }) {
    return (
        <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }} barCategoryGap="30%">
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                <XAxis dataKey="day" tick={{ fill: '#9ca3af', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#9ca3af', fontSize: 11 }} axisLine={false} tickLine={false}
                    tickFormatter={(v) => `${v / 1000}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="visitors" name="Visitors" fill="#111111" radius={[5, 5, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    );
}

/* ── Traffic Pie ── */
export function TrafficPieChart({ data }) {
    return (
        <div className="flex flex-col items-center">
            <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                    <Pie data={data} cx="50%" cy="50%" innerRadius={40} outerRadius={68}
                        paddingAngle={3} dataKey="value">
                        {data.map((item, i) => <Cell key={i} fill={item.color} />)}
                    </Pie>
                    <Tooltip formatter={(v) => [`${v}%`, '']} />
                </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-1 gap-1 w-full mt-1">
                {data.map((item, i) => (
                    <div key={i} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                            <span className="text-gray-500">{item.name}</span>
                        </div>
                        <span className="font-semibold text-gray-800">{item.value}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
