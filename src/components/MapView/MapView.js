import React, { PropTypes } from "react"

class MapView extends React.Component {
  constructor() {
    super()
    this.applyColors = this.applyColors.bind(this)
  }
  applyColors(colors) {
    let svg = document.getElementById('or-counties-svg')
    console.log(svg.contentDocument)
    let counties = svg.contentDocument.getElementsByClassName('map-county')
    counties = [].slice.call(counties)
    const isDefault = colors.length === 1
    const setFill = isDefault ?
      (c) => { c.setAttribute("fill", colors[0]) } :
      (c) => { c.setAttribute("fill", colors[c.id]) }
    for (let c of counties) {
      setFill(c)
    }
  }

  componentDidMount() {
    let colors = this.props.fipsColors || this.props.defaultColor
    if (colors) {
      this.applyColors(colors)
    }
  }

  render() {
    return (
      <div className="mapview-root">
      <object
        id="or-counties-svg"
        type="image/svg+xml"
        data="src/assets/OR_Counties.svg"
      ></object>
      </div>
    )
  }

}
MapView.propTypes = {
  fipsColors: PropTypes.arrayOf(PropTypes.shape({
    // fips: color string
    fips: PropTypes.string.isRequired
  })),
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
