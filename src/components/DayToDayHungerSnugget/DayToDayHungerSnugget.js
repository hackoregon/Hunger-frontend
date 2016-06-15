import React, { PropTypes } from 'react'
import constants from '../../fixtures/constants'

require('./DayToDayHungerSnugget.css')

const DayToDayHungerSnugget = (props) => {
  const { RATINGS } = constants
  let content
  console.log("RATINGS:", RATINGS)
  console.log("snugget securityStatus:", props.securityStatus)
  switch (props.securityStatus) {
    case RATINGS['extremelyVulnerable']:
      switch (props.individuals) {
        case 1:
          content = (<p className="day-to-day-hunger-snugget">
          You are extremely insecure. You're missing <span className="meals-missed">{props.mealsMissed}</span> meals.</p>)
          break
        case 3:
          content = (<p>You're an extremely insecure family of 3.</p>)
          break
        case 4:
          content = (<p>You're an extremely insecure family of 4.</p>)
          break
        default:
          content = (<p className="day-to-day-hunger-snugget">
          We couldn't determine your household size. Sorry.
          </p>)
          break
      }
      break
    case RATINGS['vulnerable']:
      switch (props.individuals) {
        case 1:
          content = (<p className="day-to-day-hunger-snugget">
          You are highly insecure. You're missing meals.</p>)
          break
        case 3:
          content = (<p>You're a highly insecure family of 3.</p>)
          break
        case 4:
          content = (<p>You're a highly insecure family of 4.</p>)
          break
        default:
          content = (<p className="day-to-day-hunger-snugget">
          We couldn't determine your household size. Sorry.
          </p>)
          break
      }
      break
    case RATINGS['moderatelySufficient']:
      switch (props.individuals) {
        case 1:
          content = (<p className="day-to-day-hunger-snugget">
          You are moderately insecure. You're missing meals.</p>)
          break
        case 3:
          content = (<p>You're a moderately insecure family of 3.</p>)
          break
        case 4:
          content = (<p>You're a moderately insecure family of 4.</p>)
          break
        default:
          content = (<p className="day-to-day-hunger-snugget">
          We couldn't determine your household size. Sorry.
          </p>)
          break
      }
      break
    case RATINGS['sufficient']:
      switch (props.individuals) {
        case 1:
          content = (<p className="day-to-day-hunger-snugget">
          You are a secure individual.</p>)
          break
        case 3:
          content = (<p>You're a secure family of 3.</p>)
          break
        case 4:
          content = (<p>You're a secure family of 4.</p>)
          break
        default:
          content = (<p className="day-to-day-hunger-snugget">
          We couldn't determine your household size. Sorry.
          </p>)
          break
      }
      break
    default:
      content = (<p>We couldn't determine your status. Sorry.</p>)
  }
  return (
    <div className="snugget-root">{content}</div>
  )
}

DayToDayHungerSnugget.propTypes = {
  securityStatus: PropTypes.number.isRequired,
  individuals: PropTypes.number.isRequired,
}

export default DayToDayHungerSnugget
