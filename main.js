import React from 'react'
import ReactDOM from 'react-dom'
import App from './src/components/App/App.js'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import Team from './src/components/Team/Team'

import DataDeepDive from './src/components/DataDeepDive/DataDeepDive'
import CoreLayout from './src/components/CoreLayout/CoreLayout'

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={CoreLayout} >
    <IndexRoute component={App} />
      <Route path="team" component={Team} />
      <Route path="data-deep-dive" component={DataDeepDive} />
    </Route>
  </Router>
),
  document.getElementById('app-container'))
