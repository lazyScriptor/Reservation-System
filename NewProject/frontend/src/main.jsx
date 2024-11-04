// src/main.jsx
import React from "react";
import App from "./App";
import theme from "./theme/MainTheme";
import { ThemeProvider } from "@mui/material";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import CourtTypeContextProvider from "./contexts/providers/CourtTypeContextProvider";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CourtTypeContextProvider>
          <App />
        </CourtTypeContextProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
