export default function PayoutsView() {
  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Payouts</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Time Range</span>
          <select
            className="rounded-md border px-3 py-1.5 text-sm"
            defaultValue="thisMonth"
          >
            <option value="thisMonth">This Month</option>
            <option value="lastMonth">Last Month</option>
            <option value="lastQuarter">Last Quarter</option>
            <option value="thisYear">This Year</option>
          </select>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-3 gap-6">
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-sm text-gray-500">Total Payouts</h3>
          <p className="text-2xl font-semibold">$45,230.00</p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-sm text-gray-500">Next Payout</h3>
          <p className="text-2xl font-semibold">$3,450.00</p>
          <p className="mt-2 text-sm text-gray-500">Expected April 15</p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-sm text-gray-500">Processing</h3>
          <p className="text-2xl font-semibold">$1,280.00</p>
          <p className="mt-2 text-sm text-gray-500">2 pending transactions</p>
        </div>
      </div>

      <div className="rounded-lg bg-white shadow-sm">
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm text-gray-500">Payout History</h3>
            <button className="text-sm text-blue-600 hover:text-blue-800">
              Download Report
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Reference
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              <tr>
                <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                  Mar 15, 2024
                </td>
                <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                  $2,450.00
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex rounded-full bg-green-100 px-2 text-xs leading-5 font-semibold text-green-800">
                    Completed
                  </span>
                </td>
                <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                  PAY-2024031501
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                  Mar 1, 2024
                </td>
                <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                  $3,120.00
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex rounded-full bg-green-100 px-2 text-xs leading-5 font-semibold text-green-800">
                    Completed
                  </span>
                </td>
                <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                  PAY-2024030101
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
