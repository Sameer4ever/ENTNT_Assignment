import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import Incidents from "./pages/Incidents";
import Calendar from "./pages/Calendar";
import PatientView from "./pages/PatientView";
import { AuthProvider, useAuth } from "./context/AuthContext";

// Route wrapper to protect routes based on login and role
const PrivateRoute = ({ children, role }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

          {/* Admin-only routes */}
          <Route path="/" element={<PrivateRoute role="Admin"><Dashboard /></PrivateRoute>} />
          <Route path="/patients" element={<PrivateRoute role="Admin"><Patients /></PrivateRoute>} />
          <Route path="/incidents" element={<PrivateRoute role="Admin"><Incidents /></PrivateRoute>} />
          <Route path="/calendar" element={<PrivateRoute role="Admin"><Calendar /></PrivateRoute>} />

          {/* Patient-only route */}
          <Route path="/myprofile" element={<PrivateRoute role="Patient"><PatientView /></PrivateRoute>} />

          {/* Catch-all (optional): redirect to dashboard or login */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
