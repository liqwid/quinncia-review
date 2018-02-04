import * as React from 'react'
import { Image } from 'components/Image'
import { Loader } from 'components/Loader'

import { Subject } from 'rxjs/Subject'
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/takeUntil'
import { getImages$, refreshImages, ImageStream, ImageMessage,
  LOADING, SUCCESS, ERROR } from 'services/images'

export const ERROR_TEXT: string = 'Failed to load images'
export const REFRESH_TEXT: string = 'Try again'

export interface ImageGridProps {
  style?: {}
}

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
    .filter(({ state }: ImageMessage): boolean => state === SUCCESS)
    .subscribe(({ imageUrls }: ImageMessage) => this.setState({ loading: false, error: false, imageUrls }))

    images$
    .filter(({ state }: ImageMessage): boolean => state === ERROR)
    .subscribe(() => this.setState({ loading: false, error: true }))
  }

  render() {
    const { style } = this.props
    const { imageUrls, loading, error } = this.state

    return (
      <div style={style}>
        {
          error && <div>
            <p>{ERROR_TEXT}</p>
            <a href='javascript:void(0)' onClick={refreshImages}>{REFRESH_TEXT}</a>
          </div>
        }
        {
          loading && <Loader />
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
