import OAuthManager from './OAuthManager'
import { } from './json-util'
import { test } from './gsheets-util'

const startJSONToGoogleSheets = async () => {
  try {
    const oAuthManager = new OAuthManager()
    await oAuthManager.authorize({ 
      clientId: '379508062413-4gvtpbs4bgqjn70qvk047dmbfasbu2t7.apps.googleusercontent.com', 
      clientSecret: 'NIXTL9w-gWSe5YV8DOoewkYD', 
      redirectUri: 'urn:ietf:wg:oauth:2.0:oob' 
    })

    oAuthManager.invokeTask(test)
  } catch (e) {
    console.error('Failed to create oAuthManager instance')
    console.error(e)
  }
}

startJSONToGoogleSheets()