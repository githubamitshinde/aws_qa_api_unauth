import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import $ from 'jquery';
import { filter, sortBy } from 'lodash';

import cookie from 'react-cookies'
import dropdown from "../../config/dropdown.json"
import DropdownCall from "../../config/dropdown_api_request.js"
import moment from 'moment';
import ApiList from "../../config/base.json"
import PageMapper from "../../config/page_mapper";


import '../../css/income_shield/income_shield_one.css';

import '../../css/user_info/info_section.css';

import ErrorMsg from "../../config/error_msgs";
const img_one = ApiList.base_cdn_src + "/images/SVG/down_arrow.svg";

let user_data = sessionStorage.getItem('user_data') ? JSON.parse(sessionStorage.getItem('user_data')) : {};

var firstPassword;
var secondUserName;
var tokenGlobal;
var tokenGlobalAfficient;

// alert(user_data)
var parent_questions, sub_questions;
export default class page_five_questions extends Component {
        constructor() {
                super();
                this.state = {
                        current_page_index: sessionStorage.getItem('current_index')
                }
        }

        componentDidMount() {
                // alert("THIS")
                user_data = sessionStorage.getItem('user_data') ? JSON.parse(sessionStorage.getItem('user_data')) : {};

                var self = this;
                $(document).on('change', '#page5_height', function () {
                        user_data.height = $("#page5_height").val(),
                                sessionStorage.setItem('user_data', JSON.stringify(user_data))
                })
                $(document).on('blur', '.page5_weight', function () {
                        user_data.weight = $(".page5_weight").val(),
                                sessionStorage.setItem('user_data', JSON.stringify(user_data))
                })
                if (user_data.aff2) {
                        $('.display_afficiency_id').append('Afficiency Id : ' + user_data.aff2)
                }
                console.log('FIVE HOST URL :: ' + ApiList.current.base_afficient_api_url + ApiList.get_uw_question);
                $.ajax({
                        //url:ApiList.current.base_api_url +'Afficient-demo-0.0.1-SNAPSHOT/'+ 'uwquestionAnswer/getQuestionsAnswers',
                        url: ApiList.current.base_afficient_api_url + ApiList.get_uw_question,
                        type: 'POST',
                        data: JSON.stringify(
                                {
                                        "questions":
                                        {
                                                "product_id": 100001
                                        }
                                }),
                        headers: {
                                'Authorization': 'Bearer ' + tokenGlobalAfficient,
                                'Content-Type': 'application/json'
                        },
                        success: (data) => {
                                console.log(JSON.stringify(data))
                                console.log(data.length)

                                if (data.length == 1) {
                                        parent_questions = sortBy(data[0].parent_questions, [function (o) { return o.question_sequence_number; }]);
                                        sub_questions = sortBy(data[0].sub_questions, [function (o) { return o.question_sequence_number; }]);

                                        var options = '<div class="col-md-12 pd0 mt2 parent-wrapper" ><ul class="list-unstyled col-md-4"><li class="fgsd18 mt2 li-questions" data-question_id="0" data-answer_category="0">What is your height and weight ?</li></ul><div class="uw_flex_income_weight"><div class="col-md-2 "><div class="rail-select box"><div class="select-side" style="border-top:0px !important;border-right:0px !important;border-color:grey !important"><img style="margin:6px 7px !important" src=' + img_one + ' alt="" /></div><select class="form-control" class="page5_height" id="page5_height" style="box-shadow:none !important;height:35px !important;font-size:18px;border-color:grey !important;border-top:0px !important;border-left:0px !important" ></select></div></div><div class="col-md-2  parent_div_subanswer "><input type="text" class="page5_weight" style="width:100px;border-color: grey;border-top: 0px;height:34px !important;border-left: 0px;border-right: 0px" value="' + user_data.weight + '" placeholder="100 lbs" maxlength="3"/></div></div></div><div class="col-md-12 pd0 mt4 parent-wrapper" ><ul class="list-unstyled col-md-4"><li class="fgsd18 mt2 li-questions" data-question_id="0" data-answer_category="0">What is your annual income ?</li></ul><div class="uw_flex_income_weight"><div class="col-md-1 textbox_margin_top" style="padding:24px 0px 0px 0px;font-size:20px;text-align:right;width:30px">$</div><div class="col-md-2 parent_div_subanswer"><input type="text" class="page5_income" style="z-index:100;width:100%;border-color: grey;border-top: 0px;height:35px !important;border-left: 0px;border-right: 0px" placeholder="" /></div></div></div></div>';
                                        for (var i = 0; i < parent_questions.length; i++) {
                                                // && parent_questions[i].question_id == 1026
                                                if (parent_questions[i].dependency != 5 && parent_questions[i].dependency != 6) {
                                                        // console.log(">>>>>>" + parent_questions[i].dependency)
                                                        // console.log(parent_questions[i].dependency + "**&&**" + typeof parent_questions[i].dependency)
                                                        options += '<div class="col-md-12  pd0 mt2 parent-wrapper"><ul class="list-unstyled col-md-8"><li class="fgsd18 li-questions" data-question_id="' + parent_questions[i].question_id + '"  data-answer_category="' + parent_questions[i].answer_category + '">' + parent_questions[i].question_text + '</li></ul>';


                                                        if (parent_questions[i].answer) {
                                                                var q_answers = sortBy(parent_questions[i].answer, [function (o) { return o.answer_option_seq; }]);

                                                                // ************** for yes no option ****************
                                                                if (parent_questions[i].answer_category == 1) {
                                                                        options += '<div class="col-md-3 parent_div_subanswer"><div class="radio__container">'

                                                                        for (var j = 0; j < q_answers.length; j++) {
                                                                                options += '<div class="radio-inline fgsd18"><input class="radio p_radio_button" id="' + q_answers[j].question_id + '' + j + '" name="' + q_answers[j].question_id + '" type="radio" value="' + q_answers[j].answer_option_text + '" data-answer_option_id="' + q_answers[j].answer_option_id + '" data-parent_id="' + parent_questions[i].question_id + '"  ><label style="font-weight:unset" class="radio__label " for="' + q_answers[j].question_id + '' + j + '" id="">' + q_answers[j].answer_option_text + '</label></div>';

                                                                                if (j == q_answers.length - 1) {
                                                                                        options += "</div></div></div>"
                                                                                }
                                                                        }
                                                                }
                                                                // ************** for yes no option **************** ends
                                                                // ************** for multi option ****************
                                                                if (parent_questions[i].answer_category == 2) {
                                                                        options += '<ul class="list-unstyled col-md-12"><li class="fgsb18"> <div class="radio__container parent_div_subanswer" >'
                                                                        for (var j = 0; j < q_answers.length; j++) {
                                                                                options += '<div class="radio-inline col-md-12 fgsd18"><input class="radio p_multi_button" id="' + q_answers[j].question_id + '' + j + '" name="' + q_answers[j].question_id + '" type="radio" value="' + q_answers[j].answer_option_text + '" data-answer_option_id="' + q_answers[j].answer_option_id + '" data-parent_id="' + parent_questions[i].question_id + '"  ><label style="font-weight:unset" class="radio__label" for="' + q_answers[j].question_id + '' + j + '" id="">' + q_answers[j].answer_option_text + '</label></div>';

                                                                                if (j == q_answers.length - 1) {
                                                                                        options += "</div></li></ul></div>"
                                                                                }
                                                                        }
                                                                }
                                                                // ************** for multiple option **************** ends
                                                                // *************** for checkbox option **************
                                                                if (parent_questions[i].answer_category == 3) {
                                                                        options += '<div class="col-md-12 parent_div_subanswer">'
                                                                        for (var j = 0; j < q_answers.length; j++) {
                                                                                var p_id = q_answers[j].question_id + '' + j;
                                                                                options += '<div class="col-md-12 pd0"> <ul class="list-unstyled"> <li class="round"><input type="checkbox" id="' + q_answers[j].question_id + '' + j + '" name="' + q_answers[j].question_id + '" style="width: 20px"  data-answer_option_id="' + q_answers[j].answer_option_id + '" data-parent_id="' + parent_questions[i].question_id + '"   class="p_check__button" value="' + q_answers[j].answer_option_text + '"/><label class="" for="' + q_answers[j].question_id + '' + j + '" ></label> <div class="fgsb18" style="' + (p_id == 10269 ? "margin-left:35px;margin-top:3px" : "margin-left:30px;margin-top:3px") + '">' + q_answers[j].answer_option_text + '</div></li></ul></div>';

                                                                                if (j == q_answers.length - 1) {
                                                                                        options += "</div></div>"
                                                                                }
                                                                        }
                                                                }
                                                                // *************** for checkbox option ************** ends
                                                                // *************** for text option **************
                                                                if (parent_questions[i].answer_category == 4) {
                                                                        // ' + q_answers[j].answer_option_id + '
                                                                        options += '<div class="col-md-8 col-md-offset-0 parent_div_subanswer"><input type="text"  style="height:30px !important;width:100%;border-color: grey;border-top: 0px;border-left: 0px;border-right: 0px"  class="txt-answers" name="' + parent_questions[i].question_id + '"  data-answer_option_id="1" /></div></div>';
                                                                }
                                                                // *************** for text option ************** ends

                                                        }


                                                }
                                                if (i == parent_questions.length - 1) {
                                                        options += '</div>'
                                                        $('.page5_question_div').append(options)
                                                        DropdownCall.dropdown_req(dropdown.table_name.page1, dropdown.column_name.Height, "page5_height", user_data.height, false)
                                                }
                                        }
                                } else {

                                }
                        },
                        error: (err) => {
                                console.log("ERROR in page 5 question " + JSON.stringify(err));
                        }
                })

                $(document).on('change', '.p_radio_button', function () {
                        var parent_id = $(this).data('parent_id');
                        var ans_text = $(this).val();
                        var answer_option_id = $(this).data('answer_option_id');

                        $(this).closest('.parent-wrapper').find('.child-question-wrapper').remove();
                        $('.' + parent_id).remove();
                        $(this).closest('.parent-wrapper').append(self.fetch_sub_question(parent_id, ans_text, 1, answer_option_id));
                })

                $(document).on('change', '.radio_button', function () {
                        var parent_id = $(this).data('parent_id');
                        var ans_text = $(this).val();
                        var answer_option_id = $(this).data('answer_option_id');

                        $(this).closest('.child-question-wrapper').find('.child-question-wrapper').remove();
                        $('.' + parent_id).remove();
                        $(this).closest('.child-question-wrapper').append(self.fetch_sub_question(parent_id, ans_text, 1, answer_option_id));

                        // $(this).closest('.child-question-wrapper').nextAll('.child-question-wrapper').remove();
                        // $('.' + parent_id).remove();
                        // $(this).closest('.parent-wrapper').append(self.fetch_sub_question(parent_id, ans_text, 1, answer_option_id));
                })

                $(document).on('change', '.p_multi_button', function () {
                        var parent_id = $(this).data('parent_id');
                        var ans_text = $(this).val();
                        var answer_option_id = $(this).data('answer_option_id');

                        $(this).closest('.parent-wrapper').find('.child-question-wrapper').remove();
                        $('.' + parent_id).remove();
                        $(this).closest('.parent-wrapper').append(self.fetch_sub_question(parent_id, ans_text, 2, answer_option_id));
                })

                $(document).on('change', '.multi_button', function () {
                        var parent_id = $(this).data('parent_id');
                        var ans_text = $(this).val();
                        var answer_option_id = $(this).data('answer_option_id');

                        $(this).closest('.child-question-wrapper').find('.child-question-wrapper').remove();

                        $('.' + parent_id).remove();

                        $(this).closest('.child-question-wrapper').append(self.fetch_sub_question(parent_id, ans_text, 2, answer_option_id));
                })

                $(document).on('change', '.p_check__button', function () {
                        var curr_opt_id = $(this).data('answer_option_id');

                        var parent_id = $(this).data('parent_id');
                        var ans_text = $(this).val();
                        var answer_option_id = $(this).data('answer_option_id');

                        if (this.checked) {
                                if (this.value == "None of the above" || this.value == "None") {
                                        $('input[name="' + this.name + '"]').map(function () {
                                                if (this.checked && (curr_opt_id != $(this).data('answer_option_id'))) {
                                                        this.click()
                                                }
                                        })
                                } else {
                                        if ($('input[value="None of the above"]').is(":checked") || $('input[value="None"]').is(":checked")) {
                                                $('input[value="None of the above"]').click();
                                        }
                                }
                                $(this).closest('.parent-wrapper').append(self.fetch_sub_question(parent_id, ans_text, 3, answer_option_id));
                        } else {
                                $('.' + parent_id + answer_option_id).remove();
                        }
                })

                $(document).on('change', '.check__button', function () {
                        var curr_opt_id = $(this).data('answer_option_id');

                        var parent_id = $(this).data('parent_id');
                        var ans_text = $(this).val();
                        var answer_option_id = $(this).data('answer_option_id');

                        if (this.checked) {
                                if (this.value == "None of the above" || this.value == "None") {
                                        $('input[name="' + this.name + '"]').map(function () {
                                                if (this.checked && (curr_opt_id != $(this).data('answer_option_id'))) {
                                                        this.click()
                                                }
                                        })
                                } else {
                                        if ($('input[value="None of the above"]').is(":checked") || $('input[value="None"]').is(":checked")) {
                                                $('input[value="None of the above"]').click();
                                        }
                                }
                                $('.' + parent_id + answer_option_id).remove();
                                $(this).closest('.child-question-wrapper').find('.child-question-wrapper').remove();
                                $(this).closest('.child-question-wrapper').append(self.fetch_sub_question(parent_id, ans_text, 3, answer_option_id));
                        } else {
                                $('.' + parent_id + answer_option_id).remove();
                                // $(this).closest('.child-question-wrapper').nextAll('.child-question-wrapper').remove();
                        }
                })

                $(document).on('change', '#checkbox', function () {
                        if (this.checked) {
                                $('#chkbox_div_wrap').css('display', 'none')
                                $('#checkbox').siblings('label').css('border', '2px solid #ccc')
                        } else {
                                $('#chkbox_div_wrap').css('display', 'block')
                                $('#checkbox').siblings('label').css('border', '2px solid red')
                        }
                });

                //UNCHANGE COLOR ON SELECTION
                $(document).on('change', '.p_radio_button, .radio_button, .p_multi_button, .multi_button', function () {
                        $(this).closest('.parent_div_subanswer').find('label').removeClass('radio_incomplete')
                        $(this).closest('.parent_div_subanswer').prev('ul').find('small').remove();
                });

                //UNCHANGE COLOR ON SELECTION FOR CHECKBOX
                $(document).on('change', '.p_check__button, .check__button', function () {
                        $(this).closest('.parent_div_subanswer').find('label').css('border', '2px solid #ccc');
                        $(this).closest('.parent_div_subanswer').prev('ul').find('small').remove();
                });
                $(document).on('keyup', '.page5_weight', function () {

                        if ($('.page5_weight').val() != null && $('.page5_weight').val() != "") {
                                $('.page5_weight').css('border-color', 'black')
                                $('.page5_weight').closest('.uw_flex_income_weight').siblings('ul').find('small').remove();
                        } else {
                                $('.page5_weight').css('border-color', 'red')
                                if (!$('.page5_weight').closest('.uw_flex_income_weight').siblings('ul').find('small').is(":visible")) {
                                        $('.page5_weight').closest('.uw_flex_income_weight').siblings('ul').append('<small style="color:red">' + ErrorMsg.uw_questions.answer + '</small>')
                                }

                        }

                })
                $(document).on('keyup', '.page5_income', function (event) {
                        if ($('.page5_income').val() != null && $('.page5_income').val() != "" && $('.page5_income').val() != 0) {
                                $('.page5_income').css('border-color', 'black')
                                $('.page5_income').parents('.uw_flex_income_weight').siblings('.list-unstyled').find('small').remove();
                                // skip for arrow keys
                                if ((event.which >= 37 && event.which <= 40) || event.which == 8 || event.which == 9) { event.preventDefault(); } else {
                                        // format number
                                        $(this).val(function (index, value) {

                                                return value
                                                        .replace(/\D/g, "")
                                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                                        ;
                                        });
                                };

                        } else {
                                $('.page5_income').css('border-color', 'red')

                                $('.page5_income').parents('.uw_flex_income_weight').siblings('.list-unstyled').find('small').is(":visible") ? null : $('.page5_income').parents('.uw_flex_income_weight').siblings('.list-unstyled').append('<small style="color:red">' + ErrorMsg.uw_questions.answer + '</small>')

                        }



                });
        }


        fetch_sub_question = (sub_question_id, answer_txt, parent_ans_type, answer_option_id) => {
                var sub_question_array = filter(sub_questions, function (question) {
                        return question.parent_question_id == sub_question_id && (question.applicable_parent_answer == answer_txt || question.applicable_parent_answer_2 == answer_txt || question.applicable_parent_answer_3 == answer_txt || question.applicable_parent_answer_4 == answer_txt)
                });

                // console.log("FILTERED JSON::" + JSON.stringify(sub_question_array))
                var options = '';

                if (sub_question_array.length > 0) {


                        for (var i = 0; i < sub_question_array.length; i++) {
                                if (sub_questions[i].dependency != 6 || sub_questions[i].dependency != 5) {
                                        options += '<div class="col-md-12 pd0 mt4 child-question-wrapper ' + sub_question_id + '' + (parent_ans_type == 3 ? answer_option_id : '') + '"><ul class="list-unstyled col-md-8"><li class="fgsd18  li-questions" data-question_id="' + sub_question_array[i].question_id + '" data-answer_category="' + sub_question_array[i].answer_category + '">' + sub_question_array[i].question_text + '</li></ul>';

                                        var sub_q_answer = sortBy(sub_question_array[i].answer, [function (o) { return o.answer_option_seq; }]);
                                        if (sub_question_array[i].answer) {

                                                // ************** for yes no option ****************
                                                if (sub_question_array[i].answer_category == 1) {
                                                        options += '<div class="col-md-3 parent_div_subanswer"><div class="radio__container">'
                                                        for (var j = 0; j < sub_q_answer.length; j++) {
                                                                // options += '<div class="radio-inline fgsd18"><input class="radio p_radio_button" id="' + q_answers[j].question_id + '' + j + '" name="' + q_answers[j].question_id + '" type="radio" value="' + q_answers[j].answer_option_text + '" data-answer_option_id="' + q_answers[j].answer_option_id + '" data-parent_id="' + parent_questions[i].question_id + '"  ><label style="font-weight:unset" class="radio__label " for="' + q_answers[j].question_id + '' + j + '" id="">' + q_answers[j].answer_option_text + '</label></div>';
                                                                options += '<div class="radio-inline fgsd18"><input class="radio radio_button" id="' + sub_q_answer[j].question_id + '' + j + '" name="' + sub_q_answer[j].question_id + '" type="radio" value="' + sub_q_answer[j].answer_option_text + '" data-parent_id="' + sub_q_answer[j].question_id + '" data-answer_option_id="' + sub_q_answer[j].answer_option_id + '" /><label style="font-weight:unset" class="radio__label " for="' + sub_q_answer[j].question_id + '' + j + '" id="">' + sub_q_answer[j].answer_option_text + '</label></div>';
                                                                if (j == sub_q_answer.length - 1) {
                                                                        options += "</div></div></div>"
                                                                }
                                                        }
                                                }
                                                // ************** for yes no option **************** ends
                                                // ************** for multi option ****************
                                                if (sub_question_array[i].answer_category == 2) {
                                                        options += '<ul class="list-unstyled col-md-12"><li class="fgsb18"> <div class="radio__container parent_div_subanswer" >'
                                                        for (var j = 0; j < sub_q_answer.length; j++) {
                                                                options += '<div class="radio-inline col-md-12 fgsd18"><input class="radio multi_button" id="' + sub_q_answer[j].question_id + '' + j + '" name="' + sub_q_answer[j].question_id + '" type="radio" value="' + sub_q_answer[j].answer_option_text + '" data-answer_option_id="' + sub_q_answer[j].answer_option_id + '" data-parent_id="' + sub_q_answer[i].question_id + '"><label style="font-weight:unset" class="radio__label" for="' + sub_q_answer[j].question_id + '' + j + '" id="">' + sub_q_answer[j].answer_option_text + '</label></div>';
                                                                if (j == sub_q_answer.length - 1) {
                                                                        options += "</div></li></ul></div>"
                                                                }
                                                        }
                                                }
                                                // ************** for multiple option **************** ends
                                                // *************** for checkbox option **************
                                                if (sub_question_array[i].answer_category == 3) {
                                                        options += '<div class="col-md-12 parent_div_subanswer">'
                                                        for (var j = 0; j < sub_q_answer.length; j++) {
                                                                options += '<div class="col-md-12 pd0"> <ul class="list-unstyled"> <li class="round"><input type="checkbox" id="' + sub_q_answer[j].question_id + '' + j + '" name="' + sub_q_answer[j].question_id + '" style="width: 20px" data-answer_option_id="' + sub_q_answer[j].answer_option_id + '" data-parent_id="' + sub_q_answer[i].question_id + '"   class="check__button" value="' + sub_q_answer[j].answer_option_text + '"/><label class="" for="' + sub_q_answer[j].question_id + '' + j + '" ></label> <div class="fgsb18" style="margin-left:30px;margin-top:3px">' + sub_q_answer[j].answer_option_text + '</div></li></ul></div>';
                                                                if (j == sub_q_answer.length - 1) {
                                                                        options += "</div></div>"
                                                                }
                                                        }
                                                }
                                                // *************** for checkbox option ************** ends
                                                // *************** for text option **************
                                                if (sub_question_array[i].answer_category == 4) {
                                                        // ' + sub_q_answer[j].answer_option_id + '
                                                        options += '<div class="col-md-8 col-md-offset-0 parent_div_subanswer"><input type="text" style="width:100%;border-color: grey;border-top: 0px;border-left: 0px;border-right: 0px" name="' + sub_question_array[i].question_id + '" data-answer_option_id="1" class="txt-answers"/></div></div>';
                                                }
                                                // *************** for text option ************** ends

                                        }
                                        if (i == sub_question_array.length - 1) {
                                                options += '</div>'
                                                return options;
                                                // $('.page5_question_div').append(options)
                                        }
                                }
                        }
                }
        }

        submit_app_health_answer = () => {

                var validation_flag = true;

                var income = $('.page5_income').val();
                user_data.income = income;
                user_data.uwanswers = [];
                var question_json;

                var datastring = {
                        "app_health_answers": [
                                { "visit_id": cookie.load('visit_id'), "question_id": 1006, "answer_value": income, "answer_option_id": "4", "afficiency_id": cookie.load('aff2') ? cookie.load('aff2') : user_data.aff2 }
                        ],
                        "application_information": {
                                "height": $("#page5_height").val(),
                                "weight": $(".page5_weight").val(),
                                "visit_id": cookie.load('visit_id'),
                                "app_stage_completed": 5
                        },
                        "navigation_log": {
                                "visit_id": cookie.load('visit_id'),
                                "page_url": window.location.pathname,
                                "entry_timestamp": moment().format("MM/DD/YYYY"),
                                "exit_timestamp": moment().format("MM/DD/YYYY"),
                                "interactive_indicator": 1
                        }
                }


                $('.page5_question_div .parent-wrapper').map(function () {
                        //FIRST PUSH PARENT QUESTIONS DATA
                        question_json = {
                                "visit_id": cookie.load('visit_id'),
                        };
                        var curr_question_id = $(this).find('.li-questions').data('question_id');
                        // REQUIRED KEYS STARTS HERE
                        question_json.question_id = curr_question_id;

                        if ($(this).find('.li-questions').data('answer_category') == 1) {
                                if ($(this).find('.parent_div_subanswer').find('input[name="' + curr_question_id + '"]').is(':checked')) {
                                        question_json.answer_value = $(this).find('.parent_div_subanswer').find('input[name="' + curr_question_id + '"]:checked').val();
                                        question_json.answer_option_id = $(this).find('.parent_div_subanswer').find('input[name="' + curr_question_id + '"]:checked').data('answer_option_id');

                                        $(this).find('.parent_div_subanswer').find('input[name="' + curr_question_id + '"]').siblings('.radio__label').removeClass('radio_incomplete');
                                        $(this).find('.parent_div_subanswer').prev('ul').find('small').remove();
                                } else {
                                        $(this).find('.parent_div_subanswer').find('input[name="' + curr_question_id + '"]').siblings('.radio__label').addClass('radio_incomplete');
                                        validation_flag = false;
                                        if (!$(this).find('.parent_div_subanswer').prev('ul').find('small').is(":visible")) {
                                                $(this).find('.parent_div_subanswer').prev('ul').append('<small style="color: red">' + ErrorMsg.uw_questions['answer'] + '</small>');
                                        }

                                }

                        } else if ($(this).find('.li-questions').data('answer_category') == 2) {
                                if ($(this).find('.parent_div_subanswer').find('input[name="' + curr_question_id + '"]').is(':checked')) {
                                        question_json.answer_value = $(this).find('.parent_div_subanswer').find('input[name="' + curr_question_id + '"]:checked').val();
                                        question_json.answer_option_id = $(this).find('.parent_div_subanswer').find('input[name="' + curr_question_id + '"]:checked').data('answer_option_id');

                                        $(this).find('.parent_div_subanswer').find('input[name="' + curr_question_id + '"]').siblings('label').removeClass('radio_incomplete');
                                        $(this).find('.parent_div_subanswer').prev('ul').find('small').remove();
                                } else {
                                        $(this).find('.parent_div_subanswer').find('input[name="' + curr_question_id + '"]').siblings('label').addClass('radio_incomplete');
                                        validation_flag = false;
                                        if (!$(this).find('.parent_div_subanswer').prev('ul').find('small').is(":visible")) {
                                                $(this).find('.parent_div_subanswer').prev('ul').append('<small style="color: red">' + ErrorMsg.uw_questions['answer'] + '</small>');
                                        }
                                }
                        } else if ($(this).find('.li-questions').data('answer_category') == 3) {
                                if ($(this).find('.parent_div_subanswer').find('input[name="' + curr_question_id + '"]').is(':checked')) {
                                        var chk_json;

                                        $(this).find('.parent_div_subanswer').find('input[name="' + curr_question_id + '"]:checked').map(function () {
                                                chk_json = {
                                                        "visit_id": cookie.load('visit_id'),
                                                };
                                                chk_json.question_id = curr_question_id;

                                                chk_json.answer_value = $(this).val();
                                                chk_json.answer_option_id = $(this).data('answer_option_id');
                                                chk_json.afficiency_id = cookie.load('aff2') ? cookie.load('aff2') : user_data.aff2;

                                                // alert(JSON.stringify(question_json))
                                                // REQUIRED KEYS STARTS HERE
                                                datastring.app_health_answers.push(chk_json);
                                                user_data.uwanswers.push(chk_json);
                                        })
                                        $(this).find('.parent_div_subanswer').find('input[name="' + curr_question_id + '"]').siblings('label').css('border', '2px solid #ccc');
                                        $(this).find('.parent_div_subanswer').prev('ul').find('small').remove();
                                } else {
                                        $(this).find('.parent_div_subanswer').find('input[name="' + curr_question_id + '"]').siblings('label').css('border', '2px solid red');
                                        validation_flag = false;
                                        if (!$(this).find('.parent_div_subanswer').prev('ul').find('small').is(":visible")) {
                                                $(this).find('.parent_div_subanswer').prev('ul').append('<small style="color: red">' + ErrorMsg.uw_questions['answer'] + '</small>');
                                        }
                                }
                        } else if ($(this).find('.li-questions').data('answer_category') == 4) {

                                if ($(this).find('.parent_div_subanswer').find('input[name="' + curr_question_id + '"]').val() != "") {
                                        question_json.answer_value = $(this).find('.parent_div_subanswer').find('input[name="' + curr_question_id + '"]').val();
                                        question_json.answer_option_id = '1';
                                        $(this).find('.parent_div_subanswer').find('input[name="' + curr_question_id + '"]').css('borderColor', 'grey')
                                        $(this).find('.parent_div_subanswer').prev('ul').find('small').remove();
                                } else {
                                        $(this).find('.parent_div_subanswer').find('input[name="' + curr_question_id + '"]').css('borderColor', 'red')
                                        validation_flag = false;
                                        if (!$(this).find('.parent_div_subanswer').prev('ul').find('small').is(":visible")) {
                                                $(this).find('.parent_div_subanswer').prev('ul').append('<small style="color: red">' + ErrorMsg.uw_questions['answer'] + '</small>');
                                        }
                                }

                        } else if ($(this).find('.li-questions').data('answer_category') == 0) {
                                question_json.answer_value = "100";
                                question_json.answer_option_id = '1';
                        }

                        if ($(this).find('.li-questions').data('answer_category') != 3) {
                                question_json.afficiency_id = cookie.load('aff2') ? cookie.load('aff2') : user_data.aff2;
                                // REQUIRED KEYS STARTS HERE
                                datastring.app_health_answers.push(question_json);
                                user_data.uwanswers.push(question_json);
                        }

                        //THEN CHECK FOR CHILD QUESTIONS & FETCH DATA
                        $(this).find('.child-question-wrapper').map(function () {
                                question_json = {
                                        "visit_id": cookie.load('visit_id'),
                                };

                                var curr_question_id = $(this).find('.li-questions').data('question_id');
                                // REQUIRED KEYS STARTS HERE
                                question_json.question_id = curr_question_id;

                                if ($(this).find('.li-questions').data('answer_category') == 1) {
                                        if ($(this).find('.parent_div_subanswer').find('input[name="' + curr_question_id + '"]').is(':checked')) {
                                                question_json.answer_value = $(this).find('.parent_div_subanswer').find('input[name="' + curr_question_id + '"]:checked').val();
                                                question_json.answer_option_id = $(this).find('.parent_div_subanswer').find('input[name="' + curr_question_id + '"]:checked').data('answer_option_id');

                                                $(this).find('.parent_div_subanswer').find('input[name="' + curr_question_id + '"]').siblings('.radio__label').removeClass('radio_incomplete');
                                        } else {
                                                $(this).find('.parent_div_subanswer').find('input[name="' + curr_question_id + '"]').siblings('.radio__label').addClass('radio_incomplete');
                                                validation_flag = false;
                                        }

                                } else if ($(this).find('.li-questions').data('answer_category') == 2) {
                                        if ($(this).find('.parent_div_subanswer').find('input[name="' + curr_question_id + '"]').is(':checked')) {
                                                question_json.answer_value = $(this).find('.parent_div_subanswer').find('input[name="' + curr_question_id + '"]:checked').val();
                                                question_json.answer_option_id = $(this).find('.parent_div_subanswer').find('input[name="' + curr_question_id + '"]:checked').data('answer_option_id');

                                                $(this).find('.parent_div_subanswer').find('input[name="' + curr_question_id + '"]').siblings('label').removeClass('radio_incomplete');
                                        } else {
                                                $(this).find('.parent_div_subanswer').find('input[name="' + curr_question_id + '"]').siblings('label').addClass('radio_incomplete');
                                                validation_flag = false;
                                        }
                                } else if ($(this).find('.li-questions').data('answer_category') == 3) {

                                        if ($(this).find('.parent_div_subanswer').find('input[name="' + curr_question_id + '"]').is(':checked')) {
                                                var chk_json = '';
                                                $(this).find('.parent_div_subanswer').find('input[name="' + curr_question_id + '"]:checked').map(function () {
                                                        chk_json = {
                                                                "visit_id": cookie.load('visit_id'),
                                                        };
                                                        chk_json.question_id = curr_question_id;

                                                        chk_json.answer_value = $(this).val();
                                                        chk_json.answer_option_id = $(this).data('answer_option_id');
                                                        chk_json.afficiency_id = cookie.load('aff2') ? cookie.load('aff2') : user_data.aff2;

                                                        // REQUIRED KEYS STARTS HERE
                                                        datastring.app_health_answers.push(chk_json);
                                                        user_data.uwanswers.push(chk_json);
                                                })

                                                $(this).find('.parent_div_subanswer').find('input[name="' + curr_question_id + '"]').siblings('label').css('border', '2px solid #ccc');
                                        } else {
                                                $(this).find('.parent_div_subanswer').find('input[name="' + curr_question_id + '"]').siblings('label').css('border', '2px solid red');
                                                validation_flag = false;
                                        }
                                } else if ($(this).find('.li-questions').data('answer_category') == 4) {
                                        if ($(this).find('.parent_div_subanswer').find('input[name="' + curr_question_id + '"]').val() != "") {
                                                question_json.answer_value = $(this).find('.parent_div_subanswer').find('input[name="' + curr_question_id + '"]').val();
                                                question_json.answer_option_id = '1';
                                                $(this).find('.parent_div_subanswer').find('input[name="' + curr_question_id + '"]').css('borderColor', 'grey')
                                        } else {
                                                $(this).find('.parent_div_subanswer').find('input[name="' + curr_question_id + '"]').css('borderColor', 'red')
                                                validation_flag = false;
                                        }

                                } else if ($(this).find('.li-questions').data('answer_category') == 0) {
                                        question_json.answer_value = "100";
                                        question_json.answer_option_id = '1';
                                }

                                if ($(this).find('.li-questions').data('answer_category') != 3) {
                                        question_json.afficiency_id = cookie.load('aff2') ? cookie.load('aff2') : user_data.aff2;
                                        // REQUIRED KEYS STARTS HERE
                                        datastring.app_health_answers.push(question_json);
                                        user_data.uwanswers.push(question_json);
                                }

                        });

                })
                sessionStorage.setItem('user_data', JSON.stringify(user_data))
                console.log("data string of question passed :" + JSON.stringify(datastring))
                if ($('#checkbox').is(":checked")) {
                        $('#checkbox').siblings('label').css('border', '2px solid #ccc')
                        $('#validation_msg').css('display', 'none');

                        $('#chkbox_div_wrap').css('display', 'none');
                } else {
                        $('#checkbox').siblings('label').css('border', '2px solid red')
                        $('#validation_msg').css('display', 'block')
                        $('#chkbox_div_wrap').css('display', 'block')

                        setTimeout(function () {
                                $("#validation_msg").css("display", 'none');
                        }, 4000);

                        validation_flag = false;
                }

                if ($('.page5_income').val() != null && $('.page5_income').val() != "") {
                        $('.page5_income').css('border-color', 'black')
                        $('.page5_income').closest('.uw_flex_income_weight').siblings('.list-unstyled').find('small').remove();
                } else {
                        $('.page5_income').css('border-color', 'red')
                        if (!$('.page5_income').closest('.uw_flex_income_weight').siblings('.list-unstyled').find('small').is(":visible")) {
                                $('.page5_income').closest('.uw_flex_income_weight').siblings('.list-unstyled').append('<small style="color:red">' + ErrorMsg.uw_questions.answer + '</small>')
                        }
                        validation_flag = false;
                }

                if ($('.page5_weight').val() != null && $('.page5_weight').val() != "") {
                        $('.page5_weight').css('border-color', 'black')
                        $('.page5_weight').closest('.uw_flex_income_weight').siblings('ul').find('small').remove();
                } else {
                        $('.page5_weight').css('border-color', 'red')
                        if (!$('.page5_weight').closest('.uw_flex_income_weight').siblings('ul').find('small').is(":visible")) {
                                $('.page5_weight').closest('.uw_flex_income_weight').siblings('ul').append('<small style="color:red">' + ErrorMsg.uw_questions.answer + '</small>')
                        }
                        validation_flag = false;
                }
                // validation_flag = true;
                //SAVE API CALL


                if (validation_flag) {
                        $.ajax({
                                url: ApiList.current.base_api_url + ApiList.save_app_health,
                                type: 'POST',
                                data: JSON.stringify(datastring),
                                headers: {
                                        'Authorization': 'Bearer ' + tokenGlobal,
                                        'Content-Type': 'application/json'
                                },
                                success: (data) => {
                                        console.log(JSON.stringify(data))
                                        if (data.statusCode == 200) {
                                                var screen_id = PageMapper.getNextDesignId(parseInt(this.state.current_page_index) + 1);
                                                sessionStorage.setItem('current_index', (parseInt(this.state.current_page_index) + 1));
                                                window.location.href = PageMapper.getPageURL(screen_id);

                                                // var screen_id = PageMapper.getNextPageId(parseInt(this.state.current_page_index) + 1);
                                                // sessionStorage.setItem('current_index', (parseInt(this.state.current_page_index) + 1));
                                                // window.location.href = PageMapper.getPageURL(screen_id);

                                        }
                                }, error: (err) => {
                                        console.log("ERROR in page 5 question " + JSON.stringify(err));
                                }
                        });
                } else {
                        $('#validation_msg').css('display', 'block')

                        setTimeout(function () {
                                $("#validation_msg").css("display", 'none');
                        }, 4000);
                }
        }

        render() {
                return (
                        <div>

                                <div className="col-md-12 mt3 mb3">
                                        <div className="container">
                                                <div className="col-md-12 mt3" style={{ backgroundColor: '#F3F2F2' }}>
                                                        <div className="col-md-8 round col-md-offset-4" style={{ padding: 0 }}>
                                                                <div className="pd0"><input type="checkbox" id="checkbox" style={{ width: 35 }} />
                                                                        <label for="checkbox" style={{ top: '10px', }}></label></div>
                                                                <div className="col-md-12 fgsd16" id="" style={{ padding: '17px 0px 15px 0px' }}>I promise to honestly and accurately answer these questions.</div>
                                                        </div>
                                                        <div id='chkbox_div_wrap' className="col-md-8 round col-md-offset-4" style={{ padding: 0, display: 'none' }}>
                                                                <small style={{ color: 'red' }}>{ErrorMsg.uw_questions['check_box']}</small>
                                                        </div>

                                                </div>

                                                <div className="col-md-11 col-md-offset-1 mt2 page5_question_div">

                                                </div>
                                                {/* href="/six" */}
                                                <div className="col-md-12">
                                                        <div className="col-md-4 col-md-offset-4 text-center mt3"> <Link to="#" onClick={this.submit_app_health_answer} className="btn btnh cbtn_color tt page_five_question_continue_button" id="5065">continue</Link> </div>
                                                        {/* <div className="col-md-4 text-right mt3" id="validation_msg" style={{ display: "none", color: "red" }}>Please answer all question to continue.</div> */}
                                                </div>
                                                <div className="col-md-12 text-center mt3" id="validation_msg" style={{ display: "none", color: "red", fontSize: "105%", fontWeight: "bold" }}>Please answer all questions to continue.</div>


                                        </div>
                                </div>
                                <div className="col-md-12 fgsd16 text-right tt display_afficiency_id"></div>
                        </div>

                )
        }

}
