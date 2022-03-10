import React, {userState, useEffect, useState} from 'react';
import {Switch, Route, Link, useHistory} from 'react-router-dom';
import {firebase} from '../util/firebase';

const Signup = (props) => {
  const history = useHistory();
  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
    re_password: "",
    all: ''
  });

  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    password: "",
    re_password: "",
  });

  const updateUserInput = (e) => {
    setError('');
    setUserInput(prevInput => ({
      ...prevInput, [e.target.name]: e.target.value
    }));
  }

  const onSubmitForm = async (e) => {
    e.preventDefault();

    if(userInput.name !== '') {
      if(userInput.email !== '') {
        if(userInput.password !== '') {
          if(userInput.re_password !== '') {
            if(userInput.password === userInput.re_password) {

              try {
                let informationUser = await props.signup(userInput.email, userInput.password);
                let userid = informationUser.user.uid;
                console.log(userid);
                const user = {
                  Name: userInput.name,
                  Email: userInput.email
                }
                //firebase.firestore().collection("users").doc(userid).set(user);
                if(informationUser.user.emailVerified) {
                  history.push('/');
                } else {
                  history.push('/user/activate-account');
                }
              } catch(e) {
                setError({all: e.message});
              }
              
            } else {
              setError({all: "Passwords don't match"});
            }
          } else {
            setError({re_password: "Confirm Password field is emtpy"});
          }
        } else {
          setError({password: "Password field is empty"});
        }
      } else {
        setError({email: 'Email field is empty'});
      }
    } else {
      setError({name: 'Name field is empty'})
    }
  }

  return (
    <div className="login-form-page signup-form">
    <div className="content-sizing login-form-page-content">
      <form onSubmit={onSubmitForm}>
        <h1>Create a free account</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicin.</p>
        {error.all && <div className="error mt-10">{error.all}</div>}
        <div className="holder-input">
          <label>Name</label>
          <input type="Name" placeholder="Your Name" name="name" onChange={updateUserInput} value={userInput.name}/>
        </div>
        {error.name && <div className="error mt-10">{error.name}</div>}
        <div className="holder-input">
          <label>Email</label>
          <input type="Email" placeholder="Your Email" name="email" onChange={updateUserInput} value={userInput.email}/>
        </div>
        {error.email && <div className="error mt-10">{error.email}</div>}
        <div className="holder-input">
          <label>Password</label>
          <input type="Password" placeholder="Your Password" name="password" onChange={updateUserInput} value={userInput.password}/>
        </div>
        {error.password && <div className="error mt-10">{error.password}</div>}
        <div className="holder-input">
          <label>Confirm Password</label>
          <input type="Password" placeholder="Your Confirm Password" name="re_password" onChange={updateUserInput} value={userInput.re_password}/>
        </div>
        {error.re_password && <div className="error mt-10">{error.re_password}</div>}
        <ul className="remember-forgot-password">
          <li><input type="checkbox" id="check" required/><label for="check">Accept all the <a href="#">Terms and Conditions</a></label></li>
        </ul>
        <div className="holder-input">
          <button className="button-hover">SIGN UP</button>
        </div>
        <p className="create-link-login">Already have an account? <Link to="/user/login">Login</Link></p>
      </form>
    </div>
  </div>
  )
}

export default Signup;