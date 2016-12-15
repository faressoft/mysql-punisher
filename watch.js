var processList = require('./processlist.js')
  , kill        = require('./kill.js');

/**
 * Watch the processlist.js for timeout and kill the timedout processes 
 * 
 * @param {Object} connection MySQL connection object
 * @param {Object} options    {host, user, password, timeout, interval, watchDatabase, watchHost, watchUser}
 */
module.exports = function watch(connection, options) {

  setTimeout(function() {

    // Get a list of active query processes that exceed the timeout
    processList(connection, options).then(function(processes) {
    
      // No active query processes
      if (!processes.length) {
        watch(connection, options);
        return;
      }

      // Foreach active query process
      processes.forEach(function(processItem) {

        // Print meta data about the process
        console.log('KILL', processItem.id, processItem.time + 's', processItem.query);

        // Kill the process
        kill(connection, processItem.id).catch(function(error) {
        
          if (typeof error.code !== 'undefined') {
            console.error(error.code);
            process.exit();
          }

        });

      });

      watch(connection, options);
    
    }).catch(function(error) {

      if (typeof error.code !== 'undefined') {

        if (typeof error.code !== 'undefined') {
          console.error(error.code);
          process.exit();
        }

      }

      watch(connection, options);

    });

  }, options.interval);
  
};
