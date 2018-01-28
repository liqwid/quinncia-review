import * as React from 'react'
import { Image } from 'components/Image'

import { Subject } from 'rxjs/Subject'
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/takeUntil'
import { getImages$, refreshImages, ImageStream, SuccessImageMessage, ImageMessage,
  LOADING, SUCCESS, ERROR } from 'services/images'

export interface ImageGridProps {}

export interface ImageGridState {
  imageUrls: string[]
  loading: boolean
  error: boolean
}

export class ImageGrid extends React.Component<ImageGridProps, ImageGridState> {
  unsubscribe$: Subject<void>

  constructor(props: ImageGridProps) {
    super(props)

    this.state = {
      imageUrls: [],
      loading: true,
      error: false
    }
  }

  componentDidMount() {
    this.unsubscribe$ = new Subject()
    this.connectImageService()
  }

  componentWillUnmount() {
    this.unsubscribe$.next()
  }

  connectImageService() {
    // Get an instance of images stream
    const images$: ImageStream = getImages$()
    // Auto unsubscribe when this.unsubscribe$.next is called
    .takeUntil(this.unsubscribe$)

    images$
    .filter(({ state }: ImageMessage): boolean => state === LOADING)
    .subscribe(() => this.setState({ loading: true, error: false }))

    images$
    .filter(({ state }: SuccessImageMessage): boolean => state === SUCCESS)
    .subscribe(({ imageUrls }: SuccessImageMessage) => this.setState({ loading: false, error: false, imageUrls }))

    images$
    .filter(({ state }: ImageMessage): boolean => state === ERROR)
    .subscribe(() => this.setState({ loading: false, error: true }))
  }

  render() {
    const { imageUrls, loading, error } = this.state

    return (
      <div>
        {
          error && <div>
            <p>Failed to load images</p>
            <a href='' onClick={refreshImages}>Try again</a>
          </div>
        }
        {
          loading && <div>Loading...</div>
        }
        {
          imageUrls && imageUrls.map((url) =>
            <Image src={url} key={url} />
          )
        }
      </div>
    )
  }
}
