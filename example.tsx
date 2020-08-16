import * as React from 'react'
import { render } from 'react-dom'
import { FeedbackForm } from './src/index'

render(
  <FeedbackForm config={{ pid: 'cf5uhp0' }} />,
  document.getElementById('app'),
)
