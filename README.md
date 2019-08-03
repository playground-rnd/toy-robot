# Toy Robot

## How to run

- Install [npm] - Tested using v6.4.1
- Install [NodeJS] - Tested using v8.12.0, must be Node 6 and over
- Run `npm install`
- Run `node .` from the root project directory. Use standard input to enter commands.
- Alternatively, Run `node . -d` to run the application in debug mode. This will print error message when invalid command/move is entered.

## Script

- npm test - execute tests

## Assumption

- Command is case insensitive
- PLACE command must have 3 arguments and can be separated using comma or space, otherwise the command is ignored.
- Other commands cannot have any arguments. If provided, the command is ignored
- Ctrl + C is used to end the application
- Valid command can be accepted after REPORT
