import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ThemeProvider } from "./contexts/ThemeContext";
import SmoothScrollProvider from "./components/SmoothScrollProvider";
import PageTransition from "./components/animations/PageTransition";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <SmoothScrollProvider>
        <BrowserRouter>
          <PageTransition>
            <App />
          </PageTransition>
        </BrowserRouter>
      </SmoothScrollProvider>
    </ThemeProvider>
  </React.StrictMode>
);
