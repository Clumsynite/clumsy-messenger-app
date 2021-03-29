import React, { useState } from "react";
import Avatar from "react-avatar";
import _ from "lodash";
import { useToasts } from "react-toast-notifications";

import { usernameExists, signup } from "../api";

const SignupForm = ({ handleFlip }) => {
  const [photo, setPhoto] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [signupSpinner, setSignupSpinner] = useState(false);

  const { addToast } = useToasts();

  const convertToBase64 = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      const result = reader.result;
      if (_.startsWith(result, "data:image")) setPhoto(result);
    };
  };

  const handleUsername = async (e) => {
    const newUsername = e.target.value;
    setUsername(newUsername);
    try {
      if (newUsername.length > 5 && newUsername.trim() !== "") {
        const exists = await usernameExists(newUsername);
        if (exists.exists) {
          e.target.className = "form-control is-invalid";
        } else {
          e.target.className = "form-control is-valid";
        }
      } else {
        e.target.className = "form-control";
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePasswordConfirmation = (e) => {
    const confirmationPassword = e.target.value;
    setConfirmPassword(confirmationPassword);
    if (confirmationPassword.length > 4 && confirmationPassword.trim() !== "") {
      if (password === confirmationPassword) {
        e.target.className = "form-control is-valid";
      } else {
        e.target.className = "form-control is-invalid";
      }
    } else {
      e.target.className = "form-control";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSignupSpinner(true);
    try {
      const userObject = { firstname, lastname, username, password, email };
      const data = await signup(userObject);
      setSignupSpinner(false);
      if (data.success) {
        clearForm();
        addToast(data.msg, { appearance: "success" });
        handleFlip(e);
      } else {
        console.error(data.error);
        addToast(data.error, { appearance: "error" });
      }
    } catch (error) {
      setSignupSpinner(false);
      console.error(error);
    }
  };

  const clearForm = () => {
    setPhoto("");
    setFirstname("");
    setLastname("");
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setEmail("");
    document.querySelector("#new__username").classList.remove("is-valid");
    document
      .querySelector("#new__password-confirm")
      .classList.remove("is-valid");
  };

  return (
    <form
      className="shadow rounded bg-light mx-auto text-center p-4 w-75"
      onSubmit={handleSubmit}
    >
      <div className="row g-2">
        <div className="col-md-4">
          {!_.startsWith(photo, "data:image") ? (
            <Avatar
              name={`User Name`}
              size={60}
              alt={`${username}'s Avatar`}
              round={true}
            />
          ) : (
            <img src={photo} alt="PFP" className="profile-picture" />
          )}
        </div>
        <div className="col-md-8">
          <div className="mb-3 text-start">
            <label htmlFor="formFile" className="form-label">
              Select your Profile Picture (Optional)
            </label>
            <input
              className="form-control"
              type="file"
              id="formFile"
              onChange={convertToBase64}
              accept="image/*"
            />
          </div>
        </div>
      </div>
      <div className="row g-2">
        <div className="col-md">
          <div className="form-floating mb-2">
            <input
              required
              type="text"
              className="form-control"
              id="new__firstname"
              placeholder="Clumsy"
              minLength="5"
              maxLength="25"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
            <label htmlFor="new__firstname">Firstname</label>
          </div>
        </div>
        <div className="col-md">
          <div className="form-floating mb-2">
            <input
              required
              type="text"
              className="form-control"
              id="new__lastname"
              placeholder="Knight"
              minLength="5"
              maxLength="25"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
            <label htmlFor="new__lastname">Lastname</label>
          </div>
        </div>
      </div>
      <div className="form-floating mb-2">
        <input
          required
          type="text"
          className="form-control"
          id="new__username"
          placeholder="clumsyknight"
          minLength="5"
          value={username}
          onChange={handleUsername}
        />
        <label htmlFor="new__username">Username</label>
        <div className="valid-feedback">Username is available</div>
        <div className="invalid-feedback">Username is not available</div>
      </div>
      <div className="row g-2">
        <div className="col-md">
          <div className="form-floating mb-3">
            <input
              required
              type="password"
              className="form-control"
              id="new__password"
              placeholder="Password"
              minLength="5"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="new__password">Password</label>
          </div>
        </div>
        <div className="col-md">
          <div className="form-floating mb-3">
            <input
              required
              type="password"
              className="form-control"
              id="new__password-confirm"
              placeholder="Confirm Password"
              minLength="5"
              value={confirmPassword}
              onChange={handlePasswordConfirmation}
            />
            <label htmlFor="new__password-confirm">Confirm Password</label>
            <div className="valid-feedback">Passwords matched</div>
            <div className="invalid-feedback">Passwords don't match</div>
          </div>
        </div>
      </div>
      <div className="form-floating mb-2">
        <input
          required
          type="email"
          className="form-control"
          id="new__email"
          placeholder="clumsy@knight.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="new__email">Email Address</label>
      </div>
      <button
        type="submit"
        className="btn btn-outline-success w-100 btn-lg"
        disabled={signupSpinner}
      >
        {!signupSpinner && "Create New Account"}
        {signupSpinner && (
          <div
            className="spinner-border text-success spinner-border-sm"
            role="status"
            style={{ width: 24, height: 24 }}
          >
            <span className="visually-hidden">Creating New account...</span>
          </div>
        )}
      </button>
      <hr />
      <button
        className="btn btn-primary btn-lg w-75"
        type="button"
        onClick={handleFlip}
      >
        Login
      </button>
    </form>
  );
};

export default SignupForm;
