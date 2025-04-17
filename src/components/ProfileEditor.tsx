import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";

const client = generateClient<Schema>();
type UserProfileResponse = Awaited<ReturnType<typeof client.models.UserProfile.get>>;
type UserProfileData = NonNullable<UserProfileResponse['data']>;
type UserProfileField = keyof Pick<UserProfileData, 'name' | 'email' | 'birthdate' | 'address' | 'timezone'>;

interface ProfileEditorProps {
  profile?: UserProfileResponse;
  userId?: string;
  onSave?: () => void;
  onCancel?: () => void;
  onClose?: () => void;
}

export default function ProfileEditor({
  profile: initialProfile,
  userId,
  onSave,
  onCancel,
  onClose,
}: ProfileEditorProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [profile, setProfile] = useState<UserProfileResponse | null>(initialProfile || null);

  useEffect(() => {
    if (userId && !profile) {
      const loadProfile = async () => {
        try {
          setLoading(true);
          const response = await client.models.UserProfile.get({ id: userId });
          if (!response.data) {
            throw new Error("Profile not found");
          }
          setProfile(response);
        } catch (err) {
          console.error("Error loading profile:", err);
          setError(err instanceof Error ? err : new Error("Failed to load profile"));
        } finally {
          setLoading(false);
        }
      };
      loadProfile();
    }
  }, [userId, profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile?.data) return;

    try {
      setLoading(true);
      setError(null);

      const response = await client.models.UserProfile.update({
        id: profile.data.id,
        name: profile.data.name,
        email: profile.data.email,
        birthdate: profile.data.birthdate,
        address: profile.data.address,
        timezone: profile.data.timezone,
      });

      if (!response.data) {
        throw new Error("Failed to update profile");
      }

      setProfile(response);
      onSave?.();
      onClose?.();
    } catch (err) {
      console.error("Error updating profile:", err);
      setError(err instanceof Error ? err : new Error("Failed to update profile"));
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (field: UserProfileField, value: string) => {
    if (!profile?.data) return;

    setProfile({
      ...profile,
      data: {
        ...profile.data,
        [field]: value
      }
    });
  };

  if (loading && !profile) {
    return <div className="text-center">Loading profile...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error.message}</div>;
  }

  if (!profile?.data) {
    return <div className="text-center">Profile not found</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Full Name
        </label>
        <input
          type="text"
          id="name"
          value={profile.data.name || ""}
          onChange={(e) => handleFieldChange("name", e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          value={profile.data.email || ""}
          onChange={(e) => handleFieldChange("email", e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
        />
      </div>

      <div>
        <label
          htmlFor="birthdate"
          className="block text-sm font-medium text-gray-700"
        >
          Date of Birth
        </label>
        <input
          type="date"
          id="birthdate"
          value={profile.data.birthdate || ""}
          onChange={(e) => handleFieldChange("birthdate", e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
        />
      </div>

      <div>
        <label
          htmlFor="address"
          className="block text-sm font-medium text-gray-700"
        >
          Address
        </label>
        <textarea
          id="address"
          value={profile.data.address || ""}
          onChange={(e) => handleFieldChange("address", e.target.value)}
          rows={3}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
        />
      </div>

      <div>
        <label
          htmlFor="timezone"
          className="block text-sm font-medium text-gray-700"
        >
          Timezone
        </label>
        <select
          id="timezone"
          value={profile.data.timezone || ""}
          onChange={(e) => handleFieldChange("timezone", e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
        >
          <option value="">Select Timezone</option>
          <option value="America/New_York">Eastern Time</option>
          <option value="America/Chicago">Central Time</option>
          <option value="America/Denver">Mountain Time</option>
          <option value="America/Los_Angeles">Pacific Time</option>
        </select>
      </div>

      <div className="flex justify-end space-x-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
          >
            Cancel
          </button>
        )}
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
          >
            Close
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
