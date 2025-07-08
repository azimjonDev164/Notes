import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { store } from "./app/store.js";

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
console.log(domain);
console.log(clientId);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{
          redirect_uri: window.location.origin,
          audience: "https://dev-5zonq0rqnswj4b7r.us.auth0.com/api/v2/", // make sure this matches backend
        }}
      >
        <Router>
          <App />
        </Router>
      </Auth0Provider>
    </Provider>
  </React.StrictMode>
);
