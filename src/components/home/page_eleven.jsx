import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import Header from '../partials/header';
import Footer from '../partials/footer';
import Payment from '../payment/payment_section';
import Tandc from '../others/tandc';

import $ from 'jquery';
import PageMapper from "../../config/page_mapper";
import EventMapper from "../../config/handle_window_event";
import AgentSection from '../agent/agent_section';
import GTM from 'react-tag-manager'

//import down_arrow from '../../images/SVG/down_arrow.svg';
import '../../css/income_shield/income_shield_one.css';
import '../../css/other/loader.css'
import '../../css/user_info/info_section.css';
import cookie from 'react-cookies';
import SocketContext from '../../socket-context.js';
import ApiList from "../../config/base.json";
import ReactGA from 'react-ga';


var firstPassword;
var secondUserName;
var tokenGlobal;
var tokenGlobalAfficient;


const right_sign = ApiList.base_cdn_src + "/images/SVG/check_with_circle.svg"
const loder_img = ApiList.base_cdn_src + "/images/SVG/loader-blue.svg"
const loder_logo = ApiList.base_cdn_src + "/images/Icons/logo1.png"


class PageEleven extends Component {
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

        var page_index = '10';
        this.setState({
            current_page_index: page_index
        })

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

        // setInterval(this.establishSocketConnection.bind(this), 8000);

        //user drop out socket client code
        let app_user_data = sessionStorage.getItem('user_data') ? JSON.parse(sessionStorage.getItem('user_data')) : {};

        app_user_data.url = ApiList.current.ui_url + '/' + 'life-insurance-online-payment';//current_page_url;
        app_user_data.call_us_at = "1800-000-111";
        app_user_data.email_template_type = 'email_template_2'; //template_type;
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
        self.props.socket.emit('userInfo', datastring);
        //EventMapper.save_to_app_data(app_user_data)
        //-------------------------------

        $(document).ready(function () {
            EventMapper.disable_back();
            // EventMapper.dropout_event('email_template_2', 'life-insurance-online-payment');
            $('.how_it_works').css('display', 'none')
            $('.faq').css('display', 'none')
        });

        var visit_id = EventMapper.query('visitId');
        var afficiency_id = EventMapper.query('aff2');
        var arc_id = EventMapper.query('arcid');
        // console.log("############################################################ afficiency_id::" + afficiency_id + "##################################################################");
        // console.log("############################################################ arc_id::" + arc_id + "##################################################################");

        if (arc_id == null) {
            // alert(afficiency_id + "&**&&" + arc_id);
            //CHECK FOR COMEBACK DATA
            EventMapper.check_comeback(visit_id, afficiency_id)
                .then(function () {

                    return EventMapper.get_journey_json();
                })
                .then(function () {
                    //GET USER_DATA IF FETCHED FROM RHASH API
                   let user_data = sessionStorage.getItem('user_data') ? JSON.parse(sessionStorage.getItem('user_data')) : {};
                    self.setState({
                        render_page: true,
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


                })

        } else {
            self.setState({
                render_page: true
            });
        }
        // .then(function(){
        //     return EventMapper.validate_redirection(page_index)
        // })
        // .then(function(){
        //     self.setState({
        //         render_page: true
        //     });
        // })


        $(document).on("click", ".flip_front_btn", function () {
            $('#f1_card').css('transform', 'rotateY(180deg)')
        })
        $(document).on("click", ".flipback_btn", function () {

            $('#f1_card').css('transform', 'none')

        })
    }

    establishSocketConnection() {
        console.log('hit');
        //user drop out socket client code
        try {
            let user_data = sessionStorage.getItem('user_data') ? JSON.parse(sessionStorage.getItem('user_data')) : {};
            user_data.url = ApiList.current.ui_url + '/' + 'life-insurance-beneficiaries';//current_page_url;
            user_data.call_us_at = "1800-000-111";
            user_data.email_template_type = 'email_template_1'; //template_type;
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
        } catch (e) { console.log('e', e); } finally { }
        //-------------------------------
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
                    <div className="spinner" style={{ display: "none" }}>
                        {/* <div className="blob blob-0"></div> */}

                        <img id="loading" src={loder_img} />
                        <img className="loader_logo" src={loder_logo} />
                    </div>
                    < Header display_menu={false} />
                    {agent_flag == 1 ? <AgentSection /> : null}
                    <div id="section1" className="col-md-12 section1_1 text-left section">
                        <div className="container mt2" style={{ color: "black" }}>

                            <div className="col-md-12 text-center fgsd14" id="1102">

                            </div>
                            <h1 className="col-md-12 text-center mt1 mb2 agendabold38" id="1103">

                            </h1>

                            <div className="col-md-7 col-md-offset-3">

                                <ul className="nav nav-tabs user_tab " id="myTab">
                                    <div className="liner1"></div>
                                    <li className="">
                                        <Link to="#">
                                            <span className="round-tabs one agendabold42">
                                                <img src={right_sign} style={{ width: '50px', marginLeft: '-2px', marginTop: '-5px' }} alt="" />
                                            </span>
                                        </Link>
                                        <div className="bottom_line"></div>
                                        <div className="text-center fgsd14 mt3 bottom_text">About you</div>
                                    </li>
                                    <li className="center_line"> <hr style={{ marginTop: "56%", borderTop: "2px solid #BBBBBB" }} /> </li>
                                    <li className="">
                                        <Link to="#" >
                                            <span className="round-tabs two agendabold42" id="602">
                                                <img src={right_sign} style={{ width: '50px', marginLeft: '-2px', marginTop: '-5px' }} alt="" />
                                            </span>
                                        </Link>
                                        <div className="bottom_line"></div>
                                        <div className="text-center fgsd14 mt3 bottom_text" style={{ position: "absolute", width: "115px", left: "-10px" }} id="603">Your personal history</div>
                                    </li>
                                    <li className="center_line"> <hr style={{ marginTop: "56%", borderTop: "2px solid #BBBBBB" }} /> </li>
                                    <li className="">
                                        <Link to="#">
                                            <span className="round-tabs three agendabold42" id="">
                                                <img src={right_sign} style={{ width: '50px', marginLeft: '-2px', marginTop: '-5px' }} alt="" />
                                            </span> </Link>
                                        <div className="bottom_line"></div>
                                        <div className="text-center fgsd14 mt3 bottom_text" style={{ position: "absolute", width: "115px", left: "-10px" }} id="703">Your beneficiaries</div>
                                    </li>
                                    <li className="center_line"> <hr style={{ marginTop: "56%", borderTop: "2px solid #BBBBBB" }} /> </li>
                                    <li className="active">
                                        <Link to="#">
                                            <span className="round-tabs four agendabold42" id="1004">
                                                4
                             </span>
                                        </Link>
                                        <div className="bottom_line"></div>
                                        <div className="text-center fgsd14 mt3 bottom_text" id="1105">Sign & pay</div> </li>


                                </ul>
                            </div>

                            <div className="tab-content ">
                                <div className="tab-pane fade in active" id="settings">

                                </div>


                            </div>

                        </div>
                    </div>
                    <div className="mb4"> &nbsp;</div>
                    <Payment />
                    <Tandc />
                    <Footer />

                </GTM>
                : null)
        )
    }

}

const PageElevenWithSocket = props => (
    <SocketContext.Consumer>
        {socket => <PageEleven socket={socket} />}
    </SocketContext.Consumer>
)
export default PageElevenWithSocket
