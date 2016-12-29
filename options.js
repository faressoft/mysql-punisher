var commander = require('commander')
  , path      = require('path')
  , inquirer  = require('inquirer');

/**
 * Handle the command line options to enter host, user, password
 * 
 * @return {Promise} pass on success {host, user, password, timeout, interval, watchDatabase, watchHost, watchUser}
 */
module.exports = function() {

  return new Promise(function(resolve, reject) {

    commander
      .version(require(path.join(__dirname, 'package.json')).version)
      .option('-h, --host <host>', 'host name (default: \'localhost\')')
      .option('-u, --user <user>', 'user name (default: \'root\')')
      .option('-p, --password <password>', 'password (default: \'\')')
      .option('-t, --timeout <seconds>', 'timeout in seconds (default: 30)', parseInt)
      .option('-i, --interval <millisecond>', 'timer\'s interval in millisecond (default: 5)', parseInt)
      .option('--watch-database <database>', 'watch a specefic database processes (default: \'all\')')
      .option('--watch-host <host>', 'watch a specefic host\'s processes (default: \'all\')')
      .option('--watch-user <user>', 'watch a specefic user\'s processes (default: \'all\')')
      .parse(process.argv);

    // Default value for the host
    if (typeof commander.host === 'undefined') {
      commander.host = 'localhost';
    }

    // Default value for the host
    if (typeof commander.host === 'undefined') {
      commander.host = 'localhost';
    }

    // Default value for the user
    if (typeof commander.user === 'undefined') {
      commander.user = 'root';
    }

    // Default value for the password
    if (typeof commander.password === 'undefined') {
      commander.password = '';
    }

    // Default value for the timeout
    if (typeof commander.timeout === 'undefined') {
      commander.timeout = 30;
    }

    // Default value for the interval
    if (typeof commander.interval === 'undefined') {
      commander.interval = 1000;
    }

    // Default value for the watchDatabase
    if (typeof commander.watchDatabase === 'undefined') {
      commander.watchDatabase = 'all';
    }

    // Default value for the watchHost
    if (typeof commander.watchHost === 'undefined') {
      commander.watchHost = 'all';
    }

    // Default value for the watchUser
    if (typeof commander.watchUser === 'undefined') {
      commander.watchUser = 'all';
    }

    resolve({
      host: commander.host,
      user: commander.user,
      password: commander.password,
      timeout: commander.timeout,
      interval: commander.interval,
      watchDatabase: commander.watchDatabase,
      watchHost: commander.watchHost,
      watchUser: commander.watchUser
    });

  });
  
};
