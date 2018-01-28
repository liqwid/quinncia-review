import * as React from 'react'
import styled from 'styled-components'

export interface ImageProps {
  src: string
}

const MARGIN = 10
const BORDER = 3

const Img = styled.img`
  max-height: 400px;
  max-width: calc(100vw - ${2 * MARGIN + 2 * BORDER}px);
  margin: ${MARGIN}px;
  border: ${BORDER}px solid black;
`

export function Image({ src }: ImageProps) {
  return <Img src={`img/${src}`} />
}
