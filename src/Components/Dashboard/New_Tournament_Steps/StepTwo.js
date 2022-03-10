import moment from "moment";
import { useState, useEffect } from "react";
import LoadingCircle from "../../LoadingCircle";

const StepTwo = (props) => {
  // useEffect(() => {
  //   var myDiv = document.getElementsByClassName("main-content");
  //   var myDiv2 = document.getElementsByClassName("new-tournament-page");
  //   console.log(myDiv);
  //   console.log(myDiv2);
  //   myDiv.scrollHeight = 0;
  //   myDiv2.scrollHeight = 0;
  // }, []);


  const updateinfo = (e) => {
    props.setNewTournament(prev => ({
      ...prev, [e.target.name]: e.target.value
    }))
  }

  const updateButtonState = (value, location) => {
    if(location == "Tournaments_Format") {
      props.setNewTournament(prev => ({
        ...prev, Tournaments_Format: {style: "Brackets", type: value}
      }))
    } else {
      props.setNewTournament(prev => ({
        ...prev, [location]: value
      }))
    }
  }

  const enableButton = (e) => {
    props.setNewTournament(prev => ({
      ...prev, ["notStreaming"]: !e.target.checked
    }))
  }

  return (
    <div className="loading-In-Animation">
      <h1>Customizing the Tournament</h1>
      <form className="team-info-des">
        <div className="item-container">
          <div className="item-label-info">
            <label>Tournament Name</label>
            <p>The name will be publised on the website for used to see.</p>
          </div>
          <div className="user-info-data">
            <div className={props.error == "Name" ? "error-field div-with-input" : "div-with-input"}>
              <i class="bi bi-trophy-fill"></i>
              <input placeholder="Tournament Name" className="input-field" value={props.newTournament.Name} name="Name" onChange={updateinfo}></input>
            </div>
          </div>
        </div>
        <div className="item-container">
          <div className="item-label-info">
            <label>Tournament Platform</label>
            <p>The name will be publised on the website for used to see.</p>
            {props.newTournament.platform == "Web" ? 
            <div className="information-for-format">
              <p>The tournament will be managed remtely over a zoom/teams call.</p>
            </div> : <div className="information-for-format">
              <p>Enter the address of the building, where the tournament will take place.</p>
            </div>}
          </div>
          <div className="user-info-data">
            <div className="button-holders">
              <button type="button" className={props.newTournament.platform == "Web" ? "active-selected-button button-desgine" : "button-desgine"} onClick={() => updateButtonState("Web", "platform")}><i class="bi bi-globe"></i> Web</button>
              <button type="button" className={props.newTournament.platform == "In-person" ? "active-selected-button button-desgine" : "button-desgine"} onClick={() => updateButtonState("In-person", "platform")}><i class="bi bi-house-door-fill"></i> In Person</button>
            </div>
            {props.newTournament.platform == "In-person" && 
            <div className="user-info-data mg-top-20 ">
              <label className="labels-des">Location Information</label>
              <div className={props.error == "Location" ? "error-field div-with-input mg-top-10" : "div-with-input mg-top-10"}>
                <i class="bi bi-geo-alt"></i>
                <input placeholder="" className="input-field" name="Location" value={props.newTournament.Location} onChange={updateinfo}></input>
              </div>
            </div>
            }
          </div>
        </div>
        <div className="item-container">
          <div className="item-label-info">
            <label>Streaming Tournament</label>
            <p>Enter the live streaming link for the tournament from twitch, youtube etc.</p>
          </div>
          <div className="user-info-data">
            <div className="steam-link-button">
              <div className="information-stream-button-holder">
                <label className="labels-des">Steam Link</label>
                <div class="toggle">
                  <input type="checkbox" id="temp" onChange={enableButton}/>
                  <label for="temp"></label>
                </div>
              </div>
              <div className={props.error == "Steam" ? "error-field div-with-input mg-top-10" : "input-field-stream-link"}>
                <i class="bi bi-twitch">&nbsp;https://</i>
                <input className="input-field" value={props.newTournament.streamingLink} name="streamingLink" onChange={updateinfo} disabled={props.newTournament.notStreaming}></input>
              </div>
            </div>
          </div>
        </div>
        <div className="item-container">
          <div className="item-label-info">
            <label>Tournament Game Type</label>
            <p>The name will be publised on the website for used to see.</p>
          </div>
          <div className="user-info-data">
            <div className="oneline-multiple-input">
              <div>
                <label className="labels-des">Mininum Teams</label>
                <div className={props.error == "Min_Teams" ? "error-field input-field-with-words" : "input-field-with-words"}>
                  <input className="input-field" type="number" name="Min_Teams" onChange={updateinfo}></input>
                  <h3>Teams</h3>
                </div>
              </div>
              <div>
                <label className="labels-des">Maximum Teams</label>
                <div className={props.error == "Max_Teams" ? "error-field input-field-with-words" : "input-field-with-words"}>
                  <input className="input-field" type="number" name="Max_Teams" onChange={updateinfo}></input>
                  <h3>Teams</h3>
                </div>
              </div>
              
            </div>
            <div className="oneline-multiple-input">
              <div>
                <label className="labels-des">Min Teams Members</label>
                <div className={props.error == "MinPlayerInTeam" ? "error-field input-field-with-words" : "input-field-with-words"}>
                  <input className="input-field" type="number" name="MinPlayerInTeam" value={0} value={props.MinPlayerInTeam} min="0" onChange={updateinfo}></input>
                  <h3>Players</h3>
                </div>
              </div>
              <div>
                <label className="labels-des">Maximum Teams Members</label>
                <div className={props.error == "MaxPlayerInTeam" ? "error-field input-field-with-words" : "input-field-with-words"}>
                  <input className="input-field" type="number" name="MaxPlayerInTeam" value={0} value={props.MaxPlayerInTeam} min="0" onChange={updateinfo}></input>
                  <h3>Players</h3>
                </div>
              </div>
            </div>
            <div className="user-info-data">
              <label className="labels-des">Game Mode</label>
              <div className="div-with-input">
              <i class="bi bi-controller"></i>
                <input placeholder="" className="input-field" name="gameMode" onChange={updateinfo}></input>
              </div>
            </div>
          </div>
        </div>
        <div className="item-container">
          <div className="item-label-info">
            <label>Tournament Format</label>
            <p>Select the bracket format for the tournament map.</p>
            {props.newTournament.Tournaments_Format.type == "Single" ? 
            <div className="information-for-format">
              <p><u><i>Single elimination:</i></u> Teams get knocked out of the tournament on losing a match.</p>
            </div> : <div className="information-for-format">
              <p><u><i>Double elimination:</i></u> Each participant plays against another and the winner is the one with the most wins.</p>
            </div>}
          </div>
          <div className="user-info-data">
            <label className="labels-des">Style</label>
            <div className="button-holders">
              <button type="button" className="active-selected-button button-desgine"><i class="bi bi-bar-chart-steps"></i> Brackets</button>
            </div>
            <label className="labels-des">Type</label>
            <div className="button-holders">
              <button type="button" className={props.newTournament.Tournaments_Format.type == "Single" ? "active-selected-button button-desgine" : "button-desgine"} onClick={() => updateButtonState("Single", "Tournaments_Format")}><i class="bi bi-person-fill"></i> Single Elimination</button>
              <button type="button" className={props.newTournament.Tournaments_Format.type == "Double" ? "active-selected-button button-desgine" : "button-desgine"} onClick={() => updateButtonState("Double", "Tournaments_Format")}><i class="bi bi-people-fill"></i> Double Elimination</button>
            </div>
          </div>
        </div>
        <div className="item-container">
          <div className="item-label-info">
            <label>Tournament Schedule</label>
            <p>Make it easier for the players, set up a Schedule.</p>
          </div>
          <div className="user-info-data">
            <div className="text-area-info">
              <label className="labels-des">Registration Start</label>
              <div>
                <input className={props.error == "Registering_start" ? "error-field input-field" : "input-field"} type="date" min={moment().format('YYYY-MM-DD')} value={props.newTournament.Registering_start} name="Registering_start" onChange={updateinfo}></input>
                <input className={props.error == "Registering_start_time" ? "error-field input-field" : "input-field"} type="Time" name="Registering_start_time" onChange={updateinfo}></input>
              </div>
            </div>
            <div className="text-area-info">
              <label className="labels-des">Registration End</label>
              <div>
                <input className={props.error == "Registering_end" ? "error-field input-field" : "input-field"} type="date" min={props.newTournament.Registering_start} name="Registering_end" onChange={updateinfo}></input>
                <input className={props.error == "Registering_end_time" ? "error-field input-field" : "input-field"} type="Time" name="Registering_end_time" onChange={updateinfo}></input>
              </div>
            </div>
            <div className="text-area-info">
              <label className="labels-des">Tournament Start</label>
              <div>
                <input className={props.error == "Tournament_start" ? "error-field input-field" : "input-field"} type="date" min={props.newTournament.Registering_end} name="Tournament_start" onChange={updateinfo}></input>
                <input className={props.error == "Tournament_start_time" ? "error-field input-field" : "input-field"} type="Time" name="Tournament_start_time" onChange={updateinfo}></input>
              </div>
            </div>
          </div>
        </div>
        <div className="item-container">
          <div className="item-label-info">
            <label>Tournament Details</label>
            <p>The following information will be displaced on the tournament page.</p>
          </div>
          <div className="user-info-data">
            <div className="text-area-info">
              <label className="labels-des">Description</label>
              <textarea rows="7" value={props.newTournament.Description} name="Description" onChange={updateinfo} className={props.error == "Description" ? "error-field textarea-output" : "textarea-output"}></textarea>
            </div>
            <div className="text-area-info">
              <label className="labels-des">Rules</label>
              <textarea rows="5" value={props.newTournament.Rules} name="Rules" onChange={updateinfo} className={props.error == "Rules" ? "error-field textarea-output" : "textarea-output"}></textarea>
            </div>
            <div className="text-area-info">
              <label className="labels-des">Prizes</label>
              <textarea rows="2" value={props.newTournament.Prizes} name="Prizes" onChange={updateinfo} className={props.error == "Prizes" ? "error-field textarea-output" : "textarea-output"}></textarea>
            </div>
          </div>
        </div>
        <div className="submit-information">
          
          <div className="error-messages">
          {!props.loading ? props.errorMessage : <LoadingCircle height="35px" size="30" border="3px solid #fff" color="#060818 transparent transparent transparent"/>}
          </div>
          <button onClick={props.onSubmitForm}>Finish</button>
        </div>
      </form>
    </div>
  )
}

export default StepTwo