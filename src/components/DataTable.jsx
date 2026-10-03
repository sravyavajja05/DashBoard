import React, { useState, useMemo } from 'react';

const STATUS_OPTIONS = ['active', 'pending', 'inactive', 'banned'];

export default function DataTable({ users, loading, error }) {
    const [search, setSearch] = useState('');
    const [sortField, setSortField] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');
    const [page, setPage] = useState(1);
    const pageSize = 5;

    const usersWithMeta = useMemo(() => {
        return users.map((u, i) => ({
            ...u,
            status: STATUS_OPTIONS[i % STATUS_OPTIONS.length],
            role: i % 3 === 0 ? 'Admin' : i % 2 === 0 ? 'Editor' : 'Viewer',
        }));
    }, [users]);

    const filtered = useMemo(() => {
        return usersWithMeta.filter((u) => {
            const q = search.toLowerCase();
            return (
                u.name.toLowerCase().includes(q) ||
                u.email.toLowerCase().includes(q) ||
                u.username.toLowerCase().includes(q)
            );
        });
    }, [usersWithMeta, search]);

    const sorted = useMemo(() => {
        return [...filtered].sort((a, b) => {
            let aVal = a[sortField] || '';
            let bVal = b[sortField] || '';
            if (typeof aVal === 'string') aVal = aVal.toLowerCase();
            if (typeof bVal === 'string') bVal = bVal.toLowerCase();
            if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
            if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });
    }, [filtered, sortField, sortOrder]);

    const totalPages = Math.ceil(sorted.length / pageSize) || 1;
    const paginated = useMemo(() => {
        const start = (page - 1) * pageSize;
        return sorted.slice(start, start + pageSize);
    }, [sorted, page]);

    const handleSort = (field) => {
        if (sortField === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('asc');
        }
    };

    const getStatusBadge = (status) => {
        const styles = {
            active: 'bg-green-50 text-green-700 border-green-200',
            pending: 'bg-amber-50 text-amber-700 border-amber-200',
            inactive: 'bg-gray-50 text-gray-600 border-gray-200',
            banned: 'bg-red-50 text-red-600 border-red-200',
        };
        return (
            <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${styles[status] || styles.inactive}`}>
                {status}
            </span>
        );
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Table controls */}
            <div className="p-3 sm:p-4 md:p-5 border-b border-gray-100 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
                <div className="relative flex-1 max-w-sm">
                    <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={search}
                        onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                        className="w-full pl-9 pr-4 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-gray-900/10 transition-all"
                    />
                </div>
                <p className="text-xs text-gray-400 self-center">
                    Showing <span className="font-semibold text-gray-700">{paginated.length}</span> of <span className="font-semibold text-gray-700">{filtered.length}</span> users
                </p>
            </div>

            {loading && (
                <div className="flex flex-col items-center justify-center py-12 gap-3">
                    <div className="w-6 h-6 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                    <p className="text-xs text-gray-400">Loading users...</p>
                </div>
            )}

            {error && (
                <div className="p-6 text-center">
                    <p className="text-xs text-red-500 bg-red-50 p-3 rounded-xl inline-block">{error}</p>
                </div>
            )}

            {!loading && !error && (
                <>
                    {/* Mobile card list */}
                    <div className="md:hidden divide-y divide-gray-100">
                        {paginated.length === 0 ? (
                            <p className="py-8 text-center text-xs text-gray-400">No users match your search.</p>
                        ) : (
                            paginated.map((user) => (
                                <div key={user.id} className="p-4 flex items-start gap-3">
                                    <div className="w-9 h-9 rounded-full bg-gray-900 text-white font-bold flex items-center justify-center text-xs shrink-0">
                                        {user.name[0]}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between gap-2">
                                            <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                                            {getStatusBadge(user.status)}
                                        </div>
                                        <p className="text-xs text-gray-400 truncate mt-0.5">{user.email}</p>
                                        <div className="flex items-center gap-3 mt-1 text-[11px] text-gray-500">
                                            <span className="font-medium">{user.role}</span>
                                            <span>·</span>
                                            <span className="truncate">{user.company?.name || 'N/A'}</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Desktop table */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-gray-50/50 text-gray-400 font-semibold border-b border-gray-100 uppercase tracking-wider">
                                <tr>
                                    <th className="py-3 px-4 text-[11px] cursor-pointer" onClick={() => handleSort('name')}>
                                        User {sortField === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                                    </th>
                                    <th className="py-3 px-4 text-[11px] cursor-pointer" onClick={() => handleSort('email')}>
                                        Email {sortField === 'email' && (sortOrder === 'asc' ? '↑' : '↓')}
                                    </th>
                                    <th className="py-3 px-4 text-[11px]">Role</th>
                                    <th className="py-3 px-4 text-[11px]">Status</th>
                                    <th className="py-3 px-4 text-[11px]">Company</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {paginated.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="py-8 text-center text-gray-400">
                                            No users match your search criteria.
                                        </td>
                                    </tr>
                                ) : (
                                    paginated.map((user) => (
                                        <tr key={user.id} className="hover:bg-gray-50/60 transition-colors">
                                            <td className="py-3.5 px-4 font-semibold text-gray-800">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-gray-900 text-white font-bold flex items-center justify-center text-xs shrink-0">
                                                        {user.name[0]}
                                                    </div>
                                                    <div>
                                                        <p className="leading-none text-gray-900 font-semibold">{user.name}</p>
                                                        <p className="text-[11px] text-gray-400 mt-0.5 font-normal">@{user.username}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-3.5 px-4 text-gray-600">{user.email}</td>
                                            <td className="py-3.5 px-4 text-gray-600 font-medium">{user.role}</td>
                                            <td className="py-3.5 px-4">{getStatusBadge(user.status)}</td>
                                            <td className="py-3.5 px-4 text-gray-500">{user.company?.name || 'N/A'}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="p-3 sm:p-4 border-t border-gray-100 flex items-center justify-between gap-2">
                        <button
                            disabled={page === 1}
                            onClick={() => setPage(page - 1)}
                            className="px-2.5 sm:px-3 py-1.5 text-xs font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
                        >
                            Previous
                        </button>
                        <div className="flex items-center gap-1 text-xs">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                                <button
                                    key={p}
                                    onClick={() => setPage(p)}
                                    className={`w-7 h-7 rounded-lg font-semibold transition-colors ${page === p ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>
                        <button
                            disabled={page === totalPages}
                            onClick={() => setPage(page + 1)}
                            className="px-2.5 sm:px-3 py-1.5 text-xs font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
