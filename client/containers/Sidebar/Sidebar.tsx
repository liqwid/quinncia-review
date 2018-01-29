import * as React from 'react'
import styled from 'styled-components'
import { UploadButton } from 'components/UploadButton'

const menuIcon = require('./menuIcon.png')

const WIDTH: number = 200
export const CLOSED_WIDTH: number = 70

const SidebarLayout = styled.div`
  height: 100vh;
  position: fixed;
  width: ${WIDTH}px;
  background-color: rgba(52,76,91,0.9);
`

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
export interface SidebarProps {}

export interface SidebarState {
  open: boolean
}

export class Sidebar extends React.Component<SidebarProps, SidebarState> {
  state = {
    open: false
  }

  toggleSidebar() {
    this.setState({ open: !this.state.open })
  }

  render() {
    const { children } = this.props
    const { open } = this.state
    const left = open ? 0 : CLOSED_WIDTH - WIDTH
    return (
      <SidebarLayout style={{ left }}>
        <MenuIcon src={menuIcon} onClick={() => this.toggleSidebar()}/>
        {open && <UploadButton>Upload</UploadButton>}
        {children}
      </SidebarLayout>
    )
  }
}
