/**
 * Get a list of active query processes that exceed the timeout
 * 
 * @param  {Object}  connection MySQL connection object
 * @param  {Object}  options    {host, user, password, timeout, interval, watchDatabase, watchHost, watchUser}
 * @return {Promise} array of   active query processes {id, time, query}
 */
module.exports = function(connection, options) {

  return new Promise(function(resolve, reject) {

    // DB HOST USER
    var where = [];

    // Type
    where.push('COMMAND = \'Query\'');

    // Timeout
    where.push('TIME > ' + options.timeout);

    // The watchDatabase option is set
    if (options.watchDatabase !== 'all') {
      where.push('DB = \'' + options.watchDatabase + '\'');
    }

    // The watchHost option is set
    if (options.watchHost !== 'all') {
      where.push('HOST = \'' + options.watchHost + '\'');
    }

    // The watchUser option is set
    if (options.watchUser !== 'all') {
      where.push('USER = \'' + options.watchUser + '\'');
    }

    // Concatenate the conditions
    where = where.join(' AND ');

    // Processlist query
    var query = 'SELECT * FROM information_schema.PROCESSLIST WHERE ' + where;

    connection.query(query, function(error, rows, fields) {

      var processList = [];

      if (error) {
        return reject(error);
      }

      // No active processes
      if (rows.length <= 1) {
        return resolve(processList);
      }

      // Foreach process
      rows.forEach(function(processItem) {

        // Ignore the current processlist query
        if (processItem.INFO === query) {
          return;
        }

        processList.push({
          id: processItem.ID,
          time: processItem.TIME,
          query: processItem.INFO
        });

      });

      resolve(processList);

    });
    
  });

};
