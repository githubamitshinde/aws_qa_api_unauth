import React, { Component } from 'react';

import $ from 'jquery';
import Header from '../partials/header';
import ApiList from "../../config/base.json"
import PageMapper from "../../config/page_mapper";
import cookie from 'react-cookies'
import '../../css/income_shield/income_shield_one.css';

import "../../css/agent.css"

var Promise = require('bluebird');

var firstPassword;
var secondUserName;
var tokenGlobal;
var tokenGlobalAfficient;

export default class AgentLogin extends Component {
    constructor() {
        super();
        this.state = {
        }
    }

    componentDidMount() {
        var self = this;
        self.deleteAllCookies()
        $('body').css('background-color', '#00C3FF')
        $('.how_it_works').hide();
        $('.faq').hide()
        $(document).on('change', '#chk_new_quote', function (e) {
            if (this.checked) {
                $("#application_id").attr("disabled", "disabled");
            } else {
                $("#application_id").removeAttr("disabled");
            }
        })

        $(document).on('keyup', '#application_id', function (e) {
            if (this.value.length > 0) {
                $("#chk_new_quote").attr("disabled", "disabled");
            } else {
                $("#chk_new_quote").removeAttr("disabled");
            }

            // if(this.checked){
            //     $("#application_id").attr("disabled", "disabled");
            // }else{
            //     $("#application_id").removeAttr("disabled");
            // }
        })

    }

    validate_login_page = () => {
        var validation_flag = true;

        if ($(".agent_password").val() != "") {
            $(".agent_id").css('border-color', 'black');
            $("#validation_password").remove();
        } else {
            $(".agent_password").css('border-color', 'red');
            $("#validation_password").is(":visible") ? null : $('<small id=validation_password style="color: red;">This field is required</small>').insertAfter(".agent_password");
            validation_flag = false;
        }

        if ($(".agent_id").val() != "") {
            $(".agent_id").css('border-color', 'black');
            $("#validation_user_id").remove();
        } else {
            $(".agent_id").css('border-color', 'red');
            $("#validation_user_id").is(":visible") ? null : $('<small id=validation_user_id style="color: red;">This field is required</small>').insertAfter(".agent_id");
            validation_flag = false;
        }

        if ($("#application_id").val() == "" && !$("#chk_new_quote").is(":checked")) {
            $("#validation_application_id").is(":visible") ? null : $('<small id=validation_application_id style="color: red;">This field is required</small>').insertAfter("#application_id");
            $("#application_id").css('border-color', 'red');
            validation_flag = false;
            // $("#chk_new_quote").siblings('label').addClass('radio_incomplete')
            // chk_new_quote
        } else {
            $("#application_id").css('border-color', 'black');
            $("#validation_application_id").remove();

        }

        return validation_flag;
    }

    deleteAllCookies = () => {
        sessionStorage.clear();
        var cookies = document.cookie.split(";");

        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }

    }

    login_agent = () => {

        var _validate_agent_login = this.validate_agent_login;
        var _check_agent_comback = this.check_agent_comback;

        _validate_agent_login()
            .then(function () {
                if ($("#chk_new_quote").is(":checked")) {
                    $("#login_error_msg").is(':visible') ? $("#login_error_msg").css('display', 'none') : null;
                    sessionStorage.setItem('agent_id', $('.agent_id').val())
                    sessionStorage.setItem('agent_present_flag', '1');
                    window.location.href = '/';
                } else if ($("#application_id").val() != "") {
                    return _check_agent_comback();
                }
            })
            .catch((e) => {
                if (e.statusCode == 406) {
                    $("#login_error_msg").css('display', 'block')
                    $("#login_error_msg > span").text(e.message);
                } else if (e.statusCode == 404) {
                    //STATE IS INVALID
                    $("#state_comeback_msg").css('display', 'block')
                    $("#state_comeback_msg > span").text("State is invalid for entered data.");
                }
            })
    }

    check_agent_comback = () => {
        let user_data = sessionStorage.getItem('user_data') ? JSON.parse(sessionStorage.getItem('user_data')) : {};
        var self = this;
        return new Promise(function (resolve, reject) {

            let datastring = {
                "user_data": {
                    "visit_id": '0',
                    "afficiency_id": $("#application_id").val(),
                    "agent_flag": 1,
                    "agent_id": $('.agent_id').val()
                }
            }
            console.log("agent login >>" + JSON.stringify(datastring))
            $.ajax({
                url: ApiList.current.base_api_url + ApiList.comeback_data,
                type: 'POST',
                data: JSON.stringify(datastring),
                headers: {
                    'Authorization': 'Bearer ' + tokenGlobal,      //self.props.token,
                    'Content-Type': 'application/json'
                },
                success: (data) => {
                    console.log("agent_login res >>" + JSON.stringify(data));

                    // 100  -  continue current application D
                    // 200  -  successful D
                    // 301  -  policy exists with full coverage D

                    // 302  -  please try after in 90 days

                    // 303  -  Existing application is expired D
                    // 400  -  bad request
                    // 401  -  app data is not present
                    // 402  -  app data decryption failed
                    // 406  -  out_visitID id is null
                    // 404  -  STATE is not valid for current user
                    // 401  -  app data is not present continue with current application
                    // resolve();

                    if (data.statusCode == 100 || data.statusCode == 200) {

                        //REDIRECT TO LAST LEFT PAGE
                        sessionStorage.setItem('agent_id', $('.agent_id').val())
                        sessionStorage.setItem('agent_present_flag', '1');

                        var user_json = JSON.parse(data.data)

                        var visit_id = user_json.visit_id;

                        cookie.save('visit_id', visit_id, { path: '/', maxAge: 365 * 86400 })
                        sessionStorage.setItem('user_data', JSON.stringify(user_json));
                        sessionStorage.setItem('distributor_id', user_json.distributor_id);
                        sessionStorage.setItem('pe_journey_id', user_json.pe_journey_id);
                        sessionStorage.setItem('current_index', user_json.current_index);

                        window.location.href = user_json.url + '?visitId=' + visit_id + '&aff2=' + $("#application_id").val();

                        resolve();
                        // self.setjourneydata();
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
                    } else if (data.statusCode == 404) {
                        // SYSTEM UNAVAILABLE
                        user_data.failure_code = 11;
                        sessionStorage.setItem('user_data', JSON.stringify(user_data))
                        window.location.href = "/life-insurance-application-call-now"
                        resolve();
                    } else {
                        resolve();
                    }



                    // if (data.statusCode == 200) {
                    //     // APP DATA RECEIVED, THROW TO THAT PAGE |||| 200 - successful


                    //     resolve();
                    //     // self.setjourneydata();
                    // } 


                },
                error: (err) => {
                    console.log("ERROR in agent comback " + JSON.stringify(err));
                    reject();
                }
            })

        });
    }

    validate_agent_login = () => {
        var self = this;
        return new Promise(function (resolve, reject) {
            try {
                if (self.validate_login_page()) {
                    let datastring = {
                        "agent_data": {
                            "agent_id": $('.agent_id').val(),
                            "password": $('.agent_password').val()
                        }
                    }
                    console.log("agent login >>" + JSON.stringify(datastring) + "&&**&&" + tokenGlobalAfficient)
                    $.ajax({
                        url: ApiList.current.base_api_url + '/agent/login',
                        type: 'POST',
                        data: JSON.stringify(datastring),
                        headers: {
                            'Authorization': 'Bearer ' + tokenGlobal,      // self.props.token,
                            'Content-Type': 'application/json'
                        },
                        success: (data) => {
                            console.log("agent_login res >>" + JSON.stringify(data));
                            if (data.statusCode == 200) {
                                sessionStorage.setItem('distributor_id', data.distributorId);
                                resolve();
                                // self.setjourneydata();
                            } else {
                                reject(data);
                            }
                        },
                        error: (err) => {
                            console.log("ERROR in agent login  " + JSON.stringify(err));
                            reject();
                        }
                    })
                } else {

                }
            } catch (ex) {
                console.log(ex)
            }
        });
    }


    render() {
        return (
            <div>
                < Header display_menu={false} />
                <div className="col-md-12" style={{ backgroundColor: '#00C3FF' }}>
                    <div className="container agent_container">
                        <div className="col-md-12 agendabold42 text-center mt3">Agent Log in</div>
                        <div className="col-md-4 col-md-offset-4 mt6">
                            <div className="tt fgsd14 col-md-4" style={{ marginTop: '5%' }}>agent id :</div> <div className="col-md-8"><input type="text" className="agent_id" /></div>
                        </div>
                        <div className="col-md-4 col-md-offset-4 mt3">
                            <div className="tt fgsd14 col-md-4" style={{ marginTop: '5%' }}>password :</div> <div className="col-md-8"><input type="password" className="agent_password" /></div>
                        </div>
                        <div className="col-md-6 col-md-offset-3 mt3 text-center">
                            {/* <!-- <div className="col-md-5 fgsd14">APPLICATION ID #</div>
                                    <div className="col-md-2 fgsd14"></div>
                                    <div className="col-md-5 fgsd14">GET NEW QUOTE</div> --> */}
                            <div className="col-md-5 mt1"> <div className="col-md-12 fgsd14">APPLICATION ID #</div> <div className="mt3"><input className="mt3" type="text" id="application_id" name="application_id" /></div></div>
                            <div className="col-md-2 fgsd14 mt6 tt">or</div>
                            <div className="col-md-5 mt1"> <div className="fgsd14 col-md-12 tt">GET NEW QUOTE</div>
                                <div className="col-md-12 mt3"> <div className="round mt2"><input type="checkbox" id="chk_new_quote" name="chk_new_quote" style={{ width: '27px' }} />
                                    <label class="radio__label" for="chk_new_quote" ></label> <div className="fgsb18"></div></div></div>
                            </div>
                        </div>
                        <div className="col-md-12 text-center mb3 mt5">
                            <div onClick={this.login_agent} className="btn cbtn_color tt">log in</div>
                            <div className="col-md-12 col-xs-12 mt2" id="login_error_msg" style={{ display: 'none' }}>
                                <span className="fgsd14 ml4" style={{ color: "red" }}>Please enter correct credentials</span>
                            </div>
                            <div className="col-md-12 col-xs-12 mt2" id="state_comeback_msg" style={{ display: 'none' }}>
                                <span className="fgsd14 ml4" style={{ color: "red" }}>State is invalid for entered data.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}