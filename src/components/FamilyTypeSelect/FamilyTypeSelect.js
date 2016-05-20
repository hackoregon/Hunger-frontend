import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'

require('./FamilyTypeSelect.css')

export default class FamilyTypeSelect extends React.Component {
  constructor() {
    super()
    this._onSelect = this._onSelect.bind(this)
  }

  _onSelect() {
    for (let elem in this.refs) {
      if (this.refs[elem].checked) {
        this.props.onSelect(this.refs[elem].id)
        break
      }
    }
  }

  render() {
    return (
      <div className="row family-types-wrapper" onClick={this._onSelect}>
        <p className="select-family-type-p text-center">Select a Family Type:</p>
        <div className="col-xs-12 col-sm-4 family-type-div">
          <div className="text-center">
            <input ref="single-adult" type="radio" id="single-adult" name="family-type" className="family-type-radio" />
            <label id="label-single-adult" htmlFor="single-adult" className="family-type-label">
              <img className="center-block"
                src="src/assets/person_single.png" alt="a single adult" />
            </label>
            <p>Single Adult</p>
            </div>
        </div>
        <div className="col-xs-12 col-sm-4 family-type-div">
          <div className="text-center">
            <input ref="single-parent" id="single-parent" type="radio" name="family-type" className="family-type-radio" />
            <label id="label-single-parent" htmlFor="single-parent" className="family-type-label">
              <img className="center-block"
              src="src/assets/HO_familyType_parent_twoKids_color.png" alt="a single parent with two children" />
            </label>
            <p>Single Parent, Two Children</p>
          </div>
        </div>
        <div className="col-xs-12 col-sm-4 family-type-div">
          <div className="text-center">
            <input ref="two-parents" id="two-parents" type="radio" name="family-type" className="family-type-radio" />
            <label id="label-two-parents" htmlFor="two-parents" className="family-type-label">
              <img className="center-block"
              src="src/assets/HO_familyType_2_parent_twoKids_color.png" alt="two parents with two children" />
            </label>
            <p>Two Parents, Two Children</p>
          </div>
        </div>
      </div>
    )
  }
}
