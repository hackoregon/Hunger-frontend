import React from 'react'
import Slider from 'rc-slider'
import Dropdown from 'react-dropdown'
import IndicatorSlider from '../IndicatorSlider/IndicatorSlider'
import HorizontalRule from '../HorizontalRule/HorizontalRule'
import FamilyTypeSelect from '../FamilyTypeSelect/FamilyTypeSelect'
import DayToDaySnugget from '../DayToDayHungerSnugget/DayToDayHungerSnugget'
import DonutChart from '../DonutChart/DonutChart'
import BarChart from '../CCHorizontalBarChart/CCHorizontalBarChart'
import counties from '../../fixtures/counties'
import data from '../../fixtures/data'
import constants from '../../fixtures/constants'
import MapView from '../MapView/MapView'
import { StickyContainer, Sticky } from 'react-sticky'
import {
  calcMealGap,
  moneyAfterHousing,
  getMonthlyMealCost,
  snapCalculator,
  getHousingCost,
  incomePlusBenefits,
  getSchoolMealBenefit } from './calculators'
import jQuery from 'jquery'
import chai from 'chai'

window.jQuery = jQuery
require('bootstrap')
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
      selectedCounty: { fips: "41051", name: "Multnomah" },
      bestCaseMap: true
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

  getMapFipsColors(bestCase = true) {
    let status
    const colors = ['#b5441d', '#dc6632', '#eadd69', '#eee597']
    const fipsColors = counties
      .map(c => c.fips)
      .reduce((colorObj, fips) => {
        if (fips !== 41) {
          status = this.getFoodSecurityStatus(this.state.individuals, this.state.sliderWage, fips, bestCase)
          colorObj[fips] = colors[status - 1]
        }
        return colorObj
      }, {})
    return fipsColors
  }

  getFoodSecurityStatus(individuals, wage, fips, bestCase = true) {
    const { RATINGS, MEAL_PERIOD_DAYS } = constants
    const mealCost = data.costOfMeals[fips].cost_per_meal
    const totalMealsGoal = individuals * 3 * MEAL_PERIOD_DAYS
    const canAfford = totalMealsGoal - this.getMissingMeals(individuals, wage, fips, bestCase)
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

  getMissingMeals(bestCase = true) {
    let { selectedCounty, sliderWage, individuals } = this.state
    const { MEAL_PERIOD_DAYS } = constants
    const FIPS = selectedCounty.fips
    const totalMealsGoal = individuals * 3 * MEAL_PERIOD_DAYS
    const missingMeals = calcMealGap(individuals, sliderWage, FIPS, bestCase)
    chai.assert(
      missingMeals <= totalMealsGoal, 'missingMeals is greater than totalMealsGoal')
    return missingMeals
  }

  getIndicatorValue(bestCase = true) {
    let { individuals } = this.state

    const gap = this.getMissingMeals(bestCase)
    const totalMealsGoal = individuals * 3 * 30
    const missingPercentage = 1 - (gap / totalMealsGoal)
    return missingPercentage * 100
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
    const barChartData = [
      { label: "corn", value: 45000 },
      { label: "carrots", value: 33000 },
      { label: "rutabegas", value: 25000 },
      { label: "potatoes", value: 20000 },
      { label: "asparagus", value: 5000 },
    ]
    const barColors = ["#5c7b1e", "#7ba428", "#9acd32", "#aed75a", "#c2e184"]

    const { individuals, sliderWage, selectedCounty } = this.state
    const { MEAL_PERIOD_DAYS } = constants
    const totalMealsGoal = individuals * 3 * MEAL_PERIOD_DAYS

    const options = counties.map(c => ({ value: c.fips, label: c.name }))
    const dropdownCounty = { value: selectedCounty.fips, label: selectedCounty.name }
    const dollarFormatter = (val) => ("$" + val)

    const moneyAfterMisc = Math.round(moneyAfterHousing(individuals, sliderWage, selectedCounty.fips) * 0.3)
    const costPerMeal = data.costOfMeals[selectedCounty.fips].cost_per_meal
    const bestCaseMissingMeals = this.getMissingMeals(true)
    const bestCaseMealValues = [bestCaseMissingMeals, totalMealsGoal - bestCaseMissingMeals]
    const worstCaseMissingMeals = this.getMissingMeals(false)
    const worstCaseMealValues = [worstCaseMissingMeals, totalMealsGoal - worstCaseMissingMeals]
    return (
      <div>
        <header>
          <nav className="navbar navbar-default navbar-static-top">
            <div className="container-fluid">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <div className="ho-logo-wrapper pull-left">
                  <a href="http://www.hackoregon.org/">
                    <img className="img-responsive ho-logo-gray" src="src/assets/HO_logo_gray.png" alt="Hack  Oregon logo"/>
                  </a>
                </div>
              </div>
              <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                  <ul className="nav navbar-nav navbar-right">
                    <li className="nav-item"><a href="#">See Our Research</a></li>
                    <li className="nav-item-separator hidden-xs"><span></span></li>
                    <li className="nav-item"><a href="#">Do Something</a></li>
                  </ul>
               </div>
             </div>
          </nav>
        </header>
        <section className="mission-statement container-fluid">
          <div className="row">
            <div className="col-xs-12">
              <h1 className="main-title">Oregon Hunger Equation</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </section>
        <section className="family-and-county-section container-fluid">
          <div className="row">
            <div className="col-xs-12">
              <h2 className="header select-county-header">Select a County</h2>
              <Dropdown
                options={options}
                onChange={this._onDropdownSelect}
                value={dropdownCounty}
              />
              <FamilyTypeSelect onSelect={this._setSelectedFamilyType} selectedType={this.state.selectedFamilyType} />
            </div>
          </div>
        </section>

        <StickyContainer>
        <section className="slider-section container-fluid">
          <div className="row">
            <div className="col-xs-12">
              <div className="slider-with-header">
                <h2 className="header slider-header">Slide to select monthly income</h2>
                <div className="slider-self-wrapper">
                  <Sticky>
                    <Slider
                    max={this.props.sliderMax}
                    tipTransitionName="rc-slider-tooltip-zoom-down"
                    tipFormatter={dollarFormatter}
                    marks={sliderMarks}
                    step={2}
                    dots={false}
                    onChange={this._onSliderChange}
                    />
                  </Sticky>
                </div>
              </div>
            </div>
          </div>
        </section>
        <HorizontalRule small={true} />
        <section className="day-to-day-section container-fluid">
        <div className="row">
          <div className="col-xs-12">
          <div className="test-stats">
            <p>Food cost: {getMonthlyMealCost(individuals, selectedCounty.fips)}</p>
            <p>Housing cost: {getHousingCost(individuals, selectedCounty.fips)}</p>
            <p>School meal benefit: {getSchoolMealBenefit(individuals, selectedCounty.fips)}</p>
            <p>Snap benefit: {snapCalculator(individuals, sliderWage, selectedCounty.fips)}</p>
            <p>Income plus benefits: {incomePlusBenefits(individuals, sliderWage, selectedCounty.fips)}</p>
            <p>Money after housing: {moneyAfterHousing(individuals, sliderWage, selectedCounty.fips)}</p>
          </div>
            <h2 className="header food-security-header">
              Food Security Status
            </h2>
            <DonutChart
              values={bestCaseMealValues}
              total={totalMealsGoal}
              mealsShort={bestCaseMissingMeals}
              costPerMeal={costPerMeal}
            >
              <image xlinkHref="src/assets/apple.svg" height="76" width="76" x="-36" y="-42" />
            </DonutChart>
            <div className="indicator-wrapper">
              <IndicatorSlider
                value={this.getIndicatorValue(true)}
                sections={4}
              />
            </div>
            <DayToDaySnugget
            securityStatus={this.getFoodSecurityStatus(individuals, sliderWage, selectedCounty.fips, true)}
            mealsMissed={this.getMissingMeals(true)}/>

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
          <div className="test-stats">
            <p>Food cost: {getMonthlyMealCost(individuals, selectedCounty.fips)}</p>
            <p>Housing cost: {getHousingCost(individuals, selectedCounty.fips)}</p>
            <p>School meal benefit: {0}</p>
            <p>Snap benefit: {snapCalculator(individuals, sliderWage, selectedCounty.fips)}</p>
            <p>Income plus benefits: {incomePlusBenefits(individuals, sliderWage, selectedCounty.fips)}</p>
            <p>Money after housing: {moneyAfterHousing(individuals, sliderWage, selectedCounty.fips)}</p>
          </div>
          <DonutChart
          values={worstCaseMealValues}
          total={totalMealsGoal}
          mealsShort={worstCaseMissingMeals}
          costPerMeal={costPerMeal}
          >
          <image xlinkHref="src/assets/apple.svg" height="76" width="76" x="-36" y="-42" />
          </DonutChart>
          <div className="indicator-wrapper">
            <IndicatorSlider
              value={this.getIndicatorValue(false)}
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
              <BarChart title="Bart Chart Success!" data={barChartData} colors={barColors} />
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
                    fipsColors={this.getMapFipsColors(this.state.bestCaseMap)}
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
        </StickyContainer>
        <footer>
          <img src="src/assets/HO_logo_gray.png" className="img-responsive center-block ho-logo-gray" alt="The Hack Oregon logo" />
        </footer>
      </div>
    )
  }
}
