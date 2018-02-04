import * as React from 'react'
import { IMG_PATH, Image, ImageProps, ImageState } from './Image'
import { shallow, ShallowWrapper } from 'enzyme'

const src: string = 'src'

describe('Image component', () => {
  let wrapper: ShallowWrapper<ImageProps, ImageState>
  beforeEach(() => {
    const props: ImageProps = { src }
    wrapper = shallow(<Image {...props} />)
  })
  describe('ImageWrapper', () => {
    let imageWrapper: ShallowWrapper
    beforeEach(() => {
      imageWrapper = wrapper.find('ImageWrapper')
    });
    it('should render ImageWrapper', () => {
      expect(imageWrapper).toHaveLength(1)
    })

    it('should set hover state to true on mouse enter', () => {
      expect(wrapper.state('hover')).toBe(false)
      imageWrapper.simulate('mouseenter')
      expect(wrapper.state('hover')).toBe(true)
    })

    it('should set hover state to false on mouse leave', () => {
      imageWrapper.simulate('mouseenter')
      expect(wrapper.state('hover')).toBe(true)
      imageWrapper.simulate('mouseleave')
      expect(wrapper.state('hover')).toBe(false)
    })
  })

  describe('Img', () => {
    it('should render Img', () => {
      expect(wrapper.find('Img')).toHaveLength(1)
    })
    it(`should prepend ${IMG_PATH} img to src`, () => {
      expect(wrapper.find('Img').prop('src'))
      .toEqual(`${IMG_PATH}${src}`)
    })
  })

  it(`should render DeleteIcon only if hover is true`, () => {
    wrapper.setState({ hover: true })
    expect(wrapper.find('DeleteIcon')).toHaveLength(1)

    wrapper.setState({ hover: false })
    expect(wrapper.find('DeleteIcon')).toHaveLength(0)
  })
})
