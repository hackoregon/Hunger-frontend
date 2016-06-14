import { schoolMeals, costOfMeals, housing } from '../../fixtures/data'
import constants from '../../fixtures/constants'

const { MEAL_PERIOD_DAYS } = constants

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

function incomePlusBenefits(individuals, income, fips) {
  const moneyAfterMisc = Math.round(moneyAfterHousing(individuals, income, fips) * 0.75)
  const snapBenefit = snapCalculator(individuals, income, fips)
  const schoolMealBenefit = getSchoolMealBenefit(individuals, fips)

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
}
