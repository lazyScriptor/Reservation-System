import React, { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Drawer_ad2 from "./sections/Drawers/Drawer_ad2";
import LoginForm from "./sections/login/LoginForm";
import AuthenticationProvider from "./contexts/providers/AuthenticationProvider";

function App() {
  const [count, setCount] = useState(0); // State lifted to the App component

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route
          path="/dashboard-admin"
          element={
            <Drawer_ad2 number={1}>
              <AuthenticationProvider>
                <p>Dashboard component</p>
              </AuthenticationProvider>
            </Drawer_ad2>
          }
        />
        <Route
          path="/courts-admin"
          element={
            <Drawer_ad2 number={2}>
              <AuthenticationProvider>
                <p>Courts Admin</p>
              </AuthenticationProvider>
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
        {/* <Route path="/*" element={<ProtectedAdminRoutes />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

const ProtectedAdminRoutes = () => {
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
