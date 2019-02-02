import React, { Component } from 'react';
// import redis from "redis";
import PageMapper from '../config/page_mapper';
import EventMapper from "../config/handle_window_event";
import cookie from 'react-cookies'

import moment from 'moment';
import ApiList from "../config/base.json"
import $ from 'jquery';
import localIpUrl from 'local-ip-url';
import p1 from '../config/pe_json/p1.json'
import p20 from '../config/pe_json/p20.json'
import p21 from '../config/pe_json/p21.json'
import p40 from '../config/pe_json/p40.json'
// import querystring from 'query-string';

var aff0 = "";
var aff1 = 'ARC570TI9808';  //ARC570TI9808
var aff2 = "";
var visitor_id = 26;    //26

var firstPassword;
var secondUserName;
var tokenGlobal;
var tokenGlobalAfficient;

export default class JourneyPlanner extends Component {
    constructor() {
        super();
        this.state = {

        }
    }

    fetch_aff_zero = (browser_params) => {
        return new Promise(function (resolve, reject) {
            //1st FETCH AFF0
            // // ******************************* fetching ID aff0 aff1 visitor id *********************
            console.log(ApiList.current.base_api_url + ApiList.aff0_fetch)
        
            $.ajax({
                url: ApiList.current.base_api_url + ApiList.aff0_fetch,
                type: 'GET',
                headers: {

                    'Content-Type': 'application/json'
                },
                success: (data) => {

                    if (data != null && data != "") {

                        console.log("redis fetch rpop ress" + JSON.stringify(data))
                        aff0 = data;
                        if (cookie.load('cookie_id')) {
                        } else {
                            var vguid = guid() 
                            function guid() {

                                var nav = window.navigator;
                                var screen = window.screen;
                                var guid = nav.mimeTypes.length;
                                guid += nav.userAgent.replace(/\D+/g, '');
                                guid += nav.plugins.length;
                                guid += screen.height || '';
                                guid += screen.width || '';
                                guid += screen.pixelDepth || '';
                            
                                return guid;
                            };
                            cookie.save('cookie_id',vguid, { path: '/', maxAge: 365 * 86400 })
                        }

                        let datastring = {
                            "IN_cookie": cookie.load('cookie_id'),
                            "IN_IP": browser_params.ip_address,
                            "IN_Browser": browser_params.browser_name,
                            "IN_device": browser_params.deviceID,
                            "IN_source_id": "65656",
                            "IN_afficiency_ID": aff0
                        }
                        console.log(JSON.stringify(datastring))
                        console.log(ApiList.current.base_identiy_api_url + ApiList.identity_live_visitor)
                        resolve(datastring);
                    } else {
                        var user_data = sessionStorage.getItem('user_data') ? JSON.parse(sessionStorage.getItem('user_data')) : {};
                        user_data.failure_code = 3;
                        sessionStorage.setItem('user_data', JSON.stringify(user_data))
                        window.location.href = "/life-insurance-application-call-now"
                        reject();
                    }
                },
                error: (err) => {
                    console.log("ERROR in afficency id genrator" + JSON.stringify(err));
                    reject();
                }
            })
            // // ******************************* fetching ID aff0 aff1 visitor id ****************
        });
    }


    fetch_temp_arc = (browser_params, datastring) => {
        return new Promise(function (resolve, reject) {
            //2nd GET TEMP ARC_ID & JOURNEY ID
            // $.ajax({
            //     url: ApiList.current.base_identiy_api_url + ApiList.identity_live_visitor,
            //     type: 'POST',
            //     data: JSON.stringify(datastring),
            //     headers: {
            //         'Content-Type': "application/json"
            //     },
            //     success: (data) => {
            // console.log("identity live vistor >>> " + data);
            // if (data[0] != null && data[0] != "" && data[1] != null && data[1] != "") {
            if (aff0 != null && aff0 != '') {
                //   visitor_id = data[0];

                // aff1 = data[1];
                aff1 = aff0
                if (sessionStorage.getItem('user_data')) {
                    let user_data = JSON.parse(sessionStorage.getItem('user_data')) ? JSON.parse(sessionStorage.getItem('user_data')) : null;
                    user_data.aff0 = aff0;
                    user_data.aff1 = aff1;
                    user_data.visitor_id = 100
                    sessionStorage.setItem('user_data', JSON.stringify(user_data));
                } else {
                    let user_data = {
                        'aff0': aff0,
                        'aff1': aff1,
                        'visitor_id': 100,
                    }
                    sessionStorage.setItem('user_data', JSON.stringify(user_data));
                }
                // genrating journey_id
                var random_number = Math.floor(Math.random() * 100) + 1;
                var journey_id = sessionStorage.getItem('distributor_id') == 101 ? (random_number > 70 ? 20 : 1) : (random_number > 70 ? 40 : 21)
                // sessionStorage.setItem('pe_journey_id', journey_id);
                sessionStorage.setItem('pe_journey_id', 1);
                let datastring_visit = {
                    "visit": {
                        "visitor_id": visitor_id,
                        "cookie_id": cookie.load('cookie_id'),
                        // "session_id": "00001",
                        "pe_journey_id": journey_id,       //"1",
                        // "campaign": "xyz",
                        // "entry_timestamp": "2018-11-11 11:12:55",
                        // "exit_timestamp": "2018-11-11 11:12:57",
                        "ip_address": browser_params.ip_address,
                        // "device_type": "LAPTOP",
                        "browser_name": browser_params.browser_name,
                        "browser_version": browser_params.deviceID,
                        // "cookie_flag": "1",
                        // "isp_name": "acc",
                        // "isp_organisation": "bdi",
                        // "browser_language": "eng",
                        // "isp_postalcode": "12301",
                        // "isp_state": "R2008888888",
                        // "isp_city": "pune",
                        // "isp_country": "IN",
                        // "isp_longitude": "1969",
                        // "isp_latitude": "1900",
                        // "reference_url": "www.acc.com",
                        // "ml_flag": "1",
                        "distributor_id": sessionStorage.getItem('distributor_id'),
                    }
                }

                var rpm_id = EventMapper.query('rpm_id')
                if (rpm_id != null && rpm_id != "") {
                    rpm_id = rpm_id.toString();
                    var i = rpm_id.indexOf('?');
                    rpm_id = rpm_id.substring(0, i);
                    datastring_visit.visit.rpm_id = rpm_id
                }
                if (EventMapper.query('marketing_channel') != null && EventMapper.query('marketing_channel') != '') {
                    datastring_visit.visit.channel = EventMapper.query('marketing_channel')
                }
                if (EventMapper.query('campaign_code') != null && EventMapper.query('campaign_code') != '') {
                    datastring_visit.visit.campaign_code = EventMapper.query('campaign_code')
                }
                if (EventMapper.query('creative_code') != null && EventMapper.query('creative_code') != '') {
                    datastring_visit.visit.creative_code = EventMapper.query('creative_code')
                }
                if (EventMapper.query('creative_code_two') != null && EventMapper.query('creative_code_two') != '') {
                    datastring_visit.visit.creative_code_two = EventMapper.query('creative_code_two')
                }
                if (EventMapper.query('affiliate_code') != null && EventMapper.query('affiliate_code') != '') {
                    datastring_visit.visit.affiliate_code = EventMapper.query('affiliate_code')
                }
                console.log("datastring_visit create" + JSON.stringify(datastring_visit))
                resolve(datastring_visit);
            } else {
                var user_data = sessionStorage.getItem('user_data') ? JSON.parse(sessionStorage.getItem('user_data')) : {};
                user_data.failure_code = 3;
                sessionStorage.setItem('user_data', JSON.stringify(user_data))
                window.location.href = "/life-insurance-application-call-now"
            }
            //     },
            //     error: (err) => {
            //         console.log("ERROR in identityLiveVistor" + JSON.stringify(err));
            //         reject();
            //     }
            // })
        });
    }


    fetch_visit_id = (datastring_visit) => {
        return new Promise(function (resolve, reject) {
            console.log(ApiList.current.base_api_url + ApiList.visit_create)
            console.log("visit create data string ---" + JSON.stringify(datastring_visit))
            //IMP::** 3rd FETCHES VISIT ID
            $.ajax({
                url: ApiList.current.base_api_url + ApiList.visit_create,
                type: 'POST',
                data: JSON.stringify(datastring_visit),
                headers: {

                    'Content-Type': 'application/json'
                },
                success: (data) => {
                    console.log("visit id - "+ JSON.stringify(data))
                    cookie.save('visit_id', data.visit_id, { path: '/', maxAge: 365 * 86400 })
                    resolve();
                },
                error: (err) => {
                    console.log("ERROR in visit create  " + JSON.stringify(err));
                    reject();
                }
            })
        });
    }


    componentDidMount() {
        var self = this
        if (sessionStorage.getItem('agent_present_flag')) {

        } else {
            self.deleteAllCookies()
        }

        // ////////////// getting device id ////////
        var Sys = {};
        var ua = navigator.userAgent.toString().toLowerCase();
        var s;
        (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
            (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
                (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
                    (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
                        (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;

        // console.log("CHRME>> "+JSON.stringify(Sys.chrome))
        var deviceID = "";
        var browser_name = "";
        var ip_address = localIpUrl('public','ipv4'); // 127.0.0.1
        if (Sys.ie) { browser_name = 'IE'; deviceID = Sys.ie };
        if (Sys.firefox) { browser_name = 'Firefox'; deviceID = Sys.firefox };
        if (Sys.chrome) { browser_name = 'Chrome '; deviceID = Sys.chrome };
        if (Sys.opera) { browser_name = 'Opera '; deviceID = Sys.opera };
        if (Sys.safari) { browser_name = 'Safari'; deviceID = Sys.safari };
        console.log("browser name >> " + browser_name + "device id>> " + JSON.stringify(deviceID))
        // ///////////////// grttin device id ends///////////
        // $.ajax({
        //     type: 'GET',
        //     url: 'https://api.ipify.org?format=json',
        //     dataType: 'json',
        //     async: false,
        //     success: function (response) {
        //         ip_address = response.ip;
        //         console.log("IP address - " + response.ip)
        //     }
        // });


        if (EventMapper.query('distributor_id') != null) {
            sessionStorage.setItem('distributor_id', EventMapper.query('distributor_id'))
        }
        var browser_params = {
            'deviceID': deviceID,
            'ip_address': ip_address,
            'browser_name': browser_name
        };

        var _set_distributor_id = this.set_distributor_id;

        var _fetch_aff_zero = this.fetch_aff_zero;
        var _fetch_temp_arc = this.fetch_temp_arc;
        // var _fetch_visit_id = this.fetch_visit_id;

        var _fetch_by_pe_id = this.fetch_by_pe_id;
        var _get_json_by_distributor_id = this.get_json_by_distributor_id;

        var _datastring_visit = '';
        _set_distributor_id()
            .then(function () {
                return _fetch_aff_zero(browser_params);
            })
            .then(function (datastring) {
                return _fetch_temp_arc(browser_params, datastring);
            })
            .then(function (datastring_visit) {


                if (sessionStorage.getItem('pe_journey_id') != 'null')
                    return _fetch_by_pe_id(datastring_visit);
                else
                    return _get_json_by_distributor_id(datastring_visit);
            })
            // .then(function () {
            //     _datastring_visit.visit.pe_journey_id ? _datastring_visit.visit.pe_journey_id = sessionStorage.getItem('pe_journey_id') : null;
            //     console.log(JSON.stringify(_datastring_visit))
            //     return _fetch_visit_id(_datastring_visit);
            // })
            .catch(function () {
                var user_data = sessionStorage.getItem('user_data') ? JSON.parse(sessionStorage.getItem('user_data')) : {};
                // SYSTEM UNAVAILABLE
                user_data.failure_code = 3;
                sessionStorage.setItem('user_data', JSON.stringify(user_data))
                window.location.href = "/life-insurance-application-call-now"
            })
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


    get_json_by_pe_id = (datastring, visit_data_string) => {
        var self = this;
        var journey_json = null;
        let ga_datastring = {
            "distributor_ga": {
                "distributor_id": sessionStorage.getItem('distributor_id'),
                "distributor_url": window.location.hostname
            }

        }
        console.log(ApiList.current.base_afficient_api_url + ApiList.get_google_id)
        console.log(JSON.stringify(ga_datastring))
        $.ajax({
            url: ApiList.current.base_afficient_api_url + ApiList.get_google_id,
            type: 'POST',
            data: JSON.stringify(ga_datastring),
            headers: {

                'Content-Type': 'application/json'
            },
            success: (ga_data) => {
                console.log("get json " + JSON.stringify(ga_data))
 
                let data = {
                    'google_acc_id': ga_data.google_ac_id ? ga_data.google_ac_id : null,
                    'container_id': ga_data.container_id ? ga_data.container_id : null

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

                        self.fetch_visit_id(visit_data_string)
                            .then(() => {
                                sessionStorage.setItem('journey_data', JSON.stringify(journey_json));
                                sessionStorage.setItem('current_index', 0);
                                sessionStorage.setItem('screen_length', journey_screen.length);
                                // sessionStorage.setItem('distributor_id', data.distributor_id);  //here
                                sessionStorage.setItem('google_acc_id', data.google_acc_id);
                                sessionStorage.setItem('container_id', data.container_id);
                                window.location.href = PageMapper.getPageURL(journey_screen[0].screenID) + window.location.search;
                            })
                    }
                }
            },
            error: (err) => {
                console.log("ERROR in " + ApiList.current.base_afficient_api_url + ApiList.pe_journey_api + JSON.stringify(err));
            }
        });
    }

    get_json_by_distributor_id = (visit_data_string) => {
        var self = this;

        // alert(visit_data_string.visit.pe_journey_id +"**&&**"+ sessionStorage.getItem('pe_journey_id'))
        var datastring = {
            "pe_path_selection": {
                "distributor_id": sessionStorage.getItem('distributor_id') ? parseInt(sessionStorage.getItem('distributor_id')) : null
            }
        };
        console.log(JSON.stringify(datastring))
        console.log(ApiList.current.base_afficient_api_url + ApiList.journey_api)
        var journey_json = null;
        console.log('uhu', tokenGlobalAfficient);
        let ga_datastring = {
            "distributor_ga": {
                "distributor_id": sessionStorage.getItem('distributor_id'),
                "distributor_url":window.location.hostname
            }

        }
        console.log(ApiList.current.base_afficient_api_url + ApiList.get_google_id)
        console.log(JSON.stringify(ga_datastring))
        $.ajax({
            url: ApiList.current.base_afficient_api_url + ApiList.get_google_id,
            type: 'POST',
            data: JSON.stringify(ga_datastring),
            headers: {

                'Content-Type': 'application/json'
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
                console.log("xml doc API::" + JSON.stringify(data))
                journey_json = data.xml_doc ? JSON.parse(data.xml_doc) : null;
                // set pe_journey_id even when distibutor_id api is called
                data.pe_journey_id ? sessionStorage.setItem('pe_journey_id', data.pe_journey_id) : null;
                visit_data_string ? visit_data_string.visit.pe_journey_id = sessionStorage.getItem('pe_journey_id') : null;
                console.log("SAVE API::" + JSON.stringify(data))
                if (journey_json != null) {
                    var journey_screen = journey_json.journey.screen;
                    if (journey_screen.length > 0) {
                        self.fetch_visit_id(visit_data_string)
                            .then(() => {
                                sessionStorage.setItem('journey_data', JSON.stringify(journey_json));
                                sessionStorage.setItem('current_index', 0);
                                sessionStorage.setItem('screen_length', journey_screen.length);
                                sessionStorage.setItem('google_acc_id', data.google_acc_id);
                                sessionStorage.setItem('container_id', data.container_id);
                                window.location.href = PageMapper.getPageURL(journey_screen[0].screenID) + window.location.search;
                            })
                    }
                }
            },
            error: (err) => {
                console.log("ERROR in " + ApiList.current.base_afficient_api_url + ApiList.journey_api + + JSON.stringify(err));
            }
        });
    }

    fetch_by_pe_id = (visit_data_string) => {
        visit_data_string ? visit_data_string.visit.pe_journey_id = sessionStorage.getItem('pe_journey_id') : null;

        var agent_pe_id = sessionStorage.getItem('pe_journey_id') ? parseInt(sessionStorage.getItem('pe_journey_id')) : null;
        //IF AGENT LOGGED IN
        if (sessionStorage.getItem('agent_present_flag') == '1') {
            if (agent_pe_id != null) {
                var datastring = {
                    "pe_journey": {
                        "journey_id": agent_pe_id
                    }
                };

                this.get_json_by_pe_id(datastring, visit_data_string);
            } else {
                // redirect to error page
            }
        } else {
            //FOR NORMAL USERS
            // IF distributor_id IS PRESENT IN COMEBACK SCENARIO OR URL
            if (sessionStorage.getItem('distributor_id') != null) {

                // sessionStorage.setItem('distributor_id', EventMapper.query('distributor_id'))
                sessionStorage.setItem('rpm_id', EventMapper.query('rpm_id'))
                sessionStorage.setItem('marketing_channel', EventMapper.query('marketing_channel'))

                var datastring = {
                    "pe_journey": {
                        "journey_id": agent_pe_id
                    }
                };

                this.get_json_by_pe_id(datastring, visit_data_string);

            } else {
                // DIRECTLY COMMING TO WEBSITE
                var datastring = {
                    "pe_journey": {
                        "journey_id": agent_pe_id
                    }
                };
                this.get_json_by_pe_id(datastring, visit_data_string);
            }
        }
    }

    set_distributor_id = () => {
        return new Promise(function (resolve, reject) {
            //IF AGENT LOGGED IN
            if (sessionStorage.getItem('agent_present_flag') == '1') {
                sessionStorage.getItem('distributor_id') ? parseInt(sessionStorage.getItem('distributor_id')) : null;
                resolve();
            } else {
                //FOR USERS
                // IF distributor_id IS PRESENT IN COMEBACK SCENARIO OR URL

                if (sessionStorage.getItem('distributor_id') != null) {
                    // sessionStorage.setItem('distributor_id', EventMapper.query('distributor_id'))
                    if (sessionStorage.getItem('user_data')) {
                        var user_data = sessionStorage.getItem('user_data') ? JSON.parse(sessionStorage.getItem('user_data')) : {};
                        var rpm_id = EventMapper.query('rpm_id')
                        if (rpm_id != null && rpm_id != "") {
                            rpm_id = rpm_id.toString();
                            var i = rpm_id.indexOf('?');
                            rpm_id = rpm_id.substring(0, i);
                        }
                        user_data.rpm_id = rpm_id,
                            user_data.distributor_id = EventMapper.query('distributor_id'),
                            user_data.marketing_channel = EventMapper.query('marketing_channel'),
                            user_data.campaign_code = EventMapper.query('campaign_code'),
                            user_data.creative_code = EventMapper.query('creative_code'),
                            user_data.creative_code_two = EventMapper.query('creative_code_two'),
                            user_data.affiliate_code = EventMapper.query('affiliate_code')
                        sessionStorage.setItem('user_data', JSON.stringify(user_data))
                    } else {
                        var rpm_id = EventMapper.query('rpm_id')
                        if (rpm_id != null && rpm_id != "") {
                            rpm_id = rpm_id.toString();
                            var i = rpm_id.indexOf('?');
                            rpm_id = rpm_id.substring(0, i);
                        }
                        let user_data = {
                            "rpm_id": rpm_id,
                            "distributor_id": EventMapper.query('distributor_id'),
                            "marketing_channel": EventMapper.query('marketing_channel'),
                            "campaign_code": EventMapper.query('campaign_code'),
                            "creative_code": EventMapper.query('creative_code'),
                            "creative_code_two": EventMapper.query('creative_code_two'),
                            "affiliate_code": EventMapper.query('affiliate_code')
                        }
                        sessionStorage.setItem('user_data', JSON.stringify(user_data))

                    }
                    resolve();
                } else {
                    // DIRECTLY COMMING TO WEBSITE
                    sessionStorage.setItem('distributor_id', 101);
                    if (sessionStorage.getItem('user_data')) {
                        var user_data = sessionStorage.getItem('user_data') ? JSON.parse(sessionStorage.getItem('user_data')) : {};
                        var rpm_id = EventMapper.query('rpm_id')
                        if (rpm_id != null && rpm_id != "") {
                            rpm_id = rpm_id.toString();
                            var i = rpm_id.indexOf('?');
                            rpm_id = rpm_id.substring(0, i);
                        }
                        user_data.rpm_id = rpm_id,
                            user_data.distributor_id = EventMapper.query('distributor_id'),
                            user_data.marketing_channel = EventMapper.query('marketing_channel'),
                            user_data.campaign_code = EventMapper.query('campaign_code'),
                            user_data.creative_code = EventMapper.query('creative_code'),
                            user_data.creative_code_two = EventMapper.query('creative_code_two'),
                            user_data.affiliate_code = EventMapper.query('affiliate_code')
                        sessionStorage.setItem('user_data', JSON.stringify(user_data))
                    } else {
                        var rpm_id = EventMapper.query('rpm_id')
                        if (rpm_id != null && rpm_id != "") {
                            rpm_id = rpm_id.toString();
                            var i = rpm_id.indexOf('?');
                            rpm_id = rpm_id.substring(0, i);
                        }
                        let user_data = {
                            "rpm_id": rpm_id,
                            "distributor_id": EventMapper.query('distributor_id'),
                            "marketing_channel": EventMapper.query('marketing_channel'),
                            "campaign_code": EventMapper.query('campaign_code'),
                            "creative_code": EventMapper.query('creative_code'),
                            "creative_code_two": EventMapper.query('creative_code_two'),
                            "affiliate_code": EventMapper.query('affiliate_code')
                        }
                        sessionStorage.setItem('user_data', JSON.stringify(user_data))

                    }

                    resolve();
                }
            }
        });
    }



    render() {
        return (
            <div>
                {/* <span id="initial-msg">Loading...</span> */}
            </div>
        )
    }
}
