import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import { ResumeProvider } from "./context/ResumeContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ResumeProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </ResumeProvider>
  </StrictMode>
);
