import * as React from 'react'
import { Image, ImageProps, ImageState } from './Image'
import { IMG_PATH, deleteImage } from 'services/images'
import { shallow, ShallowWrapper } from 'enzyme'
import { setAvatar } from 'services/avatar'

jest.mock('services/avatar')
jest.mock('services/images')

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

  describe('DeleteIcon', () => {
    it('should render DeleteIcon only if hover is true', () => {
      wrapper.setState({ hover: true })
      expect(wrapper.find('DeleteIcon')).toHaveLength(1)

      wrapper.setState({ hover: false })
      expect(wrapper.find('DeleteIcon')).toHaveLength(0)
    })

    it('should call deleteImage on DeleteIcon click', () => {
      wrapper.setState({ hover: true })
      wrapper.find('DeleteIcon').simulate('click')
      expect(deleteImage).toHaveBeenCalledTimes(1)
      expect(deleteImage).toHaveBeenCalledWith(src)
      deleteImage.mockClear()
    })
  })

  describe('SetAvatarIcon', () => {
    it(`should render SetAvatarIcon only if hover is true`, () => {
      wrapper.setState({ hover: true })
      expect(wrapper.find('SetAvatarIcon')).toHaveLength(1)

      wrapper.setState({ hover: false })
      expect(wrapper.find('SetAvatarIcon')).toHaveLength(0)
    })

    it('should call setAvatar on SetAvatarIcon click', () => {
      wrapper.setState({ hover: true })
      wrapper.find('SetAvatarIcon').simulate('click')
      expect(setAvatar).toHaveBeenCalledTimes(1)
      expect(setAvatar).toHaveBeenCalledWith(src)
    })
  })
})
