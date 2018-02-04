import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/of'

export default {
  get: jest.fn(() => Observable.of({ response: [] })),
  put: jest.fn(() => Observable.of({ response: null })),
  post: jest.fn(() => Observable.of({ response: null })),
  delete: jest.fn(() => Observable.of({ response: null })),
}
