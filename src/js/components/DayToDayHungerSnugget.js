import React, { PropTypes } from 'react'

const DayToDayHungerSnugget = (props) => {
  let content;
  switch (props.securityStatus) {
    case "very insecure":
      content = (<p className="day-to-day-hunger-snugget">
          You are very insecure. You're missing <span className="meals-missed">{props.mealsMissed}</span> meals.</p>)
      break
    case "moderately insecure":
      content = (<p className="day-to-day-hunger-snugget">
          You are moderately insecure. You're missing <span className="meals-missed">{props.mealsMissed}</span> meals.</p>)
      break
    case "moderately secure":
      content = (<p className="day-to-day-hunger-snugget">
        You are moderately insecure. You're not missing meals, but you might struggle if you have unexpected expenses.</p>)
      break
    case "very secure":
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
  securityStatus: PropTypes.string.isRequired
}

export default DayToDayHungerSnugget
