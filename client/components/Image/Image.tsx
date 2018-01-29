import * as React from 'react'
import styled from 'styled-components'

export interface ImageProps {
  src: string
}

const MARGIN: number = 10
const BORDER: number = 3

export const IMG_PATH = 'img/'

export const Img = styled.img`
  max-height: 400px;
  max-width: calc(100vw - ${2 * MARGIN + 2 * BORDER}px);
  margin: ${MARGIN}px;
  border: ${BORDER}px solid black;
`
Img.displayName = 'Img'

export function Image({ src }: ImageProps) {
  return <Img src={`${IMG_PATH}${src}`} />
}
