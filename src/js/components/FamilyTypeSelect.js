import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'

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
              <img className="img-responsive center-block"
                src="dist/assets/images/HO_familyType_single_color.svg" alt="a single adult" />
              Single Adult
            </label>
            </div>
        </div>
        <div className="col-xs-12 col-sm-4 family-type-div">
          <div className="text-center">
            <input ref="single-parent" id="single-parent" type="radio" name="family-type" className="family-type-radio" />
            <label id="label-single-parent" htmlFor="single-parent" className="family-type-label">
              <img className="img-responsive center-block"
              src="dist/assets/images/HO_familyType_parent_twoKids_color.svg" alt="a single parent with two children" />
              Single Parent, Two Children
            </label>
          </div>
        </div>
        <div className="col-xs-12 col-sm-4 family-type-div">
          <div className="text-center">
            <input ref="two-parents" id="two-parents" type="radio" name="family-type" className="family-type-radio" />
            <label id="label-two-parents" htmlFor="two-parents" className="family-type-label">
              <img className="img-responsive center-block"
              src="dist/assets/images/HO_familyType_twoParent_twoKids_color.svg" alt="two parents with two children" />
              Two Parents, Two Children
            </label>
          </div>
        </div>
      </div>
    )
  }
}
