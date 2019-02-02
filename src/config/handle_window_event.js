
var exports = module.exports = {};
var Promise = require('bluebird');
var $ = require('jquery');
var cookie = require('react-cookies');
var PageMapper = require("./page_mapper");
var ApiList = require("./base.json")

var firstPassword;
var secondUserName;
var tokenGlobal;
var tokenGlobal1;
var tokenGlobalAfficient;

var p1 = require('./pe_json/p1.json');
var p20 = require('./pe_json/p20.json');
var p21 = require('./pe_json/p21.json');
var p40 = require('./pe_json/p40.json');
// alert(JSON.stringify(sessionStorage.getItem('user_data')))
try {
    let user_data = sessionStorage.getItem('user_data') ? JSON.parse(sessionStorage.getItem('user_data')) : {};
    // alert(JSON.stringify(user_data))
    exports.disable_back = function () {
        window.history.pushState(null, "", window.location.href);

        window.onpopstate = function () {
            window.history.pushState(null, "", window.location.href);
        };
    }

    exports.dropout_event = function (template_type, current_page_url) {
        user_data = sessionStorage.getItem('user_data') ? JSON.parse(sessionStorage.getItem('user_data')) : {};
        window.onbeforeunload = function (e) {
            //check for Navigation Timing API support
            if (window.performance) {
                // console.log("window.performance works fine on this browser" + performance.navigation.type);
            }


            // if (performance.navigation.type == 255 || performance.navigation.type == 0 || performance.navigation.type == 1 || performance.navigation.type == 2) {
            // return "testt";
            // } else {
            // if(true){
            // if (performance.navigation.type == 0 || performance.navigation.type == 2) {
            // NO API HIT FOR PAGE LAND & NAVIGATE
            // } else {
            //


            // if (sessionStorage.getItem('agent_present_flag') != "1") {
            user_data.url = ApiList.current.ui_url + '/' + current_page_url;
            user_data.call_us_at = "1800-000-111";
            user_data.email_template_type = template_type;
            user_data.visit_id = cookie.load('visit_id');
            user_data.aff2 = user_data.aff2 || user_data.aff1;
            user_data.agent_flag = sessionStorage.getItem('agent_present_flag') ? parseInt(sessionStorage.getItem('agent_present_flag')) : 0;
            user_data.distributor_id = sessionStorage.getItem('distributor_id');
            user_data.pe_journey_id = sessionStorage.getItem('pe_journey_id');
            user_data.current_index = sessionStorage.getItem('current_index');



            var datastring = {
                "app_data": user_data
            };

            console.log(JSON.stringify(datastring))
            // $.ajax({
            //     async: false,
            //     url: ApiList.current.base_api_url + ApiList.drop_out,
            //     type: 'POST',
            //     data: JSON.stringify(datastring),
            //     headers: {
            //         'Content-Type': "application/json"
            //     },
            //     success: (data) => {
            //         console.log("SAVE API::" + JSON.stringify(data))
            //     },
            //     error: (err) => {
            //         console.log("ERROR in quote " + JSON.stringify(err));
            //     }
            // });


            // }
            // }
        }
    }

    exports.page_three_comeback = function (visit_id, afficiency_id) {
        user_data = sessionStorage.getItem('user_data') ? JSON.parse(sessionStorage.getItem('user_data')) : {};
        var self = this;
        return new Promise(function (resolve, reject) {
            // if (sessionStorage.getItem('agent_flag') != '1') {
            if (visit_id != null) {
                var datastring = {
                    "app_data": {
                        "visit_id": visit_id,
                        "afficiency_id": afficiency_id,
                        // "agent_flag": sessionStorage.getItem('agent_present_flag') ? parseInt(sessionStorage.getItem('agent_present_flag')) : 0,
                        // "agent_id": sessionStorage.getItem('agent_present_flag') ? (parseInt(sessionStorage.getItem('agent_present_flag')) == 1 ? sessionStorage.getItem('agent_id') : null) : null
                    }
                }
                $.ajax({
                    url: ApiList.current.base_api_url + ApiList.retrive_app_data,
                    type: 'POST',
                    data: JSON.stringify(datastring),
                    headers: {
                        'Authorization': 'Bearer ' + tokenGlobal,
                        'Content-Type': "application/json"
                    },
                    success: (data) => {
                        console.log("CHKK:::::::" + JSON.stringify(data))
                        if (data.statusCode == 200) {
                            // 100 && 200  -  successful  GOT DATA
                            var user_json = JSON.parse(data.data)
                            sessionStorage.setItem('user_data', JSON.stringify(user_json));
                            sessionStorage.setItem('distributor_id', user_json.distributor_id);
                            sessionStorage.setItem('pe_journey_id', user_json.pe_journey_id);
                            sessionStorage.setItem('current_index', user_json.current_index);

                            cookie.save('visit_id', visit_id, { path: '/', maxAge: 365 * 86400 })
                            // get_journey_json();

                            resolve();

                            // sessionStorage.setItem('agent_id', $('.agent_id').val())
                            // sessionStorage.setItem('agent_present_flag', '1');

                            // var user_json = JSON.parse(data.data)
                            // window.location.href = user_json.url + '?visitId=0&aff2=' + $("#application_id").val();
                        }

                        // else if (data.statusCode == 301) {
                        //     // 301  -  policy exists with full coverage D
                        //     user_data.failure_code = 8;
                        //     sessionStorage.setItem('user_data', JSON.stringify(user_data))
                        //     window.location.href = "/life-insurance-application-call-now"
                        // } else if (data.statusCode == 302) {
                        //     // 302  -  please try after in 90 days
                        //     user_data.failure_code = 8;
                        //     sessionStorage.setItem('user_data', JSON.stringify(user_data))
                        //     window.location.href = "/life-insurance-application-call-now"
                        // } else if (data.statusCode == 303) {
                        //     // Existing application is expired D
                        //     user_data.failure_code = 10;
                        //     sessionStorage.setItem('user_data', JSON.stringify(user_data))
                        //     window.location.href = "/life-insurance-application-call-now"
                        // } else if (data.statusCode == 400 || data.statusCode == 401 || data.statusCode == 402 || data.statusCode == 406) {
                        //     // SYSTEM UNAVAILABLE
                        //     user_data.failure_code = 3;
                        //     sessionStorage.setItem('user_data', JSON.stringify(user_data))
                        //     window.location.href = "/life-insurance-application-call-now"
                        // } else {
                        //     var user_json = JSON.parse(data.data)
                        //     sessionStorage.setItem('user_data', JSON.stringify(user_json));
                        //     sessionStorage.setItem('distributor_id', user_json.distributor_id);
                        //     sessionStorage.setItem('pe_journey_id', user_json.pe_journey_id);
                        //     sessionStorage.setItem('current_index', user_json.current_index);

                        //     cookie.save('visit_id', visit_id, { path: '/', maxAge: 365 * 86400 })

                        //     resolve();
                        // }
                    },
                    error: (err) => {
                        console.log("ERROR in quote " + JSON.stringify(err));
                        reject();
                    }
                });
                //                                             },
                //                                             error: (err) => {
                //                                                 console.log("ERROR in save four application create " + JSON.stringify(err));
                //                                             }
                //                                         })

                //                                     },
                //                                     error: (err) => {
                //                                         console.log("ERROR in save four application create " + JSON.stringify(err));
                //                                     }
                //                                 })

                //                             },
                //                             error: (err) => {
                //                                 console.log("ERROR in save four application create " + JSON.stringify(err));
                //                             }
                //                         })
                //                     },
                //                     error: (err) => {
                //                         console.log("ERROR in save four application create " + JSON.stringify(err));
                //                     }
                //                 })

                //             },
                //             error: (err) => {
                //                 console.log("ERROR in save four application create " + JSON.stringify(err));
                //             }
                //         })

                //     },
                //     error: (err) => {
                //         console.log("ERROR in save four application create " + JSON.stringify(err));
                //     }
                // })
            } else {
                resolve();
            }
            // } else {
            //     resolve();
            // }
        });
    };

    exports.check_comeback = function (visit_id, afficiency_id) {
        user_data = sessionStorage.getItem('user_data') ? JSON.parse(sessionStorage.getItem('user_data')) : {};
        var self = this;
        return new Promise(function (resolve, reject) {
            if (sessionStorage.getItem('agent_flag') != '1') {
                if (visit_id != null && afficiency_id != null) {
                    var datastring = {
                        "user_data": {
                            "visit_id": visit_id,
                            "afficiency_id": afficiency_id,
                            "agent_flag": sessionStorage.getItem('agent_present_flag') ? parseInt(sessionStorage.getItem('agent_present_flag')) : 0,
                            "agent_id": sessionStorage.getItem('agent_present_flag') ? (parseInt(sessionStorage.getItem('agent_present_flag')) == 1 ? sessionStorage.getItem('agent_id') : null) : null
                        }
                    }
                    // console.log("WINDOW EVENT::");
                    console.log("WINDOW EVENT::" + (ApiList.current.base_api_url + ApiList.comeback_data) + "**&&**" + JSON.stringify(datastring))

                    $.ajax({
                        url: ApiList.current.base_api_url + ApiList.comeback_data,
                        type: 'POST',
                        data: JSON.stringify(datastring),
                        headers: {
                            'Authorization': 'Bearer ' + tokenGlobal,
                            'Content-Type': 'application/json'
                        },
                        success: (data) => {
                            console.log(JSON.stringify(data))
                            if (data.statusCode == 100 || data.statusCode == 200) {
                                // 100 && 200  -  successful  GOT DATA
                                var user_json = JSON.parse(data.data)
                                sessionStorage.setItem('user_data', JSON.stringify(user_json));
                                sessionStorage.setItem('distributor_id', user_json.distributor_id);
                                sessionStorage.setItem('pe_journey_id', user_json.pe_journey_id);
                                sessionStorage.setItem('current_index', user_json.current_index);

                                cookie.save('visit_id', visit_id, { path: '/', maxAge: 365 * 86400 })
                                // get_journey_json();

                                resolve();

                                // sessionStorage.setItem('agent_id', $('.agent_id').val())
                                // sessionStorage.setItem('agent_present_flag', '1');

                                // var user_json = JSON.parse(data.data)
                                // window.location.href = user_json.url + '?visitId=0&aff2=' + $("#application_id").val();
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
                            } else {
                                var user_json = JSON.parse(data.data)
                                sessionStorage.setItem('user_data', JSON.stringify(user_json));
                                sessionStorage.setItem('distributor_id', user_json.distributor_id);
                                sessionStorage.setItem('pe_journey_id', user_json.pe_journey_id);
                                sessionStorage.setItem('current_index', user_json.current_index);

                                cookie.save('visit_id', visit_id, { path: '/', maxAge: 365 * 86400 })

                                resolve();
                            }
                        },
                        error: (err) => {
                            console.log("ERROR in quote " + JSON.stringify(err));
                            reject();
                        }
                    });
                    //                                             },
                    //                                             error: (err) => {
                    //                                                 console.log("ERROR in save four application create " + JSON.stringify(err));
                    //                                             }
                    //                                         })

                    //                                     },
                    //                                     error: (err) => {
                    //                                         console.log("ERROR in save four application create " + JSON.stringify(err));
                    //                                     }
                    //                                 })

                    //                             },
                    //                             error: (err) => {
                    //                                 console.log("ERROR in save four application create " + JSON.stringify(err));
                    //                             }
                    //                         })
                    //                     },
                    //                     error: (err) => {
                    //                         console.log("ERROR in save four application create " + JSON.stringify(err));
                    //                     }
                    //                 })

                    //             },
                    //             error: (err) => {
                    //                 console.log("ERROR in save four application create " + JSON.stringify(err));
                    //             }
                    //         })

                    //     },
                    //     error: (err) => {
                    //         console.log("ERROR in save four application create " + JSON.stringify(err));
                    //     }
                    // })
                } else {
                    resolve();
                }
            } else {
                resolve();
            }
        });
    };

    exports.get_journey_json = function () {
        var self = this;
        return new Promise(function (resolve, reject) {

            user_data = sessionStorage.getItem('user_data') ? JSON.parse(sessionStorage.getItem('user_data')) : {};
            // alert(JSON.stringify(user_data))
            var datastring = {
                "pe_path_selection": {
                    "distributor_id": sessionStorage.getItem('distributor_id') ? parseInt(sessionStorage.getItem('distributor_id')) : null
                }
            };
            // console.log(JSON.stringify(datastring))
            // var journey_json = null;
            // $.ajax({
            //     url: ApiList.current.base_afficient_api_url + ApiList.journey_api,
            //     type: 'POST',
            //     data: JSON.stringify(datastring),
            //     headers: {
            //         'Content-Type': "application/json"
            //     },
            //     success: (data) => {

            // journey_json = data.xml_doc ? JSON.parse(data.xml_doc) : null;
            // console.log("SAVE API::" + JSON.stringify(data))
            // if (journey_json != null) {
            //     var journey_screen = journey_json.journey.screen;
            //     if (journey_screen.length > 0) {

            //         sessionStorage.setItem('journey_data', JSON.stringify(journey_json));
            //         sessionStorage.setItem('screen_length', journey_screen.length);
            //         sessionStorage.setItem('google_acc_id', data.google_acc_id);

            //         resolve();
            //     }
            // }
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

                    let ga_datastring = {
                        "distributor_ga": {
                            "distributor_id": sessionStorage.getItem('distributor_id'),
                            "distributor_url": ApiList.current.domain_name     //"ss.afficiency.com"//window.location.hostname
                        }

                    }
                    console.log(ApiList.current.base_afficient_api_url + ApiList.get_google_id)
                    console.log(JSON.stringify(ga_datastring))
                    $.ajax({
                        url: ApiList.current.base_afficient_api_url + ApiList.get_google_id,
                        type: 'POST',
                        data: JSON.stringify(ga_datastring),
                        headers: {
                            'Authorization': 'Bearer ' + tokenGlobalAfficient,
                            'Content-Type': "application/json"
                        },
                        success: (ga_data) => {
                            console.log("get json " + JSON.stringify(ga_data))
                            let data = {
                                'google_acc_id': ga_data.google_ac_id,
                                'container_id': ga_data.container_id
                            }
                            console.log(JSON.stringify(data))

                            if (sessionStorage.getItem('pe_journey_id') == '1') {
                                data['xml_doc'] = p1.get_path
                            } else if (sessionStorage.getItem('pe_journey_id') == '20') {
                                data['xml_doc'] = p20.get_path
                            } else if (sessionStorage.getItem('pe_journey_id') == '21') {
                                data['xml_doc'] = p21.get_path
                            } else if (sessionStorage.getItem('pe_journey_id') == '40') {
                                data['xml_doc'] = p40.get_path
                            }
                            console.log(JSON.stringify(data))

                            console.log("SAVE API::" + JSON.stringify(data))
                            journey_json = data.xml_doc ? data.xml_doc : null;
                            console.log("SAVE API::" + JSON.stringify(journey_json))
                            if (journey_json != null) {
                                var journey_screen = journey_json.journey.screen;
                                if (journey_screen.length > 0) {
                                    sessionStorage.setItem('journey_data', JSON.stringify(journey_json));
                                    sessionStorage.setItem('screen_length', journey_screen.length);
                                    sessionStorage.setItem('google_acc_id', data.google_acc_id);
                                    sessionStorage.setItem('container_id', data.container_id);
                                    resolve();
                                }
                            }
                        },
                        error: (err) => {
                            console.log("ERROR in quote " + JSON.stringify(err));
                            reject();
                        }
                    });
                },
                error: (err) => {
                    console.log("ERROR in save four application create " + JSON.stringify(err));
                }
            })
            //                                             },
            //                                             error: (err) => {
            //                                                 console.log("ERROR in save four application create " + JSON.stringify(err));
            //                                             }
            //                                         })

            //                                     },
            //                                     error: (err) => {
            //                                         console.log("ERROR in save four application create " + JSON.stringify(err));
            //                                     }
            //                                 })
            //                             },
            //                             error: (err) => {
            //                                 console.log("ERROR in save four application create " + JSON.stringify(err));
            //                             }
            //                         })
            //                     },
            //                     error: (err) => {
            //                         console.log("ERROR in save four application create " + JSON.stringify(err));
            //                     }
            //                 })

            //             },
            //             error: (err) => {
            //                 console.log("ERROR in save four application create " + JSON.stringify(err));
            //                 console.log("ERROR in " + ApiList.current.base_afficient_api_url + ApiList.pe_journey_api + JSON.stringify(err));
            //             }
            //         });
            //     },
            //     error: (err) => {
            //         console.log("ERROR in quote " + JSON.stringify(err));
            //         reject();
            //     }
            // });
        });
    }
    exports.save_to_app_data = function (app_data) {
      
        var sdatastring = {
            "app_data":app_data
        }
        sdatastring.app_data.redirection_url = window.location.hostname + window.location.pathname;
     console.log('This is the data i am sending to store app data on each page ::::'+ApiList.current.base_api_url + ApiList.drop_out +" -- "+ JSON.stringify(sdatastring))
        $.ajax({
            url: ApiList.current.base_api_url + ApiList.drop_out,
            type: 'POST',
            data: JSON.stringify(sdatastring),
            headers: {
                'Content-Type': "application/json"
            },
            success: function (data) {
              console.log("save app data " + JSON.stringify(data))
            },
            error: function (err) {
                // console.log("ERROR in quote " + JSON.stringify(err));
            }
        });
        // });
    
}


    exports.query = function (field, url) {
    var href = url ? url : window.location.href;
    var reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
    var string = reg.exec(href);
    return string ? string[1] : null;
};

exports.validate_redirection = function (page_index) {
    // alert(page_index)
    var current_page_index = sessionStorage.getItem('current_index');
    var user_data = JSON.parse(sessionStorage.getItem('user_data'));
    // alert(user_data.aff2)
    return new Promise(function (resolve, reject) {
        // alert(current_page_index)
        //CHECK PAGE JUMP

        if ((page_index == '0' || page_index == '1' || page_index == '2' || page_index == '3') && parseInt(current_page_index) <= 3) {
            var session_current_index = sessionStorage.getItem('current_index');
            var curr_page_index = page_index;

            if (Math.abs(curr_page_index - session_current_index) == 1) {
                sessionStorage.setItem('current_index', page_index);
                current_page_index = sessionStorage.getItem('current_index');
            } else if (Math.abs(curr_page_index - session_current_index) > 1) {
                window.location.href = '/';
            }
        }

        if (page_index != current_page_index) {
            if (current_page_index == '1' || current_page_index == '5') {
                //FETCH BY DESIGN
                var screen_id = PageMapper.getNextDesignId(parseInt(current_page_index));
                sessionStorage.setItem('current_index', (parseInt(current_page_index)));
                window.location.href = PageMapper.getPageURL(screen_id);
            } else {
                var screen_id = PageMapper.getNextPageId(parseInt(current_page_index));
                sessionStorage.setItem('current_index', (parseInt(current_page_index)));
                window.location.href = PageMapper.getPageURL(screen_id);
            }
        } else {
            resolve();
        }

    });
}

} catch (ex) {
    console.log(ex)
}
