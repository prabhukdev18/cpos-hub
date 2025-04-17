import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { fetchAuthSession } from "aws-amplify/auth";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredGroup?: string;
}

export default function ProtectedRoute({
  children,
  requiredGroup,
}: ProtectedRouteProps) {
  const { user } = useAuthenticator((context) => [context.user]);
  const [userGroups, setUserGroups] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkGroups = async () => {
      if (!requiredGroup) {
        setIsLoading(false);
        return;
      }

      try {
        const { tokens } = await fetchAuthSession();
        const cognitoGroups = tokens?.accessToken?.payload["cognito:groups"];

        // Ensure we have a valid array of strings
        const groups = Array.isArray(cognitoGroups)
          ? cognitoGroups.filter(
              (group): group is string => typeof group === "string",
            )
          : [];

        setUserGroups(groups);
      } catch (error) {
        console.error("Error fetching auth session:", error);
        setUserGroups([]);
      } finally {
        setIsLoading(false);
      }
    };

    checkGroups();
  }, [requiredGroup]);

  // First, check if user is authenticated
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // If no specific group is required, allow access
  if (!requiredGroup) {
    return <>{children}</>;
  }

  // Show loading state while checking groups
  if (isLoading) {
    return null; // Or return a loading spinner component
  }

  // Check group membership
  if (!userGroups.includes(requiredGroup)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}
