import 'jsdom-global/register'
import * as React from 'react'
import { UploadButton, UploadButtonProps, UploadButtonState } from "./UploadButton"
import { shallow, mount, ShallowWrapper } from 'enzyme'
import { uploadImages } from 'services/images'

jest.mock('services/images')

const STUB_FILES: string[] = ['1', '2']

describe('Image component', () => {
  let wrapper: ShallowWrapper<UploadButtonProps, UploadButtonState>
  beforeEach(() => {
    wrapper = shallow(<UploadButton />)
    jest.clearAllMocks()
  })
  it('should render button', () => {
    expect(wrapper.find('Button')).toHaveLength(1)
  })
  it('should render hidden file input', () => {
    const input = wrapper.find('input')

    expect(input).toHaveLength(1)
    expect(input.props().style.display).toBe('none')
  })

  it('should trigger file input click on button click', () => {
    const mountWrapper = mount(<UploadButton />)
    const onInputClick = jest.fn()
    const inputNode = mountWrapper.find('input').getDOMNode()
    inputNode.addEventListener('click', onInputClick)
    mountWrapper.find('Button').simulate('click')

    expect(onInputClick).toHaveBeenCalledTimes(1)

    inputNode.removeEventListener('click', onInputClick)
  })
  it('should start and upload upon file input change', () => {
    uploadImages.mockImplementationOnce(jest.fn)
    wrapper.find('input').simulate('change', { target: { files: STUB_FILES } })

    expect(uploadImages).toHaveBeenCalledWith(STUB_FILES)
    expect(uploadImages).toHaveBeenCalledTimes(1)
  })
})
