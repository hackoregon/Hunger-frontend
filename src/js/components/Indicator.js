import React from 'react'

require('../../styles/main.scss')

export default class Indicator extends React.Component {
  constructor() {
    super()
  }
  render() {
    return (
      <div className="row">
        <div className="col-xs-12 col-sm-4">
          <div className="indicator-blocks">
            <span className="ind-block block-1"></span>
            <span className="ind-block block-2"></span>
            <span className="ind-block block-3"></span>
            <span className="ind-block block-4"></span>
          </div>
        </div>
      </div>
    )
  }
}
