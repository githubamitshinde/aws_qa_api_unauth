import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import $ from 'jquery';
import Header from '../partials/header';

import AgentSection from '../agent/agent_section';

import TopSectionTwoD from '../top_section/section_two_d'
import Footer from '../partials/footer'
import Faq from '../faq/quote_page'
import GiveCall from '../others/give_call'
import TAC from '../others/tandc'
import PageMapper from "../../config/page_mapper";
import EventMapper from "../../config/handle_window_event";
import ReactGA from 'react-ga';
import ApiList from "../../config/base.json"
import GTM from 'react-tag-manager'
import '../../css/income_shield/income_shield_one.css';







const img_one = ApiList.base_cdn_src+"/images/Icons/TIAA_IncomeShield-journey_styleguide-dev-08.png";
const img_two =ApiList.base_cdn_src+ "/images/Icons/doller_sign_without.png"


var firstPassword;
var secondUserName;
var tokenGlobal;
var tokenGlobalAfficient;

export default class PageTwoD extends Component {
    constructor() {
        super();
        this.state = {
            current_page_index: sessionStorage.getItem('current_index'),
            agent_flag: sessionStorage.getItem('agent_present_flag') ? parseInt(sessionStorage.getItem('agent_present_flag')) : 0,
            display_page: false,
            device_width: ""
        }
    }

    componentDidMount() {
        var self = this;
          var page_index = '1';
          this.setState({
            current_page_index: page_index
        })

          // let user_data = sessionStorage.getItem('user_data');

          // var aff2 = user_data ? user_data.aff2 : undefined;
          // if (aff2 == undefined) {
          //     sessionStorage.setItem('current_index', page_index);
          // }

         $(document).on('click','.scroll_up',function(){
              $("html, body").animate({ scrollTop: 0 }, 1200);
              return false;
          });

          $('.is_shield_icon').attr(" src", img_one)
          if ($(window).width() <= 768) {
              console.log("imga replace")
              $('.is_shield_icon').attr('src', img_two)
          }
          this.setState({
              device_width: $(window).width()
          })
          EventMapper.validate_redirection(page_index)
              .then(function () {
                  let user_data = JSON.parse(sessionStorage.getItem('user_data'))
                  // alert(user_data.state)
                  if (user_data.state == undefined || user_data.aff1 == undefined || user_data.height == undefined || user_data.weight == undefined || user_data.dob == undefined || user_data.gender == undefined || user_data.tobbacouse == undefined) {
                      window.location.href = "/"
                  } else {
                      self.setState({
                          display_page: true
                      })
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
              });
    }

    render() {
        const { agent_flag, display_page, device_width } = this.state;
        return (
            display_page ?
                // <div>
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
                    <Header display_menu={true} />
                    {agent_flag == 1 ? <AgentSection /> : null}
                    <TopSectionTwoD />

                    <div id="income_s" class="col-md-12 text-center section" style={{ backgroundColor: "#F9E038", color: "black" }}>
                        <div class="container">
                            <div class="col-md-12 mt2">
                                <span class="fgsd14">GET THE BASICS </span>
                            </div>
                            <div class="col-md-12">
                                <h1 class="agendabold42">Salary Shield</h1>
                            </div>
                            <div class="col-md-12 mt2">
                                <h4 class="ltr20">Life insurance designed to provide your loved ones with monthly income to help:</h4>
                                {/* <br /> replace your paycheck. Coverage lasts for 20 years. */}
                            </div>
                            <div class="col-md-12 mt3">
                                <div class="col-md-3 col-md-offset-1 col-sm-6 col-sm-offset-3 col-xs-6 col-xs-offset-3 text-right text_pos_in_sh pd0">
                                    <p style={{ marginTop: "11%" }} class="fgsd14" id="2071"></p>
                                    <p style={{ marginTop: "30%" }} class="fgsd14" id="2072"></p>
                                </div>
                                <div class="col-md-4 pd0">
                                    {device_width <= 768 ? <img src={img_two} className="is_shield_icon" style={{ width: 200 }} alt="" /> : <img src={img_one} style={{ width: 380 }} className="is_shield_icon" alt="" />}

                                </div>
                                <div class="col-md-3 col-md-offset-0 col-sm-6 col-sm-offset-3 col-xs-6 col-xs-offset-3 text-left text_pos_in_sh pd0">

                                    <p style={{ marginTop: "11%" }} class="fgsd14" id="2068"></p>
                                    <p style={{ marginTop: "23%" }} class="fgsd14" id="2070"></p>
                                </div>

                            </div>
                            <div class="col-md-12 col-sm-12 mt3 mb3">
                                <div className="btn cbtn_color_black mt3 scroll_up">APPLY NOW</div>
                            </div>
                            <div class="col-md-12 mt3 mb3">

                            </div>
                        </div>
                    </div >
                    <Faq />
                    <GiveCall />
                    <TAC />
                    <Footer />

                    {/* </div > */}
                </GTM>
                :
                null

        )
    }

}
