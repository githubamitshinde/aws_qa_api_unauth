import React, { Component } from 'react';
// import DatePicker from 'react-datepicker';
import cookie from 'react-cookies'
import Promise from 'bluebird';
import moment from 'moment';
import $ from 'jquery';
import Inputmask from "inputmask";

import ApiList from "../../config/base.json"
import dropdown from "../../config/dropdown.json"
import DropdownCall from "../../config/dropdown_api_request.js"
import PageMapper from "../../config/page_mapper";

import zipcodes from 'zipcodes';

import '../../css/pages/section1.css';
import '../../css/other/datepicker.css';

import { withRouter } from 'react-router-dom';
import ErrorMsg from "../../config/error_msgs";

const img_one = ApiList.base_cdn_src+"/images/iStock-904444770.jpg";
const img_two = ApiList.base_cdn_src+"/images/SVG/down_arrow.svg"
const img_three = ApiList.base_cdn_src+"/images/SVG/down_arrow.svg"
var aff0 = '';
var aff1 = '';  //ARC570TI9808
var visitor_id = '';    //26

// var dropdown_req = require("../../config/dropdown_api_request.js");
var zipcode_flag = false; //false
var age_validation = false;

class SectionFourteen extends Component {
    constructor() {
        super();
        this.state = {
            selectedDate: moment().subtract(18, "years").format("YYYY-MM-DD"),
            current_page_index: sessionStorage.getItem('current_index')
        }

        this.onChange = this.onChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        var self = this;

        // alert(zipcode_flag)
        // if (self.validate_zip()) {
        if (self.validate_form()) {
            $("#validation_page_one").css("display", 'none');
            // *************** save data to session ********************
            let user_data = JSON.parse(sessionStorage.getItem('user_data'));
            if (user_data != null) {
                user_data.zipcode = $("#zipcode").val()
                user_data.weight = $("#weight").val()
                user_data.height = $("#height option:selected").val()
                user_data.tobbacouse = $("#tobbacouse option:selected").val()
                user_data.gender = $("#gender option:selected").val()
                user_data.monthly_recieve = $("#monthly_recieve option:selected").val()
                user_data.select_monthly_income_benifit = $("#monthly_recieve option:selected").val()
                user_data.dob = $("#date-of-birth").val()       //self.state.selectedDate
                sessionStorage.setItem('user_data', JSON.stringify(user_data))
                // ########################### quote save #########################
                let datastring = {
                    "quote": {
                        "visit_id": cookie.load('visit_id'),
                        "dob": $("#date-of-birth").val(),
                        "gender": $("#gender option:selected").val(),
                        "zip_code": $("#zipcode").val(),
                        "height": $("#height option:selected").val(),
                        "weight": $("#weight").val(),
                        "tobacco_use": $("#tobbacouse option:selected").val(),
                        "lump_sum_need": $("#monthly_recieve option:selected").val(),
                        "agent_assisted_flag": 0,
                        "city": user_data.city,

                    },
                    "navigation_log": {
                        "visit_id": cookie.load('visit_id'),
                        "page_url": window.location.pathname,
                        "entry_timestamp": moment().format("MM/DD/YYYY"),
                        "exit_timestamp": moment().format("MM/DD/YYYY"),
                        "interactive_indicator": 1
                    }
                }

                console.log(JSON.stringify(datastring));
                console.log(ApiList.current.base_api_url + ApiList.quote_create)
                $.ajax({
                    url: ApiList.current.base_api_url + ApiList.quote_create,
                    type: 'POST',
                    data: JSON.stringify(datastring),
                    headers: {
                                'Authorization': 'Bearer '+ this.props.token,
                                'Content-Type': 'application/json'
                    },
                    success: (data) => {
                        if (data.statusCode == 200) {
                            // if (sessionStorage.getItem('journey_complete_flag')) {
                            //     var screen_id = PageMapper.getNextDesignId(1);
                            //     sessionStorage.setItem('current_index', 0);
                            //     window.location.href = PageMapper.getPageURL(screen_id);
                            // } else {
                            var screen_id = PageMapper.getNextDesignId(parseInt(sessionStorage.getItem('current_index')) + 1);
                            sessionStorage.setItem('current_index', (parseInt(sessionStorage.getItem('current_index')) + 1));
                            window.location.href = PageMapper.getPageURL(screen_id);
                            //console.log('screen_id',PageMapper.getPageURL(screen_id));
                            //   this.props.history.push(PageMapper.getPageURL(screen_id));
                            //"/two_b"
                        } else {
                            console.log(" Error save  quote  " + JSON.stringify(data))
                        }
                    },
                    error: (err) => {
                        console.log("ERROR in quote " + JSON.stringify(err));
                    }
                })
                // ########################### quote save end #########################
            } else {
                console.log(" user_data session is null on page 1 ");
            }
        } else {
            $("#validation_section_one").css("display", 'block');
            setTimeout(function(){
                $("#validation_section_one").css("display", 'none');
            }, 4000);
        }
        // }else{
        //     $("#div-agent-state-eligibility").css("display", 'block');
        // }
    }

  

    componentDidMount() {
        $('.faq').css('border-top','3px solid #00c3ff')
       
        //this.history.pushState("", "/life-insurance-online-questionnaire");

        //IMPORTANT SCROLL DOWN
        $(document).on('click', '#important_information_link', function () {
            $('html, body').animate({
                scrollTop: $("#tandc").offset().top
            }, 2000);
        })


        var self = this
        // ############################## dropdown api #######################
        DropdownCall.dropdown_req(dropdown.table_name.page1, dropdown.column_name.Gender, "gender", null, true)
        DropdownCall.dropdown_req(dropdown.table_name.page1, dropdown.column_name.Height, "height", null, true)
        DropdownCall.dropdown_req(dropdown.table_name.page1, dropdown.column_name.Income_need, "monthly_recieve", 3500, false)

        // ############################## dropdown api #######################
        var dob = document.getElementById("date-of-birth");
        Inputmask({ mask: "99/99/9999", placeholder: "mm/dd/yyyy", clearIncomplete: true }).mask(dob);
        //  ****************************** count change in dropdowns **************
        var height_count = 0;
        $('#height').on('change', function () {
            height_count = height_count + 1;
        })
        var tobbacouse_count = 0;
        $('#tobbacouse').on('change', function () {
            tobbacouse_count = tobbacouse_count + 1;
        })
        var monthly_recieve_count = 0;
        $('#monthly_recieve').on('change', function () {
            monthly_recieve_count = monthly_recieve_count + 1;
        })
        //  ****************************** count change in dropdowns **************



        $(document).on('change', 'select', function () {
            if (this.value != '') {
                // validation_flag = true;
                $(this).prev('.select-side').css('cssText', 'border: 2px solid black !important; border-left: 0 !important;');
                $(this).css('cssText', 'border: 2px solid black !important');

            }
        });
        // ######################### VALIDATION FOR DOB STARTS HERE #########################
        $(document).on('blur', '#date-of-birth', function (e) {

            if (moment(this.value).isValid()) {
                var age = moment().diff(this.value, 'years')
                // console.log(age)
                if (age >= 20 && age <= 50) {
                    $("#div-age-validation").css('display', 'none');
                    $(this).css('border-color', 'black');
                    $("#validation_" + this.id).remove();
                    age_validation = true;
                } else {
                    // $(this).css('border-color', 'red');
                    $("#validation_" + this.id).remove();
                    $("#div-age-validation").css('display', 'block')
                    age_validation = false;
                }
            } else {
                $("#validation_" + this.id).is(":visible") ? $("#validation_" + this.id).remove() : null;
                console.log(this.value.length)
                if (this.value.length == 0) {
                    $(this).css('border-color', 'red');
                    $("#validation_" + this.id).is(":visible") ? null : $('<small id=validation_' + this.id + ' style="color: red;">' + ErrorMsg.home[this.id] + '</small>').insertAfter("#" + this.id);
                } else {
                    $(this).css('border-color', 'red');
                    $("#validation_" + this.id).is(":visible") ? null : $('<small id=validation_' + this.id + ' style="color: red;">Please enter proper value</small>').insertAfter("#" + this.id);
                }

                // $(this).css('border-color', 'red');
                // $("#validation_" + this.id).is(":visible") ? null : $('<small id=validation_' + this.id + ' style="color: red;position: absolute;left: 16px;bottom: -16px;">Please enter proper value</small>').insertAfter("#" + this.id);
            }
            //
        });
        // ######################### VALIDATION FOR DOB STARTS HERE #########################

        // ######################### VALIDATION FOR ZIPCODE STARTS HERE #########################
        $(document).on('blur', '.zipcode', function (e) {
            var location = zipcodes.lookup($("#zipcode").val());
            // console.log(JSON.stringify(location))
            if (location != null) {
                // $('#div-zip-validation').css('display', 'none');
                $("#validation_" + this.id).remove();
                $(this).css('border-color', 'black');

                self.state_eligibility(location)
                    .then(function () {
                        //AGENT CHECK -- IF HE"S VALID FOR THAT PARTICULAR STATE
                        if (sessionStorage.getItem('agent_present_flag') == '1') {
                            return self.check_agent_state_validity(location);
                        }
                    });

            } else {
                if (this.value.length == 0) {
                    $(this).css('border-color', 'red');
                    $("#validation_" + this.id).is(":visible") ? null : $('<small id=validation_' + this.id + ' style="color: red;">' + ErrorMsg.home[this.id] + '</small>').insertAfter("#" + this.id);
                    // $('#div-zip-validation').css('display', 'block');
                    zipcode_flag = false
                } else {
                    $(this).css('border-color', 'red');
                    $("#validation_" + this.id).is(":visible") ? null : $('<small id=validation_' + this.id + ' style="color: red;">Please enter proper zipcode</small>').insertAfter("#" + this.id);
                    // $('#div-zip-validation').css('display', 'block');
                    zipcode_flag = false
                }

            }

        });

        $(document).on('keyup', '.zipcode', function (e) {
            var code = e.keyCode || e.charCode
            if ((code >= 48 && code <= 57) || code == 8 || code == 9) {
                if (this.value != "" && (this.value.length >= 1 && this.value.length <= 5)) {
                    $(this).css('border-color', 'black');
                    $("#validation_" + this.id).remove();
                }
                // else {
                //     $(this).css('border-color', 'red');
                // }
            } else {
                e.preventDefault();
            }
        })


        $(document).on('keypress', '#weight', function (e) {
            // console.log(e.keyCode)
            var code = e.keyCode || e.charCode

            if ((code >= 48 && code <= 57) || code == 8 || code == 9) {
                if (this.value != "" && (this.value.length >= 1 && this.value.length <= 5)) {
                    $("#weight-div").css('border-color', 'black');
                    $("#validation_" + this.id).remove();
                }
            } else {
                e.preventDefault();
            }
        });
        $(document).on('blur', '#weight', function (e) {
            // alert("Inn"+ this.value != null)

            if (this.value.length > 0) {
                // $('#div-zip-validation').css('display', 'none');
                $("#validation_" + this.id).remove();
                $("#weight-div").css('border-color', 'black');

            } else {
                // alert("Inn"+ this.value.length)
                if (this.value.length == 0) {

                    $("#weight-div").css('border-color', 'red');
                    $("#validation_" + this.id).is(":visible") ? null : $('<small id=validation_' + this.id + ' style="color: red;">' + ErrorMsg.home[this.id] + '</small>').insertAfter("#weight-div");
                }


            }
        });



    }

    check_agent_state_validity = (location_obj) => {
        return new Promise(function (resolve, reject) {
            var body_data = {
                "agent_data": {
                    "agent_id": sessionStorage.getItem('agent_id'),
                    "state": location_obj.state
                }
            };

            // alert(ApiList.current.base_api_url + '/agentelegibility/check')
            $.ajax({
                url: ApiList.current.base_api_url + ApiList.agent.agent_eligible,
                type: 'POST',
                data: JSON.stringify(body_data),
                headers: {
                            'Authorization': 'Bearer '+ this.props.token,
                            'Content-Type': 'application/json'
                },
                success: (data) => {
                    if (data.statusCode == 406) {
                        zipcode_flag = false;
                        $('#zipcode').css('border-color', 'red');
                        $("#validation_agent_state").is(":visible") ? null : $('<small id=validation_agent_state style="color: red;">YOU ARE INELIGIBLE TO SELL POLICY IN THIS STATE</small>').insertAfter("#zipcode");
                        // $('#div-agent-state-eligibility').css('display', 'block');
                    } else {
                        zipcode_flag = true;
                        $('#zipcode').css('border-color', 'black');
                        $("#validation_agent_state").remove();
                        // $("#validation_agent_state").is(":visible") ? null : $('<small id=validation_agent_state style="color: red;">YOU ARE INELIGIBLE TO SELL POLICY IN THIS STATE</small>').insertAfter("#zipcode");
                        // $('#div-agent-state-eligibility').css('display', 'none');
                    }
                },
                error: (err) => {
                    console.log("ERROR in state elibility  " + JSON.stringify(err));
                    reject();
                }
            })
        });
    }

    // validate_zip = () => {
    //     var validation_flag = true;

    //     if (sessionStorage.getItem('agent_flag') != '1' && zipcode_flag == false) {
    //         validation_flag = false
    //     }else{
    //         validation_flag = true;
    //     }
    // }

    validate_form = () => {
        var validation_flag = true;
        $('select option:selected').map(function () {
            if (this.value != '') {
                // validation_flag = true;
                $(this).parent('select').prev('.select-side').css('cssText', 'border: 2px solid black !important; border-left: 0 !important');
                $(this).parent('select').css('cssText', 'border: 2px solid black !important');

            } else {
                validation_flag = false;
                $(this).parent('select').prev('.select-side').css('cssText', 'border: 2px solid red !important; border-left: 0 !important;');
                $(this).parent('select').css('cssText', 'border: 2px solid red !important');
            }
        });

        // //FOR EMPTY FIELD VALIDATION & MAKE BOXES RED
        $('input').map(function () {
            if (this.id == 'weight') {
                if (this.value != '') {
                    validation_flag = true;
                    $("#weight-div").css('border-color', '2px solid black');

                } else {
                    validation_flag = false;
                    $("#weight-div").css('border', '2px solid red');
                }
            } else {
                if (this.value != '') {
                    validation_flag = true;
                    $(this).css('border-color', '2px solid black');

                } else {
                    validation_flag = false;
                    $(this).css('border', '2px solid red');
                }
            }
        });


        if (!moment($('#date-of-birth').val()).isValid()) {
            validation_flag = false;
        }

        if (!$('#zipcode').val()) {
            validation_flag = false;
        }

        if (age_validation == false) {
            validation_flag = false;
        }
        if ($('#zipcode').val().length < 5) {
            validation_flag = false;
        }

        if (!$('#weight').val()) {
            validation_flag = false;
        }

        if (sessionStorage.getItem('agent_flag') != '1' && zipcode_flag == false) {
            validation_flag = false
        }

        // //DROPDOWN
        // if($("#gender option:selected").val()){

        // }else{

        // }

        return validation_flag;
    }

    state_eligibility = (location) => {
        return new Promise(function (resolve, reject) {
            let user_data = JSON.parse(sessionStorage.getItem('user_data'));
            $.ajax({
                url: ApiList.current.base_afficient_api_url + ApiList.state_eligible,
                type: 'POST',
                data: JSON.stringify({
                    "state_eligibility": {
                        "product_id": "100001",
                        "state_code": location.state
                    }
                }),
                headers: {
                            'Authorization': 'Bearer '+ this.props.tokenA,
                            'Content-Type': 'application/json'
                },
                success: (data) => {
                    console.log("state eligibility>>> " + JSON.stringify(data))
                    if (data.eligibility_flag == 1) {

                        user_data.city = location.city
                        user_data.country = location.country
                        user_data.state = location.state
                        sessionStorage.setItem('user_data', JSON.stringify(user_data))
                        $('#div-zip-eligibility').css('display', 'none');
                        zipcode_flag = true
                        resolve();
                    } else {
                        zipcode_flag = false
                        $('#div-zip-eligibility').css('display', 'block');
                        resolve();
                    }

                },
                error: (err) => {
                    console.log("ERROR in state elibility  " + JSON.stringify(err));
                    reject();
                }
            })
        });
    }

    onChange(date) {
        this.setState({
            selectedDate: moment(date).format("YYYY-MM-DD")
        });
    }
    fetch_ids = () => {

    }

    render() {
        return (
            <div>
                <div className="col-md-12" style={{ color: 'black', backgroundColor: "#00C3FF" }}>
                    <div className="bgimg" id="105"> <img src={img_one} className="img-fluid imgofbg" alt="" /> </div>
                    <div className="container  mb2">
                        <div className="col-md-8 mt3 text-center bgimagetext">
                            {/* 106 STARTS HERE*/}
                            <div className="col-md-8 mt4 col-md-offset-1" style={{ color: "white", lineHeight: 1.0 }} id="">Designed to replace monthly </div>
                            <div className="col-md-8 col-md-offset-1" style={{ color: "white", lineHeight: 1.0 }} id="">income for today's families.</div>
                            {/* 106 ENDS HERE */}

                            <div className="col-md-8 mt6 col-md-offset-1" style={{ color: "white" }} id="142">Salary Shield<sup>SM</sup></div>
                        </div>
                        <div className="col-md-4 mt3 col-xs-12 text-left quote_form">
                            <div className="col-md-12 col-xs-12 agendabold38 quote_now_heading mt3" id="108" > Get your quote now!</div>
                            {/* <form id="section1_form"> */}

                            <div className="col-md-6 col-xs-6 mt3 mb2 pd0">

                                <div className="col-md-12 col-xs-12 fgsd14 tt mb2" id="109">DATE OF BIRTH</div>
                                <div className="col-md-12 col-xs-12 pr5">
                                    {/* <DatePickerInput
                                        onChange={this.onChange}
                                        maxDate={moment().subtract(18, "years")}
                                        value={this.state.selectedDate}
                                        className="custom_datepicker"
                                        displayFormat={"YYYY-MM-DD"}

                                    /> */}

                                    <input type="text" id="date-of-birth" name="date-of-birth" />
                                </div>
                            </div>
                            <div className="col-md-6 col-xs-6 mt3 mb2 pd0"> <div className="col-md-12 col-xs-12 tt fgsd14 mb2" id="110">GENDER</div>
                                <div className="col-md-12 col-xs-12 110 pl5">
                                    <div className="rail-select">
                                        <div className="select-side">
                                            <img src={img_two} alt="" />
                                        </div>
                                        <select className="form-control" id="gender">
                                            {/* <option value="M">Male</option>
                                            <option value="F">Female</option> */}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-12 col-xs-12 mt4 pd0">
                                <div className="col-md-12 col-xs-12 fgsd14 mt2 tt mb2" id="111">ZIP CODE</div>
                                <div className="col-md-12 col-xs-12"> <div className="form-group"><input type="text" id="zipcode" name="zipcode" className="zipcode" placeholder="00000" maxLength="5" /></div></div></div>
                            <div className="col-md-6 col-xs-6 mt3 pd0"><div className="col-md-12 fgsd14 tt mb2" id="112">  HEIGHT </div>
                                <div className="col-md-12 col-xs-12 pr5">
                                    <div className="form-group">
                                        <div className="rail-select">
                                            <div className="select-side">
                                                <img src={img_three} alt="" />
                                            </div>
                                            <select className="form-control" id="height">


                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-xs-6 mt3 pd0" > <div className="col-md-12 col-xs-12 tt fgsd14 mb2" id="113"> WEIGHT</div>
                                <div className="col-md-12 col-xs-12 pl5">
                                    {/* <div className=""> */}

                                    <div className="input-group weight" id="weight-div">
                                        <input className="form-control form-group person-weight" id="weight" name="weight" type="text" placeholder="120" maxLength="3" />
                                        <span className="input-group-addon">(lbs)</span>
                                    </div>
                                </div>
                                {/* </div> */}
                            </div>


                            <div className="col-md-12 col-xs-12 mt3 fgsd14 tt mb2" id="114">TOBBACO USE</div>
                            <div className="col-md-12 col-xs-12 114">
                                <div className="form-group">
                                    <div className="rail-select">
                                        <div className="select-side">
                                            <img src={img_three} alt="" />
                                        </div>
                                        <select className="form-control" id="tobbacouse">
                                            <option value=""></option>
                                            <option value="1">YES</option>
                                            <option value="0">NO</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12 col-xs-12 mt3 fgsd14 tt mb2" id="115">HOW MUCH INCOME WOULD YOU LIKE YOUR LOVED ONES TO RECEIVE MONTHLY ?</div>
                            <div className="col-md-12 col-xs-12">
                                <div className="rail-select">
                                    <div className="select-side">
                                        <img src={img_three} alt="" />
                                    </div>
                                    <select className="form-control" id="monthly_recieve">
                                        {/* <option value="2500">$2,500/month</option>
                                        <option value="1500">$1,500/month</option> */}
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-12 col-xs-12 mt5 mb3 text-center">
                                <button type="" className="btn cbtn_color tt my_quote_submit scroll_to" id="116" onClick={this.handleClick}> GET MY QUOTE</button>
                            </div>
                            <div className="validtion_box mt3 mb3" style={{ height: 150 }}>

                                 <div className="col-md-12 col-xs-12 mt2 text-left" id="validation_section_one" style={{ display: 'none' }}>
                                    {/* <span className="glyphicon glyphicon-exclamation-sign" style={{ color: "red",marginLeft:-14 }} /> */}
                                    <span className="fgsd14" style={{ color: "red"}}>Please complete all required fields to continue.</span>
                                </div>
                                <div className="col-md-12 col-xs-12 mt2" id="div-age-validation" style={{ display: 'none'  }}>
                                    <span className="glyphicon glyphicon-exclamation-sign" style={{ color: "red",marginLeft:-14 }} />
                                    <span className="ml4 fgsd14" style={{ color: "red" }}>WE'RE SORRY</span><br />
                                    <span className="ml4 fgsd14" style={{ color: "red" }}>SALARY SHIELD IS NOT AVAILABLE AT</span><br />
                                    <span className="ml4 fgsd14" style={{ color: "red" }}>THIS AGE</span>
                                </div>
                                <div className="col-md-12 col-xs-12 mt2" id="div-zip-eligibility" style={{ display: 'none' }}>
                                    <span className="glyphicon glyphicon-exclamation-sign" style={{ color: "red",marginLeft:-14 }} />
                                    <span className="ml4 fgsd14" style={{ color: "red" }}>WE'RE SORRY</span><br />
                                    <span className="ml4 fgsd14" style={{ color: "red" }}>SALARY SHIELD IS NOT AVAILABLE IN</span><br />
                                    <span className="ml4 fgsd14" style={{ color: "red" }}>YOUR STATE YET</span>
                                </div>
                                {/* <div className="col-md-12 col-xs-12 mt2" id="div-agent-state-eligibility" style={{ display: 'none' }}>
                                    <span className="glyphicon glyphicon-exclamation-sign" style={{ color: "red" }} />
                                    <span className="ml4 fgsd14" style={{ color: "red" }}>YOU ARE INELIGIBLE TO SELL</span><br />
                                    <span className="ml8 fgsd14" style={{ color: "red" }}>POLICY IN THIS STATE</span><br />
                                </div> */}
                                {/* <div className="col-md-12 col-xs-12 mt2" id="div-zip-validation" style={{ display: 'none' }}>
                                    <span className="glyphicon glyphicon-exclamation-sign" style={{ color: "red" }} />
                                    <span className="ml4 fgsd14" style={{ color: "red" }}>Please enter correct zipcode.</span><br />

                                </div> */}
                            </div>
                            {/* </form> */}
                        </div>

                    </div>
                    <a href="#important-information" id="important_information_link" >
                        <div className="important_information fgsd18">IMPORTANT INFORMATION</div>
                    </a>
                </div>
            </div>

        )
    }
}
export default withRouter(SectionFourteen)
