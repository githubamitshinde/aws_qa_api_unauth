import React, { Component } from 'react';
import cookie from 'react-cookies'
import $ from 'jquery';
import moment from 'moment';
import ApiList from "../../config/base.json"
import dropdown from "../../config/dropdown.json"
import DropdownCall from "../../config/dropdown_api_request.js"
import AppStage from "../../config/app_stage.js"
import PageMapper from "../../config/page_mapper";
import '../../css/pages/section1_1.css';

const img_one = ApiList.base_cdn_src+"/images/SVG/down_arrow.svg";

let user_data = JSON.parse(sessionStorage.getItem('user_data'));
var lump_sum_flg = 0;
var rider_id = null;

var firstPassword;
var secondUserName;
var tokenGlobal;
var tokenGlobalAfficient;

export default class SectionTwoD extends Component {
    constructor() {
        super();
        this.state = {
            age: user_data ? moment().diff(user_data.dob, 'years') : 0,
            current_page_index: sessionStorage.getItem('current_index')

        }

    }

    componentDidMount() {
       
        var self = this;

        // ############################## dropdown api #######################
        DropdownCall.dropdown_req_sync(dropdown.table_name.page2, dropdown.column_name.Income_need, "section1_2d_monthly_income", user_data.select_monthly_income_benifit ? user_data.select_monthly_income_benifit : user_data.monthly_recieve, false)
            .then(function () {
                // ############################## dropdown api #######################
              return  DropdownCall.dropdown_req_sync(dropdown.table_name.page2, dropdown.column_name.lump_sum, "section1_2d_one_time", user_data.select_add_on_one_time_payment ? user_data.select_add_on_one_time_payment : null, false)
            })
            .then(function () {
               // ############ pricing on load ################
               if (user_data.rider_id) {
                var product_annual_coverage_amount = (user_data.select_monthly_income_benifit ? user_data.select_monthly_income_benifit : user_data.monthly_recieve) * 12;
                self.fetch_pricing_api(product_annual_coverage_amount, user_data.select_add_on_one_time_payment, null, null, 100000);
            } else {

                var product_annual_coverage_amount = (user_data.select_monthly_income_benifit ? user_data.select_monthly_income_benifit : user_data.monthly_recieve) * 12;
                self.fetch_pricing_api(product_annual_coverage_amount, null, null, null, null);
            }
            // ############ pricing on load ################
            })
             



        $('#section1_2d_monthly_income').on('change', function () {
            lump_sum_flg = 1
            var product_annual_coverage_amount = $("#section1_2d_monthly_income option:selected").val() * 12;
            var rider_annual_coverage_amount = $("#section1_2d_one_time option:selected").val();
            self.fetch_pricing_api(product_annual_coverage_amount, rider_annual_coverage_amount, null, null, rider_id);
        })
        $('#section1_2d_one_time').on('change', function () {
            let user_data = JSON.parse(sessionStorage.getItem('user_data'))
            var product_annual_coverage_amount = $("#section1_2d_monthly_income option:selected").val() * 12;
            lump_sum_flg = 1
            rider_id = 100000;

            var rider_annual_coverage_amount = $("#section1_2d_one_time option:selected").val();
            self.fetch_pricing_api(product_annual_coverage_amount, rider_annual_coverage_amount, null, null, rider_id);
        })
        // ************************** internal calculatopn ************************
        // ########################### save quote api ####################
        // $(document).on('click', '.page_2_save_button', function () {
        //     self.save_api_call();
        // })
        // ########################### save quote api ####################
    }

    save_api_call = () => {
        var self = this;
        let user_data = JSON.parse(sessionStorage.getItem('user_data'))
        // ########################### quote save #########################
        let datastring = {
            "quote": {
                "visit_id": cookie.load('visit_id'),
                "state": user_data.state,
                "income_need": user_data.monthly_recieve ? user_data.monthly_recieve : 0,
                "term_duration": 20,
                "premium_total": user_data.premium_total ? user_data.premium_total : 0,
                "premium_income_need": user_data.monthly_income_benefit ? user_data.monthly_income_benefit : 0,
                "premium_lump_sum": user_data.add_on_one_time_payment ? user_data.add_on_one_time_payment : 0,
                "lump_sum_flag": user_data.rider_id == 100000 ? 1 : 0
            },
            "navigation_log": {
                "visit_id": cookie.load('visit_id'),
                "page_url": window.location.pathname,
                "entry_timestamp": moment().format("MM/DD/YYYY"),
                "exit_timestamp": moment().format("MM/DD/YYYY"),
                "interactive_indicator": 1
            }
        }
        console.log(ApiList.current.base_api_url + '/quote/create')
        console.log(JSON.stringify(datastring));
        $.ajax({
            url: ApiList.current.base_api_url + '/quote/create',
            type: 'POST',
            data: JSON.stringify(datastring),
            headers: {
                        
                        'Content-Type': 'application/json'
            },
            success: (data) => {
                console.log("save quote >>>> " + JSON.stringify(data))
                if (data.statusCode == 200) {

                    var screen_id = PageMapper.getNextPageId(parseInt(sessionStorage.getItem('current_index')) + 1);
                    // console.log(self.state.current_page_index+"///////"+screen_id)
                    sessionStorage.setItem('current_index', (parseInt(sessionStorage.getItem('current_index')) + 1));
                    window.location.href = PageMapper.getPageURL(screen_id);

                     } else {
                    console.log(" Error save  quote  page 2" + JSON.stringify(data))
                }
            },
            error: (err) => {
                console.log("ERROR in quote page 2 " + JSON.stringify(err));
            }
        })
        // ########################### quote save end #########################

    }







    fetch_pricing_api = (product_annual_coverage_amount, rider_annual_coverage_amount, rate_class, payment_frequency, rider_id) => {
        var self = this;
        // alert(JSON.stringify(user_data))
        // ################################ Pricing api ##########################
        let datastring = {
            "product_id": 100001,
            "state": user_data.state,
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
        console.log(ApiList.current.base_afficient_api_url + ApiList.page_two.quotes_calculate)
        $.ajax({
            url: ApiList.current.base_afficient_api_url + ApiList.page_two.quotes_calculate,
            type: 'POST',
            data: JSON.stringify(datastring),
            headers: {
                        
                        'Content-Type': 'application/json'
            },
            success: (data) => {
                if (data) {
                    console.log("Pricing response" + JSON.stringify(data))
                    if (data.statusCode == 1) {
                        //    alert(data.data.premium_total)
                        var premium_total = parseFloat(data.data.premium_total).toFixed(2);
                        var premium_income_need = parseFloat(data.data.premium_income_need).toFixed(2);
                        var premium_lump_sum = parseFloat(data.data.premium_lump_sum).toFixed(2);
                        $('.2dcard_text1').text("$" + premium_total)
                        $('.2dcard_text2').text("$" + premium_income_need)
                        $('.2dcard_text3').text("$" + premium_lump_sum)
                        user_data.premium_total = premium_total
                        user_data.monthly_income_benefit = premium_income_need
                        user_data.add_on_one_time_payment = premium_lump_sum
                        user_data.rate_class = data.data.rate_class
                        user_data.payment_frequency = data.data.payment_frequency
                        console.log("DROP DOWN CHK::" + $("#section1_2d_monthly_income option:selected").val() + "&&**&&" + $("#section1_2d_one_time option:selected").val());
                        user_data.select_monthly_income_benifit = $("#section1_2d_monthly_income option:selected").val();
                        user_data.select_add_on_one_time_payment = $("#section1_2d_one_time option:selected").val();
                        user_data.rider_id = rider_id == 100000 ? 100000 : null;
                        sessionStorage.setItem('user_data', JSON.stringify(user_data))
                        self.quote_view();
                    } else {
                        AppStage.save_app_stage(cookie.load('visit_id'), 2)
                        let user_data = JSON.parse(sessionStorage.getItem('user_data'))
                        user_data.failure_code = 9;
                        sessionStorage.setItem('user_data', JSON.stringify(user_data))
                        window.location.href = "/life-insurance-application-call-now"
                    }

                }
            },
            error: (err) => {
                console.log("ERROR in fetch pricing api " + JSON.stringify(err));
            }
        })
        // ################################ Pricing api ##########################
    }


    quote_view = () => {
        let user_data = JSON.parse(sessionStorage.getItem('user_data'))
        let datastring = {
            "quote_view": {
                "visit_id": cookie.load('visit_id'),
                "lump_sum_flg": lump_sum_flg,
                "lump_sum_need": user_data.select_add_on_one_time_payment,
                "income_need": user_data.select_monthly_income_benifit ? user_data.select_monthly_income_benifit : 0,
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
        console.log("quote view datastring >>> " + JSON.stringify(datastring))
        console.log(ApiList.current.base_api_url + ApiList.page_two.quotes_view_create);
        $.ajax({
            url: ApiList.current.base_api_url + ApiList.page_two.quotes_view_create,
            type: 'POST',
            data: JSON.stringify(datastring),
            headers: {
                        
                        'Content-Type': 'application/json'
            },
            success: (data) => {
                if (data) {
                    console.log("quote view " + JSON.stringify(data))
                    // if (data.statusCode == 200) {
                    //     user_data.select_monthly_income_benifit = $("#section1_2d_monthly_income option:selected").val();
                    //     user_data.select_add_on_one_time_payment = $("#section1_2d_one_time option:selected").val();
                    //     user_data.rider_id = rider_id == 100000 ? 100000 : null;
                    //     sessionStorage.setItem('user_data', JSON.stringify(user_data))

                    //     // window.location.href = "/three"
                    // }

                }
            },
            error: (err) => {
                console.log("ERROR in pricing api " + JSON.stringify(err));
            }
        })
    }

    render() {
        const { age } = this.state;

        var income_until = 0;
        if (age >= 20 && age <= 35) {
            income_until = moment().year() + 30;
        } else if (age >= 36 && age <= 50) {
            income_until = moment().year() + (30 - (age - 35));
        }

        return (
            <div>

                <div id="section1" className="col-md-12 section1_1 text-center section" style={{ backgroundColor: "#00C3FF" }}>
                    <div className="container mt2">
                        <div className="agendabold42 col-md-12">Your quote</div>
                        <div className="ltr20 col-md-12 mt1" id="2147">Customize your quote to cover your family's monthly income needs.</div>
                        <div className="col-md-12">
                            <div className="col-md-4 col-md-offset-2 col-sm-8 col-sm-offset-3  col-xs-10 col-xs-offset-1  mt3 pd0">
                                <div className="panel-body section1_d_panel">
                                    <div className="col-md-12 agendabold42 mt4 2dcard_text1">
                                        {/* $xxxx.xxx */}
                                        $ 0
                                    </div>
                                    <div className="col-md-12 mt4 fgsb14" id="2149">
                                        PER MONTH
                                    </div>
                                    <div className="col-md-12 mt5 fgsd24 2dcard_text2">
                                        {/* $xxxx.xxx */}
                                        $ 0
                                    </div>
                                    <div className="col-md-12 fgsd14" id="2150">
                                        MONTHLY INCOME BENEFIT
                                    </div>
                                    <div className="col-md-12 fgsd24 2dcard_text3">
                                        {/* $xxxx.xxx */}
                                        $ 0
                                    </div>
                                    <div className="col-md-12 fgsd14" id="2152">
                                        MONTHLY INCOME BENEFIT
                                    </div>
                                    <div className="col-md-12 mb4 mt5">
                                        <button className="btn cbtn_color page_2_save_button" onClick={this.save_api_call}  tabIndex="0" id="2153">APPLY NOW</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 col-md-offset-0 col-sm-8 col-sm-offset-2 col-xs-12 text-left mt3 pd0">
                                <ul className="list-unstyled">
                                    <li className="fgsb18" style={{ display: "flex" }}>1.&nbsp; <div id="2148"> Select how much monthly income to provide </div></li>
                                    <li className="mt3"> <div className="rail-select box" style={{ width: 270 }}>
                                        <div className="select-side">
                                            <img src={img_one} alt="" />
                                        </div>
                                        <select className="form-control" id="section1_2d_monthly_income" >

                                        </select>
                                    </div>
                                    </li>
                                    <br />
                                    <li className="fgsb18 mt4" style={{ display: "flex" }}>2.&nbsp; <div id="2151">Optional: Add one-time payment to help pay for funeral expreses or pay off debt - like credit cards or student loans.</div> </li>
                                    <li className="mt3"><div className="rail-select box" style={{ width: 270 }}>
                                        <div className="select-side">
                                            <img src={img_one} alt="" />
                                        </div>
                                        <select className="form-control" id="section1_2d_one_time" >

                                        </select>
                                    </div>
                                    </li>
                                </ul>

                            </div>
                        </div>

                        <div className="col-md-8 col-sm-12 col-md-offset-2 col-xs-12 text-center mt3 ltr20 mb1">
                            Your policy lasts {(age >= 20 && age <= 40) ? 'for 20 years' : 'to age 65'}. <br />
                            If you die during that time, your loved ones receive guaranteed, monthly income <br />until {income_until} (when you would have been age {(age >= 20 && age <= 40) ? (age + 30) : ' 65'}).
                        </div>
                        <div className="col-md-8 col-sm-12 col-md-offset-2 text-center col-xs-12 col-sm-offset-12 col-xs-offset-0 ltr20 mb2">
                            {(age >= 40 && age <= 50) ? ' And those payments will be paid for a minimum of five years.' : null}
                            {/* {(age >= 40 && age <= 50) ? ' And those payments will be paid for a minimum of five years.' : null} */}
                        </div>
                    </div>
                </div>


            </div>

        )
    }

}
