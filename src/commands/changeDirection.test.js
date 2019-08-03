import { left, right, changeDirection } from "./changeDirection";

test("currentPlace cannot be empty", () => {
  expect(changeDirection().error).toBeTruthy();
});

test("commandDirection cannot be empty", () => {
  expect(changeDirection({ x: 0, y: 0, direction: "north" }).error).toBeTruthy();
});

test("currentPlace.direction must be valid direction", () => {
  expect(changeDirection(null, { direction: "" }).error).toBeTruthy();
  expect(changeDirection(null, { direction: null }).error).toBeTruthy();
  expect(changeDirection(null, { direction: undefined }).error).toBeTruthy();
  expect(changeDirection(null, { direction: "invalid direction" }).error).toBeTruthy();
});

test("commandDirection must be valid direction", () => {
  expect(changeDirection({ x: 0, y: 0, direction: "north" }, "invalid").error).toBeTruthy();
});

test("LEFT when facing north", () => {
  expect(left(null, { x: 0, y: 0, direction: "north" })).toEqual({ x: 0, y: 0, direction: "west" });
});

test("LEFT when facing south", () => {
  expect(left(null, { x: 0, y: 0, direction: "south" })).toEqual({ x: 0, y: 0, direction: "east" });
});

test("LEFT when facing east", () => {
  expect(left(null, { x: 0, y: 0, direction: "east" })).toEqual({ x: 0, y: 0, direction: "north" });
});

test("LEFT when facing west", () => {
  expect(left(null, { x: 0, y: 0, direction: "west" })).toEqual({ x: 0, y: 0, direction: "south" });
});

test("RIGHT when facing north", () => {
  expect(right(null, { x: 0, y: 0, direction: "north" })).toEqual({ x: 0, y: 0, direction: "east" });
});

test("RIGHT when facing south", () => {
  expect(right(null, { x: 0, y: 0, direction: "south" })).toEqual({ x: 0, y: 0, direction: "west" });
});

test("RIGHT when facing east", () => {
  expect(right(null, { x: 0, y: 0, direction: "east" })).toEqual({ x: 0, y: 0, direction: "south" });
});

test("RIGHT when facing west", () => {
  expect(right(null, { x: 0, y: 0, direction: "west" })).toEqual({ x: 0, y: 0, direction: "north" });
});
