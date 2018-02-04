import { Observable } from 'rxjs/Observable'
import { AjaxResponse } from 'rxjs/observable/dom/AjaxObservable'
import { Subscriber } from 'rxjs/Subscriber'
import { TeardownLogic } from 'rxjs/Subscription'
import 'rxjs/add/observable/from'
import 'rxjs/add/operator/mergeMap'
import http from 'services/api'

export const FILE_FIELD_NAME: string = 'file'

/**
 * Creating binary form data
 * @param file
 * @returns {FormData} form data with an appended file name/type
 */
export function createFormData(file: File): FormData {
    // Creating form data
    const data: FormData = new FormData()

    // FILE_FIELD_NAME is shared between client and server
    data.append(FILE_FIELD_NAME, file)
    data.append('contentType', file.type)

    return data
}

/**
 * Uploads file to said url
 * @param url url to upload file to
 * @param file
 * @returns {Observable<ProgressEvent | AjaxResponse>} emits progress events and response when upload is finished
 */
export function uploadFile(url: string, file: File): Observable<ProgressEvent | AjaxResponse> {
  return Observable.create((progressSubscriber: Subscriber<ProgressEvent | AjaxResponse>): TeardownLogic => {
    // Creating ajax request
    const request$ = http.post({
      url,
      body: createFormData(file),
      // Connection of progress events
      progressSubscriber
    })

    // Marging progress events with ajax response
    const subscription = request$.subscribe(progressSubscriber)
    return () => subscription.unsubscribe()
  })
}
