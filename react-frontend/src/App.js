import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./components/Main";

const App = () => (
  <>
    <Router>
      <div className="container">
        <Switch>
          <Route path="/" exact component={Main}></Route>
        </Switch>
      </div>
    </Router>
  </>
);

export default App;
