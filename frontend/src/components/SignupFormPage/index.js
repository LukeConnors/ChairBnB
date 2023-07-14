import React, {useEffect ,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";
import { useModalContext } from '../../context/modalContext';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function SignupFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [disabled, setDisabled] = useState(true)
    const [errors, setErrors] = useState({});
    const { setModal } = useModalContext();
    const history = useHistory();



    useEffect(() => {
      if(username.length >= 4 && password.length >= 6){
        setDisabled(false)
      } else {
        setDisabled(true)
      }
    }, [username, password])

if (sessionUser) return <Redirect to="/" />;

const handleCancelClick = (e) => {
  setModal(null)
  };

    const handleSubmit = async (e) => {
    e.preventDefault();

    const passErrors = {};
    if(password !== confirmPassword){
      passErrors.password = 'Confirm Password must match Password'
      setErrors(passErrors)
    }

  const payload ={
     email,
    username,
    firstName,
    lastName,
    password
    }
let newUser = await dispatch(sessionActions.signup(payload))
if(newUser && newUser.errors){
  const res = await newUser
  console.log(res, 'THIS IS OUR BAD THING')
  setErrors(res.errors)
} else {
  setModal(null)
  history.push('/')
  }
}

return (
  <div className="signup-container">
      <h1 className="sign-up-title">Sign Up</h1>
      <form onSubmit={handleSubmit}>
      <div className="form-row">
        {errors?.email && <p className="errors">{errors?.email}</p>}
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
        {errors?.username && <p className="errors">{errors?.username}</p>}
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
        {errors?.firstName && <p className="errors">{errors?.firstName}</p>}
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
        {errors?.lastName && <p className="errors">{errors?.lastName}</p>}
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
        {errors?.password && <p className="errors">{errors?.password}</p>}
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
        {errors?.confirmPassword && <p className="errors">{errors?.confirmPassword}</p>}
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
        <button className='sign-button' type="submit" disabled={disabled}>Sign Up</button>
        <button className="cancel-button" type="cancel" onClick={handleCancelClick}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

  export default SignupFormPage;
