import { Observable } from 'rxjs/Observable'
import { AjaxResponse, AjaxRequest } from 'rxjs/observable/dom/AjaxObservable'
import 'rxjs/add/observable/dom/ajax'

/**
 * API abstraction layer
 */

function get({ url, headers }: AjaxRequest): Observable<string[]> {
  return Observable.ajax
          .get(<string> url, headers)
          .map((res: AjaxResponse) => res.response)
}

/**
 * Special post method is used to be able to track upload progress
 */
function post({url, body, headers, progressSubscriber}: AjaxRequest): Observable<string> {
  return Observable.ajax({
    url,
    body,
    headers,
    method: 'POST',
    crossDomain: true,
    progressSubscriber
  })
  .map((res: AjaxResponse) => res.response)
}

function put({ url, body, headers }: AjaxRequest): Observable<string> {
  return Observable.ajax
          .put(<string> url, body, headers)
          .map((res: AjaxResponse) => res.response)
}

function httpDelete({ url, body, headers }: AjaxRequest): Observable<string> {
  return Observable.ajax
          .delete(<string> url, headers)
          .map((res: AjaxResponse) => res.response)
}

/**
 * HACK: delete is reserved word, thus batch export is used to rename it
 */
export default {
  get,
  post,
  put,
  delete: httpDelete,
}
