import React from 'react'
import expect from 'expect'
import { shallow } from 'enzyme'
import Snugget from './DayToDayHungerSnugget'
import { RATINGS } from '../../fixtures/constants'

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
  it('has the correct text for a moderately sufficient single individual', function correctTextModSuffSingle() {
    const snuggetText = "For the most part you are able to put food on the table. You may live month-to-month but you are able to feed yourself complete meals most of the time. You may or may not be eligible for benefits."

    expect(shallow(<Snugget individuals={1} securityStatus={2} />).find('.snugget-text').text())
    .toEqual(snuggetText)
  })
  it('has the correct text for a moderately sufficient family of three', function correctTextModSuffThree() {
    const snuggetText = "For the most part you are able to put food on the table. You may live month-to-month and you may skip the occasional meal in order to make sure your children have enough to eat. You may or may not be eligible for benefits."

    expect(shallow(<Snugget individuals={3} securityStatus={2} />).find('.snugget-text').text())
    .toEqual(snuggetText)
  })
  it('has the correct text for a moderately sufficient family of four', function correctTextModSuffFour() {
    const snuggetText = "For the most part you are able to put food on the table. You may live month-to-month and you and your partner may skip the occasional meal in order to make sure your children have enough to eat. You may or may not be eligible for benefits."

    expect(shallow(<Snugget individuals={4} securityStatus={2} />).find('.snugget-text').text())
    .toEqual(snuggetText)
  })

  it('has the correct text for a vulnerable single individual', function correctTextVulnerableSingle() {
    const snuggetText = "In general, you are struggling to put food on the table. It’s likely that you are skipping meals or watering down food. If you are receiving benefits, you are still struggling."

    expect(shallow(<Snugget individuals={1} securityStatus={1} />).find('.snugget-text').text())
    .toEqual(snuggetText)
  })
  it('has the correct text for a vulnerable family of three', function correctTextVulnerableThree() {
    const snuggetText = "In general, you are struggling to put food on the table. It’s likely that you and your children are skipping meals or watering down food. If you are receiving benefits, you are still struggling."

    expect(shallow(<Snugget individuals={3} securityStatus={1} />).find('.snugget-text').text())
    .toEqual(snuggetText)
  })
  it('has the correct text for a vulnerable family of four', function correctTextVulnerableFour() {
    const snuggetText = "In general, you are struggling to put food on the table. It’s likely that you, your partner, and your children are skipping meals or watering down food. If you are receiving benefits, you are still struggling."

    expect(shallow(<Snugget individuals={4} securityStatus={1} />).find('.snugget-text').text())
    .toEqual(snuggetText)

  })
  it('has the correct text for an extremely vulnerable single individual', function correctTextExtremelyVulnerableSingle() {
    const snuggetText = "Having enough food is a constant struggle. Every month you are likely to skip and water down multiple meals. You are most likely eligible for benefits but you are still not getting enough food."

    expect(shallow(<Snugget individuals={1} securityStatus={0} />).find('.snugget-text').text())
    .toEqual(snuggetText)
  })
  it('has the correct text for an extremely vulnerable family of three', function correctTextExtremelyVulnerableThree() {
    const snuggetText = "Having enough food for yourself and your children is a constant struggle. Every month you are likely to skip and water down multiple meals. You are most likely eligible for benefits and yet you are still not getting enough food."

    expect(shallow(<Snugget individuals={3} securityStatus={0} />).find('.snugget-text').text())
    .toEqual(snuggetText)
  })
  it('has the correct text for an extremely vulnerable family of four', function correctTextExtremelyVulnerableFour() {
    const snuggetText = "Having enough food for yourself, your partner, and your children is a constant struggle. Every month you are likely to skip and water down multiple meals. You are most likely eligible for benefits and yet you are still not getting enough food."

    expect(shallow(<Snugget individuals={4} securityStatus={0} />).find('.snugget-text').text())
    .toEqual(snuggetText)
  })
})
