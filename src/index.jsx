import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app.jsx";
import { HelmetProvider } from 'react-helmet-async';

/**
 * Root of react site
 *
 * Imports Helmet provider for the page head
 * And App which defines the content and navigation
 */

// React 18+ rendering using createRoot
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);
