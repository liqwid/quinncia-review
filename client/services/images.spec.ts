import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'
import 'rxjs/add/operator/takeUntil'
import { getImages$, refreshImages, ImageStream } from './images'
import http from 'services/api'

jest.mock('services/api')

let unsubscribe$: Subject<void> = new Subject()

describe('client image service', () => {
  let image$: ImageStream
  beforeEach(() => {
    image$ = getImages$()
    unsubscribe$.next()
    jest.clearAllMocks()
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
  })

  describe('refreshImages', () => {
    it('should trigger http get call', () => {
      image$.takeUntil(unsubscribe$).subscribe(() => {})
      expect(http.get).toHaveBeenCalledTimes(0)

      refreshImages()
      expect(http.get).toHaveBeenCalledTimes(1)
    })
  })
})
