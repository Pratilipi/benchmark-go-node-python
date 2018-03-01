var clients = {};

clients[ '/benchmark' ] = require( '../client/web/version-router.js' );
clients[ '/' ] = require( '../client/web/version-router.js' );

module.exports = clients;
