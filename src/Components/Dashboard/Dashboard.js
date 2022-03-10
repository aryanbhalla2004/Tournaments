import React, {useEffect, useState} from "react";
import { Link, Switch, Route, useHistory} from "react-router-dom";
import {db, firebase} from '../../util/firebase';
import Tournaments from "./Tournaments";
import "./style/dashboard.css";
import Home from "./Home";
import CreateTournament from "./New_Tournament_Steps/Create_Tournament";
import TournamentDetails from "./TournamentDetails";
import LoadingCircle from "../LoadingCircle";
import Setting from "./Setting";
import Edit from "./Edit";

const Dashboard = (props) => {
  const history = useHistory();
  const [listTournaments, setListTournament] = useState([]);
  const [pageLocation, setPageLocation] = useState("");
  const [currentUserInfo, setCurrentUserInfo] = useState({});
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [confirmPublish, setConfirmPublish] = useState(false);
  const [confirmPaused, setConfirmPaused] = useState(false);
  const [pausedCode, setPausedCode] = useState();
  const [confirmLogout, setConfirmLogout] = useState(false);

  useEffect(() => {
    document.getElementsByClassName("main-content").scrollTop = 0;
    db.collection("Tournaments").onSnapshot((querySnapshot) => {
      let tempList = [];
      querySnapshot.forEach((doc) => {
        tempList.push(doc.data());
      });
      setListTournament(tempList);
    });
  }, []);

  useEffect(() => {
    let user = firebase.firestore().collection('Users').doc(props.currentUser.uid);
    user.onSnapshot((querySnapShot) => {
      setCurrentUserInfo(querySnapShot.data());
    });
  }, [props.currentUser]);

  const deleteListing = async () => {
    setConfirmLoading(true);
    history.push("/dashboard/tournaments");
    try {
      await firebase.firestore().collection('Tournaments').doc(deleteId).delete();
    } catch (e) {
      console.log(e);
    }
    setConfirmDelete(false);
    setConfirmLoading(false);
  }

  const pauseTournament = async () => {
    setConfirmLoading(true);

    try {
      await firebase.firestore().collection('Tournaments').doc(pausedCode).update({"Published": false});
    } catch (e) {
      console.log(e);
    }
    
    setConfirmPaused(false);
    setConfirmLoading(false);
  }

  return (
    <>
      <header>
        <div className="top-head-nav">
          <div className="left-top-nav">
            <div className="logo">
              <img src="https://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/gamepad-icon.png" width="50" />
              <h1>PTEC E-Sports</h1>
            </div>
            <div className="search-bar-container">
              <div className="input-box">
                <i className="bi bi-search"></i>
                <input placeholder="Search..." />
              </div>
            </div>
          </div> 
          <div className="right-top-nav">
            <ul>
              <li className="profile-holder">
                <i className="bi bi-person-circle"></i>
                <div className="user-info">
                  <h3>{currentUserInfo && currentUserInfo.lastName}, {currentUserInfo && currentUserInfo.firstName}</h3>
                  <p>{currentUserInfo && currentUserInfo.Email}</p>
                </div>
              </li>
            </ul>
          </div> 
        </div>
        <div className="bottom-head-page-nav">
          <div className="nav-bottom-left-page">
            <button className="hamburger-close"><i className="bi bi-list"></i></button>
            <h2>Dashboard / <b>{pageLocation}</b></h2>
          </div>
          <div className="nav-bottom-right-page">
            <h2>Account Type <i className="bi bi-dash-lg"></i> <b>{currentUserInfo && currentUserInfo.Organizer ? "Organizer" : "Team Leader"}</b></h2>
          </div>
        </div>
      </header>
      <main>
        <aside className="nav-bar">
          <ul>
            {currentUserInfo && currentUserInfo.Organizer ? <button className="new-tournament" onClick={() => history.push("/dashboard/newTournament")}><i className="bi bi-plus-lg"></i> New Tournament</button> : <button className="new-tournament" onClick={() => history.push("/dashboard/newTeam")}><i className="bi bi-plus-lg"></i> Create New  Team</button>}
            <li><Link to="/dashboard" onClick={() => setPageLocation("Home")}><i className="bi bi-house-door"></i> Dashboard</Link></li>
            {currentUserInfo && currentUserInfo.Organizer ? <li><Link to="/dashboard/tournaments" onClick={() => setPageLocation("Tournament")}><i className="bi bi-trophy"></i>Tournaments</Link></li> : <li><Link to="/dashboard/tournaments" onClick={() => setPageLocation("Tournament")}><i class="bi bi-people"></i>Teams</Link></li>}
            <li><Link to="/dashboard/settings" onClick={() => setPageLocation("Settings")}><i className="bi bi-gear"></i>Settings</Link></li>
            <li><Link onClick={() => setConfirmLogout(true)}><i className="bi bi-box-arrow-in-left"></i>Logout</Link></li>
          </ul>
        </aside>
        <section className="main-content">
          <Switch>
            <Route exact path="/dashboard">
              <Home listTournaments={listTournaments}/>
            </Route>
            <Route exact path="/dashboard/tournaments">
              <Tournaments teamsList={props.teamsList} listTournaments={listTournaments} setTeamList={props.setTeamList} setDeleteId={setDeleteId} setConfirmDelete={setConfirmDelete}/>  
            </Route>
            <Route exact path="/dashboard/tournaments/:id">
              <TournamentDetails listTournaments={listTournaments} setConfirmPublish={setConfirmPublish} setDeleteId={setDeleteId} setConfirmDelete={setConfirmDelete} setConfirmPaused={setConfirmPaused} setPausedCode={setPausedCode} setConfirmLoading={setConfirmLoading}/>
            </Route>
            <Route exact path="/dashboard/settings">
              <Setting currentUserInfo={currentUserInfo} currentUser={props.currentUser} setConfirmLoading={setConfirmLoading} setConfirmPublish={setConfirmPublish}/>
            </Route>
            <Route path="/dashboard/newTournament">
              <CreateTournament setConfirmPublish={setConfirmPublish} setConfirmLoading={setConfirmLoading}/>
            </Route>
            <Route path="/dashboard/editTournament/:id">
              <Edit listTournaments={listTournaments} setConfirmLoading={setConfirmLoading} setConfirmPublish={setConfirmPublish}/>
            </Route>
          </Switch>
        </section>
      </main>
      {
      confirmDelete === true ?
      <div class="confirmDelete-listing">
        <div className="confirm-Delete-box loading-In-Animation">
          {!confirmLoading ? <>
          <div className="trash-icon-holder">
            <i class="bi bi-x-lg" onClick={(e) => setConfirmDelete(false) || setDeleteId('')}></i>
          </div>
          <h2>Are you sure to delete?</h2>
          <p className="delete-text">If you delete the item, you can't recover it.</p>
          <div className="button-clean">
            <Link className="button-hover" onClick={(e) => setConfirmDelete(false) || setDeleteId('')}>Cancle</Link>
            <Link className="urgent-red" onClick={(e) => deleteListing()}>Delete</Link>
          </div></> : <LoadingCircle/>}
        </div>
      </div> : false
    }
    {
      confirmPublish === true ?
      <div class="confirmDelete-listing">
        <div className="confirm-Delete-box loading-In-Animation center-items">
          {!confirmLoading ? <>
            <div className="trash-icon-holder">
              <i class="bi bi-x-lg" onClick={(e) => setConfirmPublish(false) || history.push("/dashboard/tournaments") }></i>
            </div>
            
            <h2>Tournament Created</h2>
            <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
            <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
            <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
            </svg>
            <p className="delete-text">You have successfully created the tournament. Would you like to publish it?</p>
            <div className="button-clean center-buttons">
              <Link className="button-hover" onClick={(e) => setConfirmPublish(false) || history.push("/dashboard/tournaments")}>Publish</Link>
            </div></> : 
          <LoadingCircle/>}
        </div>
      </div> : false
    }
    {
      confirmPaused === true ?
      <div class="confirmDelete-listing">
        <div className="confirm-Delete-box loading-In-Animation">
          {!confirmLoading ? <>
            <div className="trash-icon-holder">
              <i class="bi bi-x-lg" onClick={(e) => setConfirmPaused(false)}></i>
            </div>
            <h2>Tournament Update</h2>
            <p className="delete-text">Pausing the tournament will reset all check-ins. All players will have to check-in again when this tournament is unpaused. Are you sure you want to pause?</p>
            <div className="button-clean">
            <Link className="button-hover" onClick={(e) => setConfirmPaused(false)}>No</Link>
            <Link className="button-hover" onClick={(e) => setConfirmPublish(false) || pauseTournament()}>Yes</Link>
            </div></> : 
            <LoadingCircle/>
          }
        </div>
      </div> : false
    }
    {
      confirmLogout === true ?
      <div class="confirmDelete-listing">
        <div className="confirm-Delete-box loading-In-Animation center-items">
          {!confirmLoading ? <>
            <div className="trash-icon-holder">
              <i class="bi bi-x-lg" onClick={(e) => setConfirmLogout(false)}></i>
            </div>
            <h2>Are you sure?</h2>
            <i class="bi bi-door-open"></i>
            <p className="delete-text">Are you sure you want to logout?</p>
            <div className="button-clean center-buttons">
            <Link className="button-hover" onClick={(e) => setConfirmLogout(false)}>No</Link>
            <Link className="button-hover" onClick={(e) => setConfirmLoading(false) || props.logout()}>Yes</Link>
            </div></> : 
            <LoadingCircle/>
          }
        </div>
      </div> : false
    }
    </>
  )
}

export default Dashboard;