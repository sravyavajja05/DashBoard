import React, { useEffect, useState } from 'react';
import DataTable from '../components/DataTable';
import { fetchUsers } from '../services/api';

export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUsers()
            .then((data) => setUsers(data))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="space-y-4 sm:space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                    <h1 className="text-lg sm:text-xl font-bold text-gray-900">Users</h1>
                    <p className="text-xs text-gray-400 mt-0.5">Manage and view system users</p>
                </div>
                <button
                    onClick={() => {
                        setLoading(true);
                        fetchUsers()
                            .then((data) => setUsers(data))
                            .catch((err) => setError(err.message))
                            .finally(() => setLoading(false));
                    }}
                    className="text-xs font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-colors px-3.5 py-2 rounded-xl self-start sm:self-auto"
                >
                    Refresh Users
                </button>
            </div>

            <DataTable users={users} loading={loading} error={error} />
        </div>
    );
}
