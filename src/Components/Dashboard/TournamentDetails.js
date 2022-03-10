import { Link, useParams, useHistory} from "react-router-dom"; 
import { useState, useEffect } from "react";
import "./style/tournament-details.css";
import {firebase} from "../../util/firebase";
import Details from "./Components/Details";
import Teams from "./Components/Teams";
import Brackets from "./Components/Brackets";
import Schedule from "./Components/Schedule";

const TournamentDetails = (props) => {
  const history = useHistory();
  const {id} = useParams();
  const [selectedTournament, setSelectedTournament] = useState({});

  useEffect(() => {
    const selectedItem = props.listTournaments.find(item => item.Access_Code === id);
    setSelectedTournament(selectedItem);
  }, [props.listTournaments]);

  const changeTournamentStatus = async () => {
    if(!selectedTournament.Published) {
      props.setConfirmLoading(true);
      props.setConfirmPaused(true);
  
      try {
        await firebase.firestore().collection('Tournaments').doc(selectedTournament.Access_Code).update({"Published": true});
      } catch (e) {
        console.log(e);
      }

      props.setConfirmPaused(false);
      props.setConfirmLoading(false);

    } else {
      props.setConfirmPaused(true);
      props.setPausedCode(selectedTournament.Access_Code);
    }
  }

  const [activeButton, setActiveButton] = useState("Details");
  return (
    <div className="Tournament-page-list-container">
      <div className="top-info">
        <div>
          <h2 className="title-page">{selectedTournament && selectedTournament.Name}</h2>
          <div className="below-title">
            <h4 className="status">{selectedTournament.Published ? "Live" : "Paused"} - </h4>
            <h4> Created by <b>Organizer</b></h4>
          </div>
        </div>
        <div className="right-side-title-tournament-details">
          <button>
            <i class="bi bi-three-dots-vertical"></i>
            <ul className="options">
              <li onClick={(e) => history.push(`/dashboard/editTournament/${selectedTournament.Access_Code}`)}><i class="bi bi-pencil-square"></i>&nbsp;Edit</li>
              <li onClick={(e) => props.setConfirmDelete(true) || props.setDeleteId(selectedTournament.Access_Code)} ><i class="bi bi-trash"></i>&nbsp;Delete</li>
            </ul>
          </button>
          <button onClick={() => changeTournamentStatus()}>{selectedTournament.Published ? "Pause" : "Publish"}</button>
        </div>
      </div>
      <ul className="link-tournament-detail">
        <li><Link className={activeButton == "Details" && "active-button"} onClick={() => setActiveButton("Details")}>Details</Link></li>
        <li><Link className={activeButton == "Teams" && "active-button"} onClick={() => setActiveButton("Teams")}>Teams</Link></li>
        <li><Link className={activeButton == "Brackets" && "active-button"} onClick={() => setActiveButton("Brackets")}>Brackets</Link></li>
        <li><Link className={activeButton == "Schedule" && "active-button"} onClick={() => setActiveButton("Schedule")}>Schedule</Link></li>
        <li><Link className={activeButton == "Broadcast" && "active-button"} onClick={() => setActiveButton("Broadcast")}>Broadcast</Link></li>
      </ul>
      {activeButton == "Details" && <Details selectedTournament={selectedTournament}/>}
      {activeButton == "Teams" && <Teams selectedTournament={selectedTournament}/>}
      {activeButton == "Brackets" && <Brackets/>}
      {activeButton == "Schedule" && <Schedule selectedTournament={selectedTournament}/>}
    </div>
  )
}

export default TournamentDetails;