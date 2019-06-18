import React, { Component } from "react";
import Game from "./component/game/game";
import CarouselDemo from "./component/carousel/index";
// import logo from './logo.svg';
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootHandler from "./reducer";
import { Switch, Route } from "react-router-dom";
import "./App.css";
const store = createStore(rootHandler);

class App extends Component {
	render() {
		return (
			<Switch>
				<Provider store={store}>
					{/* <Route path="/" component={Game} /> */}
					<Route path="/game" component={Game} />
					<Route path="/carousel" component={CarouselDemo} />
				</Provider>
			</Switch>
			// <Game />
			// {/* <Carousel>
			// 	<Item />
			// </Carousel> */}
		);
	}
}

export default App;
