const SERVICE_ENDPOINT = require( '../config/service-endpoint.js' );

const _ = require( 'lodash' );

// Calling the http module
const http = require('http');

// Calling the request module
const request_promise = require( 'request-promise' );

//Setting global agent to manage the connection socket pool
http.globalAgent.keepAlive = true;
http.globalAgent.options.keepAlive = true;

//GET
async function getLibraryByReferenceIdAndUserId_v1( requestObject ) {
  try{
    var requestObject2 = createRequestObject( {
      method : 'GET',
      url : `${ SERVICE_ENDPOINT.LIBRARY }/v1.0`,
      qs : {
        referenceId : requestObject.pratilipiId
      },
      headers : {
        'User-Id' : requestObject.userId,
        'Service-Version' : requestObject.serviceVersion
      }
    }, requestObject );
    responseObject2 = await forwardRequest( requestObject2 );
    return responseObject2;
  } catch( error ) {
    console.error( 'Error : getLibraryByReferenceIdAndUserId_v1 : ' + error );
    throw error;
  }
}

async function getPratilipiByIdBatch_v1( requestObject ) {
  try{
    var requestObject2 = createRequestObject( {
      method : 'GET',
      url : `${ SERVICE_ENDPOINT.PRATILIPI }/metadata`,
      qs : {
        id : requestObject.pratilipiId
      },
      headers : {
        'User-Id' : requestObject.userId,
        'Service-Version' : requestObject.serviceVersion
      }
    }, requestObject );
    responseObject2 = await forwardRequest( requestObject2 );
    return responseObject2;
  } catch( error ) {
    console.error( 'Error : getPratilipiByIdBatch_v1 : ' + error );
    throw error;
  }
}

async function getPratilipiBySlugBatch_v1( requestObject ) {
  try{
    var requestObject2 = createRequestObject( {
      method : 'GET',
      url : `${ SERVICE_ENDPOINT.PRATILIPI }/metadata`,
      qs : {
        slug : requestObject.slug
      },
      headers : {
        'User-Id' : requestObject.userId,
        'Service-Version' : requestObject.serviceVersion
      }
    }, requestObject );
    responseObject2 = await forwardRequest( requestObject2 );
    return responseObject2;
  } catch( error ) {
    console.error( 'Error : getPratilipiBySlugBatch_v1 : ' + error );
    throw error;
  }
}

async function getUserPratilipiByIdBatch_v1( requestObject ) {
  try{
    var requestObject2 = createRequestObject( {
      method : 'GET',
      url : `${ SERVICE_ENDPOINT.USER_PRATILIPI }`,
      qs : {
        id : requestObject.pratilipiId,
      },
      headers : {
        'User-Id' : requestObject.userId,
        'Service-Version' : requestObject.serviceVersion
      }
    }, requestObject );
    responseObject2 = await forwardRequest( requestObject2 );
    return responseObject2;
  } catch( error ) {
    console.error( 'Error : getUserPratilipiByIdBatch_v1 : ' + error );
    return {};
  }
}

async function getAuthorByIdBatch_v1( requestObject ) {
  try{
    var requestObject2 = createRequestObject( {
      method : 'GET',
      url : `${ SERVICE_ENDPOINT.AUTHOR }/meta_data`,
      qs : {
        id : requestObject.authorIds,
        includeState : 'DELETED'
      },
      headers : {
        'User-Id' : requestObject.userId,
        'Service-Version' : requestObject.serviceVersion
      }
    }, requestObject );
    responseObject2 = await forwardRequest( requestObject2 );
    return responseObject2;
  } catch( error ) {
    console.error( 'Error : getAuthorByIdBatch_v1 : ' + error );
    throw error;
  }
}

async function getSocialReviewCountByPratilipiIdBatch_v2( requestObject ) {
  try{
    var requestObject2 = createRequestObject( {
      method : 'GET',
      url : `${ SERVICE_ENDPOINT.SOCIAL }/v2.0/reviews/count`,
      qs : {
        referenceId : requestObject.pratilipiId,
        referenceType : 'pratilipis'
      },
      headers : {
        'User-Id' : requestObject.userId,
        'Service-Version' : requestObject.serviceVersion
      }
    }, requestObject );
    responseObject2 = await forwardRequest( requestObject2 );
    return responseObject2;
  } catch( error ) {
    console.error( 'Error : getSocialReviewCountByPratilipiIdBatch_v2 : ' + error );
    throw error;
  }
}

async function getAuthByPratilipiIdBatch_v1( requestObject ) {
  try{
    var requestObject2 = createRequestObject( {
      method : 'GET',
      url : `${ SERVICE_ENDPOINT.AUTH }/isAuthorized`,
      qs : {
        method : 'PATCH',
        resource : '/pratilipis',
        id : requestObject.pratilipiId
      },
      headers : {
        'User-Id' : requestObject.userId,
        'Service-Version' : requestObject.serviceVersion
      }
    }, requestObject );
    responseObject2 = await forwardRequest( requestObject2 );
    return responseObject2;
  } catch( error ) {
    console.error( 'Error : getAuthByPratilipiIdBatch_v1 : ' + error );
    throw error;
  }
}

async function forwardRequest( options ) {
  var body = await request_promise( options );
  return body;
}

function createRequestObject( requestUrlObject, requestObject ) {
  var qs = undefined;
  var body = undefined;
  var form = undefined;
  var headers = {
    "Access-Token" : requestObject.accessToken,
    "Client-Type" : requestObject.clientType,
    "Client-Version" : requestObject.clientVersion,
    "Request-Id" : requestObject.requestId,
    "Service-Version" : requestObject.serviceVersion,
    "Service-Id" : "OASIS",
    "User-Id" : requestObject.userId
  };
  var requestObject2 = {
    method : requestUrlObject.method,
    url : requestUrlObject.url,
    qs : ( requestUrlObject.qs || qs ) ? _.assignIn( {}, qs, requestUrlObject.qs ) : undefined,
    body : ( requestUrlObject.body || body ) ? _.assignIn( {}, body, requestUrlObject.body ) : undefined,
    form : ( requestUrlObject.form || form ) ? _.assignIn( {}, form, requestUrlObject.form ) : undefined,
    headers : ( requestUrlObject.headers || headers ) ? _.assignIn( {}, headers, requestUrlObject.headers ) : undefined,
    forever : true,
    json : true
  };
  return requestObject2;
}

module.exports = {
  getLibraryByReferenceIdAndUserId_v1 : getLibraryByReferenceIdAndUserId_v1,
  getPratilipiByIdBatch_v1 : getPratilipiByIdBatch_v1,
  getPratilipiBySlugBatch_v1 : getPratilipiBySlugBatch_v1,
  getUserPratilipiByIdBatch_v1 : getUserPratilipiByIdBatch_v1,
  getAuthorByIdBatch_v1 :getAuthorByIdBatch_v1,
  getSocialReviewCountByPratilipiIdBatch_v2 : getSocialReviewCountByPratilipiIdBatch_v2,
  getAuthByPratilipiIdBatch_v1 : getAuthByPratilipiIdBatch_v1
};
