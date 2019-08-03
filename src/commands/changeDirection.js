import _ from "lodash";
import { DIRECTIONS, RIGHT, LEFT } from "../constants";

export function changeDirection(currentPlace, commandDirection) {
  if (_.isEmpty(currentPlace) || !commandDirection) {
    return { error: "Unexpected input. 'currentPlace' and 'commandDirection' cannot be empty." };
  }

  const direction = _.find(DIRECTIONS, d => d.direction === currentPlace.direction);
  if (direction && direction[commandDirection]) {
    return { ...currentPlace, direction: direction[commandDirection] };
  } else {
    return {
      error: `Cannot exec ${commandDirection}: Invalid currentPlace.direction: ${
        currentPlace.direction
      } or commandDirection: ${commandDirection}.`
    };
  }
}

export function left(args, currentPlace) {
  return changeDirection(currentPlace, LEFT);
}

export function right(args, currentPlace) {
  return changeDirection(currentPlace, RIGHT);
}
