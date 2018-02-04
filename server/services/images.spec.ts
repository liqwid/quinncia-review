import { join } from 'path'
import { mkdirSync, rmdirSync, writeFileSync, unlinkSync, readFileSync, readdirSync } from 'fs'
import { getImageUrls, saveImage, deleteImage, IMAGES_PATH } from './images'
import { Buffer } from 'buffer'

jest.mock('utils/paths', () => ({ assetsPath: '.' }))

const STUB_FILES: { [fileName: string]: string } = {
  file1: "text1",
  file2: "text2",
  file3: "text3",
}

describe('images service', () => {
  beforeEach(() => {
    mkdirSync(IMAGES_PATH)
  })
  afterEach(() => {
    rmdirSync(IMAGES_PATH)
  })

  describe('getImageUrls', () => {
    beforeEach(() => {
      for (let fileName in STUB_FILES) {
        writeFileSync(join(IMAGES_PATH, fileName), STUB_FILES[fileName])
      }
    })

    afterEach(() => {
      for (let fileName in STUB_FILES) {
        unlinkSync(join(IMAGES_PATH, fileName))
      }
    })

    it('should return promise that resolves with contents of the img path', (done) => {
      getImageUrls().then((images) => {
        expect(images).toEqual(Object.keys(STUB_FILES))
        done()
      })
    })
  })
  describe('saveImage', () => {
    it('should return promise that resolves with creating of an image', (done) => {
      const imageBuffer = new Buffer('test')
      const image = {
        originalname: 'file',
        buffer: imageBuffer
      }
      saveImage(<Express.Multer.File> image).then(() => {
        const savedImage = readFileSync(`${IMAGES_PATH}/${image.originalname}`)

        expect(savedImage).toEqual(imageBuffer)
        unlinkSync(`${IMAGES_PATH}/${image.originalname}`)
        done()
      })
    })
  })
  describe('deleteiImage', () => {
    beforeEach(() => {
      for (let fileName in STUB_FILES) {
        writeFileSync(join(IMAGES_PATH, fileName), STUB_FILES[fileName])
      }
    })

    afterEach(() => {
      for (let fileName in STUB_FILES) {
        try {
          unlinkSync(join(IMAGES_PATH, fileName))
        } catch (e) {}
      }
    })

    it('should return promise that resolves with deletion of an image', (done) => {
      const fileNames = Object.keys(STUB_FILES)
      const imageName = fileNames[0]
      deleteImage(imageName).then(() => {
        expect(readdirSync(IMAGES_PATH)).toEqual(fileNames.slice(1))
        done()
      })
    })
  })
})
