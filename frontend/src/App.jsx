import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/login/Login";
import NavBar from "./components/NavBar";
import Dashboard from "./pages/dashboard/Dashboard";
import NavBarTop from "./components/NavBarTop";

function Layout() {
  const location = useLocation();
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <>
              <NavBarTop />
              <NavBar />
              <Dashboard />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
