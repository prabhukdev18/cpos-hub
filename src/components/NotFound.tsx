import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="text-center">
      <h2 className="mb-4 text-4xl font-bold text-gray-800">404</h2>
      <p className="mb-8 text-xl text-gray-600">Page not found</p>
      <Link
        to="/dashboard"
        className="text-blue-500 underline hover:text-blue-700"
      >
        Return to Dashboard
      </Link>
    </div>
  );
}
