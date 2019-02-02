import React, { Component } from 'react';
import cookie, { select } from 'react-cookies'
import Header from '../partials/header';
import moment from 'moment';
import $ from 'jquery';
import EventMapper from "../../config/handle_window_event";
import ApiList from "../../config/base.json"


export default class failure extends Component {
    constructor() {
        super();
        this.state = {
        }
    }

    componentDidMount() {

        var self = this;
        var afficiency_id = EventMapper.query('arcID');
        var visit_id = EventMapper.query('visitId');

        if (visit_id != null && afficiency_id != null) {
            console.log("------------------------ Reurn from cyber source -----------------------")
            if (cookie.load('page3_firstname')) {
                name = cookie.load('page3_firstname') ? cookie.load('page3_firstname') : null;
            }
            $('#main_title_failure').text("I'm sorry " + name + ".")
            $('#subtitle_failure').text('We are unable to process your payment details at this time. Please try again later.')
        } else {


        }
        let user_data = JSON.parse(sessionStorage.getItem('user_data'))
        let name = "";
        if (user_data) {
            if (user_data.failure_code) {
                if (cookie.load('page3_firstname')) {
                    name = cookie.load('page3_firstname') + ", ";
                }
                if (user_data.failure_code == 1) {
                    $('#main_title_failure').text(name + 'Thanks for your interest in Salary Shield life insurance.')
                    $('#subtitle_failure').text('At this time Salary Shield is not available to replace existing coverage.')
                }
                if (user_data.failure_code == 3) {
                    $('#main_title_failure').text(name + 'Thanks for your interest in Salary Shield life insurance.')
                    $('#subtitle_failure').text('Our platform is currently unavailable. We are working to restore it so please try again soon. We apologize for any inconvenience.')
                    self.error_code(1)
                }
                if (user_data.failure_code == 4) {
                    $('#main_title_failure').text(name + 'Thanks for your interest in Salary Shield life insurance.')
                    $('#subtitle_failure').text('Based on the information we’ve gathered so far, we are unable to complete your application electronically. Check your email for information about how to continue with your application. ')
                }
                if (user_data.failure_code == 5) {
                    $('#main_title_failure').text(name + 'Thanks for your interest in Salary Shield life insurance.')
                    $('#subtitle_failure').text('We are not able to verify your identity at this time. As a security precaution, you will not be able to apply online for 14 days. If you’d like to continue your application at this time, please call 1-877-225-4919.')
                }
                if (user_data.failure_code == 6) {
                    $('#main_title_failure').text(name + 'Thanks for your interest in Salary Shield life insurance.')
                    $('#subtitle_failure').text('Based on your application, we are unable to offer you an Salary Shield policy. Please check your email for additional information.')
                }
                if (user_data.failure_code == 7) {
                    $('#main_title_failure').text(name + 'Thanks for your interest in Salary Shield life insurance.')
                    $('#subtitle_failure').text('We are not able to verify your identity at this time. If you’d like to continue your application, please call 1-877-225-4919.')
                }
                if (user_data.failure_code == 8) {
                    $('#main_title_failure').text(name + 'Thanks for your interest in Salary Shield life insurance.')
                    $('#subtitle_failure').text('We see that you already have the maximum allowed coverage for Salary Shield. Thanks for your interest, but we are unable to sell you additional coverage at this time.')
                }
                if (user_data.failure_code == 9) {
                    $('#main_title_failure').text("We're Sorry")
                    $('#subtitle_failure').text('Based on your height and weight information, you are not eligible to apply for Salary Shield.')
                }
                if (user_data.failure_code == 10) {
                    $('#main_title_failure').text('Sorry')
                    $('#subtitle_failure').text('This application is expired, please start a new application.')
                }
                if (user_data.failure_code == 11) {
                    $('#main_title_failure').text('Sorry')
                    $('#subtitle_failure').text("You are ineligible to sell policies in the state.")
                }

            }


        }
        if (user_data != null ? (user_data.rule_engine != null ? user_data.rule_engine[0] : null) : null) {
            var rule_engine_failur_dxc_call = user_data.rule_engine_2 ? (user_data.rule_engine_2[0] ? user_data.rule_engine_2[0] : null) : (user_data.rule_engine ? user_data.rule_engine[0] : null);
            if (rule_engine_failur_dxc_call != null) {
                if (rule_engine_failur_dxc_call == 2 || rule_engine_failur_dxc_call == 4 || rule_engine_failur_dxc_call == 6) {
                    console.log("send error code 3")
                    self.error_code(3)
                } else if (rule_engine_failur_dxc_call == 3) {
                    console.log("send error code 2")
                    self.error_code(2)
                } else {
                    console.log("rpm call")
                    self.rpm_call()
                }
            }
        } else {
            console.log("rpm call")
            self.rpm_call()
        }
    }

    rpm_call = () => {
        let user_data = JSON.parse(sessionStorage.getItem('user_data'));

        let rpm_datastring = {
            "app_data": user_data ? user_data : null
        }
        rpm_datastring.app_data.distributor_id = (sessionStorage.getItem('distributor_id')) ? (sessionStorage.getItem('distributor_id')) : null;
        rpm_datastring.app_data.pe_journey_id = (sessionStorage.getItem('pe_journey_id')) ? (sessionStorage.getItem('pe_journey_id')) : null;
        rpm_datastring.app_data.visit_id = cookie.load('visit_id');


        console.log(ApiList.current.base_api_url + ApiList.failure.rpm_call)
        console.log(" rpm json >>> " + JSON.stringify(rpm_datastring))

        $.ajax({
            url: ApiList.current.base_api_url + ApiList.failure.rpm_call,
            type: 'POST',
            data: JSON.stringify(rpm_datastring),
            headers: {
                        'Authorization': 'Bearer '+ this.props.token,
                        'Content-Type': 'application/json'
            },
            success: (data) => {
                console.log("rpm res:" + JSON.stringify(data))
            },
            error: (err) => {
                console.log("ERROR in rpm api " + JSON.stringify(err));
            }
        })

    }

    error_code = (er_code) =>{
        let datastring = {
            "application": {
                "visit_id": cookie.load('visit_id') ? cookie.load('visit_id') : null,
                "error_code": er_code
            }
        }
        console.log(ApiList.current.base_api_url + ApiList.failure.error_code)
        console.log(" error >>> " + JSON.stringify(datastring))

        $.ajax({
            url: ApiList.current.base_api_url + ApiList.failure.error_code,
            type: 'POST',
            data: JSON.stringify(datastring),
            headers: {
                        'Authorization': 'Bearer '+ this.props.token,
                        'Content-Type': 'application/json'
            },
            success: (data) => {
                console.log("err code res" + JSON.stringify(data))
            },
            error: (err) => {
                console.log("ERROR in error code " + JSON.stringify(err));
            }
        })

    }
    // function=()=>{

    // }

    render() {
        return (
            <div>
                 <div className="container">
                <div className="row">
                <div className="col-md-12 text-center" style={{ backgroundColor: 'unset' }}>
                   
                        <h1 className="col-md-12 agendabold42 mt5" id="main_title_failure"></h1>
                        <div className="col-md-8 col-md-offset-2 mt2 mb4 ltr20" style={{ lineHeight: '35px', fontSize: '30px' }} id="subtitle_failure">Our platform is currently unavailable. We are working to restore it so please try again soon. We apologize for any inconvenience.</div>
                    </div>
                </div>
                </div>
            </div>

        )
    }
}
