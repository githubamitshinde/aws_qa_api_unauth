import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import $ from 'jquery';

import '../../css/income_shield/income_shield_one.css';



export default class DidYouKnow extends Component {
    constructor() {
        super();
        this.state = {
        }
    }

    componentDidMount() {
        $(".scroll_up").on("click", function () {
            $("html, body").animate({ scrollTop: 0 }, 1200);
            return false;
        });
    }


    // function=()=>{

    // }

    render() {
        return (
            <div>
                <div className="col-md-12 text-center" style={{ backgroundColor: "#F9E038", color: "black" }}>
                    <div className="container">
                        <div className="col-md-12 mt4 agendabold42" id="5066"></div>
                        <div className="col-md-12 mt2 ltr20 mb2" id="5067"></div>
                        <div className="col-md-12 mt3  text-center mt5 mb4">
                            <Link to="" className="btn btnh cbtn_color_black mb3 tt scroll_up" id="5068" style={{paddingTop:"10px"}}></Link>

                        </div>
                    </div>
                </div>
            </div>

        )
    }

}