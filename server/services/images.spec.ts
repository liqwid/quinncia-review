import { join } from 'path'
import { mkdirSync, rmdirSync, writeFileSync, unlinkSync } from 'fs'
import { getImageUrls, IMAGES_PATH } from './images'

jest.mock('utils/paths', () => ({ assetsPath: '.' }))

const STUB_FILES: { [fileName: string]: string } = {
  file1: "text1",
  file2: "text2",
  file3: "text3",
}

describe('images service', () => {
  describe('getImageUrls', () => {
    beforeEach(() => {
      mkdirSync(IMAGES_PATH)
      for (let fileName in STUB_FILES) {
        writeFileSync(join(IMAGES_PATH, fileName), STUB_FILES[fileName])
      }
    })

    afterEach(() => {
      for (let fileName in STUB_FILES) {
        unlinkSync(join(IMAGES_PATH, fileName))
      }
      rmdirSync(IMAGES_PATH)
    })

    it('should return promise that resolves with contents of the img path', () => {
      getImageUrls().then((images) => {
        expect(images).toEqual(Object.keys(STUB_FILES))
      })
    })
  })
})
