import * as React from 'react'
import { render } from 'enzyme'
import App from './App'

jest.mock('services/avatar')

it('renders without crashing', () => {
  render(<App />)
})
