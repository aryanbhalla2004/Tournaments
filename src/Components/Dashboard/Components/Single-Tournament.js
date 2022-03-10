import React, {useEffect, useState} from "react";
import moment from "moment";
import { Link, Switch, Route, useHistory} from "react-router-dom"; 

const SingleTournament = (props) => {
  const history = useHistory();
  const [isCopied, setIsCopied] = useState(false);

  const copyTextToClipboard = async (text) =>  {
    if ('clipboard' in navigator) {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 1000);
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand('copy', true, text);
    }
  }

  return (
    <tr className="table-row">
      <td className="status">{props.tournament.Published ? <i class="bi color-blue bi-broadcast"></i> : <i class="bi bi-pause-circle"></i>}</td>
      <td className="name" onClick={() => history.push(`/dashboard/tournaments/${props.tournament.Access_Code}`)}>{props.tournament.Name}</td>
      <td>
        <div className="game-table-data">
          <img src={props.tournament.Game && props.tournament.Game.image_url}></img>
          <div>
            <h3>{props.tournament.Game && props.tournament.Game.name}</h3>
            <p>{props.tournament.gameMode}</p>
          </div>
        </div>
      </td>
      <td className="registration">
        <h4><span className="heavy-font-size">{props.tournament.Teams && props.tournament.Teams.length}</span>/{props.tournament.Max_Teams}</h4>
        <div className="progress-bar">
          <div className="progress-result" style={{width: `${(props.tournament.Teams && props.tournament.Teams.length/props.tournament.Max_Teams)*100}%` }}>
          </div>
        </div>
      </td>
      <td>
        <div className="secret-character">
          <div className="copy-info">
            <i class="bi bi-clipboard-check hover-copy-effect" onClick={() => copyTextToClipboard(props.tournament.Access_Code)}></i>
            <input value={props.tournament.Access_Code} type="text" readOnly></input>
          </div>
          <div className={!isCopied ? "copied-info" : "copied-info show-copied-info"}>
            <i class="bi bi-check-all"></i>
            <h3>Code Copied!</h3>
          </div>
        </div>
      </td>
      <td className="dates-in-table">
        <h3>{moment(`${props.tournament.Registering_start} ${props.tournament.Registering_start_time}`).format("MMMM DD, YYYY h:mm A")}</h3>
        <h3>{moment(`${props.tournament.Registering_end} ${props.tournament.Registering_end_time}`).format("MMMM DD, YYYY h:mm A")}</h3>
      </td>
      <td className="dates-in-table">
        <h3>{moment(`${props.tournament.Tournament_start} ${props.tournament.Tournament_start_time}`).format("MMMM DD, YYYY h:mm A")}</h3>
      </td>
      <td className="action-col">
        <button onClick={(e) => props.setConfirmDelete(true) || props.setDeleteId(props.tournament.Access_Code)}><i class="bi bi-trash"></i>Delete</button>
      </td>
    </tr>
  )
}

export default SingleTournament;