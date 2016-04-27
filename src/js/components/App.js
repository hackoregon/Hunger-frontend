import React from 'react'

export default class App extends React.Component {
  constructor() {
    super()
  }
  render() {
    return (
      <div>
        <header>
          <h1 className="main-title">Oregon Hunger Equation</h1>
        </header>
        <section className="select-family-and-county container-fluid">
          <div className="row">
            <div className="col-xs-12">
                <p className="text-center">Project Mission Statement:</p>
                <p className="text-center intro-text">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Blah.
                </p>
                <div className="dropdown county-dropdown">
                <p className="text-center">Select a County:</p>
                  <button className="btn btn-default dropdown-toggle county-dropdown-toggle" type="button" id="county-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                    Dropdown
                    <span className="caret"></span>
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="county-dropdown">
                    <li><a href="#">Action</a></li>
                    <li><a href="#">Another action</a></li>
                    <li><a href="#">Something else here</a></li>
                  </ul>
                  <p className="text-center">Select a Family Type:</p>
                </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}
