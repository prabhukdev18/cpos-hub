import { useState } from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

const data = [
  { name: "1", value: 400 },
  { name: "2", value: 300 },
  { name: "3", value: 600 },
  { name: "4", value: 200 },
  { name: "5", value: 800 },
  { name: "6", value: 500 },
];

export default function DashboardView() {
  const [dateFilter, setDateFilter] = useState("Today");

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Date</span>
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="rounded-md border px-3 py-1.5 text-sm"
          >
            <option>Today</option>
            <option>Yesterday</option>
            <option>Last 7 days</option>
            <option>Last 30 days</option>
          </select>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-3 gap-6">
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-start justify-between">
            <h3 className="text-sm text-gray-500">Total Revenue</h3>
            <span className="rounded bg-green-100 px-2 py-1 text-xs text-green-800">
              ↑ 1.2% From Yesterday
            </span>
          </div>
          <p className="text-2xl font-semibold">$14,000.00</p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-start justify-between">
            <h3 className="text-sm text-gray-500">
              Total Transactions Processed
            </h3>
            <span className="rounded bg-green-100 px-2 py-1 text-xs text-green-800">
              ↑ 1.2% From Yesterday
            </span>
          </div>
          <p className="text-2xl font-semibold">1246</p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-start justify-between">
            <h3 className="text-sm text-gray-500">Average Transaction Value</h3>
            <span className="rounded bg-green-100 px-2 py-1 text-xs text-green-800">
              ↑ 0.2% From Yesterday
            </span>
          </div>
          <p className="text-2xl font-semibold">$123.00</p>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-6">
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-start justify-between">
            <h3 className="text-sm text-gray-500">Gross Revenue</h3>
            <span className="rounded bg-green-100 px-2 py-1 text-xs text-green-800">
              ↑ 1.2% From Yesterday
            </span>
          </div>
          <div className="flex h-64 items-center justify-center">
            {/* Add donut chart here */}
            <div className="text-center">
              <div className="text-3xl font-semibold">$123.00</div>
              <div className="text-sm text-gray-500">Total</div>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-start justify-between">
            <h3 className="text-sm text-gray-500">Payments</h3>
          </div>
          <div className="h-64">
            <div className="mb-4 flex h-48 items-end justify-between">
              <div className="w-1/5">
                <div className="h-40 bg-green-400"></div>
                <p className="mt-2 text-xs text-gray-500">Successful</p>
                <p className="text-sm font-medium">$860.00</p>
              </div>
              <div className="w-1/5">
                <div className="h-32 bg-red-300"></div>
                <p className="mt-2 text-xs text-gray-500">Failed</p>
                <p className="text-sm font-medium">$550.00</p>
              </div>
              <div className="w-1/5">
                <div className="h-24 bg-orange-300"></div>
                <p className="mt-2 text-xs text-gray-500">Refunded</p>
                <p className="text-sm font-medium">$430.00</p>
              </div>
              <div className="w-1/5">
                <div className="h-16 bg-purple-300"></div>
                <p className="mt-2 text-xs text-gray-500">Others</p>
                <p className="text-sm font-medium">$197.00</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-3 gap-6">
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-sm text-gray-500">Net Payouts</h3>
          <p className="text-2xl font-semibold">$10,000.00</p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-sm text-gray-500">Pending Payouts</h3>
          <p className="text-2xl font-semibold">$1,000.00</p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-sm text-gray-500">
            Next Payout (expected on April 8)
          </h3>
          <p className="text-2xl font-semibold">$1,000.00</p>
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-sm text-gray-500">Sales Summary</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <Line
                type="monotone"
                dataKey="value"
                stroke="#4F46E5"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
