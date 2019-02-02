import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import $ from 'jquery';
import AppStage from "../../config/app_stage.js"
import PageMapper from "../../config/page_mapper";
import cookie from 'react-cookies'
import moment from 'moment-timezone';
import Header from '../partials/header';
import Footer from '../partials/footer'
import Faq from '../others/faq'
import Top_three_section from '../top_three_section/type_four'
import GiveCall from '../others/give_call'
import TAC from '../others/tandc'
import BeneficiaryTable from '../home/page_seven_table';
import EventMapper from "../../config/handle_window_event";
import io from 'socket.io-client';
import AgentSection from '../agent/agent_section';
import ApiList from "../../config/base.json"
import dropdown from "../../config/dropdown.json"
import DropdownCall from "../../config/dropdown_api_request.js"

import ErrorMsg from "../../config/error_msgs";

import '../../css/income_shield/income_shield_one.css';

import "../../css/user_info/info_section.css";
import "../../css/other/loader.css"
import SocketContext from '../../socket-context.js';
import ReactGA from 'react-ga';
import GTM from 'react-tag-manager'


const right_sign = ApiList.base_cdn_src + '/images/SVG/check_with_circle.svg'
const loder_img = ApiList.base_cdn_src + "/images/SVG/loader-blue.svg"
const loder_logo = ApiList.base_cdn_src + "/images/Icons/logo1.png"

let sec = 0;
let user_data = JSON.parse(sessionStorage.getItem('user_data'))
let beneficiaryAffId = [];
var Timer_value;
let rule_engine_call_flag = 0;
let dob_validation_flag = true;

var firstPassword;
var secondUserName;
var tokenGlobal;
var tokenGlobalAfficient;

let res;
let is_final_call = 0;
class PageSeven extends Component {
    constructor() {
        super();
        this.state = {
            table_array: [<BeneficiaryTable />],
            current_page_index: sessionStorage.getItem('current_index'),
            agent_flag: sessionStorage.getItem('agent_present_flag') ? parseInt(sessionStorage.getItem('agent_present_flag')) : 0,
            render_page: false,
            aff2: user_data ? user_data.aff2 : null

        }
    }

    componentDidMount() {
        var self = this;
        var page_index = '6';

        // //CHECK PAGE JUMP
        // if (page_index != this.state.current_page_index) {
        //     if (this.state.current_page_index == '1') {
        //         //FETCH BY DESIGN
        //         var screen_id = PageMapper.getNextDesignId(parseInt(this.state.current_page_index));
        //         sessionStorage.setItem('current_index', (parseInt(this.state.current_page_index)));
        //         window.location.href = PageMapper.getPageURL(screen_id);
        //     } else {
        //         var screen_id = PageMapper.getNextPageId(parseInt(this.state.current_page_index) + 1);
        //         sessionStorage.setItem('current_index', (parseInt(this.state.current_page_index) + 1));
        //         window.location.href = PageMapper.getPageURL(screen_id);
        //     }
        // }

        //user drop out socket client code
        try {
            let app_user_data = sessionStorage.getItem('user_data') ? JSON.parse(sessionStorage.getItem('user_data')) : {};
            app_user_data.url = ApiList.current.ui_url + '/' + 'life-insurance-beneficiaries';//current_page_url;
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
            this.props.socket.emit('userInfo', datastring);
            //EventMapper.save_to_app_data(app_user_data)
        } catch (e) { console.log('e', e); } finally { }
        //-------------------------------

        // setInterval(this.establishSocketConnection.bind(this), 8000);

        $(document).ready(function () {
            EventMapper.disable_back();
            // EventMapper.dropout_event('email_template_1', 'life-insurance-beneficiaries');
        });

        self.get_beneficary_aff_id()
        // self.Watch() 

        var visit_id = EventMapper.query('visitId');
        var afficiency_id = EventMapper.query('aff2');

        //CHECK FOR COMEBACK DATA
        EventMapper.check_comeback(visit_id, afficiency_id)
            .then(function () {
                return EventMapper.get_journey_json();
            })
            .then(function () {
                //GET USER_DATA IF FETCHED FROM RHASH API
                user_data = sessionStorage.getItem('user_data') ? JSON.parse(sessionStorage.getItem('user_data')) : {};
                return self.check_rule_engine_res()

            })
            .then(function () {
                return EventMapper.validate_redirection(page_index)
            })
            .then(function () {
                self.setState({
                    render_page: true,
                    current_page_index: sessionStorage.getItem('current_index')
                }, function () {
                    self.setState({
                        aff2: user_data.aff2
                    });

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

                    if (user_data.aff2) {
                        $('.display_afficiency_id').append('Afficiency Id : ' + user_data.aff2)
                    }
                });
            })

        //#############################################FOR FETCHING LABEL TEXT FROM JSON ENDS HERE#############################################
        $(document).on('click', '.add_beneficiary_btn', function () {
            var length_beni = $('.beneficiary_tbody').length
            $('.total-tag').show()
            if (length_beni < 5) {

                let a = self.state.table_array.slice();
                a.push(<BeneficiaryTable />);
                self.setState({
                    table_array: a
                });
                // var total_percentage = 0;
                // $('.percentage_beni').map(function () {
                //     total_percentage = parseInt(total_percentage) + parseInt($(this).val());
                // })


                // var beni_percent = 100 - total_percentage;
                // if (beni_percent < 100 && beni_percent > 0) {

                $('.remove_beneficiary_btn').css('display', 'block')
                // $('.percentage_beni').last().val(beni_percent)
                // }
                var final_percent = 0;
                $('.percentage_beni').map(function () {
                    if ($(this).val() != "") {
                        final_percent = parseInt(final_percent) + parseInt($(this).val());
                    } else {
                        final_percent = 0
                    }

                })
                if (final_percent <= 100 && final_percent > 0) {
                    $('.total_beni_percent').text(final_percent + "%")
                    if (final_percent == 100) {
                        // $('.add_beneficiary_btn').css('display', 'none')
                    } else {
                        // $('.add_beneficiary_btn').css('display', 'block')
                    }
                    $('.total_beni_percent').css('color', 'black')
                } else {
                    // final_percent = "Adjust percentage. Total must equal to 100%";
                    // $('.total_beni_percent').text(final_percent);
                    // $('.total_beni_percent').css('color', 'red')
                    // $('.add_beneficiary_btn').css('display', 'none')

                }

            } else {
                // $('.add_beneficiary_btn').css('display', 'none')
            }
            $('.first-name:last-child').focus()
        })

        $(document).on('click', '.remove_beneficiary_btn', function () {

            var total_percentage = 0;
            $('.percentage_beni').map(function () {
                total_percentage = parseInt(total_percentage) + parseInt($(this).val());
            })
            var beni_percent = 100 - total_percentage;
            if (beni_percent < 100 && beni_percent > 0) {

                $('.percentage_beni').last().val(beni_percent)
            }

            if (self.state.table_array.length != 1) {
                let a = self.state.table_array.slice();
                a.pop();

                self.setState({
                    table_array: a
                }, function () {
                    if (self.state.table_array.length == 1)
                        $('.remove_beneficiary_btn').css('display', 'none')

                });
            }

            var final_percent = 0;
            $('.percentage_beni').map(function () {
                final_percent = parseInt(final_percent) + parseInt($(this).val());
            })
            if (final_percent <= 100 && final_percent > 0 && final_percent != 'NaN') {
                $('.total_beni_percent').text(final_percent + "%")
                $('.total_beni_percent').css('color', 'black')

            } else {
                final_percent = "Adjust percentage. Total must equal 100";
                $('.total_beni_percent').text(final_percent + "%");
                $('.total_beni_percent').css('color', 'red')


            }


        })

        // ################################ save beni api ##########################
        $(document).on('click', '.page_seven_next_', function () {

            if (self.validate_form()) {
                var total_beni_percent = 0;

                for (var i = 0; i < $('.percentage_beni').length + 1; i++) {
                    self.get_beneficary_aff_id()
                    if (i == $('.percentage_beni').length) {
                        self.save_identity_benificary()
                    }
                }
                $('.percentage_beni').map(function () {
                    total_beni_percent += parseInt($(this).val());
                    //   alert(total_beni_percent)
                })
                if (total_beni_percent != 100) {
                    var final_percent = "Adjust percentage. Total must equal 100%";
                    $('.total_beni_percent').text(final_percent);
                    $('.total_beni_percent').css('color', 'red')

                } else {
                    $('.total_beni_percent').hide()
                    var benifi_arr = [];
                    var beni_arr = [];

                    $('.beneficiary_tbody').map(function () {

                        benifi_arr.push({
                            "afficiency_id": cookie.load('aff2') ? cookie.load('aff2') : user_data.aff2,
                            "app_attempt_no": 100,
                            "visit_id": cookie.load('visit_id'),
                            "relationship_to_applicant": $(this).find('.relation').val(),
                            // "bene_first_name": $(this).find('.first-name').val(),
                            // "bene_last_name": $(this).find('.last-name').val(),
                            "dob": $(this).find('#beni-date-of-birth').val(),
                            'percentage': $(this).find('.percentage_beni').val()
                        })
                    })
                    $('.beneficiary_tbody').map(function () {

                        beni_arr.push({
                            "afficiency_id": cookie.load('aff2') ? cookie.load('aff2') : user_data.aff2,
                            "app_attempt_no": 100,
                            "visit_id": cookie.load('visit_id'),
                            "relationship_to_applicant": $(this).find('.relation').val(),
                            "bene_first_name": $(this).find('.first-name').val(),
                            "bene_last_name": $(this).find('.last-name').val(),
                            "dob": $(this).find('#beni-date-of-birth').val(),
                            'percentage': $(this).find('.percentage_beni').val()
                        })
                    })
                    user_data.beni_arr = beni_arr;
                    sessionStorage.setItem('user_data', JSON.stringify(user_data))
                    console.log("save to beni" + JSON.stringify(beni_arr))

                    let datastring = {
                        "applicant_beneficiaries": benifi_arr,
                        "navigation_log": {
                            "visit_id": cookie.load('visit_id'),
                            "page_url": window.location.pathname,
                            "entry_timestamp": moment().format("MM/DD/YYYY"),
                            "exit_timestamp": moment().format("MM/DD/YYYY"),
                            "interactive_indicator": 1
                        }
                    }


                    console.log("benificary create " + JSON.stringify(datastring))

                    $.ajax({
                        url: ApiList.current.base_api_url + ApiList.page_seven.benificaries_create,
                        type: 'POST',
                        data: JSON.stringify(datastring),
                        headers: {
                            'Authorization': 'Bearer ' + tokenGlobal,
                            'Content-Type': "application/json"
                        },
                        success: (data) => {
                            console.log(JSON.stringify(data))
                            if (data.statusCode == 200) {
                                if (res != null && res != '') {
                                    if (res[0] == 1) {
                                        var screen_id = PageMapper.getNextPageId(parseInt(sessionStorage.getItem('current_index')) + 1);
                                        sessionStorage.setItem('current_index', (parseInt(sessionStorage.getItem('current_index')) + 1));
                                        window.location.href = PageMapper.getPageURL(screen_id);
                                    } else if (res[0] == 2) {
                                        AppStage.save_app_stage(cookie.load('visit_id'), 7)
                                        user_data.failure_code = 6
                                        sessionStorage.setItem('user_data', JSON.stringify(user_data))
                                        window.location.href = "/life-insurance-application-call-now"
                                    } else if (res[0] == 3) {
                                        AppStage.save_app_stage(cookie.load('visit_id'), 7)
                                        user_data.failure_code = 4
                                        sessionStorage.setItem('user_data', JSON.stringify(user_data))
                                        window.location.href = "/life-insurance-application-call-now"
                                    } else if (res[0] == 4) {
                                        AppStage.save_app_stage(cookie.load('visit_id'), 7)
                                        user_data.failure_code = 6
                                        sessionStorage.setItem('user_data', JSON.stringify(user_data))
                                        window.location.href = "/life-insurance-application-call-now"
                                    } else if (res[0] == 6) {
                                        AppStage.save_app_stage(cookie.load('visit_id'), 7)
                                        user_data.failure_code = 3
                                        sessionStorage.setItem('user_data', JSON.stringify(user_data))
                                        window.location.href = "/life-insurance-application-call-now"
                                    } else if (res[0] == 101) {
                                        console.log(user_data.drivers_license_flg + " -- " + user_data.issued_license_flg)
                                        if (user_data.drivers_license_flg == 0 && user_data.issued_license_flg == 0) {
                                            if (rule_engine_call_flag == 0) { self.rule_engine_call(); }
                                        } else {
                                            window.location.href = "/life-insurance-additional-questionaire"
                                        }
                                    }
                                } else {
                                    is_final_call = 1;
                                    self.check_rule_engine_res();
                                }
                            }
                        },
                        error: (err) => {
                            console.log("ERROR in benificary save api " + JSON.stringify(err));
                        }
                    })


                }
            } else {

            }
        })
        // ################################ sav beni api ##########################
        // ************************************ date of birth validation***************
        $(document).on('blur', '.beni-date-of-birth', function (e) {

            if (moment(this.value).isValid()) {
                var age = moment().diff(this.value, 'days')
                console.log(age)
                if (age >= 0) {
                    $(this).css('border-color', 'black');
                    $(this).siblings('small').remove()
                    dob_validation_flag = true;
                } else {
                    $(this).css('border-color', 'red');
                    $(this).siblings('small').is(":visible") ? null : $('<small  style="color: red;"><p>Please enter proper date of birth</p></small>').insertAfter($(this));
                    dob_validation_flag = false
                }
            } else {
                $("#validation_" + this.id).is(":visible") ? $("#validation_" + this.id).remove() : null;
                console.log(this.value.length)
                if (this.value.length == 0) {
                    $(this).css('border-color', 'red');
                    $(this).siblings('small').is(":visible") ? null : $('<small style="color: red;"><p>' + ErrorMsg.beneficiary['beni-date-of-birth'] + '</p></small>').insertAfter($(this));
                    dob_validation_flag = false
                } else {
                    $(this).css('border-color', 'red');
                    $(this).siblings('small').is(":visible") ? null : $('<small style="color: red;"><p>Please enter proper value</p></small>').insertAfter($(this));
                    dob_validation_flag = false
                }

            }
            //
        });
        $(document).on('change', '.relation', function () {


            if ($(this).find('option:selected').val() != '') {

                $(this).parents('.rail-select').css('border', 'none');
                $(this).siblings('.select-side').css('border-color', 'black');
                $(this).parents('.rail-select').siblings('small').remove();
            } else {

                $(this).parents('.rail-select').css('border', '1px solid red');
                $(this).siblings('.select-side').css('border-color', 'red');
                $(this).parents('.rail-select').siblings('small').is(":visible") ? null : $('<small class="small_validate validation_' + $(this).attr('id') + '" style="color: red;">' + ErrorMsg.beneficiary.relation + '</small>').insertAfter($(this).parents('.rail-select'));
            }

        })


        //   var self = this;
        //   var page_index = '6';

        //   // //CHECK PAGE JUMP
        //   // if (page_index != this.state.current_page_index) {
        //   //     if (this.state.current_page_index == '1') {
        //   //         //FETCH BY DESIGN
        //   //         var screen_id = PageMapper.getNextDesignId(parseInt(this.state.current_page_index));
        //   //         sessionStorage.setItem('current_index', (parseInt(this.state.current_page_index)));
        //   //         window.location.href = PageMapper.getPageURL(screen_id);
        //   //     } else {
        //   //         var screen_id = PageMapper.getNextPageId(parseInt(this.state.current_page_index) + 1);
        //   //         sessionStorage.setItem('current_index', (parseInt(this.state.current_page_index) + 1));
        //   //         window.location.href = PageMapper.getPageURL(screen_id);
        //   //     }
        //   // }

        //   //user drop out socket client code
        //   try {
        //       let user_data = sessionStorage.getItem('user_data') ? JSON.parse(sessionStorage.getItem('user_data')) : {};
        //       user_data.url = ApiList.current.ui_url + '/' + 'life-insurance-beneficiaries';//current_page_url;
        //       user_data.call_us_at = "1800-000-111";
        //       user_data.email_template_type = 'email_template_1'; //template_type;
        //       user_data.visit_id = cookie.load('visit_id');
        //       user_data.aff2 = user_data.aff2 || user_data.aff1;
        //       user_data.agent_flag = sessionStorage.getItem('agent_present_flag') ? parseInt(sessionStorage.getItem('agent_present_flag')) : 0;
        //       user_data.distributor_id = sessionStorage.getItem('distributor_id');
        //       user_data.pe_journey_id = sessionStorage.getItem('pe_journey_id');
        //       user_data.current_index = sessionStorage.getItem('current_index');
        //       var datastring = {
        //           "app_data": user_data
        //       };

        //       console.log(JSON.stringify(datastring));
        //       this.props.socket.emit('userInfo', datastring);
        //   } catch (e) { console.log('e', e); } finally { }
        //   //-------------------------------

        //   // setInterval(this.establishSocketConnection.bind(this), 8000);

        //   $(document).ready(function () {
        //       EventMapper.disable_back();
        //       // EventMapper.dropout_event('email_template_1', 'life-insurance-beneficiaries');
        //   });

        //   self.get_beneficary_aff_id()
        //   // self.Watch()

        //   var visit_id = EventMapper.query('visitId');
        //   var afficiency_id = EventMapper.query('aff2');

        //   //CHECK FOR COMEBACK DATA
        //   EventMapper.check_comeback(visit_id, afficiency_id)
        //       .then(function () {
        //           return EventMapper.get_journey_json();
        //       })
        //       .then(function () {
        //           //GET USER_DATA IF FETCHED FROM RHASH API
        //           user_data = sessionStorage.getItem('user_data') ? JSON.parse(sessionStorage.getItem('user_data')) : {};


        //       })
        //       .then(function () {
        //           return EventMapper.validate_redirection(page_index)
        //       })
        //       .then(function () {
        //           self.setState({
        //               render_page: true
        //           },function(){
        //               self.setState({
        //                   aff2: user_data.aff2
        //               });

        //               if (sessionStorage.getItem('google_acc_id') != 'null') {
        //                   ReactGA.initialize(sessionStorage.getItem('google_acc_id'));
        //                   ReactGA.pageview(ApiList.current.ui_url + window.location.pathname);
        //               }
        //               //#############################################FOR FETCHING LABEL TEXT FROM JSON STARTS HERE#############################################
        //               var current_page_index = self.state.current_page_index;
        //               if (current_page_index) {
        //                   var data = PageMapper.getPageData(parseInt(current_page_index));
        //                   console.log(JSON.stringify(data))

        //                   for (var i = 0; i < data.design.Attribute.length; i++) {
        //                       if (data.design.Attribute[i].attributeID == 101) {

        //                       } else {
        //                           $('#' + data.design.Attribute[i].attributeID).text(data.design.Attribute[i].labelTxt)
        //                       }

        //                   }
        //               }

        //               if (user_data.aff2) {
        //                   $('.display_afficiency_id').append('Afficiency Id : ' + user_data.aff2)
        //               }
        //           });
        //       })

        //   //#############################################FOR FETCHING LABEL TEXT FROM JSON ENDS HERE#############################################
        //   $(document).on('click', '.add_beneficiary_btn', function () {
        //       var length_beni = $('.beneficiary_tbody').length
        //       $('.total-tag').show()
        //       if (length_beni < 5) {

        //           let a = self.state.table_array.slice();
        //           a.push(<BeneficiaryTable />);
        //           self.setState({
        //               table_array: a
        //           });
        //           // var total_percentage = 0;
        //           // $('.percentage_beni').map(function () {
        //           //     total_percentage = parseInt(total_percentage) + parseInt($(this).val());
        //           // })


        //           // var beni_percent = 100 - total_percentage;
        //           // if (beni_percent < 100 && beni_percent > 0) {

        //           $('.remove_beneficiary_btn').css('display', 'block')
        //           // $('.percentage_beni').last().val(beni_percent)
        //           // }
        //           var final_percent = 0;
        //           $('.percentage_beni').map(function () {
        //               if ($(this).val() != "") {
        //                   final_percent = parseInt(final_percent) + parseInt($(this).val());
        //               } else {
        //                   final_percent = 0
        //               }

        //           })
        //           if (final_percent <= 100 && final_percent > 0) {
        //               $('.total_beni_percent').text(final_percent + "%")
        //               if (final_percent == 100) {
        //                   // $('.add_beneficiary_btn').css('display', 'none')
        //               } else {
        //                   // $('.add_beneficiary_btn').css('display', 'block')
        //               }
        //               $('.total_beni_percent').css('color', 'black')
        //           } else {
        //               // final_percent = "Adjust percentage. Total must equal to 100%";
        //               // $('.total_beni_percent').text(final_percent);
        //               // $('.total_beni_percent').css('color', 'red')
        //               // $('.add_beneficiary_btn').css('display', 'none')

        //           }

        //       } else {
        //           // $('.add_beneficiary_btn').css('display', 'none')
        //       }
        //       $('.first-name:last-child').focus()
        //   })

        //   $(document).on('click', '.remove_beneficiary_btn', function () {

        //       var total_percentage = 0;
        //       $('.percentage_beni').map(function () {
        //           total_percentage = parseInt(total_percentage) + parseInt($(this).val());
        //       })
        //       var beni_percent = 100 - total_percentage;
        //       if (beni_percent < 100 && beni_percent > 0) {

        //           $('.percentage_beni').last().val(beni_percent)
        //       }

        //       if (self.state.table_array.length != 1) {
        //           let a = self.state.table_array.slice();
        //           a.pop();

        //           self.setState({
        //               table_array: a
        //           }, function () {
        //               if (self.state.table_array.length == 1)
        //                   $('.remove_beneficiary_btn').css('display', 'none')

        //           });
        //       }

        //       var final_percent = 0;
        //       $('.percentage_beni').map(function () {
        //           final_percent = parseInt(final_percent) + parseInt($(this).val());
        //       })
        //       if (final_percent <= 100 && final_percent > 0 && final_percent != 'NaN') {
        //           $('.total_beni_percent').text(final_percent + "%")
        //           $('.total_beni_percent').css('color', 'black')

        //       } else {
        //           final_percent = "Adjust percentage. Total must equal 100";
        //           $('.total_beni_percent').text(final_percent + "%");
        //           $('.total_beni_percent').css('color', 'red')


        //       }


        //   })

        //   // ################################ save beni api ##########################
        //   $(document).on('click', '.page_seven_next_', function () {

        //       if (self.validate_form()) {
        //           var total_beni_percent = 0;

        //           for (var i = 0; i < $('.percentage_beni').length + 1; i++) {
        //               self.get_beneficary_aff_id()
        //               if (i == $('.percentage_beni').length) {
        //                   self.save_identity_benificary()
        //               }
        //           }
        //           $('.percentage_beni').map(function () {
        //               total_beni_percent += parseInt($(this).val());
        //               //   alert(total_beni_percent)
        //           })
        //           if (total_beni_percent != 100) {
        //               var final_percent = "Adjust percentage. Total must equal 100%";
        //               $('.total_beni_percent').text(final_percent);
        //               $('.total_beni_percent').css('color', 'red')

        //           } else {
        //               $('.total_beni_percent').hide()
        //               var benifi_arr = [];
        //               var beni_arr = [];

        //               $('.beneficiary_tbody').map(function () {

        //                   benifi_arr.push({
        //                       "afficiency_id": cookie.load('aff2') ? cookie.load('aff2') : user_data.aff2,
        //                       "app_attempt_no": 100,
        //                       "visit_id": cookie.load('visit_id'),
        //                       "relationship_to_applicant": $(this).find('.relation').val(),
        //                       // "bene_first_name": $(this).find('.first-name').val(),
        //                       // "bene_last_name": $(this).find('.last-name').val(),
        //                       "dob": $(this).find('#beni-date-of-birth').val(),
        //                       'percentage': $(this).find('.percentage_beni').val()
        //                   })
        //               })
        //               $('.beneficiary_tbody').map(function () {

        //                   beni_arr.push({
        //                       "afficiency_id": cookie.load('aff2') ? cookie.load('aff2') : user_data.aff2,
        //                       "app_attempt_no": 100,
        //                       "visit_id": cookie.load('visit_id'),
        //                       "relationship_to_applicant": $(this).find('.relation').val(),
        //                       "bene_first_name": $(this).find('.first-name').val(),
        //                       "bene_last_name": $(this).find('.last-name').val(),
        //                       "dob": $(this).find('#beni-date-of-birth').val(),
        //                       'percentage': $(this).find('.percentage_beni').val()
        //                   })
        //               })
        //               user_data.beni_arr = beni_arr;
        //               sessionStorage.setItem('user_data', JSON.stringify(user_data))
        //               console.log("save to beni" + JSON.stringify(beni_arr))

        //               let datastring = {
        //                   "applicant_beneficiaries": benifi_arr,
        //                   "navigation_log": {
        //                       "visit_id": cookie.load('visit_id'),
        //                       "page_url": "/seven",
        //                       "entry_timestamp": moment().format("MM/DD/YYYY"),
        //                       "exit_timestamp": moment().format("MM/DD/YYYY"),
        //                       "interactive_indicator": 1
        //                   }
        //               }


        //               console.log("benificary create " + JSON.stringify(datastring))

        //               $.ajax({
        //                   url: ApiList.current.base_api_url + ApiList.page_seven.benificaries_create,
        //                   type: 'POST',
        //                   data: JSON.stringify(datastring),
        //                   headers: {
        //                               
        //                               'Content-Type': 'application/json'
        //                   },
        //                   success: (data) => {
        //                       console.log(JSON.stringify(data))
        //                       if (data.statusCode == 200) {
        //                           // // alert(JSON.stringify(data))

        //                           // window.location.href = "/ten"
        //                           // var screen_id = PageMapper.getNextPageId(parseInt(this.state.current_page_index) + 1);
        //                           // sessionStorage.setItem('current_index', (parseInt(this.state.current_page_index) + 1));
        //                           // window.location.href = PageMapper.getPageURL(screen_id);

        //                           self.check_rule_engine_res();
        //                       }
        //                   },
        //                   error: (err) => {
        //                       console.log("ERROR in benificary save api " + JSON.stringify(err));
        //                   }
        //               })


        //           }
        //       } else {

        //       }
        //   })
        //   // ################################ sav beni api ##########################
        //   // ************************************ date of birth validation***************
        //   $(document).on('blur', '.beni-date-of-birth', function (e) {

        //       if (moment(this.value).isValid()) {
        //           var age = moment().diff(this.value, 'days')
        //           console.log(age)
        //           if (age >= 0) {
        //               $(this).css('border-color', 'black');
        //               $(this).siblings('small').remove()
        //               dob_validation_flag = true;
        //           } else {
        //               $(this).css('border-color', 'red');
        //               $(this).siblings('small').is(":visible") ? null : $('<small  style="color: red;"><p>Please enter proper date of birth</p></small>').insertAfter($(this));
        //               dob_validation_flag = false
        //           }
        //       } else {
        //           $("#validation_" + this.id).is(":visible") ? $("#validation_" + this.id).remove() : null;
        //           console.log(this.value.length)
        //           if (this.value.length == 0) {
        //               $(this).css('border-color', 'red');
        //               $(this).siblings('small').is(":visible") ? null : $('<small style="color: red;"><p>' + ErrorMsg.beneficiary['beni-date-of-birth'] + '</p></small>').insertAfter($(this));
        //               dob_validation_flag = false
        //           } else {
        //               $(this).css('border-color', 'red');
        //               $(this).siblings('small').is(":visible") ? null : $('<small style="color: red;"><p>Please enter proper value</p></small>').insertAfter($(this));
        //               dob_validation_flag = false
        //           }

        //       }
        //       //
        //   });
        //   $(document).on('change', '.relation', function () {


        //       if ($(this).find('option:selected').val() != '') {

        //           $(this).parents('.rail-select').css('border', 'none');
        //           $(this).siblings('.select-side').css('border-color', 'black');
        //           $(this).parents('.rail-select').siblings('small').remove();
        //       } else {

        //           $(this).parents('.rail-select').css('border', '1px solid red');
        //           $(this).siblings('.select-side').css('border-color', 'red');
        //           $(this).parents('.rail-select').siblings('small').is(":visible") ? null : $('<small class="small_validate validation_' + $(this).attr('id') + '" style="color: red;">' + ErrorMsg.beneficiary.relation + '</small>').insertAfter($(this).parents('.rail-select'));
        //       }

        //   })
    }

    establishSocketConnection() {
        console.log('hit');
        //user drop out socket client code
        try {
            let app_user_data = sessionStorage.getItem('user_data') ? JSON.parse(sessionStorage.getItem('user_data')) : {};
            app_user_data.url = ApiList.current.ui_url + '/' + 'life-insurance-beneficiaries';//current_page_url;
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
            this.props.socket.emit('userInfo', datastring);

        } catch (e) { console.log('e', e); } finally { }
        //-------------------------------
    }

    validate_form = () => {
        var validation_flag = true;

        var i = 0;
        var j = 20;
        // $('.beneficiary_tbody').map(function () {
        // //FOR EMPTY FIELD VALIDATION & MAKE BOXES RED
        $('input').map(function () {
            if (this.value != '') {
                validation_flag = true;
                $(this).css('border-color', '2px solid black');
                $(this).siblings('small').remove();
            } else {
                validation_flag = false;
                $(this).css('border', '2px solid red');
                $(this).siblings('small').is(":visible") ? null : $('<small class="small_validate validation_' + this.name + i + '" style="color: red;">' + ErrorMsg.beneficiary[this.name] + '</small>').insertAfter(this);
            }
            i++;
        });
        $('select:visible option:selected ').map(function () {
            if ($(this).val() != '') {

                $(this).parents('.rail-select').css('border', 'none');
                $(this).parent('select').siblings('.select-side').css('border-color', 'black');
                $(this).parents('.rail-select').siblings('small').remove();
            } else {
                validation_flag = false;
                $(this).parents('.rail-select').css('border', '1px solid red');
                $(this).parent('select').siblings('.select-side').css('border-color', 'red');
                $(this).parents('.rail-select').siblings('small').is(":visible") ? null : $('<small class="small_validate validation_' + $(this).parent('select').attr('id') + '" style="color: red;">' + ErrorMsg.beneficiary.relation + '</small>').insertAfter($(this).parents('.rail-select'));
            }
            j++;
        })

        if (dob_validation_flag == false) {
            validation_flag = false;
        }

        return validation_flag;
    }

    get_beneficary_aff_id = () => {
        $.ajax({
            url: ApiList.current.base_api_url + ApiList.aff0_fetch,
            type: 'GET',
            headers: {
                'Authorization': 'Bearer ' + tokenGlobal,
                'Content-Type': 'application/json'
            },
            success: (data) => {
                beneficiaryAffId.push(data)
                // alert(beneficiaryAffId)
            },
            error: (err) => {
                console.log("ERROR in aff0_fetch " + JSON.stringify(err));
            }
        })
    }

    save_identity_benificary = () => {
        var identitydatastring = [];
        $('.beneficiary_tbody').map(function () {
            identitydatastring.push({
                "applicantAffId": cookie.load('aff2') ? cookie.load('aff2') : user_data.aff2,
                "relationshipType": $(this).find('.relation').val(),
                "firstName": $(this).find('.first-name').val(),
                "lastName": $(this).find('.last-name').val(),
                "dob": $(this).find('#beni-date-of-birth').val(),
                "beneficiaryAffId": beneficiaryAffId.pop()
            })
        })
        console.log("identity benificary api " + JSON.stringify(identitydatastring));
        $.ajax({
            url: ApiList.current.base_identiy_api_url + ApiList.Identity_beneficiaries_save,
            type: 'POST',
            data: JSON.stringify(identitydatastring),
            headers: {
                'Content-Type': "application/json",
                'Authorization': 'Bearer ' + tokenGlobalAfficient,
            },
            success: (data) => {
                console.log(JSON.stringify(data))
            },
            error: (err) => {
                console.log("ERROR in identityBeneficiaryAP page 7 api " + JSON.stringify(err));
            }
        })
    }

    check_rule_engine_res = () => {
        var self = this;
        let datastring = {
            "application": {
                "visit_id": cookie.load('visit_id'),
                "afficiency_id": user_data.aff2
            }
        }
        console.log(ApiList.current.base_api_url + ApiList.get_rule_engine_res)
        console.log("check rule engine" + JSON.stringify(datastring))

        var timeleft = 301;
        var downloadTimer = setInterval(function () {
            timeleft--;
            Timer_value = timeleft;
            // $('.loader_value').text(Timer_value)
            // console.log(Timer_value)
            if (timeleft % 10 == 0) {
                console.log(ApiList.current.base_api_url + ApiList.get_rule_engine_res)
                console.log(datastring)
                $.ajax({
                    url: ApiList.current.base_api_url + ApiList.get_rule_engine_res,
                    type: 'POST',
                    data: JSON.stringify(datastring),
                    headers: {
                        'Authorization': 'Bearer ' + tokenGlobal,
                        'Content-Type': 'application/json'
                    },
                    success: (data) => {

                        console.log(JSON.stringify(data))
                        res = data.split('#');
                        res.shift()
                        console.log("rule engine final res " + JSON.stringify(res))


                        if (rule_engine_call_flag == 0) {
                            user_data.rule_engine = res;
                        } else {
                            user_data.rule_engine_2 = res
                        }
                        user_data.uw_decision_date = moment().format("MM/DD/YYYY");
                        sessionStorage.setItem('user_data', JSON.stringify(user_data))
                        console.log("is_final_call" + is_final_call)
                        if (is_final_call == 1) {
                            $(".spinner").css('display', 'block')
                            if (res[0] == 1) {
                                var screen_id = PageMapper.getNextPageId(parseInt(sessionStorage.getItem('current_index')) + 1);
                                sessionStorage.setItem('current_index', (parseInt(sessionStorage.getItem('current_index')) + 1));
                                window.location.href = PageMapper.getPageURL(screen_id);
                            } else if (res[0] == 2) {
                                AppStage.save_app_stage(cookie.load('visit_id'), 7)
                                user_data.failure_code = 6
                                sessionStorage.setItem('user_data', JSON.stringify(user_data))
                                window.location.href = "/life-insurance-application-call-now"
                            } else if (res[0] == 3) {
                                AppStage.save_app_stage(cookie.load('visit_id'), 7)
                                user_data.failure_code = 4
                                sessionStorage.setItem('user_data', JSON.stringify(user_data))
                                window.location.href = "/life-insurance-application-call-now"
                            } else if (res[0] == 4) {
                                AppStage.save_app_stage(cookie.load('visit_id'), 7)
                                user_data.failure_code = 6
                                sessionStorage.setItem('user_data', JSON.stringify(user_data))
                                window.location.href = "/life-insurance-application-call-now"
                            } else if (res[0] == 6) {
                                AppStage.save_app_stage(cookie.load('visit_id'), 7)
                                user_data.failure_code = 3
                                sessionStorage.setItem('user_data', JSON.stringify(user_data))
                                window.location.href = "/life-insurance-application-call-now"
                            } else if (res[0] == 101) {
                                console.log(user_data.drivers_license_flg + " -- " + user_data.issued_license_flg)
                                if (user_data.drivers_license_flg == 0 && user_data.issued_license_flg == 0) {
                                    if (rule_engine_call_flag == 0) { self.rule_engine_call(); }
                                } else {
                                    window.location.href = "/life-insurance-additional-questionaire"
                                }
                            }
                        }
                    },
                    error: (err) => {
                        console.log("ERROR in rule engine response page  " + JSON.stringify(err));
                    }
                })
            }
            if (timeleft <= 0) {
                if (is_final_call == 1) {
                    AppStage.save_app_stage(cookie.load('visit_id'), 7)
                    user_data.failure_code = 3
                    sessionStorage.setItem('user_data', JSON.stringify(user_data))
                    window.location.href = "/life-insurance-application-call-now"
                    clearInterval(downloadTimer);
                }
            }
        }, 1000);
    }



    rule_engine_call = () => {

        var self = this;
        let user_data = JSON.parse(sessionStorage.getItem('user_data'))
        // var param = "" + user_data.aff2 + "#" + cookie.load('visit_id') + "#2#{FirstName:\'" + user_data.first_name + "\',LastName:\'" + user_data.last_name + "\',MiddleName:\'\',SSN:\'" + user_data.ssn + "\',Gender:\'" + user_data.gender + "\',DOB:\'" + user_data.dob + "\',State:\'" + user_data.state + "\',ZipCode:\'" + user_data.zipcode + "\',DriverslicenseState:\'" + user_data.drivers_license_state + "\', DriverslicenseNumber:\'" + user_data.drivers_license_no + "\',Address_id:\'\',House:\'" + user_data.home_address + "\',Street:\'" + user_data.apt_no + "\',Apartment:\'\',City:\'" + user_data.city + "\'}";
        var nicotine = user_data.tobbacouse == 0 ? "No" : "Yes"
        var param = "" + user_data.aff2 + "#" + cookie.load('visit_id') + "#2#{FirstName:\'" + user_data.first_name + "\',LastName:\'" + user_data.last_name + "\',MiddleName:\'\',SSN:\'" + user_data.ssn + "\',Gender:\'" + user_data.gender + "\',DOB:\'" + user_data.dob + "\',State:\'" + user_data.state + "\',ZipCode:\'" + user_data.zipcode + "\',DriverslicenseState:\'" + user_data.drivers_license_state + "\',Height:\'" + user_data.height + "\', Weight:\'" + user_data.weight + "\',NicotineUse:\'" + nicotine + "\', DriverslicenseNumber:\'" + user_data.drivers_license_no + "\',Address_id:\'\',House:\'" + user_data.home_address + "\',Street:\'" + user_data.apt_no + "\',Apartment:\'\',City:\'" + user_data.city + "\,email:\'" + user_data.email + "\,phno:\'" + user_data.phone_number + "\'}";
        console.log(" params for web socket " + param)
        console.log("IP for web socket " + ApiList.current.decision_api_ws)
        var socket = io.connect(ApiList.current.decision_api_ws, { secure: true });
        socket.emit('msg', param)
        socket.on("msg2", function (msg) {
            console.log("Request Submitted ", msg);
            if (msg == "Welcome") {
                rule_engine_call_flag = 1
            }
        })
    }

    render() {
        const { table_array, agent_flag, render_page, aff2 } = this.state;

        return (
            (render_page ?
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
                        {/* <div className="blob blob-0"></div>
                        <div className="agendabold32 loader_text" style={{ color: '#FDFDFD' }}>We are evaluating your application...</div> */}

                        <img id="loading" src={loder_img} />
                        <img className="loader_logo" src={loder_logo} />
                        <div className="loader_text agendabold32">We are evaluating your application ...</div>
                    </div>
                    {/* loader */}

                    < Header display_menu={false} />
                    {agent_flag == 1 ? <AgentSection /> : null}
                    <div id="section1" className="col-md-12 section1_1 text-left section">
                        <div className="container mt2" style={{ color: 'black' }}>
                            <div className="col-md-12 text-center fgsd14 tt" id="702"></div>
                            <h1 className="col-md-8 col-md-offset-2 text-center mt1 mb2 agendabold42" id="703"></h1>
                            <div className="col-md-7 col-md-offset-3">
                                <ul className="nav nav-tabs user_tab " id="myTab">
                                    <div className="liner1"></div>
                                    <li className="">
                                        <Link to="#" >
                                            <span className="round-tabs one agendabold42">
                                                <img src={right_sign} style={{ width: '50px', marginLeft: '-2px', marginTop: '-5px' }} alt="" />
                                            </span>
                                        </Link>
                                        <div className="bottom_line"></div>
                                        <div className="text-center fgsd14 mt3 bottom_text">About you</div>
                                    </li>
                                    <li className="center_line"> <hr style={{ marginTop: '56%', borderTop: '2px solid #BBBBBB' }} /> </li>
                                    <li className=""><Link to="#" >
                                        <span className="round-tabs two agendabold42" id="602">
                                            <img src={right_sign} style={{ width: '50px', marginLeft: '-2px', marginTop: '-5px' }} alt="" />
                                        </span>
                                    </Link>
                                        <div className="bottom_line"></div>
                                        <div className="text-center fgsd14 mt3 bottom_text" id="">Your personal history</div>
                                    </li>
                                    <li className="center_line"> <hr style={{ marginTop: '56%', borderTop: '2px solid #BBBBBB' }} /> </li>
                                    <li className="active"><Link to="#" >
                                        <span className="round-tabs three agendabold42" id="702">
                                            3
                     </span> </Link>
                                        <div className="bottom_line"></div>
                                        <div className="text-center fgsd14 mt3 bottom_text" id="705">Your beneficiaries</div>
                                    </li>
                                    <li className="center_line"> <hr style={{ marginTop: '56%', borderTop: '2px solid #BBBBBB' }} /> </li>
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
                                <div className="tab-pane fade in active" id="messages">
                                    <div className="col-md-12 text-center mt3">
                                        <div className="col-md-8 col-md-offset-2 text-center mt4 mb4 ltr20" id="706">

                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {table_array}

                    <div className="add_beneficaries">
                    </div>

                    <div className="col-md-12">
                        <div className="container">
                            <div className="col-md-10 col-md-offset-1">
                                <div>
                                    {/* <div className="col-md-12"> <div style={{ borderTop: '2px solid grey', margin: '0px 8px' }}></div></div> */}
                                    <div className="col-md-12 mt2 fgsb18">
                                        <div className="col-md-5 col-md-offset-5 total-tag" style={{ display: "block" }} id="">Total must equal 100%</div>

                                    </div>
                                    <div className="col-md-12 mt2 fgsb18">
                                        <div className="col-md-2 col-md-offset-10 total_beni_percent" style={{ fontWeight: "bold" }}></div>
                                    </div>
                                    <div className="col-md-12 col-xs-12 text-left px0">
                                        <div className="col-md-2 mt2 col-xs-12 col-xs-offset-0 px0"><button className="btn cbtn add_beneficiary_btn tt" style={{ width: 230 }} id="712"></button></div>
                                        <div className="col-md-2 col-md-offset-2 col-xs-12 col-xs-offset-0 mt2 px0"> <button className="btn cbtn remove_beneficiary_btn tt" style={{ width: 230 }} id="719"></button></div>
                                    </div>
                                    <div className="col-md-12 col-xs-12 mb3 mt6 text-center">

                                        <button className="btn cbtn_color page_seven_next_ mt1 tt" id="713"></button>
                                    </div>

                                </div>
                            </div>
                            {/* BOTTOM OF SECTION */}

                        </div>
                        <div className="col-md-12 col-xs-12 fgsd16 text-right mb1 tt display_afficiency_id" id="display_afficiency_id"></div>
                    </div>

                    < Top_three_section />
                    < GiveCall />
                    < TAC />
                    <Footer />


                </GTM >
                : null)
        )
    }

}
const PageSevenWithSocket = props => (
    <SocketContext.Consumer>
        {socket => <PageSeven socket={socket} />}
    </SocketContext.Consumer>
)
export default PageSevenWithSocket
