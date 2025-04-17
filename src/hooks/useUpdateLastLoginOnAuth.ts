import { useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import { fetchUserAttributes } from "aws-amplify/auth";
import type { Schema } from "../../amplify/data/resource";

const client = generateClient<Schema>();

export function useUpdateLastLoginOnAuth() {
  useEffect(() => {
    const updateLastLogin = async () => {
      try {
        const attributes = await fetchUserAttributes();
        const ownerId = attributes.sub;
        if (!ownerId) return;
        const listResponse = await client.models.UserProfile.list({ limit: 1 });
        if (listResponse.errors) return;
        const existingProfile = listResponse.data[0];
        const now = new Date().toISOString();
        if (existingProfile) {
          await client.models.UserProfile.update({
            id: existingProfile.id,
            lastLogin: now,
          });
        } else {
          await client.models.UserProfile.create({
            userId: ownerId,
            email: attributes.email || "",
            name: attributes.name || "",
            birthdate: null,
            address: null,
            timezone: null,
            lastLogin: now,
          });
        }
      } catch (err) {
        console.error("Error updating last login:", err);
      }
    };
    updateLastLogin();
  }, []);
}
