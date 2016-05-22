import L from 'leaflet'
import Counties from "../../fixtures/countiesGeoJSON.js"
import React from "react"
import _ from "lodash"

require('leaflet/dist/leaflet.css')
require('./MapView.css')

export default class MapView extends React.Component {

  // NOTE: props -> sufficency, onMapSelect, selectedCounty
  componentDidMount() {
    let token = 'pk.eyJ1IjoibnJiZXJuYXJkIiwiYSI6IjdkMGZhZmMyNmI4YjgzN2I0ZjI2MjUxMWE5MjVjM2I1In0.kAeFFdUCeEc5lOqyaMvHkA'
    let map = L.map('map', {
      zoomControl: false
    }).setView([44.121, -120.587], 6)

    map.dragging.disable()
    map.touchZoom.disable()
    map.doubleClickZoom.disable()
    map.scrollWheelZoom.disable()

    let legend = L.control({
      position: 'bottomright'
    })

    legend.onAdd = function(map) {

      let div = L.DomUtil.create('div', 'info legend')
      div.innerHtml = '<u>Sufficient Households</u><br/>'
      div.innerHtml += '<i class="under"></i>less than half<br/>'
      div.innerHtml += '<i class="sufficient"></i>more than half<br/>'
      div.innerHtml += '<i class="over"></i>almost all<br/>'
      div.innerHTML = div.innerHtml

      return div
    }

    legend.addTo(map)

    let geoLayer = L.geoJson(Counties, {
      style: this.styleLayer.bind(this),
      onEachFeature: this.setupFeature.bind(this),
    })
    geoLayer.addTo(map)

    this.geoLayer = geoLayer
    this.map = map
  }

  setupFeature(feature, layer) {
    layer.on({
      mouseover: this.highlightLayer.bind(this),
      mouseout: this.resetLayer.bind(this),
      click: this.handleClick.bind(this),
    })
  }

  styleLayer(layer) {
    let sufficiency = this.props.sufficiency
    return {
      stroke: true,
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fill: true,
      fillOpacity: 0.7,
      fillColor: this.fillColor(layer, sufficiency)
    }
  }

  fillColor(layer, sufficiency) {
    // let id = layer.properties.name.split(' County')[0]
    // let medianIncome = SampleData[id]["median household income"]
    let percent = 0
    layer = layer.feature || layer
    if (sufficiency && sufficiency[layer.properties.fips]) {
      percent = sufficiency[layer.properties.fips].totalPercent
    }
    switch (true) {
      case (percent > 90):
        return '#ffc928'
      case (percent >= 60):
        return '#1c8677'
      default:
        return '#a8e0d8'
    }
  }

  highlightLayer(event) {
    let layer = event.target

    layer.setStyle({
      weight: 5,
      color: '#08306b',
      dashArray: '',
      fillOpacity: 0.7,
      fillColor: '#08306b',
    })

    if (!L.Browser.ie && !L.Browser.opera) {
      layer.bringToFront()
    }
  }

  resetLayer(event) {
    let layer = (typeof event.target === 'undefined') ? event : event.target
    this.geoLayer.resetStyle(layer)
  }

  hideLayer(layer) {
    layer.setStyle({
      stroke: false,
      fill: false,
    })
  }

  focusOnMap() {
    this.map.setView([44.121, -120.587], 6, {
      animate: true,
      pan: {
        animate: true,
        duration: 1
      },
      zoom: {
        animate: true
      }
    })
  }

  handleClick(event) {
    let layer = (typeof event.target === 'undefined') ? event : event.target
    this.props.onMapSelect({
      name: layer.feature.properties.name,
      fips: layer.feature.properties.fips
    })
  }

  focusOnLayer(event) {
    let layer = (typeof event.target === 'undefined') ? event : event.target
    this.map.fitBounds(layer.getBounds(), {
      animate: true,
      pan: {
        animate: true,
        duration: 1
      },
      zoom: {
        animate: true
      }
    })
  }

  render() {
    if (this.geoLayer) {
      let fips = this.props.selectedCounty
      let layers = this.geoLayer.getLayers()

      _.forEach(layers, layer => {
        this.resetLayer(layer)
      })

      if (fips === "41") {
        this.focusOnMap()
      } else {
        _.forEach(layers, layer => {
          if (layer.feature.properties.fips === fips) {
            this.focusOnLayer(layer)
          } else {
            this.hideLayer(layer)
          }
        })
      }
    }

    return <div className='leaflet-container leaflet-retina leaflet-fade-anim'/>
  }
}
