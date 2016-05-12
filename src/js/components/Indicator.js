import React, { PropTypes } from 'react'
require('../../styles/main.scss')

export default class Indicator extends React.Component {
  constructor() {
    super()
  }
  render() {
    return (
      <div className="indicator-root">
        <div className="indicator-outer-wrapper">
          <div className="indicator-blocks-wrapper">
            <span className="ind-block block-1"></span>
            <span className="ind-block block-2"></span>
            <span className="ind-block block-3"></span>
            <span className="ind-block block-4"></span>
          </div>
          <div className="indicator-line-wrapper">
            <div className="indicator-arrow top-arrow"></div>
            <div className="indicator-line"></div>
            <div className="indicator-arrow bottom-arrow"></div>
          </div>
        </div>
      </div>
    )
  }
}
