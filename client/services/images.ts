import http from 'services/api'
import { uploadFile } from 'services/upload'
import { Subject } from 'rxjs/Subject'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { Observable } from 'rxjs/Observable'
import { AjaxResponse } from 'rxjs/observable/dom/AjaxObservable'
import 'rxjs/add/observable/of'
import 'rxjs/add/observable/combineLatest'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/take'
import 'rxjs/add/operator/merge'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/startWith'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/shareReplay'
import 'rxjs/add/operator/concatMapTo'

import { deleteAvatar, getAvatar$ } from 'services/avatar'

type SUCCESS = 'success'
type LOADING = 'loading'
type ERROR = 'error'
type State = SUCCESS | LOADING | ERROR
export type ImageMessage = {
  state: State
  imageUrls: string[]
}
export type ImageStream = Observable<ImageMessage>

export const SUCCESS: SUCCESS = 'success'
export const LOADING: LOADING = 'loading'
export const ERROR: ERROR = 'error'

export const IMAGES_URL = '/images'
export const IMG_PATH = 'img/'

// Control handle to fecth images
const imageFetchHandle: Subject<void> = new Subject()

// State of image urls
const imagesState: BehaviorSubject<string[]> = new BehaviorSubject([])

const images$: ImageStream = Observable.combineLatest(
  imageFetchHandle
  // Initial fetch on first subscription
  .startWith(null)
  // Fetching images
  // switchMap operator cancels previous request
  .switchMap(fetchImages)
,
  imagesState.asObservable()
).map(
  ([ state, imageUrls ]: [ State, string[] ]): ImageMessage => ({ state , imageUrls })
)
// Share latest ImageMessage among subscribers
// so that an additional subscribe won't require to fetch images
.shareReplay(1)

let currentAvatar: string
getAvatar$().subscribe((avatarUrl: string) => {
  currentAvatar = avatarUrl
})

function fetchImages(): Observable<State> {
  return http.get({ url: IMAGES_URL })
              .map((res: AjaxResponse) => res.response)
              .do((imageUrls: string[]) => imagesState.next(imageUrls))
              .map((): State => SUCCESS)
              .catch((): Observable<ERROR> => Observable.of(ERROR))
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

export function uploadImages(files: FileList | null) {
  if (!files) return

  for (let file of Array.from(files)) {
    uploadFile(IMAGES_URL, file)
    .subscribe(() =>
      imagesState.next(imagesState.value.concat(file.name).sort())
    )
  }
}

export function deleteImage(imageName: string) {
  http.delete({
    url: `${IMAGES_URL}/${imageName}`,
  })
  .map((res: AjaxResponse) => res.response)
  .subscribe(() => {
    imagesState.next(
      imagesState.value.filter((name) => name !== imageName)
    )

    // Remove avatar if it has been deleted
    if (currentAvatar === imageName) deleteAvatar()
  })
}
