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
  const { data } = await jsonToGoogleSheet.invokeTask( JG.getSheetValues, query )
  if ( !data.values ) return [ [ 'STATUS', 'KEY', ...DEFAULT_LOCALES ] ]
  if ( typeof data.values[ 0 ] === 'string' ) return [ data.values ]
  return data.values
}

async function clearSheet ( jsonToGoogleSheet, spreadsheetId ) {
  const query = {
    spreadsheetId,
    range: SHEET_NAME
  }
  await jsonToGoogleSheet.invokeTask( JG.clearSheetValues, query )
}

async function updateSheet ( jsonToGoogleSheet, spreadSheetId, sheetData, localData ) {
  const { sheet: mergedData, deleted } = JG.mergeJSONWithSheetData( sheetData, localData, 'en-US' )

  // Clear
  let query = {
    spreadsheetId: spreadSheetId,
    range: SHEET_NAME
  }
  await jsonToGoogleSheet.invokeTask( JG.clearSheetValues, query )

  console.log(deleted)

  // Update
  query = {
    spreadsheetId: spreadSheetId,
    range: SHEET_NAME,
    valueInputOption: "USER_ENTERED",
    resource: {
      majorDimension: "ROWS",
      values: [ ...mergedData, ...deleted ]
    }
  }

  await jsonToGoogleSheet.invokeTask( JG.updateSheetValues, query )
}

async function runTest () {
  try {
    const jsonToGoogleSheet = await authorize()
    const localData = await getLocaleData()
    const spreadSheetId = await getSpreadSheetId( jsonToGoogleSheet, FILE_NAME )
    const sheetData = await getSpreadSheetData( jsonToGoogleSheet, spreadSheetId )
    await clearSheet( jsonToGoogleSheet, spreadSheetId )
    await updateSheet( jsonToGoogleSheet, spreadSheetId, sheetData, localData )
  } catch ( e ) {
    console.error( e )
    process.exit( -1 )
  }
}

runTest()