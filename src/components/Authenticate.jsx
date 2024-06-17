import React from "react";
import { useTokenContext } from "../TokenContext";
import axios from "axios";

export default function Authenticate() {
  const { token } = useTokenContext();
  const [error, setError] = React.useState(null);
  const [successMessage, setSuccessMessage] = React.useState(null);
  const [username, setUsername] = React.useState("");

  async function auth() {
    try {
      const response = await axios.get(
        "https://fsa-jwt-practice.herokuapp.com/authenticate",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsername(response?.data?.data?.username);
      setSuccessMessage(response.data.message);
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <>
      <h2>Authenticate!</h2>
      {successMessage && <p>{successMessage}</p>}
      {username && <p>For Username: {username}</p>}
      {error && <p>{error}</p>}
      <button onClick={auth}>Authenticate Token</button>
    </>
  );
}
