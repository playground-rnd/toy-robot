import { place } from "./place";

test("args must be valid", () => {
  expect(place().error).toBeTruthy();
  expect(place([]).error).toBeTruthy();
  expect(place(["", "0", "south"]).error).toBeTruthy();
  expect(place(["invalid", "0", "south"]).error).toBeTruthy();
  expect(place(["-1", "0", "south"]).error).toBeTruthy();
  expect(place(["10", "0", "south"]).error).toBeTruthy();
  expect(place(["0", "", "south"]).error).toBeTruthy();
  expect(place(["0", "invalid", "south"]).error).toBeTruthy();
  expect(place(["0", "-1", "south"]).error).toBeTruthy();
  expect(place(["0", "10", "south"]).error).toBeTruthy();
  expect(place(["0", "0", ""]).error).toBeTruthy();
  expect(place(["0", "0", "invalid"]).error).toBeTruthy();
});

test("place robot on the table when direction is in lower case", () => {
  expect(place(["0", "0", "south"])).toEqual({ x: 0, y: 0, direction: "south" });
});

test("place robot on the table when direction is in upper case", () => {
  expect(place(["0", "0", "SOUTH"])).toEqual({ x: 0, y: 0, direction: "south" });
});
