import React, { PropTypes } from 'react'
import constants from '../../fixtures/constants'

require('./DayToDayHungerSnugget.css')

const DayToDayHungerSnugget = (props) => {
  const { RATINGS } = constants
  let content, heading, headingColor

  headingColor = "#b5441d" // default to dark orange
  switch (props.securityStatus) {
    case RATINGS['extremelyVulnerable']:
      heading = "Extremely Vulnerable"
      switch (props.individuals) {
        case 1:
          content = "Having enough food is a constant struggle. Every month you are likely to skip and water down multiple meals. You are most likely eligible for benefits but you are still not getting enough food."
          break
        case 3:
          content = "Having enough food for yourself and your children is a constant struggle. Every month you are likely to skip and water down multiple meals. You are most likely eligible for benefits and yet you are still not getting enough food."
          break
        case 4:
          content = "Having enough food for yourself, your partner, and your children is a constant struggle. Every month you are likely to skip and water down multiple meals. You are most likely eligible for benefits and yet you are still not getting enough food."
          break
        default:
          content = "We couldn't determine your household size. Sorry."
          break
      }
      break
    case RATINGS['vulnerable']:
      heading = "Vulnerable"
      switch (props.individuals) {
        case 1:
          content = "In general, you are struggling to put food on the table. It’s likely that you are skipping meals or watering down food. If you are receiving benefits, you are still struggling."
          break
        case 3:
          content = "In general, you are struggling to put food on the table. It’s likely that you and your children are skipping meals or watering down food. If you are receiving benefits, you are still struggling."
          break
        case 4:
          content = "In general, you are struggling to put food on the table. It’s likely that you, your partner, and your children are skipping meals or watering down food. If you are receiving benefits, you are still struggling."
          break
        default:
          content = "We couldn't determine your household size. Sorry."
          break
      }
      break
    case RATINGS['moderatelySufficient']:
      heading = "Moderately Sufficient"
      switch (props.individuals) {
        case 1:
          content = "For the most part you are able to put food on the table. You may live month-to-month but you are able to feed yourself complete meals most of the time. You may or may not be eligible for benefits."
          break
        case 3:
          content = "For the most part you are able to put food on the table. You may live month-to-month and you may skip the occasional meal in order to make sure your children have enough to eat. You may or may not be eligible for benefits."
          break
        case 4:
          content = "For the most part you are able to put food on the table. You may live month-to-month and you and your partner may skip the occasional meal in order to make sure your children have enough to eat. You may or may not be eligible for benefits."
          break
        default:
          content = "We couldn't determine your household size. Sorry."
          break
      }
      break
    case RATINGS['sufficient']:
      heading = "Sufficient"
      headingColor = "#669776" // sufficient gets dark green
      switch (props.individuals) {
        case 1:
          content = "You do not have trouble putting food on the table. Your meals are complete and you generally do not skip meals. You are either not eligible for benefits or your benefits cover your meals sufficiently."
          break
        case 3:
          content = "You don’t have trouble putting food on the table. Your meals are complete and you and your children generally do not skip meals. You are either not eligible for benefits or your benefits cover your meals sufficiently."
          break
        case 4:
          content = "You don’t have trouble putting food on the table. Your meals are complete and you, your partner, and your children generally do not skip meals. You are either not eligible for benefits or your benefits cover your meals sufficiently."
          break
        default:
          content = "We couldn't determine your household size. Sorry."
          break
      }
      break
    default:
      content = "We couldn't determine your food security status. Sorry."
  }
  return (
    <div className="snugget-root">
      <h3 className="snugget-heading" style={{ color: headingColor }}>{heading}</h3>
      <p className="snugget-text">{content}</p>
    </div>
  )
}

DayToDayHungerSnugget.propTypes = {
  securityStatus: PropTypes.number.isRequired,
  individuals: PropTypes.number.isRequired,
}

export default DayToDayHungerSnugget
