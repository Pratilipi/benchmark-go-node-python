// Calling transformer module
const requestTransformer = require( './request-transformer.js' );

// Calling cognition module
const cognition = require( './cognition.js' );

// Calling cognition module
const responseBuilder = require( './response-builder.js' );

async function getPratilipi_v1( req, res, next ) {
  try {
    var requestObject = requestTransformer.getPratilipi_v1( req );
    requestObject.serviceVersion = "v1.0";
    var data = await cognition.getPratilipi_v1( requestObject );
    var responseObject = responseBuilder.getPratilipi_v1( data );
    sendCorrectResponse( req, res, responseObject );
  } catch( error ) {
    next( error );
  }
}

// Make correct response and send it
function sendCorrectResponse( req, res, response ) {
  res.status( response.code );
  res.send( response.data );
}

module.exports = {
  getPratilipi_v1 : getPratilipi_v1
};