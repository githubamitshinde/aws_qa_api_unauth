import React, { Component } from 'react';
import $ from 'jquery';
import PageMapper from "../../config/page_mapper";

import '../../css/income_shield/income_shield_one.css';

import '../../css/faq/faq.css';
//import plus_circle from '../../images/SVG/plus_circle.svg';

import Header from '../partials/header';
import Footer from '../partials/footer';
import SectionTop from '../top_section/section_fourteen';
import GiveCall from '../others/give_call';
import Tandc from '../others/tandc';
import FaqSection from '../faq/faq_page'

import GTM from 'react-tag-manager'

import EventMapper from "../../config/handle_window_event";
//import bgimg from '../../images/iStock-904444770.jpg'
import ApiList from "../../config/base.json";
import SocketContext from '../../socket-context.js';
import cookie from 'react-cookies';
import ReactGA from 'react-ga';

var firstPassword;
var secondUserName;
var tokenGlobal;
var tokenGlobalAfficient;

class PageFourteen extends Component {
    constructor() {
        super();
        this.state = {
            current_page_index: sessionStorage.getItem('current_index'),
            render_page: false
        }
    }

    componentDidMount() {
        // var page_index = '13';

        // //CHECK PAGE JUMP
        // if (page_index != this.state.current_page_index) {
        //   if (this.state.current_page_index == '1') {
        //     //FETCH BY DESIGN
        //     var screen_id = PageMapper.getNextDesignId(parseInt(this.state.current_page_index));
        //     sessionStorage.setItem('current_index', (parseInt(this.state.current_page_index)));
        //     window.location.href = PageMapper.getPageURL(screen_id);
        // } else {
        //     var screen_id = PageMapper.getNextPageId(parseInt(this.state.current_page_index) + 1);
        //     sessionStorage.setItem('current_index', (parseInt(this.state.current_page_index) + 1));
        //     window.location.href = PageMapper.getPageURL(screen_id);
        // }
        // }

        //user drop out socket client code
        let user_data = sessionStorage.getItem('user_data') ? JSON.parse(sessionStorage.getItem('user_data')) : {};
        user_data.url = ApiList.current.ui_url + '/' + 'life-insurance-faq';//current_page_url;
        user_data.call_us_at = "1800-000-111";
        user_data.email_template_type = 'email_template_2'; //template_type;
        user_data.visit_id = cookie.load('visit_id');
        user_data.aff2 = user_data.aff2 || user_data.aff1;
        user_data.agent_flag = sessionStorage.getItem('agent_present_flag') ? parseInt(sessionStorage.getItem('agent_present_flag')) : 0;
        user_data.distributor_id = sessionStorage.getItem('distributor_id');
        user_data.pe_journey_id = sessionStorage.getItem('pe_journey_id');
        user_data.current_index = sessionStorage.getItem('current_index');
        var datastring = {
            "app_data": user_data
        };

        console.log(JSON.stringify(datastring));
        this.props.socket.emit('userInfo', datastring);
        //-------------------------------

        $(document).ready(function () {
            EventMapper.disable_back();
            //EventMapper.dropout_event('email_template_2', 'life-insurance-faq');
        });


        var self = this;

        var visit_id = EventMapper.query('visitId');
        var afficiency_id = EventMapper.query('aff2');

        //CHECK FOR COMEBACK DATA
        EventMapper.check_comeback(visit_id, afficiency_id)
            // .then(function () {
            //   return EventMapper.get_journey_json();
            // })
            .then(function () {
                //GET USER_DATA IF FETCHED FROM RHASH API
                var user_data = JSON.parse(sessionStorage.getItem('user_data'))

                self.setState({
                    render_page: true,
                    current_page_index: sessionStorage.getItem('current_index')
                }, function () {
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
                });
            });
    }

    render() {
        const { render_page } = this.state;
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
                    < Header display_menu={true} token={tokenGlobal} tokenA={tokenGlobalAfficient} />
                    <SectionTop token={tokenGlobal} tokenA={tokenGlobalAfficient} />
                    <FaqSection token={tokenGlobal} tokenA={tokenGlobalAfficient} />
                    <GiveCall token={tokenGlobal} tokenA={tokenGlobalAfficient} />
                    <Tandc token={tokenGlobal} tokenA={tokenGlobalAfficient} />
                    <Footer token={tokenGlobal} tokenA={tokenGlobalAfficient} />

                </GTM>
                : null)
        )
    }

}

const PageFourteenWithSocket = props => (
    <SocketContext.Consumer>
        {socket => <PageFourteen socket={socket} />}
    </SocketContext.Consumer>
)
export default PageFourteenWithSocket;
