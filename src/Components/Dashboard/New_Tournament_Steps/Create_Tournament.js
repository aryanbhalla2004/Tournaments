import { useState, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import {auth, firebase} from '../../../util/firebase';
import moment from "moment";
import StepOne from "./StepOne";
import "./style/tournament.css";
import StepTwo from "./StepTwo";


const CreateTournament = (props) => {
  const history = useHistory();
  const [gameList, setGameList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const uid = () => {
    const head = Date.now().toString(36);
    const tail = Math.random().toString(36).substring(2);
    return head + tail;
  }

  const [newTournament, setNewTournament] = useState({
    player_input_fields: [],
    Game: {},
    Name: "Aryan's {game_name} tournament {start_time}",
    platform: "Web",
    MaxPlayerInTeam: 0,
    Max_Teams: 0,
    Min_Teams: 0,
    MinPlayerInTeam: 0,
    Description: "",
    notStreaming: true,
    Location: "",
    streamingLink: "",
    gameMode: "",
    Registering_start: "",
    Registering_end: "",
    Published: true,
    Tournament_start: "",
    Registering_start_time: "",
    Registering_end_time: "",
    Tournament_start_time: "",
    Teams: [],
    Access_Code: uid().toUpperCase( ),
    Tournaments_Format: {style: "Brackets", type: "Single"},
    CreatedDate: moment().format('YYYY MMMM DD HH:MM:SS'),
    Prizes: "Please contact server admin",
    Rules: `1. Please be respectful to your host and other participants. If any malicious behavior is reported, you will be removed from the tournament.
2. Please be on time for your registration and for the actual tournament. You (and your team) will be disqualified on no-show. 
3. You and all of your teammates must be registered to qualify for the event. 
4. You can play in this tournament only if your registered and in-game names match, otherwise you will be disqualified.`,
    
  });

  const fetchGames = async (value) => {
    if(value != null) {
      let response = await fetch(`https://tournaments-prod.game.tv/elastic/game/v2/search?lang=en&client=web&installed_apps=&token=5991a980-c3a5-423d-9aa8-d67718d84c1a&user_id=5c2cdf38be9144c58b354ced44e6cae8&from=0&query=${value}&platforms=&size=100&approved_only=true&user_geo=ca`);
      let data = await response.json();
      setGameList(data.data);
    }
  }
  
  const onSubmitForm = async (e) => {
    e.preventDefault();
    setError("");
    setErrorMessage("");
    setLoading(true);
    if(newTournament.Name !== "") {
      if((newTournament.platform === "In-person" && newTournament.Location !== "") || newTournament.platform === "Web") {
        if(!newTournament.notStreaming && newTournament.streamingLink !== "" || newTournament.notStreaming === true) {
          if(newTournament.Max_Teams > 0 && newTournament.Min_Teams >0 && newTournament.MinPlayerInTeam > 0 && newTournament.MaxPlayerInTeam > 0) {
            if(newTournament.gameMode !== "") {
              if(newTournament.Registering_start != "" && newTournament.Registering_end != "" && newTournament.Tournament_start != "" ) {
                if(newTournament.Description != ""){
                  if(newTournament.Rules != "") {
                    if(newTournament.Prizes != "") {
                      if(newTournament.Registering_start_time != "" && newTournament.Registering_end_time && newTournament.Tournament_start_time != "") {
                        setLoading(false);
                        props.setConfirmPublish(true);
                        props.setConfirmLoading(true);
                        setTimeout(() => {
                          props.setConfirmLoading(false);
                        }, 2000);
                     
                      
                        const name = newTournament.Name.split(" ");
                        const gameNameIndex = name.indexOf("{game_name}");
                        const timeIndex = name.indexOf("{start_time}");
                        if(gameNameIndex != -1) {
                          name[gameNameIndex] = newTournament.Game.name;
                        } 
                        if(timeIndex != -1) {
                          name[timeIndex] = newTournament.Tournament_start;
                        }
                        newTournament.Name = name.join(" ");

                        try {
                          firebase.firestore().collection("Tournaments").doc(newTournament.Access_Code).set(newTournament);
                        } catch(e) {
                          console.log(e);
                        }
                      } else {
                        if(newTournament.Registering_start_time === "") {
                          setErrorMessage("Registration start time in invalid");
                          setError("Registering_start_time");
                          setLoading(false);
                        } else {
                          if(newTournament.Registering_end_time === "") {
                            setErrorMessage("Registration end time in invalid");
                            setError("Registering_end_time");
                            setLoading(false);
                          } else {
                            if(newTournament.Tournament_start_time === "") {
                              setErrorMessage("Tournament start time in invalid");
                              setError("Tournament_start_time");
                              setLoading(false);
                            }
                          }
                        }
                      }
                    } else {
                      setErrorMessage("Prizes field is invalid");
                      setError("Prizes");
                      setLoading(false);
                    }
                  } else {
                    setErrorMessage("Rules field is invalid");
                    setError("Rules");
                    setLoading(false);
                  }
                } else {
                  setErrorMessage("Description field is invalid");
                  setError("Description");
                  setLoading(false);
                }
                
              } else {
                if(newTournament.Registering_start === "") {
                  setErrorMessage("Registration Start date in invalid");
                  setError("Registering_start");
                  setLoading(false);
                } else {
                  if(newTournament.Registering_end === "") {
                    setErrorMessage("Registration End date in invalid");
                    setError("Registering_end");
                    setLoading(false);
                  } else {
                    if(newTournament.Tournament_start === "") {
                      setErrorMessage("Tournament Start date in invalid");
                      setError("Tournament_start");
                      setLoading(false);
                    }
                  }
                }
              }
            } else {
              setErrorMessage("Game mode is empty");
              setError("Game-Mode");
              setLoading(false);
            }
            console.log("test");
          } else {
            console.log("test");
            if(newTournament.Min_Teams <= 0) {
              setErrorMessage("Minimum Teams input is invalid");
              setError("Min_Teams");
              setLoading(false);
            } else {
              if(newTournament.Max_Teams <= 0) {
                setErrorMessage("Maximum Teams input is invalid");
                setError("Max_Teams");
                setLoading(false);
              } else {
                if(newTournament.MinPlayerInTeam <= 0) {
                  setErrorMessage("Minimum Teams Members input is invalid");
                  setError("MinPlayerInTeam");
                  setLoading(false);
                } else {
                  if(newTournament.MaxPlayerInTeam <= 0) {
                    setErrorMessage("Maximum Teams Members input is invalid");
                    setError("MaxPlayerInTeam");
                    setLoading(false);
                  }
                }
              }
            }
          }
        } else {
          setErrorMessage("Please enter the Steam link");
          setError("Steam");
          setLoading(false);
        }
      } else {
        setErrorMessage("Please enter the location");
        setError("Location");
        setLoading(false);
      }
    } else {
      setErrorMessage("Tournament name field is empty");
      setError("Name");
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchGames("");
  }, []);

  return (
    <>
      <div class="new-tournament-page">
        <Switch>
          <Route exact path="/dashboard/newTournament">
            <StepOne newTournament={newTournament} setNewTournament={setNewTournament} gameList={gameList} setGameList={setGameList} fetchGames={fetchGames}/>
          </Route>
          <Route exact path="/dashboard/newTournament/team-info">
            <StepTwo newTournament={newTournament} setNewTournament={setNewTournament} onSubmitForm={onSubmitForm} errorMessage={errorMessage} error={error} loading={loading}/>
          </Route>
        </Switch>
      </div>
    </>
  )
}

export default CreateTournament;