import React from 'react'
import Slider from 'rc-slider'
import Dropdown from 'react-dropdown'
import IndicatorSlider from './IndicatorSlider'
import HorizontalRule from './HorizontalRule'
import FamilyTypeSelect from './FamilyTypeSelect'
import DayToDaySnugget from './DayToDayHungerSnugget'
import counties from '../../fixtures/counties'

require('../../styles/fonts/Darwin.css')
require('../../styles/fonts/TTChocolates.css')
require('../../styles/main.css')
require('../../styles/rc-slider.css')
require('../../styles/react-dropdown.css')
require('../../styles/indicator.css')

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      sliderWage: 0,
      selectedFamilyType: "none",
      selectedCountyFips: 41 // "Oregon"
    }
    this._onDropdownSelect = this._onDropdownSelect.bind(this)
    this._setSelectedFamilyType = this._setSelectedFamilyType.bind(this)
    this._onSliderChange = this._onSliderChange.bind(this)
    this.getFoodSecurityStatus = this.getFoodSecurityStatus.bind(this)
    this.getIndicatorValue = this.getIndicatorValue.bind(this)
  }

  _onDropdownSelect(county) {
    console.log(county)
    this.setState({ selectedCountyFips: county.value })
  }

  _setSelectedFamilyType(fam) {
    this.setState({ selectedFamilyType: fam})
  }

  _onSliderChange(value) {
    this.setState({ sliderWage: value })
  }

  getFoodSecurityStatus() {
    let status;
    let wage = this.state.sliderWage;
    if (wage < 500) {
      return "moderately insecure"
    }
    else if (wage < 1000) {
      return "very insecure"
    }
    else if (wage < 1500) {
      return "moderately secure"
    }
    else {
      return "very secure"
    }
  }
  getIndicatorValue() {
    const sliderPercent = this.props.sliderMax / 100
    return this.state.sliderWage / sliderPercent
  }

  isSingleAdult() {
      return this.state.selectedFamilyType === "single-adult"
  }

  render() {
    console.log("state:", this.state)
    const marks = {
      0: '$0',
      200: '$200',
      700: '$700',
      1200: '$1200',
      2000: '$2000'
    }
    const options = counties.map(c => ({ value: c.fips, label: c.name }))
    const defaultOption = options[0]
    const dollarFormatter = (val) => ("$" + val)

    return (
      <div>
        <header>
          <h1 className="main-title">Oregon Hunger Equation</h1>
        </header>
        <section className="mission-statement container-fluid">
          <div className="row">
          <div className="col-xs-4">
            <img className="img-responsive placeholder" />
          </div>
            <div className="col-xs-8">
              <h2>Project Mission Statement:</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </section>
        <HorizontalRule>
          <h2 className="hr-content">Select a County</h2>
        </HorizontalRule>
        <section className="family-and-county-section container-fluid">
          <div className="row">
            <div className="col-xs-12">
              <Dropdown
                options={options}
                onChange={this._onDropdownSelect}
              />
              <FamilyTypeSelect onSelect={this._setSelectedFamilyType} />
              <div className="slider-wrapper center-block">
                <Slider
                  max={this.props.sliderMax}
                  tipTransitionName="rc-slider-tooltip-zoom-down"
                  tipFormatter={dollarFormatter}
                  marks={marks}
                  step={2}
                  dots={false}
                  onChange={this._onSliderChange}
                />
              </div>
            </div>
          </div>
        </section>
        <HorizontalRule>
          <img className="hr-content hr-image" src="dist/assets/applecropped.png" />
        </HorizontalRule>
        <section className="day-to-day-section container-fluid">
        <div className="row">
          <div className="col-xs-12">
            <h2 className="text-center">
            What’s your day-to-day experience putting food on the table?
            </h2>

            <IndicatorSlider
              value={this.getIndicatorValue()}
              sections={4}
            />

            <DayToDaySnugget securityStatus={this.getFoodSecurityStatus()} mealsMissed={5}/>

          </div>
        </div>
        </section>
        <section className="lunch-section" style={this.isSingleAdult() ? { display: "none" } : {}}>
          <div className="row">
            <div className="col-xs-12">
              <h2 className="text-center">
                How does free and reduced lunch affect your family?
              </h2>
              <p>
                Thankfully, much of your county has free and reduced lunch programs available so we have accounted for that in this equation. These programs provide 10 meals per week for your children.
              </p>
              <p>
                However, many school districts in the state do not have these expanded programs and face new hardships during summer when school is out. This is what your scenario would look like without the help of free and reduced price lunch programs.
              </p>
            </div>
          </div>
          <IndicatorSlider
            value={this.getIndicatorValue()}
            sections={4}
          />
        </section>
        <section className="housing">
          <div className="row">
            <div className="col-xs-12">
              <h2 className="text-center">
                Are you able to afford stable housing?
              </h2>
              <p>
                At your income, you are able to afford housing in X county, which has an average minimum cost of housing of X. However, because about 2/3 of your income is going to pay for housing, this makes your ability to pay for food that much more difficult.
              </p>
              <div className="placeholder"></div>
            </div>
          </div>
        </section>
        <section className="map-view-section">
          <div className="row">
            <div className="col-xs-12">
              <h2 className="text-center">
                Would my situation be different if I live in another area in Oregon?
              </h2>
              <p>
                The reality of your situation could be different if you lived in a different county, based on the cost of housing, the availability of free and reduced lunch programs, and what other benefits are available. This map shows what your category might be if you lived in a different county in Oregon:
              </p>
              <div className="row map-row">
                <div className="col-xs-12 col-sm-6 map-wrapper food-map-wrapper">
                  <h3 className="text-center">Food Map</h3>
                  <img src="dist/assets/images/HO_map_color.svg" className="img-responsive center-block" alt="map of statewide food access" />
                </div>
                <div className="col-xs-12 col-sm-6 map-wrapper housing-map-wrapper">
                  <h3 className="text-center">Housing Map</h3>
                  <img src="dist/assets/images/HO_map_color.svg" className="img-responsive center-block" alt="map of statewide housing access" />
                </div>
              </div>
              <p>
                The average minimum cost of housing in your county is X, which is above average for the
                state of Oregon. See how your county compares to the rest of the state:
              </p>
              <div className="text-center">
                <p>Conclusion:</p>
                <p className="conclusion-text">
                  Lorem ipsum dolor sit amet, con mus malesuada leo nec venenatis. In pulvinar faucibus mus malesuada leo nec venenatis. In pulvinar faucibus mus malesuada leo nec venenatis. In pulvinar faucibus.
                </p>
              </div>
            </div>
          </div>
        </section>
        <footer>
          <img src="dist/assets/images/HO_logo.png" className="img-responsive center-block ho-logo" alt="The Hack Oregon logo" />
        </footer>
      </div>
    )
  }
}
