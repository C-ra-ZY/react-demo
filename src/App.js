import React, { Component } from "react";
import Game from "./component/game";
// import logo from './logo.svg';
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootHandler from "./reducer";
import "./App.css";
const store = createStore(rootHandler);

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Game />;
			</Provider>
		);
	}
}

export default App;
