import * as React from 'react'
import { ImageGrid } from 'containers/ImageGrid'
import styled from 'styled-components'

const Layout = styled.div`
  text-align: center;
`

class App extends React.Component {
  render() {
    return (
      <Layout>
        <ImageGrid />
      </Layout>
    )
  }
}

export default App
