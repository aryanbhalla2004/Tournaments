import {useState, useEffect} from 'react';
import {Switch, Route, Link, useHistory} from 'react-router-dom';
import {auth, firebase} from '../util/firebase';

const Login = (props) => {
  const history = useHistory();

  const [error, setError] = useState({
    email: "",
    password: "",
    all: ""
  });
  
  const [message, setMessage] = useState("");
  const [userInput, setUserInput] = useState({
    email: "",
    password: ""
  });

  const updateUserInput = (e) => {
    setError('');
    setUserInput(prevInput => ({
      ...prevInput, [e.target.name]: e.target.value
    }));
  }

  const onSubmitForm = async (e) => {
    e.preventDefault();
    if(userInput.email === "") {
      setError({email: "Email field is empty"});
    } else if ( userInput.password === "") {
      setError({password: "Password field is empty"});
    } else {
      try {
        let userDetails = await props.login(userInput.email, userInput.password);
        if(userDetails.user.emailVerified) {
          history.push('/');
        } else {
          history.push('/user/activate-account');
        }
      } catch(e) {
        setError({all: e.message});
      }
    }
  }

  return (
    <form onSubmit={onSubmitForm}>
      <h1>Welcome Back</h1>
      {error.all && <div className="error mt-10">{error.all}</div>}
      {props.successMessage && <div className="success mt-10">{props.successMessage}</div>}
      <div className="holder-input">
        <label>Email</label>
        <input type="Email" placeholder="Your Email" name="email" onChange={updateUserInput} value={userInput.email}/>
      </div>
      {error.email && <div className="error mt-10">{error.email}</div>}
      <div className="holder-input">
        <label>Password</label>
        <input type="Password" placeholder="Your Password" name="password" onChange={updateUserInput} value={userInput.password} />
      </div>
      {error.password && <div className="error mt-10">{error.password}</div>}
      <ul className="remember-forgot-password">
        <li><input type="checkbox" id="check"/><label for="check">Remember password</label></li>
        <li><Link to="/user/forgot-password">Forget Password</Link></li>
      </ul>
      <div className="holder-input">
        <button className="button-hover">LOG IN</button>
      </div>
      <p className="create-link-login">Register? <Link to="/signup">Create a free account</Link></p>
    </form>
  )
}

export default Login