import { start } from "./toyRobot";
import commander from "commander";
import inquirer from "inquirer";

jest.mock("commander");
jest.mock("inquirer");

describe("toy robot", () => {
  const mockConsole = jest.spyOn(console, "log").mockImplementation(() => {
    return true;
  });

  beforeAll(() => {
    commander.version.mockReturnThis();
    commander.option.mockReturnThis();
    commander.debug = true;
  });

  afterAll(() => {
    mockConsole.mockReset();
    inquirer.prompt.mockReset();
    commander.version.mockReset();
    commander.option.mockReset();
  });

  afterEach(() => {
    mockConsole.mockClear();
    inquirer.prompt.mockClear();
  });

  test("Ignore invalid command", async done => {
    inquirer.prompt
      .mockImplementationOnce(() => {
        return Promise.resolve({ command: "hey" });
      })
      .mockImplementationOnce(() => {
        return Promise.resolve({ command: "" });
      });
    start();
    setTimeout(() => {
      expect(mockConsole).toHaveBeenNthCalledWith(1, 'Unknown command "hey"');
      expect(mockConsole).toHaveBeenNthCalledWith(2, 'Unknown command "undefined"');
      done();
    }, 2000);
  });

  test("PLACE must be the first command", async done => {
    inquirer.prompt
      .mockImplementationOnce(() => {
        return Promise.resolve({ command: "move" });
      })
      .mockImplementationOnce(() => {
        return Promise.resolve({ command: "right" });
      })
      .mockImplementationOnce(() => {
        return Promise.resolve({ command: "left" });
      })
      .mockImplementationOnce(() => {
        return Promise.resolve({ command: "report" });
      });
    start();
    setTimeout(() => {
      expect(mockConsole).toHaveBeenNthCalledWith(1, "PLACE command needs to be called first.");
      expect(mockConsole).toHaveBeenNthCalledWith(2, "PLACE command needs to be called first.");
      expect(mockConsole).toHaveBeenNthCalledWith(3, "PLACE command needs to be called first.");
      expect(mockConsole).toHaveBeenNthCalledWith(4, "PLACE command needs to be called first.");
      done();
    }, 2000);
  });

  test("Correct number of args must be provided", async done => {
    inquirer.prompt
      .mockImplementationOnce(() => {
        return Promise.resolve({ command: "place" });
      })
      .mockImplementationOnce(() => {
        return Promise.resolve({ command: "place 1 " });
      })
      .mockImplementationOnce(() => {
        return Promise.resolve({ command: "place 1 1 " });
      })
      .mockImplementationOnce(() => {
        return Promise.resolve({ command: "place 1 1 1 1" });
      })
      .mockImplementationOnce(() => {
        return Promise.resolve({ command: "move 1" });
      })
      .mockImplementationOnce(() => {
        return Promise.resolve({ command: "right 1" });
      })
      .mockImplementationOnce(() => {
        return Promise.resolve({ command: "left 1" });
      })
      .mockImplementationOnce(() => {
        return Promise.resolve({ command: "report 1" });
      });
    start();
    setTimeout(() => {
      expect(mockConsole).toHaveBeenCalledTimes(8);
      done();
    }, 2000);
  });

  test("Ignore invalid command", async done => {
    inquirer.prompt
      .mockImplementationOnce(() => {
        return Promise.resolve({ command: "hey" });
      })
      .mockImplementationOnce(() => {
        return Promise.resolve({ command: "" });
      });
    start();
    setTimeout(() => {
      expect(mockConsole).toHaveBeenNthCalledWith(1, 'Unknown command "hey"');
      expect(mockConsole).toHaveBeenNthCalledWith(2, 'Unknown command "undefined"');
      done();
    }, 2000);
  });

  test("Toy Robot - 1", async done => {
    inquirer.prompt
      .mockImplementationOnce(() => {
        return Promise.resolve({ command: "PLACE 0,0,NORTH" });
      })
      .mockImplementationOnce(() => {
        return Promise.resolve({ command: "MOVE" });
      })
      .mockImplementationOnce(() => {
        return Promise.resolve({ command: "REPORT" });
      });
    start();
    setTimeout(() => {
      expect(mockConsole).toHaveBeenCalledTimes(1);
      expect(mockConsole).toHaveBeenNthCalledWith(1, "Output: 0, 1, NORTH");
      done();
    }, 2000);
  });

  test("Toy Robot - 2", async done => {
    inquirer.prompt
      .mockImplementationOnce(() => {
        return Promise.resolve({ command: "PLACE 0,0,NORTH" });
      })
      .mockImplementationOnce(() => {
        return Promise.resolve({ command: "LEFT" });
      })
      .mockImplementationOnce(() => {
        return Promise.resolve({ command: "REPORT" });
      });
    start();
    setTimeout(() => {
      expect(mockConsole).toHaveBeenCalledTimes(1);
      expect(mockConsole).toHaveBeenNthCalledWith(1, "Output: 0, 0, WEST");
      done();
    }, 2000);
  });

  test("Toy Robot - 3", async done => {
    inquirer.prompt
      .mockImplementationOnce(() => {
        return Promise.resolve({ command: "PLACE 1,2,EAST" });
      })
      .mockImplementationOnce(() => {
        return Promise.resolve({ command: "MOVE" });
      })
      .mockImplementationOnce(() => {
        return Promise.resolve({ command: "MOVE" });
      })
      .mockImplementationOnce(() => {
        return Promise.resolve({ command: "LEFT" });
      })
      .mockImplementationOnce(() => {
        return Promise.resolve({ command: "MOVE" });
      })
      .mockImplementationOnce(() => {
        return Promise.resolve({ command: "REPORT" });
      });
    start();
    setTimeout(() => {
      expect(mockConsole).toHaveBeenCalledTimes(1);
      expect(mockConsole).toHaveBeenNthCalledWith(1, "Output: 3, 3, NORTH");
      done();
    }, 2000);
  });

  test("Toy Robot - 4 - lowercase with space", async done => {
    inquirer.prompt
      .mockImplementationOnce(() => {
        return Promise.resolve({ command: "place 1 2 east" });
      })
      .mockImplementationOnce(() => {
        return Promise.resolve({ command: "move " });
      })
      .mockImplementationOnce(() => {
        return Promise.resolve({ command: "move " });
      })
      .mockImplementationOnce(() => {
        return Promise.resolve({ command: " left " });
      })
      .mockImplementationOnce(() => {
        return Promise.resolve({ command: " move   ," });
      })
      .mockImplementationOnce(() => {
        return Promise.resolve({ command: "    ,report" });
      });
    start();
    setTimeout(() => {
      expect(mockConsole).toHaveBeenCalledTimes(1);
      expect(mockConsole).toHaveBeenNthCalledWith(1, "Output: 3, 3, NORTH");
      done();
    }, 2000);
  });
});
