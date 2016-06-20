import React from 'react'
import ReactDOM from 'react-dom'
import App from './src/components/App/App.js'
import { Router, Route, browserHistory } from 'react-router'
import Team from './src/components/Team/Team'
import About from './src/components/About/About'
import DataDeepDive from './src/components/DataDeepDive/DataDeepDive'

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App} />
    <Route path="about" component={About} />
    <Route path="team" component={Team} />
    <Route path="data-deep-dive" component={DataDeepDive} />
  </Router>
),
  document.getElementById('app-container'))
