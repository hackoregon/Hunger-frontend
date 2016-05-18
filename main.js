import jQuery from 'jquery'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './src/js/components/App'

ReactDOM.render(
  <App sliderMax={2000} />,
  document.getElementById('app-container'))
