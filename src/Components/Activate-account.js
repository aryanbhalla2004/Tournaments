import {useState, useEffect} from 'react';
import {Switch, Route, Link, useHistory} from 'react-router-dom';

const SendActivationEmail = (props) => {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const onSubmitForm = async (e) => {
    e.preventDefault();
  }
  
  const emailVerified = async () => {
    try {
      await props.emailVerified();
      setMessage(`Verification email sent to ${props.currentUser.email}`)
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <div class="login-form-page forgot-password-fix">
      <div class="content-sizing login-form-page-content">
        <form onSubmit={onSubmitForm}>
          <h1>Send Activation Email</h1>
          <p>Active your account to unlock more features and support by "Tournament Website".</p>
          {error && <div class="error">{error}</div>}
          {message && <div class="success">{message}</div>}
          <div class="holder-input">
            <button class="button-hover" onClick={emailVerified}>Send Activation Email</button>
          </div>
          <p className="activation-page-text mt-10">By clicking on "Send Activation Email", you will receive and activation email in your inbox</p>
          <p class="create-link-login">Back to login page<Link to="/user/login">Login</Link></p>
        </form>
      </div>
    </div>
  )

}

export default SendActivationEmail;