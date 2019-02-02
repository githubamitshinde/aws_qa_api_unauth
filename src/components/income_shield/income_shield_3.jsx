import React, { Component } from 'react';
import $ from 'jquery';
import '../../css/income_shield/income_shield_one.css';


export default class IncomeShieldThree extends Component {
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
                    <h4 className="ltr20 col-md-8 col-md-offset-2">Life insurance designed to provide your family with monthly income to help replace your paycheck. </h4>
                </div>
                <div className="col-md-12 mt3">
                    <div className="col-md-3 is1_col_vl">
                        <h5 className="fgsd14 tt">SIMPLE</h5>
                        <p className="ltr18"> You choose the amount of monthly income you want your family to receive.
                                You can add an optional one-time payment amount to cover bigger expenses.</p>
                    </div>
                    <div className="col-md-3 is1_col_vl">
                            <h5 className="fgsd14 tt">QUICK</h5>
                            <p className="ltr18"> In less than ten minutes apply and be approved for affordable coverage. No medical exam is required... just answer a few health questions.</p>
                    </div>
                    <div className="col-md-3 is1_col_vl">
                            <h5 className="fgsd14 tt">LIFE CHANGING</h5>
                            <p className="ltr18"> Guaranteed monthly income helps provide for your loved ones if you die. Payments to your family continue until you would have turned
                                    age 65.</p>
                    </div>
                    <div className="col-md-3">
                            <h5 className="fgsd14 tt">4TH BLOCK</h5>
                            <p className="ltr18">Guaranteed monthly income helps provide for your loved ones if you die. Payments to your family continue until you would have turned age.</p>
                    </div>
            
                </div>
                <div className="col-md-12 mt3 mbp2">
                    {/* <a href="page2d" className="btn cbtn_color_black mb3">APPLY NOW</a> */}
            
                </div>
                </div>
            </div>
            </div>

        )
    }

}