import React from 'react'
import Slider from 'rc-slider'
import Indicator from './Indicator'

require('../../styles/main.scss')
require('../../styles/rc-slider.scss')

export default class App extends React.Component {
  constructor() {
    super()
  }
  render() {

    const marks = {
      0: '$0',
      200: '$200',
      700: '$700',
      1200: '$1200',
      2000: '$2000'
    }
    const dollarFormatter = (val) => ("$" + val);
    return (
      <div>
        <header>
          <h1 className="main-title">Oregon Hunger Equation</h1>
        </header>
        <section className="family-and-county-section container-fluid">
          <div className="row">
            <div className="col-xs-12">
                <p className="text-center">Project Mission Statement:</p>
                <p className="text-center">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Blah.
                </p>
                <div className="dropdown county-dropdown">
                <p className="select-county-p text-center">Select a County:</p>
                  <button className="btn btn-default dropdown-toggle county-dropdown-toggle" type="button" id="county-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                    Dropdown
                    <span className="caret"></span>
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="county-dropdown">
                    <li><a href="#">Action</a></li>
                    <li><a href="#">Another action</a></li>
                    <li><a href="#">Something else here</a></li>
                  </ul>
                </div>
                <div className="row family-types-wrapper">
                  <p className="select-family-type-p text-center">Select a Family Type:</p>
                  <div className="col-xs-12 col-sm-4 family-type-div">
                    <div className="text-center">
                      <label id="label-single-adult" className="family-type-label">
                        <img className="img-responsive center-block"
                          src="dist/images/HO_familyType_single_color.svg" alt="a single adult" />
                        <input type="checkbox" className="family-type-checkbox" />
                        Single Adult
                      </label>
                      </div>
                  </div>
                  <div className="col-xs-12 col-sm-4 family-type-div">
                    <div className="text-center">
                      <label id="label-single-parent" className="family-type-label">
                        <img className="img-responsive center-block"
                          src="dist/images/HO_familyType_parent_twoKids_color.svg" alt="a single parent with two children" />
                        <input type="checkbox" className="family-type-checkbox" />
                        Single Parent, Two Children
                      </label>
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-4 family-type-div">
                    <div className="text-center">
                      <label id="label-two-parents" className="family-type-label">
                        <img className="img-responsive center-block"
                        src="dist/images/HO_familyType_twoParent_twoKids_color.svg" alt="two parents with two children" />
                        <input type="checkbox" className="family-type-checkbox" />
                        Two Parents, Two Children
                      </label>
                    </div>
                  </div>
                </div> { /* end family-types-wrapper */ }
                <div className="slider-wrapper center-block">
                  <Slider
                    max={2000}
                    tipTransitionName="rc-slider-tooltip-zoom-down"
                    tipFormatter={dollarFormatter}
                    marks={marks}
                    step={2}
                    dots={false}
                  />
                </div>
            </div>
          </div>
        </section>
        <section className="day-to-day-section container-fluid">
        <div className="row">
          <div className="col-xs-12">
            <Indicator />
            <h2 className="text-center">
            What’s your day-to-day experience putting food on the table?
            </h2>
            <p>
              In general, you are struggling to put food on the table. It’s
              likely that you and your children are skipping meals or
              watering down food. You are eligible for benefits, but you
              are still not able to supply every meal for yourself and your
              family. In total, your family is missing X meals per month,
              which could mean that you (and your partner) are skipping
              three meals for every one meal that your kids are skipping.
            </p>
          </div>
        </div>
        </section>
      </div>
    )
  }
}
