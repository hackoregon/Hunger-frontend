import { schoolMeals, costOfMeals, housing } from '../../fixtures/data'
import { sssMiscellaneous } from '../../fixtures/sssMiscellaneous'
import { sssTransportation } from '../../fixtures/sssTransportation'
import constants from '../../fixtures/constants'

const { MEAL_PERIOD_DAYS } = constants

const getSSSMiscellaneous = (individuals, fips) => Number(
  sssMiscellaneous[fips][`miscellaneous_${individuals}`].toFixed(2)
)
const getSSSTransportation = (individuals, fips) => Number(
  sssTransportation[fips][`transportation_${individuals}`].toFixed(2)
)

function getBarChartValues(individuals, income, fips, bar = 'misc') {

  const transportationCost = getSSSTransportation(individuals, fips)
  const miscellaneousCost = getSSSMiscellaneous(individuals, fips)

  if (bar === 'transportation_fixed') {
    return transportationCost
  } else if (bar === 'miscellaneous_fixed') {
    return miscellaneousCost
  } else {
    // calculate the money our model set aside for spending on transportation and miscellaneous
    const moneyForOtherStuff = moneyAfterHousing(individuals, income, fips) * 0.25
    // calculate the overflow for each bar: if it's > 0, that cost is covered
    // moneyForOtherStuff is split 50/50 between transportation and miscellaneous
    const transportationExtra = Math.max(0, (moneyForOtherStuff * 0.5) - transportationCost)
    const miscellaneousExtra = Math.max(0, (moneyForOtherStuff * 0.5) - miscellaneousCost)
    // allocate money to each bar + any extra from the other bar
    const moneyTowardTranspo = (moneyForOtherStuff * 0.5) + miscellaneousExtra
    const moneyTowardMisc = (moneyForOtherStuff * 0.5) + transportationExtra

    // limit the bar value to be, at most, the corresponding sss budget value
    // (cost covered)
    let barValue
    if (bar === 'transportation') {
      barValue = Number(Math.min(moneyTowardTranspo, transportationCost).toFixed(2))
    } else if (bar === 'miscellaneous') {
      barValue = Number(Math.min(moneyTowardMisc, miscellaneousCost).toFixed(2))
    }
    return barValue

    // if both bars have extra money (all costs are met), that overflow goes toward food
    // but we should calculate this in App because all of the needed functions are exported.
    //   const moneyForOtherStuff = moneyAfterHousing(individuals, income, fips) * 0.25
    //   const transportationCost = getSSSTransportation(individuals, fips)
    //   const miscellaneousCost = getSSSMiscellaneous(individuals, fips)
    //   const excessTowardFood = Math.max(0, moneyForOtherStuff - (transportationCost + miscellaneousCost))
    //   if (excessTowardFood) {
    //       const extraMeals = Math.floor(excessTowardFood / costOfMeals[fips].cost_per_meal)
    //   }
  }
}

function getMonthlyMealCost(individuals, fips) {
  if (individuals === 1) {
    return costOfMeals[fips].monthly_cost_one
  } else if (individuals === 3) {
    return costOfMeals[fips].monthly_cost_three
  } else if (individuals === 4) {
    return costOfMeals[fips].monthly_cost_four
  } else {
    throw new Error('invalid number of individuals')
  }
}

function snapCalculator(individuals, income, fips) {
  let limit, shelter, maxBenefit
  if (individuals === 1) {
    limit = 1832
    shelter = housing[fips].median_housing_one
    maxBenefit = 194
  } else if (individuals === 3) {
    limit = 3208
    shelter = housing[fips].median_housing_three
    maxBenefit = 511
  } else if (individuals === 4) {
    limit = 3750
    shelter = housing[fips].median_housing_four
    maxBenefit = 649
  } else {
    throw new Error("Invalid number of individuals")
  }

  if (income > limit) {
    return 0
  }

  let adjustedIncome = income - (income * 0.2) - 155
  if (adjustedIncome < 0) {
    adjustedIncome = 0
  }
  let excessShelterDeduction = shelter - adjustedIncome / 2
  let netIncome = Math.max((adjustedIncome - excessShelterDeduction), 0)
  let snapLoss = netIncome * 0.3
  let snapBenefit = Number((maxBenefit - snapLoss).toFixed(2))

  return Math.max(0, snapBenefit)
}

function getHousingCost(individuals, fips) {
  if (individuals === 1) {
    return housing[fips].median_housing_one
  } else if (individuals === 3) {
    return housing[fips].median_housing_three
  } else if (individuals === 4) {
    return housing[fips].median_housing_four
  } else {
    throw new Error("Invalid number of individuals")
  }
}

function moneyAfterHousing(individuals, income, fips) {
  let result

  if (individuals === 1) {
    result = income - housing[fips].median_housing_one
  } else if (individuals === 3) {
    result = income - housing[fips].median_housing_three
  } else if (individuals === 4) {
    result = income - housing[fips].median_housing_four
  } else {
    throw new Error("Invalid number of individuals")
  }

  return Math.max(0, Number(result.toFixed(2)))
}

function getSchoolMealBenefit(individuals, fips) {
  let schoolMealBenefit
  if (individuals === 1) {
    schoolMealBenefit = 0
  } else if (individuals === 3) {
    schoolMealBenefit = schoolMeals[fips].meal_supplement_in_dollar_2014
  } else if (individuals === 4) {
    schoolMealBenefit = schoolMeals[fips].meal_supplement_in_dollar_2014
  } else {
    throw new Error('invalid number of individuals')
  }
  return schoolMealBenefit
}

function incomePlusBenefits(individuals, income, fips, bestCase = true) {
  const moneyAfterMisc = Math.round(moneyAfterHousing(individuals, income, fips) * 0.75)
  const snapBenefit = snapCalculator(individuals, income, fips)
  const schoolMealBenefit = bestCase ? getSchoolMealBenefit(individuals, fips) : 0

  return Math.max(0, Number((moneyAfterMisc + snapBenefit + schoolMealBenefit).toFixed(2)))
}

function calcMealGap(individuals, income, fips, bestCase = true) {

  /*
  User inputs family type (1,3,4), income, a fips.
  Currently, I have bestCase=True set as the default. This means the algorithm will return the number of
  'meals short' during the school year. It still accounts for whether or not a county offers a third meal.
  If bestCase is set to True, the algorithm returns the number of 'meals short' without any supplemental
  programming at all.
  */

  // return best and worst case scenarios
  let schoolMealBenefit = getSchoolMealBenefit(individuals, fips)

  if (!bestCase) {
    schoolMealBenefit = 0
  }
  /* These are expressed in terms of income */
  // 25% taken off for misc
  const incomeAfterHousingCost = Math.max(0, moneyAfterHousing(individuals, income, fips) * 0.75)
  const snap = snapCalculator(individuals, income, fips)
  const incomePlusBenefits = Math.max(
    0, Math.round(incomeAfterHousingCost + snap + schoolMealBenefit))

  /* convert income to meals */
  const mealsCanAfford = Math.round(incomePlusBenefits / costOfMeals[fips].cost_per_meal)

  /* These are expressed in terms of meals */
  const totalMealsGoal = individuals * 3 * MEAL_PERIOD_DAYS
  const mealGap = totalMealsGoal - mealsCanAfford

  return Math.max(0, Math.round(mealGap))
}

export {
  calcMealGap,
  moneyAfterHousing,
  snapCalculator,
  getMonthlyMealCost,
  getHousingCost,
  incomePlusBenefits,
  getSchoolMealBenefit,
  getSSSMiscellaneous,
  getSSSTransportation,
  getBarChartValues,
}
