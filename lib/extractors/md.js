var fs = require( 'fs' )
  , marked = require( 'marked' )
  , htmlExtract = require( './html' )
  ;

function extractText( filePath, options, cb ) {
  fs.readFile( filePath, function( error, data ) {
    if ( error ) {
      cb( error, null );
      return;
    }

    var content;

    try {
      content = marked.parse( data.toString() );
    } catch ( err ) {
      cb( err, null );
      return;
    }

    htmlExtract.extractFromText( content, options, cb );
  });
}

module.exports = {
  types: ['text/x-markdown', 'text/markdown'],
  extract: extractText
};
