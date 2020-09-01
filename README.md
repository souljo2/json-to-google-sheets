# json-to-google-sheets
> Using Google APIs for uploading/downloading JSON files.  
> It will help you to sync your json data with google sheet. :)

## Install
```bash
$ yarn add -d json-to-google-sheets
```
  
## Usage
```typescript
const JG = require( 'json-to-google-sheets' )

const jsonToGoogleSheet = new JG.JSONToGoogleSheet( { 
  // Saving token as local file
  isCachedTokenRequired: true 
} )

// Get oAuth token
await jsonToGoogleSheet.authorize( {
  clientId: <CLIENT_ID>,
  clientSecret: <CLIENT_SECRET>,
  redirectUri: <REDIRECT_URI>
} )

// Invoke task
const { data: resCreateSheet } = await jsonToGoogleSheet.invokeTask( 
  <GOOGLE-SHEET-UTIL>, 
  <QUERY>
)
```
  
## API references
1. Get Credentials  
https://console.developers.google.com/apis/credentials

2. Sheets APIs  
https://developers.google.com/sheets/api/reference/rest

3. Drive APIs  
https://developers.google.com/drive/api/v3/about-sdk

## License
MIT Licensed