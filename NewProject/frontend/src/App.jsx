import React, { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Drawer_ad2 from "./sections/Drawers/Drawer_ad2";
import LoginForm from "./sections/login/LoginForm";
import AuthenticationProvider, { useAuth } from "./contexts/providers/AuthenticationProvider";


function App() {
  const [count, setCount] = useState(0); // State lifted to the App component

  return (
    <AuthenticationProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          
          {/* Admin Routes are protected */}
          <Route path="/*" element={<ProtectedAdminRoutes />} />
        </Routes>
      </BrowserRouter>
    </AuthenticationProvider>
  );
}

export default App;




const ProtectedAdminRoutes = () => {
  const { isAuthenticated } = useAuth(); // Get authentication state

  if (!isAuthenticated) {
    return <Navigate to="/" replace />; // Redirect to login if not authenticated
  }

  return (
    <Routes>
      <Route
        path="/dashboard-admin"
        element={
          <Drawer_ad2 number={1}>
            <p>Dashboard component</p>
          </Drawer_ad2>
        }
      />
      <Route
        path="/courts-admin"
        element={
          <Drawer_ad2 number={2}>
            <p>Courts Admin</p>
          </Drawer_ad2>
        }
      />
      <Route
        path="/create-courts-admin"
        element={
          <Drawer_ad2 number={2} subNumber={1}>
            <p>Create Court</p>
          </Drawer_ad2>
        }
      />
    </Routes>
  );
};

