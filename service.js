const { execSync } = require('child_process')
const path = require('path')
const fs = require('fs')

let SERVICE = {
  SHOW_INTRODUCTION: function () {
    console.clear()

    console.log(`
###############################################################################
#                                                                             #
#  This is my first custom CLI.                                               #
#  Supported commands are:                                                    #
#  => pwd, ls(only), cd, hostname, uname, reset(to go back to original state) #
#     clear, exit.                                                            #
#                                                                             #
#  Use it for testing purpose. Its in development mode.                       #
#  Enjoy! Made with 💕  :)                                                     #
#                                                                             #
###############################################################################`
    )
  },

  CLEAR: function () {
    console.clear()
  },

  PWD: function (currentPath) {
    console.log(currentPath)
  },

  CD: function (currentPath, param) {
    if (param === undefined) {
      console.log('ERROR: No directory provided')
    } else {
      let resolve = path.resolve(currentPath, param)
      if (fs.existsSync(resolve) && fs.lstatSync(resolve).isDirectory()) {
        currentPath = resolve
      } else {
        console.log('ERROR: No such directory - ' + resolve)
      }
    }
    return currentPath
  },

  LS: function (currentPath) {
    try {
      let output = execSync('ls ' + currentPath)
      output = output.toString()
      output = output.substring(0, output.length - 1)
      console.log(output)
    } catch (error) {
      console.log('ERROR: ' + error.message)
    }
  },

  RESET: function () {
    SERVICE.SHOW_INTRODUCTION()
    return path.resolve(__dirname)
  },

  EXIT: function () {
    console.log('Bye Bye! :)\n')
    process.exit(0)
  },

  NOT_SUPPORTED: function () {
    console.log('ERROR: Command not supported. Only supported commands are: pwd, ls, cd, hostname, uname, clear, exit, reset')
  },

  HOSTNAME: function (hostname) {
    console.log(hostname)
  },

  UNAME: function (uname) {
    console.log(uname)
  }

}

module.exports = SERVICE
