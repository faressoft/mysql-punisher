var commander = require('commander')
  , inquirer  = require('inquirer');

/**
 * Handle the command line options to enter host, user, password
 * 
 * @return {Promise} pass on success {host, user, password}
 */
module.exports = function() {

  return new Promise(function(resolve, reject) {

    commander
      .usage('-h <hostname> -u <username> [-p <password>] -t <timeout> -i <interval>')
      .option('-h, --host <host>', 'host name')
      .option('-u, --user <user>', 'user name')
      .option('-p, --password <password>', 'password')
      .option('-t, --timeout <seconds>', 'timeout in seconds')
      .option('-i, --interval <millisecond>', 'timer\'s interval in millisecond')
      .parse(process.argv);

    // Host and user is not passwd as options
    if (typeof commander.host === 'undefined' || typeof commander.user === 'undefined' || typeof commander.timeout === 'undefined' ||
        typeof commander.interval === 'undefined') {
      commander.outputHelp();
      return reject();
    }

    // Check if the entered timeout is a valid number
    if (isNaN(parseFloat(commander.timeout)) || !isFinite(commander.timeout)) {
      commander.outputHelp();
      return reject();
    } else {
      commander.timeout = parseInt(commander.timeout);
    }

    // Check if the entered interval is a valid number
    if (isNaN(parseFloat(commander.interval)) || !isFinite(commander.interval)) {
      commander.outputHelp();
      return reject();
    } else {
      commander.interval = parseInt(commander.interval);
    }

    // The password is not passed as an option (optional)
    if (typeof commander.password === 'undefined') {

      var questions = [
        {
          type: 'password',
          name: 'password',
          message: 'Enter password'
        }
      ];

      // Ask the user to enter the password
      inquirer.prompt(questions).then(function(answers) {

        resolve({
          host: commander.host,
          user: commander.user,
          password: answers.password,
          timeout: commander.timeout,
          interval: commander.interval
        });

      });

    } else {

      resolve({
        host: commander.host,
        user: commander.user,
        password: commander.password,
        timeout: commander.timeout,
        interval: commander.interval
      });

    }
    
  });
  
};
