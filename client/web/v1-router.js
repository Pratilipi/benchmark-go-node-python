/*
A router module to handle the CRUD operations of page service
*/

// Calling the express.js framework module for web routing
const express = require( 'express' );

// Initializing Router of express module
const router = express.Router();

// Calling transformer module
const requestTransformer = require( '../../utils/request-transformer.js' );

// Calling cognition module
const cognition = require( '../../utils/cognition.js' );

// Calling cognition module
const responseBuilder = require( '../../utils/response-builder.js' );

// Calling controller module
const controller = require( '../../utils/controller.js' );

//GET
router.get( '/pratilipis', controller.getPratilipi_v1 );

// Make correct response and send it
function sendCorrectResponse( req, res, response ) {
  res.status( response.code );
  res.send( response.data );
}

module.exports = router;
