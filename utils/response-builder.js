const _ = require( 'lodash' );

//GET
function getPratilipi_v1( data ) {
  var responseObject = {};
  responseObject.numberFound = data.libraryData.total;
  responseObject.resultCount = data.libraryData.limit;
  data.dataArray = [];
  for( var index = 0; index < data.libraryData.data.length; index++ ) {
    var dataObject = {};
    dataObject.pratilipiId = data.pratilipiData[ index ].pratilipiId;
    dataObject.title = data.pratilipiData[ index ].title;
    dataObject.titleEn = data.pratilipiData[ index ].titleEn;
    dataObject.displayTitle = data.pratilipiData[ index ].title || data.pratilipiData[ index ].titleEn;
    dataObject.language = data.pratilipiData[ index ].language;
    dataObject.summary = data.pratilipiData[ index ].summary;
    dataObject.pageUrl = data.pratilipiData[ index ].slug || data.pratilipiData[ index ].slugEn;
    dataObject.coverImageUrl = data.pratilipiData[ index ].coverImageUrl;
    dataObject.readPageUrl = data.pratilipiData[ index ].readPageUrl;
    dataObject.writePageUrl = data.pratilipiData[ index ].writePageUrl;
    dataObject.oldContent = data.pratilipiData[ index ].oldContent;
    dataObject.type = data.pratilipiData[ index ].type;
    dataObject.contentType = data.pratilipiData[ index ].contentType;
    dataObject.state = data.pratilipiData[ index ].state;
    dataObject.listingDateMillis = data.pratilipiData[ index ].listingDateMillis;
    dataObject.lastUpdatedDateMillis = data.pratilipiData[ index ].lastUpdatedDateMillis;
    dataObject.pageCount = data.pratilipiData[ index ].pageCount;
    dataObject.readCount = data.pratilipiData[ index ].readCount;
    dataObject.fbLikeShareCount = data.pratilipiData[ index ].fbLikeShareCount;
    dataObject.tags = data.pratilipiData[ index ].systemCategories.map( function( categoryObject ) { return { id : categoryObject.id, name : categoryObject.name, nameEn : categoryObject.name_en } } );
    dataObject.suggestedTags = data.pratilipiData[ index ].suggestedCategories.map( function( categoryObject ) { return categoryObject.name } );
    dataObject.author = {};
    dataObject.author.authorId = data.pratilipiData[ index ].authorId;
    dataObject.author.name = data.authorData[ index ].name;
    dataObject.author.displayName = data.authorData[ index ].displayName;
    dataObject.author.fullName = data.authorData[ index ].fullName;
    dataObject.author.fullNameEn = data.authorData[ index ].fullNameEn;
    dataObject.author.pageUrl = data.authorData[ index ].slug || data.authorData[ index ].slugEn;
    dataObject.author.profileImageUrl = data.authorData[ index ].profileImageUrl;
    dataObject.reviewCount = data.socialData.data[ index ].reviewCount;
    dataObject.ratingCount = data.socialData.data[ index ].ratingCount;
    dataObject.averageRating = data.socialData.data[ index ].averageRating;
    dataObject.hasAccessToUpdate = data.authData.data[ index ].isAuthorized;
    dataObject.addedToLib = data.libraryData.data[ index ].addedToLib;
    if (data.userPratilipiData[dataObject.pratilipiId]) {
      dataObject.userPratilipi = data.userPratilipiData[dataObject.pratilipiId];
    }
    data.dataArray.push( dataObject );
  }
  responseObject = data.dataArray[ 0 ];
  responseObject = createResponseObject( 200, responseObject );
  return responseObject;
}

function createResponseObject( code, data ) {
  // Create a response
  var response = {};
  response.code = code;
  response.data = data;
  return response;
}

module.exports = {
  getPratilipi_v1 : getPratilipi_v1
};