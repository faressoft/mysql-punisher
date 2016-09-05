var processList = require('./processlist.js')
  , kill        = require('./kill.js');

/**
 * Watch the processlist.js for timeout and kill the timedout processes 
 * 
 * @param {Object} connection MySQL connection object
 * @param {Object} options {host, user, password, timeout}
 */
module.exports = function watch(connection, options) {

  setTimeout(function() {

    // Get a list of active query processes
    processList(connection).then(function(processes) {
    
      // No active query processes
      if (!processes.length) {
        watch(connection, options);
        return;
      }

      // Foreach active query process
      processes.forEach(function(processItem) {

        // Check if the processes is timedout
        if (processItem.time > options.timeout) {
          // Print meta data about the process
          console.log(processItem.id, processItem.time + 's', processItem.query);
          // Kill the process
          kill(connection, processItem.id);
        }

      });

      watch(connection, options);
    
    }).catch(function(error) {

      console.error(error);

      watch(connection, options);

    });

  }, options.interval);
  
};
