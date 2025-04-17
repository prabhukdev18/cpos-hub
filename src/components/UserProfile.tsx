import { useNavigate } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useUserAttributes } from "../hooks/useUserAttributes";

const UserProfile = () => {
  const { signOut } = useAuthenticator((context) => [context.user]);
  const attributes = useUserAttributes();
  const navigate = useNavigate();

  const handleSignOut = () => {
    navigate("/", { replace: true });
    signOut();
  };

  return (
    <div className="absolute bottom-0 w-full border-t border-gray-200 bg-white p-4">
      <div className="flex items-center justify-between">
        <span
          className="truncate text-sm text-gray-600"
          title={attributes?.email}
        >
          {attributes?.email}
        </span>
        <button
          onClick={handleSignOut}
          className="rounded-lg p-2 text-gray-700 hover:bg-gray-50"
          title="Sign out"
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
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
