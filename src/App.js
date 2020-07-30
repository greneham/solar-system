import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

// comps
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

// views
import List2D from "./Views/List2D";
import SolarSystem from "./Views/SolarSystem";
import Detail from "./Views/Detail";

function App() {
  return (
    <div data-testid="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <List2D></List2D>
          </Route>
          <Route exact path="/solarsystem">
            <SolarSystem></SolarSystem>
          </Route>
          <Route exact path="/detail/:id">
            <Detail></Detail>
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
