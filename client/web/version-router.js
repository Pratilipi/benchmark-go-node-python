/*
A router module to handle the CRUD operations of page service
*/

// Calling the express.js framework module for web routing
const express = require( 'express' );
// Loading the versions of routers
const VERSIONS = require( '../../config/version.js' ).WEB;
// Initializing Router of express module
const router = express.Router();

// Routes all platform request to respective routers
Object.keys( VERSIONS ).forEach( function( version ) {
  router.use( version, VERSIONS[ version ] );
} );

module.exports = router;
