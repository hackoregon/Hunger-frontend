import { default as React, PropTypes } from 'react'
import Bar from './CCBar'
export default class HorizontalBarChart extends React.Component {

  render() {
    const { data, title, colors } = this.props
    const sumOfDataValues = data.map(function(item) {
      return item.value
    }).reduce(function(last, current) {
      return last + current
    })
    let bars = data.map(function(item, index) {
      return (<Bar key={index} label={item.label} position={index} backgroundColor={colors[index]} value={item.value} sumOfDataValues={sumOfDataValues} />)
    })
    return (
      <div className="barchart-root">
      <h1>{title}</h1>
      {bars}
      </div>
    )
  }
}

HorizontalBarChart.propTypes = {
  title: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.number,
  })).isRequired,
  colors: PropTypes.arrayOf(PropTypes.string)
}

HorizontalBarChart.defaultProps = {
  title: "Bar Chart Data",
}
