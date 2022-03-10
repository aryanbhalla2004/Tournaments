import { Link, useParams, useHistory} from "react-router-dom"; 
import moment from "moment";
import {db, firebase} from '../../util/firebase';
import LoadingCircle from "../LoadingCircle";
import { useState, useEffect } from "react";
import "../Dashboard/style/tournament.css";

const Edit = (props) => {
  const history = useHistory();
  const {id} = useParams();
  const [selectedTournament, setSelectedTournament] = useState({});

  useEffect(() => {
    const selectedItem = props.listTournaments.find(item => item.Access_Code === id);
    setSelectedTournament(selectedItem);
    
  }, [props.listTournaments]);

  const updateinfo = (e) => {
    setSelectedTournament(prev => ({
      ...prev, [e.target.name]: e.target.value
    }))
  }


  const updateButtonState = (value, location) => {
    if(location == "Tournaments_Format") {
      setSelectedTournament(prev => ({
        ...prev, Tournaments_Format: {style: "Brackets", type: value}
      }))
    } else {
      setSelectedTournament(prev => ({
        ...prev, [location]: value
      }))
    }
  }

  const enableButton = (e) => {
    setSelectedTournament(prev => ({
      ...prev, ["notStreaming"]: !e.target.checked
    }))
  }

  const updateTournament = async (e) => {
    e.preventDefault();
    props.setConfirmLoading(true);
    props.setConfirmPublish(true);
    try {
      await firebase.firestore().collection("Tournaments").doc(selectedTournament.Access_Code).set(selectedTournament);
      await firebase.firestore().collection('Tournaments').doc(selectedTournament.Access_Code).update({"lastEdit": moment().format("YYYY-MM-DD HH:MM:SS A")});
      await history.push(`/dashboard/tournaments/${selectedTournament.Access_Code}`);
      props.setConfirmLoading(false);
      props.setConfirmPublish(false);
    } catch(e) {
      console.log(e.message);
    }
   
  }

  return (
    <div class="new-tournament-page">
      <div className="loading-In-Animation">
        <h1>Edit Tournament <span className="light-style">({id})</span></h1>
        <p className="update-fix">Last Edited : {selectedTournament.lastEdit != "" ? selectedTournament.lastEdit : "N/A"}</p>
        <form className="team-info-des">
          <div className="item-container">
            <div className="item-label-info">
              <label>Tournament Name</label>
              <p>The name will be publised on the website for used to see.</p>
            </div>
            <div className="user-info-data">
              <div className="div-with-input">
                <i class="bi bi-trophy-fill"></i>
                <input placeholder="Tournament Name" className="input-field" value={selectedTournament.Name} name="Name" onChange={updateinfo} disabled></input>
              </div>
            </div>
          </div>
          <div className="item-container">
            <div className="item-label-info">
              <label>Tournament Platform</label>
              <p>The name will be publised on the website for used to see.</p>
              {selectedTournament.platform == "Web" ? 
              <div className="information-for-format">
                <p>The tournament will be managed remtely over a zoom/teams call.</p>
              </div> : <div className="information-for-format">
                <p>Enter the address of the building, where the tournament will take place.</p>
              </div>}
            </div>
            <div className="user-info-data">
              <div className="button-holders">
                <button type="button" className={selectedTournament.platform == "Web" ? "active-selected-button button-desgine" : "button-desgine"} onClick={() => updateButtonState("Web", "platform")}><i class="bi bi-globe"></i> Web</button>
                <button type="button" className={selectedTournament.platform == "In-person" ? "active-selected-button button-desgine" : "button-desgine"} onClick={() => updateButtonState("In-person", "platform")}><i class="bi bi-house-door-fill"></i> In Person</button>
              </div>
              {selectedTournament.platform == "In-person" && 
              <div className="user-info-data mg-top-20 ">
                <label className="labels-des">Location Information</label>
                <div className="div-with-input mg-top-10">
                  <i class="bi bi-geo-alt"></i>
                  <input placeholder="" className="input-field" name="Location" value={selectedTournament.Location} onChange={updateinfo}></input>
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
                    <input type="checkbox" id="temp" onChange={enableButton} checked={selectedTournament.notStreaming ? false : true}/>
                    <label for="temp"></label>
                  </div>
                </div>
                <div className="div-with-input mg-top-10">
                  <i class="bi bi-twitch">&nbsp;https://</i>
                  <input className="input-field" value={selectedTournament.streamingLink} name="streamingLink" onChange={updateinfo} disabled={selectedTournament.notStreaming ? true : false}></input>
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
                  <div className="input-field-with-words">
                    <input className="input-field" type="number" name="Min_Teams" value={selectedTournament.Min_Teams} onChange={updateinfo} disabled></input>
                    <h3>Teams</h3>
                  </div>
                </div>
                <div>
                  <label className="labels-des">Maximum Teams</label>
                  <div className="input-field-with-words">
                    <input className="input-field" type="number" name="Max_Teams" value={selectedTournament.Max_Teams} onChange={updateinfo} disabled></input>
                    <h3>Teams</h3>
                  </div>
                </div>
              </div>
              <div className="oneline-multiple-input">
                <div>
                  <label className="labels-des">Min Teams Members</label>
                  <div className="input-field-with-words">
                    <input className="input-field" type="number" name="MinPlayerInTeam" value={0} value={selectedTournament.MinPlayerInTeam} min="0" onChange={updateinfo} disabled></input>
                    <h3>Players</h3>
                  </div>
                </div>
                <div>
                  <label className="labels-des">Maximum Teams Members</label>
                  <div className="input-field-with-words">
                    <input className="input-field" type="number" name="MaxPlayerInTeam" value={0} value={selectedTournament.MaxPlayerInTeam} min="0" onChange={updateinfo} disabled></input>
                    <h3>Players</h3>
                  </div>
                </div>
              </div>
              <div className="user-info-data">
                <label className="labels-des">Game Mode</label>
                <div className="div-with-input">
                <i class="bi bi-controller"></i>
                  <input placeholder="" className="input-field" value={selectedTournament.gameMode} name="gameMode" onChange={updateinfo}></input>
                </div>
              </div>
            </div>
          </div>
          <div className="item-container">
            <div className="item-label-info">
              <label>Tournament Format</label>
              <p>Select the bracket format for the tournament map.</p>
              {selectedTournament.Tournaments_Format && selectedTournament.Tournaments_Format.type == "Single" ? 
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
                <button type="button" className={selectedTournament.Tournaments_Format && selectedTournament.Tournaments_Format.type == "Single" ? "active-selected-button button-desgine" : "button-desgine"} onClick={() => updateButtonState("Single", "Tournaments_Format")}><i class="bi bi-person-fill"></i> Single Elimination</button>
                <button type="button" className={selectedTournament.Tournaments_Format && selectedTournament.Tournaments_Format.type == "Double" ? "active-selected-button button-desgine" : "button-desgine"} onClick={() => updateButtonState("Double", "Tournaments_Format")}><i class="bi bi-people-fill"></i> Double Elimination</button>
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
                  <input className="input-field" type="date" min={moment().format('YYYY-MM-DD')} value={selectedTournament.Registering_start} name="Registering_start" onChange={updateinfo}></input>
                  <input className="input-field" type="Time" name="Registering_start_time" value={selectedTournament.Registering_start_time} onChange={updateinfo}></input>
                </div>
              </div>
              <div className="text-area-info">
                <label className="labels-des">Registration End</label>
                <div>
                  <input className="input-field" type="date" min={selectedTournament.Registering_start} value={selectedTournament.Registering_end} name="Registering_end" onChange={updateinfo}></input>
                  <input className="input-field" type="Time" name="Registering_end_time" value={selectedTournament.Registering_start_time} onChange={updateinfo}></input>
                </div>
              </div>
              <div className="text-area-info">
                <label className="labels-des">Tournament Start</label>
                <div>
                  <input className="input-field" type="date" min={selectedTournament.Registering_end} value={selectedTournament.Tournament_start} name="Tournament_start" onChange={updateinfo}></input>
                  <input className="input-field" type="Time" name="Tournament_start_time" value={selectedTournament.Tournament_start_time} onChange={updateinfo}></input>
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
                <textarea rows="7" value={selectedTournament.Description} name="Description" onChange={updateinfo} className="textarea-output"></textarea>
              </div>
              <div className="text-area-info">
                <label className="labels-des">Rules</label>
                <textarea rows="5" value={selectedTournament.Rules} name="Rules" onChange={updateinfo} className="textarea-output"></textarea>
              </div>
              <div className="text-area-info">
                <label className="labels-des">Prizes</label>
                <textarea rows="2" value={selectedTournament.Prizes} name="Prizes" onChange={updateinfo} className="textarea-output"></textarea>
              </div>
            </div>
          </div>
          <div className="submit-information">
            <div className="error-messages">
            {/* {!props.loading ? props.errorMessage : <LoadingCircle height="35px" size="30" border="3px solid #fff" color="#060818 transparent transparent transparent"/>} */}
            </div>
            <button onClick={updateTournament}>Update</button>
          </div>
        </form>
      </div>
      </div>
  )
}

export default Edit;