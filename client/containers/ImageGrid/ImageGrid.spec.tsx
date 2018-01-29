import 'jsdom-global/register'
import * as React from 'react'
import { Loader } from 'components/Loader'
import { Image } from 'components/Image'
import { ImageGrid, ImageGridProps, ImageGridState, ERROR_TEXT, REFRESH_TEXT } from "./ImageGrid"
import { shallow, mount, ShallowWrapper } from 'enzyme'
import { getImages$ } from 'services/images'

const IMAGE_URLS = [ 'url1', 'url2' ]

jest.mock('services/images')

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

  it('should call getImage$ upon load', () => {
    mount(<ImageGrid />)
    expect(getImages$).toHaveBeenCalledTimes(1)
  })
})
