const JG = require( '../../dist/index' )
const credential = require( '../res/credential.json' )
const path = require( 'path' )
const fs = require( 'fs' )

const FILE_NAME = 'i18n-test'
const SHEET_NAME = 'dictionary'
const DEFAULT_LOCALES = [ 'en-US', 'ko-KR', 'zh-CN' ]

async function authorize () {
  const jsonToGoogleSheet = new JG.JSONToGoogleSheet( { isCachedTokenRequired: true } )

  await jsonToGoogleSheet.authorize( {
    clientId: credential.clientId,
    clientSecret: credential.clientSecret,
    redirectUri: credential.redirectUri
  } )

  return jsonToGoogleSheet
}

async function getLocaleData () {
  const localePath = path.resolve( __dirname, '../res/en-US.json' )
  const locale = fs.readFileSync( localePath )
  return JG.getFlattedJSON( JSON.parse( locale.toString() ) )
}

async function getSpreadSheetId ( jsonToGoogleSheet, fileName ) {
  let query = {
    q: `mimeType='application/vnd.google-apps.spreadsheet' and name contains '${ fileName }'`
  }
  const { data: resListFiles } = await jsonToGoogleSheet.invokeTask( JG.listFiles, query )
  if ( resListFiles.files && resListFiles.files.length > 0 ) return resListFiles.files[ 0 ].id

  query = {
    resource: {
      properties: {
        title: fileName
      },
      sheets: [
        {
          properties: {
            title: SHEET_NAME
          },
        }
      ]
    }
  }
  const { data: resCreateSheet } = await jsonToGoogleSheet.invokeTask( JG.createSheet, query )
  return resCreateSheet.spreadsheetId
}

async function getSpreadSheetData ( jsonToGoogleSheet, id ) {
  const query = {
    spreadsheetId: id,
    range: SHEET_NAME,
    majorDimension: 'ROWS',
  }
  const { data } = await jsonToGoogleSheet.invokeTask( JG.getSheet, query )
  if ( !data.values ) return [ [ 'key', ...DEFAULT_LOCALES ] ]
  if ( typeof data.values[ 0 ] === 'string' ) return [ data.values ]
  return data.values
}

async function upload ( jsonToGoogleSheet, spreadSheetId, sheetData, localData ) {
  const { updatedKeys, updatedRowIndexes, sheet: mergedData } = JG.mergeJSONWithSheetData( sheetData, localData, 'en-US' )

  // Clear
  let query = {
    spreadsheetId: spreadSheetId,
    range: SHEET_NAME
  }
  await jsonToGoogleSheet.invokeTask( JG.clearSheet, query )

  // Update
  query = {
    spreadsheetId: spreadSheetId,
    range: SHEET_NAME,
    valueInputOption: "USER_ENTERED",
    resource: {
      majorDimension: "ROWS",
      values: mergedData
    }
  }

  await jsonToGoogleSheet.invokeTask( JG.updateSheet, query )
}

async function runTest () {
  try {
    const jsonToGoogleSheet = await authorize()
    const localData = await getLocaleData()
    const spreadSheetId = await getSpreadSheetId( jsonToGoogleSheet, FILE_NAME )
    const sheetData = await getSpreadSheetData( jsonToGoogleSheet, spreadSheetId )
    await upload( jsonToGoogleSheet, spreadSheetId, sheetData, localData )
  } catch ( e ) {
    console.error( e )
    process.exit( -1 )
  }
}

runTest()