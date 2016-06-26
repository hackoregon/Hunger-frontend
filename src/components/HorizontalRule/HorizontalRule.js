import React, { PropTypes } from 'react'

require('./HorizontalRule.css')

// props.children should be either an <img> or a <span>

const HorizontalRule = (props) => {
  const style = props.small ? { maxWidth: "75%" } : {}
  return (
    <div className="hr-root">
      <div className="hr-wrapper">
        <div className="hr-line" style={style}></div>
        {props.children}
      </div>
    </div>
  )
}

HorizontalRule.propTypes = {
  small: PropTypes.bool,
}

export default HorizontalRule
