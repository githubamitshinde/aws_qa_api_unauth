import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import $ from 'jquery';
import Payment from 'payment';
import cookie from 'react-cookies'
import moment from 'moment-timezone';
import ApiList from "../../config/base.json"
// import Pdf from '../pdf/pdf_test.jsx';
// import HIPPAPDF from '../pdf/hippa_download.jsx';
import PageMapper from "../../config/page_mapper";
import CyberSource from './cybertest'
import EventMapper from "../../config/handle_window_event";
import ErrorMsg from "../../config/error_msgs";
import request from 'request';
import Cards from 'react-credit-cards';
import Drop_arrow from "../../images/SVG/down_arrow.svg"
import important_legal_notices from '../../images/pdf/Review-and-pay disclosures.pdf'
import close_model from "../../images/SVG/Close_icon.svg"
import '../../css/other/custom_radio.css';
import '../../css/other/flip.css';
import '../../css/income_shield/income_shield_one.css';

import '../../css/payment/payment.css'
import CyberTest from '../payment/cybertest';

import 'react-credit-cards/es/styles-compiled.css';

var cardType = '';
var cardTypeDxc = ''
var cardTypeNumber = '001';
var monthly_amount = '0';
var annually_amount = '0';
var application_pdf_upload_flag;

var firstPassword;
var secondUserName;
var tokenGlobal;
var tokenGlobalAfficient;

let user_data = JSON.parse(sessionStorage.getItem('user_data')) ? JSON.parse(sessionStorage.getItem('user_data')) : null;

var return_source;
var payment_try
export default class PaymentSection extends Component {
    constructor() {
        super();
        this.state = {
            number: '',
            name: '',
            expiry: '',
            cvc: '',
            focused: '',
            current_page_index: sessionStorage.getItem('current_index'),
            truth: false,
            cardNum: '',
            expDate: '',
            card_bank_toggle: true,
            wrongCard: false,
        };
    }

    componentDidMount() {
        user_data = sessionStorage.getItem('user_data') ? JSON.parse(sessionStorage.getItem('user_data')) : {};
        var self = this;

        var afficiency_id = EventMapper.query('arcid');
        var visit_id = EventMapper.query('visitId');
        if (visit_id != null && afficiency_id != null) {
            console.log("------------------------ Reurn from cyber source -----------------------")
            $('.re_attempt_msg').css('display', 'block')
            $('.re_attempt_msg').css('color', 'red')
            $('html, body').animate({
                scrollTop: $(".re_attempt_msg").offset().top
            }, 2000);
            // window.location.href = "/life-insurance-instant-approval"
            self.retry_payment_fetxh_data(visit_id, afficiency_id);

        } else {

            var product_annual_coverage_amount = user_data.select_monthly_income_benifit * 12;
            if (user_data.rider_id == 100000) {

                self.fetch_pricing_api(product_annual_coverage_amount, user_data.select_add_on_one_time_payment, user_data.rate_class, null, user_data.rider_id);
            } else {
                self.fetch_pricing_api(product_annual_coverage_amount, null, user_data.rate_class, null, null);
            }
            $('.card_text1').text("$ " + user_data.select_monthly_income_benifit.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
            $('.card_text2').text("$ " + user_data.select_add_on_one_time_payment.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
            // $('.payment_annually').text((user_data.select_monthly_income_benifit * 12).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
            $('.payment_monthly').text(user_data.premium_total)
            monthly_amount = user_data.premium_total
            $('#premium_total_monthly_pdf').text(user_data.premium_total)
            var today_date = moment().format('MM/DD/YYYY')
            $('#today_date').text(" " + today_date + " ")
            // ########################################## save cad no to session data ############
            $(document).on('blur', '#card_number_', function () {
                let user_data = JSON.parse(sessionStorage.getItem('user_data'));
                user_data.card_number = $('#card_number_').val()
                sessionStorage.setItem('user_data', JSON.stringify(user_data))
                $('.re_attempt_msg').css('display', 'none')
            })
            $(document).on('blur', '#expire_date', function () {
                let user_data = JSON.parse(sessionStorage.getItem('user_data'));
                var card_exp = $('#expire_date').val().replace('/', '-')

                user_data.expiry_date = card_exp.replace(/ /g, '')
                sessionStorage.setItem('user_data', JSON.stringify(user_data))
            })
            // ########################################## save cad no to session data ############
        }


        this.validation()
        // FOR FORMATTING FOLLOWING FIELDS
        Payment.formatCardNumber(document.querySelector('[name="number"]'));
        Payment.formatCardExpiry(document.querySelector('[name="expiry"]'));
        Payment.formatCardCVC(document.querySelector('[name="cvc"]'));

        $(document).on('keyup', '.inputs', function () {
            if (this.value.length == this.maxLength) {
                var $next = $(this).next('.inputs');
                if ($next.length)
                    $(this).next('.inputs').focus();
                else
                    $(this).blur();
            }
        });


        // ######################### VALIDATION FOR ZIPCODE STARTS HERE #########################
        // $(document).on('blur', '.zipcode', function (e) {
        //     if (this.value != "" & this.value.length == 5) {
        //         $("#validation_" + this.id).remove();
        //         $(this).css('border-color', 'black');
        //     } else {
        //         $(this).css('border-color', 'red');
        //         if (this.value.length >= 1 && this.value.length < 5) {
        //             $("#validation_" + this.id).is(":visible") ? null : $('<small id=validation_' + this.id + ' class="fgsd14" style="color: red;font-size:14px">Please enter proper zipcode</small>').insertAfter("#" + this.id);
        //         } else {
        //             $("#validation_" + this.id).is(":visible") ? null : $('<small id=validation_' + this.id + ' class="fgsd14" style="color: red;font-size:14px">' + ErrorMsg.page_11['zip_code'] + '</small>').insertAfter("#" + this.id);
        //         }

        //     }
        // });

        $(document).on('change', '#legal_notices_checkbox', function () {
            if (this.checked) {
                // $('#chkbox_div_wrap').css('display', 'none')
                $('#legal_notices_checkbox').siblings('label').css('border', '2px solid #ccc')
            } else {
                // $('#chkbox_div_wrap').css('display', 'block')
                $('#legal_notices_checkbox').siblings('label').css('border', '2px solid red')
            }
        });

        $(document).on('change', '#i_agree_checkbox', function () {
            if (this.checked) {
                // $('#chkbox_div_wrap').css('display', 'none')
                $('#i_agree_checkbox').siblings('label').css('border', '2px solid #ccc')
            } else {
                // $('#chkbox_div_wrap').css('display', 'block')
                $('#i_agree_checkbox').siblings('label').css('border', '2px solid red')
            }
        });
        $(document).on('blur', 'input', function (e) {
            if (this.value != "") {
                $(this).css('border-color', 'black');
            }
        });

        $(document).on('change', '[name=pay_type], [name=payment_freq], [name=radio_payment_bill_addr]', function (e) {
            $(this).closest('.radio__container').find('label').removeClass('radio_incomplete')

            if (this.name == "pay_type")
                $('#payment_method_wrap').css('display', 'none')
            else if (this.name == "payment_freq")
                $('#payment_freq_wrap').css('display', 'none')
            else if (this.name == "radio_payment_bill_addr")
                $('#bill_addr_wrap').css('display', 'none')
        });

        $(document).on('keypress', '.zipcode', function (e) {
            var code = e.keyCode || e.charCode
            if ((code >= 48 && code <= 57) || code == 8 || code == 9) {
            } else {
                e.preventDefault();
            }
        })
        $(document).on('keyup', '.zipcode', function (e) {

            var code = e.keyCode || e.charCode
            console.log(code + "CODE::" + ((code >= 48 && code <= 57) || code == 8 || code == 9))

            if ((code >= 48 && code <= 57) || code == 8 || code == 9) {
                if (this.value != "" && (this.value.length >= 1 && this.value.length <= 5)) {
                    $("#validation_" + this.id).remove();
                    $(this).css('border-color', 'black');
                } else {
                    $("#validation_" + this.id).remove();

                    $(this).css('border-color', 'red');

                    if (this.value.length < 5) {
                        $("#validation_" + this.id).is(":visible") ? null : $('<small id=validation_' + this.id + ' class="fgsd14 col-md-12" style="color: red;font-size:14px;font-weight:bold;padding:0px">' + ErrorMsg.page_11['zip_code'] + '</small>').insertAfter("#" + this.id);
                    } else {
                        $("#validation_" + this.id).is(":visible") ? null : $('<small id=validation_' + this.id + ' class="fgsd14 col-md-12" style="color: red;font-size:14px;font-weight:bold;padding:0px">' + ErrorMsg.page_11['zip_code'] + '</small>').insertAfter("#" + this.id);
                    }

                }
            } else {
                e.preventDefault();
            }
        });
        // ######################### VALIDATION FOR ZIPCODE ENDS HERE #########################
        //*/***** card validation name */
        $(document).on('keypress', '#card_name', function (e) {
            var code = e.keyCode || e.charCode;

            if (((code >= 65 && code <= 90) || (code >= 97 && code <= 122)) || code == 8 || code == 9 || code == 32) {
            } else {
                e.preventDefault();
            }
        });
        $(document).on('focus', '#card_cvc', function (e) {

            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                $(".card-holder-div").find('.rccs__card--front, .rccs__card--back').addClass('rccs-fix')
            }
        });
        // ######################################### pay type ###########
        $(document).on('change', "input[name='pay_type']", function () {
            // alert($(this).val())
            if ($(this).val() == 9) {
                self.setState({
                    card_bank_toggle: true
                })
                // $('.card').css('display', 'block');
                // $('.bank').css('display', 'none')
                $('.pay_type_debit_pdf').click()
                $('.pay_type_bank_pdf').prop('checked', false);
                $('.bank_draft_err').css('display', 'none')
                $(this).siblings('.radio__label').removeClass('radio_incomplete');
            } else {
                // self.setState({
                //     card_bank_toggle: false
                // })
                // $('.card').css('display', 'none');
                // $('.bank').css('display', 'block')
                $('.pay_type_bank_pdf').click()
                $('.pay_type_debit_pdf').prop('checked', false);
                $(this).siblings('.radio__label').addClass('radio_incomplete');
                $('.bank_draft_err').css('display', 'block')
            }
        })
        $("input[name='payment_freq']").click(function () {

            if ($(this).val() == 1) {
                $('.premium_total_annually_pdf_check').click()
                $('.premium_total_monthly_pdf_check').prop('checked', false);
            } else {
                $('.premium_total_monthly_pdf_check').click()
                $('.premium_total_annually_pdf_check').prop('checked', false);
            }
        })
        $(document).on('change', 'input[name=radio_payment_bill_addr]', function () {
            if ($(this).val() == 2) {
                $('.zip_code_change').show();
            } else {
                $('.zip_code_change').hide();
            }
        })
    }

    retry_payment_fetxh_data = (visit_id, afficiency_id) => {
        var self = this;
        var datastring = {
            "app_data": {
                "visit_id": visit_id,
                "afficiency_id": afficiency_id
            }
        }
        // console.log("RETRY PAGE::");
        console.log("RETRY PAGE::" + (ApiList.current.base_api_url + ApiList.comeback_data) + "**&&**" + JSON.stringify(datastring))
        $.ajax({
            url: ApiList.current.base_api_url + ApiList.page_eleven.retrive_data_app_data,
            type: 'POST',
            data: JSON.stringify(datastring),
            headers: {

                'Content-Type': 'application/json'
            },
            success: (data) => {
                console.log("come back for retry payment " + JSON.stringify(data))
                if (data.data != null && data.data != "") {
                    data = JSON.parse(data.data)

                    console.log("retry payment >> " + JSON.stringify(data))
                    user_data = data.user_data;
                    sessionStorage.setItem('user_data', JSON.stringify(user_data))
                    var product_annual_coverage_amount = user_data.select_monthly_income_benifit * 12;

                    if (user_data.rider_id == 100000) {
                        self.fetch_pricing_api(product_annual_coverage_amount, user_data.select_add_on_one_time_payment, user_data.rate_class, null, user_data.rider_id);
                    } else {
                        self.fetch_pricing_api(product_annual_coverage_amount, null, user_data.rate_class, null, null);
                    }


                    if ((user_data ? (user_data.select_monthly_income_benifit ? user_data.select_monthly_income_benifit : null) : null) == null) {
                        window.location.href = "/"
                    }
                    $('.card_text1').text("$ " + user_data.select_monthly_income_benifit.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
                    $('.card_text2').text("$ " + user_data.select_add_on_one_time_payment.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
                    // $('.payment_annually').text((user_data.select_monthly_income_benifit * 12).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
                    $('.payment_monthly').text(user_data.premium_total)
                    monthly_amount = user_data.premium_total
                    $('#premium_total_monthly_pdf').text(user_data.premium_total)
                    if (user_data.paymentMethod == 9) {
                        $("input[name=pay_type][value=" + 9 + "]").attr('checked', 'checked');
                        $()
                    } else {

                    }
                }

            }, error: (err) => {
                console.log("ERROR in retry dtatae " + JSON.stringify(err));
            }
        })
    }

    fetch_pricing_api = (product_annual_coverage_amount, rider_annual_coverage_amount, rate_class, payment_frequency, rider_id) => {
        let datastring = {
            "product_id": 100001,
            "state": user_data.state,
            "product_id_rider": rider_id,
            "visitor_id": cookie.load('visit_id'),
            "afficiency_id": user_data.aff2,
            "height": user_data.height,
            "weight": user_data.weight,
            "date_of_birth": user_data.dob,
            "sex": user_data.gender,
            "term_length": 20,
            "product_annual_coverage_amount": product_annual_coverage_amount,
            "rider_annual_coverage_amount": parseInt(rider_annual_coverage_amount),
            "rate_class": rate_class,
            "payment_frequency": "annually",
            "tobacco_use": user_data.tobbacouse
        }
        console.log(JSON.stringify(datastring))
        $.ajax({
            url: ApiList.current.base_afficient_api_url + ApiList.pricing_api,
            type: 'POST',
            data: JSON.stringify(datastring),
            headers: {

                'Content-Type': 'application/json'
            },
            success: (data) => {
                if (data) {
                    console.log(JSON.stringify(data))
                    if (data.statusCode == 1) {
                        console.log("fetch pricing >> " + JSON.stringify(data))
                        var premium_total = parseFloat(data.data.premium_total).toFixed(2)
                        $('.payment_annually').text(premium_total);
                        annually_amount = premium_total


                    }
                    // else if (data.statusCode == 0) {
                    //     let user_data = JSON.parse(sessionStorage.getItem('user_data'))
                    //     user_data.failure_code = 6;
                    //     sessionStorage.setItem('user_data', JSON.stringify(user_data))
                    //     window.location.href = "/nine"

                    // }

                }
            },
            error: (err) => {
                console.log("ERROR in pricing api " + JSON.stringify(err));
            }
        })
    }

    showFile = (blob) => {
        // For other browsers:
        // Create a link pointing to the ObjectURL containing the blob.
        const data = window.URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.href = data;
        link.download = "file.pdf";
        document.body.appendChild(link);
        link.click();
        setTimeout(function () {
            // For Firefox it is necessary to delay revoking the ObjectURL
            document.body.removeChild(link);
            window.URL.revokeObjectURL(data);
        }, 100)


        // // It is necessary to create a new blob object with mime-type explicitly set
        // // otherwise only Chrome works like it should
        // // alert(blob)
        // var newBlob = new Blob([blob], { type: "application/pdf" });

        // // IE doesn't allow using a blob object directly as link href
        // // instead it is necessary to use msSaveOrOpenBlob
        // if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        //     window.navigator.msSaveOrOpenBlob(newBlob);
        //     return;
        // }

        // // For other browsers:
        // // Create a link pointing to the ObjectURL containing the blob.
        // const data = window.URL.createObjectURL(newBlob);
        // var link = document.getElementById('testtt');   //document.createElement('a');
        // link.href = data;
        // link.download = "app_data.pdf";
        // link.click();

        // setTimeout(function () {
        //     // For Firefox it is necessary to delay revoking the ObjectURL
        //     window.URL.revokeObjectURL(data)
        //         , 100
        // })
    }

    getPdf = () => {
        var self = this;
        let user_data = JSON.parse(sessionStorage.getItem('user_data'));
        let dxc_data_json = {
            "dxc_data": {
                "visitId": cookie.load('visit_id'),
                "agent_flag": sessionStorage.getItem('agent_present_flag') ? 1 : 2,
                "aff2": user_data.aff2,
                "trackingID": user_data.aff2,
                "underwritingApproval": 1,
                "replacementInd": user_data.replacement_flag,
                "distributorID": sessionStorage.getItem('distributor_id') ? sessionStorage.getItem('distributor_id') : "",
                "validationRequiredInd": "false",
                "signatureCity": user_data.city,
                "existingInsuranceInd": user_data.existing_insurance,
                "productCode": user_data.product_code ? user_data.product_code : 100001,
                "carrierCode": "00",
                "applicationJurisdiction": "18",
                "paymentMethod": $("input[name = 'pay_type']:checked").val(),
                "signedDate": moment().format("MM/DD/YYYY"),
                "premiumFrequency": $("input[name = 'payment_freq']:checked").val(),
                "electronicConsentInd": "true",
                "productType": "2",
                "productVersionCode": "1",
                "applicationDate": moment().format("MM/DD/YYYY"),
                "driversLicenseNum": user_data.drivers_license_no ? user_data.drivers_license_no : "",
                "driversLicenseState": user_data.drivers_license_state ? user_data.drivers_license_state : "",
                "height": user_data.height,
                "insuredBirthDate": user_data.dob,
                "insuredFirstName": user_data.first_name,
                "insuredGender": user_data.gender,
                "insuredGovtIDTc": "1",
                "insuredGovtId": user_data.ssn,
                "insured_govtIDId": user_data.ssn,
                "insuredGovtIDStat": "1",
                "insuredLastName": user_data.last_name,
                "insuredMiddleName": "",
                "tobbacouse": user_data.tobbacouse,
                "usCitizenInd": true,
                "weight": user_data.weight,
                "residenceState": user_data.state,
                "addresstSateTC": "17",
                "addressTypeCode": "1",
                "line1": user_data.apt_no,
                "line2": user_data.home_address,
                "zip": user_data.zipcode,
                "addrLine": user_data.email,
                "countryCode": "1",
                "areaCode": (user_data.zipcode).slice(-2),
                "dialNumber": (user_data.phone_number).slice(-7),
                "phoneTypeCode": "1",
                "prefPhone": true,
                "monthlyDeathBenefitAmt": user_data.monthly_income_benefit,
                "indicatorCode": user_data.product_code == 10000 ? 2 : 1,
                "underwritingClass": "1",
                "beneficiaryType": "1",
                "beneficiaryFirstName": user_data.beni_arr[0].bene_first_name,
                "beneficiaryMiddleName": "",
                "beneficiaryLastName": user_data.beni_arr[0].bene_last_name,
                "tobaccoInd": user_data.tobbacouse,
                "beneficiaryGovtIDTc": "",
                "beneficiaryGovtId": "",
                "beneficiaryRelationToPrimaryInsured": "",
                "beneficiaryDistributionPercent": user_data.beni_arr[0].percentage,
                "ownerFirstName": user_data.first_name,
                "ownerGovtIDStat": user_data.state,
                "ownerGovtIDTc": "1",
                "ownerGovtId": user_data.ssn,
                "ownerLastName": user_data.last_name,
                "ownerMiddleName": "",
                "ownerSuffix": "",
                "trusteeFirstName": "",
                "trusteeMiddleName": "",
                "trusteeLastName": "",
                "trusteeGovtId": "",
                "trusteeGovtIDTc": "",
                "trusteeGovtIDStat": "",
                "relationRoleCode": "",
                "trusteeSuffix": "",
                "payorFirstName": user_data.first_name,
                "payorGovtIDStat": user_data.state,
                "payorGovtIDTc": "1",
                "payorGovtId": user_data.ssn,
                "payorIsSameAsOwnerInd": false,
                "payorLastName": user_data.last_name,
                "payorMiddleName": "",
                "payorPartyType": "1",
                "accountNumber": $('.account_number').val(),
                "acctHolderName": $("input[name = 'pay_type']:checked").val() == 9 ? $('#card_name').val() : $(".account_first_name").val() + $(".account_last_name").val(),
                "bankAcctType": $("input[name = 'pay_type']:checked").val() == 9 ? 3 : $(".banl_acc_type option:selected").val(),
                "currencyTypeCode": "840",
                "routingNum": $('.routing_number').val(),
                "bankingNumber": $('.account_number').val(),
                "toBeUsedForBilling": true,
                "correspondenceCode": "003",
                "mimeType": "17",
                "formType": "1",
                "form": "",
                "creditDebitType": $("input[name = 'pay_type']:checked").val() == 9 ? 1 : null,
                "underwritingResultReason": user_data.rule_engine[0] ? user_data.rule_engine[0] : 1,
                "rule_engine_response": user_data.rule_engine_2 ? user_data.rule_engine_2 : user_data.rule_engine,
                "payment_frequency": $("input[name = 'payment_freq']:checked").val() == 1 ? "annually" : "monthly",
                "card_number": $('#card_number_').val(),
                "expire_date": $('#expire_date').val().replace('/', '-'),
                "creditCardType": cardTypeDxc,
                "user_data": user_data
            }
        }
        if (sessionStorage.getItem('agent_present_flag')) {
            dxc_data_json.dxc_data['agent_id'] = sessionStorage.getItem('agent_id');
        }
        console.log("/app pdf data string" + JSON.stringify(dxc_data_json));
        console.log(window.userAgent)
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {

        } else if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPad/i))) {

            var pdfiPhoneWindow = window.open('', '_blank');
            console.log("Inside ios safari function");
        } else {

            var pdfWindow = window.open('');
            console.log("Inside else function");
        }

        $.ajax({

            url: ApiList.current.base_api_url + ApiList.page_eleven.view_pdf,
            type: 'POST',
            data: JSON.stringify(dxc_data_json),
            headers: {

                'Content-Type': 'application/json'
            },
            success: (data) => {
                console.log("view pdf" + JSON.stringify(data.message))

                if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                    // $('.pdf_view').css('color','green')
                    var byteCharacters = atob(data.message);
                    var byteNumbers = new Array(byteCharacters.length);
                    for (var i = 0; i < byteCharacters.length; i++) {
                        byteNumbers[i] = byteCharacters.charCodeAt(i);

                        if (i == byteCharacters.length - 1) {
                            var byteArray = new Uint8Array(byteNumbers);
                            var blob = new Blob([byteArray], {
                                type: 'application/pdf'
                            });
                            window.navigator.msSaveOrOpenBlob(blob, "application.pdf");
                        }
                    }


                } else if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPad/i))) {
                    // $('.pdf_view').css('color','red')
                    //pdfiPhoneWindow.document.write("<div id='scroller' heigh='400px' width='100%' style='overflow:scroll !important; -webkit-overflow-scrolling:touch !important; margin: 2em auto; border: 5px solid #999999;'><embed id='iframePDFContainer' width='100%' height='100%' style='border: solid 1px #666;' type='application/pdf' src='data:application/pdf;base64, " + encodeURI(pdfResult) + "'></embed></div>")
                    var arrrBuffer = self.base64ToArrayBuffer(data.message);
                    var newwBlob = new Blob([arrrBuffer], { type: "application/pdf" });
                    var dataaa = pdfiPhoneWindow.URL.createObjectURL(newwBlob);
                    pdfiPhoneWindow.location.href = dataaa;

                } else {
                    // $('.pdf_view').css('color','blue')
                    var pdfResult = data.message;
                    pdfWindow.document.write("<iframe width='100%' height='100%' style='margin: -8px;border: none; ' allow='fullscreen' src='data:application/pdf;base64, " + encodeURI(pdfResult) + "'></iframe>")


                    var isChromium = window.chrome;
                    var winNav = window.navigator;
                    var vendorName = winNav.vendor;
                    var isOpera = typeof window.opr !== "undefined";
                    var isIEedge = winNav.userAgent.indexOf("Edge") > -1;
                    var isIOSChrome = winNav.userAgent.match("CriOS");

                    if (isIOSChrome || isChromium !== null &&
                        typeof isChromium !== "undefined" &&
                        vendorName === "Google Inc." &&
                        isOpera === false &&
                        isIEedge === false) {
                        var arrrBuffer = self.base64ToArrayBuffer(data.message);
                        var newwBlob = new Blob([arrrBuffer], { type: "application/pdf" });
                        var dataaa = window.URL.createObjectURL(newwBlob);
                        var link = document.createElement('a');
                        document.body.appendChild(link); //required in FF, optional for Chrome
                        link.href = dataaa;
                        link.download = "MyApplication.pdf";
                        link.click();
                        window.URL.revokeObjectURL(dataaa);
                        link.remove();
                    }
                }
            },
            error: (err) => {
                console.log("ERROR in view pdf " + JSON.stringify(err));
            }
        });
    }

    iosSafari = () => {
        return /^(iPhone|iPad|iPod)/.test(navigator.platform);
        //return /iP(ad|od|hone)/i.test(window.navigator.userAgent) && /WebKit/i.test(window.navigator.userAgent) && !(/(CriOS|FxiOS|OPiOS|mercury)/i.test(window.navigator.userAgent));
    }

    isMobileSafari = () => {
        return navigator.userAgent.match(/(iPod|iPhone|iPad)/) && navigator.userAgent.match(/AppleWebKit/);
    }

    base64ToArrayBuffer = (data) => {
        var binaryString = window.atob(data);
        var binaryLen = binaryString.length;
        var bytes = new Uint8Array(binaryLen);
        for (var i = 0; i < binaryLen; i++) {
            var ascii = binaryString.charCodeAt(i);
            bytes[i] = ascii;
        }
        return bytes;
    };
    //window.open("data:application/pdf;base64,"+data.message);
    //fetch([url to fetch], {[options setting custom http-headers]})
    //.then(r => r.blob())
    //.then(showFile)
    // let newBlob = "data:application/pdf;base64," + data.message;
    // self.showFile(data.message);

    // window.print(newBlob)

    // let newBlob = "data:application/pdf;base64,"+data.message;
    // var dlnk = document.getElementById('testtt');
    // dlnk.href = newBlob;
    // dlnk.click();

    // if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    //     window.navigator.msSaveOrOpenBlob(newBlob);
    //     return;
    // }

    // var url = data.message;
    // fetch(url)
    //     .then(res => res.blob())
    //     .then(blob => {
    //         console.log(blob)
    //         // let blob = "data:application/pdf;base64," + data.message;
    //         var newBlob = new Blob([blob], { type: "application/pdf" });
    //         window.navigator.msSaveOrOpenBlob(newBlob);
    //     }
    //     )


    //return;

    converBase64toBlob = (content, contentType) => {
        contentType = contentType || '';
        var sliceSize = 2048;

        var byteCharacters = atob(content);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }
    }

    final_save_pdf = () => {
        return new Promise(function (resolve, reject) {
            var self = this;
            let user_data = JSON.parse(sessionStorage.getItem('user_data'));
            let dxc_data_json = {
                "dxc_data": {
                    "visitId": cookie.load('visit_id'),
                    "agent_flag": sessionStorage.getItem('agent_present_flag') ? 1 : 2,
                    "aff2": user_data.aff2,
                    "trackingID": user_data.aff2,
                    "underwritingApproval": 1,
                    "replacementInd": user_data.replacement_flag,
                    "distributorID": sessionStorage.getItem('distributor_id') ? sessionStorage.getItem('distributor_id') : "",
                    "validationRequiredInd": "false",
                    "signatureCity": user_data.city,
                    "existingInsuranceInd": user_data.existing_insurance,
                    "productCode": user_data.product_code ? user_data.product_code : 100001,
                    "carrierCode": "00",
                    "applicationJurisdiction": "18",
                    "paymentMethod": $("input[name = 'pay_type']:checked").val(),
                    "signedDate": moment().format("MM/DD/YYYY"),
                    "premiumFrequency": $("input[name = 'payment_freq']:checked").val(),
                    "electronicConsentInd": "true",
                    "productType": "2",
                    "productVersionCode": "1",
                    "applicationDate": moment().format("MM/DD/YYYY"),
                    "driversLicenseNum": user_data.drivers_license_no ? user_data.drivers_license_no : "",
                    "driversLicenseState": user_data.drivers_license_state ? user_data.drivers_license_state : "",
                    "height": user_data.height,
                    "insuredBirthDate": user_data.dob,
                    "insuredFirstName": user_data.first_name,
                    "insuredGender": user_data.gender,
                    "insuredGovtIDTc": "1",
                    "insuredGovtId": user_data.ssn,
                    "insured_govtIDId": user_data.ssn,
                    "insuredGovtIDStat": "1",
                    "insuredLastName": user_data.last_name,
                    "insuredMiddleName": "",
                    "tobbacouse": user_data.tobbacouse,
                    "usCitizenInd": true,
                    "weight": user_data.weight,
                    "residenceState": user_data.state,
                    "addresstSateTC": "17",
                    "addressTypeCode": "1",
                    "line1": user_data.apt_no,
                    "line2": user_data.home_address,
                    "zip": user_data.zipcode,
                    "addrLine": user_data.email,
                    "countryCode": "1",
                    "areaCode": (user_data.zipcode).slice(-2),
                    "dialNumber": (user_data.phone_number).slice(-7),
                    "phoneTypeCode": "1",
                    "prefPhone": true,
                    "monthlyDeathBenefitAmt": user_data.monthly_income_benefit,
                    "indicatorCode": user_data.product_code == 10000 ? 2 : 1,
                    "underwritingClass": "1",
                    "beneficiaryType": "1",
                    "beneficiaryFirstName": user_data.beni_arr[0].bene_first_name,
                    "beneficiaryMiddleName": "",
                    "beneficiaryLastName": user_data.beni_arr[0].bene_last_name,
                    "tobaccoInd": user_data.tobbacouse,
                    "beneficiaryGovtIDTc": "",
                    "beneficiaryGovtId": "",
                    "beneficiaryRelationToPrimaryInsured": "",
                    "beneficiaryDistributionPercent": user_data.beni_arr[0].percentage,
                    "ownerFirstName": user_data.first_name,
                    "ownerGovtIDStat": user_data.state,
                    "ownerGovtIDTc": "1",
                    "ownerGovtId": user_data.ssn,
                    "ownerLastName": user_data.last_name,
                    "ownerMiddleName": "",
                    "ownerSuffix": "",
                    "trusteeFirstName": "",
                    "trusteeMiddleName": "",
                    "trusteeLastName": "",
                    "trusteeGovtId": "",
                    "trusteeGovtIDTc": "",
                    "trusteeGovtIDStat": "",
                    "relationRoleCode": "",
                    "trusteeSuffix": "",
                    "payorFirstName": user_data.first_name,
                    "payorGovtIDStat": user_data.state,
                    "payorGovtIDTc": "1",
                    "payorGovtId": user_data.ssn,
                    "payorIsSameAsOwnerInd": false,
                    "payorLastName": user_data.last_name,
                    "payorMiddleName": "",
                    "payorPartyType": "1",
                    "accountNumber": $('.account_number').val(),
                    "acctHolderName": $("input[name = 'pay_type']:checked").val() == 9 ? $('#card_name').val() : $(".account_first_name").val() + $(".account_last_name").val(),
                    "bankAcctType": $("input[name = 'pay_type']:checked").val() == 9 ? 3 : $(".banl_acc_type option:selected").val(),
                    "currencyTypeCode": "840",
                    "routingNum": $('.routing_number').val(),
                    "bankingNumber": $('.account_number').val(),
                    "toBeUsedForBilling": true,
                    "correspondenceCode": "003",
                    "mimeType": "17",
                    "formType": "1",
                    "form": "",
                    "creditDebitType": $("input[name = 'pay_type']:checked").val() == 9 ? 1 : null,
                    "underwritingResultReason": user_data.rule_engine[0] ? user_data.rule_engine[0] : 1,
                    "rule_engine_response": user_data.rule_engine_2 ? user_data.rule_engine_2 : user_data.rule_engine,
                    "payment_frequency": $("input[name = 'payment_freq']:checked").val() == 1 ? "annually" : "monthly",
                    "card_number": $('#card_number_').val(),
                    "expire_date": $('#expire_date').val().replace('/', '-'),
                    "creditCardType": cardTypeDxc,
                    "user_data": user_data
                }
            }
            if (sessionStorage.getItem('agent_present_flag')) {
                dxc_data_json.dxc_data['agent_id'] = sessionStorage.getItem('agent_id');
            }

            console.log("data sring dropout dxc before cybersource " + JSON.stringify(dxc_data_json))
            $.ajax({
                url: ApiList.current.base_api_url + ApiList.page_eleven.save_pdf,
                type: 'POST',
                data: JSON.stringify(dxc_data_json),
                headers: {

                    'Content-Type': 'application/json'
                },
                success: (data) => {
                    console.log("save fianl appdata + pdf >>" + JSON.stringify(data))
                    if (data.statusCode == 200) {
                        resolve()
                    } else {
                        reject()
                    }
                },
                error: (err) => {
                    console.log("save fianl appdata + pdf" + JSON.stringify(err));
                    reject()
                }
            });
        })
    }


    dxc_send_ = () => {
        var self = this;
        sessionStorage.setItem('sessionCardNumber', $('#card_number_').val());
        this.setState({
            truth: true,
        });
        setInterval(function () {
            this.autoPress();
        }.bind(this), 3000)


    }

    check = () => {
        if (cardType != 'visa' && cardType != 'mastercard' && this.state.card_bank_toggle && $('#card_number_').val() != '') {
            this.setState({
                wrongCard: true
            });
        }
    }

    maintainOrder = () => {

        this.setState({
            wrongCard: false
        });
        $.when($.ajax(this.check()).then(() => this.save_call()));
    }


    save_call = () => {
        var self = this;
        if (self.validate_form() && !this.state.wrongCard) {
            // self.wallet_api_call()
            $('.spinner').css('display', 'block')

            let datastring = {
                "application_payment": {
                    "afficiency_id": user_data.aff2,
                    "payment_type": $("input[name = 'pay_type']:checked").val(),
                    "payment_frequency": $("input[name = 'payment_freq']:checked").val(),
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
                datastring.application_payment['agent_id'] = sessionStorage.getItem('agent_id');
                datastring.application_payment['agent_assisted_flag'] = 1;
                datastring.application_payment['agent_entry_screen'] = 10
            }
            console.log("save call page eleven >>" + JSON.stringify(datastring))
            $.ajax({
                url: ApiList.current.base_api_url + ApiList.page_eleven.update_eleven,
                type: 'POST',
                data: JSON.stringify(datastring),
                headers: {

                    'Content-Type': 'application/json'
                },
                success: (data) => {
                    console.log("save eleven res " + JSON.stringify(data))
                    if (data.statusCode == 200) {

                        // this.dxc_send_();

                        //*** DXC SEND COMMENT START */
                        /*  application_pdf_upload_flag = setInterval(self.pdfToApiCheck, 10);
                            $(".dxc_send").click() */
                        //*** DXC SEND COMMENT ENDS */

                        //*** NOT SENDING FILE TO DXC START ****/
                        // self.dxc_send_();
                        self.final_save_pdf()
                            .then(function () {
                                return self.dxc_send_();
                            })
                        //****NOT SENDING FILE TO DXC ENDS *****/
                        // var screen_id = PageMapper.getNextPageId(parseInt(self.state.current_page_index) + 1);
                        // sessionStorage.setItem('current_index', (parseInt(self.state.current_page_index) + 1));
                        // window.location.href = PageMapper.getPageURL(screen_id);
                    }
                },
                error: (err) => {
                    console.log("ERROR in application/update_eleven api " + JSON.stringify(err));
                }
            })
        } else {
            console.log(this.state.wrongCard)
            if (this.validate_form == false) {
                $("#validation_page_eleven").css('display', 'block')
                setTimeout(function () {
                    $("#validation_page_eleven").css('display', 'none')
                }, 4000)
            } else {
                if (this.state.wrongCard) {
                    $("#validation_page_eleven").css('display', 'none')
                }
            }

        }
    }
    // pdfToApiCheck = () =>{
    //     var _pdfToApiCheck_self = this;
    //     console.log("******PDF API CHK****")
    //     if($(".application_pdf_api_status").val()=="done"){
    //         clearInterval(application_pdf_upload_flag);
    //         console.log("*********FOUND FLAG, NOW UPDATING DXC*************")

    //             _pdfToApiCheck_self.dxc_send_(1);


    //     }

    // }
    wallet_api_call = () => {
        var self = this;
        let datastring = {
            "afficencyId": user_data.aff2,
            "bankRoutingNum": $('.routing_number').val() ? $('.routing_number').val() : null,
            "accountNum": $('#account_number').val() ? $('#account_number').val() : null,
            "creditCardNum": $('#card_number_').val() ? $('#card_number_').val() : null
        }
        console.log("wallet api >>" + JSON.stringify(datastring))
        $.ajax({
            url: ApiList.current.base_identiy_api_url + '/api/v1/identityWalletAPI',
            type: 'POST',
            data: JSON.stringify(datastring),
            headers: {
                'Content-Type': "application/json"
            },
            success: (data) => {
                if (data.statusCode == 200) {

                }
            },
            error: (err) => {
                console.log("ERROR in wallet api " + JSON.stringify(err));
            }
        })

    }



    handleInputFocus = ({ target }) => {
        this.setState({
            focused: target.name,
        });
    };

    handleInputChange = ({ target }) => {
        if (target.name === 'number') {
            this.setState({
                [target.name]: target.value.replace(/ /g, ''),
                cardNum: target.value
            });
        }
        else if (target.name === 'expiry') {
            this.setState({
                [target.name]: target.value.replace(/ |\//g, ''),
                expDate: target.value
            });
        }
        else {
            console.log('here');
            this.setState({
                [target.name]: target.value,
            });
        }
    };

    handleCallback(type, isValid) {
        console.log(type.issuer);
        cardType = type.issuer;
        if (cardType == 'visa') {
            cardTypeDxc = 2
        } else if (cardType == 'mastercard') {
            cardTypeDxc = 3
        } else if (cardType == 'amex') {
            cardTypeDxc = 4
        }
        console.log(type, isValid); //eslint-disable-line no-console
    }
    validation = () => {
        $(document).on('keypress', '.account_number, .routing_number', function (e) {
            // console.log(e.keyCode)
            var code = e.keyCode || e.charCode

            if ((code >= 48 && code <= 57) || code == 8 || code == 9) {
            } else {
                e.preventDefault();
            }
        });
        $(document).on('blur', '.routing_number', function () {
            if ($('.routing_number').val().length != 9) {
                $('.routing_number').css('border-color', 'red')
                if (!$('.routing_number').closest('li').find('small').is(":visible")) {
                    $('.routing_number').closest('li').append('<small style="color:red;font-weight:bold;">Please enter a valid routing number.</small>')
                }

            } else {
                $('.routing_number').css('border-color', 'black')
                $('.routing_number').closest('li').find('small').remove()

            }

        })
        $(document).on('keypress', '.account_first_name, .account_last_name', function (e) {
            var code = e.keyCode || e.charCode;

            if ((!(code >= 48 && code <= 57)) || code == 8 || code == 9) {
            } else {
                e.preventDefault();
            }
        });


    }

    validate_form = () => {
        $("#validation_page_eleven").css('display', 'none')
        var validation_flag = true;

        //FOR EMPTY FIELD VALIDATION & MAKE BOXES RED
        $('input[type=text]:visible:enabled').map(function () {
            if (this.value != '') {
                $(this).css('border', '2px solid black');
                $('.payment_error_div').css('display', 'none')
            } else {
                validation_flag = false;
                $(this).css('border', '2px solid red');
                $('.payment_error_div').css('display', 'block')
            }

        });

        if ($('.zipcode').is(':visible')) {
            this.value = $('.zipcode').val()
            this.id = 'zipcode'

            if (this.value != "" && ($('.zipcode').val().length) == 5) {
                $("#validation_" + this.id).remove();
                $(this).css('border-color', 'black');
            } else {
                validation_flag = false;
                $("#validation_" + this.id).remove();

                $(this).css('border-color', 'red');

                if (($('.zipcode').val().length) < 5) {
                    $("#validation_" + this.id).is(":visible") ? null : $('<small id=validation_' + this.id + ' class="fgsd14 col-md-12" style="color: red;font-size:14px;font-weight:bold;padding:0px">' + ErrorMsg.page_11['zip_code'] + '</small>').insertAfter("#" + this.id);
                } else {
                    $("#validation_" + this.id).is(":visible") ? null : $('<small id=validation_' + this.id + ' class="fgsd14 col-md-12" style="color: red;font-size:14px;font-weight:bold;padding:0px">' + ErrorMsg.page_11['zip_code'] + '</small>').insertAfter("#" + this.id);
                }

            }
        }

        $('input[type=radio]:visible').map(function () {
            if ($("input[name = " + this.name + "]").is(':checked')) {
                $(this).siblings('.radio__label').removeClass('radio_incomplete');

                if (this.name == "pay_type")
                    $('#payment_method_wrap').css('display', 'none')
                else if (this.name == "payment_freq")
                    $('#payment_freq_wrap').css('display', 'none')
                else if (this.name == "radio_payment_bill_addr")
                    $('#bill_addr_wrap').css('display', 'none')

            } else {
                $(this).siblings('.radio__label').addClass('radio_incomplete');
                validation_flag = false;

                if (this.name == "pay_type")
                    $('#payment_method_wrap').css('display', 'block')
                else if (this.name == "payment_freq")
                    $('#payment_freq_wrap').css('display', 'block')
                else if (this.name == "radio_payment_bill_addr")
                    $('#bill_addr_wrap').css('display', 'inline-block')
            }
        });
        $('input[type=checkbox]:visible').map(function () {
            if ($("input[name = " + this.name + "]").is(':checked')) {
                $(this).siblings('label').css('border', '2px solid black');
            } else {
                validation_flag = false;
                $(this).siblings('label').css('border', '2px solid red');

            }

        });
        if ($('.routing_number').is(':visible')) {

            if ($('.routing_number').val().length != 9) {
                $('.routing_number').css('border-color', 'red')
                if (!$('.routing_number').closest('li').find('small').is(":visible")) {
                    $('.routing_number').closest('li').append('<small style="color:red">Please enter a valid routing number.</small>')
                } else { }
                validation_flag = false;
            } else {
                $('.routing_number').css('border-color', 'block')
                $('.routing_number').closest('li').find('small').remove()

            }
        }
        if ($("input[name='pay_type']:checked").val() != 9) {
            validation_flag = false;
        }

        console.log("validation flag >>" + validation_flag)
        return validation_flag;
    }

    checkCardType() {
        if (cardType == 'visa') {
            cardTypeDxc = 2
            cardTypeNumber = '001'
        } else if (cardType == 'mastercard') {
            cardTypeDxc = 3
            cardTypeNumber = '002'
        } else if (cardType == 'amex') {
            cardTypeDxc = 4
            cardTypeNumber = '003'
        } else if (cardType == 'discover') {
            cardTypeNumber = '004'
        } else if (cardType == 'dinersclub') {
            cardTypeNumber = '005'
        } else if (cardType == 'jcb') {
            cardTypeNumber = '007'
        } else if (cardType == 'maestro') {
            cardTypeNumber = '042'
        } else if (cardType == 'hipercard') {
            cardTypeNumber = '050'
        }
    }

    callCyber() {
        let amount;
        let final;
        let finalCard;
        let zip_code;
        console.log(this.state.truth);
        console.log(this.state.expDate);
        if (this.state.expDate.length != 0 && this.state.cardNum.length != 0) {
            let val = this.state.expDate.indexOf('/');
            let first = this.state.expDate.substring(0, val);
            let second = this.state.expDate.substring(val + 1);
            console.log(first);
            first = first.trim();
            second = second.trim();
            console.log(second);
            final = first + '-20' + second;
            console.log(final);
            final = final.trim();
            finalCard = this.state.cardNum.replace(/ +/g, "");
            finalCard = finalCard.trim();
        }
        if ($('input[name=radio_payment_bill_addr]:checked').val() == 1) {
            zip_code = user_data.zipcode
        } else {
            zip_code = $('#zipcode').val()
        }
        console.log("zipcode >" + zip_code)
        // if (this.state.truth) {
        //     return (
        //         <div>
        //             <CyberSource call={this.state.truth} card={finalCard} exp={final} type={cardTypeNumber} zipcode={zip_code}/>
        if ($("input[name = 'payment_freq']:checked").val() == 1) {
            amount = annually_amount
        } else {
            amount = monthly_amount
        }
        console.log(amount)
        if (this.state.truth) {
            return (
                <div>
                    <CyberSource call={this.state.truth} card={finalCard} exp={final} type={cardTypeNumber} zipcode={zip_code} amount={amount} />
                </div>
            )
        }
    }

    autoPress() {
        if (this.state.truth) {
            { $('.button_click_cs').click() }
        }
    }

    getWrongCardMessage() {
        if (this.state.card_bank_toggle == false) {
            return null;
        } else {
            if (this.state.wrongCard) {
                return (<div className="col-md-12 text-center fgsd14 mt1 mb1 re_attempt_msg" style={{ color: 'red' }}>We only accept Visa and MasterCard credit cards. Please try again.</div>)
            } else {
                return null;
            }
        }
    }



    render() {
        console.log($('#card_number_').val());
        console.log(this.state.card_bank_toggle)
        this.checkCardType();
        const { name, number, expiry, cvc, focused, card_bank_toggle } = this.state;


        return (
            <div>
                {/* <Pdf />
                <HIPPAPDF /> */}

                <div id="" className="col-md-12" style={{ backgroundColor: "rgb(0, 195,255)" }}>
                    <div className="container">
                        <div className="col-md-12" style={{ backgroundColor: "#FDFDFD", margin: "8% 0px 3% 0px" }} >
                            <div className="col-md-10 col-md-offset-1" style={{ paddingTop: 10 }}>
                                <h2 className="col-md-12 col-sm-12 text-center agendabold42 mt4" id="1106">Set up your payments</h2>
                                <div className="col-md-7 col-sm-7 mt4">
                                    <ul className="list-unstyled">
                                        <li className="fgsd20" id="1107">I will pay via:</li>
                                        <li className="mt3">
                                            <div className="radio__container" >
                                                <div className="radio-inline ltr20">
                                                    <input className="radio" id="aw3" name="pay_type" type="radio" value="9" defaultChecked />
                                                    <label style={{ fontWeight: "unset" }} className="radio__label" for="aw3" id="1108">Credit Card</label>
                                                </div>
                                                <div className="radio-inline ltr20">
                                                    <input className="radio" id="aw4" name="pay_type" type="radio" value="7" />
                                                    <label style={{ fontWeight: "unset" }} className="radio__label" for="aw4" id="1109">Bank Draft</label>
                                                </div>
                                                {/* <!-- <div className="radio-inline fgsb18">
                                                        <input className="radio" id="aw5" name="radio123" type="radio" value="AwesomeItem1">
                                                        <label style={{font-weight:unset" className="radio__label" for="aw5" id="1110">Paypal</label>
                                                    </div>   --> */}
                                            </div>
                                        </li>
                                        <li className="bank_draft_err mb2 fgsd14" style={{ display: 'none' }}>
                                            <small style={{ color: 'red', fontWeight: 'bold' }}>{ErrorMsg.page_11['bank_draft']}</small>
                                        </li>
                                        <li className="mb2" id="payment_method_wrap" style={{ display: 'none' }}>
                                            <small style={{ color: 'red' }}>{ErrorMsg.page_11['payment_method']}</small>
                                        </li>
                                        <li className="fgsb14" id="1110">We accept Visa and MasterCard.</li>
                                        <li className="fgsd20 mt6" id="1112">I will pay for my premium:</li>
                                        <li className="mt3">
                                            <div className="radio__container" >
                                                <div className="ltr20">
                                                    <input className="radio" id="aw6" name="payment_freq" type="radio" value="1" />
                                                    <label style={{ fontWeight: "unset" }} className="radio__label" for="aw6" id="1114">Annually ( $ <span className="payment_annually"></span> )</label>
                                                </div>
                                                <div className="ltr20">
                                                    <input className="radio" id="aw7" name="payment_freq" type="radio" value="2" checked />
                                                    <label style={{ fontWeight: "unset" }} className="radio__label" for="aw7" id="1115">Monthly ( $ <span className="payment_monthly"></span> )</label>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="mb2" id="payment_freq_wrap" style={{ display: 'none' }}>
                                            <small style={{ color: 'red' }}>{ErrorMsg.page_11['payment_freq']}</small>
                                        </li>
                                        <li className="fgsb14" id="1117">Payments will be deducted automatically</li>
                                    </ul>
                                </div>
                                <div className="col-md-5 col-sm-5 mt4">
                                    <div className="panel-body text-center" style={{ backgroundColor: "rgb(0, 195,255)", borderRadius: "10px" }}>
                                        <div className="col-md-12 fgsb14" style={{ marginTop: "10%" }} id="1111">
                                            YOU ARE APPLYING FOR
                                            </div>
                                        <div className="col-md-12 mt5 agendabold42 card_text1">
                                            $ 0
                                            </div>
                                        <div className="col-md-12 fgsd14" id="1113">
                                            MONTHLY BENEFIT
                                            </div>
                                        <div className="col-md-12 mt3 agendabold42 card_text2" >
                                            $ 0
                                            </div>
                                        <div className="col-md-12 mb4 fgsd14" id="1116" style={{ marginBottom: "10%" }}>
                                            ONE TIME ADDITIONAL BENEFIT
                                            </div>
                                    </div>
                                </div>
                                <div className="col-md-12 mt4 pd0">
                                    <div className="radio__container col-md-12" >
                                        <div className="radio-inline fgsb18" id="1118">Is your home address the same as the billing address ? </div>
                                        <div className="radio-inline fgsd18" style={{ marginLeft: "4%", paddingTop: 16 }}>
                                            <input className="radio" id="aw8" name="radio_payment_bill_addr" type="radio" value="1" />
                                            <label style={{ fontWeight: "unset" }} className="radio__label" for="aw8" id="1119">Yes</label>
                                        </div>
                                        <div className="radio-inline fgsd18" style={{ paddingTop: 16 }}>
                                            <input className="radio" id="aw9" name="radio_payment_bill_addr" type="radio" value="2" />
                                            <label style={{ fontWeight: "unset" }} className="radio__label" for="aw9" id="1120">No</label>
                                        </div>

                                    </div>
                                    <small className="col-md-12" id="bill_addr_wrap" style={{ color: 'red', display: 'none' }}>{ErrorMsg.page_11['answer']}</small>
                                    <div className="col-md-12 zip_code_change">
                                        <div className="fgsb18"><span for="zipcode" id="1120"> What is your billing address zip code?</span> <input id="zipcode" name="zipcode" type="text" className="zipcode" style={{ width: "120px", marginLeft: "4%" }} maxLength="5" />
                                        </div>

                                    </div>
                                    <div className="col-md-12 text-center fgsd14 mt1 mb1 re_attempt_msg" style={{ display: "none", color: 'red !important' }}>Something's not right. Please check your payment details and try again.</div>
                                    {this.getWrongCardMessage()}
                                </div>
                                <div className="col-md-12 card-holder-div">
                                    <div className="card" style={{ display: (card_bank_toggle ? 'block' : 'none') }}>

                                        <Cards
                                            number={number}
                                            name={name}
                                            expiry={expiry}
                                            cvc={cvc}
                                            focused={focused}
                                            callback={this.handleCallback}
                                        />
                                        <div className="card_text_fields">
                                            <div className="col-md-8 col-md-offset-2">
                                                <div className="col-md-12">
                                                    <div className="col-md-6 pd0 mt1">
                                                        <label For="number" className="fgsd16">Card Number</label>
                                                        <input
                                                            type="text"
                                                            name="number"
                                                            id="card_number_"
                                                            placeholder=""

                                                            onKeyUp={this.handleInputChange}
                                                            onFocus={this.handleInputFocus}
                                                        />
                                                    </div>
                                                    <div className="col-md-6 pd0 mt1">
                                                        <label For="name" className="fgsd16">Name</label>
                                                        <input
                                                            type="text"
                                                            name="name"
                                                            id="card_name"
                                                            placeholder=""
                                                            onKeyUp={this.handleInputChange}
                                                            onFocus={this.handleInputFocus}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="col-md-6 pd0 mt1">
                                                        <label For="expiry" className="fgsd16">Valid Thru</label>
                                                        <input
                                                            type="text"
                                                            name="expiry"
                                                            id="expire_date"
                                                            placeholder="MM/YY"
                                                            maxLength='7'
                                                            onKeyUp={this.handleInputChange}
                                                            onFocus={this.handleInputFocus}
                                                        />
                                                    </div>
                                                    <div className="col-md-6 pd0 mt1">
                                                        <label For="cvc" className="fgsd16">CVC</label>
                                                        <input
                                                            type="text"
                                                            name="cvc"
                                                            id="card_cvc"
                                                            placeholder=""
                                                            onKeyUp={this.handleInputChange}
                                                            onFocus={this.handleInputFocus}
                                                            maxLength="4"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bank" style={{ display: card_bank_toggle ? 'none' : 'block' }}>
                                        <div className="col-md-12 mt4 pd0">
                                            <div className="col-md-4">
                                                <ul className="list-unstyled">
                                                    <li className="fgsb18" for="account_first_name">First Name</li>
                                                    <li><input type="text" className="account_first_name" name="account_first_name" id="" /></li>
                                                </ul>
                                            </div>
                                            <div className="col-md-4">
                                                <ul className="list-unstyled">
                                                    <li className="fgsb18" for="account_last_name">Last Name</li>
                                                    <li><input type="text" className="account_last_name" name="account_last_name" id="" /></li>
                                                </ul>
                                            </div>
                                            <div className="col-md-4">
                                                <ul className="list-unstyled">
                                                    <li className="fgsb18" for="banl_acc_type">Account Type</li>
                                                    <li> <div className="rail-select">
                                                        <div className="select-side">
                                                            <img src={Drop_arrow} alt="" />
                                                        </div>
                                                        <select className="form-control" id="" name="banl_acc_type" className="banl_acc_type" style={{ width: "100%" }}>
                                                            <option value="1">Savings Account</option>
                                                            <option value="2">Checkings Account</option>
                                                        </select>
                                                    </div></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-md-12 pd0">
                                            <div className="col-md-4">
                                                <ul className="list-unstyled">
                                                    <li className="fgsb18" for="account_number">Account Number</li>
                                                    <li><input type="text" className="account_number" name="account_number" id="account_number" maxLength="17" /></li>
                                                </ul>
                                            </div>
                                            <div className="col-md-4">
                                                <ul className="list-unstyled">
                                                    <li className="fgsb18" for="routing_number">Routing Number</li>
                                                    <li><input type="text" className="routing_number" name="routing_number" id="routing_number" maxLength="9" /></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>



                                </div>
                                <div className="col-md-12 mt2 text-center payment_error_div" style={{ display: 'none' }} >
                                    <span className="fgsd14" style={{ color: 'red' }}>Please complete your card details.</span>
                                </div>
                            </div>
                            <div className="col-md-10 col-md-offset-1 mt5">
                                <h2 className="col-md-12 text-center agendabold42" id="">Review and Sign</h2>
                                <div className="col-md-12 mt3">
                                    <div className="col-md-12 round " style={{ padding: 0 }}>
                                        <div className="pd0"><input type="checkbox" id="legal_notices_checkbox" name="legal_notices_checkbox" style={{ width: 35 }} />
                                            <label for="legal_notices_checkbox" style={{ top: '10px', }}></label></div>
                                        {/* <div className="col-md-10 ltr20" id="" style={{ padding: '12px 0px' }}>I agree I have read these <span style={{ textDecoration: "underline" }}>important legal notices</span> and <span style={{ textDecoration: "underline", cursor: "pointer" }}  type="button" class="" data-toggle="modal" data-target="#my_application">my application.</span>   </div> */}
                                        <div className="col-md-10 ltr20" id="" style={{ padding: '12px 0px' }}>I agree I have read these <span style={{ textDecoration: "underline", cursor: "pointer" }} type="button" data-toggle="modal" data-target="#important_legal_notices">important legal notices</span> and <span onClick={this.getPdf} className="pdf_view" style={{ textDecoration: "underline", cursor: "pointer" }}  >my application,</span> including the payment information above.</div>
                                        <a href="" id="testtt" target="_blank"></a>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="fgsd12" style={{ border: "2px solid black", padding: "20px", height: "160px", overflow: "auto" }} id="1125">
                                        <p className="tt">CUSTOMER IDENTIFICATION NOTICE</p><p className="fgsb14">Federal law requires that insurance companies obtain and retain relevant and appropriate customer-related information necessary to administer an effective Anti-Money laundering program. This means we will ask you for your name, residential address (not a P.O. Box), date of birth, Social Security Number and other information as appropriate (e.g. Driver's license, utility bills to verify address, social security card, etc.). I, the Proposed Owner, acknowledge receipt of the Customer Identification Notice. I understand that the identity information being provided by me is collected to verify my identity as required and I authorize its use for this purpose.</p>
                                        <p className="tt">ACKNOWLEDGEMENT</p><p className="fgsb14">By signing below, you are applying for coverage and represent and agree to the following: I have read the application. The statements and answers made in this application are true and complete to the best of my knowledge and belief and are made to obtain the insurance applied for. These answers will be attached to and made a part of the issued policy. No information will be considered to have been given to TIAA-CREF Life Insurance Company (the Company) unless it is stated in the application. I will notify the Company of any changes to the statements or answers given in the application between the time of the application and delivery of the policy. I understand that the insurance I applied for will take effect only if the Company accepts this application and issues a policy and if, on the date of issue: (1) the first premium has been paid, (2) I am alive, and (3) all conditions used to determine my insurability remain as stated in the application. No one except the Company's officers may make, change or discharge any insurance contract, or bind the Company by making any promises about any policy benefits applied for. I acknowledge receipt of the written notice of my rights under the federal Fair Credit Reporting Act and the MIB, Inc. Any person who knowingly presents a false statement in an application for insurance may be guilty of a criminal offense and subject to penalties under state law. </p>

                                    </div>
                                    {/* <embed src={pdf_privacy} width="100%" height="160px" /> */}

                                </div>
                                <div className="col-md-12 mt5 mb3">
                                    <div className="col-md-12 round " style={{ padding: 0 }}>
                                        <div className="pd0"><input type="checkbox" id="i_agree_checkbox" name="i_agree_checkbox" style={{ width: 35 }} />
                                            <label for="i_agree_checkbox" style={{ top: '10px', }}></label></div>
                                        <div className="col-md-12 ltr20" id="" style={{ padding: '10px 0px' }}>By checking this box and clicking ‘submit’ below, I agree to hereby sign and complete my application as of today’s date,<span id="today_date"></span>, and agree to receive my policy documents via email at the address previously provided.</div>
                                    </div>
                                    {/* <div className="radio__container" >

                                        <div className="radio-inline ltr20">
                                            <input className="radio" id="aw10" name="radio_agree_last" type="radio" value="AwesomeItem1" />
                                            <label style={{ fontWeight: "unset", display: "inline-table" }} className="radio__label" for="aw10" id="1126">By checking this box and clicking ‘submit’ below, I agree to hereby sign and complete my application as of today’s date,<span id="today_date"></span>, and agree to receive my policy documents via email at the address previously provided.</label>
                                        </div>


                                    </div> */}

                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="important_legal_notices" class="modal fade" role="dialog">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-body text-left" style={{ padding: "15px !important" }}>
                                    <span className="fgsb20" style={{ color: "rgba(226, 22, 42, 1)" }}></span><button type="button" className="close" style={{ position: "absolute", right: "20px", opacity: 1 }} data-dismiss="modal"><img src={close_model} alt="" style={{ width: "30px", height: "31px" }} /></button>
                                    <embed src={important_legal_notices} width="100%" height="800" style={{ marginTop: 50 }} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12 text-center mb3">
                        <Link to="#" onClick={this.maintainOrder} className="btn fgsd14 payment_submit_button" style={{ borderRadius: "20px", backgroundColor: "#F9E038", width: "150px", padding: "7px 0px 3px", marginBottom: 10 }} id="1131"> SUBMIT</Link>

                        <div className="col-md-12 col-xs-12 text-center mt1" id="validation_page_eleven" style={{ display: 'none' }}>
                            <span className="fgsd14" style={{ color: "red" }}>Please fill all required fields & proper values</span>
                        </div>
                    </div>
                </div>
                <div>
                    {this.callCyber()}
                </div>
            </div >

        )
    }

}
