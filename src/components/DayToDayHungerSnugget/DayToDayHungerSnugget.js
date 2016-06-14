import React, { PropTypes } from 'react'
import constants from '../../fixtures/constants'

require('./DayToDayHungerSnugget.css')

const DayToDayHungerSnugget = (props) => {
  const { RATINGS } = constants
  let content
  console.log("snugget securityStatus:", props.securityStatus)
  switch (props.securityStatus) {
    case 1:
      content = (<p className="day-to-day-hunger-snugget">
          You are very insecure. You're missing <span className="meals-missed">{props.mealsMissed}</span> meals.</p>)
      break
    case 2:
      content = (<p className="day-to-day-hunger-snugget">
          You are moderately insecure. You're missing <span className="meals-missed">{props.mealsMissed}</span> meals.</p>)
      break
    case 3:
      content = (<p className="day-to-day-hunger-snugget">
        You are moderately insecure. You're not missing meals, but you might struggle if you have unexpected expenses.</p>)
      break
    case 4:
      content = (<p className="day-to-day-hunger-snugget">
        You are very secure. You're not missing meals, and can consistently afford to buy the food you need.</p>)
      break
    default:
      content = (<p>Unknown security rating.</p>)
  }
  return (
    <div className="snugget-root">{content}</div>
  )
}

DayToDayHungerSnugget.propTypes = {
  securityStatus: PropTypes.number.isRequired
}

export default DayToDayHungerSnugget
