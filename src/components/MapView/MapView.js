import React, { PropTypes } from "react"

class MapView extends React.Component {
  constructor() {
    super()
    this.applyColors = this.applyColors.bind(this)
  }

  applyColors(props) {
    const originalColor = "#669776"
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
