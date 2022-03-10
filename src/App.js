import React, {useEffect, useState} from "react";
import {Switch, Route, Redirect, useHistory, Link} from "react-router-dom";
import {auth, firebase, db} from "./util/firebase";
import Login from "./Components/Login";
import Signup from "./Components/SIgnup";
import Dashboard from "./Components/Dashboard/Dashboard";
import SendActivationEmail from "./Components/Activate-account";
import ConfirmActivation from "./Components/ConfirmAccountActivation";
import "./App.css";
import Home from "./Frontend-Components/Home";

const App = () => {
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState();
  const [listTournaments, setListTournament] = useState([]);
  const [loading, setLoading ] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      //setLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    db.collection("Tournaments").onSnapshot((querySnapshot) => {
      let tempList = [];
      querySnapshot.forEach((doc) => {
        tempList.push(doc.data());
        console.log(doc.data());
      });
      setListTournament(tempList);
    });
  }, []);


  const forgotPassword = (email) => {
    return auth.sendPasswordResetEmail(email);
  }

  const logout = () => {
    auth.signOut();
    history.push('/');
  }

  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  }

  const signUp = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  const emailVerified = () => {
    let user = firebase.auth().currentUser;
    user.sendEmailVerification().then((res) => {
      return res
    }).catch((err) => {
      return err
    })
  }

  const verifyEmailUser = (code) => {
    return auth.applyActionCode(code);
  }

  return (
    <>
    <Switch>
      <Route exact path="/">
        <Home currentUser={currentUser} logout={logout} listTournaments={listTournaments}/>
      </Route>
      <Route exact path="/tournament-details/:id">
        <h1>Tournament Details</h1>
      </Route>

      <Route path="/dashboard">
        {currentUser ? currentUser.emailVerified ? <Dashboard logout={logout} currentUser={currentUser} logout={logout}/> : <Redirect to="/user/activate-account"/> : <Redirect to="/login"/>}
      </Route>
      <Route exact path="/login">
        {currentUser ? <Redirect to="/dashboard"/> : <Login login={login}></Login>}                    
      </Route>
      <Route exact path="/signup">
        {currentUser ? <Redirect to="/dashboard"/>: <Signup signup={signUp}></Signup>}                    
      </Route>
      <Route exact path="/user/activate-account">
        {currentUser ? currentUser.emailVerified ? <Redirect to="/" /> : <SendActivationEmail emailVerified={emailVerified} currentUser={currentUser}></SendActivationEmail> : <Redirect to="/"/>}
      </Route>
      <Route exact path="/user/confirm-account-activation">
        {currentUser && <ConfirmActivation verifyEmailUser={verifyEmailUser}/>}
      </Route>  
    </Switch>
    </>
  )
}

export default App;
