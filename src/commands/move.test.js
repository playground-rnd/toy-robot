import { move } from "./move";
import { MAX_TABLE_INDEX, TABLE_SIZE } from "../constants";

test("currentPlace cannot be empty", () => {
  expect(move().error).toBeTruthy();
});

test("currentPlace must be valid", () => {
  expect(move(null, { x: 0, y: 0, direction: "" }).error).toBeTruthy();
  expect(move(null, { x: 0, y: 0, direction: null }).error).toBeTruthy();
  expect(move(null, { x: 0, y: 0, direction: undefined }).error).toBeTruthy();
  expect(move(null, { x: 0, y: 0, direction: "invalid direction" }).error).toBeTruthy();
  expect(move(null, { x: "", y: 0, direction: "south" }).error).toBeTruthy();
  expect(move(null, { x: null, y: 0, direction: "south" }).error).toBeTruthy();
  expect(move(null, { x: undefined, y: 0, direction: "south" }).error).toBeTruthy();
  expect(move(null, { x: "invalid", y: 0, direction: "south" }).error).toBeTruthy();
  expect(move(null, { x: -1, y: 0, direction: "south" }).error).toBeTruthy();
  expect(move(null, { x: TABLE_SIZE, y: 0, direction: "south" }).error).toBeTruthy();
  expect(move(null, { y: null, x: 0, direction: "south" }).error).toBeTruthy();
  expect(move(null, { y: undefined, x: 0, direction: "south" }).error).toBeTruthy();
  expect(move(null, { y: "invalid", x: 0, direction: "south" }).error).toBeTruthy();
  expect(move(null, { y: -1, x: 0, direction: "south" }).error).toBeTruthy();
  expect(move(null, { y: TABLE_SIZE, x: 0, direction: "south" }).error).toBeTruthy();
});

test("toy robot must stay on the table", () => {
  expect(move(null, { x: 0, y: 0, direction: "west" }).error).toBeTruthy();
  expect(move(null, { x: 0, y: 0, direction: "south" }).error).toBeTruthy();
  expect(move(null, { x: 0, y: MAX_TABLE_INDEX, direction: "north" }).error).toBeTruthy();
  expect(move(null, { x: 0, y: MAX_TABLE_INDEX, direction: "west" }).error).toBeTruthy();
  expect(move(null, { x: MAX_TABLE_INDEX, y: 0, direction: "east" }).error).toBeTruthy();
  expect(move(null, { x: MAX_TABLE_INDEX, y: 0, direction: "south" }).error).toBeTruthy();
  expect(move(null, { x: MAX_TABLE_INDEX, y: MAX_TABLE_INDEX, direction: "north" }).error).toBeTruthy();
  expect(move(null, { x: MAX_TABLE_INDEX, y: MAX_TABLE_INDEX, direction: "east" }).error).toBeTruthy();
});

test("move to north direction", () => {
  expect(move(null, { x: 0, y: 0, direction: "north" })).toEqual({ x: 0, y: 1, direction: "north" });
});

test("move to east direction", () => {
  expect(move(null, { x: 0, y: 0, direction: "east" })).toEqual({ x: 1, y: 0, direction: "east" });
});

test("move to south direction", () => {
  expect(move(null, { x: 2, y: 2, direction: "south" })).toEqual({ x: 2, y: 1, direction: "south" });
});

test("move to west direction", () => {
  expect(move(null, { x: 2, y: 2, direction: "west" })).toEqual({ x: 1, y: 2, direction: "west" });
});
