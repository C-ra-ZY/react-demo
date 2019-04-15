export function play(index) {
	return {
		type: "play",
		payLoad: index
	};
}

export function changeRound(index) {
	return {
		type: "changeRound",
		payLoad: index
	};
}
