import React from 'react';

const fullSchedule = [
    { id: 1, title: 'Meeting with suppliers from Kuta Bali', time: '14.00-15.00', location: 'at Sunset Road, Kuta, Bali', color: '#9BDD7C', date: 'Today' },
    { id: 2, title: 'Check operation at Giga Factory 1', time: '18.00-20.00', location: 'at Central Jakarta', color: '#60A5FA', date: 'Today' },
    { id: 3, title: 'Product Design Review with UX Team', time: '09.30-11.00', location: 'at Meeting Room 3B', color: '#EE8484', date: 'Tomorrow' },
    { id: 4, title: 'Quarterly Financial Sync with Stakeholders', time: '14.00-16.00', location: 'at Executive Boardroom', color: '#F6DC7D', date: 'Tomorrow' },
];

export default function SchedulesPage() {
    return (
        <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col xs:flex-row sm:flex-row items-start sm:items-center justify-between gap-2">
                <div>
                    <h1 className="text-lg sm:text-xl font-bold text-gray-900">Schedules</h1>
                    <p className="text-xs text-gray-400 mt-0.5">Upcoming meetings and operational tasks</p>
                </div>
                <button
                    onClick={() => alert('Add Schedule feature coming soon!')}
                    className="text-xs font-semibold text-white bg-gray-900 hover:bg-gray-800 px-4 py-2 rounded-xl transition-all shadow-sm shrink-0">
                    + Add Schedule
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
                {fullSchedule.map((item) => (
                    <div key={item.id} className="bg-white rounded-[20px] p-4 sm:p-5 border border-gray-100/60 shadow-xs flex items-start gap-3 sm:gap-4">
                        <div className="w-1.5 self-stretch rounded-full shrink-0 min-h-[50px]" style={{ backgroundColor: item.color }} />
                        <div className="flex-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-gray-50 px-2 py-0.5 rounded-md border border-gray-100">
                                {item.date}
                            </span>
                            <h3 className="text-sm font-bold text-gray-800 mt-2 leading-snug">{item.title}</h3>
                            <p className="text-xs text-gray-500 mt-1 font-medium">{item.time}</p>
                            <p className="text-xs text-gray-400">{item.location}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
