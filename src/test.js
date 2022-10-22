const inquirer = require('inquirer')
const Rx = require('rxjs')
var questionIndex = 0

// const prompts = require('./utils/prompt')

function answer() {
  console.log('8888888888')
  var prompts = new Rx.Subject()

  inquirer.prompt(prompts).ui.process.subscribe(res => {
    console.log('1233', res)

    if (questionIndex < 3) {
      answer()
    } else {
      prompts.complete()
      
      josn.version = '0.0.0'

    }
  })
  questionIndex++
}

answer()
