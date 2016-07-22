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
  it('has the correct heading color for vulnerable families', function vulnerableHeadingColor() {
    expect(shallow(<Snugget individuals={1} securityStatus={0} />)
    .find('.snugget-heading')
    .at(0)
    .prop('style').color)
    .toEqual('#b5441d')
    expect(shallow(<Snugget individuals={3} securityStatus={0} />)
    .find('.snugget-heading')
    .at(0)
    .prop('style').color)
    .toEqual('#b5441d')
    expect(shallow(<Snugget individuals={4} securityStatus={0} />)
    .find('.snugget-heading')
    .at(0)
    .prop('style').color)
    .toEqual('#b5441d')
    expect(shallow(<Snugget individuals={1} securityStatus={1} />)
    .find('.snugget-heading')
    .at(0)
    .prop('style').color)
    .toEqual('#b5441d')
    expect(shallow(<Snugget individuals={3} securityStatus={1} />)
    .find('.snugget-heading')
    .at(0)
    .prop('style').color)
    .toEqual('#b5441d')
    expect(shallow(<Snugget individuals={4} securityStatus={1} />)
    .find('.snugget-heading')
    .at(0)
    .prop('style').color)
    .toEqual('#b5441d')
    expect(shallow(<Snugget individuals={1} securityStatus={2} />)
    .find('.snugget-heading')
    .at(0)
    .prop('style').color)
    .toEqual('#b5441d')
    expect(shallow(<Snugget individuals={3} securityStatus={2} />)
    .find('.snugget-heading')
    .at(0)
    .prop('style').color)
    .toEqual('#b5441d')
    expect(shallow(<Snugget individuals={4} securityStatus={2} />)
    .find('.snugget-heading')
    .at(0)
    .prop('style').color)
    .toEqual('#b5441d')
  })
  it('has the correct text for a sufficient single individual', function correctTextSufficientSingle() {
    const snuggetText = "You do not have trouble putting food on the table. Your meals are complete and you generally do not skip meals. You are either not eligible for benefits or your benefits cover your meals sufficiently."

    expect(shallow(<Snugget individuals={1} securityStatus={3} />).find('.snugget-text').text())
      .toEqual(snuggetText)
  })
  it('has the correct text for a sufficient family of three', function correctTextSufficientThree() {
    const snuggetText = "You don’t have trouble putting food on the table. Your meals are complete and you and your children generally do not skip meals. You are either not eligible for benefits or your benefits cover your meals sufficiently."

    expect(shallow(<Snugget individuals={3} securityStatus={3} />).find('.snugget-text').text())
    .toEqual(snuggetText)
  })
  it('has the correct text for a sufficient family of four', function correctTextSufficientFour() {
    const snuggetText = "You don’t have trouble putting food on the table. Your meals are complete and you, your partner, and your children generally do not skip meals. You are either not eligible for benefits or your benefits cover your meals sufficiently."

    expect(shallow(<Snugget individuals={4} securityStatus={3} />).find('.snugget-text').text())
    .toEqual(snuggetText)
  })
  it('has the correct text for a moderately sufficient single individual')
  it('has the correct text for a moderately sufficient family of three')
  it('has the correct text for a moderately sufficient family of four')

  it('has the correct text for a vulnerable single individual')
  it('has the correct text for a vulnerable family of three')
  it('has the correct text for a vulnerable family of four')

  it('has the correct text for an extremely vulnerable single individual')
  it('has the correct text for an extremely vulnerable family of three')
  it('has the correct text for an extremely vulnerable family of four')
})
