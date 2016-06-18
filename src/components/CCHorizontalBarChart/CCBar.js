import { default as React, PropTypes } from 'react'

require('./CCBarChart.css')

export default class Bar extends React.Component {
  render() {
    const { label, value, longestBar, backgroundColor, description } = this.props
    const percentage = value / longestBar * 100
    let barStyle = {
      color: "black",
      width: `${percentage}%`,
      backgroundColor: `${backgroundColor}`,
      border: `1px solid ${backgroundColor}`
    }
    const labelNoWhitespace = label.replace(/[\s]/g, '')
    // console.log("barStyle:", barStyle)
    return (
      <div className="bar-root">
        <div className="bar-row">
            <p
              title={description || label}
              className={`bar-chart-label label-${labelNoWhitespace}`}>{`${label}`}{": "}<span className="bar-value">{`$${value}`}</span></p>
            <div className="bar-chart-bar" style={barStyle}></div>
        </div>
      </div>
    )
  }
}

Bar.propTypes = {
  label: PropTypes.string,
  description: PropTypes.string,
  value: PropTypes.number.isRequired,
  position: PropTypes.number.isRequired,
  longestBar: PropTypes.number.isRequired,
  backgroundColor: PropTypes.string,
}
