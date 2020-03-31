export function PLAY(index) {
  return {
    type: "play",
    payLoad: index
  };
}

export function CHANGE_ROUND(index) {
  return {
    type: "changeRound",
    payLoad: index
  };
}
