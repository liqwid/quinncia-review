import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'
import 'rxjs/add/operator/takeUntil'
import { getAvatar$, setAvatar, deleteAvatar, AVATAR_URL } from './avatar'
import http from 'services/api'

jest.mock('services/api')

const unsubscribe$: Subject<void> = new Subject()
const updateAvatarMock: jest.Mock = jest.fn()
http.get.mockImplementation(() => Observable.of({ response: 'file' }))

describe('avatar service', () => {
  let avatar$: Observable<string | null>
  beforeEach(() => {
    avatar$ = getAvatar$()
    unsubscribe$.next()
    jest.clearAllMocks()
    updateAvatarMock.mockClear()
  })

  describe('avatar stream', () => {
    it('should be an observable', () => {
      expect(avatar$).toBeInstanceOf(Observable)
    })

    it('should not call http get without subscription', () => {
      expect(http.get).toHaveBeenCalledTimes(0)
    })

    it('should call http get upon first subscribe', () => {
      avatar$.takeUntil(unsubscribe$).subscribe(() => {})
      expect(http.get).toHaveBeenCalledTimes(1)

      avatar$.takeUntil(unsubscribe$).subscribe(() => {})
      expect(http.get).toHaveBeenCalledTimes(1)
    })
    it('should update avatarState', () => {
      avatar$.takeUntil(unsubscribe$).subscribe(updateAvatarMock)

      expect(updateAvatarMock).toHaveBeenCalledTimes(1)
      expect(updateAvatarMock).toHaveBeenCalledWith('file')
    })
  })

  describe('setAvatar', () => {
    const imageUrl = 'file'
    it('should call http put with correct params', () => {
      setAvatar(imageUrl)

      expect(http.put).toHaveBeenCalledTimes(1)
      expect(http.put).toHaveBeenCalledWith({
        url: AVATAR_URL,
        body: imageUrl
      })
    })

    it('should update avatar state', () => {
      avatar$.takeUntil(unsubscribe$).subscribe(updateAvatarMock)
      updateAvatarMock.mockClear()

      setAvatar(imageUrl)

      expect(updateAvatarMock).toHaveBeenCalledTimes(1)
      expect(updateAvatarMock).toHaveBeenCalledWith(imageUrl)
    })
  })

  describe('deleteAvatar', () => {
    it('should call http put with correct params', () => {
      deleteAvatar()

      expect(http.put).toHaveBeenCalledTimes(1)
      expect(http.put).toHaveBeenCalledWith({
        url: AVATAR_URL,
        body: ''
      })
    })

    it('should update avatar state', () => {
      avatar$.takeUntil(unsubscribe$).subscribe(updateAvatarMock)
      updateAvatarMock.mockClear()

      deleteAvatar()

      expect(updateAvatarMock).toHaveBeenCalledTimes(1)
      expect(updateAvatarMock).toHaveBeenCalledWith(null)
    })
  })
})
