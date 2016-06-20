import React from 'react'
import ReactDOM from 'react-dom'
import App from './src/components/App/App.js'
import { Router, Route } from 'react-router'
import Team from './src/components/Team/Team.js'

ReactDOM.render((
  <Router>
    <Route path="/" component={App} />
    <Route path="/team" component={Team} />
  </Router>
),
  document.getElementById('app-container'))
