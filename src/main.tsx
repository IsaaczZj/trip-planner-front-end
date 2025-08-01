import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App.tsx";
import { AppRoute } from "./routes/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppRoute />
  </StrictMode>
);
