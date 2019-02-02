import React, { Component } from 'react';


import {filter,sortBy} from 'lodash';
import $ from 'jquery';
import AppStage from "../../config/app_stage.js"
import drop_icon from "../../images/SVG/down_arrow.svg";
import ApiList from "../../config/base.json"
import dropdown from "../../config/dropdown.json"
import DropdownCall from "../../config/dropdown_api_request.js"
import PageMapper from "../../config/page_mapper";
import cookie from 'react-cookies'
import moment from 'moment';
import img_one from "../../images/SVG/down_arrow.svg";
import io from 'socket.io-client';

import '../../css/income_shield/income_shield_one.css';
import '../../css/other/loader.css'
import '../../css/other/custom_radio.css'

var Timer_value;
let user_data = JSON.parse(sessionStorage.getItem('user_data'));
var parent_questions, sub_questions;
var dependency_condition;

var firstPassword;
var secondUserName;
var tokenGlobal;
var tokenGlobalAfficient;

export default class PageName extends Component {
    constructor() {
        super();
        this.state = {
            current_page_index: sessionStorage.getItem('current_index')
        }
    }

    componentDidMount() {
        user_data = sessionStorage.getItem('user_data') ? JSON.parse(sessionStorage.getItem('user_data')) : {};

        var self = this;
        // if(user_data.issued_license_flg==1){
        //     dependency_condition = 'parent_questions[i].dependency == 5 || parent_questions[i].dependency == 6'
        // }else{
        //     dependency_condition = 'parent_questions[i].dependency == 6'
        // }
        if (user_data.aff2) {
            $('.display_afficiency_id').append('Afficiency Id : ' + user_data.aff2)
    }
        console.log('FIVE HOST URL :: ' + ApiList.current.base_afficient_api_url + '/' + 'uwquestionAnswer/getQuestionsAnswers');
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
                            
                            'Content-Type': 'application/json'
                },
            success: (data) => {
                console.log(JSON.stringify(data))
                console.log(data.length)
                if (data.length == 1) {
                    parent_questions = sortBy(data[0].parent_questions, [function (o) { return o.question_sequence_number; }]);
                    sub_questions = sortBy(data[0].sub_questions, [function (o) { return o.question_sequence_number; }]);

                    var options = '';
                    for (var i = 0; i < parent_questions.length; i++) {
                        // console.log("condition of page 8  " + user_data.drivers_license_flg == 1 ? (parent_questions[i].dependency == 6) : (user_data.issued_license_flg == 1 ? (parent_questions[i].dependency == 5) : null))
                        if (user_data.drivers_license_flg == 1 ? (parent_questions[i].dependency == 6) : (user_data.issued_license_flg == 1 ? (parent_questions[i].dependency == 5) : null)) {
                            console.log(">>>>>>" + parent_questions[i].dependency)
                            // console.log(parent_questions[i].dependency + "**&&**" + typeof parent_questions[i].dependency)
                            options += '<div class="col-md-12 pd0 mt4 parent-wrapper"><ul class="list-unstyled col-md-8"><li class="fgsd18 mt2 li-questions" data-question_id="' + parent_questions[i].question_id + '"  data-answer_category="' + parent_questions[i].answer_category + '">' + parent_questions[i].question_text + '</li></ul>';


                            if (parent_questions[i].answer) {
                                var q_answers = sortBy(parent_questions[i].answer, [function (o) { return o.answer_option_seq; }]);

                                // ************** for yes no option ****************
                                if (parent_questions[i].answer_category == 1) {
                                    options += '<div class="col-md-3 col-md-offset-1 parent_div_subanswer"><div class="radio__container">'

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
                                        options += '<div class="col-md-12 pd0"> <ul class="list-unstyled"> <li class="round"><input type="checkbox" id="' + q_answers[j].question_id + '' + j + '" name="' + q_answers[j].question_id + '" style="width: 20px"  data-answer_option_id="' + q_answers[j].answer_option_id + '" data-parent_id="' + parent_questions[i].question_id + '"   class="p_check__button" value="' + q_answers[j].answer_option_text + '"/><label class="" for="' + q_answers[j].question_id + '' + j + '" ></label> <div class="fgsb18" style="margin-left:30px;margin-top:3px">' + q_answers[j].answer_option_text + '</div></li></ul></div>';

                                        if (j == q_answers.length - 1) {
                                            options += "</div></div>"
                                        }
                                    }
                                }
                                // *************** for checkbox option ************** ends
                                // *************** for text option **************
                                if (parent_questions[i].answer_category == 4) {
                                    // ' + q_answers[j].answer_option_id + '
                                    options += '<div class="col-md-8 col-md-offset-0 parent_div_subanswer"><input type="text" style="width:100%;border-color: grey;border-top: 0px;border-left: 0px;border-right: 0px"  class="txt-answers" name="' + parent_questions[i].question_id + '"  data-answer_option_id="1" /></div></div>';
                                }
                                // *************** for text option ************** ends

                            }


                        }
                        if (i == parent_questions.length - 1) {
                            options += '</div>'
                            $('.page8_question_div').append(options)

                        }
                    }
                } else {

                }
            },
            error: (err) => {
                console.log("ERROR in page 8 question " + JSON.stringify(err));
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

        //UNCHANGE COLOR ON SELECTION
        $(document).on('change', '.p_radio_button, .radio_button, .p_multi_button, .multi_button', function () {
            $(this).closest('.parent_div_subanswer').find('label').removeClass('radio_incomplete')
        });

        //UNCHANGE COLOR ON SELECTION FOR CHECKBOX
        $(document).on('change', '.p_check__button, .check__button', function () {
            $(this).closest('.parent_div_subanswer').find('label').css('border', '2px solid #ccc');
        });
    }

    fetch_sub_question = (sub_question_id, answer_txt, parent_ans_type, answer_option_id) => {
        // var sub_question_array = filter(sub_questions, { 'parent_question_id': sub_question_id, 'applicable_parent_answer': answer_txt })
        var sub_question_array = filter(sub_questions, function (question) {
            return question.parent_question_id == sub_question_id && (question.applicable_parent_answer == answer_txt || question.applicable_parent_answer_2 == answer_txt || question.applicable_parent_answer_3 == answer_txt || question.applicable_parent_answer_4 == answer_txt)
        });

        console.log("FILTERED JSON::" + JSON.stringify(sub_question_array))
        var options = '';

        if (sub_question_array.length > 0) {


            for (var i = 0; i < sub_question_array.length; i++) {
                if (sub_questions[i].dependency != 6 || sub_questions[i].dependency != 5) {
                    options += '<div class="col-md-12 pd0 mt4 child-question-wrapper ' + sub_question_id + '' + (parent_ans_type == 3 ? answer_option_id : '') + '"><ul class="list-unstyled col-md-8"><li class="fgsd18 mt2 li-questions" data-question_id="' + sub_question_array[i].question_id + '" data-answer_category="' + sub_question_array[i].answer_category + '">' + sub_question_array[i].question_text + '</li></ul>';

                    var sub_q_answer = sortBy(sub_question_array[i].answer, [function (o) { return o.answer_option_seq; }]);
                    if (sub_question_array[i].answer) {

                        // ************** for yes no option ****************
                        if (sub_question_array[i].answer_category == 1) {
                            options += '<div class="col-md-3 col-md-offset-1 parent_div_subanswer"><div class="radio__container">'
                            for (var j = 0; j < sub_q_answer.length; j++) {
                                options += '<div class="radio-inline fgsd18"><input class="radio radio_button" id="' + sub_q_answer[j].question_id + '' + j + '" name="' + sub_q_answer[j].question_id + '" type="radio" value="' + sub_q_answer[j].answer_option_text + '" data-answer_option_id="' + sub_q_answer[j].answer_option_id + '" data-parent_id="' + sub_q_answer[j].question_id + '"><label style="font-weight:unset" class="radio__label " for="' + sub_q_answer[j].question_id + '' + j + '" id="">' + sub_q_answer[j].answer_option_text + '</label></div>';
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
        var self = this;


        var question_json;

        var datastring = {
            "app_health_answers": [],
            "application_information": {
                "height": user_data.height,
                "weight": user_data.weight,
                "visit_id": cookie.load('visit_id'),
                "app_stage_completed":8
            },
            "navigation_log": {
                "visit_id": cookie.load('visit_id'),
                "page_url":window.location.hostname,
                "entry_timestamp": moment().format("MM/DD/YYYY"),
                "exit_timestamp": moment().format("MM/DD/YYYY"),
                "interactive_indicator": 1
            }
        }


        $('.page8_question_div .parent-wrapper').map(function () {
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
                    question_json.answer_value = "50";
                    question_json.answer_option_id = '1';

                    $(this).find('.parent_div_subanswer').find('input[name="' + curr_question_id + '"]').siblings('label').css('border', '2px solid #ccc');
                } else {
                    $(this).find('.parent_div_subanswer').find('input[name="' + curr_question_id + '"]').siblings('label').css('border', '2px solid red');
                    validation_flag = false;
                }
            } else if ($(this).find('.li-questions').data('answer_category') == 4) {
                if ($(this).find('.parent_div_subanswer').find('input[name="' + curr_question_id + '"]').val() != "") {
                    question_json.answer_value = "40";
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

            question_json.afficiency_id = cookie.load('aff2') ? cookie.load('aff2') : user_data.aff2;
            // question_json.app_attempt_no = 1;
            // question_json.attempt_no = 2;

            // REQUIRED KEYS STARTS HERE

            datastring.app_health_answers.push(question_json);
            user_data.uwanswers.push(question_json);
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
                        question_json.answer_value = "50";
                        question_json.answer_option_id = '1';

                        $(this).find('.parent_div_subanswer').find('input[name="' + curr_question_id + '"]').siblings('label').css('border', '2px solid #ccc');
                    } else {
                        $(this).find('.parent_div_subanswer').find('input[name="' + curr_question_id + '"]').siblings('label').css('border', '2px solid red');
                        validation_flag = false;
                    }
                } else if ($(this).find('.li-questions').data('answer_category') == 4) {
                    if ($(this).find('.parent_div_subanswer').find('input[name="' + curr_question_id + '"]').val() != "") {
                        question_json.answer_value = "40";
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

                question_json.afficiency_id = cookie.load('aff2') ? cookie.load('aff2') : user_data.aff2;
                // question_json.app_attempt_no = 1;
                // question_json.attempt_no = 1000;
                // REQUIRED KEYS STARTS HERE

                datastring.app_health_answers.push(question_json);


                user_data.uwanswers.push(question_json);

            });

        })
        sessionStorage.setItem('user_data', JSON.stringify(user_data))
        console.log("data string of question passed :" + JSON.stringify(datastring))
        // if ($('#checkbox').is(":checked")) {
        //     $('#checkbox').siblings('label').css('border', '2px solid #ccc')
        //     $('#validation_msg').css('display', 'none');
        // } else {
        //     $('#checkbox').siblings('label').css('border', '2px solid red')
        //     $('#validation_msg').css('display', 'block')
        //     validation_flag = false;
        // }

        // validation_flag = true;
        //SAVE API CALL
        if (validation_flag) {
            $.ajax({
                url: ApiList.current.base_api_url + ApiList.save_app_health,
                type: 'POST',
                data: JSON.stringify(datastring),
                headers: {
                            
                            'Content-Type': 'application/json'
                },
                success: (data) => {
                    console.log(JSON.stringify(data))
                    if (data.statusCode == 200) {
                        self.rule_engine_call();

                    }
                }, error: (err) => {
                    console.log("ERROR in page 5 question " + JSON.stringify(err));
                }
            });
        } else {
            console.log("fill all values")
        }
    }


    rule_engine_call = () => {
        var self = this;
        let user_data = JSON.parse(sessionStorage.getItem('user_data'))
        // var param = "" + user_data.aff2 + "#" + cookie.load('visit_id') + "#2#{FirstName:\'" + user_data.first_name + "\',LastName:\'" + user_data.last_name + "\',MiddleName:\'\',SSN:\'" + user_data.ssn + "\',Gender:\'" + user_data.gender + "\',DOB:\'" + user_data.dob + "\',State:\'" + user_data.state + "\',ZipCode:\'" + user_data.zipcode + "\',DriverslicenseState:\'" + user_data.drivers_license_state + "\', DriverslicenseNumber:\'" + user_data.drivers_license_no + "\',Address_id:\'\',House:\'" + user_data.home_address + "\',Street:\'" + user_data.apt_no + "\',Apartment:\'\',City:\'" + user_data.city + "\'}";
        var nicotine = user_data.tobbacouse == 0 ? "No" : "Yes"
        var param = "" + user_data.aff2 + "#" + cookie.load('visit_id') + "#2#{FirstName:\'" + user_data.first_name + "\',LastName:\'" + user_data.last_name + "\',MiddleName:\'\',SSN:\'" + user_data.ssn + "\',Gender:\'" + user_data.gender + "\',DOB:\'" + user_data.dob + "\',State:\'" + user_data.state + "\',ZipCode:\'" + user_data.zipcode + "\',DriverslicenseState:\'" + user_data.drivers_license_state + "\',Height:\'" + user_data.height + "\', Weight:\'" + user_data.weight + "\',NicotineUse:\'" + nicotine + "\', DriverslicenseNumber:\'" + user_data.drivers_license_no + "\',Address_id:\'\',House:\'" + user_data.home_address + "\',Street:\'" + user_data.apt_no + "\',Apartment:\'\',City:\'" + user_data.city + "\',email:\'" + user_data.email + "\',phno:\'" + user_data.phone_number + "\'}";
        console.log(" params for web socket " + param)
        console.log("IP for web socket " + ApiList.current.decision_api_ws)
        var socket = io.connect(ApiList.current.decision_api_ws, { secure: true });
        socket.emit('msg', param)
        socket.on("msg2", function (msg) {
            console.log("Request Submitted ", msg);
            if (msg == "Welcome") {
                self.check_rule_engine_res()
            }
        })
    }



    check_rule_engine_res = () => {
        var self = this;
        let datastring = {
            "application": {
                "visit_id":cookie.load('visit_id'),
                "afficiency_id": user_data.aff2
            }
        }
        console.log("check rule engine" + JSON.stringify(datastring))
        $(".spinner").css('display', 'block')
        var timeleft = 300;
        var downloadTimer = setInterval(function () {
            timeleft--;
            Timer_value = timeleft;
            $('.loader_value').text(Timer_value)
            // console.log(Timer_value)
            if (timeleft % 10 == 0) {
                $.ajax({
                    url: ApiList.current.base_api_url + ApiList.get_rule_engine_res,
                    type: 'POST',
                    data: JSON.stringify(datastring),
                    headers: {
                                
                                'Content-Type': 'application/json'
                    },
                    success: (data) => {
                        console.log(JSON.stringify(data))
                        var res = data.split('#');
                        res.shift()
                        console.log("rule engine final res "+JSON.stringify(res))
                        user_data.rule_engine_2 = res;
                        sessionStorage.setItem('user_data', JSON.stringify(user_data))
                        if (res != null) {

                            if (res[0] == 1) {
                                var screen_id = PageMapper.getNextPageId(parseInt(self.state.current_page_index) + 1);
                                sessionStorage.setItem('current_index', (parseInt(self.state.current_page_index) + 1));
                                window.location.href = PageMapper.getPageURL(screen_id);
                            } else if (res[0] == 2) {
                                AppStage.save_app_stage(cookie.load('visit_id'), 8)
                                user_data.failure_code = 6
                                sessionStorage.setItem('user_data', JSON.stringify(user_data))
                                window.location.href = "/life-insurance-application-call-now"
                            } else if (res[0] == 3) {
                                AppStage.save_app_stage(cookie.load('visit_id'), 8)
                                user_data.failure_code = 4
                                sessionStorage.setItem('user_data', JSON.stringify(user_data))
                                window.location.href = "/life-insurance-application-call-now"
                            } else if (res[0] == 4) {
                                AppStage.save_app_stage(cookie.load('visit_id'), 8)
                                user_data.failure_code = 6
                                sessionStorage.setItem('user_data', JSON.stringify(user_data))
                                window.location.href = "/life-insurance-application-call-now"
                            } else if (res[0] == 6) {
                                AppStage.save_app_stage(cookie.load('visit_id'), 8)
                                user_data.failure_code = 3
                                sessionStorage.setItem('user_data', JSON.stringify(user_data))
                                window.location.href = "/life-insurance-application-call-now"
                            }
                            // else{
                            //     AppStage.save_app_stage(cookie.load('visit_id'), 7)
                            //     user_data.failure_code = 3
                            //     sessionStorage.setItem('user_data', JSON.stringify(user_data))
                            //     window.location.href = "/life-insurance-application-call-now"
                            // }
                        }
                    },
                    error: (err) => {
                        console.log("ERROR in identityBeneficiaryAP page  " + JSON.stringify(err));
                    }
                })
            }
            if (timeleft <= 0) {
                user_data.failure_code = 3
                sessionStorage.setItem('user_data', JSON.stringify(user_data))
                window.location.href = "/life-insurance-application-call-now"
                clearInterval(downloadTimer);
            }
        }, 1000);




    }

    // function=()=>{

    // }

    render() {
        return (
            <div>
                <div className="col-md-12">
                    <div className="container">
                        <div className="col-md-12 tt text-center fgsd14 mt4" id="802">apply now in a few easy steps</div>
                        <div className="col-md-12 tt text-center agendabold42 mt2" id="803">just a few more questions</div>
                        <div className="col-md-10 col-md-offset-1 page8_question_div">

                        </div>

                        <div className="col-md-12 text-center mt3 mb3">
                            <a href="page7" className="btn cbtn tt mobile_width page_8_prev_button" id="817">previous</a>&nbsp;&nbsp; <a onClick={this.submit_app_health_answer} className="btn cbtn_color mobile_width tt page_8_next_button" id="818">next</a>
                        </div>

                    </div>

                </div>
                <div className="col-md-12 fgsd16 text-right tt display_afficiency_id"></div>
            </div>
        )
    }

}
