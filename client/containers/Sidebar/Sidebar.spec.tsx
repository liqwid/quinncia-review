import 'jsdom-global/register'
import * as React from 'react'
import { Subject } from 'rxjs/Subject'
import 'rxjs/add/operator/takeUntil'
import { Sidebar, SidebarProps, SidebarState } from './Sidebar'
import { IMG_PATH, deleteImage } from 'services/images'
import { shallow, mount, ShallowWrapper, ReactWrapper } from 'enzyme'
import { setAvatar, getAvatar$ } from 'services/avatar'
import { UploadButton } from 'components/UploadButton'

jest.mock('services/avatar')
jest.mock('services/images')

const src: string = 'src'

describe('Sidebar', () => {
  let wrapper: ShallowWrapper<SidebarProps, SidebarState>
  beforeEach(() => {
    wrapper = shallow(<Sidebar />)
  })

  describe('MenuIcon', () => {
    let menuWrapper: ShallowWrapper
    beforeEach(() => {
      menuWrapper = wrapper.find('MenuIcon')
    })
    it('should render MenuIcon', () => {
      expect(menuWrapper).toHaveLength(1)
    })

    it('should toggle open state on click', () => {
      const open: boolean = wrapper.state('open')

      menuWrapper.simulate('click')
      const openAfterFirstClick = wrapper.state('open')
      expect(openAfterFirstClick).toBe(!open)

      menuWrapper.simulate('click')
      expect(wrapper.state('open')).toBe(!openAfterFirstClick)
    })
  })

  describe('SidebarLayout', () => {
    let layoutWrapper: ShallowWrapper
    beforeEach(() => {
      layoutWrapper = wrapper.find('SidebarLayout')
    })

    it('should render SidebarLayout', () => {
      expect(layoutWrapper).toHaveLength(1)
    })
  })

  describe('UploadButton', () => {
    it('should render UploadButton only when sidebar is open', () => {
      wrapper.setState({ open: true })
      expect(wrapper.find(UploadButton)).toHaveLength(1)

      wrapper.setState({ open: false })
      expect(wrapper.find(UploadButton)).toHaveLength(0)
    })
  })

  describe('Avatar stream connection', () => {
    let mountWrapper: ReactWrapper<SidebarProps, SidebarState>
    const avatarSubject: Subject<string> = new Subject()
    beforeEach(() => {
      (getAvatar$ as jest.Mock).mockReturnValueOnce(avatarSubject.asObservable())
      getAvatar$.mockClear()
      mountWrapper = mount(<Sidebar />)
    })

    it('should call getAvatar$ upon load', () => {
      expect(getAvatar$).toHaveBeenCalledTimes(1)
    })

    it('should update state avatarUrl state', () => {
      const AVATAR = 'avatar'
      avatarSubject.next(AVATAR)

      expect(mountWrapper.state('avatarUrl')).toBe(AVATAR)
    })

    it('should update state with empty string if avatarUrl is null', () => {
      const AVATAR = null
      avatarSubject.next(AVATAR)

      expect(mountWrapper.state('avatarUrl')).toBe('')
    })
  })
})
