import readline from 'readline'
import mockStdIn from 'mock-stdin'

import OAuthManager from '../src/OAuthManager'

describe('OAuthManager', () => {
  let oAuthManager: OAuthManager

  describe('constructor()', () => {
    test('If the backup drive address is passed to the constructor, the scope size must be 2', () => {
      oAuthManager = new OAuthManager('FakeBackupDriveURL')
      expect(oAuthManager.scopes.length).toBe(2)
      expect(oAuthManager.isBackupRequired).toBe(true)
    })

    test('If the backup drive address is not passed to the constructor, the scope size must be 2', () => {
      oAuthManager = new OAuthManager()
      expect(oAuthManager.scopes.length).toBe(1)
    })
  })

  describe('authorize()', () => {
    test('It the auth token is not passed, CLI should be appered.', () => {
      const readlineSpy = jest.spyOn(readline, 'createInterface')
      const consoleSpy = jest.spyOn(console, 'info')
      const stdin = mockStdIn.stdin()

      oAuthManager.authorize({
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
      const fakeTask = () => console.log('Do nothing')
      const unAuthorizedOAuthManager = new OAuthManager()

      expect(() => unAuthorizedOAuthManager.invokeTask(fakeTask)).toThrowError(new Error('Unauthorized'))
    })
  })
})