import axios from "axios";
import { AuthContext } from "../Contexts";
import React, { useEffect, useState } from "react";
import { refreshToken } from "../../../services/authService.js";
import { useNavigate } from "react-router-dom";

function AuthenticationProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  // useEffect(() => {
  //   const verifyToken = async () => {
  //     try {
  //       console.log("first");
  //       const response = await refreshToken(); // Ensure token is refreshed if expired
  //       console.log(response);
  //     } catch {
  //       // navigate("/");

  //     }
  //   };
  //   verifyToken();
  // }, [navigate]);

  return (
    <AuthContext.Provider value={{ isAuthenticated: true }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthenticationProvider;
