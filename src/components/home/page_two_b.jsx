import React, { Component } from 'react';
import $ from 'jquery';
// import Faq from '../others/faq'

import Faq from '../faq/quote_page'
import TopSectionTwoB from '../top_section/section_two_b'
import ICTwo from '../income_shield/income_shield_2'
import GiveCall from '../others/give_call'
import TAC from '../others/tandc'
import PageMapper from "../../config/page_mapper";
import EventMapper from "../../config/handle_window_event";

import Header from '../partials/header';
import Footer from '../partials/footer'

import '../../css/income_shield/income_shield_one.css';

import ApiList from "../../config/base.json";


var firstPassword;
var secondUserName;
var tokenGlobal;
var tokenGlobalAfficient;

export default class PageOneB extends Component {
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
            <div>
                <Header  display_menu={true} />
                <TopSectionTwoB />
                <ICTwo />
                <Faq />
                <GiveCall />
                <TAC />
                <Footer />
            </div>

        )
    }

}
