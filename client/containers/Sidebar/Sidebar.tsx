import * as React from 'react'
import { Subject } from 'rxjs/Subject'
import styled from 'styled-components'
import 'rxjs/add/operator/takeUntil'
import { IMG_PATH } from 'services/images'
import { getAvatar$ } from 'services/avatar'

import { UploadButton } from 'components/UploadButton'

const menuIcon = require('./menuIcon.png')

const WIDTH: number = 200
export const CLOSED_WIDTH: number = 70

const SidebarLayout = styled.div`
  height: 100vh;
  position: fixed;
  width: ${WIDTH}px;
  background-color: rgba(52,76,91,0.9);
  background-size: cover;
  background-position: center;
  z-index: 1;
`
SidebarLayout.displayName = 'SidebarLayout'

const MenuIcon = styled.img`
  position: absolute;
  right: 10px;
  top: 10px;
  height: 50px;
  width: 50px;
  border: 1px solid azure;
  border-radius: 25px;
  cursor: pointer;
`
MenuIcon.displayName = 'MenuIcon'

export interface SidebarProps {}

export interface SidebarState {
  open: boolean
  avatarUrl: string
}

export class Sidebar extends React.Component<SidebarProps, SidebarState> {
  unsubscribe$: Subject<void>

  state: SidebarState = {
    open: false,
    avatarUrl: ''
  }

  componentDidMount() {
    this.unsubscribe$ = new Subject()
    this.connectAvatarService()
  }

  componentWillUnmount() {
    this.unsubscribe$.next()
  }

  connectAvatarService() {
    getAvatar$()
    // Auto unsubscribe when this.unsubscribe$.next is called
    .takeUntil(this.unsubscribe$)
    .subscribe((avatarUrl: string | null) => {
      if (!avatarUrl) avatarUrl = ''

      this.setState({ avatarUrl })
    })
  }

  toggleSidebar() {
    this.setState({ open: !this.state.open })
  }

  render() {
    const { children } = this.props
    const { open, avatarUrl } = this.state
    const left = open ? 0 : CLOSED_WIDTH - WIDTH
    return (
      <SidebarLayout
        style={{
          left,
          backgroundImage: avatarUrl && `url(${IMG_PATH}${avatarUrl})` || ''
        }}
      >
        <MenuIcon src={menuIcon} onClick={() => this.toggleSidebar()}/>
        {open && <UploadButton>Upload</UploadButton>}
        {children}
      </SidebarLayout>
    )
  }
}
