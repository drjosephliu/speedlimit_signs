import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./components/Home";
import TrainImagesList from "./components/TrainImagesList";
import TestImagesList from "./components/TestImagesList";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path={"/"} exact component={Home} />
        <Route path={"/train"} exact component={TrainImagesList} />
        <Route path={"/test"} exact component={TestImagesList} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
