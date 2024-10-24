// src/main.jsx
import React from "react";
import App from "./App";
import theme from "./theme/MainTheme";
import { ThemeProvider } from "@mui/material";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>
);
