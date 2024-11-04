import React, { useState, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Drawer_ad2 from "./sections/Drawers/Drawer_ad2";
import AuthenticationProvider from "./contexts/providers/AuthenticationProvider";
import CreateVenueBase from "./sections/create/rolebased/admin/CreateVenueBase";
import CreateCourtBase from "./sections/create/rolebased/admin/CreateCourtBase";
import CreateCourtTypeBase from "./sections/create/rolebased/admin/CreateCourtTypeBase";
import CourtTypeContextProvider from "./contexts/providers/CourtTypeContextProvider";
import Demo from './sections/demo/Demo'
import Navbar from "./sections/Drawers/NavBar_bu";
const LoginForm = lazy(() => import("./sections/login/LoginForm"));
const Dashboard = lazy(() => import("./sections/dashboard/Dashboard"));
const CustomSidebar = lazy(() => import("./sections/Drawers/CustomSidebar"));

function App() {
  const [count, setCount] = useState(0); // State lifted to the App component

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<LoginForm />} />

          <Route
            path="/dashboard-admin"
            element={
              <Drawer_ad2 number={1}>
                <AuthenticationProvider>
                  <Dashboard />
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
            path="/create-venue-admin"
            element={
              <Drawer_ad2 number={2} subNumber={1}>
                <CreateVenueBase />
              </Drawer_ad2>
            }
          />
          <Route
            path="/create-court-type-admin"
            element={
              <Drawer_ad2 number={2} subNumber={2}>
                <CreateCourtTypeBase />
              </Drawer_ad2>
            }
          />
          <Route
            path="/create-court-admin"
            element={
              <Drawer_ad2 number={2} subNumber={3}>
                <CreateCourtBase />
              </Drawer_ad2>
            }
          />

          <Route
            path="/reservation-admin"
            element={<Drawer_ad2 number={4}>reservva</Drawer_ad2>}
          />

          <Route
            path="/dashboard-client"
            element={
              <>
                <Navbar />
                <Dashboard />
              </>
            }
          />
          <Route
            path="/demo-client"
            element={
              <>
                <Navbar />
                <Demo />
              </>
            }
          />
          <Route path="/side" element={<Navbar />} />
        </Routes>
      </Suspense>
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
