import React, {useEffect, useState} from "react";
import { Link, Switch, Route, useHistory} from "react-router-dom"; 
import moment from "moment";
import "./style/tournament.css";
import SingleTournament from "./Components/Single-Tournament";
import LoadingCircle from "../LoadingCircle";

const Tournaments = (props) => {
  const history = useHistory();

  const awaitCount = () => {
    let count = 0;
    props.listTournaments.forEach(element => {
      if(!element.Published)
        count++;
    });

    return count;
  }

  return (
    <div className="Tournament-page-list-container">
      <div className="top-info">
        <h2 className="title-page">Tournament</h2>
        <div className="right-side-title">
          <div className="input-with-search-icon">
            <input placeholder="Search" type="text"></input>
            <i class="bi bi-search"></i>
          </div>
          <button><i class="bi bi-three-dots-vertical"></i></button>
        </div>
      </div>
      <div className="table-container">
        
        {props.listTournaments.length > 0 ?
        <>
        <h2>{props.listTournaments.length} Tournaments ({awaitCount()} await processing)</h2>
        <table>
          <tr className="head-title">
            <th></th>
            <th>NAME</th>
            <th>GAME</th>
            <th>REGISTRATIONS</th>
            <th>ACCESS CODE</th>
            <th>REGISTRATION PERIOD</th>
            <th>TOURNAMENT START</th>
            <th>ACTIONS</th>
          </tr>
          {props.listTournaments.length > 0 ? props.listTournaments.map(item => (
            <SingleTournament key={item.Access_Code} tournament={item} setDeleteId={props.setDeleteId} setConfirmDelete={props.setConfirmDelete}/>
          )) : <LoadingCircle/>}
        </table></> : 
        <div className="tournament-no-info">
          <img src="https://tournaments-dot-game-tv-prod.appspot.com/dashboard/static/media/NoTournamentsPlaceholder.59afcebc.png" width="500"></img>
          <h3>Let’s create your first tournament</h3>
          <p>You haven't created any tournaments yet. Please click on New Tournament.</p>
          <button onClick={() => history.push("/dashboard/newTournament")}>New tournament</button>
        </div>  
        }
      </div>
      
    </div>
  )
}

export default Tournaments