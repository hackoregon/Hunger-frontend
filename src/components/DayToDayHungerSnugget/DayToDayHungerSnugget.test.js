import React from 'react'
import expect from 'expect'
import { shallow } from 'enzyme'
import Snugget from './DayToDayHungerSnugget'

const minProps = {
  securityStatus: 0,
  individuals: 1
}

describe('DayToDayHungerSnugget', function() {
  it('has a heading', function hasHeading() {
    expect(shallow(<Snugget {...minProps} />).find('.snugget-heading').length)
      .toEqual(1)
  })
  it('has some text content', function hasText() {
    expect(shallow(<Snugget {...minProps} />).find('.snugget-text').text().length)
      .toBeGreaterThan(0)
  })
  it('has the correct heading color for sufficient families', function sufficientHeadingColor() {
    expect(shallow(<Snugget individuals={1} securityStatus={3} />)
      .find('.snugget-heading')
      .at(0)
      .prop('style').color)
      .toEqual('#669776')
    expect(shallow(<Snugget individuals={3} securityStatus={3} />)
      .find('.snugget-heading')
      .at(0)
      .prop('style').color)
      .toEqual('#669776')
    expect(shallow(<Snugget individuals={4} securityStatus={3} />)
      .find('.snugget-heading')
      .at(0)
      .prop('style').color)
      .toEqual('#669776')
  })
  it('has the correct heading color for vulnerable families')
  it('has the correct text for a sufficient single individual')
  it('has the correct text for a sufficient family of three')
  it('has the correct text for a sufficient family of four')
})
