const _ = require( 'lodash' );


//GET
function getPratilipi_v1( req ) {
  var requestObject = getGenericFields( req );
  requestObject.userId = _.get( req.headers, 'User-Id'.toLowerCase() );
  requestObject.pratilipiId = _.get( req.query, 'pratilipiId' );
  requestObject.slug = _.get( req.query, 'slug' );
  return requestObject;
}

function getGenericFields( req ) {
  var requestObject = {};
  requestObject.accessToken = _.get( req.headers, 'Access-Token'.toLowerCase() );
  requestObject.clientType = _.get( req.headers, 'Client-Type'.toLowerCase() );
  requestObject.clientVersion = _.get( req.headers, 'Client-Version'.toLowerCase() );
  requestObject.requestId = _.get( req.headers, 'Request-Id'.toLowerCase() );
  requestObject.userId = _.get( req.headers, 'User-Id'.toLowerCase() );
  return requestObject;
}

module.exports = {
  getPratilipi_v1 : getPratilipi_v1
};

