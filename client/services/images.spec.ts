import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'
import 'rxjs/add/operator/takeUntil'
import { getImages$, refreshImages, ImageStream, uploadImages, SUCCESS } from './images'
import http from 'services/api'
import { uploadFile } from 'services/upload'
import { takeUntil } from 'rxjs/operator/takeUntil';

jest.mock('services/api')
jest.mock('services/upload')

let unsubscribe$: Subject<void> = new Subject()
const updateImageMock: jest.Mock = jest.fn()

describe('client image service', () => {
  let image$: ImageStream
  beforeEach(() => {
    image$ = getImages$()
    unsubscribe$.next()
    jest.clearAllMocks()
    updateImageMock.mockClear()
  })
  describe('image stream', () => {
    it('should be an observable', () => {
      expect(image$).toBeInstanceOf(Observable)
    })

    it('should not call http get without subscription', () => {
      expect(http.get).toHaveBeenCalledTimes(0)
    })

    it('should call http get upon first subscribe', () => {
      image$.takeUntil(unsubscribe$).subscribe(() => {})
      expect(http.get).toHaveBeenCalledTimes(1)

      image$.takeUntil(unsubscribe$).subscribe(() => {})
      expect(http.get).toHaveBeenCalledTimes(1)
    })
    it('should update imagesState', () => {
      http.get.mockImplementationOnce(() => Observable.of(['file']))
      refreshImages()
      image$.takeUntil(unsubscribe$).subscribe(updateImageMock)

      expect(updateImageMock).toHaveBeenCalledTimes(1)
      expect(updateImageMock).toHaveBeenCalledWith({
        state: SUCCESS,
        imageUrls: ['file']
      })
    });
  })

  describe('refreshImages', () => {
    it('should trigger http get call', () => {
      image$.takeUntil(unsubscribe$).subscribe(() => {})
      expect(http.get).toHaveBeenCalledTimes(0)

      refreshImages()
      expect(http.get).toHaveBeenCalledTimes(1)
    })
  })

  describe('uploadImages', () => {
    let fileList
    beforeEach(() => {
      fileList = new FileList()
      uploadFile.mockReturnValue(Observable.of(null))
    })
    afterEach(() => {
      refreshImages()
      uploadFile.mockReset()
    })
    it('should call uploadFile for each file', () => {
      fileList.add(new File([ new Blob() ], 'file1'))
      fileList.add(new File([ new Blob() ], 'file2'))
      fileList.add(new File([ new Blob() ], 'file3'))
      uploadImages(fileList)

      expect(uploadFile).toHaveBeenCalledTimes(3)
    })
    it('should update image urls state for each file', () => {
      fileList.add(new File([ new Blob() ], 'file1'))
      fileList.add(new File([ new Blob() ], 'file2'))
      fileList.add(new File([ new Blob() ], 'file3'))

      image$.takeUntil(unsubscribe$).subscribe(updateImageMock)
      updateImageMock.mockClear()

      uploadImages(fileList)
      expect(updateImageMock).toHaveBeenCalledTimes(3)
      expect(updateImageMock.mock.calls).toEqual([
        [{ state: SUCCESS, imageUrls: [ 'file1' ] }],
        [{ state: SUCCESS, imageUrls: [ 'file1', 'file2' ] }],
        [{ state: SUCCESS, imageUrls: [ 'file1', 'file2', 'file3' ] }],
      ])
    })
    it('should not call uploadFile or update state when fileList is null', () => {
      fileList = null
      uploadImages(fileList)
      image$.takeUntil(unsubscribe$).subscribe(updateImageMock)
      updateImageMock.mockClear()

      uploadImages(fileList)

      expect(uploadFile).toHaveBeenCalledTimes(0)
      expect(updateImageMock).toHaveBeenCalledTimes(0)
    })
    it('should not call uploadFile or update state when fileList is empty', () => {
      uploadImages(fileList)
      image$.takeUntil(unsubscribe$).subscribe(updateImageMock)
      updateImageMock.mockClear()

      uploadImages(fileList)

      expect(uploadFile).toHaveBeenCalledTimes(0)
      expect(updateImageMock).toHaveBeenCalledTimes(0)
    })
  })
})
