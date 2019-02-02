import React, { Component } from 'react';
import cookie from 'react-cookies'
import $ from 'jquery';

import img_one from "../../images/SVG/down_arrow.svg";

import '../../css/pages/section1_1.css';


export default class SectionTwoA extends Component {
    constructor() {
        super();
        this.state = {
        }
    }

    componentDidMount() {
        $('#section1_2a_monthly_benefit').on('change', function () {
            cookie.save('section1_2a_monthly_benefit', $("#section1_2a_monthly_benefit option:selected").val(), { path: '/', maxAge: 365 * 86400 })
        })
        $('#section1_2a_monthly_benefit').val(cookie.load('section1_2a_monthly_benefit'));

    }


    // function=()=>{

    // }

    render() {
        return (
            <div>

                <div id="section1" className="col-md-12 section1_1 text-center section" style={{ backgroundColor: "#00C3FF" }}>
                    <div className="container page2_section2_container">
                        <span className="agendabold42 col-md-12">Your Quote</span>
                        <span className="col-md-12 mt1 ltr20">Choose an amount that matches your family's monthly income needs</span>
                        <div className="col-md-12 mt3">
                            <div className="col-md-4">
                                <div className="panel panel-default panel_rate ">
                                    <div className="panel-body">
                                        <div className="buttonopt one" style={{ marginTop: "6%" }}>
                                            <div className="check"></div>
                                        </div>
                                        <div className="col-md-12 agendabold42">
                                            $xxxx.xxx
                                          </div>
                                        <div className="col-md-12 mt2 fgsb14">
                                            PER MONTH
                                 </div>
                                        <div className="col-md-12 fgsd24" style={{ marginTop: "10%" }}>
                                            $xxxx.xxx
                                 </div>
                                        <div className="col-md-12 fgsd14 mb4">
                                            MONTHLY INCOME BENEFIT
                                 </div>


                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="panel panel-default panel_rate ">
                                    <div className="panel-body">
                                        <div className="buttonopt one black" style={{ margintTop: "6%" }}>
                                            <div className="check" style={{ transform: "scale(1)" }}></div>
                                        </div>
                                        <div className="col-md-12 agendabold42">
                                            $xxxx.xxx
                                    </div>
                                        <div className="col-md-12 mt2 fgsb14">
                                            PER MONTH
                                    </div>
                                        <div className="col-md-12 fgsd24" style={{ marginTop: "10%" }}>
                                            $xxxx.xxx
                                    </div>
                                        <div className="col-md-12 fgsd14 mb4">
                                            MONTHLY INCOME BENEFIT
                                    </div>


                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="panel panel-default panel_rate ">
                                    <div className="panel-body">
                                        <div className="buttonopt one" style={{ marginTop: "6%" }}>
                                            <div className="check"></div>
                                        </div>
                                        <div className="col-md-12 agendabold42">
                                            $xxxx.xxx
                                            </div>
                                        <div className="col-md-12 mt2 fgsb14">
                                            PER MONTH
                                            </div>
                                        <div className="col-md-12 fgsd24" style={{ marginTop: "10%" }}>
                                            $xxxx.xxx
                                            </div>
                                        <div className="col-md-12 fgsd14 mb4">
                                            MONTHLY INCOME BENEFIT
                                            </div>


                                    </div>
                                </div>
                            </div>



                        </div >
                        <div className="col-md-12 mt2">
                            <button className="btn cbtn_color">SELECT</button>
                        </div>
                        <div className="col-md-12 agendabold32 mt2">
                            <span>Don't see what you need?</span>
                        </div>
                        <div className="col-md-12 fgsd16">
                            Adjust the monthly income benefit amount your loved ones can receive to better meet your family's needs or budget.
            </div>

                        <div className="col-md-12 mt2 text-center">
                            <div className="col-md-4 col-md-offset-4">
                                <div className="col-md-12 fgsd14 text-left">
                                    MONTHLY INCOME BENEFIT
                                             </div>
                                <div className="col-md-12">
                                    <div className="box">
                                        <div className="select-side">
                                            <img src={img_one} alt="" />
                                        </div>
                                        <select className="form-control" id="section1_2a_monthly_benefit" >
                                            <option value="3500">$3500</option>
                                            <option value="4000">$4000</option>
                                            <option value="4500">$4500</option>
                                            <option value="5000">$5000</option>
                                            <option value="5500">$5500</option>
                                            <option value="6000">$6000</option>
                                            <option value="6500">$6500</option>
                                            <option value="7000">$7000</option>
                                        </select>
                                    </div>
                                </div>
                            </div>


                        </div>
                        {/* <div className="col-md-12" style={{ marginTop: "2%" }}>
                            <button className="btn adjust_quote_button fgsd14">adjust my quote</button>
                        </div> */}
                        <div className="col-md-8 col-md-offset-2 text-center mt5  mb3 ltr20">
                            <div className="col-md-12 pd0">Your policy lasts for [20 years/to age 65]. </div>
                            (If youy die uring that time, your family receives guaranteed, monthly income until [year XXXX](when you would have been age XX))
            </div>
                    </div>
                </div>



            </div>

        )
    }

}