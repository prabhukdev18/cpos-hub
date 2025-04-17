import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div className="text-center">
      <h2 className="mb-4 text-4xl font-bold text-gray-800">Unauthorized</h2>
      <p className="mb-8 text-xl text-gray-600">
        You don't have permission to access this page.
      </p>
      <Link
        to="/dashboard"
        className="text-blue-500 underline hover:text-blue-700"
      >
        Return to Dashboard
      </Link>
    </div>
  );
}
