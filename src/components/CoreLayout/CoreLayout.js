import React from 'react'
import { Link } from 'react-router'

const CoreLayout = (props) => (
  <div className="core-layout-root">
    <header>
      <nav className="navbar navbar-default navbar-static-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <div className="ho-logo-wrapper pull-left">
              <span className="navbar-text navbar-left">Built by</span>
                <a href="http://www.hackoregon.org/">
                    <img className="img-responsive ho-logo-gray navbar-left" src="src/assets/HO_logo_gray.png" alt="Hack  Oregon logo"/>
                </a>
            </div>
          </div>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav navbar-right">
                <li className="nav-item"><Link to="/home">Home</Link></li>
                <li className="nav-item-separator hidden-xs"><span></span></li>
                <li className="nav-item"><Link to="/data-deep-dive">Data Deep Dive</Link></li>
                <li className="nav-item-separator hidden-xs"><span></span></li>
                <li className="nav-item"><Link to="/team">Team</Link></li>
              </ul>
           </div>
         </div>
      </nav>
    </header>
    {props.children}
  </div>
)

export default CoreLayout
