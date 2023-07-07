import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";
import { useModalContext } from '../../context/modalContext';

function SignupFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { setModal } = useModalContext();

if (sessionUser) return <Redirect to="/" />;

const handleCancelClick = (e) => {
  setModal(null)
  };

    const handleSubmit = (e) => {
    e.preventDefault();
    if(password === confirmPassword) {
        setErrors({});
        return dispatch(
            sessionActions.signup({
                email,
                username,
                firstName,
                lastName,
                password
            })
        ).catch(async (res) => {
            const data = await res.json();
            if(data && data.errors){
                setErrors(data.errors);
            }
        });
    }
    return setErrors({
        confirmPassword: "Confirm password field must be the same as the Password field."
    });
  };

  return (
    <div className="container">
      <h1 className="log-in">Sign Up</h1>
      <form onSubmit={handleSubmit}>
      <div className="form-row">
        {errors.email && <p className="errors">{errors.email}</p>}
        <label>
          Email
        </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // required
            />
          </div>
        <div className="form-row">
        {errors.username && <p className="errors">{errors.username}</p>}
        <label>
          Username
        </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            // required
            />
          </div>
        <div className="form-row">
        {errors.firstName && <p className="errors">{errors.firstName}</p>}
        <label>
          First Name
        </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            // required
          />
        </div>
        <div className="form-row">
        {errors.lastName && <p className="errors">{errors.lastName}</p>}
        <label>
          Last Name
        </label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            // required
          />
        </div>
        <div className="form-row">
        {errors.password && <p className="errors">{errors.password}</p>}
        <label>
          Password
        </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // required
          />
        </div>
        <div className="form-row">
        {errors.confirmPassword && <p className="errors">{errors.confirmPassword}</p>}
        <label>
          Confirm Password
        </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            // required
          />
        </div>
        <div>
        <button className='sign-button' type="submit">Sign Up</button>
        <button className="cancel-button" type="cancel" onClick={handleCancelClick}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default SignupFormPage;
