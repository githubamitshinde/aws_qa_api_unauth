import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import PageMapper from "../../../config/page_mapper";
import Header from '../../partials/header';
import Footer from '../../partials/footer';
import $ from 'jquery';
import Faq from '../../faq/landing_page'
import TopSectionOne from '../../top_section/section_one'
import GiveCall from '../../others/give_call'
import TAC from '../../others/tandc'
import TopThreeSection from '../../top_three_section/type_one'
import ApiList from "../../../config/base.json"
import AgentSection from '../../agent/agent_section';
import EventMapper from "../../../config/handle_window_event";
import ReactGA from 'react-ga';

import '../../../css/income_shield/income_shield_one.css';
// 
import '../../../css/income_shield/income_shield_1.css';
import { resolve } from 'path';

import io from 'socket.io-client';
import { Socket } from 'net';
import SocketContext from '../../../socket-context.js';
const img1 = ApiList.base_cdn_src+"/images/Icons/TIAA_IncomeShield-journey_styleguide-dev-09.png";
const img2 = ApiList.base_cdn_src+"/images/Icons/TIAA_IncomeShield-journey_styleguide-dev-20.png";
const img3 = ApiList.base_cdn_src+"/images/Icons/doller_sign_without.png";
const close_model = ApiList.base_cdn_src+"/images/SVG/Close_icon.svg"
// import { isMoment } from '../../../node_modules/moment';
var aff0 = 'ARC938TI1294';
var aff1 = 'ARC570TI9808';  //ARC570TI9808
var visitor_id = 26;    //26

var firstPassword;
var secondUserName;
var tokenGlobal;
var tokenGlobalAfficient;

class PageOneIdTwentyOne extends Component {
    constructor() {
        super();
        this.state = {
            current_page_index: sessionStorage.getItem('current_index'),
            agent_flag: sessionStorage.getItem('agent_present_flag') ? parseInt(sessionStorage.getItem('agent_present_flag')) : 0,
            render_flag: false
        }
    }

    componentDidMount() {
        let user_data = JSON.parse(sessionStorage.getItem('user_data')) ? JSON.parse(sessionStorage.getItem('user_data')) : null;
        if (user_data == null || user_data == "") {
            window.location.href = "/"
        }
        // Getting token 
       
        // this.props.socket.emit('userInfo', datastring);
        // var datastring = {"aff0":"ARC7094TI674","aff1":"ARC7094TI674","visitor_id":77134696,"city":"Alpharetta","country":"US","state":"GA","zipcode":"30004","weight":"160","height":"5.06","tobbacouse":"0","gender":"1","monthly_recieve":"3500","select_monthly_income_benifit":"3500","dob":"03/02/1993","premium_total":"42.90","monthly_income_benefit":"42.90","add_on_one_time_payment":"0.00","rate_class":"Best","payment_frequency":"monthly","select_add_on_one_time_payment":"0","rider_id":null,"first_name":"SUSAN","last_name":"DOTSON","phone_number":"8744486324","email":"suraj@acc.ltd","existing_insurance":0,"replacement_flag":0,"home_address":"123","apt_no":"1114 DALESFORD DR","ssn":"666168498","aff2":"ARC6786TI628","income":"2,637,476","uwanswers":[{"visit_id":"75889531","question_id":0,"answer_value":"100","answer_option_id":"1","afficiency_id":"ARC6786TI628"},{"visit_id":"75889531","question_id":0,"answer_value":"100","answer_option_id":"1","afficiency_id":"ARC6786TI628"},{"visit_id":"75889531","question_id":1001,"answer_value":"Yes","answer_option_id":1,"afficiency_id":"ARC6786TI628"},{"visit_id":"75889531","question_id":1042,"answer_value":"Yes","answer_option_id":1,"afficiency_id":"ARC6786TI628"},{"visit_id":"75889531","question_id":1002,"answer_value":"Yes","answer_option_id":1,"afficiency_id":"ARC6786TI628"},{"visit_id":"75889531","question_id":1003,"answer_value":"No","answer_option_id":2,"afficiency_id":"ARC6786TI628"},{"visit_id":"75889531","question_id":1007,"answer_value":"No","answer_option_id":2,"afficiency_id":"ARC6786TI628"},{"visit_id":"75889531","question_id":1010,"answer_value":"No","answer_option_id":2,"afficiency_id":"ARC6786TI628"},{"visit_id":"75889531","question_id":1011,"answer_value":"No","answer_option_id":2,"afficiency_id":"ARC6786TI628"},{"visit_id":"75889531","question_id":1012,"answer_value":"No","answer_option_id":2,"afficiency_id":"ARC6786TI628"},{"visit_id":"75889531","question_id":1013,"answer_value":"No","answer_option_id":2,"afficiency_id":"ARC6786TI628"},{"visit_id":"75889531","question_id":1016,"answer_value":"No","answer_option_id":2,"afficiency_id":"ARC6786TI628"},{"visit_id":"75889531","question_id":1017,"answer_value":"No","answer_option_id":2,"afficiency_id":"ARC6786TI628"},{"visit_id":"75889531","question_id":1020,"answer_value":"No","answer_option_id":2,"afficiency_id":"ARC6786TI628"},{"visit_id":"75889531","question_id":1023,"answer_value":"No","answer_option_id":2,"afficiency_id":"ARC6786TI628"},{"visit_id":"75889531","question_id":1026,"answer_value":"None of the above","answer_option_id":"1","afficiency_id":"ARC6786TI628"}],"drivers_license_no":"","drivers_license_state":"","drivers_license_flg":0,"issued_license_flg":0,"beni_arr":[{"afficiency_id":"ARC6786TI628","app_attempt_no":100,"visit_id":"75889531","relationship_to_applicant":"4","bene_first_name":"s","bene_last_name":"d","dob":"12/31/1993","percentage":"100"}],"rule_engine":["101","0","",""],"uw_decision_date":"10/04/2018","rule_engine_2":["6","","",""],"failure_code":3};
        // this.props.socket.emit('generate_app_pdf', datastring);

        var self = this;
        var page_index = '0';
        this.setState({
            current_page_index: page_index
        })
        // sessionStorage.setItem('current_index', page_index);
        $(".scroll_up").on("click", function () {
            $("html, body").animate({ scrollTop: 0 }, 1200);
            return false;
        });

        EventMapper.validate_redirection(page_index)
            .then(function () {
                self.setState({
                    render_flag: true
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

                        } else if (data.design.Attribute[i].attributeID == 118 || data.design.Attribute[i].attributeID == 120) {
                            // FOR SUPERSCRIPT RENDER labelTxt AS HTML
                            $('#' + data.design.Attribute[i].attributeID).html(data.design.Attribute[i].labelTxt)
                        } else {
                            $('#' + data.design.Attribute[i].attributeID).text(data.design.Attribute[i].labelTxt)
                        }

                    }
                }
                //#############################################FOR FETCHING LABEL TEXT FROM JSON ENDS HERE#############################################
            })
    }

    // validate_redirection = () => {
    //     return new Promise(function (resolve, reject) {
    //         //CHECK PAGE JUMP
    //         if (page_index != this.state.current_page_index) {
    //             if (this.state.current_page_index == '1') {
    //                 //FETCH BY DESIGN
    //                 var screen_id = PageMapper.getNextDesignId(parseInt(this.state.current_page_index));
    //                 sessionStorage.setItem('current_index', (parseInt(this.state.current_page_index)));
    //                 window.location.href = PageMapper.getPageURL(screen_id);
    //             } else {
    //                 var screen_id = PageMapper.getNextPageId(parseInt(this.state.current_page_index) + 1);
    //                 sessionStorage.setItem('current_index', (parseInt(this.state.current_page_index) + 1));
    //                 window.location.href = PageMapper.getPageURL(screen_id);
    //             }
    //         } else {
    //             resolve();
    //         }
    //     });
    // }

    render() {
        const { agent_flag, render_flag } = this.state;
        return (
            (render_flag ?
                <div>
                    < Header display_menu={true} token={tokenGlobal} tokenA={tokenGlobalAfficient} />
                    {agent_flag == 1 ? <AgentSection token={tokenGlobal} tokenA={tokenGlobalAfficient} /> : null}
                    <TopSectionOne token={tokenGlobal} tokenA={tokenGlobalAfficient} />
                    <TopThreeSection token={tokenGlobal} tokenA={tokenGlobalAfficient} />

                    {/* < Header display_menu={true} />
                {agent_flag == 1 ? <AgentSection /> : null}
                < TopSectionOne />
                < TopThreeSection /> */}
                    <div id="income_s" className="col-md-12 text-center section" style={{ backgroundColor: '#F9E038' }}>
                        <div className="container">
                            <div className="col-md-12 mt2">
                                <span className="fgsd14" id="121">GET THE BASICS</span>
                            </div>
                            <div className="col-md-12">
                                <h1 className="agendabold42" id="122">Salary Shield</h1>
                            </div>
                            <div className="col-md-8 col-md-offset-2">
                                <h4 className="ltr20" id="123">Innovative term life insurance that can provide your loved ones with reliable monthly income to replace your paycheck. It lets them focus on the future and eases the worry of managing monthly bills.</h4>
                            </div>



                            <div className="col-md-12 mt3 margin_auto">
                                <div className="col-md-4 bd_right" style={{ padding: '0 6%' }}>
                                    <div class="vl"></div>
                                    <img src={img1} alt="" width="150px" />
                                    <h5 className="fgsd14">AFFORDABLE</h5>
                                    <p className="ltr18" id="130">Provide guaranteed  monthly income for your family  for as little  as $15.37 a month.<sup>1</sup></p>
                                </div>

                                <div className="col-md-4 bd_right" style={{ padding: '0 6%' }}>
                                    <div class="vl"></div>
                                    <img src={img2} alt="" width="175px" />
                                    <h5 className="fgsd14">CONVENIENT</h5>
                                    <p className="ltr18" id="131">Apply and get a decision in 10 minutes. No medical exam required, just answer a few simple health questions.</p>
                                </div>

                                <div className="col-md-4" >
                                    <img src={img3} alt="" width="85px" />
                                    <h5 className="fgsd14">GUARANTEED</h5>
                                    <p className="ltr18" id="132">Coverage begins immediately if you're approved. Your loved ones will receive reliable monthly income* if you die while covered.</p>
                                </div>
                            </div>

                            <div className="col-md-8 mt4 col-md-offset-2">
                                <h4 className="ltr18" id="123">Salary Shield continues TIAA Life’s commitment to helping families find new and innovative ways to protect their income and provide for their loved ones. Learn more about <span style={{ textDecoration: "underline", cursor: 'pointer' }} type="button" class="" data-toggle="modal" data-target="#more_about_tiaa"> TIAA Life</span>, one of the most highly rated life insurers in the country.</h4>
                            </div>
                            {/* model box */}
                            <div id="more_about_tiaa" class="modal fade" role="dialog">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-body text-left">
                                            <span className="fgsb20" style={{ color: "rgba(226, 22, 42, 1)" }}></span><button type="button" className="close" style={{ position: "absolute", right: "20px", opacity: 1 }} data-dismiss="modal"><img src={close_model} alt="" style={{ width: "30px", height: "31px" }} /></button>
                                            <div className="mt6 ltr18">
                                                <p>We're one of the world's most admired companies in the life and health insurance category for over five years.1
                                         </p>
                                                <p className="mt4">TIAA is a member of one of only three insurance groups in the United States to hold the highest possible rating from three of the four leading independent insurance company rating agencies.2 </p>
                                                <ul style={{ paddingLeft: "20px" }}>
                                                    <li className="mt3">A++ Superior by A.M. Best Company</li>
                                                    <li className="mt3">AAA Exceptionally Strong by Fitch Ratings </li>
                                                    <li className="mt3">Aa1 (Second highest) Very Strong by Moody's Investors Services</li>
                                                    <li className="mt3">AA+ (Second highest) Very Strong - Standard & Poors </li>
                                                </ul>
                                                <p className="mt4">1TIAA Life is part of the TIAA family of companies. TIAA was rated in the top 10 in FORTUNE® magazine's World's Most Admired Companies ranking in the Insurance: Life and Health category for the years 2011, 2012, 2013, 2014, 2015, 2016 and 2017.</p>
                                                <p className="mt4">2 For its stability, claims-paying ability and overall financial strength, TIAA-CREF Life Insurance Company is a member of one of only three insurance groups in the United States to hold the highest rating available to U.S. insurers from three of the four leading independent insurance company rating agencies. TIAA-CREF Life Insurance Company (TIAA Life) is a wholly owned subsidiary of Teachers Insurance and Annuity Association of America (TIAA). TIAA Life holds the following ratings as a result of its relationship with TIAA: <span style={{ textShadow: "1px 0px 0px black" }}>
                                                    A.M. Best (A++ as of 6/18), Fitch (AAA as of 6/18) and Standard & Poor's (AA+ as of 10/18),</span> and the second highest possible rating from
                                            <span style={{ textShadow: "1px 0px 0px black" }}>Moody's Investors Service (Aa1 as of 9/18).</span> There is no guarantee that current ratings will be maintained. The financial strength ratings represent a company's ability to meet policyholders' obligations and claims and do not apply to variable annuities or any other product or service not fully backed by TIAA's claims-paying ability. The ratings also do not apply to the safety or the performance of the variable accounts, which will fluctuate in value. </p>
                                                <p className="mt3">
                                                    Each of TIAA Life and TIAA are solely responsible for their financial conditions and contractual obligations.
                                            </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* model box closed     */}
                            <div className="col-md-12 mt3">
                                <Link to="" className="btn btnh cbtn_color_black mb3 tt scroll_up">continue</Link>

                            </div>
                            <div className="col-md-12 mt2 text-center">
                                <sup>1</sup>Based on a Male,age 35 best(preferred) underwriting class for $1,000/month of coverage. Eligibility and rates will vary depending on your underwriting classification.
                        </div>
                            <div className="col-md-12 mb3 text-center">
                                *For a defined period; see personalized quote for details.
                        </div>
                        </div>
                    </div>
                    < Faq />
                    < GiveCall />
                    < TAC />
                    < Footer />

                </div>
                : null)
        )
    }

}
const PageOneIdTwentyOneWithSocket = props => (
    <SocketContext.Consumer>
        {socket => <PageOneIdTwentyOne socket={socket} />}
    </SocketContext.Consumer>
)
export default PageOneIdTwentyOneWithSocket