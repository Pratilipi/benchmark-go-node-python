var VERSIONS = {};

VERSIONS.WEB = {};

VERSIONS.WEB[ '/v1.0' ] = require( '../client/web/v1-router.js' );
VERSIONS.WEB[ '/' ] = require( '../client/web/v1-router.js' );

module.exports = VERSIONS;

