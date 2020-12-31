import React from "react";
import { Route, Redirect, Router, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import Video from "./Video";

import "./App.scss";
import Tabs from "./Tabs";

const history = createBrowserHistory();

type Props = {};

function App(props: Props) {
  return (
    <React.StrictMode>
      <Router history={history}>
        <Switch>
          <Route path="/" exact={true} render={() => <Tabs />} />
          <Route path="/video" exact={true} render={() => <Video />} />
          <Redirect from={"*"} to="/"></Redirect>
        </Switch>
      </Router>
    </React.StrictMode>
  );
}

export default App;
