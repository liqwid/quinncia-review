import * as React from 'react'
import { IMG_PATH, Image, ImageProps } from './Image'
import { shallow, ShallowWrapper } from 'enzyme'

const src: string = 'src'

describe('Image component', () => {
  let wrapper: ShallowWrapper<ImageProps>
  beforeEach(() => {
    const props: ImageProps = { src }
    wrapper = shallow(<Image {...props} />)
  })
  it('should render img', () => {
    expect(wrapper.find('Img')).toHaveLength(1)
  })
  it(`should prepend ${IMG_PATH} to src`, () => {
    expect(wrapper.find('Img').prop('src'))
    .toEqual(`${IMG_PATH}${src}`)
  })
})
