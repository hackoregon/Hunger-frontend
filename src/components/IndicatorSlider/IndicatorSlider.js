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
    const { prefixCls, value, colors, sections, max, labels } = this.props
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
    const labelStyle = {
      width: `${100 / numSections}%`,
      textAlign: "center"
    }
    const labelsList = labels.map((label, i) => {
      return (<span key={i} className={`${prefixCls}-label`} style={labelStyle}>{label}</span>)
    })
    const labelContainerStyle = {
      display: "flex",
      justifyContent: "space-around",
      marginTop: "1em"
    }
    return (
      <div>
        <Slider
          prefixCls={prefixCls}
          tipFormatter={null}
          value={value}
          max={max}
        >
          {sectionList}
        </Slider>
        <div className={`${prefixCls}-labels`} style={labelContainerStyle}>{labelsList}</div>
      </div>
    )
  }
}

IndicatorSlider.propTypes = {
  prefixCls: PropTypes.string,
  sections: PropTypes.number,
  colors: PropTypes.arrayOf(PropTypes.string),
  labels: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.number.isRequired,
}

IndicatorSlider.defaultProps = {
  prefixCls: "rc-indicator-slider",
}
