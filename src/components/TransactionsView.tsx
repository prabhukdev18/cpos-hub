export default function TransactionsView() {
  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Transactions</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Filter</span>
          <select
            className="rounded-md border px-3 py-1.5 text-sm"
            defaultValue="all"
          >
            <option>All</option>
            <option>Completed</option>
            <option>Pending</option>
            <option>Failed</option>
          </select>
        </div>
      </div>

      <div className="rounded-lg bg-white shadow-sm">
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm text-gray-500">Recent Transactions</h3>
            <button className="text-sm text-blue-600 hover:text-blue-800">
              View All
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="text-center text-sm text-gray-500">
            No transactions to display
          </div>
        </div>
      </div>
    </div>
  );
}
