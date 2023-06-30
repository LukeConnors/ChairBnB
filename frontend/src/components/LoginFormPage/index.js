import {useState} from 'react'
import {useHistory} from 'react-router-dom'
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
const [loginError, setLoginError] = useState(null);
const history = useHistory()

if (sessionUser) return <Redirect to="/" />;

const handleSubmit = (e) => {
  e.preventDefault();
  setErrors({});
  setLoginError(null); // Reset login error
  const user = { credential, password };
  dispatch(sessionActions.logIn(user))
    .then(() => {
      history.push('/');
    })
    .catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) {
        setErrors(data.errors);
      }
      setLoginError("The provided credentials were invalid"); // Set login error
    });
};


  const handleDemoLogin = (e) => {
    e.preventDefault();
    setCredential('Demo-lition')
    setPassword('password')
    const demoUser = { credential: 'Demo-lition', password: 'password' };
    dispatch(sessionActions.logIn(demoUser)).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
  }

  return (
    <div className="container">
      <h1>Log In</h1>
      {errors.credential && <p className='error'>{errors.credential}</p>}
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
        <div>
          <a className='demo' onClick={handleDemoLogin}>Demo User</a>
          </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  );

}

export default LoginFormPage;
