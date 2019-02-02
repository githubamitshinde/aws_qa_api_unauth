import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import cookie from 'react-cookies'
import moment from 'moment-timezone';
import Promise from "bluebird";
import Header from '../partials/header';
import Footer from '../partials/footer'
import GiveCall from '../others/give_call'
import TAC from '../others/tandc'
import Top_three_section from '../top_three_section/type_five'
import $ from 'jquery';
import AppStage from "../../config/app_stage.js"
import PageMapper from "../../config/page_mapper";
import GTM from 'react-tag-manager'

import ApiList from "../../config/base.json"
import dropdown from "../../config/dropdown.json"
import DropdownCall from "../../config/dropdown_api_request.js"
import EventMapper from "../../config/handle_window_event";
import AgentSection from '../agent/agent_section';




import '../../css/income_shield/income_shield_one.css';

import "../../css/user_info/info_section.css";

import io from 'socket.io-client';
import ErrorMsg from "../../config/error_msgs";
import SocketContext from '../../socket-context.js';
import ReactGA from 'react-ga';


const Authorization_to_Obtain_and_Disclose_Information = ApiList.base_cdn_src+'/images/pdf/Authorization to Obtain and Disclose Information.pdf'
const eDelivary_Consent =ApiList.base_cdn_src+ '/images/pdf/eDelivery Consent.pdf'
const HIPAA_Authorization =ApiList.base_cdn_src+'/images/pdf/HIPAA Authorization.pdf'
const privacy_notice = ApiList.base_cdn_src+'/images/pdf/Privacy Notice.pdf'
const Notice_to_Consumers =ApiList.base_cdn_src + '/images/pdf/Notice to Consumers.pdf'
const loder_img = ApiList.base_cdn_src+"/images/SVG/loader-blue.svg"
const loder_logo =ApiList.base_cdn_src+ "/images/Icons/logo1.png"

const drop_arrow = ApiList.base_cdn_src+"/images/SVG/down_arrow.svg";
const right_sign = ApiList.base_cdn_src+'/images/SVG/check_with_circle.svg'
const close_model = ApiList.base_cdn_src+"/images/SVG/Close_icon.svg"


let user_data = JSON.parse(sessionStorage.getItem('user_data'))
let ssn_try_count = 2;

var firstPassword;
var secondUserName;
var tokenGlobal;
var tokenGlobalAfficient;

class PageSix extends Component {
    constructor() {
        super();
        this.state = {
            current_page_index: sessionStorage.getItem('current_index'),
            agent_flag: sessionStorage.getItem('agent_present_flag') ? parseInt(sessionStorage.getItem('agent_present_flag')) : 0,
            render_page: false,
            aff2: "",
            hippa_link_click_flag: 0
        }
    }

    componentDidMount() {
        console.log("journey +++++++++" +sessionStorage.getItem('journey_data'))
          var self = this;
          var page_index = '5';


          //CHECK PAGE JUMP
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
          let app_user_data = sessionStorage.getItem('user_data') ? JSON.parse(sessionStorage.getItem('user_data')) : {};
          app_user_data.url = ApiList.current.ui_url + '/' + 'life-insurance-online-questionnaire-complete';//current_page_url;
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
          //-------------------------------

          $(document).ready(function () {
              EventMapper.disable_back();
              //EventMapper.dropout_event('email_template_1', 'life-insurance-online-questionnaire-complete');
          });

          var visit_id = EventMapper.query('visitId');
          var afficiency_id = EventMapper.query('aff2');

          //CHECK FOR COMEBACK DATA
          EventMapper.check_comeback(visit_id, afficiency_id)
              .then(function () {
                  self.setState({
                    current_page_index: sessionStorage.getItem('current_index')
                  });
                  return EventMapper.get_journey_json();
              })
              .then(function () {


                  //GET USER_DATA IF FETCHED FROM RHASH API
                  // user_data = sessionStorage.getItem('user_data')
                  user_data = JSON.parse(sessionStorage.getItem('user_data'))



              })
              .then(function () {
                  return EventMapper.validate_redirection(page_index)
              })
              .then(function () {
                  self.setState({
                      render_page: true,
                      current_page_index: sessionStorage.getItem('current_index')
                  }, function(){
                      if (sessionStorage.getItem('google_acc_id') != 'null') {
                          ReactGA.initialize(sessionStorage.getItem('google_acc_id'));
                          ReactGA.pageview(ApiList.current.ui_url + window.location.pathname);
                      }

                      //#############################################FOR FETCHING LABEL TEXT FROM JSON STARTS HERE#############################################
                      var current_page_index = self.state.current_page_index;
                      if (current_page_index) {
                          var data = PageMapper.getPageData(parseInt(current_page_index));
                          console.log("page data >>>" +JSON.stringify(data))

                          for (var i = 0; i < data.design.Attribute.length; i++) {
                              if (data.design.Attribute[i].attributeID == 101) {

                              } else {

                                  $('#' + data.design.Attribute[i].attributeID).text(data.design.Attribute[i].labelTxt)

                              }

                          }
                      }
                      //#############################################FOR FETCHING LABEL TEXT FROM JSON ENDS HERE#############################################
                      if (user_data.aff2) {
                      
                        //   self.setState({
                        //       aff2: user_data.aff2
                        //   })
                          $('#display_afficiency_id').text('Afficiency Id : ' + user_data.aff2)
                      }

                      // ############################## dropdown api #######################
                      DropdownCall.dropdown_req(dropdown.table_name.page6, dropdown.column_name.DL_state, "dl_state", null, true)
                      // ############################## dropdown api #######################
                  });

                  // self.setState({
                      //     render_page: true
                      // });

              })


          // ############################### save api ########################
          $(document).on('click', '.page6_next_save', function () {
              console.log("hppa link click flag >> " + self.state.hippa_link_click_flag)
              if (self.validate_form()) {

                  //  hippa_file().then(function () {
                  let ssn = user_data.ssn
                  if (ssn != null && ssn != 0) {
                      ssn = ssn.substr(ssn.length - 4);
                      ssn_try_count--;

                      if ($('#p_six_ssn').val() == ssn) {
                          $('.spinner1').css('display', 'block');
                          user_data.drivers_license_no = $('#driving_license_number').val();
                          user_data.drivers_license_state = $("#dl_state option:selected").val();
                          user_data.drivers_license_flg = $('input[name=drivers_license_flg]:checked').val() == 1 ? 1 : 0;
                          user_data.issued_license_flg = $('input[name=issued_license_flg]:checked').val() == 1 ? 1 : 0;
                          sessionStorage.setItem('user_data', JSON.stringify(user_data))
                          let datastring = {
                              "application_personal_update": {
                                  "afficiency_id": cookie.load('aff2') ? cookie.load('aff2') : user_data.aff2,
                                  "visit_id": cookie.load('visit_id'),
                                  "ssn": ssn,
                                  "firstname": user_data.first_name,
                                  "lastname": user_data.last_name,
                                  "drivers_license_no": $('#driving_license_number').val(),
                                  "drivers_license_flg": (user_data.drivers_license_flg == 1 ? 1 : 0),
                                  "drivers_license_state": $("#dl_state option:selected").val(),
                                  "physician_first_name": "",
                                  "physician_Last_name": "",
                                  "physician_city": "",
                                  "physician_state": "",
                                  "hipaa_flag": self.state.hippa_link_click_flag,
                                  "license_ever": (user_data.issued_license_flg ? (user_data.issued_license_flg == 1 ? 1 : 0) : 0),
                                  "agent_flag": sessionStorage.getItem('agent_present_flag') ? sessionStorage.getItem('agent_present_flag') : 0,
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
                              datastring.application_personal_update['agent_id'] = sessionStorage.getItem('agent_id');
                              datastring.application_personal_update['agent_assisted_flag'] = 1;
                              datastring.application_personal_update['agent_entry_screen'] = 6
                          }
                          if (self.state.hippa_link_click_flag == 1) {
                              datastring.application_personal_update['hipaa_timestamp'] = moment().tz("America/New_York").format('MM/DD/YYYY HH:mm:ss')
                          }
                          console.log(JSON.stringify(datastring));
                          console.log(ApiList.current.base_api_url + ApiList.page_six.update_six)
                          $.ajax({
                              url: ApiList.current.base_api_url + ApiList.page_six.update_six,
                              type: 'POST',
                              data: JSON.stringify(datastring),
                              headers: {
                                          
                                          'Content-Type': 'application/json'
                              },
                              success: (data) => {
                                  console.log("upadte six res >>" +JSON.stringify(data));
                                  self.rule_engine_call();
                              },
                              error: (err) => {
                                  console.log("ERROR in update_six " + JSON.stringify(err));
                              }
                          })
                      } else if (ssn_try_count <= 2 && ssn_try_count > 0) {
                          $('#ssn_attempt_msg_button').click();
                      } else {
                          user_data.failure_code = 7
                          sessionStorage.setItem('user_data', JSON.stringify(user_data))
                          window.location.href = '/life-insurance-application-call-now'
                      }
                  } else {
                      AppStage.save_app_stage(cookie.load('visit_id'), 6)
                      let user_data = JSON.parse(sessionStorage.getItem('user_data'))
                      user_data.failure_code = 5;
                      sessionStorage.setItem('user_data', JSON.stringify(user_data))
                      window.location.href = "/life-insurance-application-call-now"
                  }
                  // })
              }
              else {
                  $("#validation_page_six").css("display", 'block');
                  setTimeout(function () {
                      $("#validation_page_six").css("display", 'none');
                  }, 4000);
              }
          })


          $(document).on('keypress', '#p_six_ssn', function (e) {
              var code = e.keyCode || e.charCode
              if ((code >= 48 && code <= 57) || code == 8 || code == 9) {
              } else {
                  e.preventDefault();
              }
          });

          $(document).on('keyup', '#p_six_ssn', function (e) {
              var code = e.keyCode || e.charCode
              if ((code >= 48 && code <= 57) || code == 8 || code == 9) {
                  if (this.value != "" & this.value.length == 4) {
                      $("#validation_" + this.id).remove();
                      $(this).css('border-color', 'black');
                  } else {
                      $(this).css('border-color', 'red');

                      if (this.value.length < 4) {
                          $("#validation_" + this.id).is(":visible") ? null : $('<br/><small id=validation_' + this.id + ' style="color: red;font-size:105%;font-weight:bold">Please enter proper SSN number</small>').insertAfter("#" + this.id);
                      } else {
                          $("#validation_" + this.id).is(":visible") ? null : $('<br/><small id=validation_' + this.id + ' style="color: red;font-size:105%;font-weight:bold">This field is required</small>').insertAfter("#" + this.id);
                      }

                  }
              } else {
                  e.preventDefault();
              }
          });
          $(document).on('change', '.radio', function () {
              $(this).siblings('label').hasClass('radio_incomplete') ? $(this).closest('.radio__container').find('label').removeClass('radio_incomplete') : null;

              if (this.name == 'drivers_license_flg')
                  $('#validation_drivers_license_flg_div').css('display', 'none');

              if (this.name == 'issued_license_flg')
                  $('#validation_issued_license_flg_div').css('display', 'none');

              if (this.name == 'personal_phy_flag')
                  $('#validation_personal_phy_flag_div').css('display', 'none');
          });
          $(document).on('blur', '#p_six_ssn', function (e) {
              if (this.value != "" && this.value.length == 4) {
                  $("#validation_" + this.id).remove();
                  $(this).css('border-color', 'black');
              } else if (this.value.length == 0) {
                  $(this).css('border-color', 'red');
                  $("#validation_" + this.id).is(":visible") ? null : $('<br/><small id=validation_' + this.id + ' style="color: red;font-size:105%;font-weight:bold">' + ErrorMsg.ssn[this.id] + '</small>').insertAfter("#" + this.id);
              }
          })

          $(document).on('keyup', '#driving_license_number', function (e) {
              if (this.value.match(/[^a-zA-Z0-9 ]/g)) {
                  this.value = this.value.replace(/[^a-zA-Z0-9 ]/g, '');
              }
          });
          $(document).on('keyup', '#driving_license_number', function (e) {
              // var code = e.keyCode || e.charCode
              // if ((code >= 48 && code <= 57) || code == 8 || code == 9) {
              if (this.value != "") {
                  $("#validation_" + this.id).remove();
                  $(this).css('border-color', 'black');
              } else {
                  $(this).css('border-color', 'red');
                  $("#validation_" + this.id).is(":visible") ? null : $('<br/><small id=validation_' + this.id + ' style="color: red;font-size:105%;font-weight:bold;">This field is required</small>').insertAfter("#" + this.id);
              }
              // } else {
              //     e.preventDefault();
              // }
          });

          $(document).on('blur', '#driving_license_number', function (e) {
              if (this.value != "") {
                  $("#validation_" + this.id).remove();
                  $(this).css('border-color', 'black');
              } else {
                  $(this).css('border-color', 'red');
                  $("#validation_" + this.id).is(":visible") ? null : $('<br/><small id=validation_' + this.id + ' style="color: red;font-size:105%;font-weight:bold">' + ErrorMsg.ssn['answer'] + '</small>').insertAfter("#" + this.id);
              }
          });

          $(document).on('change', '.radio', function () {
              $(this).siblings('label').hasClass('radio_incomplete') ? $(this).closest('.radio__container').find('label').removeClass('radio_incomplete') : null;
          });

          // ******************************* show hide on checkbox *****************
          $(document).on('change', 'input[name=drivers_license_flg]', function () {

              if ($(this).val() == 1) {
                  // user_data.drivers_license_flg = 1;

                  $('.dl_flag').show();
                  $('.issued_license_flg').hide();
              } else {
                  // user_data.drivers_license_flg = 0;
                  if (($('input[name = "drivers_license_flg"]:checked').val()) == 2) {
                      $('.driving_state_err').css('display', 'none')
                  }
                  $('.dl_flag').hide();
                  $('.issued_license_flg').show();
                  $("#driving_license_number").val('');

              }
          })

          $(document).on('change', '#dl_state', function () {
              if ($('#dl_state option:selected').val() != '') {
                  // validation_flag = true;
                  $('#dl_state option:selected').parent('select').prev('.select-side').css('cssText', 'border: 2px solid black !important; border-left: 0 !important');
                  $('#dl_state option:selected').parent('select').css('cssText', 'border: 2px solid black !important');
                  $('.driving_state_err').css('display', 'none')
              } else {
                  $('#dl_state option:selected').parent('select').prev('.select-side').css('cssText', 'border: 2px solid red !important; border-left: 0 !important;');
                  $('#dl_state option:selected').parent('select').css('cssText', 'border: 2px solid red !important');
                  $('.driving_state_err').css('display', 'block')

              }

          })
          // $(document).on('change', 'input[name=issued_license_flg]', function () {

          //     if ($(this).val() == 1) {
          //         user_data.issued_license_flg = 1;

          //     } else {
          //         user_data.issued_license_flg = 0;

          //     }
          // })
          $(document).on('change', 'input[name=personal_phy_flag]', function () {
              if ($(this).val() == 1) {
                  $('.personal_phy_flag').show();
              } else {
                  $('.personal_phy_flag').hide();
              }
          })
          // ******************************* show hide on checkbox *****************

          $(document).on('change', '#checkbox', function () {
              if (this.checked) {
                  $('#chkbox_div_wrap').css('display', 'none')
                  $('#checkbox').siblings('label').css('border', '2px solid #ccc')
              } else {
                  $('#chkbox_div_wrap').css('display', 'block')
                  $('#checkbox').siblings('label').css('border', '2px solid red')
              }
          });
    }

    rule_engine_call = () => {
        var self = this;
        let user_data = JSON.parse(sessionStorage.getItem('user_data'))
        var nicotine = user_data.tobbacouse == 0 ? "No" : "Yes"
        // var param1 = '' + user_data.aff2 + '#' + cookie.load('visit_id') + '#1#{FirstName:\"' + user_data.first_name + '\",LastName:\"' + user_data.last_name + '\",MiddleName:\"\",SSN:\"' + user_data.ssn + '\",Gender:\"' + user_data.gender + '\",DOB:\"' + user_data.dob + '\",State:\"' + user_data.state + '\",ZipCode:\"' + user_data.zipcode + '\",DriverslicenseState:\"' + user_data.drivers_license_state + '\", DriverslicenseNumber:\"' + user_data.drivers_license_no + '\",Address_id:\"\",House:\"' + user_data.home_address + '\",Street:' + user_data.apt_no + ',Apartment:\"\",City:\"' + user_data.city + '\"}'
        var param = "" + user_data.aff2 + "#" + cookie.load('visit_id') + "#1#{FirstName:\'" + user_data.first_name + "\',LastName:\'" + user_data.last_name + "\',MiddleName:\'\',SSN:\'" + user_data.ssn + "\',Gender:\'" + user_data.gender + "\',DOB:\'" + user_data.dob + "\',State:\'" + user_data.state + "\',ZipCode:\'" + user_data.zipcode + "\',DriverslicenseState:\'" + user_data.drivers_license_state + "\',Height:\'" + user_data.height + "\', Weight:\'" + user_data.weight + "\',NicotineUse:\'" + nicotine + "\', DriverslicenseNumber:\'" + user_data.drivers_license_no + "\',Address_id:\'\',House:\'" + user_data.home_address + "\',Street:\'" + user_data.apt_no + "\',Apartment:\'\',City:\'" + user_data.city + "\',email:\'" + user_data.email + "\',phno:\'" + user_data.phone_number + "\'}";
        console.log(" params for web socket " + param)
        console.log("IP for web socket " + ApiList.current.decision_api_ws)

        // const script = document.createElement("script");
        // script.src = "socket.io.js";
        // script.async = true;
        // ApiList.current.decision_api_ws
        var socket = io.connect(ApiList.current.decision_api_ws, { secure: true });
        // io.set('origins', ApiList.current.decision_api_ws);
        // io.origins(ApiList.current.decision_api_ws);
        // console.log("Sending msg to server: Hello server");
        // var param = "ARC5368TI571#855#1#{FirstName:\'BASECASE8\',LastName:\'JOHNSON\',MiddleName:\'W\',SSN:\'666442143\',Gender:\'1\',DOB:\'04/21/1976\',State:\'AK\',ZipCode:\'99501\',DriverslicenseState:\'AK\', DriverslicenseNumber:\'7079076\',Address_id:\'\',House:\'1017\',Street:\'E 13TH AVE\',Apartment:\'\',City:\'ANCHORAGE\'}";
        socket.emit('msg', param)



        socket.on("msg2", function (msg) {
            console.log("Request Submitted ", msg);
            if (msg == "Welcome") {
                // alert(self.state.current_page_index)
                var screen_id = PageMapper.getNextPageId(parseInt(self.state.current_page_index) + 1);
                sessionStorage.setItem('current_index', (parseInt(self.state.current_page_index) + 1));
                window.location.href = PageMapper.getPageURL(screen_id);
            }
        })

        // document.body.appendChild(script);

        // var connection = new WebSocket(ApiList.current.decision_api_ws);
        // connection.onopen = function () {
        //     console.log('Connected!');
        //     console.log(param);
        //     connection.send(param); // Send the message 'Ping' to the server
        //     var screen_id = PageMapper.getNextPageId(parseInt(self.state.current_page_index) + 1);
        //     sessionStorage.setItem('current_index', (parseInt(self.state.current_page_index) + 1));
        //     window.location.href = PageMapper.getPageURL(screen_id);

        // };

        // // Log errors
        // connection.onerror = function (error) {
        //     console.log('WebSocket Error ' + JSON.stringify(error));
        // };

        // // Log messages from the server
        // connection.onmessage = function (e) {
        //     console.log('Server: ' + e.data);
        //     var screen_id = PageMapper.getNextPageId(parseInt(self.state.current_page_index) + 1);
        //     sessionStorage.setItem('current_index', (parseInt(self.state.current_page_index) + 1));
        //     window.location.href = PageMapper.getPageURL(screen_id);
        // };
    }

    link_hippa_click = () => {
        console.log(moment().tz("America/New_York").format());

    //    console.log(moment.tz("2012-11-04 00:59:59", "America/New_York"); );

console.log(moment.utc().format('YYYY-MM-DD HH:mm:ss'));

        this.setState({
            hippa_link_click_flag: 1
        })
        console.log(ApiList.current.base_api_url + ApiList.page_six.hippa_flag + "/" + cookie.load('visit_id') + "/" + (cookie.load('aff2') ? cookie.load('aff2') : user_data.aff2));

        $.ajax({
            url: ApiList.current.base_api_url + ApiList.page_six.hippa_flag + "/" + cookie.load('visit_id') + "/" + (cookie.load('aff2') ? cookie.load('aff2') : user_data.aff2),
            type: 'GET',
            headers: {
                        
                        'Content-Type': 'application/json'
            },
            success: (data) => {
                console.log('hippa flag res >>' + JSON.stringify(data));

            },
            error: (err) => {
                console.log("ERROR in hippa flag " + JSON.stringify(err));
            }
        })



    }
    validate_form = () => {

        var validation_flag = true;

        if ($('#checkbox').is(":checked")) {
            $('#checkbox').siblings('label').css('border', '2px solid #ccc')
            // $("#validation_checkbox").remove();
            $('#chkbox_div_wrap').css('display', 'none');
        } else {
            $('#checkbox').siblings('label').css('border', '2px solid red')
            // $("#validation_checkbox").is(":visible") ? null : $('<small id="validation_checkbox" style="color: red;">This field is required</small>').insertAfter("#611_div");
            validation_flag = false;
            $('#chkbox_div_wrap').css('display', 'block')
        }

        //FOR EMPTY FIELD VALIDATION & MAKE BOXES RED
        $('input[type=text]:visible:enabled').map(function () {
            if (this.id == "p_six_ssn") {
                if (this.value != "" && this.value.length == 4) {
                    $(this).css('border', '2px solid black');
                } else {
                    validation_flag = false;
                    $(this).css('border', '2px solid red');
                    $("#validation_" + this.id).is(":visible") ? null : $('<br> <small id=validation_' + this.id + ' style="color: red;font-weight:bold;font-size:105%">' + ErrorMsg.ssn['p_six_ssn'] + '</small>').insertAfter("#" + this.id);

                }
            } else if (this.id == "driving_license_number") {
                if (this.value != '') {
                    $(this).css('border', '2px solid black');
                } else {
                    validation_flag = false;
                    $(this).css('border', '2px solid red');
                    $("#validation_" + this.id).is(":visible") ? null : $('<br> <small id=validation_' + this.id + ' style="color: red;font-weight:bold;font-size:105%">' + ErrorMsg.ssn['driving'] + '</small>').insertAfter("#" + this.id);
                }
            } else {
                if (this.value != '') {
                    $(this).css('border', '2px solid black');
                } else {
                    validation_flag = false;
                    $(this).css('border', '2px solid red');
                    $("#validation_" + this.id).is(":visible") ? null : $('<br> <small id=validation_' + this.id + ' style="color: red;font-weight:bold;font-size:105%">' + ErrorMsg.ssn['answer'] + '</small>').insertAfter("#" + this.id);

                }
            }
        });

        $('input[type=radio]:visible').map(function () {
            if ($("input[name = " + this.name + "]").is(':checked')) {
                $(this).siblings('.radio__label').removeClass('radio_incomplete');
            } else {
                $(this).siblings('.radio__label').addClass('radio_incomplete');
                validation_flag = false;

            }
        });

        if ($('#dl_state').is(':visible')) {

            if ($('#dl_state option:selected').val() != '') {
                // validation_flag = true;
                $('#dl_state option:selected').parent('select').prev('.select-side').css('cssText', 'border: 2px solid black !important; border-left: 0 !important');
                $('#dl_state option:selected').parent('select').css('cssText', 'border: 2px solid black !important');
                $('.driving_state_err').css('display', 'none')

            } else {
                validation_flag = false;
                $('#dl_state option:selected').parent('select').prev('.select-side').css('cssText', 'border: 2px solid red !important; border-left: 0 !important;');
                $('#dl_state option:selected').parent('select').css('cssText', 'border: 2px solid red !important');
                $('.driving_state_err').css('display', 'block')

            }
        }

        if ($('input[name = "drivers_license_flg"]').is(':checked')) {
            $('input[name = "drivers_license_flg"]').siblings('.radio__label').removeClass('radio_incomplete');
            $('#validation_drivers_license_flg_div').css('display', 'none');
            if (($('input[name = "drivers_license_flg"]:checked').val()) == 2) {
                $('.driving_state_err').css('display', 'none')
            }
        } else {
            validation_flag = false;
            $('input[name = "drivers_license_flg"]').siblings('.radio__label').addClass('radio_incomplete');
            $('#validation_drivers_license_flg_div').css('display', 'block');
        }

        if ($('input[name = "issued_license_flg"]').is(':visible')) {
            if ($('input[name = "issued_license_flg"]').is(':checked')) {
                $('input[name = "issued_license_flg"]').siblings('.radio__label').removeClass('radio_incomplete');
                $('#validation_issued_license_flg_div').css('display', 'none');
            } else {
                validation_flag = false;
                $('input[name = "issued_license_flg"]').siblings('.radio__label').addClass('radio_incomplete');
                $('#validation_issued_license_flg_div').css('display', 'block');
            }
        }

        if (sessionStorage.getItem('agent_present_flag') == '1') {
            if ($('#email_sent_2_flag').val() == 1) {
                $('#email_consent_error').hide()
            } else {
                $('#email_consent_error').show()
                validation_flag = false;
            }
        }



        // if (!$('#page4_zipcode').val()) {
        //     validation_flag = false;
        // }



        console.log(validation_flag)
        return validation_flag;
    }

    render() {
        const { agent_flag, render_page, aff2 } = this.state;
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
                    <div className="spinner" style={{ display: "none" }}>
                        {/* <div className="blob1 blob-01"></div>
                        <div className="agendabold32 loader_text" style={{ color: '#FDFDFD' }}>Please wait ...</div> */}

                        <img id="loading" src={loder_img} />
                        <img className="loader_logo" src={loder_logo} />
                    </div>

                    < Header display_menu={false} />
                    {agent_flag == 1 ? <AgentSection /> : null}

                    <div id="section1" className="col-md-12 section1_1 text-left section">
                        <div className="container mt2" style={{ color: 'black' }}>
                            <div className="col-md-12 text-center fgsd14" id="600">
                            </div>
                            <h1 className="col-md-8 col-md-offset-2 text-center mt1 mb2 agendabold43" id="601" style={{ lineHeight: 1.0 }}>
                                <br />

                            </h1>
                            <div className="col-md-7 col-md-offset-3">
                                <ul className="nav nav-tabs user_tab " id="myTab">
                                    <div className="liner1"></div>
                                    <li className="">
                                        <Link to="#home" data-toggle="tab">
                                            <span className="round-tabs one agendabold42">
                                                <img src={right_sign} style={{ width: '50px', marginLeft: '-2px', marginTop: '-5px' }} alt="" />
                                            </span>
                                        </Link>
                                        <div className="bottom_line"></div>
                                        <div className="text-center fgsd14 mt3 bottom_text">About you</div>
                                    </li>
                                    <li className="center_line"> <hr style={{ marginTop: '56%', borderTop: '2px solid #BBBBBB' }} /> </li>
                                    <li className="active"><Link to="#profile" data-toggle="tab">
                                        <span className="round-tabs two agendabold42" id="602">
                                            2
                     </span>
                                    </Link>
                                        <div className="bottom_line"></div>
                                        <div className="text-center fgsd14 mt3 bottom_text" id="5005">Your personal history</div>
                                    </li>
                                    <li className="center_line"> <hr style={{ marginTop: '56%', borderTop: '2px solid #BBBBBB' }} /> </li>
                                    <li><Link to="#messages" data-toggle="tab">
                                        <span className="round-tabs three agendabold42" id="">
                                            3
                     </span> </Link>
                                        <div className="bottom_line"></div>
                                        <div className="text-center fgsd14 mt3 bottom_text" id="703">Your beneficiaries</div>
                                    </li>
                                    <li className="center_line"> <hr style={{ marginTop: '56%', borderTop: '2px solid #BBBBBB' }} /> </li>
                                    <li><Link to="#" data-toggle="tab">
                                        <span className="round-tabs four agendabold42" id="1004">
                                            4
                         </span>
                                    </Link>
                                        <div className="bottom_line"></div>
                                        <div className="text-center fgsd14 mt3 bottom_text" id="1005">Sign & pay</div> </li>
                                </ul>
                            </div>
                            <div className="tab-content ">
                                <div className="tab-pane fade in active" id="profile" style={{ color: 'black' }}>
                                    <div className="col-md-12 mt3">
                                        <div className="col-md-8 col-md-offset-2 mt4 text-center"><span className="ltr20" id="604"></span></div>
                                        <div className="col-md-4 col-md-offset-4 text-left mt3 px8">
                                            <ul className="list-unstyled six_ul_padding">
                                                <li className="mt4 fgsd14 tt" id="605"></li>
                                                <li style={{}}><input type="text" maxlength="4" id="p_six_ssn" name="p_six_ssn" /></li>
                                                <li className="mt5 fgsd14 tt" id="606"></li>
                                                <li className="mt2 mb3">  <div className="radio__container" >
                                                    <div className="radio-inline fgsd18">
                                                        <input className="radio" id="aw1" name="drivers_license_flg" type="radio" value="1" />
                                                        <label style={{ fontWeight: 'unset' }} className="radio__label" for="aw1" id="607"></label>
                                                    </div>
                                                    <div className="radio-inline fgsd18">
                                                        <input className="radio" id="aw2" name="drivers_license_flg" type="radio" value="2" />
                                                        <label style={{ fontWeight: 'unset' }} className="radio__label" for="aw2" id="608"></label>
                                                    </div>

                                                </div>
                                                    <div className="col-md-12" id="validation_drivers_license_flg_div" style={{ display: 'none', padding: 0 }}>
                                                        <small style={{ color: 'red', fontWeight: 'bold', fontSize: "105%" }}>{ErrorMsg.ssn['answer']}</small>
                                                    </div>

                                                </li>

                                                <li className="mt5 fgsd14 dl_flag tt" id="609"></li>
                                                <li className="dl_flag"><input type="text" id="driving_license_number" name="driving_license_number" /></li>
                                                <li className="mt5 fgsd14 dl_flag tt" id="610"></li>
                                                <li className="dl_flag"><div className="rail-select">
                                                    <div className="select-side">
                                                        <img src={drop_arrow} alt="" />
                                                    </div>
                                                    <select className="form-control" id="dl_state" name="dl_state">
                                                    </select>
                                                </div></li>
                                                <li className="driving_state_err" style={{ display: "none" }}> <small style={{ color: "red", fontWeight: "bold", fontSize: "105%" }}>Please enter driver's license state</small> </li>
                                                <li className="mt5 fgsd14 tt issued_license_flg" id="">have you ever been issued <span className="tt">driver's license</span></li>

                                                <li className="mt2 mb3 issued_license_flg">
                                                    <div className="radio__container" >
                                                        <div className="radio-inline fgsd18">
                                                            <input className="radio" id="idl1" name="issued_license_flg" type="radio" value="1" />
                                                            <label style={{ fontWeight: 'unset' }} className="radio__label" for="idl1" id="">Yes</label>
                                                        </div>
                                                        <div className="radio-inline fgsd18">
                                                            <input className="radio" id="idl2" name="issued_license_flg" type="radio" value="2" />
                                                            <label style={{ fontWeight: 'unset' }} className="radio__label" for="idl2" id="">No</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12" id="validation_issued_license_flg_div" style={{ display: 'none', padding: 0 }}>
                                                        <small style={{ color: 'red', fontWeight: 'bold', fontSize: "105%" }}>{ErrorMsg.ssn['answer']}</small>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-md-6 col-md-offset-3 mt3 fgsd14">
                                            <div className="col-md-12 fgsd16">Please review the following important Disclosures, and click to indicate your agreement:</div>
                                            <ul className="pdf_links col-md-12">
                                                <li><span style={{ textDecoration: "underline", cursor: "pointer" }} type="button" class="fgsd16" data-toggle="modal" data-target="#Authorization_to_Obtain_and_Disclose_Information">Authorization to Obtain and Disclose Information</span></li>
                                                <li><span style={{ textDecoration: "underline", cursor: "pointer" }} type="button" class="fgsd16" data-toggle="modal" data-target="#eDelivary_Consent">eDelivery Consent</span></li>
                                                <li><span style={{ textDecoration: "underline", cursor: "pointer" }} type="button" class="fgsd16" data-toggle="modal" data-target="#HIPAA_Authorization">HIPAA Authorization</span></li>
                                                <li><span style={{ textDecoration: "underline", cursor: "pointer" }} type="button" class="fgsd16" data-toggle="modal" data-target="#privacy_notice">Privacy Notice</span></li>
                                                <li><span style={{ textDecoration: "underline", cursor: "pointer" }} type="button" class="fgsd16" data-toggle="modal" data-target="#Notice_to_Consumers">Notice to Consumers</span></li>
                                            </ul>
                                        </div>
                                        {agent_flag == 1 ? null :
                                            <div className="col-md-10 page_six_disclamer_box col-md-offset-1"  >
                                                <div className="fgsd12" style={{ border: "2px solid black", padding: "15px", height: "150px", overflow: "auto" }} id="1125">
                                                    <p className="fgsb14">I authorize any physician, hospital, pharmacy, pharmacy benefit manager, health insurance plan or any other entity that possesses any diagnosis, treatment, prescription or other medical information about me to furnish such health information to TIAA-CREF Life Insurance Company for the purpose of evaluating my eligibility for insurance. This authorization overrides any restrictions that I may have in place with any entity regarding the release of my medical information. Health information obtained will not be re-disclosed without my authorization unless permitted by law, in which case it may not be protected under federal privacy rules. This authorization shall be valid for two years from this date and may be revoked by sending written notice to TIAA-CREF Life Insurance Company.</p>
                                                </div>
                                            </div>
                                        }
                                        <div className="col-md-12 mb3 mt4">
                                            <div className="col-md-8 round col-md-offset-2">
                                                <div className="col-md-1 col-md-offset-1 pd0"><input onClick={this.link_hippa_click} type="checkbox" id="checkbox" style={{ width: 26 }} />
                                                    <label for="checkbox"></label></div>
                                                <div className="col-md-9 fgsd16" style={{ padding: '0 3px' }} id="611">I have reviewed, understand and agree to the terms of     each of the disclosures above.</div>
                                            </div>
                                            <div id='chkbox_div_wrap' className="col-md-8 round col-md-offset-3" style={{ padding: 0, display: 'none' }}>
                                                <small style={{ color: 'red', fontSize: "105%", fontWeight: "bold" }}>{ErrorMsg.ssn['check_box']}</small>
                                            </div>
                                        </div>
                                        <div className="col-md-12 text-center mt2 mb3">
                                            <button className="btn cbtn responsive_button tt" id="612"> </button>&nbsp;&nbsp;&nbsp;
                                        <div className="btn cbtn_color responsive_button page6_next_save tt" id="613"></div>
                                            <div className="col-md-12 col-xs-12 text-center mt2" id="email_consent_error" style={{ display: 'none' }}>
                                                <span className="fgsd14" style={{ color: "red" }}>Please send consent email to continue.</span>
                                            </div>
                                            <div className="col-md-12 col-xs-12 text-center mt2 mb2" id="validation_page_six" style={{ display: 'none' }}>
                                                <span className="fgsd14" style={{ color: "red" }}>Please complete all required fields to continue.</span>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12 fgsd16 text-right tt display_afficiency_id" id="display_afficiency_id">Afficiency Id : {aff2}</div>
                    {/* model box */}
                    <div id="Authorization_to_Obtain_and_Disclose_Information" class="modal fade" role="dialog">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-body text-left" style={{ padding: "15px !important" }}>
                                    <span className="fgsb20" style={{ color: "rgba(226, 22, 42, 1)" }}></span><button type="button" className="close" style={{ position: "absolute", right: "20px", opacity: 1 }} data-dismiss="modal"><img src={close_model} alt="" style={{ width: "30px", height: "31px" }} /></button>
                                    <embed src={Authorization_to_Obtain_and_Disclose_Information} width="100%" height="800" style={{ marginTop: 50 }} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="eDelivary_Consent" class="modal fade" role="dialog">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-body text-left" style={{ padding: "15px !important" }}>
                                    <span className="fgsb20" style={{ color: "rgba(226, 22, 42, 1)" }}></span><button type="button" className="close" style={{ position: "absolute", right: "20px", opacity: 1 }} data-dismiss="modal"><img src={close_model} alt="" style={{ width: "30px", height: "31px" }} /></button>
                                    <embed src={eDelivary_Consent} width="100%" height="800" style={{ marginTop: 50 }} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="HIPAA_Authorization" class="modal fade" role="dialog">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-body text-left" style={{ padding: "15px !important" }}>
                                    <span className="fgsb20" style={{ color: "rgba(226, 22, 42, 1)" }}></span><button type="button" className="close" style={{ position: "absolute", right: "20px", opacity: 1 }} data-dismiss="modal"><img src={close_model} alt="" style={{ width: "30px", height: "31px" }} /></button>
                                    <embed src={HIPAA_Authorization} width="100%" height="800" style={{ marginTop: 50, cursor: 'default' }} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="privacy_notice" class="modal fade" role="dialog">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-body text-left" style={{ padding: "15px !important" }}>
                                    <span className="fgsb20" style={{ color: "rgba(226, 22, 42, 1)" }}></span><button type="button" className="close" style={{ position: "absolute", right: "20px", opacity: 1 }} data-dismiss="modal"><img src={close_model} alt="" style={{ width: "30px", height: "31px" }} /></button>
                                    <embed src={privacy_notice} width="100%" height="800" style={{ marginTop: 50 }} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="Notice_to_Consumers" class="modal fade" role="dialog">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-body text-left" style={{ padding: "15px !important" }}>
                                    <span className="fgsb20" style={{ color: "rgba(226, 22, 42, 1)" }}></span><button type="button" className="close" style={{ position: "absolute", right: "20px", opacity: 1 }} data-dismiss="modal"><img src={close_model} alt="" style={{ width: "30px", height: "31px" }} /></button>
                                    <embed src={Notice_to_Consumers} width="100%" height="800" style={{ marginTop: 50 }} />
                                </div>
                            </div>
                        </div>
                    </div>


                    <span id="ssn_attempt_msg_button" style={{ textDecoration: "underline", cursor: "pointer" }} type="button" class="" data-toggle="modal" data-target="#ssn_attempt_msg" hidden></span>
                    <div id="ssn_attempt_msg" class="modal fade" role="dialog">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-body text-center" style={{ padding: "15px !important" }}>
                                    <span style={{ fontSize: 40 }} className="glyphicon glyphicon-exclamation-sign" /><button type="button" className="close" style={{ position: "absolute", right: "20px", opacity: 1 }} data-dismiss="modal"><img src={close_model} alt="" style={{ width: "30px", height: "31px" }} /></button>
                                    <p className="fgsb20 mt5">Oops! Did you enter your details correctly? We were unable to verify your information. Please take another look.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    < Top_three_section />
                    < GiveCall />
                    < TAC />
                    <Footer />
                </GTM>
                :
                null
            )
        )
    }

}

const PageSixWithSocket = props => (
    <SocketContext.Consumer>
        {socket => <PageSix socket={socket} />}
    </SocketContext.Consumer>
)
export default PageSixWithSocket
