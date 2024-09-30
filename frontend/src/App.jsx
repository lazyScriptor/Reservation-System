import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/login/Login";
import NavBar from "./components/NavBar";
import Dashboard from "./pages/dashboard/Dashboard";
import NavBarTop from "./components/NavBarTop";
import Demo from "./pages/demo/Demo";
import Reservation from "./pages/reservation/Reservation";
import { CourtTypeContextProvider } from "./contexts/providers/CourtTypeContextProvider";
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
          path="/reservation"
          element={
            <>
              <NavBarTop />
              <NavBar />
              <Reservation />
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
      <CourtTypeContextProvider>
        <Layout />
      </CourtTypeContextProvider>
    </BrowserRouter>
  );
}
