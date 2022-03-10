import { Link, Switch, Route, useHistory} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {firebase, auth} from "../../util/firebase";

const Setting = (props) => {
  const [error, setError] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [saveChanges, setSaveChanges] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setUserInfo(props.currentUserInfo);
  }, []);

  const [passwords, setPasswords] = useState({
    password: "",
    re_password: "",
    currentPassword: ""
  });

  const updateinfo = (e) => {
    setSaveChanges("");
    setPasswords(prev => ({
      ...prev, [e.target.name]: e.target.value
    }))
  }

  const updateInfoProfile = (e) => {
    setSaveChanges("");
    setError("");
    setSuccess("");
    setUserInfo(prev => ({
      ...prev, [e.target.name]: e.target.value
    }))
  }

  const reauth = () => {
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(props.currentUserInfo.Email, passwords.currentPassword);
    return user.reauthenticateWithCredential(cred)
  }
  
  const changePassword = () => {
    setError("");
    setSuccess("");
    if(passwords.password == passwords.re_password) {
      reauth().then(() => {
        var user = firebase.auth().currentUser;
        user.updatePassword(passwords.password).then(() => {
          setSuccess("The password was successfully changed!");
        }).catch((error) => { setError(error.message);});
      }).catch((error) => { setError(error.message);});
    } else {
      setError("Passwords dont match");
    }
  }

  const updateProfile = async () => {
    try {
      await firebase.firestore().collection('Users').doc(props.currentUser.uid).update(userInfo);
      setSaveChanges("Changes are successfully saved!");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="Tournament-page-list-container">
      <div className="top-info">
        <div>
          <h2 className="title-page">Settings</h2>
        </div>
      </div>
      <div className="Account-setting">
        <h2 className="title-box">Profile</h2>
        <p>This information will be displayed publicly so be careful what you share.</p>
        {saveChanges && <h3 className="success-message">{saveChanges}</h3>}
        <div className="col2-holder">
        <div className="div-with-input">
            <label>First Name</label>
            <input placeholder="John" className="input-field" value={userInfo.firstName} name="firstName" type="text" onChange={updateInfoProfile}></input>
          </div>
          <div className="div-with-input">
            <label>Last Name</label>
            <input placeholder="Smith" className="input-field" value={userInfo.lastName} name="lastName" type="text" onChange={updateInfoProfile}></input>
          </div>
        </div> 
        <div className="col1-holder">
          <div className="div-with-input">
            <label>Email Address</label>
            <input placeholder="example@example.com" className="input-field" value={userInfo.Email} name="Name" type="email" disabled></input>
          </div>
          <div className="reset-password-button-container">
            <button className="reset-password-button" onClick={updateProfile}>Save Changes</button>
          </div>
        </div>
        <br></br>
        <h2 className="title-box">Security</h2>
        <p>This information will let you access your account.</p>
        {success && <h3 className="success-message">{success}</h3>}
        {error && <h3 className="error-message">{error}</h3>}
        <div className="col1-holder">
          <div className="div-with-input">
            <label>Current Password</label>
            <input placeholder="" className="input-field" name="currentPassword" type="password" onChange={updateinfo}></input>
          </div>
        </div>
        <div className="col2-holder">
          <div className="div-with-input">
            <label>New Password</label>
            <input placeholder="" className="input-field" name="password" type="password" onChange={updateinfo}></input>
          </div>
          <div className="div-with-input">
            <label>Re-Password</label>
            <input placeholder="" className="input-field" name="re_password" type="password" onChange={updateinfo}></input>
          </div>
        </div> 
        <div className="reset-password-button-container">
          <button className="reset-password-button" onClick={changePassword}>Reset Password</button>
        </div>
      </div>
      <div className="Account-setting">
        <h2 className="title-box">Account</h2>
        <p className="text-setting">By delete you account, You will lose are you tournaments, teams and all other sort of data created.</p>
       <div className="file-box-desgine">
          <i class="bi bi-calendar2-minus"></i>
          <div>
            <span>{props.currentUser.uid}</span>
            <p>Created on 2011-02-34</p>
          </div>
        </div>
         <div className="delete-account-box">
          <button>Delete Account</button>
        </div>
      </div>
    </div>
  )
}

export default Setting;