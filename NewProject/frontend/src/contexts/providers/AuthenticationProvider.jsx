import axios from "axios";
import { AuthContext } from "../Contexts";
import React, { useEffect, useState } from "react";

function AuthenticationProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const token = localStorage.getItem("accessToken");
  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/isUserAuth`,
          {
            headers: {
              "x-access-token": localStorage.getItem("accessToken"), // or however you set it
            },
          }
        );
        console.log(response.data);
        setIsAuthenticated(response.data.auth); // Adjust according to your API response
      } catch (error) {
        console.error("Error fetching authentication status:", error);
        setIsAuthenticated(false); // Default to false on error
      }
    };

    fetchAuthStatus();
  }, [token]);

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthenticationProvider;
