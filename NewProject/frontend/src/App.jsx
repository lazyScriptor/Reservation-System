import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Drawer_ad2 from "./sections/Drawers/Drawer_ad2";

function App() {
  const [count, setCount] = useState(0); // State lifted to the App component

  return (
    <BrowserRouter>
      <Routes>{AdminRoutes()}</Routes>
    </BrowserRouter>
  );
}

export default App;

const AdminRoutes = () => {
  return (
    <>
      <Route
        path="/dashboard-admin"
        element={
          <>
            <Drawer_ad2 number={1}>
              <p>Dashboard component</p>
            </Drawer_ad2>
          </>
        }
      />
       <Route
        path="/courts-admin"
        element={
          <>
            <Drawer_ad2 number={2}>
              <p>Courts Admin</p>
            </Drawer_ad2>
          </>
        }
      />
      <Route
        path="/create-courts-admin"
        element={
          <>
            <Drawer_ad2 number={2} subNumber={1}>
              <p>Create Court</p>
            </Drawer_ad2>
          </>
        }
      />
    </>
  );
};
