import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import cookie from 'react-cookies'
import Header from '../partials/header';
import moment from 'moment';
import $ from 'jquery';
import Promise from 'bluebird';
import AppStage from "../../config/app_stage.js"

import PageMapper from "../../config/page_mapper";

import GTM from 'react-tag-manager'

import zipcodes from 'zipcodes';
import Inputmask from "inputmask";
import AgentSection from '../agent/agent_section';
import CybersourceTest from '../payment/cybertest'
import ApiList from "../../config/base.json"
import dropdown from "../../config/dropdown.json"
import DropdownCall from "../../config/dropdown_api_request.js"
import ReactGA from 'react-ga';

import Footer from '../partials/footer'
import TopThreeSection from '../top_three_section/type_three';
import GiveCall from '../others/give_call'
import TAC from '../others/tandc'

import EventMapper from "../../config/handle_window_event";

import '../../css/user_info/info_section.css';
import '../../css/other/loader.css'

import { resolve } from 'url';
import ErrorMsg from "../../config/error_msgs";


const img_one = ApiList.base_cdn_src + "/images/SVG/down_arrow.svg";
const loder_img = ApiList.base_cdn_src + "/images/SVG/loader-blue.svg"
const loder_logo = ApiList.base_cdn_src + "/images/Icons/logo1.png"


// import '../../css/other/datepicker.css';
let user_data = JSON.parse(sessionStorage.getItem('user_data'))
let zipcode_flag = true;
let state_validation = true;
let zipcode_eligibility_flag;

var firstPassword;
var secondUserName;
var tokenGlobal;
var tokenGlobalAfficient;

export default class PageFour extends Component {
    constructor() {
        super();

        this.state = {
            selectedDate: cookie.load('dob'),
            current_page_index: sessionStorage.getItem('current_index'),
            agent_flag: sessionStorage.getItem('agent_present_flag') ? parseInt(sessionStorage.getItem('agent_present_flag')) : 0

        }
        this.onChange = this.onChange.bind(this);

        // this.onUnload = this.onUnload.bind(this); // if you need to bind callback to this
    }

    componentDidMount() {
        var self = this;
        var page_index = '3';
        this.setState({
            current_page_index: page_index
        })
        let app_user_data = sessionStorage.getItem('user_data') ? JSON.parse(sessionStorage.getItem('user_data')) : {};
        app_user_data.url = ApiList.current.ui_url + '/' + 'life-insurance-additional-questionaire';//current_page_url;
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

        console.log(JSON.stringify(datastring));
     
        //EventMapper.save_to_app_data(app_user_data)
        // let user_data = sessionStorage.getItem('user_data');

        // var aff2 = user_data ? user_data.aff2 : undefined;
        // if (aff2 == undefined) {
        //     sessionStorage.setItem('current_index', page_index);
        // }

        $(document).ready(function () {
            // commented for now
            // EventMapper.dropout_event('email_template_1', 'life-insurance-online-application');

            $('.how_it_works').css('display', 'none')
            $('.faq').css('display', 'none')
        });

        var visit_id = EventMapper.query('visitId');
        var afficiency_id = EventMapper.query('aff2');

        //CHECK FOR COMEBACK DATA
        // EventMapper.check_comeback(visit_id, afficiency_id)
        //     .then(function () {
        //         return EventMapper.get_journey_json();
        //     })

        EventMapper.validate_redirection(page_index)
            .then(function () {
                //GET USER_DATA IF FETCHED FROM RHASH API
                let user_data = JSON.parse(sessionStorage.getItem('user_data'))


                if (user_data.first_name == undefined || user_data.last_name == undefined || user_data.email == undefined || user_data.phone_number == undefined) {
                    window.location.href = "/"
                }

                if (sessionStorage.getItem('google_acc_id') != 'null') {
                    ReactGA.initialize(sessionStorage.getItem('google_acc_id'));
                    ReactGA.pageview(ApiList.current.ui_url + window.location.pathname);
                }

                //#############################################FOR FETCHING LABEL TEXT FROM JSON STARTS HERE#############################################
                var current_page_index = self.state.current_page_index;
                if (current_page_index) {
                    var data = PageMapper.getPageData(parseInt(current_page_index));
                    console.log(JSON.stringify(data))

                    for (var i = 0; i < data.design.Attribute.length; i++) {
                        if (data.design.Attribute[i].attributeID == 101) {

                        } else {
                            $('#' + data.design.Attribute[i].attributeID).text(data.design.Attribute[i].labelTxt)
                        }

                    }
                }
                //#############################################FOR FETCHING LABEL TEXT FROM JSON ENDS HERE#############################################
                $('#date-of-birth').focus();
                // $('input[name=replace_insurance]:value=' + user_data ? (user_data.replacement_flag ? user_data.replacement_flag : null) : null + ' ').attr('checked', true);
                // $('input[name=own_life_insurance]:value=' + user_data ? (user_data.existing_insurance ? user_data.existing_insurance : null) : null + ' ').attr('checked', true);

                $("input[name=own_life_insurance][value=" + (user_data ? (user_data.existing_insurance ? (user_data.existing_insurance == 1 ? 1 : 2) : null) : null) + "]").attr('checked', 'checked');
                if ((user_data ? (user_data.existing_insurance ? user_data.existing_insurance : null) : null) == 1) {
                    $('.replace_insurance_div').show();
                    $("input[name=replace_insurance][value=" + (user_data ? (user_data.replacement_flag == 1 ? 1 : 2) : null) + "]").attr('checked', 'checked');
                }

                $("#page4_homeaddress2").val(user_data ? (user_data.home_address ? user_data.home_address : null) : null)
                $("#page4_homeaddress1").val(user_data ? (user_data.apt_no ? user_data.apt_no : null) : null)

                $("#page4_zipcode").val(user_data ? (user_data.zipcode ? user_data.zipcode : null) : null)
                $('#date-of-birth').val(user_data ? (user_data.dob ? user_data.dob : null) : null)
                $("#page4_city").val(user_data ? (user_data.city ? user_data.city : null) : null)
                var dob = document.getElementById("date-of-birth");
                Inputmask({ mask: "99/99/9999", placeholder: "mm/dd/yyyy", clearIncomplete: true }).mask(dob);


                // ################### check lnflag ###########
                if (JSON.parse(sessionStorage.getItem('l_n_try_flag')) == 1) {
                    $('input').map(function () {
                        this.value = '';
                    })
                    DropdownCall.dropdown_req(dropdown.table_name.page4, dropdown.column_name.State, "page4_state", null, null, false)
                    DropdownCall.dropdown_req(dropdown.table_name.page4, dropdown.column_name.Gender, "page4_gender", null, null, false)
                } else {
                    // ############################## dropdown api #######################
                    DropdownCall.dropdown_req(dropdown.table_name.page4, dropdown.column_name.State, "page4_state", user_data ? (user_data.state ? user_data.state : null) : null, false)
                    DropdownCall.dropdown_req(dropdown.table_name.page4, dropdown.column_name.Gender, "page4_gender", user_data ? (user_data.gender ? user_data.gender : null) : null, false)
                    // ############################## dropdown api #######################

                }
                // ################### check lnflag ###########


            })
        // .then(function () {
        //     return EventMapper.validate_redirection(page_index)
        // })


        // ######################### VALIDATION FOR DOB STARTS HERE #########################
        $(document).on('blur', '#date-of-birth', function (e) {

            if (moment(this.value).isValid()) {
                var age = moment().diff(this.value, 'years')
                // console.log(age)
                if (age >= 20 && age <= 50) {
                    $("#div-age-validation").css('display', 'none');
                    $(this).css('border-color', 'black');
                    $("#validation_" + this.id).remove();
                } else {
                    // $(this).css('border-color', 'red');
                    $("#validation_" + this.id).remove();
                    $("#div-age-validation").css('display', 'block')
                }
            } else {
                $("#validation_" + this.id).is(":visible") ? $("#validation_" + this.id).remove() : null;

                if (this.value.length == 0) {
                    $(this).css('border-color', 'red');
                    $("#validation_" + this.id).is(":visible") ? null : $('<small id=validation_' + this.id + ' style="color: red">' + ErrorMsg.address[this.id] + '</small>').insertAfter("#" + this.id);
                } else {
                    $(this).css('border-color', 'red');
                    $("#validation_" + this.id).is(":visible") ? null : $('<small id=validation_' + this.id + ' style="color: red">Please enter proper value</small>').insertAfter("#" + this.id);
                }

            }
            // 
        });
        // ######################### VALIDATION FOR DOB STARTS HERE #########################

        // ######################### VALIDATION FOR ADDRESS STARTS HERE #########################
        $(document).on('keyup', '#page4_homeaddress1', function (e) {
            var code = e.keyCode || e.charCode
            if (this.value != "") {
                $("#validation_" + this.id).remove();
                $(this).css('border-color', 'black');
            } else {
                $(this).css('border-color', 'red');
                $("#validation_" + this.id).is(":visible") ? null : $('<small id=validation_' + this.id + ' style="color: red;">' + ErrorMsg.address[this.id] + '</small>').insertAfter("#" + this.id);
            }
        });

        $(document).on('blur', '#page4_homeaddress1', function (e) {
            var code = e.keyCode || e.charCode
            if (this.value != "" && this.value.length != 0) {
                $("#validation_" + this.id).remove();
                $(this).css('border-color', 'black');
            } else {
                $(this).css('border-color', 'red');
                $("#validation_" + this.id).is(":visible") ? null : $('<small id=validation_' + this.id + ' style="color: red;">' + ErrorMsg.address[this.id] + '</small>').insertAfter("#" + this.id);
            }
        });
        // ######################### VALIDATION FOR ADDRESS ENDS HERE #########################

        // ######################### VALIDATION FOR ZIPCODE STARTS HERE #########################
        $(document).on('blur', '.zipcode', function (e) {
            if (this.value != "" && this.value.length == 5) {
                $("#validation_" + this.id).remove();
                $(this).css('border-color', 'black');
            } else {
                $(this).css('border-color', 'red');
                $("#validation_" + this.id).is(":visible") ? null : $('<small id=validation_' + this.id + ' style="color: red;">This field is required</small>').insertAfter("#" + this.id);
            }
            var location = zipcodes.lookup($(".zipcode").val());
            console.log(JSON.stringify(location))
            if (location != null) {
                zipcode_flag = true
                $('#div-zip-validation').css('display', 'none');
                self.state_eligibility(location)
                    .then(function () {
                        //AGENT CHECK -- IF HE"S VALID FOR THAT PARTICULAR STATE
                        if (sessionStorage.getItem('agent_present_flag') == '1') {
                            return self.check_agent_state_validity(location);
                        }
                    });


            } else {
                zipcode_flag = false
                $('#div-zip-validation').css('display', 'block');
            }
        });

        $(document).on('keyup', '.zipcode', function (e) {
            var code = e.keyCode || e.charCode
            if ((code >= 48 && code <= 57) || code == 8 || code == 9) {
                if (this.value != "" && (this.value.length >= 1 && this.value.length <= 5)) {
                    $(this).css('border-color', 'black');
                    $("#validation_" + this.id).remove();
                }
            } else {
                e.preventDefault();
            }
        })
        $(document).on('keyup', '.zipcode', function (e) {
            var code = e.keyCode || e.charCode

            if ((code >= 48 && code <= 57) || code == 8 || code == 9) {
                if (this.value != "" && (this.value.length >= 1 && this.value.length <= 5)) {
                    $("#validation_" + this.id).remove();
                    $(this).css('border-color', 'black');
                }
                // else {
                //     $(this).css('border-color', 'red');

                //     if (this.value.length < 5) {
                //         $("#validation_" + this.id).is(":visible") ? null : $('<small id=validation_' + this.id + ' style="color: red;">Please enter proper zipcode</small>').insertAfter("#" + this.id);
                //     } else {
                //         $("#validation_" + this.id).is(":visible") ? null : $('<small id=validation_' + this.id + ' style="color: red;">This field is required</small>').insertAfter("#" + this.id);
                //     }
                // }
            } else {
                e.preventDefault();
            }
        });
        // ######################### VALIDATION FOR ZIPCODE ENDS HERE #########################

        // ######################### VALIDATION FOR CITY ENDS HERE #########################
        $(document).on('keyup', '#page4_city', function (e) {
            var code = e.keyCode || e.charCode
            if (this.value != "") {
                $("#validation_" + this.id).remove();
                $(this).css('border-color', 'black');
            } else {
                $(this).css('border-color', 'red');
                $("#validation_" + this.id).is(":visible") ? null : $('<small id=validation_' + this.id + ' style="color: red;">' + ErrorMsg.address[this.id] + '</small>').insertAfter("#" + this.id);
            }
        });

        $(document).on('blur', '#page4_city', function (e) {
            var code = e.keyCode || e.charCode
            if (this.value != "" && this.value.length != 0) {
                $("#validation_" + this.id).remove();
                $(this).css('border-color', 'black');
            } else {
                $(this).css('border-color', 'red');
                $("#validation_" + this.id).is(":visible") ? null : $('<small id=validation_' + this.id + ' style="color: red;">' + ErrorMsg.address[this.id] + '</small>').insertAfter("#" + this.id);
            }
        });
        // ######################### VALIDATION FOR CITY ENDS HERE #########################
        // ############################### VALIDATION FOR STATE ################################
        $(document).on('change', '#page4_state', function () {
            let user_data = JSON.parse(sessionStorage.getItem('user_data'))
            if (this.value != user_data.state) {
                state_validation = false;
                $('#state_change').show();
            } else {
                $('#state_change').hide();
                state_validation = true;
            }
        })
        // ############################### VALIDATION FOR STATE ################################
        $(document).on('change', '.radio', function () {
            $(this).siblings('label').hasClass('radio_incomplete') ? $(this).closest('.radio__container').find('label').removeClass('radio_incomplete') : null;

            if (this.name == 'own_life_insurance')
                $('#validation_own_life_insurance_div').css('display', 'none');

            if (this.name == 'replace_insurance')
                $('#validation_replace_insurance_div').css('display', 'none');
        });

        // ############################## save api #######################################
        $(document).on('click', '.page_four_next_button', function () {

            if ($('input[name=replace_insurance]:checked').val() == 1) {
                self.update_four(0, 1);


                // } else if (zipcode_eligibility_flag != false) {
                //     user_data.replacement_flag = 0;
                //     sessionStorage.setItem('user_data', JSON.stringify(user_data))
            } else if (zipcode_flag) {
                if (self.validate_form()) {
                    $('.spinner').css('display', 'block')
                    $("#validation_page_four").css("display", 'none');
                    // *************** save data to cookies ********************
                    user_data.replacement_flag = 0;
                    user_data.home_address = $("#page4_homeaddress2").val(),
                        user_data.apt_no = $("#page4_homeaddress1").val()
                    user_data.city = $("#page4_city").val()
                    user_data.state = $("#page4_state option:selected").val()
                    user_data.gender = $("#page4_gender option:selected").val()
                    user_data.zipcode = $("#page4_zipcode").val()
                    user_data.dob = $('#date-of-birth').val()

                    delete user_data['redirection_url'];

                    sessionStorage.setItem('user_data', JSON.stringify(user_data))
                    // ########################### quote save #########################


                    let datastring = {
                        "application":
                        {
                            "application_visit_id": cookie.load('visit_id'),
                            "afficiency_id": user_data.aff1,
                            "first_name": cookie.load('page3_firstname'),
                            "last_name": cookie.load('page3_lastname'),
                            "email": user_data.email,
                            "phone": cookie.load('page3_phonenumber'),
                            "age": $('#date-of-birth').val(),
                            "application_gender": $("#page4_gender option:selected").val(),
                            "addr1_street": $("#page4_homeaddress1").val(),
                            "addr1_apt_no": $("#page4_homeaddress2").val(),
                            "addr1_city": $("#page4_city").val(),
                            "addr1_state": $("#page4_state option:selected").val(),
                            "addr1_zip": $("#page4_zipcode").val(),
                            "replacement_flag": user_data.replacement_flag,
                            "id_verif_outcome": 2,
                            "existing_insurance_flag": $('input[name=own_life_insurance]:checked').val() == 1 ? 1 : 0,
                            "app_stage_completed": "2",
                            "final_income_need_coverage": user_data.select_monthly_income_benifit,
                            "lump_sum_rider_flg": user_data.rider_id == 100000 ? 1 : 0,
                            "final_lump_sum_coverage": user_data.select_add_on_one_time_payment,
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
                        datastring.application['agent_id'] = sessionStorage.getItem('agent_id');
                        datastring.application['agent_assisted_flag'] = 1;
                        datastring.application['agent_entry_screen'] = 4;
                        datastring.application['tcpa'] = user_data.tcpa_flag;
                    }


                    // CALL LN, IDENTITY THEN FETCH FOR EXISTING DATA API
                    var _l_n_call = self.l_n_call;
                    var _identity_api_call = self.identity_api_call;
                    var _update_aff_id = self.update_aff_id;
                    var _check_l_n_try = self.check_l_n_try;
                    var _check_existing_data = self.check_existing_data;

                    _l_n_call(datastring)
                        .then(function (ssn) {
                            user_data.ssn = ssn;  //data.ssn;  //666164847
                            sessionStorage.setItem('user_data', JSON.stringify(user_data))

                            let datastringIdentity = {
                                "firstName": cookie.load('page3_firstname'),
                                "lastName": cookie.load('page3_lastname'),
                                "addressLine1": $("#page4_homeaddress1").val(),
                                "addressLine2": $("#page4_homeaddress2").val(),
                                "zip": $("#page4_zipcode").val(),
                                "city": $("#page4_city").val(),
                                "state": $("#page4_state option:selected").val(),
                                "gender": user_data.gender,
                                "ssn": ssn ? ssn : "",         //data.ssn,  //data.ssn,  //data.ssn,  666168498
                                "dob": $('#date-of-birth').val(),
                                "afficiencyId": user_data.aff1,
                                "visitorId": user_data.visitor_id,
                                "peJourneyId": sessionStorage.getItem('pe_journey_id') ? sessionStorage.getItem('pe_journey_id') : '',
                                "emailId": user_data.email,
                                "phone": cookie.load('page3_phonenumber'),
                            }


                            return _identity_api_call(datastringIdentity);
                        })
                        .then(function (aff2) {
                            return _update_aff_id(aff2);
                        })
                        .then(function (arc_id) {
                            return _check_l_n_try(arc_id);
                        })
                        .then(function (arc_id) {
                            // console.log("inside ")
                            return _check_existing_data(arc_id);
                        })
                } else {
                    $("#validation_page_four").css("display", 'block');
                    setTimeout(function () {
                        $("#validation_page_four").css("display", 'none');
                    }, 4000);
                }
                //     }
                // } else {
                //     // alert("eligibility")
                //     AppStage.save_app_stage(cookie.load('visit_id'), 4)
                //     user_data.failure_code = 1;
                //     sessionStorage.setItem('user_data', JSON.stringify(user_data))
                //     window.location.href = "/life-insurance-application-call-now"
            }
        })
        // ############################## save api #######################################
        // ******************************* show hide on checkbox *****************
        $(document).on('change', 'input[name=own_life_insurance]', function () {
            if ($(this).val() == 1) {
                $('.replace_insurance_div').show();
                user_data.existing_insurance = 1;
                sessionStorage.setItem('user_data', JSON.stringify(user_data))
            } else {
                user_data.existing_insurance = 0;
                sessionStorage.setItem('user_data', JSON.stringify(user_data))
                $('.replace_insurance_div').hide();
            }
        })

        // ******************************* show hide on checkbox *****************
    }

    l_n_call = (datastring) => {
        var self = this
        return new Promise(function (resolve, reject) {
            // LN ERROR ATM

            console.log(ApiList.current.base_api_url + ApiList.page_four.app_create + "-- app -- create" + JSON.stringify(datastring))
            $.ajax({
                url: ApiList.current.base_api_url + ApiList.page_four.app_create,
                type: 'POST',
                data: JSON.stringify(datastring),
                headers: {
                    'Authorization': 'Bearer ' + tokenGlobal,
                    'Content-Type': 'application/json'
                },
                success: (data) => {
                    console.log("applicatio res data :" + JSON.stringify(data));
                    // data.ssn = null;
                    if (data.ssn != null && data.ssn != 0) {

                        self.update_four(1, 0);
                        resolve(data.ssn);
                        //  LN ERROR ATM
                    } else {
                        self.update_four(0, 0);
                        resolve(null);


                    }
                },
                error: (err) => {
                    console.log("ERROR in save four application create " + JSON.stringify(err));
                    reject();
                }
            })
        });
    }

    check_l_n_try = (arc_id) => {
        var self = this
        return new Promise(function (resolve, reject) {
            let user_data = JSON.parse(sessionStorage.getItem('user_data'))
            if (user_data.ssn == '' || user_data.ssn == null) {
                let l_n_try_flag = JSON.parse(sessionStorage.getItem('l_n_try_flag')) ? JSON.parse(sessionStorage.getItem('l_n_try_flag')) : 0;
                if (l_n_try_flag == 1) {
                    AppStage.save_app_stage(cookie.load('visit_id'), 4)
                    let user_data = JSON.parse(sessionStorage.getItem('user_data'))
                    user_data.failure_code = 5;
                    sessionStorage.setItem('user_data', JSON.stringify(user_data))
                    window.location.href = "/life-insurance-application-call-now"
                }
                else {
                    sessionStorage.setItem('l_n_try_flag', 1)
                    var screen_id = PageMapper.getNextPageId(parseInt(self.state.current_page_index) - 1);
                    sessionStorage.setItem('current_index', (parseInt(self.state.current_page_index) - 1));
                    window.location.href = PageMapper.getPageURL(screen_id);

                }
                reject()
            } else {
                resolve(arc_id)

            }
        });
    }

    check_agent_state_validity = (location_obj) => {
        return new Promise(function (resolve, reject) {
            var body_data = {
                "agent_data": {
                    "agent_id": sessionStorage.getItem('agent_id'),
                    "state": location_obj.state
                }
            };

            // alert(ApiList.current.base_api_url + '/agentelegibility/check')
            $.ajax({
                url: ApiList.current.base_api_url + ApiList.agent.agent_eligible,
                type: 'POST',
                data: JSON.stringify(body_data),
                headers: {
                    'Authorization': 'Bearer ' + tokenGlobal,
                    'Content-Type': 'application/json'
                },
                success: (data) => {
                    if (data.statusCode == 406) {
                        zipcode_flag = false
                        $('#div-agent-state-eligibility').css('display', 'block');
                    } else {
                        zipcode_flag = true;
                        $('#div-agent-state-eligibility').css('display', 'none');
                    }
                },
                error: (err) => {
                    console.log("ERROR in state elibility  " + JSON.stringify(err));
                    reject();
                }
            })
        });
    }

    identity_api_call = (datastringIdentity) => {
        var self = this;
        return new Promise(function (resolve, reject) {
            console.log(ApiList.current.base_identiy_api_url + ApiList.page_four.IdentityAPI + " --- Identitty api --- " + JSON.stringify(datastringIdentity))
            $.ajax({
                url: ApiList.current.base_identiy_api_url + ApiList.page_four.IdentityAPI,
                type: 'POST',
                data: JSON.stringify(datastringIdentity),
                headers: {
                    'Content-Type': "application/json"
                },
                success: (data) => {
                    console.log("aff2 >>res " + JSON.stringify(data))

                    let user_data = JSON.parse(sessionStorage.getItem('user_data'))
                    user_data.aff2 = data.afficiency_id;
                    sessionStorage.setItem('user_data', JSON.stringify(user_data))
                    cookie.save('aff2', data.afficiency_id, { path: '/', maxAge: 365 * 86400 })
                    resolve(data.afficiency_id);

                },
                error: (err) => {
                    console.log("ERROR in identity aff2  " + JSON.stringify(err));
                    reject();
                }
            })
        });
    }

    update_aff_id = (aff2_id) => {
        var self = this;
        return new Promise(function (resolve, reject) {
            let datastring = {
                "application": {
                    "visit_id": cookie.load('visit_id'),
                    "afficiency_id": aff2_id,
                    "agent_flag": sessionStorage.getItem('agent_present_flag') ? sessionStorage.getItem('agent_present_flag') : 0
                }
            }
            if (sessionStorage.getItem('agent_present_flag')) {
                datastring.application['agent_id'] = sessionStorage.getItem('agent_id');
                datastring.application['agent_assisted_flag'] = 1;
                datastring.application['agent_entry_screen'] = 4
            }
            console.log(ApiList.current.base_api_url + ApiList.page_four.update_aff_id + "-- upadte aff id --" + JSON.stringify(datastring))
            $.ajax({
                url: ApiList.current.base_api_url + ApiList.page_four.update_aff_id,
                type: 'POST',
                data: JSON.stringify(datastring),
                headers: {
                    'Authorization': 'Bearer ' + tokenGlobal,
                    'Content-Type': 'application/json'
                },
                success: (data) => {
                    console.log(JSON.stringify(data))
                    if (data.statusCode == 200) {
                        resolve(aff2_id);
                        // var screen_id = PageMapper.getNextPageId(parseInt(self.state.current_page_index) + 1);
                        // sessionStorage.setItem('current_index', (parseInt(self.state.current_page_index) + 1));
                        // window.location.href = PageMapper.getPageURL(screen_id);
                    }
                },
                error: (err) => {
                    console.log("ERROR in application/updateAfficiencyId  " + JSON.stringify(err));
                    reject();
                }
            })
        });
    }

    update_four = (flag, check) => {

        let update_datastring = {
            "visit": {
                "visit_id": cookie.load('visit_id'),
                "id_verif_outcome": flag,
                "existing_insurance_flag": $('input[name=own_life_insurance]:checked').val() == 1 ? 1 : 0,
                "replacement_flag": $('input[name=replace_insurance]:checked').val() == 1 ? 1 : 0
            }
        }

        console.log(ApiList.current.base_api_url + ApiList.page_four.update_four + "upadate_four " + JSON.stringify(update_datastring))
        $.ajax({
            url: ApiList.current.base_api_url + ApiList.page_four.update_four,
            type: 'POST',
            data: JSON.stringify(update_datastring),
            headers: {
                'Authorization': 'Bearer ' + tokenGlobal,
                'Content-Type': 'application/json'
            },
            success: (data) => {
                console.log("Upadate page four" + JSON.stringify(data))
                if (check == 1) {
                    AppStage.save_app_stage(cookie.load('visit_id'), 4)
                    let user_data = JSON.parse(sessionStorage.getItem('user_data'))
                    user_data.replacement_flag = 1;
                    user_data.failure_code = 1;
                    sessionStorage.setItem('user_data', JSON.stringify(user_data))
                    window.location.href = "/life-insurance-application-call-now"
                }
            },
            error: (err) => {
                console.log("ERROR in update four " + JSON.stringify(err));

            }
        })
    }

    check_existing_data = (arc_id) => {
        var self = this;
        return new Promise(function (resolve, reject) {
            let datastring = {
                "user_data": {
                    "visit_id": cookie.load('visit_id'),
                    "afficiency_id": arc_id,
                    "agent_flag": 2
                }
            }
            console.log(ApiList.current.base_api_url + ApiList.comeback_data + "---- check _exicitin data datastring -- " + JSON.stringify(datastring))
            $.ajax({
                url: ApiList.current.base_api_url + ApiList.comeback_data,
                type: 'POST',
                data: JSON.stringify(datastring),
                headers: {
                    'Authorization': 'Bearer ' + tokenGlobal,
                    'Content-Type': 'application/json'
                },
                success: (data) => {
                    // alert(JSON.stringify(data))
                    console.log("p4 chk_existing_data res >>" + JSON.stringify(data));
                    //                     100  -  continue current application D
                    // 200  -  successful D
                    // 301  -  policy exists with full coverage D

                    // 302  -  please try after in 90 days

                    // 303  -  Existing application is expired D
                    // 400  -  bad request
                    // 401  -  app data is not present
                    // 402  -  app data decryption failed
                    // 406  -  out_visitID id is null

                    if (data.statusCode == 100) {
                        //     100  -  continue current application D
                        var screen_id = PageMapper.getNextPageId(parseInt(sessionStorage.getItem('current_index')) + 1);
                        sessionStorage.setItem('current_index', (parseInt(sessionStorage.getItem('current_index')) + 1));
                        window.location.href = PageMapper.getPageURL(screen_id);
                        resolve()
                    } else if (data.statusCode == 200) {
                        // 200  -  successful  GOT DATA
                        var user_json = JSON.parse(data.data)
                        sessionStorage.setItem('user_data', JSON.stringify(user_json));
                        sessionStorage.setItem('distributor_id', user_json.distributor_id);
                        sessionStorage.setItem('pe_journey_id', user_json.pe_journey_id);
                        sessionStorage.setItem('current_index', user_json.current_index);

                        self.get_journey_json();

                        resolve();
                    } else if (data.statusCode == 301) {
                        // 301  -  policy exists with full coverage D
                        user_data.failure_code = 8;
                        sessionStorage.setItem('user_data', JSON.stringify(user_data))
                        window.location.href = "/life-insurance-application-call-now"
                    } else if (data.statusCode == 302) {
                        // 302  -  please try after in 90 days
                        user_data.failure_code = 8;
                        sessionStorage.setItem('user_data', JSON.stringify(user_data))
                        window.location.href = "/life-insurance-application-call-now"
                    } else if (data.statusCode == 303) {
                        // Existing application is expired D
                        user_data.failure_code = 10;
                        sessionStorage.setItem('user_data', JSON.stringify(user_data))
                        window.location.href = "/life-insurance-application-call-now"
                    } else if (data.statusCode == 400 || data.statusCode == 401 || data.statusCode == 402 || data.statusCode == 406) {
                        // SYSTEM UNAVAILABLE
                        user_data.failure_code = 3;
                        sessionStorage.setItem('user_data', JSON.stringify(user_data))
                        window.location.href = "/life-insurance-application-call-now"
                    }


                    // if (data.statusCode == 200) {
                    //     // APP DATA RECEIVED, THROW TO THAT PAGE |||| 200 - successful


                    //     resolve();
                    //     // self.setjourneydata();
                    // } else if (data.statusCode == 303) {
                    //     // 201  -  This application is expired, please start a new application
                    //     user_data.failure_code = 10;
                    //     sessionStorage.setItem('user_data', JSON.stringify(user_data))
                    //     window.location.href = "/life-insurance-application-call-now"
                    // } else if (data.statusCode == 301) {
                    //     // 202  -  policy exists with full coverage
                    //     user_data.failure_code = 8;
                    //     sessionStorage.setItem('user_data', JSON.stringify(user_data))
                    //     window.location.href = "/life-insurance-application-call-now"
                    // } else if (data.statusCode == 100) {
                    //     // 401  -  app data is not present continue with current application
                    //     resolve();

                    //     var screen_id = PageMapper.getNextPageId(parseInt(self.state.current_page_index) + 1);
                    //     sessionStorage.setItem('current_index', (parseInt(self.state.current_page_index) + 1));
                    //     window.location.href = PageMapper.getPageURL(screen_id);
                    // } else if (data.statusCode == 402 || data.statusCode == 400 || data.statusCode == 401 || data.statusCode == 406) {
                    //     // 402  -  app data decryption failed    &&    400  -  bad request &&    406  -  out_visitID id is null
                    //     user_data.failure_code = 3;
                    //     sessionStorage.setItem('user_data', JSON.stringify(user_data))
                    //     window.location.href = "/life-insurance-application-call-now"
                    // }
                },
                error: (err) => {
                    console.log("ERROR in update_six " + JSON.stringify(err));
                    reject();
                }
            })
        });
    }

    onChange(date) {
        this.setState({
            selectedDate: moment(date).format("YYYY-MM-DD")
        });
    }

    get_journey_json = () => {
        user_data = sessionStorage.getItem('user_data') ? JSON.parse(sessionStorage.getItem('user_data')) : {};
        var datastring = {
            "pe_path_selection": {
                "distributor_id": sessionStorage.getItem('distributor_id') ? parseInt(sessionStorage.getItem('distributor_id')) : null
            }
        };

        var journey_json = null;
        $.ajax({
            url: ApiList.current.base_afficient_api_url + ApiList.journey_api,
            type: 'POST',
            data: JSON.stringify(datastring),
            headers: {
                'Authorization': 'Bearer ' + tokenGlobalAfficient,
                'Content-Type': 'application/json'
            },
            success: (data) => {

                journey_json = data.xml_doc ? JSON.parse(data.xml_doc) : null;
                console.log("SAVE API::" + JSON.stringify(data))
                if (journey_json != null) {
                    var journey_screen = journey_json.journey.screen;
                    if (journey_screen.length > 0) {

                        sessionStorage.setItem('journey_data', JSON.stringify(journey_json));
                        sessionStorage.setItem('screen_length', journey_screen.length);
                    }
                }
            },
            error: (err) => {
                console.log("ERROR in quote " + JSON.stringify(err));
            }
        });
    }

    state_eligibility = (location) => {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: ApiList.current.base_afficient_api_url + ApiList.state_eligible,
                type: 'POST',
                data: JSON.stringify({
                    "state_eligibility": {
                        "product_id": "100001",
                        "state_code": location.state
                    }
                }),
                headers: {
                    'Authorization': 'Bearer ' + tokenGlobalAfficient,
                    'Content-Type': 'application/json'
                },
                success: (data) => {
                    console.log(JSON.stringify(data))
                    if (data.eligibility_flag == 1) {
                        user_data.city = location.city
                        user_data.country = location.country
                        user_data.state = location.state
                        $("#page4_city").val(location.city)
                        DropdownCall.dropdown_req(dropdown.table_name.page4, dropdown.column_name.State, "page4_state", location.state, false)
                        sessionStorage.setItem('user_data', JSON.stringify(user_data))
                        $('#div-zip-eligibility').css('display', 'none');

                        zipcode_eligibility_flag = true
                        resolve();
                    } else {
                        $("#page4_city").val(location.city)
                        DropdownCall.dropdown_req(dropdown.table_name.page4, dropdown.column_name.State, "page4_state", location.state, false)
                        zipcode_eligibility_flag = false
                        $('#div-zip-eligibility').css('display', 'block');

                        resolve();
                    }

                },
                error: (err) => {
                    console.log("ERROR in state elibility  " + JSON.stringify(err));
                    reject();
                }
            })
        });
    }
    validate_form = () => {
        var validation_flag = true;

        //FOR EMPTY FIELD VALIDATION & MAKE BOXES RED
        $('input[type=text]:visible:enabled').map(function () {
            if (this.id == 'page4_homeaddress2') { } else {
                if (this.value != '') {
                    $(this).css('border', '2px solid black');
                } else {
                    validation_flag = false;
                    $(this).css('border', '2px solid red');
                }
            }
        });

        if ($('input[name = "own_life_insurance"]').is(':checked')) {
            $('input[name = "own_life_insurance"]').siblings('.radio__label').removeClass('radio_incomplete');
            $('#validation_own_life_insurance_div').css('display', 'none');
        } else {
            validation_flag = false;
            $('input[name = "own_life_insurance"]').siblings('.radio__label').addClass('radio_incomplete');
            $('#validation_own_life_insurance_div').css('display', 'block');
        }

        if ($('input[name = "replace_insurance"]').is(':visible')) {
            if ($('input[name = "replace_insurance"]').is(':checked')) {
                $('input[name = "replace_insurance"]').siblings('.radio__label').removeClass('radio_incomplete');
                $('#validation_replace_insurance_div').css('display', 'none');
            } else {
                validation_flag = false;
                $('input[name = "replace_insurance"]').siblings('.radio__label').addClass('radio_incomplete');
                $('#validation_replace_insurance_div').css('display', 'block');
            }
        }

        // $('input[type=radio]:visible').map(function () {
        //     alert()
        //     if ($("input[name = " + this.name + "]").is(':checked')) {
        //         $(this).siblings('.radio__label').removeClass('radio_incomplete');
        //     } else {
        //         $(this).siblings('.radio__label').addClass('radio_incomplete');
        //         validation_flag = false;
        //     }
        // });

        if (!$('#page4_zipcode').val()) {
            validation_flag = false;
        }

        if ($('#page4_zipcode').val().length < 5) {
            validation_flag = false;
        }

        if (zipcode_eligibility_flag == false) {
            validation_flag = false;
        }

        if (!moment($('#date-of-birth').val()).isValid()) {
            validation_flag = false;
        }

        // if (zipcode_flag == false) {
        //     validation_flag = false;
        // }
        if (state_validation == false) {
            validation_flag = false;
        }
        if (!$('#page4_homeaddress1').val()) {
            validation_flag = false;
        }

        return validation_flag;
    }
    previous_button_four = () => {
        var screen_id = PageMapper.getNextPageId(parseInt(this.state.current_page_index) - 1);
        sessionStorage.setItem('current_index', (parseInt(this.state.current_page_index) - 1));
        window.location.href = PageMapper.getPageURL(screen_id);
    }


    render() {
        const { agent_flag } = this.state;
        return (
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
                {/* loader */}
                <div className="spinner" style={{ display: "none" }}>
                    {/* <div className="blob blob-0"></div> */}

                    <img id="loading" src={loder_img} />
                    <img className="loader_logo" src={loder_logo} />
                </div>
                {/* loader */}
                {/* ANIMATION POPUP START   */}
                <div className="col-xs-11 col-sm-4 alert alert-info alert-with-icon sweet-container-custom animated fadeInDown" style={{ display: "none", width: "max-content", position: "absolute" }} role="alert" data-notify-position="top-center">
                    <button type="button" aria-hidden="true" className="close sweet-dismiss-custom">x</button><i data-notify="icon" class="material-icons fa fa-bell-o"></i> <span class="sweet-message"> Saving your changes, please wait ... </span>
                    <Link to="#" target="_blank" data-notify="url"></Link>
                </div>
                {/* ANIMATION POPUP END */}

                < Header display_menu={false} />
                {agent_flag == 1 ? <AgentSection token={tokenGlobal} tokenA={tokenGlobalAfficient} /> : null}
                <div id="section1" className="col-md-12 section1_1 text-left section">
                    <div className="container mt2" style={{ color: "black" }}>

                        <div className="col-md-12 text-center fgsd14" id="402">

                        </div>
                        <div className="col-md-12 text-center mt1 mb2 agendabold42" id="403">

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
                                    <div className="text-center fgsd14 mt3 bottom_text" id="305">About you</div>
                                </li>
                                <li className="center_line"> <hr style={{ marginTop: "56%", borderTop: "2px solid #BBBBBB" }} /> </li>
                                <li><Link to="#" >
                                    <span className="round-tabs two agendabold42" id="602">
                                        2
                     </span>
                                </Link>
                                    <div className="bottom_line"></div>
                                    <div className="text-center fgsd14 mt3 bottom_text" id="603">Your personal history</div>
                                </li>
                                <li className="center_line"> <hr style={{ marginTop: "56%", borderTop: "2px solid #BBBBBB" }} /> </li>
                                <li><Link to="#">
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

                                <div className="col-md-10 col-md-offset-1 mb3 mt3 text-left" style={{ display: "block", marginTop: "10%" }}>

                                    <div className="col-md-12 pd0">
                                        <div className="col-md-4 fgsd14">
                                            <ul className="list-unstyled">
                                                <li className="fgsd14" id="406"></li>
                                                <li className="mt2"> <div className="form-group">
                                                    <input type="text" id="date-of-birth" name="date-of-birth" />

                                                </div></li>
                                            </ul>
                                        </div>

                                        <div className="col-md-4 fgsd14">
                                            <ul className="list-unstyled">
                                                <li className="fgsd14"><div for="" id="407"></div></li>
                                                <li className="mt2"><div className="form-group">  <div className="rail-select">
                                                    <div className="select-side">
                                                        <img src={img_one} alt="" />
                                                    </div>
                                                    <select className="form-control" id="page4_gender">
                                                        {/* <option value="M">Male</option>
                                                        <option value="F">Female</option> */}
                                                    </select>
                                                </div></div> </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="col-md-12 pd0">
                                        <div className="col-md-4 fgsd14">
                                            <ul className="list-unstyled">
                                                <li className="fgsd14"><div for="" id="408"></div></li>
                                                <li className="mt2"><div className="form-group"> <input type="text" id="page4_homeaddress1" name="page4_homeaddress1" placeholder="" /> </div> </li>
                                            </ul>
                                        </div>

                                        <div className="col-md-4 fgsd14">
                                            <ul className="list-unstyled">
                                                <li className="fgsd14"><div for="" id="409"></div></li>
                                                <li className="mt2"><div className="form-group"> <input type="text" id="page4_homeaddress2" name="page4_homeaddress2" placeholder="" /> </div> </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-md-12 pd0">
                                        <div className="col-md-4 fgsd14">
                                            <ul className="list-unstyled">
                                                <li for="" id="410"></li>
                                                <li className="mt2"><div className="form-group"> <input type="text" id="page4_city" name="city" placeholder="" disabled />  </div></li> </ul></div>
                                        <div className="col-md-4 fgsd14">
                                            <ul className="list-unstyled">
                                                <li for="" id="411"></li>
                                                <li className="mt2"><div className="form-group">  <div className="rail-select">
                                                    <div className="select-side">
                                                        <img src={img_one} alt="" />
                                                    </div>
                                                    <select className="form-control" id="page4_state" disabled>
                                                        {/* <option value="1">some state</option>
                                                            <option value="2">other state</option> */}
                                                    </select>
                                                </div></div></li>
                                            </ul>
                                        </div>
                                        <div className="col-md-4 fgsd14">
                                            <ul className="list-unstyled">
                                                <li for="" id="412"></li>
                                                <li className="mt2"><div className="form-group"> <input type="text" id="page4_zipcode" name="page4_zipcode" className="zipcode" placeholder="" maxLength="5" /> </div>  </li>
                                            </ul></div>



                                    </div>

                                    <div className="col-md-12 pd0 mt1 radio__container" >
                                        <p className="fgsb18 col-md-8 mb0" id="413"></p>
                                        <div className="col-md-12">
                                            <div className="radio-inline fgsd18">
                                                <input className="radio" id="awesome-item-1a" name="own_life_insurance" type="radio" value="1" style={{ height: '35px !important' }} />
                                                <label style={{ fontWeight: "unset" }} className="radio__label" for="awesome-item-1a" id="414"></label>
                                            </div>
                                            <div className="radio-inline fgsd18">
                                                <input className="radio" id="awesome-itema" name="own_life_insurance" type="radio" value="2" />
                                                <label style={{ fontWeight: "unset" }} className="radio__label" for="awesome-itema" id="415"></label>
                                            </div>
                                        </div>
                                        <div className="col-md-12" id="validation_own_life_insurance_div" style={{ display: 'none' }}>
                                            <small style={{ color: 'red', fontWeight: 'bold' }}>{ErrorMsg.address['answer']}</small>
                                        </div>
                                    </div>

                                    <div className="col-md-12 pd0  radio__container replace_insurance_div" >
                                        <p className="fgsb18 col-md-8 mb0" id="416">Do you plan to replace, cancel or change any existing life insurance or annuity in connection with the application?</p>
                                        <div className="col-md-12">
                                            <div className="radio-inline fgsd18">
                                                <input className="radio" id="awesome-item-1" name="replace_insurance" type="radio" value="1" />
                                                <label style={{ fontWeight: "unset" }} className="radio__label" for="awesome-item-1" id="417">YES</label>
                                            </div>
                                            <div className="radio-inline fgsd18">
                                                <input className="radio" id="awesome-item" name="replace_insurance" type="radio" value="2" />
                                                <label style={{ fontWeight: "unset" }} className="radio__label" for="awesome-item" id="418">NO</label>
                                            </div>
                                        </div>
                                        <div className="col-md-12" id="validation_replace_insurance_div" style={{ display: 'none' }}>
                                            <small style={{ color: 'red', fontWeight: 'bold' }}>{ErrorMsg.address['answer']}</small>
                                        </div>
                                    </div>
                                    <div className="col-md-12 text-center mb3">
                                        <button className="btn cbtn page4_button tt" onClick={this.previous_button_four} id="419">PREVIOUS</button>&nbsp;&nbsp;&nbsp;&nbsp;
                                            <button className="btn cbtn_color page4_button page4_next page_four_next_button tt" id="info_form2_btn" id="420">NEXT</button>
                                    </div>
                                    <div className="col-md-12 col-xs-12 mb3 text-center" id="div-age-validation" style={{ display: 'none' }}>
                                        <span className="glyphicon glyphicon-exclamation-sign" style={{ color: "red" }}><span className="ml2 fgsd14" style={{ color: "red" }}>WE'RE SORRY SALARY SHIELD IS NOT AVAILABLE AT THIS AGE</span></span>
                                    </div>

                                    <div className="col-md-12 col-xs-12 text-center" id="validation_page_four" style={{ display: 'none' }}>
                                        <span className="fgsd14" style={{ color: "red" }}>Please complete all required fields to continue.</span>
                                    </div>
                                    <div className="col-md-12 col-xs-12 text-center" id="div-zip-validation" style={{ display: 'none' }}>
                                        <span className="fgsd14" style={{ color: "red" }}>Please fill proper zipcode</span>
                                    </div>

                                    <div className="col-md-12 col-xs-12 mt2 text-center" id="div-zip-eligibility" style={{ display: 'none' }}>
                                        <span className="glyphicon glyphicon-exclamation-sign" style={{ color: "red" }} />
                                        <span className="fgsd14" style={{ color: "red", marginLeft: 10 }}>WE'RE SORRY SALARY SHIELD IS NOT AVAILABLE IN YOUR STATE YET.</span>
                                    </div>
                                    <div className="col-md-12 col-xs-12 mt2 text-center" id="state_change" style={{ display: 'none' }}>
                                        <span className="glyphicon glyphicon-exclamation-sign" style={{ color: "red" }} />
                                        <span className="ml4 fgsd14" style={{ color: "red" }}>State did not match with current entered zipcode</span><br />

                                    </div>
                                    <div className="col-md-12 col-xs-12 mt2 text-center" id="div-agent-state-eligibility" style={{ display: 'none' }}>
                                        <span className="glyphicon glyphicon-exclamation-sign" style={{ color: "red" }} />
                                        <span className="ml4 fgsd14" style={{ color: "red" }}>YOU ARE INELIGIBLE TO SELL POLICY IN THIS STATE</span><br />
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <TopThreeSection token={tokenGlobal} tokenA={tokenGlobalAfficient} />
                <GiveCall />
                <TAC />
                <Footer />
            </GTM >

        )
    }

}