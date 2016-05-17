import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'

export default class FamilyTypeSelect extends React.Component {
  constructor() {
    super()
    this.state = {
      familyType: "none"
    }
    this._onSelect = this._onSelect.bind(this)
  }

  _onSelect(e) {
    let famType = this.refs.familyType
    if (famType.checked) {
      this.setState({ familyType: famType.id})
    }
  }

  render() {
    return (
      <div className="row family-types-wrapper" onClick={this._onSelect}>
        <p className="select-family-type-p text-center">Select a Family Type:</p>
        <div className="col-xs-12 col-sm-4 family-type-div">
          <div className="text-center">
            <input type="radio" id="single-adult-radio" name="family-type" className="family-type-radio" />
            <label id="label-single-adult" htmlFor="single-adult-radio" className="family-type-label">
              <img className="img-responsive center-block"
                src="dist/assets/images/HO_familyType_single_color.svg" alt="a single adult" />
              Single Adult
            </label>
            </div>
        </div>
        <div className="col-xs-12 col-sm-4 family-type-div">
          <div className="text-center">
            <input id="single-parent-2-kids-radio" type="radio" name="family-type" className="family-type-radio" />
            <label id="label-single-parent" htmlFor="single-parent-2-kids-radio" className="family-type-label">
              <img className="img-responsive center-block"
              src="dist/assets/images/HO_familyType_parent_twoKids_color.svg" alt="a single parent with two children" />
              Single Parent, Two Children
            </label>
          </div>
        </div>
        <div className="col-xs-12 col-sm-4 family-type-div">
          <div className="text-center">
            <input id="two-parents-2-kids-radio" type="radio" name="family-type" className="family-type-radio" />
            <label id="label-two-parents" htmlFor="two-parents-2-kids-radio" className="family-type-label">
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
