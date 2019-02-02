import React, { Component } from 'react';
import $ from 'jquery';
import '../../css/income_shield/income_shield_one.css';

import journey_23 from '../../images/Icons/TIAA_IncomeShield-journey_styleguide-dev-23.png';
import journey_22 from '../../images/Icons/TIAA_IncomeShield-journey_styleguide-dev-22.png';
import journey_10_2 from '../../images/Icons/TIAA_IncomeShield-journey_styleguide-dev-10 2.png';




export default class IncomeShieldSix extends Component {
    constructor() {
        super();
        this.state = {
        }
    }

    componentDidMount() {
        $(document).on('click','.scroll_up',function(){
            $("html, body").animate({ scrollTop: 0 }, 600);
            return false;
        });

    }


    // function=()=>{
        
    // }

    render() {
        return (
            <div>
                <div id="income_s" className="col-md-12 text-center section" style={{backgroundColor: "#F9E038"}}>
                <div className="container">
                <div className="col-md-12 mtp2">
                    <span className="fgsd14">GET THE BASICS </span>
                </div>
                <div className="col-md-12">
                    <h1 className="agendabold42">Income Shield</h1>
                </div>
                <div className="col-md-12">
                    <h4 className="ltr20">Life insurance designed to provide your family with <br/> monthly income to help replace your paycheck. </h4>
                </div>
                <div className="col-md-12 mt3">
                    <div className="col-md-4 bd_right" style={{padding:"0 6%",height: "270px"}}>
                            <img src={journey_23} alt="" width="150px"/>
                        <h5 className="fgsd14">SIMPLE</h5>
                        
                        <p className="ltr18">You choose the amount of monthly income you want your family to receive. You can add an optional one-time payment amount to cover bigger expenses.</p>
                    </div>
                    <div className="col-md-4 bd_right" style={{padding:"0 6%",height: "270px"}}>
                            <img src={journey_22} alt="" width="150px"/>
                            <h5 className="fgsd14">CONVENIENT</h5>
                            <p className="ltr18">In less than ten minutes you can apply and be approved for affordable coverage. No medical exam is required... just answer a few health questions.</p>
                    </div>
                    <div className="col-md-4" style={{padding:"0 6%"}}>
                            <img src={journey_10_2} alt="" width="150px"/>
                            <h5 className="fgsd14">GUARANTEED</h5>
                            <p className="ltr18">Guaranteed monthly income helps provide for your loved ones if you die while covered.. Payments to your family continue until year XXXX.</p>
                    </div>
            
                </div>
                <div className="col-md-12 mt3 mbp2">
                    <div className="btn cbtn_color_black mb3 tt income_shield_6_apply_button scroll_up">apply now</div>
            
                </div>
                </div>
            </div>
            </div>

        )
    }

}