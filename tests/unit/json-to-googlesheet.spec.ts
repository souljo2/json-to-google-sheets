import readline from 'readline'
import mockStdIn from 'mock-stdin'

import JSONToGoogleSheet from '../../src/JSONToGoogleSheet'

describe('JSONToGoogleSheet', () => {
  let jsonToGoogleSheet: JSONToGoogleSheet

  describe('constructor()', () => {
    test('If IsCachedTokenRequired is false, getter should return false', () => {
      jsonToGoogleSheet = new JSONToGoogleSheet()
      expect(jsonToGoogleSheet.isCachedTokenRequired).toBe(false)
    })

    test('If IsCachedTokenRequired is true, getter should return true', () => {
      jsonToGoogleSheet = new JSONToGoogleSheet(true)
      expect(jsonToGoogleSheet.isCachedTokenRequired).toBe(true)
    })
  })

  describe('authorize()', () => {
    test('It the auth token is not passed, CLI should be appered.', () => {
      const readlineSpy = jest.spyOn(readline, 'createInterface')
      const consoleSpy = jest.spyOn(console, 'info')
      const stdin = mockStdIn.stdin()

      jsonToGoogleSheet.authorize({
        clientId: 'FakeClientId',
        clientSecret: 'FakeClientSecret',
        redirectUri: 'FakeRedirectURI'
      })
      expect(readlineSpy).toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalled()

      // Quit prompt
      process.nextTick(() => {
        stdin.send('Invalid code')
      })

      readlineSpy.mockRestore()
      consoleSpy.mockRestore()
    })
  })

  describe('invokeTask()', () => {
    test('Unauthorized client can not invoke the task', () => {
      const fakeTask = () => Promise.resolve(() => console.log('Do nothing'))
      const unAuthorizedOAuthManager = new JSONToGoogleSheet()

      expect(() => unAuthorizedOAuthManager.invokeTask(fakeTask)).toThrowError(new Error('Unauthorized'))
    })
  })
})