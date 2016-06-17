import React, { Component, PropTypes } from 'react'
import {
    Chart,
    DataSeries,
    Pie
} from 'diffract'

require('./DonutChart.css')

const colors = [
  'rgba(220, 102, 50, 0.2)',
  'rgba(220, 102, 50, 1)'
]
const width = 240
const height = 240

class DonutChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      total: 0,
      currValue: 50,
      currLabel: 'meals missing',
      values: [],
      labels: []
    }
    this.setLabel = this.setLabel.bind(this)
    this.animateLabel = this.animateLabel.bind(this)
  }

  componentWillMount() {
    const labels = this.props.labels || []
    this.setState({
      total: this.props.total,
      values: [...this.props.values],
      currValue: this.props.values[0],
      labels: [...labels]
    })
  }
  componentWillReceiveProps(nextProps) {
    const labels = nextProps.labels || []
    this.setState({
      total: nextProps.total,
      values: [...nextProps.values],
      currValue: nextProps.values[0],
      labels: [...labels]
    })
  }

  getColors(d, i) {
    if (arguments.length === 2) {
      return colors[i]
    } else {
      return colors[d]
    }
  }

  setLabel(v, i) {
    this.setState({ currValue: v, currLabel: this.state.labels[i] })
  }

  animateLabel(i, _this) {
    let j = i + 1
    let nextVal = i <= _this.state.values.length ? _this.state.values[j] : _this.state.values[0]
    _this.setLabel(nextVal, j)
  }

  render() {
    let { costPerMeal, mealsShort, extraMeals } = this.props
    return (
      <div className="donut-chart-root">
        <p className="donut-cost-of-meal-text">
          The cost of a meal in your county is <span className="donut-dynamic-text donut-cost-of-meal-cost">
          ${costPerMeal}
          </span>
        </p>
        <Chart width={width} height={height}>
          <DataSeries data={this.state.values}>
            <Pie innerRadius={72} outerRadius={80} style={(d, i) => ({ fill: this.getColors(i) })}>
              {this.props.children}
            </Pie>
          </DataSeries>
        </Chart>
        <p className="donut-meals-short-text">
          <span className="donut-meals-short-text" style={extraMeals === 0 ? {} : { display: "none" }}>
          You are <span className="dynamic-text">{mealsShort}</span> meals short this month
          </span>
          <span className="afford-extra-meals" style={extraMeals > 0 ? {} : { display: "none" }}>
          You can now afford <span className="dynamic-text">{extraMeals}</span> extra meals this month
          </span>
        </p>
      </div>
    )
  }
}
DonutChart.defaultProps = {
  costPerMeal: '???',
  mealsShort: '??',
}
DonutChart.propTypes = {
  total: PropTypes.number.isRequired,
  values: PropTypes.array.isRequired,
  currValue: PropTypes.number,
  labels: PropTypes.array,
  mealsShort: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  costPerMeal: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  extraMeals: PropTypes.number,
  children: PropTypes.element,
}

export default DonutChart
