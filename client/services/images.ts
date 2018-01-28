import http from 'services/api'
import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/of'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/merge'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/startWith'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/shareReplay'

type SUCCESS = 'success'
type LOADING = 'loading'
type ERROR = 'error'
type Message = {
  state: LOADING | ERROR
}
export type SuccessImageMessage = {
  state: SUCCESS
  imageUrls: string[]
}
export type ImageMessage = Message | SuccessImageMessage
export type ImageStream = Observable<ImageMessage>

export const SUCCESS: SUCCESS = 'success'
export const LOADING: LOADING = 'loading'
export const ERROR: ERROR = 'error'

export const IMAGES_URL = '/images'

// Control handle to fecth images
const imageFetchHandle: Subject<void> = new Subject()

// Control handle to update images on client
const imageUpdateHandle: Subject<string[]> = new Subject()
const imageUpdate$: Observable<ImageMessage> = imageUpdateHandle.map(
  (imageUrls: string[]): ImageMessage => ({ state: SUCCESS, imageUrls })
)

const images$: ImageStream = imageFetchHandle
                              // Initial fetch on first subscription
                              .startWith(null)
                              // Fetching images
                              // switchMap operator cancels previous request
                              .switchMap(fetchImages)
                              // Entry point for local image updates
                              .merge(imageUpdate$)
                              // Share latest ImageMessage among subscribers
                              // so that an additional subscribe won't require to fetch images
                              .shareReplay(1)

function fetchImages(): Observable<ImageMessage> {
  return http.get({ url: IMAGES_URL })
              .map((imageUrls: string[]): ImageMessage => ({ state: SUCCESS, imageUrls }))
              .catch((): Observable<ImageMessage> => Observable.of({ state: ERROR }))
}

/**
 * @returns {ImageStream} images stream that will fetch images upon first subscription
 */
export function getImages$(): ImageStream {
  return images$
}

/**
 * Refreshes images
 */
export function refreshImages() {
  imageFetchHandle.next()
}
