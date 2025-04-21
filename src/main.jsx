import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

if (process.env.NODE_ENV === 'production') {
  serviceWorkerRegistration.register();
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
