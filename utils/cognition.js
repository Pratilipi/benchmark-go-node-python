const _ = require( 'lodash' );
const service_api = require( './service-api.js' );

//GET
async function getPratilipi_v1( requestObject ) {
  var data = {};
  if( requestObject.slug == null ) {
    //pratilipiId
    data.libraryData = service_api.getLibraryByReferenceIdAndUserId_v1( requestObject );
    data.socialData = service_api.getSocialReviewCountByPratilipiIdBatch_v2( requestObject );
    data.authData = service_api.getAuthByPratilipiIdBatch_v1( requestObject );
    data.userPratilipiData = service_api.getUserPratilipiByIdBatch_v1( requestObject );
    data.pratilipiData = await service_api.getPratilipiByIdBatch_v1( requestObject );
    if( data.pratilipiData.indexOf( null ) !== -1 ) {
      createErrorObject( 404, 'Pratilipi Not Found' );
    }
    requestObject.authorId = data.pratilipiData.map( function( pratilipiObject ) { return pratilipiObject.authorId; } ).toString();
    data.authorData = await service_api.getAuthorByIdBatch_v1( requestObject );
    data.socialData = await data.socialData;
    data.authData = await data.authData;
    data.libraryData = await data.libraryData;
    data.userPratilipiData = await data.userPratilipiData;
  } else {
    //slug
    data.pratilipiData = await service_api.getPratilipiBySlugBatch_v1( requestObject );
    if( data.pratilipiData.indexOf( null ) !== -1 ) {
      createErrorObject( 404, 'Pratilipi Not Found' );
    }
    requestObject.pratilipiId = data.pratilipiData.map( function( pratilipiObject ) { return pratilipiObject.pratilipiId; } ).toString();
    data.libraryData = service_api.getLibraryByReferenceIdAndUserId_v1( requestObject );
    data.socialData = service_api.getSocialReviewCountByPratilipiIdBatch_v2( requestObject );
    data.authData = service_api.getAuthByPratilipiIdBatch_v1( requestObject );
    data.userPratilipiData = service_api.getUserPratilipiByIdBatch_v1( requestObject );
    requestObject.authorId = data.pratilipiData.map( function( pratilipiObject ) { return pratilipiObject.authorId; } ).toString();
    data.authorData = await service_api.getAuthorByIdBatch_v1( requestObject );
    data.socialData = await data.socialData;
    data.authData = await data.authData;
    data.libraryData = await data.libraryData;
    data.userPratilipiData = await data.userPratilipiData;
  }
  return data;
}

function createErrorObject( code, message ) {
  // Create an error
  var error = new Error( message );
  error.name = code;
  // Throw an error
  throw error;
}

module.exports = {
  getPratilipi_v1 : getPratilipi_v1
};