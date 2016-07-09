import React from 'react'
import expect from 'expect'
import { shallow } from 'enzyme'
import HorizontalRule from './HorizontalRule'

describe('HorizontalRule', function() {
  it('renders children', function() {
    const wrapper = shallow(
      <HorizontalRule>
        <div className="child" />
      </HorizontalRule>
    )
    expect(wrapper.contains(<div className="child" />)
  ).toEqual(true)
  })
})
