import _ from "lodash";
import { DIRECTIONS } from "../constants";

export function changeDirection(currentPlace, getNextDirectionIndex) {
  if (_.isEmpty(currentPlace) || !_.isFunction(getNextDirectionIndex)) {
    return { error: "Unexpected input. 'currentPlace' cannot be empty and getNextDirectionIndex must be a function." };
  }

  const currentDirIndex = _.findIndex(DIRECTIONS, d => d.direction === currentPlace.direction);
  if (currentDirIndex < 0) {
    return {
      error: `Cannot change direction: Invalid currentPlace.direction: ${currentPlace.direction}.`
    };
  }
  const nextDirIndex = getNextDirectionIndex(currentDirIndex);
  if (_.isFinite(nextDirIndex) && _.inRange(nextDirIndex, 0, DIRECTIONS.length)) {
    return { ...currentPlace, direction: DIRECTIONS[nextDirIndex].direction };
  }
  return {
    error: `Cannot change direction: getNextDirectionIndex must return a valid number but received ${nextDirIndex}.`
  };
}

export function left(args, currentPlace) {
  return changeDirection(currentPlace, currentDirIndex => {
    let nextDirIndex = currentDirIndex - 1;
    if (nextDirIndex < 0) {
      nextDirIndex = DIRECTIONS.length - 1;
    }
    return nextDirIndex;
  });
}

export function right(args, currentPlace) {
  return changeDirection(currentPlace, currentDirIndex => {
    let nextDirIndex = currentDirIndex + 1;
    if (nextDirIndex === DIRECTIONS.length) {
      nextDirIndex = 0;
    }
    return nextDirIndex;
  });
}
