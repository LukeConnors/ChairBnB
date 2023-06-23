import {useState} from 'react'
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./LoginForm.css"

function LoginFormPage() {
const dispatch = useDispatch();
const sessionUser = useSelector((state) => state.session.user)
const [credential, setCredential] = useState("");
const [password, setPassword] = useState("");
const [errors, setErrors] = useState({});

if (sessionUser) return <Redirect to="/" />;

const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.logInUser({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <div className="container">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label>Username or Email</label>
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </div>
        <div className="form-row">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errors.credential && <p>{errors.credential}</p>}
        <button type="submit">Log In</button>
      </form>
    </div>
  );

}

export default LoginFormPage;
