import React, { Component } from 'react';
import $ from 'jquery';
import cookie from 'react-cookies'
import ApiList from "../../config/base.json"
import dropdown from "../../config/dropdown.json"
import DropdownCall from "../../config/dropdown_api_request.js"
import AppStage from "../../config/app_stage.js"
import moment from 'moment';


import '../../css/pages/section1_1.css';


const img_one =ApiList.base_cdn_src+"/images/SVG/down_arrow.svg";

//let user_data ={"aff0":"ARC6307TI128","aff1":"ARC570TI9808","visitor_id":26,"visit_id":"564","city":"Alpharetta","country":"US","state":"GA","state_short":"GA","zipcode":"30004","weight":"165","height":"4.8","tobbacouse":"0","gender":"M","monthly_recieve":"1500","dob":"03/02/1995","premium_total":"486.79","monthly_income_benefit":"35.04","add_on_one_time_payment":"451.75","rate_class":"Good","payment_frequency":"monthly","first_name":"SUSAN","last_name":"DOTSON","phone_number":"9879879798","email":"askdgjk@asjd.com","home_address":"1","apt_no":"1114 DALESFORD DR","ssn":"666168498","aff2":"ARC570TI9808","drivers_license_no":"","drivers_license_state":"AL","beni_arr":[{"afficiency_id":"ARC570TI9808","app_attempt_no":100,"visit_id":"26","relationship_to_applicant":"1","bene_first_name":"as","bene_last_name":"as","dob":"03/03/1995","percentage":"100","select_monthly_income_benifit":"3500"}]}
let user_data = JSON.parse(sessionStorage.getItem('user_data'));
var lump_sum_flg = 0;
var rider_id = null;

var firstPassword;
var secondUserName;
var tokenGlobal;
var tokenGlobalAfficient;

export default class FinalSection extends Component {
    constructor() {
        super();
        this.state = {
            age: user_data ? moment().diff(user_data.dob, 'years') : 0
        }
    }

    componentDidMount() {
        var self = this;
        this.aif_check((user_data ? user_data.select_monthly_income_benifit:0), (user_data ? user_data.select_add_on_one_time_payment:0));
        // ############################## dropdown api #######################
        // DropdownCall.dropdown_req(dropdown.table_name.page10, dropdown.column_name.Income_need, "final_section_monthly_income", user_data.select_monthly_income_benifit, false)
        // DropdownCall.dropdown_req(dropdown.table_name.page10, dropdown.column_name.lump_sum, "final_section_one_time", user_data.select_add_on_one_time_payment, false)
        // ############################## dropdown api #######################

        var product_annual_coverage_amount = user_data.select_monthly_income_benifit * 12;
        if (user_data.rider_id == 100000) {

            self.fetch_pricing_api(product_annual_coverage_amount, user_data.select_add_on_one_time_payment, null, null, user_data.rider_id);
        } else {
            self.fetch_pricing_api(product_annual_coverage_amount, null, null, null, null);
        }


        $('#final_section_monthly_income').on('change', function () {
            lump_sum_flg = 1
            rider_id = 100000;
            var product_annual_coverage_amount = $("#final_section_monthly_income option:selected").val() * 12;
            var rider_annual_coverage_amount = $("#final_section_one_time option:selected").val();
            self.fetch_pricing_api(product_annual_coverage_amount, rider_annual_coverage_amount, null, null, rider_id);
            self.aif_check($("#final_section_monthly_income option:selected").val(),$("#final_section_one_time option:selected").val());
        })
        $('#final_section_one_time').on('change', function () {
            let user_data = JSON.parse(sessionStorage.getItem('user_data'))
            var product_annual_coverage_amount = $("#final_section_monthly_income option:selected").val() * 12;
            lump_sum_flg = 1
            rider_id = 100000;
            var rider_annual_coverage_amount = $("#final_section_one_time option:selected").val();
            self.fetch_pricing_api(product_annual_coverage_amount, rider_annual_coverage_amount, null, null, rider_id);
            self.aif_check($("#final_section_monthly_income option:selected").val(),$("#final_section_one_time option:selected").val());
        })
        $(document).on('click', '.edit_page_continue', function () {
            self.save_api();
        })
        $(document).on('click', '.final_section_accepet', function () {
            $('html, body').animate({
                scrollTop: $(".Review").offset().top
            }, 2000);
        })
    }

    aif_check = (select_monthly,one_time) => {
        var self = this;
        user_data = JSON.parse(sessionStorage.getItem('user_data'));
        let datastring =
            {
                "application": {
                    "afficiency_id": user_data.aff2,
                    "visit_id": cookie.load('visit_id'),
                    "coverage_ask":select_monthly,
                    "rider_ask": one_time
                }
            }

        console.log("AIF datastring : - " +JSON.stringify(datastring))
        $.ajax({
            url: ApiList.current.base_api_url + ApiList.page_ten.aif_check,
            type: 'POST',
            data: JSON.stringify(datastring),
            headers: {
                        
                        'Content-Type': 'application/json'
            },
            success: (data_aif) => {
                console.log("aif response >> "+JSON.stringify(data_aif))
                // var data_aif_res = data_aif ? JSON.parse(data_aif) : null;
                // console.log("aif page res >>>" + JSON.stringify(data_aif_res[0]))
                // if (data_aif_res[0][1] != null && data_aif_res[0][2] != null && data_aif_res[0][1] != 0 && data_aif_res[0][2] != 0) {

                if (data_aif.adjusted_coverage != null && data_aif.max_coverage != null) {
                    self.dropdown_baseon_aif(dropdown.table_name.page10, dropdown.column_name.Income_need, "final_section_monthly_income", data_aif.adjusted_coverage, data_aif.max_coverage)
                    self.dropdown_baseon_aif(dropdown.table_name.page10, dropdown.column_name.lump_sum, "final_section_one_time", one_time, 100000)

                    // table_name, col_name, id, preselected, restrict_value
                    // self.dropdown_baseon_aif(dropdown.table_name.page10, dropdown.column_name.Income_need, "final_section_monthly_income", user_data.select_monthly_income_benifit, data_aif_res[0][1])
                    // self.dropdown_baseon_aif(dropdown.table_name.page10, dropdown.column_name.lump_sum, "final_section_one_time", user_data.select_add_on_one_time_payment, data_aif_res[0][2])
                } else {
                    self.dropdown_baseon_aif(dropdown.table_name.page10, dropdown.column_name.Income_need, "final_section_monthly_income", user_data.select_monthly_income_benifit, 7000)
                    self.dropdown_baseon_aif(dropdown.table_name.page10, dropdown.column_name.lump_sum, "final_section_one_time", one_time, 100000)
                }
            },
            error: (err) => {
                console.log("ERROR in aif page 10 api " + JSON.stringify(err));
            }
        })
    }

    dropdown_baseon_aif = (table_name, col_name, id, preselected, restrict_value) => {

        $.ajax({
            url: ApiList.current.base_api_url + ApiList.dropdown_base_url,
            type: 'POST',
            data: JSON.stringify({
                "dropdown_list": {
                    "table_name": table_name,
                    "column_name": col_name
                }
            }),
            headers: {
                        
                        'Content-Type': 'application/json'
            },
            success: (data) => {
                var options = "";
                $('#' + id).empty();
                for (var i = 0; i < data.length; i++) {
                    if (data[i].refValue <= restrict_value) {
                        if (preselected != null) {
                            if (preselected == data[i].refValue) {
                                options += '<option value=' + data[i].refValue + ' selected>' + data[i].ref_key + '</option>'
                            } else {
                                options += '<option value=' + data[i].refValue + '>' + data[i].ref_key + '</option>'
                            }
                        } else {
                            options += '<option value=' + data[i].refValue + '>' + data[i].ref_key + '</option>'
                        }
                    }
                    if (i == data.length - 1) {
                        $('#' + id).append(options);
                    }
                }
            },
            error: (err) => {
                console.log("ERROR in dropdown " + id + + JSON.stringify(err));
            }
        })
    }
    // ################################ Pricing api ##########################
    fetch_pricing_api = (product_annual_coverage_amount, rider_annual_coverage_amount, rate_class, payment_frequency, rider_id) => {
        this.fetch_pricing_api_annually(product_annual_coverage_amount, rider_annual_coverage_amount, rate_class, payment_frequency, rider_id)

        var final_rate_class_value = user_data.rule_engine[0] == 101 ? user_data.rule_engine_2[1] : user_data.rule_engine[1];

        if (final_rate_class_value == 1) {
            rate_class = "Best"
        } else if (final_rate_class_value == 2) {
            rate_class = "Better"
        } else if (final_rate_class_value == 3) {
            rate_class = "Good"
        } else if (final_rate_class_value == 4) {
            rate_class = "Average";
        }
        let datastring = {
            "product_id": 100001,
            "state": user_data.state,
            "product_id_rider": rider_id,
            "visitor_id": cookie.load('visit_id'),
            "afficiency_id": user_data.aff2,
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
        console.log("JSON CHK::" + JSON.stringify(datastring))
        console.log("URL::" + ApiList.current.base_afficient_api_url + '/quote/calculate')
        $.ajax({
            url: ApiList.current.base_afficient_api_url + ApiList.page_two.quotes_calculate,
            type: 'POST',
            data: JSON.stringify(datastring),
            headers: {
                        
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
                        // alert(premium_lump_sum)
                        $('.2bcard_text1').text("$" + premium_total)
                        $('.subtitle_text').text("$" + premium_total)

                        $('.2bcard_text2').text("$" + premium_income_need)
                        $('.2bcard_text3').text("$" + premium_lump_sum)
                        user_data.premium_total = premium_total
                        user_data.monthly_income_benefit = premium_income_need
                        user_data.add_on_one_time_payment = premium_lump_sum
                        user_data.rate_class = data.data.rate_class
                        user_data.payment_frequency = data.data.payment_frequency
                        user_data.rider_id = rider_id
                        sessionStorage.setItem('user_data', JSON.stringify(user_data))
                    }
                    else {
                        AppStage.save_app_stage(cookie.load('visit_id'), 10)
                        let user_data = JSON.parse(sessionStorage.getItem('user_data'))
                        user_data.failure_code = 9;
                        sessionStorage.setItem('user_data', JSON.stringify(user_data))
                        window.location.href = "/life-insurance-application-call-now"

                    }

                }
            },
            error: (err) => {
                console.log("ERROR in pricing api " + JSON.stringify(err));
            }
        })
    }
    fetch_pricing_api_annually = (product_annual_coverage_amount, rider_annual_coverage_amount, rate_class, payment_frequency, rider_id) => {
        var final_rate_class_value = user_data.rule_engine[0] == 101 ? user_data.rule_engine_2[1] : user_data.rule_engine[1];
        if (final_rate_class_value == 1) {
            rate_class = "Best"
        } else if (final_rate_class_value == 2) {
            rate_class = "Better"
        } else if (final_rate_class_value == 3) {
            rate_class = "Good"
        } else if (final_rate_class_value == 4) {
            rate_class = "Average";
        }
        let datastring = {
            "product_id": 100001,
            "state": user_data.state,
            "product_id_rider": rider_id,
            "visitor_id": cookie.load('visit_id'),
            "afficiency_id": user_data.aff2,
            "height": user_data.height,
            "weight": user_data.weight,
            "date_of_birth": user_data.dob,
            "sex": user_data.gender,
            "term_length": 20,
            "product_annual_coverage_amount": product_annual_coverage_amount,
            "rider_annual_coverage_amount": parseInt(rider_annual_coverage_amount),
            "rate_class": rate_class,
            "payment_frequency": "annually",
            "tobacco_use": user_data.tobbacouse
        }
        console.log(JSON.stringify(datastring))
        $.ajax({
            url: ApiList.current.base_afficient_api_url + ApiList.page_two.quotes_calculate,
            type: 'POST',
            data: JSON.stringify(datastring),
            headers: {
                        
                        'Content-Type': 'application/json'
            },
            success: (data) => {
                if (data) {
                    console.log(JSON.stringify(data))
                    if (data.statusCode == 1) {
                        var premium_total = parseFloat(data.data.premium_total).toFixed(2);
                        $(".subtitle_card_text").text("$" + premium_total)
                    }
                    else {
                        AppStage.save_app_stage(cookie.load('visit_id'), 10)
                        let user_data = JSON.parse(sessionStorage.getItem('user_data'))
                        user_data.failure_code = 9;
                        sessionStorage.setItem('user_data', JSON.stringify(user_data))
                        window.location.href = "/life-insurance-application-call-now"

                    }

                }
            },
            error: (err) => {
                console.log("ERROR in pricing api " + JSON.stringify(err));
            }
        })

    }
    // ################################ Pricing api ##########################
    save_api = () => {
        let user_data = JSON.parse(sessionStorage.getItem('user_data'));
        var final_rate_class;
        var final_term_length;
        if (user_data.rate_class == "Best") {
            final_rate_class = 1
        } else if (user_data.rate_class == "Better") {
            final_rate_class = 2
        } else if (user_data.rate_class == "Good") {
            final_rate_class = 3
        } else if (user_data.tobbacouse == 1) {
            final_rate_class = 4
        }
        var age_ = this.state.age;
        console.log("Age of user -- " + age_)
        if (age_ >= 20 && age_ <= 45) {
            final_term_length = 20
            user_data.final_term_length = final_term_length

        } else if (age_ >= 46) {
            var plus_for_age = age_ - 45
            final_term_length = 20 - plus_for_age
            user_data.final_term_length = final_term_length
        }
        console.log("Term length on age of user " + final_term_length)
        let datastring = {
            "application_price": {
                "afficiency_id": user_data.aff2,
                "visit_id": cookie.load('visit_id'),
                "final_income_need_coverage": $("#final_section_monthly_income option:selected").val(),
                "final_lump_sum_coverage": $("#final_section_one_time option:selected").val(),
                "final_term_length": final_term_length,
                "final_premium": user_data.premium_total,
                "final_income_premium": user_data.monthly_income_benefit,
                "final_lump_sum_premium": user_data.add_on_one_time_payment,
                "lump_sum_rider_flg": user_data.rider_id == 100000 ? 1 : 0,
                "pre_uw_dropout_reason": 4,
                "uw_decline_reason_code": 4,
                "uw_decision_date": user_data.uw_decision_date,
                "agent_flag": sessionStorage.getItem('agent_present_flag') ? sessionStorage.getItem('agent_present_flag') : 0
            },
            "navigation_log": {
                "visit_id": cookie.load('visit_id'),
                "page_url": window.location.pathname,
                "entry_timestamp": moment().format("MM/DD/YYYY"),
                "exit_timestamp": moment().format("MM/DD/YYYY"),
                "interactive_indicator": 1
            }
        }
        if (sessionStorage.getItem('agent_present_flag')) {
            datastring.application_price['agent_id'] = sessionStorage.getItem('agent_id');
            datastring.application_price['agent_assisted_flag'] = 1;
            datastring.application_price['agent_entry_screen'] = 10
        }
        console.log("save final pricing data >> " + JSON.stringify(datastring));
        $.ajax({
            url: ApiList.current.base_api_url + ApiList.page_ten.update_ten,
            type: 'POST',
            data: JSON.stringify(datastring),
            headers: {
                        
                        'Content-Type': 'application/json'
            },
            success: (data) => {
                console.log(data);
                if (data.statusCode == 200) {
                    user_data.select_monthly_income_benifit = $("#final_section_monthly_income option:selected").val();
                    user_data.select_add_on_one_time_payment = $("#final_section_one_time option:selected").val();
                    sessionStorage.setItem('user_data', JSON.stringify(user_data))
                    // alert(JSON.stringify(data));
                }
            },
            error: (err) => {
                console.log("ERROR in update_ten " + JSON.stringify(err));
            }
        })

    }


    render() {
        const  age  = this.props.age;

        var income_until = 0;
        if(age  >= 20 && age <= 35){
            income_until = moment().year() + 30;
        }else if (age  >= 36 && age <= 50) {
            income_until = moment().year() + (30 - (age - 35));
        }
        return (
            <div>

                <div id="section1" className="col-md-12 mt3 section1_1 text-center section" style={{ backgroundColor: "#00C5FC" }}>
                    <div className="container mt1">
                        <h1 className="col-md-12 agendabold42 col-md-12" id="1006"></h1>
                        <div className="ltr20 col-md-9 col-md-offset-1 mt1">You're approved. For <span className="subtitle_text"></span> a month you can protect your loved ones' future. If needed,
                    you can adjust your coverage to better match their income needs or budget.</div>
                        <div className="col-md-12 col-sm-12 col-xs-12 mt2 mt3">
                            <div className="col-md-4 col-sm-4 col-sm-offset-3 col-md-offset-2  col-xs-10 col-xs-offset-1 text-left">
                                <ul className="list-unstyled ul_final_section_pricing">
                                    <li className="fgsd14 tt" id="1008"></li>
                                    <li className="mt2"> <div className="rail-select box">
                                        <div className="select-side">
                                            <img src={img_one} alt="" />
                                        </div>
                                        <select className="form-control" id="final_section_monthly_income" >
                                        </select>
                                    </div>
                                    </li>
                                    <br />
                                    <br />
                                    <li className="fgsd14 tt" id="1010"></li>
                                    <li className="mt2"> <div className="rail-select box">
                                        <div className="select-side">
                                            <img src={img_one} alt="" />
                                        </div>
                                        <select className="form-control" id="final_section_one_time">
                                        </select>
                                    </div>
                                    </li>
                                </ul>

                            </div>
                            <div className="col-md-4 col-sm-4 col-sm-offset-3 col-md-offset-0 col-xs-10 col-xs-offset-1 ">
                                <div className="panel-body section1_d_panel">
                                    <div className="col-md-12 agendabold42 2bcard_text1">
                                        $ 0
                                    </div>
                                    <div className="col-md-12 fgsb14 tt" id="1009">
                                        
                                    </div>
                                    <div className="col-md-12 mt2 fgsb14 tt " id="1011">
                                         OR <span className="subtitle_card_text"></span> annually
                                    </div>
                                    <div className="col-md-12 mt6 fgsd24 2bcard_text2">
                                        $ 0
                                    </div>
                                    <div className="col-md-12 fgsd14 tt" id="1012">
                                                                      </div>
                                    <div className="col-md-12 fgsd24 2bcard_text3" >
                                        $ 0
                                    </div>
                                    <div className="col-md-12 fgsd14 tt" id="1013">
                                    
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 col-sm-12 col-xs-12 mt4 mb3 text-center">

                            <button className="btn cbtn_color final_section_accepet" aria-label="next section down" role="button" onClick={this.save_api} tabIndex="0" id="1014">I ACCEPT <img src={img_one} style={{"width":"1.5rem"}} alt="drop down arrow image"/></button>
                        </div>
                        <div className="col-md-8 col-md-offset-2 col-sm-8 col-sm-offset-2 col-xs-12 col-xs-offset-0 text-center mt2 ltr20 mb3">
                            {/* Your policy lasts {(age >= 20 && age <= 45) ? 'for 20 years' : 'to age 65'}. <br /> */}
                            {/* If you die during that time, your loved ones receive guaranteed, monthly income until {income_until} (when you would have been age {(age >= 20 && age <= 35) ? (age + 30) : ' 65'}). */}
                            {/* <div> {(age >= 40 && age <= 50) ? ' And those payments will be paid for a minimum of five years.' : null}</div> */}

                            Your policy lasts {(age >= 20 && age <= 45) ? 'for 20 years' : 'to age 65'}. <br />
                            If you die during that time, your loved ones receive guaranteed, monthly income until {income_until} (when you would have been age {(age >= 20 && age <= 35) ? (age + 30) : ' 65'}).
                            <div> {(age >= 40 && age <= 50) ? ' And those payments will be paid for a minimum of five years.' : null} </div>

                        </div>
                    </div>
                </div>



            </div>

        )
    }

}
