import OAuthManager from '../src/OAuthManager'

describe('OAuthManager', () => {
  describe('constructor()', () => {
    test('Credential 파일이 올바르지 않은 경우, 에러가 발생한다.', () => {
      expect(true).toBe(false)
    })

    test('Credential 파일이 올바른 경우, isValid 값이 true 여야 한다.', () => {
      expect(true).toBe(false)
    })

    // TODO > 토큰 파일이 있는 경우
    test('토큰 파일이 없는 경우, 토큰을 발급하기 위한 정보를 입력받아서 토큰을 발급해야 한다.', () => {

    })

    // TODO > 토큰 파일이 없는 경우
    test('토큰 파일이 있는 경우, 인증 과정을 거치지 않고 계속할 수 있어야 한다.', () => {
      
    })
  })

})