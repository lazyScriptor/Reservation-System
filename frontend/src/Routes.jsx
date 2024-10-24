import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import NavBarTop from "./components/NavBarTop";
import NavBar from "./components/NavBar";
import BasicUserNavBar from "./components/BasicUserNavBar";
import AdminNavBar from "./components/AdminNavBar";
import Dashboard from "./pages/dashboard/Dashboard";
import DashboardAdminBase from "./pages/ADMIN/dashboard/DashboardAdminBase";
import TenantBase from "./pages/ADMIN/tenant/TenantBase";
import Reservation from "./pages/reservation/Reservation";
import RerservationClient from "./pages/reservation/client/RerservationClient";
import CustomerBase from "./pages/customers/CustomerBase";
import Demo from "./pages/demo/Demo";

// Function for Customer Routes
function CustomerRoutes() {
  return (
    <>
      <Route
        path="/dashboard-c"
        element={
          <>
            <NavBarTop />
            <NavBar />
            <Dashboard />
          </>
        }
      />
      <Route
        path="/forms-c"
        element={
          <>
            <NavBarTop />
            <NavBar />
            <RerservationClient />
          </>
        }
      />
      <Route
        path="/reservation"
        element={
          <>
            <NavBarTop />
            <NavBar />
            <Reservation />
          </>
        }
      />
      <Route
        path="/customer-c"
        element={
          <>
            <NavBarTop />
            <NavBar />
          </>
        }
      />
    </>
  );
}

// Function for Basic User Routes
function BasicUserRoutes() {
  return (
    <>
      <Route
        path="/dashboard-bu"
        element={
          <>
            <NavBarTop />
            <BasicUserNavBar />
            <Dashboard />
          </>
        }
      />
      <Route
        path="/customer-bu"
        element={
          <>
            <NavBarTop />
            <BasicUserNavBar />
            <CustomerBase />
          </>
        }
      />
    </>
  );
}

// Function for Admin Routes
function AdminRoutes() {
  return (
    <>
      <Route
        path="/dashboard-a"
        element={
          <>
            <NavBarTop />
            <AdminNavBar />
            <DashboardAdminBase />
          </>
        }
      />
      <Route
        path="/tenant-a"
        element={
          <>
            <NavBarTop />
            <AdminNavBar />
            <TenantBase />
          </>
        }
      />
    </>
  );
}

export default function Layout() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* Customer Routes */}
        {CustomerRoutes()}
        {/* Basic User Routes */}
        {BasicUserRoutes()}
        {/* Admin Routes */}
        {AdminRoutes()}
        {/* Additional Routes */}
        <Route
          path="/demo"
          element={
            <>
              <NavBarTop />
              <NavBar />
              <Demo />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
