import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/of'

export const AVATAR = 'avatar'
export const getAvatar$: jest.Mock = jest.fn(() => Observable.of(AVATAR))
export const setAvatar = jest.fn()
export const deleteAvatar = jest.fn()
