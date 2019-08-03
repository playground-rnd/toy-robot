import * as commandActions from "./commands";

export const TABLE_SIZE = 5;
export const MAX_TABLE_INDEX = TABLE_SIZE - 1;
export const RIGHT = "right";
export const LEFT = "left";

export const COMMANDS = [
  { command: "place", validInput: ["place"], args: 3, exec: commandActions.place },
  { command: "move", validInput: ["move"], args: 0, validatePlace: true, exec: commandActions.move },
  { command: "left", validInput: ["left"], args: 0, validatePlace: true, exec: commandActions.left },
  { command: "right", validInput: ["right"], args: 0, validatePlace: true, exec: commandActions.right },
  { command: "report", validInput: ["report"], args: 0, validatePlace: true, exec: commandActions.report }
];

export const DIRECTIONS = [
  { direction: "north", validInput: ["north"], move: (x, y) => ({ x: x, y: y + 1 }), [LEFT]: "west", [RIGHT]: "east" },
  { direction: "east", validInput: ["east"], move: (x, y) => ({ x: x + 1, y: y }), [LEFT]: "north", [RIGHT]: "south" },
  { direction: "south", validInput: ["south"], move: (x, y) => ({ x: x, y: y - 1 }), [LEFT]: "east", [RIGHT]: "west" },
  { direction: "west", validInput: ["west"], move: (x, y) => ({ x: x - 1, y: y }), [LEFT]: "south", [RIGHT]: "north" }
];
