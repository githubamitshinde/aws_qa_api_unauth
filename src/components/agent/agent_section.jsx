import React, { Component } from 'react';

import $ from 'jquery';
import ApiList from "../../config/base.json";
import cookie from 'react-cookies'

import '../../css/income_shield/income_shield_one.css';

import '../../css/agent.css'
import '../../css/other/custom_radio.css'
import '../../css/agent/agent_base.css'

let user_data = sessionStorage.getItem('user_data') ? JSON.parse(sessionStorage.getItem('user_data')) : null;
var mail_url;
var edelivery_flag = 0;

var firstPassword;
var secondUserName;
var tokenGlobal;
var tokenGlobalAfficient;

export default class AgentSection extends Component {
    constructor() {
        super();
        this.state = {
            email_sent_2_flag: 0
        }
    }

    componentDidMount() {

        var self = this;
        $('.how_it_works').hide()
        $('.faq').hide();
        self.agent_timer_out();
        if (window.location.pathname.split('/').slice(-1)[0] == 'life-insurance-online-questionnaire-complete' || window.location.pathname.split('/').slice(-1)[0] == 'life-insurance-online-questionnaire-complete-b') {
            $('.mail_button_li').append(' <div class="btn tt cbtn_color mail_trigger_button mt6 tt" style="border-radius:7px !important;width:240px !important" >SEND eDELIVERY CONSENT EMAIL</div><div class="tt fgsd12 mt2">Customer has clicked on consent link in email?</div>')
            $('.mail_button_2').append(' <div class="btn tt cbtn_color mt2 mail_trigger_2" style="border-radius:7px !important;width:220px !important;background-color:#fae4408a" >send disclosures by mail</div>')
            mail_url = '/email/agentEmail';
            $('.y_n_button').css('display', 'inline-flex')
            $('.agent_tcpa_disabled').css('height', '20px')
            $('#checkbox').prop('disabled', true)
        } else if (window.location.pathname.split('/').slice(-1)[0] == 'life-insurance-online-payment') {
            $('.mail_button_li').append(' <div class="btn tt cbtn_color mail_trigger_button mt6 tt" style="border-radius:7px !important;width:220px !important" >SEND disclosures by mail</div><div class="tt fgsd12 mt2">(do not read aloud): I confirm customer has recevied and agreed to the emailed disclosures</div>')
            mail_url = '/email/agentEmailWithAttachment';
        }

        if (window.location.pathname.split('/').slice(-1)[0] == 'instant-life-insurance' || window.location.pathname.split('/').slice(-1)[0] == 'life-insurance-quote') {
            $('.agent_tcpa').hide()
        } else if (window.location.pathname.split('/').slice(-1)[0] == 'life-insurance-apply-online') {
        } else {
            $("input[name=tcpa]").prop('disabled', true)
            var tcpa_value = user_data.tcpa_flag ? user_data.tcpa_flag : null;
            $("input[name=tcpa][value=" + tcpa_value + "]").prop('checked', true);
        }


        $(document).on('click', '.mail_trigger_button', function () {
            $(this).css("box-shadow", 'inset 0 0 5px #000000')
            let datastring = {
                "email": {
                    "customer_name": user_data.first_name,
                    "email_address": user_data.email,
                    "url": ApiList.current.ui_url + "/Set-Email-Consent-Flag?arcID=" + user_data.aff2 + "&visitId=" + cookie.load('visit_id') //window.location.href
                }
            }
            console.log("agent mail datasring >>" + JSON.stringify(datastring))
            $.ajax({
                url: ApiList.current.base_api_url + mail_url,
                type: 'POST',
                data: JSON.stringify(datastring),
                headers: {
                    'Authorization': 'Bearer ' + tokenGlobal,
                    'Content-Type': 'application/json'
                },
                success: (data) => {
                    console.log("agent mail res >>" + JSON.stringify(data));
                    if (data.statusCode == 200) {
                        self.yes_no_light_counter();

                    }
                },
                error: (err) => {
                    console.log("ERROR in agent mail " + JSON.stringify(err));

                }
            })
        })

        $(document).on('click', '.mail_trigger_2', function () {

            if (edelivery_flag == 1) {

                $(this).css("box-shadow", 'inset 0 0 5px #000000')
                let datastring = {
                    "email": {
                        "customer_name": user_data.first_name,
                        "email_address": user_data.email,
                    }
                }
                console.log("agent mail datasring >>" + JSON.stringify(datastring))
                $.ajax({
                    url: ApiList.current.base_api_url + '/email/agentEmailWithAttachmentSix',
                    type: 'POST',
                    data: JSON.stringify(datastring),
                    headers: {
                        'Authorization': 'Bearer ' + tokenGlobal,
                        'Content-Type': 'application/json'
                    },
                    success: (data) => {
                        console.log("agent mail 2 res >>" + JSON.stringify(data));
                        if (data.statusCode == 200) {
                            self.setState({
                                email_sent_2_flag: 1
                            })
                            // $('#email_sent_2_flag').val(1)
                            $('#checkbox').prop('disabled', false)
                        }
                    },
                    error: (err) => {
                        console.log("ERROR in agent mail " + JSON.stringify(err));

                    }
                })
            }
        })
    }

    agent_timer_out = () => {
        var time_agent_sec = 0;
        var time_agent_min = 0;
        $(".agent_time_display").val(time_agent_min + " min")
        var timer_agent = setInterval(function () {
            time_agent_sec++;
            if (time_agent_sec % 60 == 0) {
                time_agent_min++;
                $(".agent_time_display").val(time_agent_min + " min")

            }
        }, 1000);
    }

    yes_no_light_counter = () => {
        var time_agent_sec = 0;

        var timer_agent = setInterval(function () {
            time_agent_sec++;
            if (time_agent_sec % 15 == 0) {

                let datastring = {
                    "application": {
                        "visit_id": cookie.load('visit_id'),
                        "afficiency_id": user_data.aff2,
                    }
                }
                console.log("y n light datasring >>" + JSON.stringify(datastring))
                $.ajax({
                    url: ApiList.current.base_api_url + '/application/getConsentFlag',
                    type: 'POST',
                    data: JSON.stringify(datastring),
                    headers: {
                        'Authorization': 'Bearer ' + tokenGlobal,
                        'Content-Type': 'application/json'
                    },
                    success: (data) => {
                        console.log("getConsentFlag res >>" + JSON.stringify(data));
                        if (data.consent_flag == 1) {
                            $('.yes').css('background', 'green')
                            $('.yes').css('color', 'black')
                            $('.no').css('background', '#FDFDFD')
                            $('.no').css('color', 'grey')
                            $('.mail_trigger_2').css('background-color', '#F9E038')

                            edelivery_flag = 1;
                            clearInterval(timer_agent);
                        }
                    },
                    error: (err) => {
                        console.log("ERROR in getConsentFlag mail " + JSON.stringify(err));

                    }
                })



            }

        }, 1000);

    }

    send_agent_mail = () => {
        let datastring = {
            "email": {
                "customer_name": user_data.first_name,
                "email_address": user_data.email,
                "url": "/" + window.location.pathname.split('/').slice(-1)[0]
            }
        }
        console.log("agent mail datasring >>" + JSON.stringify(datastring))
        $.ajax({
            url: ApiList.current.base_api_url + '/email/agentEmail',
            type: 'POST',
            data: JSON.stringify(datastring),
            headers: {
                'Authorization': 'Bearer ' + tokenGlobal,
                'Content-Type': 'application/json'
            },
            success: (data) => {
                console.log("agent mail res >>" + JSON.stringify(data));
                if (data.statusCode == 200) {

                }
            },
            error: (err) => {
                console.log("ERROR in agent mail " + JSON.stringify(err));

            }
        })
    }

    render() {
        const { email_sent_2_flag } = this.state;
        return (
            <div>
                <div className="col-md-12" style={{ backgroundColor: 'grey' }}>
                    <div className="container mb3 agent_container">
                        <div className="col-md-9 pd0">
                            <div className="col-md-12 agendabold42 mt4">Customer Summary</div>
                            <div className="col-md-4">
                                <div className="col-md-12 pd0 text-right mt3"> <span className="fgsd14">FIRST NAME</span> <input className="" type="text" value={user_data ? user_data.first_name : ''} style={{ width: '67%' }} disabled /> </div>
                                <div className="col-md-12 pd0 text-right mt3"> <span className="fgsd14">Email</span> <input className="" type="text" value={user_data ? user_data.email : ''} style={{ width: '84%' }} disabled /> </div>
                                <div className="col-md-12 pd0 text-right mt3"> <span className="fgsd14">MONTHY BENEFIT:</span> <input className="" value={user_data ? user_data.select_monthly_income_benifit : ''} type="text" style={{ width: '52%' }} disabled /> </div>
                            </div>
                            <div className="col-md-4">
                                <div className="col-md-12 pd0 text-right mt3"> <span className="fgsd14">LAST NAME</span> <input className="" type="text" value={user_data ? user_data.last_name : ''} style={{ width: '69%' }} disabled /> </div>
                                <div className="col-md-12 pd0 text-right mt3"> <span className="fgsd14">PHONE NUMBER</span> <input className="" type="text" value={user_data ? user_data.phone_number : ''} style={{ width: '56%' }} disabled /> </div>
                                <div className="col-md-12 pd0 text-right mt3"> <span className="fgsd14">LUMP SUM:</span> <input className="" type="text" value={user_data ? user_data.select_add_on_one_time_payment : ''} style={{ width: '68%' }} disabled /> </div>

                            </div>
                            <div className="col-md-4">
                                <div className="col-md-12 pd0 text-right mt3"> <span className="fgsd14">DATE OF BIRTH</span> <input className="" type="text" value={user_data ? user_data.dob : ''} style={{ width: '60%' }} disabled /> </div>
                                <div className="col-md-12 pd0 text-right mt3"> <span className="fgsd14">ZIP CODE</span> <input className="" type="text" value={user_data ? user_data.zipcode : ""} style={{ width: '73%' }} disabled /> </div>
                                <div className="col-md-12 pd0 text-right mt3"> <span className="fgsd14">QUOTE:</span> <input className="" type="text" style={{ width: '78%' }} value={user_data ? user_data.premium_total : ''} disabled /> </div>
                            </div>
                            {/* <div className="col-md-3">
            </div> */}
                        </div>
                        <input type="hidden" id="email_sent_2_flag" value={email_sent_2_flag} />
                        <div className="col-md-3 mt3">
                            <ul className="list-unstyled ">
                                <li className="fgsd14 tt">timer </li>
                                <li> <input type="text" className="agent_time_display" style={{ width: '45%' }} disabled /> </li>
                                <li className="tt fgsd14 mt6 agent_tcpa">tcpa</li>
                                <li className="agent_tcpa" >
                                    <div className="radio__container" >
                                        <div className="radio-inline fgsd18">
                                            <input className="radio" id="ap1r1" name="tcpa" type="radio" value="1" />
                                            <label style={{ fontWeight: 'unset' }} className="radio__label ap1r1" for="ap1r1" id=""></label>
                                        </div>
                                        <div className="radio-inline fgsd18">
                                            <input className="radio" id="ap1r2" name="tcpa" type="radio" value="2" />
                                            <label style={{ fontWeight: 'unset' }} className="radio__label ap1r2" for="ap1r2" id=""></label>
                                        </div>

                                    </div>
                                </li>
                                {/* <li className="tt fgsd14 mt6 agent_tcpa_disabled" style={{ 'display': 'block' }}>tcpa</li>
                                <li className="agent_tcpa_disabled" style={{ 'display': 'block' }}>
                                    <div className="radio__container" >
                                        <div className="radio-inline fgsd18">
                                            <input className="radio" id="" name="tcpa_fake" type="radio" value="1" disabled checked />
                                            <label style={{ fontWeight: 'unset' }} className="radio__label ap1r1" for="" id=""></label>
                                        </div>
                                        <div className="radio-inline fgsd18">
                                            <input className="radio" id="" name="tcpa_fake" type="radio" value="2" disabled />
                                            <label style={{ fontWeight: 'unset' }} className="radio__label ap1r2" for="" id=""></label>
                                        </div>

                                    </div>
                                </li> */}
                                <li className="mail_button_li">

                                </li>
                                <li className="y_n_button" style={{ display: 'none' }}> <div className="yes">Y</div> <div className="no">N</div> </li>
                                <li className="mail_button_2">

                                </li>
                            </ul>
                        </div>


                    </div>
                </div>
            </div>

        )
    }

}