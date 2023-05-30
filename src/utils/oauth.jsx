function handleCredentialResponse(response) {
  if (response.credential) {
    verifyToken(response.credential)
      .then((isValidToken) => {
        if (isValidToken) {
          window.location.href = "/";
        } else {
          // Handle case when token is invalid
          console.log("Invalid token");
        }
      })
      .catch((error) => {
        // Handle error during token verification
        console.error("Token verification error:", error);
      });
  }
}

async function verifyToken(token) {
  try {
    const response = await fetch(process.env.REACT_APP_BACKEND+"/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "irk-token": token,
      },
    });

    // Parse the response and return true if the token is valid
    const data = await response.json();
    if (data.status === "OK"){
      localStorage.setItem("irk-token", response.credential);
      localStorage.setItem("irk-user", JSON.stringify(data.user));
    }
    return response.ok;
  } catch (error) {
    throw new Error("Token verification failed");
  }
}

export { handleCredentialResponse };
