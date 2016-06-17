import { default as React, PropTypes } from 'react'

require('./CCBarChart.css')

export default class Bar extends React.Component {
  render() {
    const { label, value, longestBar, backgroundColor } = this.props
    const percentage = value / longestBar * 100
    let barStyle = {
      color: "black",
      width: `${percentage}%`,
      backgroundColor: `${backgroundColor}`
    }

    // console.log("barStyle:", barStyle)
    return (
      <div>
        <div className="row">
          <div className="col-xs-2 text-right">
            <p className={`bar-chart-label label-${label}`}>{label}</p>
          </div>
          <div className="col-xs-10">
            <div className="bar-chart-bar" style={barStyle}></div>
            <span className="bar-value">{value}</span>
          </div>
        </div>
      </div>
    )
  }
}

Bar.propTypes = {
  label: PropTypes.string,
  value: PropTypes.number.isRequired,
  position: PropTypes.number.isRequired,
  longestBar: PropTypes.number.isRequired,
  backgroundColor: PropTypes.string,
}
