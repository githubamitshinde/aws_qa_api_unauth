import React, { Component } from 'react';

import moment from 'moment';
import $ from 'jquery';
import PageMapper from "../../config/page_mapper";
// import { DatePicker, DatePickerInput } from 'rc-datepicker';

import ApiList from "../../config/base.json"
import dropdown from "../../config/dropdown.json"
import DropdownCall from "../../config/dropdown_api_request.js"
import Inputmask from "inputmask";


import '../../css/other/datepicker.css';

var firstPassword;
var secondUserName;
var tokenGlobal;
var tokenGlobalAfficient;
const drop_arrow = ApiList.base_cdn_src+"/images/SVG/down_arrow.svg";


export default class BeneficiaryTable extends Component {
    constructor() {
        super();
        this.state = {
            selectedDate: moment().subtract(18, "years"),
            current_page_index: sessionStorage.getItem('current_index')
        }

    }

    componentDidMount() {
        var dob = $('.beni-date-of-birth')
      Inputmask({ mask: "99/99/9999", placeholder: "mm/dd/yyyy", clearIncomplete: true }).mask(dob);

      $.ajax({
          url: ApiList.current.base_api_url + ApiList.dropdown_base_url,
          type: 'POST',
          data: JSON.stringify({
              "dropdown_list": {
                  "table_name": dropdown.table_name.page7,
                  "column_name": dropdown.column_name.relationship
              }
          }),
          headers: {
                      
                      'Content-Type': 'application/json'
          },
          success: (data) => {
              // alert(JSON.stringify(data))
              var options = '<option selected disabled></option>';
              for (var i = 0; i < data.length; i++) {
                  options += '<option value=' + data[i].refValue + '>' + data[i].ref_key + '</option>'
                  if (i == data.length - 1) {
                      $('.relation').last().append(options);
                  }
              }
          },
          error: (err) => {
              console.log("ERROR in dropdown relation " + JSON.stringify(err));
          }
      })
      // ######################### VALIDATION FOR NAME STARTS HERE #########################
      $(document).on('blur', '.first-name, .last-name, .percentage_beni', function (e) {
          if (this.value != "") {
              $(this).siblings(".small_validate").remove();
              $(this).css('border-color', 'black');
          } else {
              $(this).css('border-color', 'red');
              // $("#validation_" + this.id).is(":visible") ? null : $('<small id=validation_' + this.id + ' style="color: red;">This field is required</small>').insertAfter("#" + this.id);
          }
      });

      $(document).on('keypress', '.first-name, .last-name', function (e) {
          var code = e.keyCode || e.charCode;

          if (!(code >= 48 && code <= 57) || code == 8 || code == 9) {
          } else {
              e.preventDefault();
          }
      });
      // ######################### VALIDATION FOR NAME ENDS HERE #########################

      $(document).on('keypress', '.percentage_beni', function (e) {

          var code = e.keyCode || e.charCode;

          if ((code >= 48 && code <= 57) || code == 8 || code == 9) {

          } else {
              e.preventDefault();
          }

      });
      $(document).on('keyup', '.percentage_beni', function (e) {
          var final_percent = 0;
          $('.percentage_beni').map(function () {
              final_percent = parseInt(final_percent) + parseInt($(this).val());
          })
          if (final_percent <= 100 && final_percent > 0) {
              $('.total_beni_percent').text(final_percent + "%")
              $('.total_beni_percent').css('color', 'black')
              if (final_percent == 100 || $('.beneficiary_tbody').length >= 5) {
                  // $('.add_beneficiary_btn').css('display', 'none')
              } else {
                  // $('.add_beneficiary_btn').css('display', 'block')
              }
          } else {
              final_percent = "Adjust percentage. Total must equal 100%";
              $('.total_beni_percent').text(final_percent);
              $('.total_beni_percent').css('color', 'red');

          }
      })
      // ************************** date picker ready only ****************************

      // ************************** date picker ready only ****************************
    }



    render() {
        return (
            <div>

                <div className="col-md-12 pd0">
                    <div className="col-md-12 pd0 mt1" style={{ backgroundColor: '#00C3FF' }}>
                        <div className="container">
                            <div className="benificary_section_mb_res col-md-12 col-md-offset-0 text-left pd0" style={{ marginTop: 10, }}>
                                <div className="beneficiary_tbody col-md-12 mb2 pd0">
                                    <div className="col-md-2 col-md-offset-1">
                                        <div for="first-name" className="fgsd14 mt2 tt" id="707">first name</div>
                                        <input type="text" id="first-name" name="first-name" className="first-name mt2" />
                                    </div>
                                    <div className="col-md-2">
                                        <div for="last-name" className="fgsd14 mt2 tt" id="708">last name</div>
                                        <input type="text" id="last-name" name="last-name" className="last-name mt2" /></div>
                                    <div className="col-md-2">
                                        <div for="beni-date-of-birth" className="fgsd14 mt2 tt" id="709">date of birth</div>
                                        <input type="text" className="beni-date-of-birth mt2" id="beni-date-of-birth" name="beni-date-of-birth" />
                                    </div>
                                    <div className="col-md-2">
                                        <div for="relation" className="fgsd14 mt2 tt" id="710">relationship</div>
                                        <div className="rail-select mt2">
                                            <div className="select-side" style={{ 'background-color': 'white' }}>
                                                <img src={drop_arrow} alt="" />
                                            </div>
                                            <select className="relation" id="relation" name="relation" style={{ width: '100%', 'background-color': 'white' }}>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                        <div for="percentage_beni" className="fgsd14 mt2 tt" id="711">Percentage</div>
                                        <input type="text" className="percentage_beni mt2" name="percentage_beni" placeholder="" maxLength="3" /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}
