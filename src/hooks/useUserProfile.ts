import { useState, useEffect, useCallback } from "react";
import { generateClient } from "aws-amplify/data";
import { fetchUserAttributes } from "aws-amplify/auth";
import type { Schema } from "../../amplify/data/resource";

const client = generateClient<Schema>();

// Derive the UserProfile data type directly from the schema
type UserProfileData = Schema["UserProfile"]["type"];
// Define the type for data used when updating the profile
type UserProfileUpdateInput = Partial<Omit<UserProfileData, 'id' | 'createdAt' | 'updatedAt' | 'owner'>>;

export const useUserProfile = () => {
  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const attributes = await fetchUserAttributes();
      const ownerId = attributes.sub;

      if (!ownerId) throw new Error("User ID (sub) not found");

      // Query WITHOUT explicit owner filter. Rely on Amplify Auth rules.
      // Still limit to 1 as we expect only one profile per user.
      const listResponse = await client.models.UserProfile.list({
        limit: 1,
      });

      if (listResponse.errors) {
        throw new Error(listResponse.errors.map(e => e.message).join('\n'));
      }

      const existingProfile = listResponse.data[0];

      if (existingProfile) {
        setProfile(existingProfile);
      } else {
        // Profile doesn't exist, create a new one
        // Amplify automatically sets the 'owner' field based on the authenticated user
        const createResponse = await client.models.UserProfile.create({
          userId: ownerId, // Store sub as userId if needed for relations/display
          email: attributes.email || "",
          name: attributes.name || "",
          // Initialize optional fields as needed, e.g., null or default values
          birthdate: null,
          address: null,
          timezone: null,
          // 'owner' is set automatically by Amplify
        });

        if (createResponse.errors) {
          throw new Error(createResponse.errors.map(e => e.message).join('\n'));
        }
        if (!createResponse.data) {
          throw new Error("Failed to create profile - no data returned");
        }
        setProfile(createResponse.data);
      }
    } catch (err) {
      console.error("Error loading or creating profile:", err);
      const errorMessage = err instanceof Error ? err.message : "Failed to load profile";
      setError(new Error(errorMessage));
      setProfile(null); // Ensure profile is null on error
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProfile = async (updatedData: UserProfileUpdateInput) => {
    if (!profile?.id) {
      throw new Error("Cannot update profile: No profile loaded or profile ID is missing.");
    }

    try {
      const response = await client.models.UserProfile.update({
        id: profile.id, // Use the primary ID from the loaded profile
        ...updatedData,
      });

      if (response.errors) {
        throw new Error(response.errors.map(e => e.message).join('\n'));
      }
      if (!response.data) {
        throw new Error("Failed to update profile - no data returned");
      }

      setProfile(response.data); // Update state with the latest profile data
      return response.data;
    } catch (err) {
      console.error("Error updating profile:", err);
      const errorMessage = err instanceof Error ? err.message : "Failed to update profile";
      throw new Error(errorMessage);
    }
  };

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  return {
    profile, // The actual profile data object or null
    loading,
    error,
    updateProfile,
    refreshProfile: loadProfile, // Provide a way to manually reload
  };
};
