import React, { useEffect } from "react";
import { handleCredentialResponse } from "../utils/oauth";

const Login = () => {
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_OAUTH_CLIENT_ID,
      callback: handleCredentialResponse,
      ux_mode: "popup",
      hd: "gmail.com",
    });
    google.accounts.id.renderButton(document.getElementById("g_id_button"), {
      theme: "outline",
      size: "large",
      text: "sign_in_with",
      shape: "pill",
      type: "standard",
    });
  }, []);

  return (
    <div className="container-fluid bg-light min-vh-100 d-flex align-items-center justify-content-center">
      <div className="card p-4">
        <h1 className="text-center mb-4">Google Sign In</h1>
        <div className="d-flex justify-content-center">
          <div id="g_id_button"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
