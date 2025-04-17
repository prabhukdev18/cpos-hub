import { useState, useEffect } from "react";
import { useUserProfile } from "../hooks/useUserProfile";
import ProfileEditor from "./ProfileEditor";

export default function ProfileView() {
  const { profile, loading, error } = useUserProfile();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (profile && (!profile.name || !profile.email)) {
      setIsEditing(true);
    }
    if (!loading && !profile) {
      setIsEditing(false);
    }
  }, [profile, loading]);

  const handleSave = async () => {
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-gray-500">Loading profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-red-500">
          Error loading profile: {error.message}
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-gray-500">Profile not available.</div>
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-6">
        <ProfileEditor
          userId={profile.id}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Profile</h1>
          <button
            onClick={() => setIsEditing(true)}
            className="rounded-md p-2 text-gray-500 hover:bg-gray-100"
            title="Edit Profile"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </button>
        </div>
        <div className="mt-4 flex space-x-8 border-b border-gray-200">
          <button className="border-b-2 border-blue-500 pb-4 text-sm font-medium text-blue-600">
            My Account
          </button>
          <button className="pb-4 text-sm font-medium text-gray-500 hover:text-gray-700">
            My Business
          </button>
          <button className="pb-4 text-sm font-medium text-gray-500 hover:text-gray-700">
            Tax Information
          </button>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white">
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="text-base font-medium text-gray-900">
            User Information
          </h2>
        </div>

        <div className="divide-y divide-gray-200">
          <div className="px-6 py-4">
            <div className="text-sm font-medium text-gray-500">Full Name</div>
            <div className="mt-1 text-sm text-gray-900">
              {profile.name || "-"}
            </div>
          </div>

          <div className="px-6 py-4">
            <div className="text-sm font-medium text-gray-500">Email</div>
            <div className="mt-1 text-sm text-gray-900">
              {profile.email || "-"}
            </div>
          </div>

          <div className="px-6 py-4">
            <div className="text-sm font-medium text-gray-500">
              Date of Birth
            </div>
            <div className="mt-1 text-sm text-gray-900">
              {profile.birthdate || "-"}
            </div>
          </div>

          <div className="px-6 py-4">
            <div className="text-sm font-medium text-gray-500">Address</div>
            <div className="mt-1 text-sm text-gray-900">
              {profile.address || "-"}
            </div>
          </div>

          <div className="px-6 py-4">
            <div className="text-sm font-medium text-gray-500">Timezone</div>
            <div className="mt-1 text-sm text-gray-900">
              {profile.timezone || "-"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
