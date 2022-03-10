import { useHistory } from "react-router-dom";
import LoadingCircle from "../../LoadingCircle";
import { useState, useEffect } from "react";

const StepOne = (props) => {
  const [selectedGame, setSelectedGame] = useState("");
  const history = useHistory();

  const selectGame = (game) => {
    window.scroll(0, 0);  

    props.setNewTournament(Prev => ({
      ...Prev, Game: game
    }));

    //;
    
  }

  return (
    <div className="loading-In-Animation">
      <h1>Create a New Tournament</h1>
      <h3>Start a new match and find a new winner.</h3>
      <div class="games-information">
        <div class="top-info">
          <div class="left-search-info">
            <i className="bi bi-search"></i>
            <input placeholder="Search Game" onChange={(e) => props.fetchGames(e.target.value)}/>
          </div>
          <div onClick={() => history.push("/dashboard/newTournament/team-info")}className={selectedGame.length > 0 ? "active-continue-button Filter" : "Filter"}>
            <h2>Continue</h2>
          </div>
        </div>
        <div class="game-list">
          <h3>CHOOSE GAME</h3>
          <ul>
            {props.gameList.length > 0 ? props.gameList.map(game => (
              <li onClick={() => selectGame(game)} className={selectedGame == game.name && "active-game-selected"} onClickCapture={() => setSelectedGame(game.name)}>
                <img src={game.image_url}></img>
                <h1>{game.name.length > 10 ? `${game.name[0]}${game.name[1]}${game.name[2]}${game.name[3]}${game.name[4]}${game.name[5]}${game.name[6]}${game.name[7]}${game.name[8]}${game.name[6]}...` : game.name}</h1>
              </li>
            )) : <LoadingCircle/>}
          </ul>
        </div>
      </div>
    </div>
   )
}

export default StepOne;