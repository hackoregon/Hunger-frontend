import { schoolMeals, costOfMeals, housing } from '../../fixtures/data'

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
  let netIncome = adjustedIncome - excessShelterDeduction
  let snapLoss = netIncome * 0.3
  let snapBenefit = maxBenefit - snapLoss
  if (snapBenefit <= 0) {
    snapBenefit = 0
  }
  return snapBenefit
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

  return result
}

function getRemainingIncome(individuals, income, fips, bestCase = true) {
  let monthlyMealCost
  let schoolMealBenefit
  let incomeAfterHousingCost

  if (individuals === 1) {
    monthlyMealCost = costOfMeals[fips].monthly_cost_one
    schoolMealBenefit = 0
  } else if (individuals === 3) {
    monthlyMealCost = costOfMeals[fips].monthly_cost_three
    schoolMealBenefit = schoolMeals[fips].meal_supplement_in_dollar_2014
  } else if (individuals === 4) {
    monthlyMealCost = costOfMeals[fips].monthly_cost_four
    schoolMealBenefit = schoolMeals[fips].meal_supplement_in_dollar_2014
  }

  if (!bestCase) {
    schoolMealBenefit = 0
  }

  incomeAfterHousingCost = Math.max(0, moneyAfterHousing(individuals, income, fips))
  let snap = snapCalculator(individuals, income, fips)

  let incomeRemainder = Math.round(incomeAfterHousingCost + snap + schoolMealBenefit - monthlyMealCost)

  const incomeRemaining = Math.max(0, incomeRemainder)
  // console.log("remaining income for", fips, incomeRemaining)

  return incomeRemaining
}

function calcMealGap(individuals, income, fips) {

  /*
  User inputs family type (1,3,4), income, a fips.
  Currently, I have bestCase=True set as the default. This means the algorithm will return the number of
  'meals short' during the school year. It still accounts for whether or not a county offers a third meal.
  If bestCase is set to True, the algorithm returns the number of 'meals short' without any supplemental
  programming at all.

  If you would prefer to see the dollar amount short instead of the meals short then set meal=false in the
  arguments. This will return the amount of money you would need to cover a monthly food bill.
  */

  // return best and worst case scenarios

  const incomeRemainder = getRemainingIncome(individuals, income, fips)

  if (incomeRemainder > 0) {
    let mealGap = individuals * 3 * 37 - incomeRemainder / costOfMeals[fips].cost_per_meal
    return Math.round(mealGap)
  }

  return 0
}

export {
  calcMealGap,
  getRemainingIncome
}
