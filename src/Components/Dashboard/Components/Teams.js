import "../style/tournament-details.css";

const Teams = (props) => {
  return (
    <>
    {props.selectedTournament.Teams.length > 0 ?
    <>
    <table className="players-table">
      <tr className="main-header">
        <th>#</th>
        <th>TEAMS (3/32)</th>
        <th>PLAYERS (8/120)</th>
        <th>SCHOOL</th>
        <th>DIVISION</th>
        <th>REGISTRATION DATE</th>
        <th>STATUS</th>
        <th>ACTION</th>
      </tr>
      {/* <tr className="data-table-teams">
        <td>01</td>
        <td>The Fire Fighters</td>
        <td>4/4</td>
        <td>Vincent Massy</td>
        <td>Pembina Trails</td>
        <td>Dec 30, 2021 4:10 PM</td>
        <td>Registered</td>
        <td className="action-button-table"><i class="bi bi-trash"></i></td>
      </tr>
      <tr className="data-table-teams">
        <td>02</td>
        <td>The Street Fighter</td>
        <td>3/4</td>
        <td>Vincent Massy</td>
        <td>Pembina Trails</td>
        <td>Dec 30, 2021 4:10 PM</td>
        <td>Registered</td>
        <td className="action-button-table"><i class="bi bi-trash"></i></td>
      </tr>
      <tr className="data-table-teams">
        <td>03</td>
        <td>Lucifer'ss</td>
        <td>1/4</td>
        <td>Vincent Massy</td>
        <td>Pembina Trails</td>
        <td>Dec 30, 2021 4:10 PM</td>
        <td>Registered</td>
        <td className="action-button-table"><i class="bi bi-trash"></i></td>
      </tr> */}
    </table>
    </> :
    <div className="no-members">
      <img src="https://tournaments-dot-game-tv-prod.appspot.com/dashboard/static/media/waiting.d245e6ed.png" width="200"></img>
      <h3>Waiting for players to join</h3>
      <p>Once players begin registering, you will begin seeing the list of registered players here</p>
    </div>}
  </>
  )
}

export default Teams