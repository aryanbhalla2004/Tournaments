import { Link, useHistory } from "react-router-dom";
const Home = (props) => {
  const history = useHistory();
  return (
    <>
      <h1>Home Page</h1>
      <Link to="/teamstats">Team Stats</Link>
      {
        !props.currentUser ?
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </> : 
          <>
            <Link onClick={props.logout}>Logout</Link>
            <Link to="/dashboard">Dashboard</Link>
          </>
      }
      <hr/>
      <h1>The Teams</h1>
      <p>Meet our main power!</p>
      {props.listTournaments && props.listTournaments.map(item => (
        <button>{item.Game.name}</button>
      ))}
      <hr/>
      <h1>Tournaments</h1>
      <p>Upcoming * Started</p>
      {props.listTournaments && props.listTournaments.map(item => (
        <>
        <h2>{item.Name}</h2>
        <h3>{item.Tournament_start} -{item.Tournament_start_time}</h3>
        <h2>{item.Game.name}</h2>
        <button onClick={() => history.push(`/tournament-details/${item.Access_Code}`)}>Details</button>
        </>
      ))}
    </>
  )
}

export default Home;