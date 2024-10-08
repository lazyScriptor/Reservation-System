import { useLocation } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import NavBar from "./components/NavBar";
import Dashboard from "./pages/dashboard/Dashboard";
import NavBarTop from "./components/NavBarTop";
import Demo from "./pages/demo/Demo";
import Reservation from "./pages/reservation/Reservation";
import CustomerBase from "./pages/customers/CustomerBase";
import BasicUserNavBar from "./components/BasicUserNavBar";
import RerservationClient from "./pages/reservation/client/RerservationClient";
import DashboardAdminBase from "./pages/ADMIN/dashboard/DashboardAdminBase";
import AdminNavBar from "./components/AdminNavBar";
import TenantBase from "./pages/ADMIN/tenant/TenantBase";
export default function Layout() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
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
            path="/demo"
            element={
              <>
                <NavBarTop />
                <NavBar />
                <Demo />
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
          />{" "}
          <Route
            path="/customer-c"
            element={
              <>
                <NavBarTop />
                <NavBar />
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
          <Route
            path="/brand/:tenantId"
            element={
              <>
                <NavBarTop />
                <NavBar />
                <Reservation />
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
        </Routes>
      </BrowserRouter>
    </>
  );
}
