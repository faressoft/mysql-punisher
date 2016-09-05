var mysql    = require('mysql')
  , inquirer = require('inquirer');

/**
 * Create a MySQL connection
 * 
 * @param  {String} host
 * @param  {String} user
 * @param  {String} password
 * @param  {String} timeout
 * @return {Object} MySQL connection object
 */
module.exports = function(host, user, password, timeout) {

  var connection = mysql.createPool({
    host: host,
    user: user,
    password: password
  });

  return connection;
  
};
