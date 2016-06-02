import React from 'react'
import Slider from 'rc-slider'
import Dropdown from 'react-dropdown'
import IndicatorSlider from '../IndicatorSlider/IndicatorSlider'
import HorizontalRule from '../HorizontalRule/HorizontalRule'
import FamilyTypeSelect from '../FamilyTypeSelect/FamilyTypeSelect'
import DayToDaySnugget from '../DayToDayHungerSnugget/DayToDayHungerSnugget'
import DonutChart from '../DonutChart/DonutChart'
import counties from '../../fixtures/counties'
import data from '../../fixtures/data'
import MapView from '../MapView/MapView'
import { calcMealGap, getRemainingIncome } from './calculators'

// require('../../styles/fonts/Darwin.css')
// require('../../styles/fonts/TTChocolates.css')
require('bootstrap/dist/css/bootstrap.css')
require('../../styles/main.css')
require('./App.css')
require('../../styles/rc-slider.css')
require('../../styles/react-dropdown.css')

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      sliderWage: 0,
      selectedFamilyType: "single-adult",
      individuals: 1,
      selectedCounty: { fips: "41013", name: "Multnomah" }
    }
    this._onDropdownSelect = this._onDropdownSelect.bind(this)
    this._setSelectedFamilyType = this._setSelectedFamilyType.bind(this)
    this._onSliderChange = this._onSliderChange.bind(this)
    this.getFoodSecurityStatus = this.getFoodSecurityStatus.bind(this)
    this.getIndicatorValue = this.getIndicatorValue.bind(this)
    this.getMapFipsColors = this.getMapFipsColors.bind(this)
  }

  _onDropdownSelect(county) {
    this.setState({ selectedCounty: { fips: county.value, name: county.label } })
  }

  _setSelectedFamilyType(fam) {
    const familyTypeCountMap = {
      'single-adult': 1,
      'single-parent': 3,
      'two-parents': 4,
    }

    this.setState({
      selectedFamilyType: fam,
      individuals: familyTypeCountMap[fam],
    })
  }

  _onSliderChange(value) {
    this.setState({ sliderWage: value })
  }

  getMapFipsColors() {
    const colors = ['#0af', '#a0f', '#f0a', '#a05']
    const fipsColors = counties
      .map(c => c.fips)
      .reduce((colorObj, fips) => {
        console.log("getFoodSecurityStatus", this.getFoodSecurityStatus())
        colorObj[fips] = colors[this.getFoodSecurityStatus() - 1]
        return colorObj
      }, {})
      console.log(fipsColors)
    return fipsColors
  }
  getFoodSecurityStatus() {
    const RATINGS = {
      "secure": 4,
      "moderately insecure": 3,
      "highly insecure": 2,
      "extremely insecure": 1
    }
    const { individuals, sliderWage, selectedCounty } = this.state
    const mealCost = data.costOfMeals[selectedCounty.fips].cost_per_meal
    const income = getRemainingIncome(individuals, sliderWage, selectedCounty.fips)
    const canAfford = Math.round(income / mealCost)
    switch (individuals) {
      case 1:
        if (canAfford > 105) {
          return RATINGS['secure']
        } else if (canAfford > 73.5 && canAfford <= 105) {
          return RATINGS['moderately insecure']
        } else if (canAfford > 42 && canAfford <= 73.5) {
          return RATINGS['highly insecure']
        } else if (canAfford <= 42) {
          return RATINGS['extremely insecure']
        } else {
          throw new Error('oops')
        }
      case 3:
        if (canAfford > 315) {
          return RATINGS['secure']
        } else if (canAfford >= 220.5 && canAfford <= 315) {
          return RATINGS['moderately insecure']
        } else if (canAfford >= 126 && canAfford < 220.5) {
          return RATINGS['highly insecure']
        } else if (canAfford < 126) {
          return RATINGS['extremely insecure']
        }
        break
      case 4:
        if (canAfford > 420) {
          return RATINGS['secure']
        } else if (canAfford >= 294 && canAfford <= 420) {
          return RATINGS['moderately insecure']
        } else if (canAfford >= 168 && canAfford < 294) {
          return RATINGS['highly insecure']
        } else if (canAfford < 168) {
          return RATINGS['extremely insecure']
        }
        break
      default:
        throw new Error('invalid number of individuals')
    }
  }

  getMissingMeals() {
    let { selectedCounty, sliderWage, individuals } = this.state
    const FIPS = selectedCounty.fips
    return calcMealGap(individuals, sliderWage, FIPS)
  }

  getDayToDayPercent() {
    let { individuals } = this.state

    const gap = this.getMissingMeals()
    const totalMealsGoal = individuals * 3 * 30
    const missingPercentage = 1 - (gap / totalMealsGoal)
    return missingPercentage * 100
  }

  getIndicatorValue() {
    const sliderPercent = this.props.sliderMax / 100
    return this.state.sliderWage / sliderPercent
  }

  isSingleAdult() {
    return this.state.selectedFamilyType === "single-adult"
  }

  render() {

    const sliderMarks = {
      0: '$0',
      200: '$200',
      700: '$700',
      1200: '$1200',
      2000: '$2000'
    }

    const options = counties.map(c => ({ value: c.fips, label: c.name }))
    const defaultOption = options[0]
    const dollarFormatter = (val) => ("$" + val)
    const totalMealsGoal = this.state.individuals * 3 * 30
    const mealValues = [this.getMissingMeals(), totalMealsGoal]

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
        <section className="family-and-county-section container-fluid">
          <div className="row">
            <div className="col-xs-12">
              <h2 className="header select-county-header">Select a County</h2>
              <Dropdown
                options={options}
                onChange={this._onDropdownSelect}
              />
              <FamilyTypeSelect onSelect={this._setSelectedFamilyType} selectedType={this.state.selectedFamilyType} />
            </div>
          </div>
        </section>
        <section className="slider-section container-fluid">
          <div className="row">
            <div className="col-xs-12">
              <div className="slider-with-header">
                <h2 className="header slider-header">Slide to select monthly income</h2>
                <div className="slider-self-wrapper">
                  <Slider
                  max={this.props.sliderMax}
                  tipTransitionName="rc-slider-tooltip-zoom-down"
                  tipFormatter={dollarFormatter}
                  marks={sliderMarks}
                  step={2}
                  dots={false}
                  onChange={this._onSliderChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <HorizontalRule small={true} />
        <section className="day-to-day-section container-fluid">
        <div className="row">
          <div className="col-xs-12">
            <h2 className="header food-security-header">
              Food Security Status
            </h2>
            <DonutChart values={mealValues}  total={totalMealsGoal}>
              <image xlinkHref="src/assets/applecropped.png" height="76" width="76" x="-38" y="-42" />
            </DonutChart>
            <div className="indicator-wrapper">
              <IndicatorSlider
                value={this.getDayToDayPercent()}
                sections={4}
              />
            </div>
            <DayToDaySnugget securityStatus={this.getFoodSecurityStatus()} mealsMissed={this.getMissingMeals()}/>

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
          <div className="indicator-wrapper">
            <IndicatorSlider
              value={this.getIndicatorValue()}
              sections={4}
            />
          </div>
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
                <div className="col-xs-12 col-md-6 col-md-offset-3 map-wrapper housing-map-wrapper">
                  <MapView
                    defaultColor={["#a0f"]}
                    fipsColors={this.getMapFipsColors()}
                    selectedCounty={this.state.selectedCounty}
                  />
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
