import "../style/tournament-details.css";

const Schedule = (props) => {
  return (
    <div className="schedule-list-container">
      <h2>Schedules</h2>
      <ul className="schedule-list">
        <li style={{backgroundImage: `url(${props.selectedTournament.Game.cover_url})`}}>
          <div className="top-info">
            <p>Mar 30, 2022 11:30 PM</p>
            <p>Lores of The Ring</p>
          </div>
        </li>
        <li>
        </li>
        <li>
        </li>

      </ul>
    </div>
  )
}

export default Schedule;