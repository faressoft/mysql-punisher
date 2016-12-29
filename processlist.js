var arrayQuery = require('array-query');

/**
 * Get a list of active query processes that exceed the timeout
 * 
 * @param  {Object}  connection MySQL connection object
 * @param  {Object}  options    {host, user, password, timeout, interval, watchDatabase, watchHost, watchUser}
 * @return {Promise} array of active query processes {id, time, query}
 */
module.exports = function(connection, options) {

  return new Promise(function(resolve, reject) {

    // Filters
    var where = arrayQuery('Command').is('Query');

    // Timeout
    where = where.and('Time').gt(options.timeout);

    // The watchDatabase option is set
    if (options.watchDatabase !== 'all') {
      where = where.and('db').is(options.watchDatabase);
    }

    // The watchHost option is set
    if (options.watchHost !== 'all') {
      where = where.and('Host').is(options.watchHost);
    }

    // The watchUser option is set
    if (options.watchUser !== 'all') {
      where = where.and('User').is(options.watchUser);
    }

    // Processlist query
    var query = 'SHOW FULL PROCESSLIST';

    connection.query(query, function(error, rows, fields) {

      if (error) {
        return reject(error);
      }

      // Convert to plain object
      var data = JSON.parse(JSON.stringify(rows));

      // Filter the data
      data = where.on(data);

      var processList = [];

      // No active processes
      if (data.length <= 1) {
        return resolve(processList);
      }

      // Foreach process
      data.forEach(function(processItem) {

        // Ignore the current processlist query
        if (processItem.Info === query) {
          return;
        }

        processList.push({
          id: processItem.Id,
          time: processItem.Time,
          query: processItem.Info
        });

      });

      resolve(processList);

    });
    
  });

};
