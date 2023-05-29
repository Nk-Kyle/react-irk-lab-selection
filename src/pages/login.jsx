
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
    google.accounts.id.renderButton(
      document.getElementById("g_id_button"),
      {
        theme: "outline",
        size: "large",
        text: "sign_in_with",
        shape: "pill",
        type: "standard",
      }
    );
  }, []);

  return (
    <div className="App">
      <h1>Google Sign In</h1>
      <div id="g_id_button"> </div>
    </div>
  );
};
export default Login;
