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
    // expect(shallow(<Snugget {...minProps} />).find('.snugget-heading').length)
    //   .toEqual(1)
  })
  it('has some text content')
  it('has the correct heading color for sufficient families')
  it('has the correct heading color for vulnerable families')
  it('has the correct text for a sufficient single individual')
  it('has the correct text for a sufficient family of three')
  it('has the correct text for a sufficient family of four')
})
