/**
 * Get a list of active query processes
 * 
 * @param {Object} connection MySQL connection object
 * @return {Promise} array of active query processes {id, time, query}
 */
module.exports = function(connection) {

  return new Promise(function(resolve, reject) {

    connection.query('SHOW PROCESSLIST', function(error, rows, fields) {

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

        if (processItem.Info === 'SHOW PROCESSLIST' || processItem.Command !== 'Query') {
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
