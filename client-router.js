/*
A router module which listens on specified port and routes all valid requests to service router.
*/
// Setting Timezone for the application to UTC
process.env.TZ = 'UTC';
// Calling the express.js framework module for web routing
const express = require( 'express' );
// Calling the body parser module for parsing the request body
const bodyParser = require( 'body-parser' );
// Loading the oasis.js module
const OASIS = require( './config/env.js' )[ process.env.STAGE || 'local' ];
// Loading the config.js module
const CLIENTS = require( './config/client.js' );

var morgan = require( 'morgan' );

// Initializing express
const app = express();

// Health Check
app.get( '/health', function( request, response, next ){
  response.send( { message: 'Benchmark service is running.' } );
} );

app.use( morgan( 'short' ) );

// Parsing the request to have a body
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: false } ) );

// Routes all platform request to respective routers
Object.keys( CLIENTS ).forEach( function( client ) {
  app.use( client, CLIENTS[ client ] );
} );

// error handler
app.use( function( err, req, res, next ) {
  try{
    var statusCode;
    if( typeof err.name === 'number' ) {
      statusCode = err.name;
    } else if( err.statusCode ) {
      statusCode = err.statusCode;
    } else {
      statusCode = 500;
    }
    res.status( statusCode );
    res.send( { message: err.message } );
    console.error ( JSON.stringify( err.stack ) );
  } catch( error ) {
    next( error );
  }
} );

// Listening on specific port
app.listen( OASIS.SERVICE_PORT, function() {
  console.info( 'Oasis RESTful API server started on: ' + OASIS.SERVICE_PORT );
} );

module.exports = app;
