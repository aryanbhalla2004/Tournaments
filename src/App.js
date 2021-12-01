import React from "react";
import {Switch, Route} from "react-router-dom";

const App = () => {
  return (
    <Switch>
      <Route exact path="/">
        <h1>sdsd</h1>
      </Route>
      <Route exact path="/dashboard">
        <h1>sdsdssd</h1>
      </Route>
    </Switch>
  )
}

export default App;
