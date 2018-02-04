import http from 'services/api'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { AjaxResponse } from 'rxjs/observable/dom/AjaxObservable'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/startWith'
import 'rxjs/add/operator/mergeMapTo'
import 'rxjs/add/operator/shareReplay'
export const AVATAR_URL = '/avatar'

const avatarFetchHandle: Subject<void> = new Subject()
const avatarState: BehaviorSubject<string | null> = new BehaviorSubject(null)

const avatar$ = avatarFetchHandle
                .startWith(null)
                .switchMap(fetchAvatar)
                .flatMapTo(avatarState.asObservable())
                .shareReplay(1)

function fetchAvatar() {
  return http.get({ url: AVATAR_URL })
              .map((res: AjaxResponse) => res.response)
              .do((avatarUrl: string | null) => avatarState.next(avatarUrl))
}

export function getAvatar$(): Observable<string | null> {
  return avatar$
}

export function setAvatar(imageUrl: string) {
  return http.put({ url: AVATAR_URL, body: imageUrl })
             .subscribe(() => avatarState.next(imageUrl || null))
}

export function deleteAvatar() {
  setAvatar('')
}
