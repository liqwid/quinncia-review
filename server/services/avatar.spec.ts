import { readFileSync } from 'fs'
import { readAvatarInfo, saveAvatarInfo, AVATAR_PATH } from './avatar'

jest.mock('utils/paths', () => ({ assetsPath: '.' }))

const STUB_AVATAR = 'image.png'

describe('avatar service', () => {
  it('should create empty avatar file file upon start', () => {
    expect(readFileSync(AVATAR_PATH, 'utf8')).toBe('')
  })

  it('should update avatar link on saveAvatarInfo', (done) => {
    saveAvatarInfo(STUB_AVATAR).then(() => {
      expect(readFileSync(AVATAR_PATH, 'utf8')).toBe(STUB_AVATAR)
      done()
    })
  })

  it('should return avatar link on readAvatarInfo', (done) => {
    saveAvatarInfo(STUB_AVATAR).then(readAvatarInfo)
    .then((avatarInfo) => {
      expect(readFileSync(AVATAR_PATH, 'utf8')).toBe(avatarInfo)
      done()
    })
  })
})
