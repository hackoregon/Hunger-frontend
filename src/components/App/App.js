import React from 'react'
import Slider from 'rc-slider'
import Dropdown from 'react-dropdown'
import IndicatorSlider from '../IndicatorSlider/IndicatorSlider'
import HorizontalRule from '../HorizontalRule/HorizontalRule'
import FamilyTypeSelect from '../FamilyTypeSelect/FamilyTypeSelect'
import DayToDaySnugget from '../DayToDayHungerSnugget/DayToDayHungerSnugget'
import counties from '../../fixtures/counties'
import REHomepageMap from '../re-homepage'

require('../../styles/fonts/Darwin.css')
require('../../styles/fonts/TTChocolates.css')
require('../../styles/main.css')
require('../../styles/rc-slider.css')
require('../../styles/react-dropdown.css')

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      sliderWage: 0,
      selectedFamilyType: "none",
      selectedCounty: {fips: "41", name: "Oregon"}
    }
    this._onDropdownSelect = this._onDropdownSelect.bind(this)
    this._setSelectedFamilyType = this._setSelectedFamilyType.bind(this)
    this._onSliderChange = this._onSliderChange.bind(this)
    this.getFoodSecurityStatus = this.getFoodSecurityStatus.bind(this)
    this.getIndicatorValue = this.getIndicatorValue.bind(this)
  }

  _onDropdownSelect(county) {
    this.setState({ selectedCounty: { fips: county.value, name: county.label } })
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
          <nav className="navbar navbar-default">
            <div className="container-fluid">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="#">Hack Oregon Logo Here</a>
              </div>
              <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                  <ul className="nav navbar-nav navbar-right">
                    <li><a href="#">See Our Research</a></li>
                    <li className="hidden-xs" role="separator"><span className="glyphicon glyphicon-stop" aria-hidden="true"></span></li>
                    <li><a href="#">Do Something</a></li>
                  </ul>
               </div>
             </div>
          </nav>
        </header>
        <section className="mission-statement container-fluid">
          <h1 className="main-title">Oregon Hunger Equation</h1>
          <div className="row ">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
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
          <img className="hr-content hr-image" src="src/assets/applecropped.png" />
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
        <section className="lunch-section container-fluid" style={this.isSingleAdult() ? { display: "none" } : {}}>
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
        <section className="housing container-fluid">
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
        <section className="map-view-section container-fluid">
          <div className="row">
            <div className="col-xs-12">
              <h2 className="text-center">
                Would my situation be different if I live in another area in Oregon?
              </h2>
              <p>
                The reality of your situation could be different if you lived in a different county, based on the cost of housing, the availability of free and reduced lunch programs, and what other benefits are available. This map shows what your category might be if you lived in a different county in Oregon:
              </p>
              <div className="row map-row">
                <REHomepageMap
                selectCounty={this.state._onDropdownSelect}
                selectedCounty={this.state.selectedCounty}
                sliderWage={this.state.sliderWage}
                />
                <div className="col-xs-12 col-sm-6 map-wrapper housing-map-wrapper">
                  <h3 className="text-center">Housing Map</h3>
                  <img src="src/assets/HO_map_color.svg" className="img-responsive center-block" alt="map of statewide housing access" />
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
          <img src="src/assets/HO_logo.png" className="img-responsive center-block ho-logo" alt="The Hack Oregon logo" />
        </footer>
      </div>
    )
  }
}
