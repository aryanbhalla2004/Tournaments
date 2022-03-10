import moment from "moment";
import { Link } from "react-router-dom";
const Details = (props) => {
  return (
    <div className="container-details-tournament">
      <h2>Updated Results</h2>
      <div className="information-box">
        <div className="top-info-progress">
          <span className="field-card-name-first">Total Teams Joined</span>
          <span className="field-card-value-first">{props.selectedTournament.Teams && props.selectedTournament.Teams.length}/{props.selectedTournament.Max_Teams && props.selectedTournament.Max_Teams}</span>
        </div>
        <div className="progress-bar-holder">
          <div className="progress-data" style={{width: `${(props.selectedTournament.Teams && props.selectedTournament.Teams.length/props.selectedTournament.Max_Teams)*100}%`}}></div>
        </div>
        <span className="field-card-name-first">{props.selectedTournament.Min_Teams && props.selectedTournament.Min_Teams} Teams are Require to Start the Tournament</span>
      </div>
      <h2>General Information</h2>
      <div className="information-box">
        <div className="column-data">
          <h3>Tournament channel</h3>
          <div className="row-data">
            <div className="item-information">
              <span className="field-card-name">Platform</span>
              <span className="field-card-value">{props.selectedTournament.platform}</span>
            </div>
            {props.selectedTournament.platform === "In-person" && 
            <div className="item-information">
              <span className="field-card-name">Address</span>
              <span className="field-card-value">{props.selectedTournament.Location}</span>
            </div>}
          </div>
        </div>
        <div className="divider"></div>
        <div className="column-data">
          <h3>Game</h3>
          <div className="row-data">
            <div className="item-information">
              <span className="field-card-name">GAME NAME</span>
              <span className="field-card-value">{props.selectedTournament.Game && props.selectedTournament.Game.name}</span>
            </div>
            <div className="item-information">
              <span className="field-card-name">GAME MODE</span>
              <span className="field-card-value">{props.selectedTournament.gameMode}</span>
            </div>
          </div>
        </div>
        <div className="divider"></div>
        <div className="column-data">
          <h3>Schedule</h3>
          <div className="row-data">
            <div className="item-information">
              <span className="field-card-name">REGISTRATION PERIOD</span>
              <span className="field-card-value">{moment(`${props.selectedTournament && props.selectedTournament.Registering_start} ${props.selectedTournament && props.selectedTournament.Registering_start_time}`).format("MMMM, DD YYYY h:mm A")} - {moment(`${props.selectedTournament && props.selectedTournament.Registering_end} ${props.selectedTournament && props.selectedTournament.Registering_end_time}`).format("MMMM, DD YYYY h:mm A")}</span>
            </div>
            <div className="item-information">
              <span className="field-card-name">TOURNAMENT START</span>
              <span className="field-card-value">{moment(`${props.selectedTournament && props.selectedTournament.Tournament_start} ${props.selectedTournament && props.selectedTournament.Tournament_start_time}`).format("MMMM, DD YYYY h:mm A")}</span>
            </div>
          </div>
        </div>
        <div className="divider"></div>
        <div className="column-data">
          <h3>Registration Access</h3>
          <div className="row-data">
            <div className="item-information">
              <span className="field-card-name">Access Code</span>
              <span className="field-card-value">{props.selectedTournament.Access_Code} <i class="bi bi-clipboard-check copy-button"></i></span>
            </div>
          </div>
        </div>
        {!props.selectedTournament.notStreaming && <>
        <div className="divider"></div>
        <div className="column-data">
          <h3>Streaming</h3>
          <div className="row-data">
            <div className="item-information">
              <span className="field-card-name">Twitch Link</span>
              <Link><span className="field-card-value">{props.selectedTournament.streamingLink}</span></Link>
            </div>
          </div>
        </div></>}
      </div>
      <h2>Details</h2>
      <div className="information-box">
        <div className="column-data">
          <h3>Tournament details</h3>
          <div className="row-data">
            <div className="item-information width-100-fix">
              <span className="field-card-name">DESCRIPTION</span>
              <span className="field-card-value">
                {
                  props.selectedTournament.Description != "" ?
                  props.selectedTournament.Description && props.selectedTournament.Description.split("\n").map(item => (
                  <p>{item}</p>
                  )) 
                  : "This field was left empty"
                }
              </span>
              <span className="field-card-name mt-10">RULES</span>
              <span className="field-card-value">
                {
                  props.selectedTournament.Rules != "" ?
                    props.selectedTournament.Rules && props.selectedTournament.Rules.split("\n").map(item => (
                    <p>{item}</p>
                    )) 
                    : 
                  "This field was left empty"
                }
              </span>
              <span className="field-card-name mt-10">PRIZES</span>
              <span className="field-card-value">
                {
                  props.selectedTournament.Prizes != "" ?
                  props.selectedTournament.Prizes && props.selectedTournament.Prizes.split("\n").map(item => (
                    <p>{item}</p>
                  ))
                  : "This field was left empty"
                }
              </span>
            </div>
          </div>
        </div>
      </div>
      <h2>Tournament Settings</h2>
      <div className="information-box">
        <div className="column-data">
          <h3>Tournament style</h3>
          <div className="row-data">
            <div className="item-information">
              <span className="field-card-name">Type</span>
              <span className="field-card-value">{props.selectedTournament.Tournaments_Format && props.selectedTournament.Tournaments_Format.style}</span>
            </div>
            <div className="item-information">
              <span className="field-card-name">Formate</span>
              <span className="field-card-value">{props.selectedTournament.Tournaments_Format && props.selectedTournament.Tournaments_Format.type}</span>
            </div>
          </div>
        </div>
        <div className="divider"></div>
        <div className="column-data">
          <h3>Team count</h3>
          <div className="row-data">
            <div className="item-information">
              <span className="field-card-name">Minimum Teams</span>
              <span className="field-card-value">{props.selectedTournament && props.selectedTournament.Min_Teams}</span>
            </div>
            <div className="item-information">
              <span className="field-card-name">Maximum Teams</span>
              <span className="field-card-value">{props.selectedTournament && props.selectedTournament.Max_Teams}</span>
            </div>
          </div>
          <h3></h3>
          <div className="row-data">
            <div className="item-information">
              <span className="field-card-name">Minimum Team Members</span>
              <span className="field-card-value">{props.selectedTournament && props.selectedTournament.MinPlayerInTeam}</span>
            </div>
            <div className="item-information">
              <span className="field-card-name">Maximum Team Members</span>
              <span className="field-card-value">{props.selectedTournament && props.selectedTournament.MaxPlayerInTeam}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Details