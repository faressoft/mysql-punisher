var commander = require('commander')
  , inquirer  = require('inquirer');

/**
 * Handle the command line options to enter host, user, password
 * 
 * @return {Promise} pass on success {host, user, password, timeout, interval, watchDatabase, watchHost, watchUser}
 */
module.exports = function() {

  return new Promise(function(resolve, reject) {

    commander
      .option('-h, --host <host>', 'host name (default: \'localhost\')')
      .option('-u, --user <user>', 'user name (default: \'root\')')
      .option('-p, --password <password>', 'password (default: \'\')')
      .option('-t, --timeout <seconds>', 'timeout in seconds (default: 30)', parseInt)
      .option('-i, --interval <millisecond>', 'timer\'s interval in millisecond (default: 5)', parseInt)
      .option('--watch-database <database>', 'watch a specefic database processes (default: \'all\')')
      .option('--watch-host <host>', 'watch a specefic host\'s processes (default: \'all\')')
      .option('--watch-user <user>', 'watch a specefic user\'s processes (default: \'all\')')
      .parse(process.argv);

    if (typeof commander.host === 'undefined') {
      commander.host = 'localhost';
    }

    if (typeof commander.host === 'undefined') {
      commander.host = 'localhost';
    }

    if (typeof commander.user === 'undefined') {
      commander.user = 'root';
    }

    if (typeof commander.password === 'undefined') {
      commander.password = '';
    }

    if (typeof commander.timeout === 'undefined') {
      commander.timeout = 30;
    }

    if (typeof commander.interval === 'undefined') {
      commander.interval = 1000;
    }

    if (typeof commander.watchDatabase === 'undefined') {
      commander.watchDatabase = 'all';
    }

    if (typeof commander.watchHost === 'undefined') {
      commander.watchHost = 'all';
    }

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
