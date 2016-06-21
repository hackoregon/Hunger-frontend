import { default as React, PropTypes } from 'react'
import Bar from './CCBar'
export default class HorizontalBarChart extends React.Component {

  render() {
    const { data, title, colors } = this.props
    const longestBar = Math.max(...data.map(bar => bar.value))
    const bars = data.map(function(item, index) {
      return (<Bar key={index} label={item.label} description={item.description} position={index} backgroundColor={colors[index]} value={item.value} longestBar={longestBar} />)
    })
    return (
      <div className="barchart-root">
      <h1 className="section-heading text-center">{title}</h1>
      {bars}
      <div className="barchart-notes">
        <p>
        <strong>DATA HINT</strong>: Transportation expenses include car insurance, gas, oil, registration, repairs and monthly payments OR public transportation for commuting to and from work and day care plus a weekly shopping trip.
        </p>
        <p>
        Miscellaneous expenses include clothing, shoes, paper products, diapers, nonprescription medications, cleaning products, household items, personal items and telephone service.
        </p>
      </div>
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
