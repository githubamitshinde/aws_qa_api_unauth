import React, { Component } from 'react';
import cookie from 'react-cookies'
import $ from 'jquery';
import moment from 'moment';
import ApiList from "../../config/base.json"
import dropdown from "../../config/dropdown.json"
import DropdownCall from "../../config/dropdown_api_request.js"

import '../../css/pages/section1_1.css';
import '../../css/other/custom_radio.css';

import img_one from "../../images/SVG/down_arrow.svg";

let user_data = JSON.parse(sessionStorage.getItem('user_data'));

export default class SectionTwoC extends Component {
    constructor() {
        super();
        this.state = {
            age: user_data ? moment().diff(user_data.dob, 'years') : 0
        }
    }

    componentDidMount() {
        // ############################## dropdown api #######################
        DropdownCall.dropdown_req(dropdown.table_name.page2, dropdown.column_name.Income_need, "section_2c_monthly_income", null, false)
        DropdownCall.dropdown_req(dropdown.table_name.page2, dropdown.column_name.lump_sum, "section1_2c_one_time", null, false)
        // ############################## dropdown api #######################
        $('#section_2c_monthly_income').on('change', function () {
            cookie.save('section_2c_monthly_income', $("#section_2c_monthly_income option:selected").val(), { path: '/', maxAge: 365 * 86400 })
        })
        $('#section_2c_monthly_income').val(cookie.load('section_2c_monthly_income'));

        $('input[name=section_2c_radio_one_tym]').on('change', function () {
            cookie.save('section_2c_radio_one_tym', $('input[name=section_2c_radio_one_tym]:checked').val(), { path: '/', maxAge: 365 * 86400 })
        })
        $('input[name=section_2c_radio_one_tym][value=' + cookie.load('section_2c_radio_one_tym') + ']').attr('checked', true);

        $('#section1_2c_one_time').on('change', function () {
            cookie.save('section1_2c_one_time', $("#section1_2c_one_time option:selected").val(), { path: '/', maxAge: 365 * 86400 })
        })
        $('#section1_2c_one_time').val(cookie.load('section1_2c_one_time'));
    }


    // function=()=>{

    // }

    render() {
        const { age } = this.state;

        var income_until = 0;
        if (age >= 20 && age <= 45) {
            income_until = moment().year() + 20;
        } else if (age > 45) {
            income_until = moment().year() + (20 - (age - 45));
        }

        return (
            <div>

                <div id="section1" className="col-md-12 section1_1 text-center section" style={{ backgroundColor: "#00C3FF" }}>
                    <div className="container mt1">
                        <span className="agendabold42 col-md-12">Your Quote</span>
                        <span className="ltr20 col-md-12 mt1">Customize your quote to cover your family's monthly income needs.</span>
                        <div className="col-md-12 mt3">
                            <div className="col-md-4 col-md-offset-2">
                                <div className="panel-body section1_d_panel">
                                    <div className="col-md-12 agendabold42">
                                        $xxxx.xxx
                                    </div>
                                    <div className="col-md-12 mt4 fgsb14">
                                        PER MONTH
                                    </div>
                                    <div className="col-md-12 mt5 fgsd24">
                                        $xxxx.xxx
                                    </div>
                                    <div className="col-md-12 fgsd14">
                                        MONTHLY INCOME BENEFIT
                                    </div>
                                    <div className="col-md-12 fgsd24">
                                        $xxxx.xxx
                                    </div>
                                    <div className="col-md-12 fgsd14">
                                        ADDITIONAL ONE TIME PAYMENT
                                    </div>
                                    <div className="col-md-12 mt5">
                                        <div className="btn cbtn_color tt">select</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 text-left mt2">
                                <ul className="list-unstyled">
                                    <li className="fgsd14"><div> MONTHLY INCOME BENEFIT: </div></li>
                                    <li> <div className="rail-select box">
                                        <div className="select-side">
                                            <img src={img_one} alt="" />
                                        </div>
                                        <select className="form-control" id="section_2c_monthly_income" >
                                            {/* <option>$2500</option>
                                            <option>$3000</option>
                                            <option>$3500</option>
                                            <option>$4000</option>
                                            <option>$4500</option>
                                            <option>$5000</option>
                                            <option>$5500</option>
                                            <option>$6000</option>
                                            <option>$6500</option>
                                            <option>$7000</option> */}
                                        </select>
                                    </div>
                                    </li>
                                    <br />
                                    <li className="mt5 fgsd14">DO YOU ALSO WANT A ONE-TIME PAYMENT TO COVER FUNERAL EXPENSES OR PAY OFF DEBT?</li>
                                    <li className="text-center">  <div className="radio__container" >
                                        <div className="radio-inline fgsd18">
                                            <input className="radio" id="aw1" name="section_2c_radio_one_tym" type="radio" value="1" />
                                            <label style={{ fontWeight: "unset" }} className="radio__label" for="aw1" id="607">YES</label>
                                        </div>
                                        <div className="radio-inline fgsd18">
                                            <input className="radio" id="aw2" name="section_2c_radio_one_tym" type="radio" value="0" />
                                            <label style={{ fontWeight: "unset" }} className="radio__label" for="aw2" id="608">NO</label>
                                        </div>


                                    </div>
                                    </li>
                                    <br />
                                    <li className="fgsd14"><div>SELECT AN ADDITIONAL ONE-TIME PAYMENT:</div> </li>
                                    <li><div className="rail-select box">
                                        <div className="select-side">
                                            <img src={img_one} alt="" />
                                        </div>
                                        <select className="form-control" id="section1_2c_one_time" >
                                            {/* <option>$25000</option>
                                            <option>$30000</option>
                                            <option>$35000</option>
                                            <option>$40000</option>
                                            <option>$45000</option>
                                            <option>$50000</option>
                                            <option>$55000</option>
                                            <option>$60000</option>
                                            <option>$65000</option>
                                            <option>$70000</option>
                                            <option value="">$75000</option>
                                            <option value="">$80000</option> */}
                                        </select>
                                    </div>
                                    </li>
                                </ul>

                            </div>
                        </div>

                        <div className="col-md-8 col-md-offset-2 text-center mt6 ltr20 mb3">
                            Your policy lasts {(age >= 20 && age <= 45) ? 'for 20 years' : 'to age 65'}. <br />
                            (If you die during that time, your family receives guaranteed, monthly income until {income_until}(when you would have been age {(age >= 20 && age <= 45) ? (age + 20) : ' 65'}).
            </div>
                    </div>
                </div>
            </div>

        )
    }

}