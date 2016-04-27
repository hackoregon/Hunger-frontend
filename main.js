import jQuery from 'jquery'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './js/components/App'

window.jQuery = jQuery
require('bootstrap')

ReactDOM.render(<App />, document.getElementById('app-container'))
