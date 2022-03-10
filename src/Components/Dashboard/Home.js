import { Chart } from 'react-charts';
import {ResponsiveContainer, BarChart , Line, Tooltip, YAxis, LineChart, CartesianGrid, XAxis, Legend, Bar} from "recharts";
const pdata = [
  {
    date: '2022/03/22',
    fees: 3,
    Teams: 3
  }, 
  {
    date: '2022/03/23',
    fees: 2,
    Teams: 2
  },
  {
    date: '2022/03/24',
    fees: 10,
    Teams: 10
  }, 
  {
    date: '2022/03/24',
    fees: 3, 
    Teams: 3
  },
]
const Home = () => {
  return (
    <div className="Tournament-page-list-container">
      <div className="top-info">
        <h2 className="title-page">Overview</h2>
      </div>
      <div class="dashboard-stats">
        <ul>
          <li>
            <i class="bi bi-people"></i>
            <div class="stats-data">
              <h1>0</h1>
              <h3>Teams</h3>
            </div>
          </li>
          <li>
            <i class="bi bi-trophy"></i>
            <div class="stats-data">
              <h1>0</h1>
              <h3>Tournaments</h3>
            </div>
          </li>
          <li>
            <i class="bi bi-mortarboard"></i>
            <div class="stats-data">
              <h1>0</h1>
              <h3>Schools</h3>
            </div>
          </li>
          <li>
            <i class="bi bi-bank"></i>
            <div class="stats-data">
              <h1>0</h1>
              <h3>Division</h3>
            </div>
          </li>
        </ul>
      </div>
      <ResponsiveContainer width="100%" aspect={2.3} style={{border: "1px solid"}}>
        <LineChart data={pdata} width={500} style={{marginTop: "20px"}}>
          <CartesianGrid strokeDasharray="3 3" />
          <Legend verticalAlign="top" height={36}/>
          <XAxis dataKey="date" interval={'preserveStartEnd'}/>
          <YAxis dataKey="fees" />
          <Tooltip />
          <Line dataKey="Teams" fill="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Home;