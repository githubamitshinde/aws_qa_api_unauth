import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import Header from '../partials/header';
import PageFiveQuestion from '../questions/page_five_questions'
import Footer from '../partials/footer'
import GiveCall from '../others/give_call'
import TAC from '../others/tandc'
import DidYouKnow from '../others/did_you_know'
import $ from 'jquery';
import PageMapper from "../../config/page_mapper";
import AgentSection from '../agent/agent_section';
import GTM from 'react-tag-manager'
import ApiList from "../../config/base.json"

//import img_one from "../../images/SVG/down_arrow.svg";
import EventMapper from "../../config/handle_window_event";
import ReactGA from 'react-ga';

import '../../css/user_info/info_section.css';


import cookie from 'react-cookies';
import SocketContext from '../../socket-context.js';


const right_sign = ApiList.base_cdn_src + '/images/SVG/check_with_circle.svg'


let user_data = JSON.parse(sessionStorage.getItem('user_data'))

var firstPassword;
var secondUserName;
var tokenGlobal;
var tokenGlobalAfficient;

class PageFive extends Component {
    constructor() {
        super();
        this.state = {
            current_page_index: sessionStorage.getItem('current_index'),
            agent_flag: sessionStorage.getItem('agent_present_flag') ? parseInt(sessionStorage.getItem('agent_present_flag')) : 0,
            render_page: false
        }
    }

    componentDidMount() {
        var self = this;

        var page_index = '4';

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
        let app_user_data = sessionStorage.getItem('user_data') ? JSON.parse(sessionStorage.getItem('user_data')) : {};
        console.log('REAL DATA ::::',JSON.parse(sessionStorage.getItem('user_data')));
        console.log('USERDATA ::::', app_user_data)

        app_user_data.url = ApiList.current.ui_url + '/' + 'life-insurance-online-questionnaire';//current_page_url;
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

        console.log("This is the data I am sending to hit socket server ::::", JSON.stringify(datastring));
        this.props.socket.emit('userInfo', datastring);
         //EventMapper.save_to_app_data(app_user_data)
        //-------------------------------
        $(document).ready(function () {
            EventMapper.disable_back();
            // EventMapper.dropout_event('email_template_1', 'life-insurance-online-questionnaire');

            $('.how_it_works').css('display', 'none')
            $('.faq').css('display', 'none')
        });

        var visit_id = EventMapper.query('visitId');
        var afficiency_id = EventMapper.query('aff2');

        //CHECK FOR COMEBACK DATA
        EventMapper.check_comeback(visit_id, afficiency_id)
            .then(function () {
                return EventMapper.get_journey_json();
            })
            .then(function () {
                return EventMapper.validate_redirection(page_index)
            })
            .then(function () {
                //GET USER_DATA IF FETCHED FROM RHASH API
                let user_data = JSON.parse(sessionStorage.getItem('user_data'))

                self.setState({
                    render_page: true,
                    current_page_index: sessionStorage.getItem('current_index')
                }, function (e) {
                    if (sessionStorage.getItem('google_acc_id') != 'null') {
                        ReactGA.initialize(sessionStorage.getItem('google_acc_id'));
                        ReactGA.pageview(ApiList.current.ui_url + window.location.pathname);
                    }

                    //#############################################FOR FETCHING LABEL TEXT FROM JSON STARTS HERE#############################################
                    var current_page_index = self.state.current_page_index;
                    if (current_page_index) {
                        var data = PageMapper.getPageData(parseInt(current_page_index));


                        for (var i = 0; i < data.design.Attribute.length; i++) {
                            // console.log(data.design.Attribute[i].attributeID + "&&**&&" + data.design.Attribute[i].labelTxt)
                            if (data.design.Attribute[i].attributeID == 101) {

                            } else {
                                $('#' + data.design.Attribute[i].attributeID).text(data.design.Attribute[i].labelTxt)
                            }

                        }
                    }
                    //#############################################FOR FETCHING LABEL TEXT FROM JSON ENDS HERE#############################################
                });
            })
        // .then(function(){
        //     self.setState({
        //         render_page: true
        //     });
        // })
    }

    render() {
        const { agent_flag, render_page } = this.state;
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

                    < Header display_menu={false} token={tokenGlobal} tokenA={tokenGlobalAfficient}/>

                    {agent_flag == 1 ? <AgentSection token={tokenGlobal} tokenA={tokenGlobalAfficient}/> : null}
                    <div id="section1" className="col-md-12 section1_1 text-left section">
                        <div className="container mt2" style={{ color: "black" }}>

                            <div className="col-md-12 text-center mt3 fgsd14" id="5002">APPLY NOW

                            </div>
                            <div className="col-md-12 text-center mt3 mb2 agendabold42" id="5003">
                                Step 2: Tell us about your personal history
                            </div>

                            <div className="col-md-7 col-md-offset-3">

                                <ul className="nav nav-tabs user_tab " id="myTab">
                                    <div className="liner1"></div>
                                    <li className="">
                                        <Link to="#">
                                            <span className="round-tabs one agendabold42">
                                                <img src={right_sign} style={{ width: '50px', marginLeft: '-2px', marginTop: '-2px' }} alt="" />
                                            </span>
                                        </Link>
                                        <div className="bottom_line"></div>
                                        <div className="text-center fgsd14 mt3 bottom_text">About you</div>
                                    </li>
                                    <li className="center_line"> <hr style={{ marginTop: "56%", borderTop: "2px solid #BBBBBB" }} /> </li>
                                    <li className="active"><Link to="#">
                                        <span className="round-tabs two agendabold42" id="602">
                                            2
                     </span>
                                    </Link>
                                        <div className="bottom_line"></div>
                                        <div className="text-center fgsd14 mt3 bottom_text" id="5005    ">Your personal history</div>
                                    </li>
                                    <li className="center_line"> <hr style={{ marginTop: "56%", borderTop: "2px solid #BBBBBB" }} /> </li>
                                    <li><Link to="#">
                                        <span className="round-tabs three agendabold42" id="">
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

                        </div>
                    </div>

                    <PageFiveQuestion token={tokenGlobal} tokenA={tokenGlobalAfficient}/>
                    <DidYouKnow token={tokenGlobal} tokenA={tokenGlobalAfficient}/>
                    <GiveCall token={tokenGlobal} tokenA={tokenGlobalAfficient}/>
                    <TAC token={tokenGlobal} tokenA={tokenGlobalAfficient}/>
                    <Footer token={tokenGlobal} tokenA={tokenGlobalAfficient}/>

                </GTM >

                : null)
        )
    }
}

const PageFiveWithSocket = props => (
    <SocketContext.Consumer>
        {socket => <PageFive socket={socket} />}
    </SocketContext.Consumer>
)
export default PageFiveWithSocket
