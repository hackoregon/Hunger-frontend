import React, { PropTypes } from 'react'

require('./HorizontalRule.css')

// props.children should be either an <img> or a <span>

const HorizontalRule = (props) => (
  <div className="hr-root">
    <div className="hr-wrapper">
      <div className="hr-line"></div>
      {props.children}
    </div>
  </div>
)

export default HorizontalRule
