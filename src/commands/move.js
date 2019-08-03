import _ from "lodash";
import { TABLE_SIZE, DIRECTIONS } from "../constants";

export function move(args, currentPlace) {
  if (_.isEmpty(currentPlace)) {
    return { error: "Unexpected input. 'currentPlace' cannot be empty." };
  }

  const { x, y, direction } = currentPlace;
  const currentDirection = _.find(DIRECTIONS, d => d.direction === direction);
  if (_.inRange(x, 0, TABLE_SIZE) && _.inRange(y, 0, TABLE_SIZE) && currentDirection) {
    const nextPosition = currentDirection.move(x, y);
    if (_.inRange(nextPosition.x, 0, TABLE_SIZE) && _.inRange(nextPosition.y, 0, TABLE_SIZE)) {
      return { ...nextPosition, direction };
    }
    return { error: "Cannot MOVE the Toy Robot off the grid." };
  }

  return { error: `Unexpected currentPlace. x = ${x}, y = ${y}, direction = ${direction}` };
}
