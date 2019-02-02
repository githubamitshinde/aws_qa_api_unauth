import React, { Component } from 'react';
import cookie from 'react-cookies'
import $ from 'jquery';
import moment from 'moment';
import ApiList from "../../config/base.json"
import dropdown from "../../config/dropdown.json"
import DropdownCall from "../../config/dropdown_api_request.js"
import PageMapper from "../../config/page_mapper";
import img_one from "../../images/SVG/down_arrow.svg";

import '../../css/pages/section1_1.css';

import { join } from 'path';

let user_data = JSON.parse(sessionStorage.getItem('user_data'));
var lump_sum_flg = 0;

export default class SectionTwoB extends Component {
    constructor() {
        super();
        this.state = {
            age: user_data ? moment().diff(user_data.dob, 'years') : 0,
            current_page_index: sessionStorage.getItem('current_index')

        }
    }

    componentDidMount() {
        var self = this;

        let user_data = JSON.parse(sessionStorage.getItem('user_data'))
        // ############################## dropdown api #######################
        DropdownCall.dropdown_req(dropdown.table_name.page2, dropdown.column_name.Income_need, "scetion1_2b_adjust_income", user_data.monthly_recieve, false)
        DropdownCall.dropdown_req(dropdown.table_name.page2, dropdown.column_name.lump_sum, "scetion1_2b_one_time", null, false)
        // ############################## dropdown api #######################

        var scetion1_2b_adjust_income_count = 0;
        var scetion1_2b_one_time_count = 0;
        // $('#scetion1_2b_adjust_income').on('change', function () {
        //     // let user_data = JSON.parse(sessionStorage.getItem('user_data'))
        //     // scetion1_2b_adjust_income_count++;
        //     // console.log("scetion1_2b_adjust_income_count " + scetion1_2b_adjust_income_count)
        //     // let monthly_income= (user_data.monthly_recieve*1.25)
        //     // $('.2bcard_text1').text("$"+monthly_income)
        //     // let adjust_monthly_income = $("#scetion1_2b_adjust_income option:selected").val()
        //     // let rider_value = (adjust_monthly_income/(user_data.monthly_recieve*12))*(user_data.monthly_recieve*0.033)
        //     // $('.2bcard_text2').text("$"+rider_value)

        //     // $('.2bcard_text3').text("$"+data.data.premium_lump_sum)
        //     // user_data.adjust_monthly_income = $("#scetion1_2b_adjust_income option:selected").val()
        //     sessionStorage.setItem('user_data', JSON.stringify(user_data))

        // })

        // ############ pricing on load ################
        var product_annual_coverage_amount = user_data.monthly_recieve * 12;
        this.fetch_pricing_api(product_annual_coverage_amount, null, null, null, null);
        // ############ pricing on load ################

        $('#scetion1_2b_adjust_income').on('change', function () {
            lump_sum_flg = 1
            var product_annual_coverage_amount = $("#scetion1_2b_adjust_income option:selected").val() * 12;
            var rider_annual_coverage_amount = $("#scetion1_2b_one_time option:selected").val();
            self.fetch_pricing_api(product_annual_coverage_amount, rider_annual_coverage_amount, null, null, null);
        })
        $('#scetion1_2b_one_time').on('change', function () {
            let user_data = JSON.parse(sessionStorage.getItem('user_data'))
            var product_annual_coverage_amount = $("#scetion1_2b_adjust_income option:selected").val() * 12;
            lump_sum_flg = 1
            let rider_id = 100000;
            var rider_annual_coverage_amount = $("#scetion1_2b_one_time option:selected").val();
            self.fetch_pricing_api(product_annual_coverage_amount, rider_annual_coverage_amount, null, null, rider_id);
        })
        // ************************** internal calculatopn ************************
        // ########################### save quote api ####################
        $(document).on('click', '.page_2_save_button', function () {
            self.save_api_call();
        })
        // ########################### save quote api ####################

    }

    save_api_call = () => {
        let user_data = JSON.parse(sessionStorage.getItem('user_data'))
        let datastring = {
            "quote_view": {
                "visit_id": cookie.load('visit_id'),
                "lump_sum_flg": lump_sum_flg,
                "lump_sum_need": user_data.monthly_recieve * 12,
                "income_need": user_data.monthly_recieve ? user_data.monthly_recieve : 0,
                "premium_total": user_data.premium_total ? user_data.premium_total : 0,
                "premium_income_need": user_data.monthly_income_benefit ? user_data.monthly_income_benefit : 0,
                "premium_lump_sum": user_data.add_on_one_time_payment ? user_data.add_on_one_time_payment : 0
            },
            "navigation_log": {
                "visit_id": cookie.load('visit_id'),
                "page_url": window.location.pathname,
                "entry_timestamp": moment().format("MM/DD/YYYY"),
                "exit_timestamp": moment().format("MM/DD/YYYY"),
                "interactive_indicator": 1

            }
        }
        console.log("save api datastring >>> " + JSON.stringify(datastring))
        $.ajax({
            url:ApiList.current.base_api_url + 'quoteview/create',
            type: 'POST',
            data: JSON.stringify(datastring),
            headers: {
                        'Authorization': 'Bearer '+ sessionStorage.getItem('authtoken'),
                        'Content-Type': 'application/json'
            },
            success: (data) => {
                if (data) {
                    console.log("quote view " + JSON.stringify(data))
                    if (data.statusCode == 200) {
                        var screen_id = PageMapper.getNextPageId(parseInt(this.state.current_page_index) + 1);
                        sessionStorage.setItem('current_index', (parseInt(this.state.current_page_index) + 1));
                        window.location.href = PageMapper.getPageURL(screen_id);
                        // window.location.href = "/three"
                    }

                }
            },
            error: (err) => {
                console.log("ERROR in pricing api " + JSON.stringify(err));
            }
        })
    }





    fetch_pricing_api = (product_annual_coverage_amount, rider_annual_coverage_amount, rate_class, payment_frequency, rider_id) => {

        // ################################ Pricing api ##########################
        let datastring = {
            "product_id": 100001,
            "state": user_data.state_short,
            "product_id_rider": rider_id,
            "visitor_id": cookie.load('visit_id'),
            "afficiency_id": user_data.aff1,
            "height": user_data.height,
            "weight": user_data.weight,
            "date_of_birth": user_data.dob,
            "sex": user_data.gender,
            "term_length": 20,
            "product_annual_coverage_amount": product_annual_coverage_amount,
            "rider_annual_coverage_amount": parseInt(rider_annual_coverage_amount),
            "rate_class": rate_class,
            "payment_frequency": payment_frequency,
            "tobacco_use": user_data.tobbacouse

        }

        console.log(JSON.stringify(datastring))
        $.ajax({
            url:ApiList.current.base_api_url +'Afficient-demo-0.0.1-SNAPSHOT/' +'quote/calculate',
            type: 'POST',
            data: JSON.stringify(datastring),
            headers: {
                        'Authorization': 'Bearer '+ sessionStorage.getItem('authtoken'),
                        'Content-Type': 'application/json'
            },
            success: (data) => {
                if (data) {
                    console.log(JSON.stringify(data))
                    if (data.statusCode == 1) {
                        //    alert(data.data.premium_total)
                        var premium_total = parseFloat(data.data.premium_total).toFixed(2);
                        var premium_income_need = parseFloat(data.data.premium_income_need).toFixed(2);
                        var premium_lump_sum = parseFloat(data.data.premium_lump_sum).toFixed(2);
                        $('.2bcard_text1').text("$" + premium_total)
                        $('.2bcard_text2').text("$" + premium_income_need)
                        $('.2bcard_text3').text("$" + premium_lump_sum)
                        user_data.premium_total = premium_total
                        user_data.monthly_income_benefit = premium_income_need
                        user_data.add_on_one_time_payment = premium_lump_sum
                        user_data.rate_class = data.data.rate_class
                        user_data.payment_frequency = data.data.payment_frequency
                        user_data.select_monthly_income_benifit = $("#scetion1_2b_adjust_income option:selected").val();
                        user_data.select_add_on_one_time_payment = $("#scetion1_2b_one_time option:selected").val();
                        sessionStorage.setItem('user_data', JSON.stringify(user_data))
                    }
                    else if (data.statusCode == 0) {
                        let user_data = JSON.parse(sessionStorage.getItem('user_data'))
                        user_data.failure_code = 6;
                        sessionStorage.setItem('user_data', JSON.stringify(user_data))
                        window.location.href = "/life-insurance-application-call-now"

                    }

                }
            },
            error: (err) => {
                console.log("ERROR in pricing api " + JSON.stringify(err));
            }
        })
        // ################################ Pricing api ##########################
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
                        <span className="agendabold42 col-md-12" id="2155">Your Quote</span>
                        <span className="ltr20 col-md-12 mt1" id="2156">Customize your quote to cover your family's monthly income needs.</span>
                        <div className="col-md-12 mt3">
                            <div className="col-md-4 col-md-offset-2">
                                <div className="panel-body section1_d_panel">
                                    <div className="col-md-12 agendabold42 mt6 2bcard_text1">
                                        $ 0
                                    </div>
                                    <div className="col-md-12 mt5 fgsb14" id="2057">
                                        PER MONTH
                                    </div>
                                    <div className="col-md-12 mt6 fgsd24 2bcard_text2">
                                        $ 0
                                    </div>
                                    <div className="col-md-12 mt2 fgsd14" id="2059">
                                        MONTHLY INCOME BENEFIT
                                    </div>
                                    <div className="col-md-12 mt2 fgsd24 2bcard_text3">
                                        $ 0
                                    </div>
                                    <div className="col-md-12 fgsd14 mt2" id="2061">
                                        ADDITIONAL ONE TIME PAYMENT
                                    </div>
                                    <div className="col-md-12 mb4 mt5">
                                        <a className="btn btnh cbtn_color tt page_2_save_button" id="2062">select</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 text-left">
                                <ul className="list-unstyled ul_margin">
                                    <li className="fgsd14" id="2058">ADJUST MONTHLY INCOME BENEFIT:</li>
                                    <li> <div className="rail-select box">
                                        <div className="select-side">
                                            <img src={img_one} alt="" />
                                        </div>
                                        <select className="form-control" id="scetion1_2b_adjust_income" >
                                            {/* <option>$3500</option>
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
                                    <li className="fgsd14" id="2060">ADD ONE TIME ADDITIONAL PAYMENT (OPTIONAL) </li>
                                    <li><div className="rail-select box">
                                        <div className="select-side">
                                            <img src={img_one} alt="" />
                                        </div>
                                        <select className="form-control" id="scetion1_2b_one_time" >
                                            {/* <option>$25000</option>
                                            <option>$yi</option>
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
                            <div>[For added protection we guarantee that those payments will be paid for a minimum of five years.]</div>
                        </div>

                    </div>
                </div>


            </div>

        )
    }

}
