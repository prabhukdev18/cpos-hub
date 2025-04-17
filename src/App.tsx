import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { fetchAuthSession } from "aws-amplify/auth";
import AdminView from "./components/AdminView";
import DashboardView from "./components/DashboardView";
import TransactionsView from "./components/TransactionsView";
import PayoutsView from "./components/PayoutsView";
import ProfileView from "./components/ProfileView";
import NotFound from "./components/NotFound";
import Unauthorized from "./components/Unauthorized";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import { useAnalytics } from "./hooks/useAnalytics";
import { useUserProfile } from "./hooks/useUserProfile";
import { useUpdateLastLoginOnAuth } from "./hooks/useUpdateLastLoginOnAuth";

function App() {
  const { user } = useAuthenticator((context) => [context.user]);
  useUpdateLastLoginOnAuth();
  useUserProfile();
  const navigate = useNavigate();
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);
  const { track } = useAnalytics();

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const { tokens } = await fetchAuthSession();
        const groups = tokens?.accessToken?.payload["cognito:groups"];
        setIsAdmin(Array.isArray(groups) && groups.includes("CPOS-Admin"));
      } catch (error) {
        console.error("Error fetching auth session:", error);
        setIsAdmin(false);
      }
    };

    checkAdminStatus();
  }, [user]);

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/dashboard", { replace: true });
    }
  }, [location.pathname, navigate]);

  // Track page views
  useEffect(() => {
    track('page_view', {
      path: location.pathname,
      search: location.search,
      title: document.title,
    });
  }, [location, track]);

  return (
    <Layout isAdmin={isAdmin}>
      <Routes>
        <Route path="/dashboard" element={<DashboardView />} />
        <Route path="/profile" element={<ProfileView />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredGroup="CPOS-Admin">
              <AdminView />
            </ProtectedRoute>
          }
        />
        <Route path="/transactions" element={<TransactionsView />} />
        <Route path="/payouts" element={<PayoutsView />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
