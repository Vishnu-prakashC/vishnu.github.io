import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import SmoothScrollProvider from "./providers/SmoothScrollProvider";
import PageTransition from "./components/animations/PageTransition";
import Background3DWrapper from "./providers/Background3DWrapper";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SmoothScrollProvider>
      <PageTransition>
        <Background3DWrapper>
          <App />
        </Background3DWrapper>
      </PageTransition>
    </SmoothScrollProvider>
  </React.StrictMode>
);
