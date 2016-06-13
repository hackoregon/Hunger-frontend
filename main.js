import React from 'react'
import ReactDOM from 'react-dom'
import App from './src/components/App/App.js'

ReactDOM.render(
  <App sliderMax={2000} />,
  document.getElementById('app-container'))
