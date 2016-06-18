import React, { PropTypes } from "react"

require('./MapView.css')

class MapView extends React.Component {
  constructor() {
    super()
    this.applyColors = this.applyColors.bind(this)
  }

  applyColors(props) {
    const colors = props.fipsColors
    if (colors) {
      let svg = this.refs['map-svg']
      let counties = svg.contentDocument.getElementsByClassName('map-county')
      // convert HTML Collection to Array
      counties = [].slice.call(counties)
      const isDefault = colors.length === 1
      const setFill = isDefault ?
        (c) => { c.setAttribute("fill", colors[0]) } :
        (c) => { c.setAttribute("fill", colors[c.id]) }
      for (let c of counties) {
        setFill(c)
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    this.applyColors(nextProps)
  }

  render() {
    return (
      <div className="mapview-root">
      <div className="mapview-legend">
        <div className="mapview-legend-row">
          <div className="mapview-color mapview-color-1"></div><div className="mapview-label">Sufficient</div>
        </div>
        <div className="mapview-legend-row">
          <div className="mapview-color mapview-color-2"></div><div className="mapview-label">Moderately Sufficient</div>
        </div>
        <div className="mapview-legend-row">
          <div className="mapview-color mapview-color-3"></div><div className="mapview-label">Vulnerable</div>
        </div>
        <div className="mapview-legend-row">
          <div className="mapview-color mapview-color-4"></div><div className="mapview-label">Extremely Vulnerable</div>
        </div>
      </div>
      <object
        onLoad={() => { this.applyColors(this.props) }}
        ref="map-svg"
        id="or-counties-svg"
        type="image/svg+xml"
        data="src/assets/OR_Counties.svg"
      ></object>
      </div>
    )
  }

}
MapView.propTypes = {
  fipsColors: PropTypes.object,
  defaultColor: PropTypes.arrayOf(
    (arr, key, componentName, location, propFullName) => {
      if (!(arr.length === 1 && typeof arr[0] === 'string')) {
        return new Error(
          'Invalid prop `' + propFullName + '` supplied to' +
          ' `' + componentName + '`. Validation failed.'
        )
      }
    }
  )
}

export default MapView
