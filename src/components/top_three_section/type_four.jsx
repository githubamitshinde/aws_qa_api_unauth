import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import '../../css/income_shield/income_shield_one.css';
import ApiList from "../../config/base.json"

import '../../css/top3section/type3.css';
import $ from 'jquery';
const img2 = ApiList.base_cdn_src+"/images/flyer_LL_Rivera_Miranda_ITOW_2016-02.jpg"

export default class TypeFour extends Component {
    constructor() {
        super();
        this.state = {
        }
    }

    componentDidMount() {

    }

    scroll_up=()=>{
        $("html, body").animate({ scrollTop: 0 }, 1200);
        return false;
    }

    // function=()=>{

    // }

    render() {
        return (
            <div>
                <div className="col-md-12" style={{ padding: "0", backgroundColor: "black", color: "#FDFDFD" }}>

                    <img src={img2} className="img-fluid" style={{ opacity: "0.5", objectFit: "cover" }} height="850px" width="100%" alt="" />
                    <div className="agendabold45 type3_cont"> <div className="type3_text" id="715" style={{lineHeight: 1.0}}></div>
                        <div className="ltr22 mt3" id="716"></div>

                        <Link to="#" className="btn cbtn_color mt2 tt type_three_sectio_type4_next" id="717" onClick={this.scroll_up}></Link>
                        <div className="ltr18 mt2" style={{ color: "#c6c6c6" }} id="718"></div>
                    </div>

                </div>
            </div>

        )
    }

}