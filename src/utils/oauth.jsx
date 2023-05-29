function handleCredentialResponse(response) {
    if (response.credential) {
      localStorage.setItem("irk-token", response.credential);
    }
}

export { handleCredentialResponse };