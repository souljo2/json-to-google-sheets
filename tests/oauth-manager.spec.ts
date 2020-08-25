import readline from 'readline'
import mockStdIn from 'mock-stdin'

import OAuthManager from '../src/OAuthManager'

describe('OAuthManager', () => {
  let oAuthManager: OAuthManager

  describe('constructor()', () => {
    test('백업용 드라이브 주소를 생성자에 전달한 경우, Scope의 사이즈가 2여야 한다', () => {
      oAuthManager = new OAuthManager('DUMMY_BACKUP_DRIVE_URL')
      expect(oAuthManager.scopes.length).toBe(2)
      expect(oAuthManager.isBackupRequired).toBe(true)
    })

    test('백업용 드라이브 주소를 생성자에 전달하지 않은 경우, Scope의 사이즈가 1여야 한다', () => {
      oAuthManager = new OAuthManager()
      expect(oAuthManager.scopes.length).toBe(1)
    })
  })

  describe('authorize()', () => {
    test('AuthToken이 없는 경우, Prompt에서 입력을 받아야 한다.', () => {
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
    test('인증 과정을 거치지 않은 Client는 데이터에 접근할 수 없어야 한다.', () => {
      const fakeTask = () => console.log('Do nothing')
      const unAuthorizedOAuthManager = new OAuthManager()

      expect(() => unAuthorizedOAuthManager.invokeTask(fakeTask)).toThrowError(new Error('Unauthorized'))
    })
  })
})