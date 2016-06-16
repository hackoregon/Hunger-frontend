import React, { PropTypes } from 'react'
import Slider from 'rc-slider'
import classnames from 'classnames'

require('./IndicatorSlider.css')

export default class IndicatorSlider extends React.Component {
  constructor() {
    super()
  }
  render() {
    let numSections = 0
    const { prefixCls, value, colors, sections, max } = this.props
    if (colors && colors.length > 0) {
      numSections = colors.length
    } else if (sections) {
      numSections = sections
    }

    let sectionList = Array.from(Array(numSections).keys()).map(
      (sectionNum) => {
        let classes = classnames({
          [`${prefixCls}-section`]: true,
          // ex: rc-slider-indicator-section-1...section-[sections]
          [`${prefixCls}-section-${sectionNum + 1}`]: true
        })
        if (colors) {
          let style = { backgroundColor: colors[sectionNum + 1] }
          return (<span key={sectionNum} className={classes} style={style}></span>)
        } else {
          return (<span key={sectionNum} className={classes}></span>)
        }
      }
    )
    return (
      <Slider
        prefixCls={prefixCls}
        tipFormatter={null}
        value={value}
        max={max}
      >
        {sectionList}
      </Slider>
    )
  }
}

IndicatorSlider.propTypes = {
  prefixCls: PropTypes.string,
  sections: PropTypes.number,
  colors: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.number.isRequired
}

IndicatorSlider.defaultProps = {
  prefixCls: "rc-indicator-slider",
}
