<<<<<<< HEAD
import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import App from "./App.jsx";
import "./index.css";
=======
import React from 'react'
import ReactDOM from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
>>>>>>> bf76bcb779cd5308e75cdb77a66f9ec7e7121c63

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
<<<<<<< HEAD
    <App />
  </React.StrictMode>
);
=======
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
>>>>>>> bf76bcb779cd5308e75cdb77a66f9ec7e7121c63
