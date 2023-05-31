import React, { useEffect } from "react";
import { handleCredentialResponse } from "../utils/oauth";

const Login = () => {
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_OAUTH_CLIENT_ID,
      callback: handleCredentialResponseIn,
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

  const handleCredentialResponseIn = (response) => {
    handleCredentialResponse(response)
      .then((resp) => {
        if (!resp[0]) {
          alert(resp[1]);
        }
      })
      .catch((error) => {
        alert("Token verification error");
      });
  };

  return (
    <div className="container-fluid bg-light min-vh-100 d-flex align-items-center justify-content-center">
      <div className="card p-4">
        <div className="d-flex justify-content-center">
          <img
            src="IRK_logo.png"
            alt="IRK_logo"
            className="img-fluid rounded mx-auto d-block"
            style={{ width: "auto", height: "30vh" }}
          />
        </div>
        <div className="d-flex justify-content-center">
          <div id="g_id_button"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
