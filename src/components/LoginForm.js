import React, { useState } from "react";
import { useToasts } from "react-toast-notifications";
import { login } from "../api";
import store from "../store";
import { setAuthenticated, setUser } from "../actions";

const LoginForm = ({ handleFlip }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginSpinner, setLoginSpinner] = useState(false);

  const { addToast } = useToasts();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoginSpinner(true);
      const data = await login({ username, password });
      setLoginSpinner(false);
      if (data.success) {
        clearForm();
        addToast(data.msg, { appearance: "success" });
        localStorage.user = JSON.stringify(data.user);
        localStorage.token = data.token;
        store.dispatch(setAuthenticated());
        store.dispatch(setUser());
      } else {
        console.error(data.error);
        addToast(data.error, { appearance: "error" });
      }
    } catch (error) {
      setLoginSpinner(false);
      console.error(error);
    }
  };

  const clearForm = () => {
    setUsername("");
    setPassword("");
  };

  return (
    <form
      className="shadow rounded bg-light mx-auto text-center p-4 login-form"
      onSubmit={handleSubmit}
    >
      <div className="form-floating mb-2">
        <input
          required
          type="text"
          className="form-control"
          id="login__username"
          placeholder="clumsyknight"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          minLength={3}
          maxLength={15}
        />
        <label htmlFor="login__username">Username</label>
      </div>
      <div className="form-floating mb-3">
        <input
          required
          type="password"
          className="form-control"
          id="login__password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          minLength={6}
        />
        <label htmlFor="login__password">Password</label>
      </div>
      <button
        type="submit"
        className="btn btn-outline-primary w-100 btn-lg"
        disabled={loginSpinner}
      >
        {!loginSpinner && "Login"}
        {loginSpinner && (
          <div
            className="spinner-border text-primary spinner-border-sm"
            role="status"
            style={{ width: 24, height: 24 }}
          >
            <span className="visually-hidden">Logging in...</span>
          </div>
        )}
      </button>
      <hr />
      <button
        className="btn btn-success btn-lg w-75"
        type="button"
        onClick={handleFlip}
      >
        Create New Account
      </button>
    </form>
  );
};

export default LoginForm;
