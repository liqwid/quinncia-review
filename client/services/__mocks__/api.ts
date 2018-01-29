import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/of'

export default {
  get: jest.fn(() => Observable.of(null)),
  put: jest.fn(() => Observable.of(null)),
  post: jest.fn(() => Observable.of(null)),
  delete: jest.fn(() => Observable.of(null)),
}
