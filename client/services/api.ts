import { Observable } from 'rxjs/Observable'
import { AjaxResponse, AjaxRequest } from 'rxjs/observable/dom/AjaxObservable'
import 'rxjs/add/observable/dom/ajax'

/**
 * API abstraction layer
 */

function get({ url, headers }: AjaxRequest): Observable<AjaxResponse> {
  return Observable.ajax
          .get(<string> url, headers)
}

/**
 * Special post method is used to be able to track upload progress
 */
function post({url, body, headers, progressSubscriber}: AjaxRequest): Observable<AjaxResponse> {
  return Observable.ajax({
    url,
    body,
    headers,
    method: 'post',
    crossDomain: true,
    progressSubscriber
  })
}

function put({ url, body, headers }: AjaxRequest): Observable<AjaxResponse> {
  return Observable.ajax
          .put(<string> url, body, headers)
}

function httpDelete({ url, body, headers }: AjaxRequest): Observable<AjaxResponse> {
  return Observable.ajax
          .delete(<string> url, headers)
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
