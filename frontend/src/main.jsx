import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthContext } from "./Components/AuthContext.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <AuthContext>
      <Router>
        {" "}
        <App />
      </Router>
    </AuthContext>
  </>
);
