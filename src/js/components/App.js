import React from 'react'
import Slider from 'rc-slider'
import Indicator from './Indicator'
import HorizontalRule from './HorizontalRule'

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
        <section className="mission-statement container-fluid">
          <div className="row">
          <div className="col-xs-4">
            <img className="img-responsive placeholder" />
          </div>
            <div className="col-xs-8">
              <h2>Project Mission Statement:</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </section>
        <HorizontalRule>
          <h2 className="hr-content">Select a County</h2>
        </HorizontalRule>

        <section className="family-and-county-section container-fluid">
          <div className="row">
            <div className="col-xs-12">
                <div className="dropdown county-dropdown">
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
        <HorizontalRule>
          <img className="hr-content hr-image" src="dist/images/apple.svg" />
        </HorizontalRule>
        <section className="day-to-day-section container-fluid">
        <div className="row">
          <div className="col-xs-12">
            <h2 className="text-center">
            What’s your day-to-day experience putting food on the table?
            </h2>
            <Indicator />
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
        <section className="lunch-section">
          <div className="row">
            <div className="col-xs-12">
              <h2 className="text-center">
                How does free and reduced lunch affect your family?
              </h2>
              <p>
                Thankfully, much of your county has free and reduced lunch programs available so we have accounted for that in this equation. These programs provide 10 meals per week for your children.
              </p>
              <p>
                However, many school districts in the state do not have these expanded programs and face new hardships during summer when school is out. This is what your scenario would look like without the help of free and reduced price lunch programs.
              </p>
            </div>
          </div>
          <Indicator />
        </section>
        <section className="housing">
          <div className="row">
            <div className="col-xs-12">
              <h2 className="text-center">
                Are you able to afford stable housing?
              </h2>
              <p>
                At your income, you are able to afford housing in X county, which has an average minimum cost of housing of X. However, because about 2/3 of your income is going to pay for housing, this makes your ability to pay for food that much more difficult.
              </p>
              <div className="placeholder"></div>
            </div>
          </div>
        </section>
        <section className="map-view-section">
          <div className="row">
            <div className="col-xs-12">
              <h2 className="text-center">
                Would my situation be different if I live in another area in Oregon?
              </h2>
              <p>
                The reality of your situation could be different if you lived in a different county, based on the cost of housing, the availability of free and reduced lunch programs, and what other benefits are available. This map shows what your category might be if you lived in a different county in Oregon:
              </p>
              <div className="row map-row">
                <div className="col-xs-12 col-sm-6 map-wrapper food-map-wrapper">
                  <h3 className="text-center">Food Map</h3>
                  <img src="dist/images/HO_map_color.svg" className="img-responsive center-block" alt="map of statewide food access" />
                </div>
                <div className="col-xs-12 col-sm-6 map-wrapper housing-map-wrapper">
                  <h3 className="text-center">Housing Map</h3>
                  <img src="dist/images/HO_map_color.svg" className="img-responsive center-block" alt="map of statewide housing access" />
                </div>
              </div>
              <p>
                The average minimum cost of housing in your county is X, which is above average for the
                state of Oregon. See how your county compares to the rest of the state:
              </p>
              <div className="text-center">
                <p>Conclusion:</p>
                <p className="conclusion-text">
                  Lorem ipsum dolor sit amet, con mus malesuada leo nec venenatis. In pulvinar faucibus mus malesuada leo nec venenatis. In pulvinar faucibus mus malesuada leo nec venenatis. In pulvinar faucibus.
                </p>
              </div>
            </div>
          </div>
        </section>
        <footer>
          <img src="dist/images/HO_logo.png" className="img-responsive center-block ho-logo" alt="The Hack Oregon logo" />
        </footer>
      </div>
    )
  }
}
