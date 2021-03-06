import 'jsdom-global/register'
import * as React from 'react'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'
import { Loader } from 'components/Loader'
import { Image } from 'components/Image'
import { ImageGrid, ImageGridProps, ImageGridState, ERROR_TEXT, REFRESH_TEXT } from "./ImageGrid"
import { shallow, mount, ShallowWrapper, ReactWrapper } from 'enzyme'
import { getImages$, ImageMessage, refreshImages } from 'services/images'

const { LOADING, SUCCESS, ERROR } = require.requireActual('services/images')

const IMAGE_URLS = [ 'url1', 'url2' ]
const ERROR_MESSAGE = { state: ERROR }
const LOADING_MESSAGE = { state: LOADING }
const SUCCESS_MESSAGE = { state: SUCCESS, imageUrls: IMAGE_URLS }

jest.mock('services/images')
jest.mock('services/avatar')

describe('Image component', () => {
  let wrapper: ShallowWrapper<ImageGridProps, ImageGridState>
  beforeEach(() => {
    wrapper = shallow(<ImageGrid />)
    jest.clearAllMocks()
  })
  it('should render Loader if state.loading is true', () => {
    wrapper.setState({ loading: true })
    expect(wrapper.find(Loader)).toHaveLength(1)
  })
  it('should not render Loader if state.loading is false', () => {
    wrapper.setState({ loading: false })
    expect(wrapper.find(Loader)).toHaveLength(0)
  })

  it('should render error message and refresh link if state.error is true', () => {
    wrapper.setState({ error: true })
    expect(wrapper.find(`p[children="${ERROR_TEXT}"]`)).toHaveLength(1)
    expect(wrapper.find(`a[children="${REFRESH_TEXT}"]`)).toHaveLength(1)
  })
  it('should not render error message and refresh link if state.error is false', () => {
    wrapper.setState({ error: false })
    expect(wrapper.find(`p[children="${ERROR_TEXT}"]`)).toHaveLength(0)
    expect(wrapper.find(`a[children="${REFRESH_TEXT}"]`)).toHaveLength(0)
  })

  it('should render images if state has imageUrls', () => {
    wrapper.setState({ imageUrls: IMAGE_URLS })
    const images = wrapper.find(Image)
    expect(images).toHaveLength(IMAGE_URLS.length)
    expect(images.map((node) => node.prop('src'))).toEqual(IMAGE_URLS)
  })
  it('should not render images if state has not imageUrls', () => {
    wrapper.setState({ imageUrls: [] })
    const images = wrapper.find(Image)
    expect(images).toHaveLength(0)
  })

  describe('Image stream connection', () => {
    let mountWrapper: ReactWrapper<ImageGridProps, ImageGridState>
    const imageSubject: Subject<ImageMessage> = new Subject()
    beforeEach(() => {
      (getImages$ as jest.Mock).mockReturnValueOnce(imageSubject.asObservable())
      mountWrapper = mount(<ImageGrid />)
    })

    it('should call getImage$ upon load', () => {
      expect(getImages$).toHaveBeenCalledTimes(1)
    })

    it('should change state to error on image stream error message', () => {
      imageSubject.next(ERROR_MESSAGE)
      const { loading, error } = mountWrapper.state()
      expect(loading).toBe(false)
      expect(error).toBe(true)
    })
    it('should change state to loading on image stream loading message', () => {
      imageSubject.next(LOADING_MESSAGE)
      const { loading, error } = mountWrapper.state()
      expect(loading).toBe(true)
      expect(error).toBe(false)
    })
    it('should add images to state on image stream success message', () => {
      imageSubject.next(SUCCESS_MESSAGE)
      const { loading, error, imageUrls } = mountWrapper.state()
      expect(loading).toBe(false)
      expect(error).toBe(false)
      expect(imageUrls).toBe(IMAGE_URLS)
    })
    it('should add images to state on image stream success message', () => {
      imageSubject.next(SUCCESS_MESSAGE)
      const { loading, error, imageUrls } = mountWrapper.state()
      expect(loading).toBe(false)
      expect(error).toBe(false)
      expect(imageUrls).toBe(IMAGE_URLS)
    })
  })

  describe('resresh images', () => {
    it('should call refresh images on refresh anchor click', () => {
      wrapper.setState({ error: true })
      wrapper.find(`a[children="${REFRESH_TEXT}"]`).simulate('click')

      expect(refreshImages).toHaveBeenCalledTimes(1)
    })
  })
})
