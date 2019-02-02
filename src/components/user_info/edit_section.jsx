import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import $ from 'jquery';
import cookie from 'react-cookies'
import moment from 'moment';
import ApiList from "../../config/base.json"
import dropdown from "../../config/dropdown.json"
import PageMapper from "../../config/page_mapper";
import Inputmask from "inputmask";
import '../../css/user_info/edit_section.css';
import ErrorMsg from "../../config/error_msgs";
const edit_icon = ApiList.base_cdn_src+"/images/SVG/edit_icon.svg"
const AddBeni = ApiList.base_cdn_src+"/images/SVG/plus_icon.svg"
const delete_icon = ApiList.base_cdn_src+"/images/SVG/delete_can_icon.svg"
const close_model = ApiList.base_cdn_src+"/images/SVG/Close_icon.svg"
const drop_arrow = ApiList.base_cdn_src+"/images/SVG/down_arrow.svg";
// çç

let user_data = JSON.parse(sessionStorage.getItem('user_data'))
var Beneficiaries_flag = true;
var benificary_dob_valid_flag = true;
var Beneficmobile_flag = true;
let beneficiaryAffId = [];

export default class EditSection extends Component {
    constructor() {
        super();
        this.state = {
            dropdown_value: '',
            current_page_index: sessionStorage.getItem('current_index'),
        }
    }

    componentDidMount() {
        var self = this;
        var dob = $('.beni-date-of-birth')
        Inputmask({ mask: "99/99/9999", placeholder: "mm/dd/yyyy", clearIncomplete: true }).mask(dob);
        self.fetch_benificary();
        $(document).on('click', '.edit_text', function () {
            $(this).closest('tr').find('input').removeAttr('disabled')

        })
        $(document).on('click', '.edit_text_benificary', function () {
            $(this).closest('tr').find('input').removeAttr('disabled')
            $(this).closest('tr').find('select').removeAttr('disabled')
            $(this).closest('tr').find('.text_disabled_color').removeAttr('disabled')

        })
        $(document).on('click', '.delete_beni_icon', function () {

            if ($('.tbody2 tr').length > 1) {
                $(this).closest('tr').remove()
                if ($('.tbody2 tr').length == 1) {
                    $('.delete_beni_icon').hide()
                }
            }

        })

        // $(document).on('click', '.edit_page_continue', function (e) {

        // });

        // ######################### VALIDATION FOR NAME STARTS HERE #########################
        $(document).on('blur', '.edit_mobile_number', function (e) {
            var value = this.value.toString().trim().replace(/["'\-() ]/g, "");

            if (value != "" & value.length == 10) {

                $("#validation_" + this.id).remove();
                $(this).css('border-color', 'black');
            } else {
                $(this).css('border-color', 'red');
                if (value.length < 10) {
                    $("#validation_" + this.id).is(":visible") ? null : $('<small id=validation_' + this.id + ' style="color: red;">Please enter proper value</small>').insertAfter("#" + this.id);
                } else {
                    $("#validation_" + this.id).is(":visible") ? null : $('<small id=validation_' + this.id + ' style="color: red;">This field is required</small>').insertAfter("#" + this.id);
                }
            }
        });

        $(document).on('keypress', '.edit_mobile_number', function (e) {
            var code = e.keyCode || e.charCode;

            if ((code >= 48 && code <= 57) || code == 8 || code == 9) {

            } else {
                e.preventDefault();
            }
        });
        function get_phone_masked(tel) {
            if (!tel) { return ''; }
            var value = tel.toString().trim().replace(/["'() ]/g, "");    // replace(/^\+/g, '');
            if (value.match(/[^0-9]/)) {
                return tel;
            }
            var city, number;
            switch (value.length) {
                case 1:
                case 2:
                case 3:
                    city = value;
                    break;
                default:
                    city = value.slice(0, 3);
                    number = value.slice(3);
            }
            if (number) {
                if (number.length > 3) {
                    number = number.slice(0, 3) + '-' + number.slice(3, 7);
                }
                else {
                    number = number;
                }
                return ("(" + city + ") " + number).trim();
            } else {
                return "(" + city;
            }
        }

        $(document).on('keyup', '.edit_mobile_number', function (e) {
            var op = get_phone_masked(this.value);
            $(this).val(op);
        });
        // ######################### VALIDATION FOR PHONE  ENDS HERE #########################

        // ######################### VALIDATION FOR EMAIL STARTS HERE #########################
        $(document).on('blur', '.edit_email', function (e) {
            if (this.value != "") {
                var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                if (!re.test(this.value)) {
                    $(this).css('border-color', 'red');
                    $("#validation_" + this.id).remove();
                    $("#validation_email_" + this.id).is(":visible") ? null : $('<small id=validation_email_' + this.id + ' style="color: red;">Please enter a valid email id</small>').insertAfter("#" + this.id);

                } else {
                    $("#validation_email_" + this.id).remove();
                    $(this).css('border-color', 'black');
                }
            } else {
                $(this).css('border-color', 'red');
                $("#validation_email_" + this.id).remove();
                $("#validation_" + this.id).is(":visible") ? null : $('<small id=validation_' + this.id + ' style="color: red;">This field is required</small>').insertAfter("#" + this.id);
            }
        });
        // ######################### VALIDATION FOR EMAIL STARTS HERE #########################

        // ######################## VALIDATION FROM BENIFICARY FIRST NAME AND LAST NAME ########
        $(document).on('keypress', '.first-name,.last-name', function (e) {
            var code = e.keyCode || e.charCode;
            if (!(code >= 48 && code <= 57) || code == 8 || code == 9) {
            } else {
                e.preventDefault();
            }
        })
        // ######################## VALIDATION FROM BENIFICARY FIRST NAME AND LAST NAME ########

        // ######################### VALIDATION FOR DOB STARTS HERE #########################
        $(document).on('blur', '.beni-date-of-birth', function (e) {

            if (moment(this.value).isValid()) {

                var age_diff = moment().diff(this.value, 'days')
                if (age_diff <= 0) {
                    $(this).css('border-color', 'red');
                    $(this).siblings('small').is(":visible") ? null : $('<small  style="color: red;"><p>Please enter proper date of birth</p></small>').insertAfter($(this));
                    benificary_dob_valid_flag = false
                    console.log("forward date" + benificary_dob_valid_flag)
                } else {
                    $(this).css('border-color', 'black');
                    $(this).siblings('small').remove()
                    benificary_dob_valid_flag = true
                    // $('.dob_beni_error').css('display', 'none')
                    console.log("true" + benificary_dob_valid_flag)
                }
            } else {
                $("#validation_" + this.id).is(":visible") ? $("#validation_" + this.id).remove() : null;
                console.log(this.value.length)
                if (this.value.length == 0) {
                    $(this).css('border-color', 'red');
                    $(this).siblings('small').is(":visible") ? null : $('<small style="color: red;"><p>' + ErrorMsg.beneficiary['beni-date-of-birth'] + '</p></small>').insertAfter($(this));
                    benificary_dob_valid_flag = false
                } else {
                    $(this).css('border-color', 'red');
                    $(this).siblings('small').is(":visible") ? null : $('<small style="color: red;"><p>Please enter proper value</p></small>').insertAfter($(this));
                    benificary_dob_valid_flag = false
                }
            }
            //
        });
        // ######################### VALIDATION FOR DOB STARTS HERE #########################




        $(document).on('keyup', '.beni_percent', function () {
            var total_percentage = 0;
            $('.beni_percent').map(function () {
                total_percentage = parseInt(total_percentage) + parseInt($(this).val());
            })
            if (total_percentage == 100) {
                Beneficiaries_flag = true
                $('.beni_percent_err_msg').css('display', 'none')
            } else {
                Beneficiaries_flag = false
                $('.beni_percent_err_msg').css('display', 'block')
            }
        })

    }

    fetch_benificary = () => {
        var self = this;
        $.ajax({
            url: ApiList.current.base_api_url + '/' + ApiList.dropdown_base_url,
            type: 'POST',
            data: JSON.stringify({
                "dropdown_list": {
                    "table_name": dropdown.table_name.page7,
                    "column_name": dropdown.column_name.relationship
                }
            }),
            headers: {
                        'Authorization': 'Bearer '+ sessionStorage.getItem('authtoken'),
                        'Content-Type': 'application/json'
            },
            success: (data) => {
                // alert(JSON.stringify(data))
                var options_ = "";
                for (var i = 0; i < data.length; i++) {

                    options_ += '<option value=' + data[i].refValue + '>' + data[i].ref_key + '</option>'

                    if (i == data.length - 1) {
                        // $('.relation').append(options);
                        self.setState({
                            dropdown_value: options_
                        })
                    }
                }

                user_data = JSON.parse(sessionStorage.getItem('user_data'));
                if (user_data) {
                    $('.edit_first_name').val(user_data.first_name)
                    $('.edit_last_name').val(user_data.last_name)
                    $('.edit_mobile_number').val(user_data.phone_number)
                    $('.edit_email').val(user_data.email)

                    var home_address = user_data.home_address ? user_data.home_address + ',\n' : ''
                    $('.edit_address').val(user_data.apt_no + ',\n' + home_address + user_data.city + ',\n' + user_data.state + ',\n' + user_data.zipcode)
                    //  alert(user_data.beni_arr.length)
                    var options = "";

                    for (var i = 0; i < user_data.beni_arr.length; i++) {
                        // alert()
                        // alert(self.state.dropdown_value)
                        options += '<tr class="col-md-12 col-xs-12"> <td class="col-md-2 col-xs-12 fgsb16"><input class="first-name" type="text" value=' + user_data.beni_arr[i].bene_first_name + ' disabled /></td> <td class="col-md-2 col-xs-12 fgsb16"><input type="text" class="last-name" value=' + user_data.beni_arr[i].bene_last_name + ' disabled /></td> <td class="col-md-2 col-xs-12 fgsb16"><input class="beni-date-of-birth" type="text" value=' + user_data.beni_arr[i].dob + ' disabled /></td> <td class="col-md-3 col-xs-12 fgsb16"><div class="rail-select text_disabled_color" disabled><div class="select-side"><img class="drop_arrow" src={drop_arrow} alt="" /></div><select class="relation" id="relation" style="width: 130%" disabled>' + self.state.dropdown_value + ' </select></div></td> <td class="col-md-2 col-xs-12 fgsb16"><input class="col-md-8 col-xs-10 beni_percent" type="text" value=' + user_data.beni_arr[i].percentage + ' disabled /><div class="col-md-2 col-xs-2" style="margin:10px auto"> % </div>   </td> <td class="col-md-1 col-xs-12 fgsb16"> <img class="edit_text_benificary beni_icon edit_text_img" src=' + edit_icon + ' alt="edit" role="img" focusable="true" /> <img class="edit_text delete_beni_icon edit_text_img" src=' + delete_icon + ' alt="delete" role="img" focusable="true" /> </td> </tr>'
                        if (i == user_data.beni_arr.length - 1) {
                            $('.tbody2').append(options)
                            var dob = $('.beni-date-of-birth')
                            Inputmask({ mask: "99/99/9999", placeholder: "mm/dd/yyyy", clearIncomplete: true }).mask(dob);
                            $('.beni_icon').attr('src', edit_icon)
                            $('.drop_arrow').attr('src', drop_arrow)
                            var j = 0;
                            $('.relation').map(function () {
                                $(this).val(user_data.beni_arr[j].relationship_to_applicant)
                                j++;
                            })
                        }

                    }
                    for (var i = 0; i < user_data.beni_arr.length + 1; i++) {
                        self.get_beneficary_aff_id()
                    }
                }

            },
            error: (err) => {
                console.log("ERROR in dropdown relation " + JSON.stringify(err));
            }
        })
    }

    update_beni = () => {
        var self = this;
        if (self.validate_form()) {

            let user_data = JSON.parse(sessionStorage.getItem('user_data'))

            this.update_personal_info()
            var beni_arr = [];
            var benifi_arr = [];
            $('.tbody2 > tr').map(function () {
                benifi_arr.push({
                    "afficiency_id": cookie.load('aff2') ? cookie.load('aff2') : user_data.aff2,
                    "app_attempt_no": 100,
                    "visit_id": cookie.load('visit_id'),
                    "relationship_to_applicant": $(this).find('.relation').val(),
                    // "bene_first_name": $(this).find('.first-name').val(),
                    // "bene_last_name": $(this).find('.last-name').val(),
                    "dob": $(this).find('.beni-date-of-birth').val(),
                    'percentage': $(this).find('.beni_percent').val()
                })
            })
            $('.tbody2 > tr').map(function () {

                beni_arr.push({
                    "afficiency_id": cookie.load('aff2') ? cookie.load('aff2') : user_data.aff2,
                    "app_attempt_no": 100,
                    "visit_id": cookie.load('visit_id'),
                    "relationship_to_applicant": $(this).find('.relation').val(),
                    "bene_first_name": $(this).find('.first-name').val(),
                    "bene_last_name": $(this).find('.last-name').val(),
                    "dob": $(this).find('.beni-date-of-birth').val(),
                    'percentage': $(this).find('.beni_percent').val()
                })
            })
            user_data.beni_arr = beni_arr;
            sessionStorage.setItem('user_data', JSON.stringify(user_data))
            console.log(JSON.stringify(beni_arr))

            let datastring = {
                "applicant_beneficiaries": benifi_arr,
                "navigation_log": {
                    "visit_id": cookie.load('visit_id'),
                    "page_url": window.location.pathname,
                    "entry_timestamp": moment().format("MM/DD/YYYY"),
                    "exit_timestamp": moment().format("MM/DD/YYYY"),
                    "interactive_indicator": 1
                }
            }
            $.ajax({
                url: ApiList.current.base_api_url + ApiList.page_ten.update_beneficiaries,
                type: 'POST',
                data: JSON.stringify(datastring),
                headers: {
                            'Authorization': 'Bearer '+ sessionStorage.getItem('authtoken'),
                            'Content-Type': 'application/json'
                },
                success: (data) => {
                    if (data.statusCode == 200) {
                        self.save_identity_benificary()


                    }
                },
                error: (err) => {
                    console.log("ERROR in benificary save api " + JSON.stringify(err));
                }
            })
        }
    }

    update_personal_info = () => {
        let user_data = JSON.parse(sessionStorage.getItem('user_data'))
        let datastring = {
            "application_update": {
                "afficiency_id": cookie.load('aff2') ? cookie.load('aff2') : user_data.aff2,
                "email": $('.edit_email').val(),
                "phone": $('.edit_mobile_number').val().toString().trim().replace(/["'\-() ]/g, ""),
                "agent_flag": sessionStorage.getItem('agent_present_flag') ? sessionStorage.getItem('agent_present_flag') : 0
            },
            "navigation_log": {
                "visit_id": cookie.load('visit_id'),
                "page_url": window.location.pathname,
                "entry_timestamp": moment().format("MM/DD/YYYY"),
                "exit_timestamp": moment().format("MM/DD/YYYY"),
                "interactive_indicator": 1
            }
        }
        if (sessionStorage.getItem('agent_present_flag')) {
            datastring.application_update['agent_id'] = sessionStorage.getItem('agent_id');
            datastring.application_update['agent_assisted_flag'] = 1;
            datastring.application_update['agent_entry_screen'] = 10
        }
        console.log("updaet personal info >>> " + JSON.stringify(datastring))
        console.log(ApiList.current.base_api_url + ApiList.page_ten.update_personal_info)
        $.ajax({
            url: ApiList.current.base_api_url + ApiList.page_ten.update_personal_info,
            type: 'POST',
            data: JSON.stringify(datastring),
            headers: {
                        'Authorization': 'Bearer '+ sessionStorage.getItem('authtoken'),
                        'Content-Type': 'application/json'
            },
            success: (data) => {
                console.log("update personal_info res >> " + JSON.stringify(data))

            },
            error: (err) => {
                console.log("ERROR in upadte prsonal  save api " + JSON.stringify(err));
            }
        })
    }

    save_identity_benificary = () => {
        var self = this;
        let user_data = JSON.parse(sessionStorage.getItem('user_data'))
        var identitydatastring = [];
        $('.tbody2 > tr').map(function () {
            identitydatastring.push({
                "applicantAffId": cookie.load('aff2') ? cookie.load('aff2') : user_data.aff2,
                "relationshipType": $(this).find('.relation').val(),
                "firstName": $(this).find('.first-name').val(),
                "lastName": $(this).find('.last-name').val(),
                "dob": $(this).find('.beni-date-of-birth').val(),
                "beneficiaryAffId": beneficiaryAffId.pop()

            })
        })
        console.log("identity benificary api " + JSON.stringify(identitydatastring));
        $.ajax({
            url: ApiList.current.base_identiy_api_url + ApiList.Identity_beneficiaries_save,
            type: 'POST',
            data: JSON.stringify(identitydatastring),
            headers: {
                        'Authorization': 'Bearer '+ sessionStorage.getItem('authtoken'),
                        'Content-Type': 'application/json'
            },
            success: (data) => {
                console.log(" identityBeneficiaryAP page 10 api " + JSON.stringify(data))
                if (data.status == "success") {
                    var screen_id = PageMapper.getNextPageId(parseInt(sessionStorage.getItem('current_index')) + 1);
                    sessionStorage.setItem('current_index', (parseInt(sessionStorage.getItem('current_index')) + 1));
                    window.location.href = PageMapper.getPageURL(screen_id);
                }
            },
            error: (err) => {
                console.log("ERROR in identityBeneficiaryAP page 10 api " + JSON.stringify(err));
            }
        })
    }

    get_beneficary_aff_id = () => {
        $.ajax({
            url: ApiList.current.base_api_url + ApiList.aff0_fetch,
            type: 'GET',
            headers: {
                        'Authorization': 'Bearer '+ sessionStorage.getItem('authtoken'),
                        'Content-Type': 'application/json'
            },
            success: (data) => {
                beneficiaryAffId.push(data)
                // alert(beneficiaryAffId)

            },
            error: (err) => {
                console.log("ERROR in fetch redis  " + JSON.stringify(err));
            }
        })

    }

    add_new_beni_row = () => {
        var self = this;
        if ($('.tbody2 tr').length < 5) {
            $('.delete_beni_icon').first().show()
            var options = "";
            options += '<tr class="col-md-12 col-xs-12"> <td class="col-md-2 col-xs-12 fgsb16"><input class="first-name" type="text"  /></td> <td class="col-md-2 col-xs-12 fgsb16"><input type="text" class="last-name" /></td> <td class="col-md-2 col-xs-12  fgsb16"><input class="beni-date-of-birth" type="text"  /></td> <td class="col-md-3 col-xs-12 fgsb16"><div class="rail-select text_disabled_color"><div class="select-side"><img class="drop_arrow" src={drop_arrow} alt="" /></div><select class="relation" id="relation" style="width: 100%">' + self.state.dropdown_value + ' </select></div></td> <td class="col-md-2 col-xs-12  fgsb16"><input class="col-md-8 col-xs-10 beni_percent" type="text" /><div class="col-md-2 col-xs-2" style="margin:10px auto"> % </div>   </td> <td class="col-md-1 col-xs-12 fgsb16"> <img class="edit_text_benificary beni_icon edit_text_img" src=' + edit_icon + ' alt="edit" role="img" focusable="true" tabindex=0 autofocus=true /> <img class="edit_text delete_beni_icon edit_text_img" src=' + delete_icon + ' alt="delete" role="img" focusable="true" tabindex=1 autofocus=true /> </td> </tr>'
            $('.tbody2').append(options)
            var dob = $('.beni-date-of-birth')
            Inputmask({ mask: "99/99/9999", placeholder: "mm/dd/yyyy", clearIncomplete: true }).mask(dob);
            $('.beni_icon').attr('src', edit_icon)
            $('.drop_arrow').attr('src', drop_arrow)
            self.get_beneficary_aff_id()

        }   $( ".first-name:last-of-type" ).focus();
    }

    validate_form = () => {
        var validation_flag = true;

        $('input[type=text]:visible:enabled').map(function () {
            if (this.value != '') {
                $(this).css('border', 'unset');
                $(this).siblings('small').remove()
            } else {
                $(this).siblings('small').is(":visible") ? null : $('<small style="color: red;">Please answer this question</small>').insertAfter($(this));
                validation_flag = false;
                $(this).css('border', '2px solid red');
            }
        });


        if (Beneficiaries_flag == false) {
            validation_flag = false
        }

        if (benificary_dob_valid_flag == false) {
            validation_flag = false;
        }

        return validation_flag;
    }


    render() {
        return (
            <div>
                {/* <button id="" data-toggle="modal" data-target="#edit_section_popup" type="button" >askdg asgh</button> */}
                <div id="edit_section_popup" class="modal fade" role="dialog">
                    <div class="modal-dialog">

                        <div class="modal-content">
                            <div class="modal-body">
                                <button type="button" className="close" style={{ position: "absolute", right: "20px", opacity: 1 }} data-dismiss="modal"><img src={close_model} alt="" style={{ width: "30px", height: "31px" }} /></button>
                                <div className="agendabold32 text-center mt8">If you edit this information you will need to restart your application.</div>
                                <div className="text-center" style={{ marginBottom: 5, marginTop: 25 }}> <Link to="/" className="btn cbtn mt2" style={{ width: '200px' }}>Restart your application</Link>&nbsp;&nbsp;&nbsp;
                                    <Link to="#" data-dismiss="modal" className="btn cbtn_color mt2" style={{ width: '200px' }}>Resume current application</Link></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-12">
                    <div className="container">
                        <div className="col-md-12 text-center mt3">
                            <ul className="list-unstyled">
                                <li role="presentation"  >
                                <span className="screen_reader">list review your application 1 of 2</span> <h2 id="1015" className="agendabold42 Review"></h2>
                                </li>
                                <li  role="presentation" className="mt1 ltr18" > <span className="screen_reader">list review your application 2 of 2</span> <span id="1016"></span></li>

                            </ul>
                        </div>
                        <div className="col-md-12 mt2">
                            <table className="table table-fixed" style={{ marginBottom: 0 }}>
                                <thead>
                                    <tr>
                                        <th colspan="2" ><h3 className="agendabold32" id="1017"></h3></th>

                                    </tr>
                                </thead>
                                <tbody className="personal_info_tbody">
                                    <tr className="col-md-12 col-xs-12">
                                        <td className="col-md-10 col-xs-10 fgsb16"><input type="text" className="edit_first_name" defaultValue="First Name" disabled /></td>
                                        <td className="col-md-2 col-xs-2 show_popup text_center"><div data-toggle="modal" data-target="#edit_section_popup" > <img className="edit_text_img" src={edit_icon} alt="edit" role="img" focusable="true" /> </div></td>
                                    </tr>
                                    <tr className="col-md-12">
                                        <td className="col-md-10 col-xs-10  fgsb16"><input type="text" className="edit_last_name" defaultValue="Last Name" disabled /></td>
                                        <td className="col-md-2 col-xs-2"><div data-toggle="modal" data-target="#edit_section_popup" >  <img className="edit_text_img" src={edit_icon} alt="edit" role="img" focusable="true" /> </div></td>
                                    </tr>
                                    <tr className="col-md-12">
                                        <td className="col-md-10 col-xs-10 fgsb16"><input type="text" className="edit_mobile_number" maxLength="14" id="edit_mobile_number" defaultValue="555-555-555" disabled /></td>
                                        <td className="col-md-2 col-xs-2"> <img class="edit_text edit_text_img" src={edit_icon}alt="edit" role="img" focusable="true" /> </td>
                                    </tr>
                                    <tr className="col-md-12">
                                        <td className="col-md-10 col-xs-10 fgsb16"><input type="text" className="edit_email" id="edit_email" defaultValue="alex.smith@email.com" disabled /></td>
                                        <td className="col-md-2 col-xs-2"> <img class="edit_text edit_text_img" src={edit_icon} alt="edit" role="img" focusable="true"/> </td>
                                    </tr>
                                    <tr className="col-md-12">
                                        <td className="col-md-10 col-xs-10 fgsb16"><textarea name="" id="" className="edit_address" cols="30" rows="6" disabled>1000 N. State St
                                                Apt 3
                                                Chicago
                                                Illinois
                                                60607</textarea></td>
                                        <td className="col-md-2 col-xs-2"><div data-toggle="modal" data-target="#edit_section_popup" > <img className="edit_text_img" src={edit_icon} alt="edit" role="img" focusable="true" /></div> </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="col-md-12">
                            <table className="table table-fixed">
                                <thead>
                                    <tr>
                                        <th colspan="6" > <h3 className="agendabold32" id="1034"></h3></th>
                                    </tr>
                                </thead>
                                <tbody className="tbody2 text-center">
                                    {/* <tr>
                                        <td className="col-md-2 fgsb16"><input type="text" defaultValue="First name" disabled /></td>
                                        <td className="col-md-2 fgsb16"><input type="text" defaultValue="First name" disabled /></td>
                                        <td className="col-md-2 fgsb16"><input type="text" defaultValue="First name" disabled /></td>
                                        <td className="col-md-2 fgsb16"></td>
                                        <td className="col-md-2 fgsb16"><input type="text" defaultValue="First name" disabled /></td>
                                        <td className="col-md-2 fgsb16"> <img class="edit_text" src={edit_icon} alt="" /> </td>
                                    </tr> */}
                                </tbody>
                            </table>
                            <div className="col-md-12">
                                <div className="col-md-1 col-md-offset-11 col-xs-2 col-xs-offset-10"> <img className="bottom_add_beni_plus_button" onClick={this.add_new_beni_row} src={AddBeni} alt="add benificary" role="img" focusable="true" /> </div>
                            </div>
                        </div>
                        <div className="col-md-12 text-center dob_beni_error" style={{ color: 'red', display: 'none' }}>
                            Please provide a valid date of birth.
                        </div>
                        <div className="col-md-12 text-center mb2 mt2">
                            <div className="col-md-4 col-md-offset-4"><div onClick={this.update_beni} tabIndex="0" className="btn cbtn_color edit_page_continue tt" id="1036">CONTINUE</div></div>
                            <div className="col-md-4">  <span className="pull-right fgsb14 beni_percent_err_msg" style={{ display: "none", color: "red" }}>Total must equal 100%  </span></div>
                            {/* <Link href="/eleven" className="btn cbtn_color edit_page_continue" id="1036">CONTINUE</Link> */}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
