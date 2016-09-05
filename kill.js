/**
 * Kill a mysql process by its id
 * 
 * @param  {Object} connection MySQL connection object
 * @param  {Number} processId process's id
 * @return {Promise}
 */
module.exports = function(connection, processId) {

  return new Promise(function(resolve, reject) {

    // Kill the selected processes
    connection.query('KILL ' + processId, function(error) {

      if (!error) {
        return reject(error);
      }

      resolve();

    });
    
  });

};
