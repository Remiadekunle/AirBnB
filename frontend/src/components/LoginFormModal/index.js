import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { CloseModalButton, useModal } from "../../context/Modal";
import "./LoginForm.css";
import { useHistory } from "react-router-dom";
import { checkIfReviewed } from "../../store/reviews";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const history = useHistory()
  let reviews = useSelector(state => state.reviews.spot)
  if (reviews === undefined) reviews = {'Reviews': []}

  const reviewObj = {"Reviews": Object?.values(reviews)}

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);


    return dispatch(sessionActions.login({ credential, password }))
    .then((userId) => checkIfReviewed(userId, reviewObj , dispatch))
      .then(closeModal)
      .catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        }
      );
  };

  return (
    <>
      <h1>Log In</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <div id="welcome-message">
          Welcome to FairBnB
        </div>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          <div id="edit-price">
            Username or Email
          </div>
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          <div id="edit-price">
            Password
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button className="submitButton" type="submit">Log In</button>
        <CloseModalButton closeModal={closeModal} />
      </form>
    </>
  );
}

export default LoginFormModal;
