import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "../LoginFormModal/LoginForm.css"
import "./SignupForm.css"

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();
  const location = useLocation();
  const history = useHistory();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, email, password));
			if (data) {
				setErrors(data);
			} else {
        if (location.pathname == '/') history.push('/photos')
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	return (
		<div className="Global-Modal-Container2">
			<div className="Global-Modal-Image-Container">
				<img src={process.env.PUBLIC_URL + "/transparentOwl.png"} className="Global-Logo"/>
			</div>
			<div className="Global-Modal-Header">Sign up for PixelPeek</div>
			<form onSubmit={handleSubmit} className="Global-ModalForm-Container">
				<ul className="Global-Errors-UL">
					{errors.map((error, idx) => (
						<li className="Global-Errors-LI" key={idx}>{error}</li>
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
				<label for="username" className="Global-Modal-Label">
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
						placeholder="Username"
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
				<label for="password" className="Global-Modal-Label">
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
						placeholder="Confirm your password"
            className="Global-Modal-input"
					/>
				</label>
				<button type="submit"  className="Global-SubmitButton">Sign Up</button>
			</form>
		</div>
	);
}

export default SignupFormModal;
