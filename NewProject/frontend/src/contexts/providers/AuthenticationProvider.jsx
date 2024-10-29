import axios from "axios";
import { AuthContext } from "../Contexts";
import React, { useEffect, useState } from "react";
import { refreshToken, verifyToken } from "../../../services/authService.js";
import { useNavigate, useLocation } from "react-router-dom";

function AuthenticationProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    const verifyAuth = async () => {
      try {
        console.log("first")
        if (!token) {
          console.log("No token found, refreshing...");
          const response = await refreshToken();
          if (response.data.accessToken) {
            localStorage.setItem("accessToken", response.data.accessToken);
            setIsAuthenticated(true);
            navigate(location.state?.from || "/");
          }
        } else {
          const response = await verifyToken(token);

          if (response.data.auth) {
            setIsAuthenticated(true);
          } else {
            console.log(response.data.message);
            navigate("/"); // Redirect if not authenticated
          }
        }
      } catch (error) {
        console.error("Error during authentication:", error);
        // navigate("/"); // Redirect on error
      }
    };

    verifyAuth();
  }, [navigate, location.state]);

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthenticationProvider;
