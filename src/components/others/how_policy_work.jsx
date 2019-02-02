import React, { Component } from 'react';

import $ from 'jquery';
import moment from 'moment';

import img_minus from "../../images/SVG/minus.svg";
import img_plus from "../../images/SVG/plus_circle.svg"


export default class how_policy_work extends Component {
    constructor() {
        super();
        this.state = {
        }
    }

    componentDidMount() {
        var self = this;
        $('html, body').animate({
            scrollTop: $(".navigate_on_load").offset().top
        }, 2000);
        $('.age').val(21)
        this.calculation(0)

        $(document).on('keyup', '.age', function () {
            var age = $('.age').val().length > 0 ? parseInt($('.age').val()) : 0;
            if(age.length > 0){
                if(age >= 20 && age<=50){
                    self.set_calculation(age);
                } else {
                    
                }
            }
        })
    }

    calculation = (value) => {
        var txt_age = parseInt($('.age').val());

        if (txt_age >= 20 && txt_age <= 50) {
            if (value == 0 && txt_age > 20) {
                var age = parseInt($('.age').val()) - 1;
                this.set_calculation(age);
            } else if (value == 1 && txt_age < 50) {
                var age = parseInt($('.age').val()) + 1;
                this.set_calculation(age);
            }
        }
    }

    set_calculation = (age) => {
        $('.age').val(age)
        if (age >= 20 && age <= 35) {
            $('.last_until').text("for 20 years")
            var current_year = moment().format('YYYY');
            current_year = parseInt(current_year) + 30;
            // $('.recieve_until').text(current_year)
            $('.recieve_until').text(current_year)
            $('.recieve_until_above_45').css('display', 'none');
        } else if (age >= 36 && age <= 50) {
            $('.last_until').text("until age 65")
            var current_year = moment().format('YYYY')
            current_year = parseInt(current_year) + (30 - (age - 35))
            $('.recieve_until').text(current_year)

            if (age >= 41 && age <= 50) {
                $('.recieve_until_above_45').css('display', 'block');
            } else {
                $('.recieve_until_above_45').css('display', 'none');
            }
        }
    }

    // var txt_age = parseInt($('.age').val());
    //     // alert("AGE"+ txt_age)
    //     // if (txt_age > 20 && txt_age < 50) {
    //         if (value == 0 && txt_age > 20) {
    //             var age = parseInt($('.age').val()) - 1;
    //             $('.age').val(age)
    //             if (age >= 20 && age <= 35) {
    //                 $('.last_until').text("for 30 years")
    //                 // var current_year = moment().format('YYYY')
    //                 // current_year = parseInt(current_year) + 20
    //                 // $('.recieve_until').text(current_year)
    //                 $('.recieve_until').text("2048")
    //             } else if (age >= 36 && age <= 40) {
    //                 $('.last_until').text("until age 65")
    //                 var current_year = moment().format('YYYY')
    //                 current_year = parseInt(current_year) + (30 - (age - 35))
    //                 $('.recieve_until').text(current_year)
    //             } else if (age >= 41 && age <= 50) {
    //                 var plus_for_age = age - 45
    //                 $('.last_until').text("until age 65")
    //                 var current_year = moment().format('YYYY')
    //                 current_year = parseInt(current_year) - (20 - plus_for_age)
    //                 $('.recieve_until').text(current_year)
    //             }
    //         } else if (value == 1 && txt_age < 50) {
    //             var age = parseInt($('.age').val()) + 1;
    //             $('.age').val(age)
    //             if (age >= 20 && age <= 35) {
    //                 $('.last_until').text("for 30 years")
    //                 // var current_year = moment().format('YYYY')
    //                 // current_year = parseInt(current_year) + 20
    //                 // $('.recieve_until').text(current_year)
    //                 $('.recieve_until').text("2048")
    //             } else if (age >= 36 && age <= 40) {
    //                 $('.last_until').text("until age 65")
    //                 var current_year = moment().format('YYYY')
    //                 current_year = parseInt(current_year) + (30 - (age - 35))
    //                 $('.recieve_until').text(current_year)
    //             } else if (age >= 41 && age <= 50) {
    //                 var plus_for_age = age - 45
    //                 $('.last_until').text("until age 65")
    //                 var current_year = moment().format('YYYY')
    //                 current_year = parseInt(current_year) + (20 - plus_for_age)
    //                 $('.recieve_until').text(current_year)
    //             }
    //         // }
    //     }

    render() {
        return (
            <div>
                <div class="col-md-12">
                    <div class="container">
                        <div class="col-md-8 col-md-offset-2 text-center mb3 navigate_on_load">
                            <div class="col-md-12 agendabold42 mt3" id="1340">How your policy works</div>
                            <div class="col-md-12 ltr20 mt2" id="1341">Based on the age selected, see how many years your policy will last and how long your beneficiaries will receive monthly income benefits, if you die while covered.</div>
                            <div class="col-md-12 col-sm-12 pd0 mt1">
                                <div class="col-md-4 col-md-offset-4 col-sm-4 col-sm-offset-4">
                                    <div class="col-md-10 col-md-offset-1 pd0" style={{ borderBottom: '1px solid lightgray' }}><img src={img_minus} onClick={() => this.calculation(0)} width="20px" alt="" /> <input type="text" className="age age_width" placeholder="30" style={{ width: '100px', border: '0px', textAlign: 'center' }} disabled/> <img src={img_plus} onClick={() => this.calculation(1)} width="20px" alt="" /></div>
                                    <div class="col-md-10 col-md-offset-1 pd0 tt fgsd14 mt2" id="1342"> your age</div>
                                </div>
                            </div>
                            {/* <div class="col-md-12 pd0 mt5">
                                <div class="col-md-4 pd0 ltr20" id="1343">Your policy lasts</div>
                                <div class="col-md-5 col-md-offset-3 ltr20 pd0" id="1344">Your beneficiaries will receive monthly benefits until</div>
                            </div> */}
                            <div class="col-md-12 col-sm-12 pd0 mt2 mb3">
                                <div class="col-md-4 col-sm-4 pd0 ltr20"><div className="mt2" style={{height:60}}>Your policy lasts</div> <div class="col-md-8 col-md-offset-2 col-sm-8 col-sm-offset-2 last_until" style={{ borderBottom: '1px solid black', padding: '10px 0px' }}></div> </div>
                                <div class="col-md-5 col-md-offset-3 col-sm-5 col-sm-offset-3 ltr20 pd0"><div className="mt2">Your beneficiaries will receive monthly benefits until</div> <div class="col-md-8 col-md-offset-2 col-sm-8 col-sm-offset-2 recieve_until" style={{ borderBottom: '1px solid black', padding: '10px 0px' }}> 20 years</div> <div class="col-md-10 col-md-offset-1 recieve_until_above_45" style={{ padding: '10px 0px', display: 'none' }}> or for a minimum of 5 years</div> </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }

}