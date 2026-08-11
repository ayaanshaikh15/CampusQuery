import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./Screens/Login";
import Dashboard from "./Screens/Dashboard";
import AIQuery from "./Screens/AIQuery";
import QueryHistory from "./Screens/QueryHistory";
import QueryDetails from "./Screens/QueryDetails";
import AdminManagement from "./Screens/AdminManagement";
import Settings from "./Screens/Settings";

import ProtectedRoute from "./Components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public */}
        <Route path="/login" element={<Login />} />

        {/* Protected */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/query" element={<AIQuery />} />
          <Route path="/history" element={<QueryHistory />} />
          <Route path="/history/:id" element={<QueryDetails />} />
          <Route path="/admins" element={<AdminManagement />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        {/* Default */}
        <Route
          path="/"
          element={<Navigate to="/dashboard" replace />}
        />

        {/* Unknown route */}
        <Route
          path="*"
          element={<Navigate to="/dashboard" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}