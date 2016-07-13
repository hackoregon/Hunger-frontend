import React from 'react'
import { Link } from 'react-router'
import Slider from 'rc-slider'
import Dropdown from 'react-dropdown'
import { StickyContainer, Sticky } from 'react-sticky'
import jQuery from 'jquery'
import IndicatorSlider from '../IndicatorSlider/IndicatorSlider'
import HorizontalRule from '../HorizontalRule/HorizontalRule'
import FamilyTypeSelect from '../FamilyTypeSelect/FamilyTypeSelect'
import DayToDaySnugget from '../DayToDayHungerSnugget/DayToDayHungerSnugget'
import DonutChart from '../DonutChart/DonutChart'
import BarChart from '../CCHorizontalBarChart/CCHorizontalBarChart'
import MapView from '../MapView/MapView'
import counties from '../../fixtures/counties'
import data from '../../fixtures/data' // costOfMeals, schoolMeals, housing
import constants from '../../fixtures/constants' // MEAL_PERIOD_DAYS, RATINGS
import {
  getMealGap,
  getMoneyAfterHousing,
  getMonthlyMealCost,
  getSnapBenefits,
  getHousingCost,
  getIncomePlusBenefits,
  getSchoolMealBenefits,
  getSSSTransportation,
  getSSSMiscellaneous,
  getBarChartValues } from '../../utils/calculators'

window.jQuery = jQuery
require('bootstrap')
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
    this._getIndicatorValue = this._getIndicatorValue.bind(this)
    this._getMapFipsColors = this._getMapFipsColors.bind(this)
    this.getFoodSecurityStatus = this.getFoodSecurityStatus.bind(this)
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

  _getMapFipsColors(bestCase = true) {
    let status
    const colors = ['#b5441d', '#dc6632', '#eadd69', '#eee597']
    const fipsColors = counties // from fixture data
      .reduce((colorObj, county) => {
        if (county.fips !== 41) {
          status = this.getFoodSecurityStatus(county.fips, bestCase)
          colorObj[county.fips] = colors[status]
        }
        return colorObj
      }, {})
    return fipsColors
  }

  getFoodSecurityStatus(fips, bestCase = true) {
    const { individuals, sliderWage } = this.state
    const { RATINGS, MEAL_PERIOD_DAYS } = constants
    const totalMealsGoal = this.state.individuals * 3 * MEAL_PERIOD_DAYS
    const canAfford = totalMealsGoal - getMealGap(individuals, sliderWage, fips, bestCase)
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

  _getIndicatorValue(bestCase = true) {
    let { selectedCounty } = this.state
    const statusPositions = [12.5, 37.5, 62.5, 87.5]
    const status = this.getFoodSecurityStatus(selectedCounty.fips, bestCase)
    return statusPositions[status]
  }

  isSingleAdult() {
    return this.state.individuals === 1
  }

  render() {

    const { individuals, sliderWage, selectedCounty } = this.state
    // bar chart calculations / data
    const barChartData = [
      {
        label: "Your $ for transportation",
        value: getBarChartValues(individuals, sliderWage, selectedCounty.fips, "transportation").toFixed(2)
      },
      {
        label: "Average transportation costs",
        value: getBarChartValues(individuals, sliderWage, selectedCounty.fips, "transportation_fixed").toFixed(2),
      },
      {
        label: "Your $ for miscellaneous",
        value: getBarChartValues(individuals, sliderWage, selectedCounty.fips, "miscellaneous").toFixed(2)
      },
      {
        label: "Average miscellaneous costs",
        value: getBarChartValues(individuals, sliderWage, selectedCounty.fips, "miscellaneous_fixed").toFixed(2),
      },
    ]
    const budgetColor = "#4e735a"
    const transportationColor = "#b8dfab"
    const miscColor = "#b8dfab"
    const barColors = [transportationColor, budgetColor, miscColor, budgetColor]

    // wage slider calculations / data
    const getSliderMax = () => {
      return (individuals === 4 ? 2500 : 2000) // 4-person family gets $2500 max
    }
    let sliderMarks = {
      0: '$0',
      200: '$200',
      700: '$700',
      1200: '$1200',
      2000: '$2000'
    }
    if (individuals === 4) {
      sliderMarks['2500'] = '$2500'
    }

    // county dropdown calculations / data
    const options = counties.map(c => ({ value: c.fips, label: c.name }))
    const dropdownCounty = { value: selectedCounty.fips, label: selectedCounty.name }

    const moneyForOtherStuff = getMoneyAfterHousing(individuals, sliderWage, selectedCounty.fips) * 0.25
    const transportationCost = getSSSTransportation(individuals, selectedCounty.fips)
    const miscellaneousCost = getSSSMiscellaneous(individuals, selectedCounty.fips)
    const excessTowardFood = Math.max(0, moneyForOtherStuff - (transportationCost + miscellaneousCost))
    let extraMeals = 0
    if (excessTowardFood) {
      extraMeals = Math.floor(excessTowardFood / data.costOfMeals[selectedCounty.fips].cost_per_meal)
    }

    // food housing security calculations / data
    const { MEAL_PERIOD_DAYS } = constants
    const totalMealsGoal = individuals * 3 * MEAL_PERIOD_DAYS
    const BEST_CASE = true
    const costPerMeal = data.costOfMeals[selectedCounty.fips].cost_per_meal
    const bestCaseMissingMeals = getMealGap(individuals, sliderWage, selectedCounty.fips, BEST_CASE)
    const bestCaseMealValues = [bestCaseMissingMeals, totalMealsGoal - bestCaseMissingMeals]
    const bestCaseFoodStatus = this.getFoodSecurityStatus(selectedCounty.fips, BEST_CASE)
    const worstCaseMissingMeals = getMealGap(individuals, sliderWage, selectedCounty.fips, !BEST_CASE)
    const worstCaseMealValues = [worstCaseMissingMeals, totalMealsGoal - worstCaseMissingMeals]
    const worstCaseFoodStatus = this.getFoodSecurityStatus(selectedCounty.fips, !BEST_CASE)
    const housingSufficient = ((2 / 3) * sliderWage > getHousingCost(individuals, selectedCounty.fips))
    const indicatorLabels = ["Extremely Vulnerable", "Vulnerable", "Moderately Sufficient", "Sufficient"]

    return (
      <div>
        <section className="mission-statement container-fluid">
          <div className="row">
            <div className="col-xs-12 col-md-6">
            <img className="img-responsive apple-girl" src="src/assets/apple-girl.jpg" alt="Young Girl Eating Apple"/>
            </div>
            <div className="col-xs-12 col-md-6">
            <img className="img-responsive OHE-logo" src="src/assets/OHE_logo3.png" alt="Oregon Hunger Equation logo"/>
              <p className="cover-text">Year after year, Oregon has one of the highest reported rates of food insecurity in the country. At the same time, we have a robust food stamp program and over 900 food relief agencies statewide.<br></br><br></br>
                  The data is clear, but the reality is hard.  What's not working?<br></br><br></br>
                  We've made a dynamic program to explore systemic causes of hunger at home.</p>
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
                    max={getSliderMax()}
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
            <p>School meal benefit: {getSchoolMealBenefits(individuals, selectedCounty.fips)}</p>
            <p>Snap benefit: {getSnapBenefits(individuals, sliderWage, selectedCounty.fips)}</p>
            <p>Income plus benefits: {getIncomePlusBenefits(individuals, sliderWage, selectedCounty.fips, BEST_CASE)}</p>
            <p>Money after housing: {getMoneyAfterHousing(individuals, sliderWage, selectedCounty.fips)}</p>
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
              <div className="snap-benefits-text-wrapper">
                <p className="snap-benefits-text">
                Estimated SNAP benefits: <span className="dynamic-text">{`$${getSnapBenefits(individuals, sliderWage, selectedCounty.fips).toFixed(2)}`}</span>
                </p>
              </div>
              <div className="school-benefits-text-wrapper">
                <p className="school-benefits-text">
                Estimated school meal benefits: <span className="dynamic-text">{`$${getSchoolMealBenefits(individuals, selectedCounty.fips).toFixed(2)}`}</span>
                </p>
              </div>
            </div>
            <div className="indicator-wrapper">
              <IndicatorSlider
                value={this._getIndicatorValue(true)}
                sections={4}
                labels={indicatorLabels}
              />
            </div>
            <div className="data-hint-snugget-wrapper">
              <p className="hunger-data-hint">
                  <strong>DATA HINT:</strong> Check below to see if you are covering your other expenses.
              </p>
              <DayToDaySnugget
              securityStatus={bestCaseFoodStatus}
              individuals={individuals}
              />
            </div>

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
            <p>Snap benefit: {getSnapBenefits(individuals, sliderWage, selectedCounty.fips)}</p>
            <p>Income plus benefits: {getIncomePlusBenefits(individuals, sliderWage, selectedCounty.fips, false)}</p>
            <p>Money after housing: {getMoneyAfterHousing(individuals, sliderWage, selectedCounty.fips)}</p>
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
            <div className="snap-benefits-text-wrapper">
              <p className="snap-benefits-text">
              Estimated SNAP benefits: <span className="dynamic-text">{`$${getSnapBenefits(individuals, sliderWage, selectedCounty.fips).toFixed(2)}`}</span>
              </p>
            </div>
            <div className="school-benefits-text-wrapper">
              <p className="school-benefits-text">
              Estimated school meal benefits: <span
                className="dynamic-text" style={{color: "#b5441d"}}>$0.00</span>
              </p>
            </div>
          </div>
          <div className="indicator-wrapper">
            <IndicatorSlider
              value={this._getIndicatorValue(false)}
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
                className="can-afford-housing">
                <div
                  className="afford-housing-yes"
                  style={ housingSufficient ? {} : { display: "none" } }>
                  <h3>Yes</h3>
                  <p className="snugget-text">
                    At your income, you are able to afford housing in your county. However, the more of your income that goes toward housing, the more difficult it becomes to pay for food.
                  </p>
                </div>
                <div
                  className="afford-housing-no"
                  style={ housingSufficient ? { display: "none" } : {} }>
                  <h3>No</h3>
                  <p className="snugget-text">
                    At this income,  secure, stable and affordable housing is difficult to find.
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
                    <div className="barchart-notes">
                      <p>
                      <strong>DATA HINT</strong>: For details about what is included in transportation and miscellaneous costs, see the <Link to="/data-deep-dive">data deep dive.</Link>
                      </p>
                    </div>
                    </section>
              </div>
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
                    fipsColors={this._getMapFipsColors(this.state.bestCaseMap)}
                  />
                  <button
                    className="map-toggle-btn"
                    onClick={() => {
                      this.setState({ bestCaseMap: !this.state.bestCaseMap })
                    }}
                    style={this.isSingleAdult() ? { display: "none" } : {}}
                  >
                  Show { this.state.bestCaseMap ? "without school meal benefits" : "with school meal benefits" }
                  </button>
                </div>
              </div>
              <div>
                <h2 className="section-heading text-center">Conclusion:</h2>
                <p className="snugget-text conclusion-text">
                  The Oregon Hunger Equation is a conservative model. The amount of data that is available for looking at hunger in Oregon is vast, and this program attempts to make sense of it by showing the simplest, best-case scenarios in counties across Oregon. For more info about how this model was built, take a look at the <Link style={{ color: "#669776" }} to="/data-deep-dive">data deep dive.</Link>
                </p>
                <p className="fine-print">This website is intended to be used for informational purposes only, as a tool to better understand hunger throughout Oregon. It is not intended to be used to calculate actual SNAP or school meal benefits for an individual or family. Visit the <Link to="/data-deep-dive">data deep dive</Link> page for details on what is included in the calculations.</p>
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
