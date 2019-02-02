import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import cookie from 'react-cookies'
import moment from 'moment';
import ApiList from "../../config/base.json"
import Header from '../partials/header';
import IncomeShieldFour from '../income_shield/income_shield_4'
import Footer from '../partials/footer'
import Faq from '../others/faq'
import GiveCall from '../others/give_call'
import SocketContext from '../../socket-context.js';
import TAC from '../others/tandc'
import AgentSection from '../agent/agent_section';
import $ from 'jquery';
import PageMapper from "../../config/page_mapper";
import EventMapper from "../../config/handle_window_event";
import ReactGA from 'react-ga';

import ErrorMsg from "../../config/error_msgs";
// import img_one from "../../images/Icons/TIAA_IncomeShield-journey_styleguide-dev-08.png";
import GTM from 'react-tag-manager'

import '../../css/user_info/info_section.css';


const close_model = ApiList.base_cdn_src + "/images/SVG/Close_icon.svg"
let user_data = JSON.parse(sessionStorage.getItem('user_data'))



class PageThree extends Component {
    constructor() {
        super();
        this.state = {
            render_page: false,
            current_page_index: sessionStorage.getItem('current_index'),
            agent_flag: sessionStorage.getItem('agent_present_flag') ? parseInt(sessionStorage.getItem('agent_present_flag')) : 0
        }
    }

    componentDidMount() {
        var page_index = '2';
        this.setState({
            current_page_index: page_index
        })

        //user drop out socket client code
        try {
            let app_user_data = sessionStorage.getItem('user_data') ? JSON.parse(sessionStorage.getItem('user_data')) : {};
            console.log("reall session data ------- " + JSON.stringify(app_user_data))
            app_user_data.url = ApiList.current.ui_url + window.location.pathname
            app_user_data.call_us_at = "1800-000-111";
            app_user_data.email_template_type = 'email_template_1'; //template_type;
            app_user_data.visit_id = cookie.load('visit_id');
            app_user_data.aff2 = app_user_data.aff2 || app_user_data.aff1;
            app_user_data.agent_flag = sessionStorage.getItem('agent_present_flag') ? parseInt(sessionStorage.getItem('agent_present_flag')) : 0;
            app_user_data.distributor_id = sessionStorage.getItem('distributor_id');
            app_user_data.pe_journey_id = sessionStorage.getItem('pe_journey_id');
            app_user_data.current_index = sessionStorage.getItem('current_index');
            var datastring = {
                "app_data": app_user_data
            };

            console.log("socket-------" + JSON.stringify(datastring));
            this.props.socket.emit('userInfo', datastring);
            console.log("after socket-------" + JSON.stringify(datastring));
            //EventMapper.save_to_app_data(app_user_data)

        } catch (e) { console.log('e', e); } finally { }
        //-------------------------------

        // let user_data = sessionStorage.getItem('user_data');

        // var aff2 = user_data ? user_data.aff2 : undefined;
        // if (aff2 == undefined) {
        //     sessionStorage.setItem('current_index', page_index);
        // }
        var quote_visit_id = EventMapper.query('visit_id');
        var quote_aff_id = EventMapper.query('aff_id');

        var self = this;

        if (quote_visit_id == null) {
            EventMapper.validate_redirection(page_index)
                .then(function () {
                    self.setState({
                        render_page: true
                    }, function () {
                        // var self = this;
                        let user_data = JSON.parse(sessionStorage.getItem('user_data'))
                        console.log("THREE JSON CHK::" + JSON.stringify(user_data))
                        if (user_data.select_monthly_income_benifit == undefined || user_data.select_add_on_one_time_payment == undefined) {
                            window.location.href = "/"
                        }

                        if (sessionStorage.getItem('google_acc_id') != 'null') {
                            ReactGA.initialize(sessionStorage.getItem('google_acc_id'));
                            ReactGA.pageview(ApiList.current.ui_url + window.location.pathname);
                        }

                        // if (sessionStorage.getItem('google_acc_id') != 'null') {
                        //     ReactGA.initialize(sessionStorage.getItem('google_acc_id'));
                        //     ReactGA.pageview(ApiList.current.ui_url + window.location.pathname);
                        // }

                        //#############################################FOR FETCHING LABEL TEXT FROM JSON STARTS HERE#############################################
                        var current_page_index = self.state.current_page_index;

                        if (current_page_index) {
                            var data = PageMapper.getPageData(parseInt(current_page_index));
                            console.log(JSON.stringify(data))

                            for (var i = 0; i < data.design.Attribute.length; i++) {
                                if (data.design.Attribute[i].attributeID == 101) {

                                } else {
                                    $('#' + data.design.Attribute[i].attributeID).text(data.design.Attribute[i].labelTxt)
                                    // console.log(data.design.Attribute[i].attributeID + "--" + data.design.Attribute[i].labelTxt)
                                }

                            }
                        }
                        //#############################################FOR FETCHING LABEL TEXT FROM JSON ENDS HERE#############################################
                        // ################################### Pre populate ##############################
                        $("#page3_firstname").val(user_data.first_name ? user_data.first_name : null)
                        $("#page3_lastname").val(user_data.last_name ? user_data.last_name : null)
                        $("#page3_phonenumber").val(user_data.phone_number ? (get_phone_masked(user_data.phone_number)) : null)
                        $("#page3_email").val(user_data.email ? user_data.email : null)
                        // ################################### Pre poulate ###############################
                        // ################### check lnflag ###########
                        if (JSON.parse(sessionStorage.getItem('l_n_try_flag')) == 1) {
                            $('#ln_attempt_msg_button').click();
                            $('input').map(function () {
                                this.value = '';
                            })
                        }
                        // ################### check lnflag ###########

                    });
                })

        } else {
            //IF REDIRECTED FROM RPM QUOTE SITE, CHECK FOR COMEBACK SCENARIO WITH VISIT ID
            // alert("cff")
            // check_comeback(quote_visit_id, null)
            EventMapper.page_three_comeback(quote_visit_id, quote_aff_id)
                .then(function () {
                    return EventMapper.get_journey_json();
                })
                .then(function () {
                    self.setState({
                        render_page: true
                    }, function () {
                        //GET USER_DATA IF FETCHED FROM RHASH API
                        user_data = JSON.parse(sessionStorage.getItem('user_data'))

                        if (sessionStorage.getItem('google_acc_id') != 'null') {
                            ReactGA.initialize(sessionStorage.getItem('google_acc_id'));
                            ReactGA.pageview(ApiList.current.ui_url + window.location.pathname);
                        }

                        //FILL LABELS
                        //#############################################FOR FETCHING LABEL TEXT FROM JSON STARTS HERE#############################################
                        var current_page_index = 2;     //self.state.current_page_index;
                        // alert(current_page_index)
                        if (current_page_index) {
                            var data = PageMapper.getPageData(parseInt(current_page_index));
                            // alert(current_page_index)
                            console.log(JSON.stringify(data))

                            for (var i = 0; i < data.design.Attribute.length; i++) {
                                if (data.design.Attribute[i].attributeID == 101) {

                                } else {
                                    $('#' + data.design.Attribute[i].attributeID).text(data.design.Attribute[i].labelTxt)
                                }

                            }
                        }
                        //#############################################FOR FETCHING LABEL TEXT FROM JSON ENDS HERE#############################################
                        // ################################### Pre populate ##############################
                        $("#page3_firstname").val(user_data.first_name ? user_data.first_name : null)
                        $("#page3_lastname").val(user_data.last_name ? user_data.last_name : null)
                        $("#page3_phonenumber").val(user_data.phone_number ? (get_phone_masked(user_data.phone_number)) : null)
                        $("#page3_email").val(user_data.email ? user_data.email : null)
                        // ################################### Pre poulate ###############################
                        // ################### check lnflag ###########
                        if (JSON.parse(sessionStorage.getItem('l_n_try_flag')) == 1) {
                            $('#ln_attempt_msg_button').click();
                            $('input').map(function () {
                                this.value = '';
                            })
                        }
                        // ################### check lnflag ###########
                    });
                })
                .then(function () {
                    return EventMapper.validate_redirection(page_index)
                })
        }

        // ######################### VALIDATION FOR NAME STARTS HERE #########################
        //  $(document).on('blur', '.first-name, .last-name', function (e) {
        //     if (this.value != "") {
        //         $("#validation_" + this.id).remove();
        //         $(this).css('border-color', 'black');
        //     } else {
        //         $(this).css('border-color', 'red');
        //         $("#validation_" + this.id).is(":visible") ? null : $('<small id=validation_' + this.id + ' style="color: red;">' + ErrorMsg.basic_info[this.id] + '</small>').insertAfter("#" + this.id);
        //     }
        // });

        $(document).on('keypress', '.first-name, .last-name', function (e) {
            var code = e.keyCode || e.charCode;

            if (!(code >= 48 && code <= 57) || code == 8 || code == 9) {
            } else {
                e.preventDefault();
            }
        });
        $(document).on('blur', '.first-name, .last-name', function (e) {
            var code = e.keyCode || e.charCode;
            console.log(code)
            if (!(code >= 48 && code <= 57) || code == 8 || code == 9) {
                if (this.value != "") {
                    // $("#validation_" + this.id).remove();
                    $(this).siblings('small').remove()
                    $(this).css('border-color', 'black');
                } else {
                    $(this).css('border-color', 'red');
                    $(this).siblings('small').is(":visible") ? null : $('<small id=validation_' + this.id + ' style="color: red;">' + ErrorMsg.basic_info[this.id] + '</small>').insertAfter($(this));
                }
            }
        });
        // ######################### VALIDATION FOR NAME ENDS HERE #########################

        // ######################### VALIDATION FOR NAME STARTS HERE #########################
        $(document).on('blur', '.phone-no', function (e) {
            var value = this.value.toString().trim().replace(/["'\-() ]/g, "");

            if (value != "" & value.length == 10) {

                $("#validation_" + this.id).remove();
                $(this).css('border-color', 'black');
            } else {
                $("#validation_" + this.id).is(":visible") ? $("#validation_" + this.id).remove() : null;

                $(this).css('border-color', 'red');
                if (value.length >= 1 && value.length < 10) {
                    $("#validation_" + this.id).is(":visible") ? null : $('<small id=validation_' + this.id + ' style="color: red;">Please enter proper value</small>').insertAfter("#" + this.id);
                } else {
                    $("#validation_" + this.id).is(":visible") ? null : $('<small id=validation_' + this.id + ' style="color: red;">' + ErrorMsg.basic_info[this.id] + '</small>').insertAfter("#" + this.id);
                }
            }
        });

        $(document).on('keypress', '.phone-no', function (e) {
            var value = this.value.toString().trim().replace(/["'\-() ]/g, "");

            var code = e.keyCode || e.charCode;

            if ((code >= 48 && code <= 57) || code == 8 || code == 9) {
                // if (value.length > 0) {
                //     $("#validation_" + this.id).remove();
                //     $(this).css('border-color', 'black');
                // }
                // if (value != "" & value.length == 10) {

                //     $("#validation_" + this.id).remove();
                //     $(this).css('border-color', 'black');
                // } else {
                //     $("#validation_" + this.id).is(":visible") ? $("#validation_" + this.id).remove() : null;

                //     $(this).css('border-color', 'red');
                //     if (value.length >= 1 && value.length < 10) {
                //         $("#validation_" + this.id).is(":visible") ? null : $('<small id=validation_' + this.id + ' style="color: red;">Please enter proper value</small>').insertAfter("#" + this.id);
                //     } else {
                //         $("#validation_" + this.id).is(":visible") ? null : $('<small id=validation_' + this.id + ' style="color: red;">' + ErrorMsg.basic_info[this.id] + '</small>').insertAfter("#" + this.id);
                //     }
                // }
            } else {
                e.preventDefault();
            }
        });

        $(document).on('keyup', '.phone-no', function (e) {
            var value = this.value.toString().trim().replace(/["'\-() ]/g, "");

            var code = e.keyCode || e.charCode;

            if ((code >= 48 && code <= 57) || code == 8 || code == 9) {
                if (value.length > 0) {
                    $("#validation_" + this.id).remove();
                    $(this).css('border-color', 'black');
                }
            } else {
                e.preventDefault();
            }
        });

        function get_phone_masked(tel) {

            if (!tel) { return ''; }

            var value = tel.toString().trim().replace(/["'() ]/g, "");    // replace(/^\+/g, '');

            if (value.match(/[^0-9]/)) {
                return tel;
            }

            var city, number;
            switch (value.length) {
                case 1:
                case 2:
                case 3:
                    city = value;
                    break;

                default:
                    city = value.slice(0, 3);
                    number = value.slice(3);
            }

            if (number) {
                if (number.length > 3) {
                    number = number.slice(0, 3) + '-' + number.slice(3, 7);
                }
                else {
                    number = number;
                }

                return ("(" + city + ") " + number).trim();
            } else {
                return "(" + city;
            }
        }

        $(document).on('keyup', '.phone-no', function (e) {
            var op = get_phone_masked(this.value);
            $(this).val(op);
        });
        // ######################### VALIDATION FOR PHONE  ENDS HERE #########################

        // ######################### VALIDATION FOR EMAIL STARTS HERE #########################
        $(document).on('blur', '.email-id', function (e) {
            if (this.value.length > 0) {
                var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                $("#validation_" + this.id).is(":visible") ? $("#validation_" + this.id).remove() : null;
                if (!re.test(this.value)) {
                    $(this).css('border-color', 'red');
                    $("#validation_" + this.id).remove();
                    $("#validation_email_" + this.id).is(":visible") ? null : $('<small id=validation_email_' + this.id + ' style="color: red;">Please enter a valid email id</small>').insertAfter("#" + this.id);
                } else {
                    $("#validation_email_" + this.id).remove();
                    $(this).css('border-color', 'black');
                }
            } else {
                $("#validation_" + this.id).is(":visible") ? $("#validation_" + this.id).remove() : null;

                $(this).css('border-color', 'red');
                $("#validation_email_" + this.id).remove();
                $("#validation_" + this.id).is(":visible") ? null : $('<small id=validation_' + this.id + ' style="color: red;">' + ErrorMsg.basic_info[this.id] + '</small>').insertAfter("#" + this.id);
            }
        });
        // ######################### VALIDATION FOR EMAIL STARTS HERE #########################
    }

    submit_personal_data = () => {
        var field_validate = this.validate_form();
        var tcpa_validate = this.validate_agent_tcpa();
        if (field_validate && (sessionStorage.getItem('agent_present_flag') == '1' ? tcpa_validate : true)) {
            $("#validation_page_three").css("display", 'none');
            user_data.tcpa_flag = $("input[name='tcpa']:checked").val()
            user_data.first_name = $("#page3_firstname").val()
            user_data.last_name = $("#page3_lastname").val()
            user_data.phone_number = $("#page3_phonenumber").val().toString().trim().replace(/["'\-() ]/g, "")
            user_data.email = $("#page3_email").val()
            cookie.save('page3_firstname', $("#page3_firstname").val(), { path: '/', maxAge: 365 * 86400 })
            cookie.save('page3_lastname', $("#page3_lastname").val(), { path: '/', maxAge: 365 * 86400 })
            cookie.save('page3_phonenumber', $("#page3_phonenumber").val().toString().trim().replace(/["'\-() ]/g, ""), { path: '/', maxAge: 365 * 86400 })
            // cookie.save('page3_email', $("#page3_email").val(), { path: '/', maxAge: 365 * 86400 })
            sessionStorage.setItem('user_data', JSON.stringify(user_data))
            let datastringnav={
                "navigation_log": {
                    "visit_id": cookie.load('visit_id'),
                    "page_url": window.location.pathname,
                    "entry_timestamp": moment().format("MM/DD/YYYY"),
                    "exit_timestamp": moment().format("MM/DD/YYYY"),
                    "interactive_indicator": 1

                }
            }
            console.log(ApiList.current.base_api_url + ApiList.nav_create+" -- "+ JSON.stringify(datastringnav))
            $.ajax({
                url: ApiList.current.base_api_url + ApiList.nav_create,
                type: 'POST',
                data: JSON.stringify(datastringnav),
                headers: {
                    'Content-Type': "application/json"
                },
                success: (data) => {
                    console.log("res>" + JSON.stringify(data))
                    if (data.statusCode == 200) {
                        var screen_id = PageMapper.getNextPageId(parseInt(sessionStorage.getItem('current_index')) + 1);
                        sessionStorage.setItem('current_index', (parseInt(sessionStorage.getItem('current_index')) + 1));
                        window.location.href = PageMapper.getPageURL(screen_id);
                    }
                },
                error: (err) => {
                    console.log("ERROR in create nav  " + JSON.stringify(err));

                }
            })

            // window.location.href = "/four"
        } else {
            field_validate ? $("#validation_page_three").css("display", 'none') : $("#validation_page_three").css("display", 'block');
            setTimeout(function () {
                $("#validation_page_three").css("display", 'none');
            }, 4000);
        }
    }
    validate_agent_tcpa = () => {
        var validation_flag = true;
        console.log("tcp checkde value " + $("input[name='tcpa']:checked").val())
        if (sessionStorage.getItem('agent_present_flag') == '1') {
            if (!$("input[name='tcpa']:checked").val()) {
                validation_flag = false;
                $('.tcpa_validation').show()
                setTimeout(function () {
                    $(".tcpa_validation").hide();
                }, 4000);
            } else {
                $('.tcpa_validation').hide()
            }
        }
        console.log("validation flag tcpa >>" + validation_flag)
        return validation_flag;
    }

    validate_form = () => {
        var validation_flag = true;

        //FOR EMPTY FIELD VALIDATION & MAKE BOXES RED
        $('input[type=text]:visible:enabled').map(function () {
            if (this.id == 'page3_email') {
                var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (!re.test($('#page3_email').val())) {
                    validation_flag = false;
                    $(this).css('border', '2px solid red');
                } else {
                    $(this).css('border', '2px solid black');
                }
            } else {
                if (this.value != '') {
                    $(this).css('border', '2px solid black');
                } else {
                    console.log(this.id)
                    validation_flag = false;
                    $(this).css('border', '2px solid red');
                }
            }

        });

        var value = $('#page3_phonenumber').val().toString().trim().replace(/["'\-() ]/g, "");

        if (value.length != 10) {
            $('#page3_phonenumber').css('border', '2px solid red')
            console.log("2")
            validation_flag = false;
        }

        return validation_flag;
    }



    render() {
        const { agent_flag, render_page } = this.state;
        return (
            (render_page ?
                // <div>
                <GTM
                    gtm={{
                        id: sessionStorage.getItem('container_id')

                    }}
                    settings={{
                        sendPageView: true,     // default false
                        pageView: {             // default null
                            event: 'pageview',    // default
                            data: {},            // default

                            settings: {
                                locationProp: 'pathname', // default
                                sendAs: 'url',      // default
                            },
                        }
                    }}>
                    <Header display_menu={true} />
                    {agent_flag == 1 ? <AgentSection /> : null}
                    <div id="section1" className="col-md-12 section1_1 text-left section">
                        <div className="container mt2" style={{ color: "black" }}>
                            <div className="col-md-12 text-center fgsd14" id="302">
                            </div>
                            <div className="col-md-12 text-center mt1 mb2 agendabold42" id="303">
                            </div>
                            <div className="col-md-7 col-md-offset-3">
                                <ul className="nav nav-tabs user_tab " id="myTab">
                                    <div className="liner1"></div>
                                    <li className="active">
                                        <Link to="#home" data-toggle="tab" >
                                            <span className="round-tabs one agendabold42">
                                                1
                      </span>
                                        </Link>
                                        <div className="bottom_line"></div>
                                        <div className="text-center fgsd14 mt3 bottom_text" id="305"></div>
                                    </li>
                                    <li className="center_line"> <hr style={{ marginTop: "56%", borderTop: "2px solid #BBBBBB" }} /> </li>
                                    <li><Link to="#">
                                        <span className="round-tabs two agendabold42" id="602">
                                            2
                     </span>
                                    </Link>
                                        <div className="bottom_line"></div>
                                        <div className="text-center fgsd14 mt3 bottom_text" id="603">Your personal history</div>
                                    </li>
                                    <li className="center_line"> <hr style={{ marginTop: "56%", borderTop: "2px solid #BBBBBB" }} /> </li>
                                    <li><Link to="#" >
                                        <span className="round-tabs three agendabold42" id="702">
                                            3
                     </span> </Link>
                                        <div className="bottom_line"></div>
                                        <div className="text-center fgsd14 mt3 bottom_text" id="703">Your beneficiaries</div>
                                    </li>
                                    <li className="center_line"> <hr style={{ marginTop: "56%", borderTop: "2px solid #BBBBBB" }} /> </li>
                                    <li><Link to="#">
                                        <span className="round-tabs four agendabold42" id="1004">
                                            4
                         </span>
                                    </Link>
                                        <div className="bottom_line"></div>
                                        <div className="text-center fgsd14 mt3 bottom_text" id="1005">Sign & pay</div> </li>
                                </ul>
                            </div>
                            <div className="tab-content ">
                                <div className="tab-pane fade in active" id="home">
                                    <div className="col-md-8 col-md-offset-2 mt6 text-left" style={{ display: "block" }}>
                                        <div className="col-md-12 fgsd14 ">
                                            <div className="col-md-6 pd0">
                                                <div className="col-md-12" id="306"></div>
                                                <div className="col-md-12"><div className="form-group"><input id="page3_firstname" type="text" name="ifirstname" placeholder="" className="first-name" /></div></div>
                                            </div>
                                            <div className="col-md-6 pd0">
                                                <div className="col-md-12" id="307"></div>
                                                <div className="col-md-12"> <div className="form-group"> <input type="text" id="page3_lastname" name="ilastname" placeholder="" className="last-name" /> </div></div>
                                            </div>
                                        </div>
                                        <div className="col-md-12 fgsd14 ">
                                            <div className="col-md-6 pd0">
                                                <div className="col-md-12" id="308"></div>
                                                <div className="col-md-12"><div className="form-group"><input type="text" id="page3_phonenumber" name="page3_phonenumber" placeholder="" className="phone-no" maxLength="14" /> </div></div>
                                            </div>
                                            <div className="col-md-6 pd0">
                                                <div className="col-md-12" id="309"></div>
                                                <div className="col-md-12"> <div className="form-group"><input type="text" id="page3_email" name="page3_email" placeholder="" className="email-id" /> </div></div>
                                            </div>
                                        </div>
                                        <div className="col-md-12 text-center mb3">
                                            <button type="submit" id="310" className="btn cbtn_color mt4 page3_continue" tabIndex="0" onClick={this.submit_personal_data}></button>
                                        </div>
                                        <div className="col-md-12 col-xs-12 text-center" id="validation_page_three" style={{ display: 'none' }}>
                                            <span className="fgsd14" style={{ color: "red" }}>Please complete all required fields to continue.</span>
                                        </div>
                                        <div className="col-md-12 col-xs-12 text-center tcpa_validation" style={{ display: 'none' }}>
                                            <span className="fgsd14" style={{ color: "red" }}>Must input customer’s response to TCPA disclosure.</span>
                                        </div>

                                        <div className="col-md-12 mb3 mt1">
                                            <p className="fgsb14" style={{ lineHeight: '1.3' }} id="311"></p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <span id="ln_attempt_msg_button" style={{ textDecoration: "underline", cursor: "pointer" }} type="button" class="" data-toggle="modal" data-target="#ln_attempt_msg" hidden></span>
                            <div id="ln_attempt_msg" class="modal fade" role="dialog">
                                <div className="modal-dialog modal-lg">
                                    <div className="modal-content">
                                        <div className="modal-body text-center" style={{ padding: "15px !important" }}>
                                            <span style={{ fontSize: 40 }} className="glyphicon glyphicon-exclamation-sign" /><button type="button" className="close" style={{ position: "absolute", right: "20px", opacity: 1 }} data-dismiss="modal"><img src={close_model} alt="" style={{ width: "30px", height: "31px" }} /></button>
                                            <p className="fgsb20 mt5">Oops! Did you enter your details correctly? We were unable to verify your information. Please re-enter your details.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <IncomeShieldFour />

                    <GiveCall />
                    <TAC />
                    <Footer />
                </GTM >
                : null)
        )
    }

}

const PageThreeWithSocket = props => (
    <SocketContext.Consumer>
        {socket => <PageThree socket={socket} />}
    </SocketContext.Consumer>
)
export default PageThreeWithSocket