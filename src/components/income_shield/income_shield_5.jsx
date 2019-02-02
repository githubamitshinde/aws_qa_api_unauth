import React, { Component } from 'react';
import $ from 'jquery';
import '../../css/income_shield/income_shield_one.css';

import journey_09 from '../../images/Icons/TIAA_IncomeShield-journey_styleguide-dev-09.png';
import journey_10 from '../../images/Icons/TIAA_IncomeShield-journey_styleguide-dev-10.png';
import journey_11 from '../../images/Icons/TIAA_IncomeShield-journey_styleguide-dev-11.png';



export default class IncomeShieldFive extends Component {
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
                    <div className="col-md-4" style={{padding:"0 6%",borderRight: "1px solid #c6bd13",height: "30vh"}}>
                            <img src={journey_09} alt="" width="150px"/>
                        <h5 className="fgsd14">SIMPLE</h5>
                        
                        <p className="ltr18">You choose the amount of monthly income you want your family to receive. You can add an optional one-time payment amount to cover bigger expenses.</p>
                    </div>
                    <div className="col-md-4" style={{padding:"0 6%",borderRight: "1px solid #c6bd13",height: "30vh"}}>
                            <img src={journey_10} alt="" width="150px"/>
                            <h5 className="fgsd14">CONVENIENT</h5>
                            <p className="ltr18"> Budget-friendly coverage that starts immediately. </p>
                    </div>
                    <div className="col-md-4" style={{padding:"0 6%"}}>
                            <img src={journey_11} alt="" width="150px"/>
                            <h5 className="fgsd14">GUARANTEED</h5>
                            <p className="ltr18">Your family will receive steady income every month.</p>
                    </div>
            
                </div>
                <div className="col-md-12 mt3 mbp2">
                    {/* <a href="page2c" className="btn cbtn_color_black mb3 tt">continue</a> */}
            
                </div>
                </div>
            </div>
    
            </div>

        )
    }

}