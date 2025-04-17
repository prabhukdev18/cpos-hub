import { useState, useRef } from "react";
import { useAdminUserSearch } from "../hooks/useAdminUserSearch";
import ProfileEditor from "./ProfileEditor";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";

const client = generateClient<Schema>();

// Define types using the generated client types
type UserProfileResponse = Awaited<ReturnType<typeof client.models.UserProfile.get>>;

export default function AdminView() {
  const { searchUsers, loading, error, results } = useAdminUserSearch();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<UserProfileResponse | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      searchUsers(query);
    }, 300); // 300ms debounce delay
  };

  const handleSelectUser = async (userId: string) => {
    try {
      const response = await client.models.UserProfile.get({ id: userId });
      if (response.data) {
        setSelectedUser(response);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
    // Trigger a search to refresh the user list
    searchUsers(searchQuery);
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Status</span>
          <select
            className="rounded-md border px-3 py-1.5 text-sm"
            defaultValue="active"
          >
            <option>Active</option>
            <option>Maintenance</option>
            <option>Offline</option>
          </select>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-3 gap-6">
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-start justify-between">
            <h3 className="text-sm text-gray-500">Total Users</h3>
            <span className="rounded bg-green-100 px-2 py-1 text-xs text-green-800">
              ↑ 2.4% From Yesterday
            </span>
          </div>
          <p className="text-2xl font-semibold">1,234</p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-start justify-between">
            <h3 className="text-sm text-gray-500">Active Sessions</h3>
            <span className="rounded bg-green-100 px-2 py-1 text-xs text-green-800">
              ↑ 1.8% From Yesterday
            </span>
          </div>
          <p className="text-2xl font-semibold">856</p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-start justify-between">
            <h3 className="text-sm text-gray-500">System Health</h3>
            <span className="rounded bg-green-100 px-2 py-1 text-xs text-green-800">
              Optimal
            </span>
          </div>
          <p className="text-2xl font-semibold">98%</p>
        </div>
      </div>

      {/* User Search Section */}
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-medium">User Search</h2>
        <div className="mb-6">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M9 3.5a5.5 5.5 5.5 0 100 11 5.5 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              className="block w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Search users by name or email..."
            />
          </div>
        </div>

        {loading && (
          <div className="text-center text-gray-500">Searching...</div>
        )}

        {error && (
          <div className="text-center text-red-500">
            Error: {error.message}
          </div>
        )}

        {results.length > 0 && (
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Last Login
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {results.map((user) => (
                  <tr key={user?.id}>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm text-gray-900">{user?.name || '-'}</div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm text-gray-900">{user?.email || '-'}</div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {user?.lastLogin ? new Date(user.lastLogin).toLocaleString() : '-'}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {user?.createdAt ? new Date(user.createdAt).toLocaleString() : '-'}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <button
                        onClick={() => user?.id && handleSelectUser(user.id)}
                        className="rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-blue-600"
                        title="Edit Profile"
                        disabled={!user?.id}
                      >
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {searchQuery && results.length === 0 && !loading && (
          <div className="text-center text-gray-500">No users found</div>
        )}
      </div>

      {/* Profile Editor Modal */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={handleCloseModal}
            ></div>

            {/* Modal panel */}
            <div className="relative inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 w-full text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Edit Profile
                    </h3>
                    <div className="mt-2">
                      <ProfileEditor
                        profile={selectedUser}
                        onClose={handleCloseModal}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
