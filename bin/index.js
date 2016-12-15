#!/usr/bin/env node

/**
 * MySQL Process Manager
 */

var options     = require('../options.js')
  , connection  = require('../connection.js')
  , watch       = require('../watch.js');

// Parse command line options
options().then(function(options) {

  // Create a MySQL connection
  var conn = connection(options.host, options.user, options.password);

  // Watch the processlist and kill the timedout queries
  watch(conn, options);

  // Log
  setTimeout(function() {
    console.log('[*]', 'Start watching ...');
  }, options.interval + 100);

}).catch(function(error) {

  console.error(error);
  
});
