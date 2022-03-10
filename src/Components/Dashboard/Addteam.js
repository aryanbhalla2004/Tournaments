import React, {useEffect, useState} from "react";
import { Link, Switch, Route } from "react-router-dom";
const AddTeam = (props) => {
  const [error, setError] = useState('');
  const [player, setPlayer] = useState({name: "", schoolNamePlayer: "", position: "", GamerTag: "", email: ""});
  const [players, setPlayers] = useState([]);
  const [TeamInfo, setTeamInfo] = useState({
    teamName: "",
    schoolName: "", 
    division: "", 
    totalWins: 0, 
    totalLoss: 0, 
    totalDraw: 0, 
    gameName: "",
  });

  const updateUserInput = (e) => {
    setError('');
    setTeamInfo(prevInput => ({
      ...prevInput, [e.target.name]: e.target.value
    }));
  }


  const RemovePlayer = (playerLocal) => {
    let removeTag = players.filter((player, index) => index !== playerLocal);
    setPlayers([...removeTag]);
  }
  
  const updateUserInputPlayer = (e, indexi) => {
    var itemBefore = players.filter((item, index) => index < indexi);
    var itemAfter = players.filter((item, index) => index > indexi);
    setPlayers([...itemBefore, {...players[indexi], [e.target.name]: e.target.value}, ...itemAfter]);
  }

  const addTeam = async (e) => {
    e.preventDefault();
    // for validation needed;
    props.setTeamList(prevInput => ([
      ...prevInput, {...TeamInfo, players: players}
    ]))
  }

  return (
    <form onSubmit={addTeam}>
      <h3>Team Info</h3>
      <input placeholder="Team Name" name="teamName" onChange={updateUserInput} value={TeamInfo.teamName}></input>
      <input placeholder="School Name" name="schoolName" onChange={updateUserInput} value={TeamInfo.schoolName}></input>
      <input placeholder="Division" name="division" onChange={updateUserInput} value={TeamInfo.division}></input>
      <input placeholder="Games" name="gameName" onChange={updateUserInput} value={TeamInfo.gameName}></input>
      <hr></hr>
      {players.map((play, index) => (
        <div className="Players information">
          <h3>Player Info {index + 1} <button type="button" onClick={() => RemovePlayer(index)}>X</button></h3>
          <input placeholder="Player Name" name="name" value={play.name} onChange={(e) => updateUserInputPlayer(e, index)}></input>
          <input placeholder="Position" name="position"value={play.position} onChange={(e) => updateUserInputPlayer(e, index)}></input>
          <input placeholder="Gamer Tag" name="GamerTag"value={play.GamerTag} onChange={(e) => updateUserInputPlayer(e, index)}></input>
          <input placeholder="Email" name="email"value={play.email} onChange={(e) => updateUserInputPlayer(e, index)}></input>
        </div>
      ))}
      
      <button>Add Teams</button>
      <button onClick={() => setPlayers(oldArray => [...oldArray, player])} type="button">Add More Players</button>
      <Link to="/dashboard/teams">Back</Link>
    </form>
  )
}

export default AddTeam;