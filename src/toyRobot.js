import _ from "lodash";
import commander from "commander";
import inquirer from "inquirer";
import { COMMANDS } from "./constants";

let x = 0;
let y = 0;
let direction = "";

const getCommand = command => {
  if (!_.isEmpty(command)) {
    const commandToExe = _.find(COMMANDS, aCommand => _.includes(aCommand.validInput, _.toLower(command)));
    return commandToExe;
  }
  return null;
};

const log = message => {
  if (commander.debug) {
    console.log(message);
  }
};

const executeCommand = commandInput => {
  const commandLine = _.words(commandInput, /[^, ]+/g);
  const command = getCommand(commandLine[0]);
  if (command) {
    const args = _.drop(commandLine);
    if (command.args !== args.length) {
      log(`Invalid number of args received. Expected ${command.args}, Received ${args.length}.`);
    } else if (command.validatePlace && !direction) {
      log("PLACE command needs to be called first.");
    } else {
      const result = command.exec(args, { x, y, direction });
      if (result.error) {
        log(result.error);
      } else {
        x = result.x;
        y = result.y;
        direction = result.direction;
      }
    }
  } else {
    log(`Unknown command "${commandLine[0]}"`);
  }
};

const questions = [
  {
    type: "input",
    name: "command"
  }
];

function ask() {
  inquirer
    .prompt(questions)
    .then(answers => {
      executeCommand(answers.command);
      ask();
    })
    .catch(err => {});
}

export function start() {
  commander
    .version("1.0.0")
    .option("-d, --debug", "Add debug messages")
    .parse(process.argv);
  ask();
}
