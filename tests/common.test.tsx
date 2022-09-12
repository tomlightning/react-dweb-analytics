import * as React from 'react'
import { render } from '@testing-library/react'

import 'jest-canvas-mock'

import { AnalyticsContextProvider } from '../src'

describe('Common render', () => {
  it('renders without crashing', () => {
    render(
    <AnalyticsContextProvider topic="test_topic" ipfsNodeUrl="https://127.0.0.1:4001" >
        <p>Hello</p>
    </AnalyticsContextProvider>)
  })
})