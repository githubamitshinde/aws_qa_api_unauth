import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import ApiList from "../../config/base.json"

import '../../css/income_shield/income_shield_one.css';

import '../../css/top3section/type3.css';
import $ from 'jquery';
const img1 = ApiList.base_cdn_src + "/images/191323772.jpg";

export default class TypeThree extends Component {
    constructor() {
        super();
        this.state = {
        }
    }

    componentDidMount() {

    }
    scroll_up = () => {

        $("html, body").animate({ scrollTop: 0 }, 1200);


    }

    // function=()=>{

    // }

    render() {
        return (
            <div>
                <div className="col-md-12" style={{ padding: "0", backgroundColor: "black", color: "#FDFDFD" }}>
                    <img src={img1} className="img-fluid" style={{ opacity: "0.5", objectFit: "cover" }} height="600px" width="100%" alt="" id="425" />
                    <div class="agendabold45 type3_cont">
                        <div id="422" style={{lineHeight: '1'}} class=" col-md-6 col-md-offset-3">55% of millennials wish their partner would purchase more life insurance.</div>
                        <div class="col-md-12 text-center">
                            <a class="btn cbtn_color mt2 top_three_section_type_2_continue" id="413" href="/life-insurance-online-application"> CONTINUE</a>
                        </div>
                        <div class="ltr18 mt2 col-md-12" style={{color: 'rgb(198, 198, 198)'}} id="424">Source: lifehappens.org 2018</div>
                    </div>
                    {/* <div className="agendabold45 type3_cont"> <div className="" id="422" style={{ lineHeight: '1.0' }}>"55% of Millennials wish their partner would purchase more life insurance."</div>

                        <Link to="#" className="btn cbtn_color mt2 top_three_section_type_2_continue" onClick={this.scroll_up} id="413"> CONTINUE</Link>
                        <div className="ltr18 mt2" style={{ color: "#c6c6c6" }} id="424">Source: lifehappens.org
                    </div>
                    </div> */}

                </div>
            </div>

        )
    }

}