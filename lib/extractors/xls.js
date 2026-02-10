var path = require( 'path' )
  , ExcelJS = require( 'exceljs' )
  ;

function extractText( filePath, options, cb ) {
  var workbook = new ExcelJS.Workbook()
    , result = ''
    ;

  workbook.xlsx.readFile( filePath )
    .then( function() {
      workbook.eachSheet( function( worksheet ) {
        worksheet.eachRow( function( row ) {
          // row.values is 1-based; slice to drop the empty first element
          var rowValues = row.values.slice( 1 );
          result += rowValues.join( ',' ) + '\n';
        });
      });
      cb( null, result );
    })
    .catch( function( err ) {
      var error = new Error( 'Could not extract ' + path.basename( filePath ) + ', ' + err );
      cb( error, null );
    });
}

module.exports = {
  types: ['application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel.sheet.binary.macroEnabled.12',
    'application/vnd.ms-excel.sheet.macroEnabled.12',
    'application/vnd.oasis.opendocument.spreadsheet',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.template',
    'application/vnd.oasis.opendocument.spreadsheet-template'
  ],
  extract: extractText
};
