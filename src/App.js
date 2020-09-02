import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./components/Home";
import TrainImagesList from "./components/TrainImagesList";
import TestImagesList from "./components/TestImagesList";

function App() {
  return (
    <HashRouter>
      <Header />
      <Switch>
        <Route path={"/"} exact component={Home} />
        <Route path={"/train"} exact component={TrainImagesList} />
        <Route path={"/test"} exact component={TestImagesList} />
      </Switch>
    </HashRouter>
  );
}

export default App;
