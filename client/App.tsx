import * as React from 'react'
import { ImageGrid } from 'containers/ImageGrid'
import { Sidebar, CLOSED_WIDTH } from 'containers/Sidebar'
import styled from 'styled-components'

const Layout = styled.div`
  text-align: center;
`

class App extends React.Component {
  render() {
    return (
      <Layout>
        <Sidebar />
        <ImageGrid style={{ marginLeft: CLOSED_WIDTH }} />
      </Layout>
    )
  }
}

export default App
