import React from 'react'
import ReactDOM from 'react-dom'
import App from './src/components/App/App.js'
import { Router, Route } from 'react-router'


ReactDOM.render((
  <Router>
    <Route path="/" component={App} />
  </Router>
),
  document.getElementById('app-container'))
