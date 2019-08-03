import { report } from "./report";

describe("report command action", () => {
  const mockConsole = jest.spyOn(console, "log").mockImplementation(() => {
    return true;
  });

  afterAll(() => {
    mockConsole.mockReset();
  });

  afterEach(() => {
    mockConsole.mockClear();
  });

  test("currentPlace cannot be empty", () => {
    expect(report().error).toBeTruthy();
    expect(mockConsole).not.toHaveBeenCalled();
  });

  test("report when currentPlace is {x: 0, y: 0, direction: 'south'}", () => {
    expect(report(null, { x: 0, y: 0, direction: "south" })).toBeTruthy();
    expect(mockConsole).toHaveBeenCalledWith("Output: 0, 0, SOUTH");
  });

  test("report when currentPlace is {x: null, y: null, direction: null}", () => {
    expect(report(null, { x: null, y: null, direction: null })).toBeTruthy();
    expect(mockConsole).toHaveBeenCalledWith("Output: null, null, Unknown");
  });

  test("report when currentPlace is {x: undefined, y: undefined, direction: undefined}", () => {
    expect(report(null, { x: undefined, y: undefined, direction: undefined })).toBeTruthy();
    expect(mockConsole).toHaveBeenCalledWith("Output: undefined, undefined, Unknown");
  });

  test("report when currentPlace is {somethingelse: ''}", () => {
    expect(report(null, { somethingelse: "" })).toBeTruthy();
    expect(mockConsole).toHaveBeenCalledWith("Output: undefined, undefined, Unknown");
  });
});
