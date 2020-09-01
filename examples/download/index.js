const JG = require( '../../dist/index' )
const credential = require( '../../credential.json' )
const path = require( 'path' )
const fs = require('fs')

const FILE_NAME = 'i18n-test'
const SHEET_NAME = 'dictionary'
const DEFAULT_LOCALES = [ 'en-US', 'ko-KR', 'zh-CN' ]

function cleanPreviousResult () {
  const resultPath = path.resolve(__dirname, `./result`)
  if (fs.existsSync(resultPath)) {
    const files = fs.readdirSync(resultPath)
    files.forEach((file) => {
      const filePath = path.resolve(__dirname, `./result/${file}`)
      fs.unlinkSync(filePath)
    })
  }
}

async function authorize () {
  const jsonToGoogleSheet = new JG.JSONToGoogleSheet( { isCachedTokenRequired: true } )

  await jsonToGoogleSheet.authorize( {
    clientId: credential.clientId,
    clientSecret: credential.clientSecret,
    redirectUri: credential.redirectUri
  } )

  return jsonToGoogleSheet
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

async function writeJSONFiles (sheetData) {
  const jsonData = JG.getJSONFromSheetData(sheetData)
  const locales = Object.keys(jsonData)

  locales.forEach((locale) => {
    const resultFilePath = path.resolve(__dirname, `./result/${locale}.json`)
    JG.writeJSONFile(resultFilePath, jsonData[locale])
    console.log('File created --- ' + resultFilePath)
  })
}

async function runTest () {
  try {
    cleanPreviousResult()
    const jsonToGoogleSheet = await authorize()
    const spreadSheetId = await getSpreadSheetId( jsonToGoogleSheet, FILE_NAME )
    const sheetData = await getSpreadSheetData( jsonToGoogleSheet, spreadSheetId )
    await writeJSONFiles( sheetData )
  } catch ( e ) {
    console.error( e )
    process.exit( -1 )
  }
}

runTest()