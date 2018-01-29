import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/of'

export const getImages$: jest.Mock = jest.fn(() => Observable.of({}))
export const refreshImages = jest.fn()
