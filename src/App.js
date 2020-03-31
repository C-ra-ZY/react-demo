import React, {Component} from "react";
import {Provider} from "react-redux";
import {createStore} from "redux";
import rootHandler from "./reducer";
import {Switch, Route, Link} from "react-router-dom";

import Game from "./component/game/game";
import CarouselDemo from "./component/carousel/index";
import GoHome from "./hoc/goHome";

import "./App.css";

const store = createStore(rootHandler);

class App extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          component={() => {
            return (
              <React.Fragment>
                <h1>Carl's toy react app</h1>
                <Link to="game">game</Link>
                <br />
                <Link to="carousel">carousel</Link>
              </React.Fragment>
            );
          }}
        />
        <Route
          path="/game"
          component={() => {
            return <Provider store={store}>{GoHome(Game)()}</Provider>;
          }}
        />
        <Route path="/carousel" component={GoHome(CarouselDemo)} />
      </Switch>
    );
  }
}

export default App;
