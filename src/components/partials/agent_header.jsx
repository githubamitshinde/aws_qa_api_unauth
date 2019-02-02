import React, { Component } from 'react';

import $ from 'jquery';
import image from "../../images/Icons/TIAA_IncomeShield-journey_styleguide-dev-02.png"
import '../../css/income_shield/income_shield_one.css';



export default class AgentHeader extends Component {
  constructor() {
    super();
    this.state = {
    }
  }

  componentDidMount() {

  }


  // function=()=>{

  // }

  render() {
    return (
      <div>
        <nav className="navbar">
          <div className="col-md-12">
            <div className="container">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="/login" id=""> <img src={image} style={{ height: "35px", marginTop: "-10px" }} /> </a>
              </div>
              <div id="navbar" className="collapse navbar-collapse">
                <ul className="nav navbar-nav">
                  {/* <!-- <li id="101"><a href="#section1">Home</a></li> --> */}
                  <li className="how_it_works"><a href="/agent/apage13">how it works</a></li>
                  <li className="faq"><a href="/agent_fourteen" id="103000">FAQS</a></li>
                </ul>
                <div className="pull-right header_number" id="104000">
                  1800-xxxx-xxxx
            </div>
              </div>
              {/* <!--/.nazv-collapse --> */}
            </div>
          </div>
        </nav>
        <div className="after_nav"></div>



      </div>

    )
  }

}