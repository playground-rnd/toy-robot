import _ from "lodash";
import { TABLE_SIZE, DIRECTIONS } from "../constants";

export function place(args, currentPlace) {
  if (!args || args.length !== 3) {
    return { error: "Unexpected input. Must have 3 arguments: [x, y, direction]" };
  }
  const [x, y, direction] = args;
  const directionToFace = _.find(DIRECTIONS, aDirection => _.includes(aDirection.validInput, _.toLower(direction)));

  if (
    _.isFinite(_.parseInt(x)) &&
    _.isFinite(_.parseInt(y)) &&
    _.inRange(x, 0, TABLE_SIZE) &&
    _.inRange(y, 0, TABLE_SIZE) &&
    directionToFace
  ) {
    return { x: _.parseInt(x), y: _.parseInt(y), direction: directionToFace.direction };
  }
  return { error: `Invalid PLACE command. x = ${x}, y = ${y}, direction = ${direction}` };
}
