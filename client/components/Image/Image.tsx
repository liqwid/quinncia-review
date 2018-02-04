import * as React from 'react'
import styled from 'styled-components'

import { deleteImage, IMG_PATH } from 'services/images'

const shuriken = require('./shuriken.png')
export interface ImageProps {
  src: string
}

export interface ImageState {
  hover: boolean
}

const MARGIN: number = 10
const BORDER: number = 3

const ImageWrapper = styled.div`
  position: relative;
  display: inline-block;
`
ImageWrapper.displayName = 'ImageWrapper'

const Img = styled.img`
  max-height: 400px;
  max-width: calc(100vw - ${2 * MARGIN + 2 * BORDER}px);
  margin: ${MARGIN}px;
  border: ${BORDER}px solid black;
`
Img.displayName = 'Img'

const DeleteIcon = styled.img`
  position: absolute;
  top: ${MARGIN + 10}px;
  right: ${MARGIN + 10}px;
  height: 30px;
  width: 30px;
  cursor: pointer;
  transform: rotate(45deg);
  background-color: azure;
  border-radius: 15px;
`
DeleteIcon.displayName = 'DeleteIcon'

export class Image extends React.Component<ImageProps, ImageState> {
  state: ImageState = {
    hover: false
  }

  render() {
    const { src } = this.props
    const { hover } = this.state
    return (
      <ImageWrapper
        onMouseEnter={() => this.setState({ hover: true })}
        onMouseLeave={() => this.setState({ hover: false })}
      >
        <Img src={`${IMG_PATH}${src}`} />
        {hover && <DeleteIcon
          src={shuriken}
          onClick={() => deleteImage(src)}
        />}
      </ImageWrapper>
    )
  }
}
