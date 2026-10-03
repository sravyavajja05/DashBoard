import React from 'react';

const mockTransactions = [
    { id: 'TX-9012', user: 'Basic Tees Purchase', date: 'May 12, 2021', amount: '$124.00', status: 'Completed', type: 'Credit Card' },
    { id: 'TX-9013', user: 'Custom Short Pants', date: 'May 14, 2021', amount: '$85.50', status: 'Completed', type: 'PayPal' },
    { id: 'TX-9014', user: 'Super Hoodies Bulk Order', date: 'May 15, 2021', amount: '$430.00', status: 'Pending', type: 'Bank Transfer' },
    { id: 'TX-9015', user: 'Basic Tees White Pack', date: 'May 18, 2021', amount: '$62.00', status: 'Completed', type: 'Credit Card' },
    { id: 'TX-9016', user: 'Custom Shorts - Summer Edition', date: 'May 20, 2021', amount: '$110.00', status: 'Refunded', type: 'PayPal' },
];

const statusStyle = (status) => {
    if (status === 'Completed') return 'bg-green-50 text-green-700 border-green-200';
    if (status === 'Pending') return 'bg-amber-50 text-amber-700 border-amber-200';
    return 'bg-red-50 text-red-600 border-red-200';
};

export default function TransactionsPage() {
    const handleExportCSV = () => {
        const headers = ['Transaction ID', 'Item / Description', 'Date', 'Payment Method', 'Amount', 'Status'];
        const rows = mockTransactions.map((tx) => [tx.id, tx.user, tx.date, tx.type, tx.amount, tx.status]);
        const csvContent = [headers, ...rows].map((r) => r.join(',')).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'transactions.csv';
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="space-y-4 sm:space-y-6">
            {/* Page header */}
            <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2">
                <div>
                    <h1 className="text-lg sm:text-xl font-bold text-gray-900">Transactions</h1>
                    <p className="text-xs text-gray-400 mt-0.5">Recent billing and sales history</p>
                </div>
                <button
                    onClick={handleExportCSV}
                    className="text-xs font-semibold text-white bg-gray-900 hover:bg-gray-800 px-4 py-2 rounded-xl transition-all shadow-sm shrink-0">
                    + Export CSV
                </button>
            </div>

            {/* Mobile card list (visible on xs/sm) */}
            <div className="md:hidden space-y-3">
                {mockTransactions.map((tx) => (
                    <div key={tx.id} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-xs space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="font-mono text-xs font-semibold text-gray-500">{tx.id}</span>
                            <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${statusStyle(tx.status)}`}>
                                {tx.status}
                            </span>
                        </div>
                        <p className="text-sm font-bold text-gray-900 leading-snug">{tx.user}</p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>{tx.date}</span>
                            <span className="font-semibold text-gray-800">{tx.amount}</span>
                        </div>
                        <p className="text-xs text-gray-400">{tx.type}</p>
                    </div>
                ))}
            </div>

            {/* Desktop table (hidden on mobile) */}
            <div className="hidden md:block bg-white rounded-[20px] border border-gray-100/60 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-gray-50/60 text-gray-400 font-semibold border-b border-gray-100 uppercase tracking-wider">
                            <tr>
                                <th className="py-3.5 px-5 text-[11px]">Transaction ID</th>
                                <th className="py-3.5 px-5 text-[11px]">Item / Description</th>
                                <th className="py-3.5 px-5 text-[11px]">Date</th>
                                <th className="py-3.5 px-5 text-[11px]">Payment Method</th>
                                <th className="py-3.5 px-5 text-[11px]">Amount</th>
                                <th className="py-3.5 px-5 text-[11px]">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {mockTransactions.map((tx) => (
                                <tr key={tx.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="py-4 px-5 font-mono font-semibold text-gray-900">{tx.id}</td>
                                    <td className="py-4 px-5 font-semibold text-gray-800">{tx.user}</td>
                                    <td className="py-4 px-5 text-gray-500">{tx.date}</td>
                                    <td className="py-4 px-5 text-gray-600">{tx.type}</td>
                                    <td className="py-4 px-5 font-bold text-gray-900">{tx.amount}</td>
                                    <td className="py-4 px-5">
                                        <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${statusStyle(tx.status)}`}>
                                            {tx.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
