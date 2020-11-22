
'use strict'

// Built-in
const os = require('os')
const readline = require('readline')

// For printing colored console texts.
const colors = require('colors')

// Custom service
let CommandService = require('./service')

// Getting uname and hostname
const uname = os.userInfo().username
const hostname = os.hostname()

// Setting current path
let currentPath = __dirname

// Interface initiate for readline
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: getPromptLine(),
  historySize: 5,
  removeHistoryDuplicates: true
})


// Registering SIGNINT Listener
process.on('SIGINT', () => {
  console.log('SIGINT');
  CommandService.EXIT();
});


// ===================================================================
// Begins
// ===================================================================

// Display introduction text
CommandService.SHOW_INTRODUCTION()

// Print default CLI line initially
rl.prompt();

// Handles input commands from consoles
rl.on('line', (input) => {
  input = input.trim()

  // Extracting command and parameter
  let values = input.split(' ').filter(val => val)
  let [cmd, param] = values

  switch (cmd) {
    case '':
      break

    case 'pwd': CommandService.PWD(currentPath)
      break

    case 'clear': CommandService.CLEAR()
      break

    case 'cd': currentPath = CommandService.CD(currentPath, param)
      break

    case 'ls': CommandService.LS(currentPath)
      break

    case 'hostname': CommandService.HOSTNAME(hostname)
      break

    case 'uname': CommandService.UNAME(uname)
      break

    case 'reset': currentPath = CommandService.RESET()
      break

    case 'exit': CommandService.EXIT()
      break

    default: CommandService.NOT_SUPPORTED()
      break
  }

  rl.setPrompt(getPromptLine())

  rl.prompt();
})

function getPromptLine() {
  return colors.green(`${uname}@${hostname}`) + `:` + colors.blue(`~${currentPath}]`) + ` $ `;
}
