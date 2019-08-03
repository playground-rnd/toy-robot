import _ from "lodash";
export function report(args, currentPlace) {
  if (_.isEmpty(currentPlace)) {
    return { error: "Unexpected input. 'currentPlace' cannot be empty" };
  }
  const { x, y, direction } = currentPlace;
  console.log(`Output: ${x}, ${y}, ${_.toUpper(direction) || "Unknown"}`);
  return currentPlace;
}
