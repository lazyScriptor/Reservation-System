import React from "react";

import Layout from "./Routes";
import { GoogleOAuthProvider } from "@react-oauth/google";
const CLIENT_ID =
  "589651791757-105db6f0uo1bhqic1nuf9pfvva8qc5gm.apps.googleusercontent.com";
export default function App() {
  return (
    <>
      <GoogleOAuthProvider clientId={CLIENT_ID}>
        <Layout />
      </GoogleOAuthProvider>
    </>
  );
}
