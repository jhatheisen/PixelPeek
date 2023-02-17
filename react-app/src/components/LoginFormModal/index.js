import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { useLocation, useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const location = useLocation();
  const history = useHistory();

  const demoLogin = () => {
    dispatch(sessionActions.login("demo@aa.io", "password"));
    closeModal();
    return history.push("/photos");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      if (location.pathname == "/") history.push("/photos");
      closeModal();
    }
  };

  return (
    <div className="Global-Modal-Container">
      <img
        src={process.env.PUBLIC_URL + "/transparentOwl.png"}
        className="Global-Logo"
      />
      <div className="Global-Modal-Header">Log in to PixelPeek</div>
      <form onSubmit={handleSubmit} className="Global-ModalForm-Container">
        <ul className="Global-Errors-UL">
          {errors.map((error, idx) => (
            <li className="Global-Errors-LI" key={idx}>
              {error}
            </li>
          ))}
        </ul>
        <label for="email" className="Global-Modal-Label">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email address"
            className="Global-Modal-input"
          />
        </label>
        <label for="password" className="Global-Modal-Label">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
            className="Global-Modal-input"
          />
        </label>
        <button type="submit" className="Global-SubmitButton">
          Log In
        </button>
        <div onClick={demoLogin} className="Login-Demo">
          Try demo
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
