import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "./contexts/ThemeContext";
import SmoothScrollProvider from "./components/SmoothScrollProvider";
import PageTransition from "./components/animations/PageTransition";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <SmoothScrollProvider>
        <PageTransition>
          <App />
        </PageTransition>
      </SmoothScrollProvider>
    </ThemeProvider>
  </React.StrictMode>
);
