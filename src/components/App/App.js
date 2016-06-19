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
import { sssTransportation } from '../../fixtures/sssTransportation'
import { sssMiscellaneous } from '../../fixtures/sssMiscellaneous'
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
  getSchoolMealBenefit,
  getSSSTransportation,
  getSSSMiscellaneous,
  getBarChartValues } from './calculators'
import jQuery from 'jquery'

window.jQuery = jQuery
require('bootstrap')
//require('../../styles/main.css')
require('./App.css')
require('../../styles/rc-slider.css')
require('../../styles/react-dropdown.css')

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      sliderWage: 0,
      individuals: 1,
      selectedCounty: { fips: "41051", name: "Multnomah" },
      bestCaseMap: true
    }
    this._onDropdownSelect = this._onDropdownSelect.bind(this)
    this._setFamilyType = this._setFamilyType.bind(this)
    this._onSliderChange = this._onSliderChange.bind(this)
    this.getFoodSecurityStatus = this.getFoodSecurityStatus.bind(this)
    this.getIndicatorValue = this.getIndicatorValue.bind(this)
    this.getMapFipsColors = this.getMapFipsColors.bind(this)
    this.isSingleAdult = this.isSingleAdult.bind(this)
  }

  _onDropdownSelect(county) {
    this.setState({ selectedCounty: { fips: county.value, name: county.label } })
  }

  _setFamilyType(fam) {
    const familyTypeCountMap = {
      'single-adult': 1,
      'single-parent': 3,
      'two-parents': 4,
    }

    this.setState({
      individuals: familyTypeCountMap[fam],
    })
  }

  _onSliderChange(value) {
    this.setState({ sliderWage: value })
  }

  getMapFipsColors(bestCase = true) {
    let status
    const colors = ['#b5441d', '#dc6632', '#eadd69', '#eee597']
    const fipsColors = counties // from fixture data
      .map(c => c.fips)
      .reduce((colorObj, fips) => {
        if (fips !== 41) {
          status = this.getFoodSecurityStatus(fips, bestCase)
          colorObj[fips] = colors[status]
        }
        return colorObj
      }, {})
    return fipsColors
  }

  getFoodSecurityStatus(fips, bestCase = true) {
    const { individuals, sliderWage } = this.state
    const { RATINGS, MEAL_PERIOD_DAYS } = constants
    const totalMealsGoal = this.state.individuals * 3 * MEAL_PERIOD_DAYS
    const canAfford = totalMealsGoal - calcMealGap(individuals, sliderWage, fips, bestCase)
    if (canAfford >= totalMealsGoal) {
      return RATINGS['sufficient']
    } else if (canAfford >= (totalMealsGoal * 0.75) && canAfford < totalMealsGoal) {
      return RATINGS['moderatelySufficient']
    } else if (canAfford >= (totalMealsGoal * 0.5) && canAfford < (totalMealsGoal * 0.75)) {
      return RATINGS['vulnerable']
    } else if (canAfford < (totalMealsGoal * 0.5)) {
      return RATINGS['extremelyVulnerable']
    }
  }

  getIndicatorValue(bestCase = true) {
    let { individuals, selectedCounty, sliderWage } = this.state
    const statusPositions = [12.5, 37.5, 62.5, 87.5]
    const status = this.getFoodSecurityStatus(selectedCounty.fips, bestCase)
    return statusPositions[status]
  }

  isSingleAdult() {
    return this.state.individuals === 1
  }

  render() {

    const { individuals, sliderWage, selectedCounty } = this.state
    const sliderMarks = {
      0: '$0',
      200: '$200',
      700: '$700',
      1200: '$1200',
      2000: '$2000'
    }
    const barChartData = [
      {
        label: "Your $ for transportation",
        value: getBarChartValues(individuals, sliderWage, selectedCounty.fips, "transportation")
      },
      {
        label: "Average transportation costs",
        value: getBarChartValues(individuals, sliderWage, selectedCounty.fips, "transportation_fixed"),
        description: "transportation is based on the local cost of a bus pass"
      },
      {
        label: "Your $ for miscellaneous",
        value: getBarChartValues(individuals, sliderWage, selectedCounty.fips, "miscellaneous")
      },
      {
        label: "Average miscellaneous costs",
        value: getBarChartValues(individuals, sliderWage, selectedCounty.fips, "miscellaneous_fixed"),
        description: "miscellaneous includes ... but does not include ..."
      },
    ]
    const budgetColor = "#4e735a"
    const transportationColor = "#b8dfab"
    const miscColor = "#b8dfab"
    const barColors = [transportationColor, budgetColor, miscColor, budgetColor]

    const moneyForOtherStuff = moneyAfterHousing(individuals, sliderWage, selectedCounty.fips) * 0.25
    const transportationCost = getSSSTransportation(individuals, selectedCounty.fips)
    const miscellaneousCost = getSSSMiscellaneous(individuals, selectedCounty.fips)
    const excessTowardFood = Math.max(0, moneyForOtherStuff - (transportationCost + miscellaneousCost))
    let extraMeals = 0
    if (excessTowardFood) {
      extraMeals = Math.floor(excessTowardFood / data.costOfMeals[selectedCounty.fips].cost_per_meal)
    }
    const indicatorLabels = ["Extremely Vulnerable", "Vulnerable", "Moderately Sufficient", "Sufficient"]
    const BEST_CASE = true
    const { MEAL_PERIOD_DAYS } = constants
    const totalMealsGoal = individuals * 3 * MEAL_PERIOD_DAYS

    const options = counties.map(c => ({ value: c.fips, label: c.name }))
    const dropdownCounty = { value: selectedCounty.fips, label: selectedCounty.name }

    const costPerMeal = data.costOfMeals[selectedCounty.fips].cost_per_meal
    const bestCaseMissingMeals = calcMealGap(individuals, sliderWage, selectedCounty.fips, BEST_CASE)
    const bestCaseMealValues = [bestCaseMissingMeals, totalMealsGoal - bestCaseMissingMeals]
    const worstCaseMissingMeals = calcMealGap(individuals, sliderWage, selectedCounty.fips, !BEST_CASE)
    const worstCaseMealValues = [worstCaseMissingMeals, totalMealsGoal - worstCaseMissingMeals]
    const bestCaseFoodStatus = this.getFoodSecurityStatus(selectedCounty.fips, BEST_CASE)
    const worstCaseFoodStatus = this.getFoodSecurityStatus(selectedCounty.fips, !BEST_CASE)
    const housingSufficient = (moneyAfterHousing(individuals, sliderWage, selectedCounty.fips) > 0)

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
                  <p className="navbar-text navbar-left">Built by</p>
                    <a href="http://www.hackoregon.org/">
                        <img className="img-responsive ho-logo-gray navbar-left" src="src/assets/HO_logo_gray.png" alt="Hack  Oregon logo"/>
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
            <img className="img-responsive OHE-logo" src="src/assets/OHE_logo3.png" alt="Oregon Hunger Equation logo"/>
                <p>Select a county, family type, and household income level below to see what the Oregon Hunger Equation hunger snapshot is for you and your family.
              </p>
            </div>
          </div>
        </section>
        <section className="family-and-county-section container-fluid">
          <div className="row">
            <div className="col-xs-12">
              <h2 className="select-county-heading section-heading">Select a County</h2>
              <Dropdown
                options={options}
                onChange={this._onDropdownSelect}
                value={dropdownCounty}
              />
              <FamilyTypeSelect onSelect={this._setFamilyType} selectedType={this.state.individuals} />
            </div>
          </div>
        </section>

        <StickyContainer>
        <section className="slider-section container-fluid">
          <div className="row">
            <div className="col-xs-12">
              <div className="slider-with-heading">
                <h2 className="slider-heading section-heading">Slide to select monthly household income</h2>
                <Sticky topOffset={100}>
                <div className="slider-self-wrapper">
                  <div className="slider-wage-box">{`$${this.state.sliderWage}`}</div>
                  <Slider
                    max={this.props.sliderMax}
                    tipTransitionName="rc-slider-tooltip-zoom-down"
                    tipFormatter={null}
                    marks={sliderMarks}
                    step={2}
                    dots={false}
                    onChange={this._onSliderChange}
                    />
                </div>
                </Sticky>
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
            <p>Income plus benefits: {incomePlusBenefits(individuals, sliderWage, selectedCounty.fips, BEST_CASE)}</p>
            <p>Money after housing: {moneyAfterHousing(individuals, sliderWage, selectedCounty.fips)}</p>
          </div>
            <h2 className="section-heading food-security-heading text-center">
              What’s your day-to-day experience putting food on the table?
            </h2>
            <DonutChart
              values={bestCaseMealValues}
              total={totalMealsGoal}
              mealsShort={bestCaseMissingMeals}
              costPerMeal={costPerMeal}
              extraMeals={extraMeals}
            >
              <image xlinkHref="src/assets/apple.svg" height="76" width="76" x="-36" y="-42" />
            </DonutChart>
            <div className="benefits-row">
              <p className="placeholder"></p>
              <p className="snap-benefits-text">
              Snap benefits: <span className="dynamic-text">{`$${snapCalculator(individuals, sliderWage, selectedCounty.fips)}`}</span>
              </p>
              <p className="school-benefits-text">
              School meal benefits: <span className="dynamic-text">{`$${getSchoolMealBenefit(individuals, selectedCounty.fips)}`}</span>
              </p>
              <p className="placeholder"></p>
            </div>
            <div className="indicator-wrapper">
              <IndicatorSlider
                value={this.getIndicatorValue(true)}
                sections={4}
                labels={indicatorLabels}
              />
            </div>
            <DayToDaySnugget
            securityStatus={bestCaseFoodStatus}
            individuals={individuals}
            />

          </div>
        </div>
        </section>
        <section className="lunch-section container-fluid" style={this.isSingleAdult() ? { display: "none" } : {}}>
          <div className="row">
            <div className="col-xs-12">
              <h2 className="text-center section-heading">
                How does free and reduced lunch affect your family?
              </h2>
              <p className="snugget-text">
                Thankfully, some of your county has free and reduced lunch programs available so we have accounted for that in this equation. These programs provide 10 meals per week for your children.
              </p>
              <p className="snugget-text">
                However, during the summer, your children lose these benefits when school is out, and many school districts in the state do not have these expanded programs. <strong>This is how your experience changes without the help of free and reduced price lunch programs:</strong>
              </p>
            </div>
          </div>
          <div className="test-stats">
            <p>Food cost: {getMonthlyMealCost(individuals, selectedCounty.fips)}</p>
            <p>Housing cost: {getHousingCost(individuals, selectedCounty.fips)}</p>
            <p>School meal benefit: {0}</p>
            <p>Snap benefit: {snapCalculator(individuals, sliderWage, selectedCounty.fips)}</p>
            <p>Income plus benefits: {incomePlusBenefits(individuals, sliderWage, selectedCounty.fips, false)}</p>
            <p>Money after housing: {moneyAfterHousing(individuals, sliderWage, selectedCounty.fips)}</p>
          </div>
          <DonutChart
          values={worstCaseMealValues}
          total={totalMealsGoal}
          mealsShort={worstCaseMissingMeals}
          costPerMeal={costPerMeal}
          extraMeals={extraMeals}
          >
          <image xlinkHref="src/assets/apple.svg" height="76" width="76" x="-36" y="-42" />
          </DonutChart>
          <div className="benefits-row">
            <p className="placeholder"></p>
            <p className="snap-benefits-text">
            Snap benefits: <span className="dynamic-text">{`$${snapCalculator(individuals, sliderWage, selectedCounty.fips)}`}</span>
            </p>
            <p className="school-benefits-text">
            School meal benefits: <span className="dynamic-text" style={{ color: "#b5441d" }}>$0</span>
            </p>
            <p className="placeholder"></p>
          </div>
          <div className="indicator-wrapper">
            <IndicatorSlider
              value={this.getIndicatorValue(false)}
              sections={4}
              labels={indicatorLabels}
            />
          </div>
          <DayToDaySnugget
          securityStatus={worstCaseFoodStatus}
          individuals={individuals}
          />
        </section>
        <section className="housing container-fluid">
          <div className="row">
            <div className="col-xs-12">
              <h2 className="section-heading text-center">
                Are you able to afford stable housing?
              </h2>
              <div
                className="can-afford-housing afford-housing-yes"
                style={ housingSufficient ? {} : { display: "none" } }>
                <h3>Yes</h3>
                <p className="snugget-text">
                  At your income, you are able to afford housing in your county. However, the more of your income that goes toward housing, the more difficult it becomes to pay for food.
                </p>
              </div>
              <div
                className="can-afford-housing afford-housing-no"
                style={ housingSufficient ? { display: "none" } : {} }>
                <h3>No</h3>
                <p className="snugget-text">
                  At your income, you are not able to afford housing in your county.
                </p>
              </div>
              <section className="bar-chart-section container-fluid">
                <BarChart title="Other Expenses" data={barChartData} colors={barColors} />
                <p
                  className="afford-extra-meals"
                  style={extraMeals <= 0 ? { visibility: "hidden" } : {}}
                >
                You can now afford <span className="dynamic-text">{extraMeals}</span> extra meals.
                </p>
              </section>
            </div>
          </div>
        </section>
        <section className="map-view-section container-fluid">
          <div className="row">
            <div className="col-xs-12">
              <h2 className="section-heading text-center">
                How would my experience be different if I lived in another county in Oregon?
              </h2>
              <p className="snugget-text">
                The reality of your situation could be different if you lived in a different county, based on the cost of housing, the availability of free and reduced lunch programs, and what other benefits are available. This map shows what your category might be if you lived in a different county in Oregon:
              </p>
              <div className="row map-row">
                <div className="col-xs-12 col-md-6 col-md-offset-3 map-wrapper housing-map-wrapper">
                  <MapView
                    fipsColors={this.getMapFipsColors(this.state.bestCaseMap)}
                  />
                  <button
                    className="map-toggle-btn"
                    onClick={() => {
                      this.setState({ bestCaseMap: !this.state.bestCaseMap })
                    }}
                    style={this.isSingleAdult() ? { display: "none" } : {}}
                  >
                  Show { this.state.bestCaseMap ? "with school meal benefits" : "without school meal benefits" }
                  </button>
                </div>
              </div>
              <div>
                <h2 className="section-heading text-center">Conclusion:</h2>
                <p className="snugget-text conclusion-text">
                  The Oregon Hunger Equation is a conservative model. The amount of data that is available for looking at hunger in Oregon is vast, and this program attempts to make sense of it by showing the simplest, best-case scenarios in counties across Oregon. For more info about how this model was built, take a look at the <a style={{ color: "#669776" }} href="#data-deep-dive">data deep dive.</a>
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
