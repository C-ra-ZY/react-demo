import shallowEqualArrays from "shallow-equal/arrays";

const initState = {
	status: new Array(9).fill(null),
	history: [],
	winner: null,
	currentRound: 1
};
const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

const play = (state, index) => {
	let nextPlayer = state.status.filter((e) => !!e).length % 2 ? "O" : "X";
	state.winner = null;
	state.status[index] = nextPlayer;
	if (state.currentRound < state.history.length) {
		let equal = shallowEqualArrays(state.history[state.currentRound] || [], state.status);
		if (!equal) {
			state.history = state.history.slice(0, state.currentRound);
			state.history.push([...state.status]);
		}
	} else {
		state.history.push([...state.status]);
	}
	state.currentRound = state.status.filter((e) => !!e).length;
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (state.status[a] && state.status[a] === state.status[b] && state.status[a] === state.status[c]) {
			state.winner = state.status[a];
		}
	}
	return { ...state };
};

const changeRound = (state, index) => {
	state.currentRound = parseFloat(index);
	state.status = [...state.history[state.currentRound - 1]];
	state.winner = null;
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (state.status[a] && state.status[a] === state.status[b] && state.status[a] === state.status[c]) {
			state.winner = state.status[a];
		}
	}
	return { ...state };
};

function handler(state = initState, action) {
	switch (action.type) {
		case "play":
			return play(state, action.payLoad);
		case "changeRound":
			return changeRound(state, action.payLoad);
		default:
			return state;
	}
}

export default handler;
