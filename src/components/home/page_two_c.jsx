import React, { Component } from 'react';
import $ from 'jquery';
import Header from '../partials/header';
import TopSectionTwoC from '../top_section/section_two_c'
import Footer from '../partials/footer'
import Faq from '../others/faq'
import ApiList from "../../config/base.json"
import GiveCall from '../others/give_call'
import TAC from '../others/tandc'
import PageMapper from "../../config/page_mapper";
import EventMapper from "../../config/handle_window_event";



import '../../css/income_shield/income_shield_one.css';
import GTM from 'react-tag-manager'

var firstPassword;
var secondUserName;
var tokenGlobal;
var tokenGlobalAfficient;

const img_one = ApiList.base_cdn_src +"/images/Icons/TIAA_IncomeShield-journey_styleguide-dev-08.png";
export default class PageTwoC extends Component {
    constructor() {
        super();
        this.state = {
            current_page_index: sessionStorage.getItem('current_index')
        }
    }

    componentDidMount() {
        var self = this;
          var page_index = '1';

          EventMapper.validate_redirection(page_index)
              .then(function () {
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
        return (
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
                <TopSectionTwoC />

                <div id="income_s" className="col-md-12 text-center section" style={{ backgroundColor: "#F9E038", color: "black" }}>
                    <div className="container">
                        <div className="col-md-12 mt2">
                            <span className="fgsd14">GET THE BASICS </span>
                        </div>
                        <div className="col-md-12">
                            <h1 className="agendabold42">Income Shield</h1>
                        </div>
                        <div className="col-md-12">
                            <h4 className="ltr20" style={{ fontSize: "24px" }}> Life insurance designed to provide your family with monthly income to help<br /> replace your paycheck.Coverage lasts for 20 years.</h4>
                        </div>
                        <div className="col-md-12 mt3">
                            <div className="col-md-4 text-right text_pos_in_sh">
                                <p style={{ marginTop: "13%" }} className="fgsd14" > PAY OFF CREDIT CARD AND OTHER DEBTS</p>

                                <p style={{ marginTop: "13%" }} className="fgsd14" > PAY FOR BILL AND DAILY EXPENSES</p>
                            </div>
                            <div className="col-md-4 ">
                                <img src={img_one} width="200px" alt="" />
                            </div>
                            <div className="col-md-4 text-left text_pos_in_sh">
                                <p style={{ marginTop: "13%" }} className="fgsd14" > KEEP YOUR FAMILY IN THE HOME THEY LOVE</p>
                                <p style={{ marginTop: "13%" }} className="fgsd14" > PAY OFF EDUCTAIONAL LOANS</p>
                            </div>

                        </div>
                        <div className="col-md-12 mt3 mb3">
                            <a href="/two_d" className="btn cbtn_color_black mb3">APPLY NOW</a>
                        </div>
                    </div>
                </div>
                <Faq />
                <GiveCall />
                <TAC />
                <Footer />

                {/* </div> */}
            </GTM>
        )
    }

}
