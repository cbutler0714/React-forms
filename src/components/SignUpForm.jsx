import { useState } from "react";
import axios from "axios";
import React from "react";
import { useTokenContext } from "../TokenContext";

export default function SignUpForm() {
  const [form, setForm] = React.useState({
    username: "",
    password: "",
    error: null,
  });
  const { setToken } = useTokenContext();
  function update(event) {
    setForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }
  async function submit(event) {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://fsa-jwt-practice.herokuapp.com/signup",
        {
          username: form.username,
          password: form.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;
      setToken(data.token);
      setForm({
        username: "",
        password: "",
        error: null,
      });
    } catch (error) {
      setForm((prev) => ({
        ...prev,
        error: error.message,
      }));
    }
  }

  return (
    <>
      <h2>Sign Up!</h2>
      {form.error && <p>{form.error}</p>}
      <form onSubmit={submit}>
        <label>
          {" "}
          Username:
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={update}
            pattern="^[A-Za-z0-9]{3,16}$"
            required
            className="inputs"
          />
          <br />
          {form.username.length < 8 && form.username.length > 0 && (
            <small>Username must be at least 8 characters</small>
          )}
        </label>
        <br />
        <label>
          {" "}
          Password:
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={update}
            required
            className="inputs"
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}