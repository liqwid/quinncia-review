import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/of'

export const getImages$: jest.Mock = jest.fn(() => Observable.of({}))
export const refreshImages = jest.fn()
export const uploadImages = jest.fn()

export const LOADING = 'loading'
export const ERROR = 'error'
export const SUCCESS = 'success'
