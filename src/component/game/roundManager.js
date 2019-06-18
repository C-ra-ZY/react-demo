import React, { Component } from "react";
import { connect } from "react-redux";

class RoundManger extends Component {
	onChange(evt) {
		const { changeRound } = this.props;
		changeRound(evt.target.value);
	}

	render() {
		const { history, currentRound } = this.props;
		let loopEntity = history.length ? history : new Array(1).fill(0);
		return (
			<div className="roundManager">
				<div>{"Round:"}</div>
				<select className="roundManager" onChange={this.onChange.bind(this)} value={currentRound}>
					{loopEntity.map((e, index) => {
						return (
							<option value={index + 1} key={index}>
								{index + 1}
							</option>
						);
					})}
				</select>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { changeRound, history, currentRound } = state;
	return { ...{ changeRound, history, currentRound } };
}

export default connect(mapStateToProps)(RoundManger);
