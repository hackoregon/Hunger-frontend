import { default as React, PropTypes } from 'react'

export default class Bar extends React.Component {
  render() {
    const { label, value, sumOfDataValues, position } = this.props
    const percentage = ((value / sumOfDataValues) * 100)
    let barStyle = {
      color: "black",
      background: "",
      borderRadius: "10px",
      height: "3em",
      width: `${percentage}%`
    }
    barStyle.background = this.props.backgroundColor

    // console.log("barStyle:", barStyle)
    return (
      <div>
        <div className="row">
          <div className="col-xs-2 text-right">
            <h2>{label}</h2>
          </div>
          <div className="col-xs-10">
            <div style={barStyle}></div>
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
  sumOfDataValues: PropTypes.number.isRequired,
  backgroundColor: PropTypes.string,
}
