import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import ApiList from '../../config/base.json'
import $ from 'jquery';

import '../../css/header.css';
import '../../css/income_shield/income_shield_one.css';


import '../../fonts/fonts.css';
import '../../css/media_queries.css';

const brand_img = ApiList.base_cdn_src+"/images/Icons/TIAA_IncomeShield-journey_styleguide-dev-02.png"

export default class Header extends Component {
    constructor() {
        super();
        this.state = {
        }
    }

    componentDidMount() {
        // window.onbeforeunload = function(){
        //     cookie.save('exit_the_page', 'window is closed send eamil', { path: '/', maxAge: 365 * 86400 })
        //   }
        $(document).on('click', '.navbar_brand_img', function () {

            
            if (sessionStorage.getItem('agent_present_flag')) {
               
                window.location.href = "/login"
            } else {
                window.location.href = "/"
            }

        })

    }


    render() {
        // alert(this.props.display_menu)
        return (
            <div>
                <nav className="navbar">
                    <div className="col-md-12">
                        <div className="container">
                            <div className="navbar-header">
                                <button type="button" className="navbar-toggle collapsed pull-left" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                                    <span className="sr-only">Toggle navigation</span>
                                    <span className="icon-bar" style={{ height: 3 }}></span>
                                    <span className="icon-bar" style={{ height: 3 }}></span>
                                    <span className="icon-bar" style={{ height: 3 }}></span>
                                </button>
                                <div className="navbar-brand" id="101"> <img src={brand_img} className="navbar_brand_img" /> </div>
                            </div>
                            <div id="navbar" className="collapse navbar-collapse">
                                <ul className="nav navbar-nav" style={{ display: (this.props.display_menu ? 'block' : 'none') }}>
                                    {/* <!-- <li id="101"><a href="#section1">Home</a></li> --> */}
                                    <li className="how_it_works tt"><a target="_blank" href="/life-insurance-how-it-works" id="102" >how it works</a></li>
                                    <li className="faq tt"><a target="_blank" href="/life-insurance-faq" id="103">FAQS</a></li>
                                    {/* <li className="contact"> <a href="">CONTACT</a> </li> */}
                                </ul>
                                <div className="pull-right header_number" id="104">
                                    1-877-225-4919
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
                {/* <div className="after_nav" style={{ marginTop: '50px' }}></div> */}
            </div>

        )
    }

}