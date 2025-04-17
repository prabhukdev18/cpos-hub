import { useState, useCallback } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";

const client = generateClient<Schema>();

// Derive types from the schema
type UserProfileData = Schema["UserProfile"]["type"];

export const useAdminUserSearch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [results, setResults] = useState<UserProfileData[]>([]);

  const searchUsers = useCallback(async (query: string) => {
    // Clear results immediately if query is empty
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      // Revert to using the standard UserProfile.list operation
      // with a filter for name or email containing the search query
      const response = await client.models.UserProfile.list({
        filter: {
          or: [
            { name: { contains: query } },
            { email: { contains: query } }
          ]
        },
        limit: 50 // Increase limit from 10 to 50 for better search results
      });

      if (response.errors && response.errors.length > 0) {
        throw new Error(response.errors.map((e: { message: string }) => e.message).join('\n'));
      }

      // Set results, ensuring we handle null/undefined values
      const profiles = response.data || [];
      setResults(profiles);

    } catch (err) {
      console.error("Error searching users:", err);
      const errorMessage = err instanceof Error ? err.message : "Failed to search users";
      setError(new Error(errorMessage));
      setResults([]); // Clear results on error
    } finally {
      setLoading(false);
    }
  }, []);

  // Update profile logic remains the same
  const updateUserProfile = async (userId: string, updates: Partial<Omit<UserProfileData, 'id' | 'createdAt' | 'updatedAt'>>) => {
    try {
      const response = await client.models.UserProfile.update({
        id: userId,
        ...updates
      });

      if (response.errors && response.errors.length > 0) {
        throw new Error(response.errors.map((e: { message: string }) => e.message).join('\n'));
      }

      if (!response.data) {
        throw new Error("Failed to update user - no data returned");
      }

      // Update the results list with the updated user
      setResults(prevResults =>
        prevResults.map(user =>
          user.id === userId ? { ...user, ...response.data } : user
        )
      );
      return response.data;

    } catch (err) {
      console.error("Error updating user:", err);
      const errorMessage = err instanceof Error ? err.message : "Failed to update user";
      throw new Error(errorMessage);
    }
  };

  return {
    loading,
    error,
    results,
    searchUsers,
    updateUserProfile
  };
}; 