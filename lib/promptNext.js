const inquirer = require('inquirer')

const promptNext = async (message, inquirer) => {
  await inquirer.prompt({
    message: message,
    name: 'next',
    type: 'confirm',
  })
}

module.exports = promptNext
