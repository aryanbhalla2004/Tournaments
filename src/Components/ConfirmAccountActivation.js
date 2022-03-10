import { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom";

const ConfirmActivation = (props) => {
  const history = useHistory();
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const code = urlParams.get('oobCode');
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [verifed, setVerifed] = useState(false);

  useEffect(() => {
    const getMeActivated = async () => {
      if(code !== null || code !== undefined) {
        try {
          let info = await props.verifyEmailUser(code);
          setVerifed(true);
        } catch (e) {
          setError(e.message);
        }
      } else {
        history.push('/user/activate-account')
      }
    }

    getMeActivated();
  }, []);

  return (
    <div class="login-form-page forgot-password-fix">
    <div class="content-sizing login-form-page-content">
      <form>
        <h1>Successfully Activated</h1>
        <p>Your email has been Successfully activated, it has open may door for your business to achieve your goals</p>
        {error && <div class="error">{error}</div>}
        {message && <div class="success">{message}</div>}
        <div class="holder-input">
          {verifed ? <button class="button-hover" onClick={(e) => history.push('/dashboard')}>Go To Dashboard</button> : <button class="" disabled>Loading ...</button>}
        </div>
        <p className="activation-page-text mt-10">By clicking on "Dashboard" button, you will be redirect to you dashboard!</p>
        <p class="create-link-login">Back to login page<Link to="/dashboard">Logout</Link></p>
      </form>
    </div>
  </div>
  )
}

export default ConfirmActivation;