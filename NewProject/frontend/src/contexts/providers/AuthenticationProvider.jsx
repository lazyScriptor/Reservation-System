import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// Create an AuthContext to provide the authentication state and methods
const AuthContext = createContext();

// Custom hook to access the AuthContext
export const useAuth = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return authContext;
};

const AuthenticationProvider = ({ children }) => {
  const [token, setToken] = useState(null); // Access token
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication state
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch access token securely
  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/authorize-check/access-token`,
          { withCredentials: true }
        );
        console.log("Access Token Response: ", response); // Log the response
        setToken(response.data.accessToken);
        console.log(response.data.accessToke);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error fetching access token: ", error);
        setToken(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    fetchAccessToken();
  }, []);

  // Attach the access token to axios headers if it exists
  useEffect(() => {
    const authInterceptor = axios.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      axios.interceptors.request.eject(authInterceptor); // Clean up the interceptor
    };
  }, [token]);

  // Automatically refresh token when expired
  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          // Get a new access token using the refresh token
          const { data } = await axios.get(
            `${import.meta.env.VITE_API_URL}/user/authorize-check/refresh-token`,
            { withCredentials: true }
          );
          setToken(data.accessToken);
          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
          return axios(originalRequest); // Retry the original request with the new token
        } catch (refreshError) {
          setIsAuthenticated(false); // Logout if refresh fails
          setToken(null);
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );

  // Render the provider with the authentication state
  return (
    <AuthContext.Provider value={{ isAuthenticated, token }}>
      {!loading && children}{" "}
      {/* Only render children when loading is complete */}
    </AuthContext.Provider>
  );
};

export default AuthenticationProvider;
