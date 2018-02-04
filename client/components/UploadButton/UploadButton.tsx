import * as React from 'react'
import styled from 'styled-components'
import { uploadImages } from 'services/images'

const Button = styled.button`
  font-family: Alegreya;
  font-weight: 600px;
  position: absolute;
  bottom: 10px;
  left: 10px;
  width: 180px;
  height: 60px;
  background-color: rgba(242, 164, 164, 0.6);
  border-radius: 20px;
  border: 0px;
  outline: none;
  font-size: 26px;
  color: white;
  cursor: pointer;
`
Button.displayName = 'Button'

export interface UploadButtonProps {}
export interface UploadButtonState {}

export class UploadButton extends React.Component<UploadButtonProps, UploadButtonState> {
  fileInput: HTMLInputElement

  upload(e: React.ChangeEvent<HTMLInputElement>) {
    uploadImages(e.target.files)
  }

  render() {
    const { children } = this.props
    return (
      <Button onClick={() => this.fileInput.click()}>
        <input
          type='file'
          multiple={true}
          accept='image/*'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.upload(e)}
          style={{ display: 'none' }}
          ref={(node: HTMLInputElement) => { this.fileInput = node }}
        />
        {children}
      </Button>
    )
  }
}
