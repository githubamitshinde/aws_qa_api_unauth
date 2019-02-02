import React, { Component } from 'react';
import $ from 'jquery';
import '../../css/income_shield/income_shield_one.css';

import journey_08 from '../../images/Icons/TIAA_IncomeShield-journey_styleguide-dev-08.png';

export default class IncomeShieldTwo extends Component {
    constructor() {
        super();
        this.state = {
        }
    }

    componentDidMount() {
        $(document).on('click','.scroll_up',function(){
            $("html, body").animate({ scrollTop: 0 }, 1200);
            return false;
        });

    }


    // function=()=>{
        
    // }

    render() {
        return (
            <div>
                
            <div id="income_s" className="col-md-12 text-center section" style={{backgroundColor: "#F9E038",color: "black"}}>
                <div className="container">
                <div className="col-md-12 mtp2">
                    <span className="fgsd14" id="2065">GET THE BASICS </span>
                </div>
                <div className="col-md-12">
                    <h1 className="agendabold42" id="2066">Income Shield</h1>
                </div>
                <div className="col-md-12">
                    <h4 className="ltr20" style={{fontSize:"24px"}} id="2067">Life insurance designed to provide your family with monthly income to help <br/> replace your paycheck. Coverage lasts for 20 years.</h4>
                </div>
                <div className="col-md-12 mt3">
                    <div className="col-md-4 col-md-offset-0 col-xs-6 col-xs-offset-3 text_pos_in_sh text-right">
                    
                    <p style={{marginTop: "9%"}} className="fgsd14">PAY OFF CREDIT CARD AND OTHER DEBTS</p>
                    <p style={{marginTop: "21%"}} className="fgsd14">PAY FOR BILL AND DAILY EXPENSES</p>
                    </div>
                    <div className="col-md-4 ">
                        <img src={journey_08} className="is_shield_icon" alt=""/>
                    </div>
                    <div className="col-md-4 text_pos_in_sh text-left">
                        <p style={{marginTop: "9%"}} className="fgsd14">KEEP YOUR FAMILY IN THE HOME THEY LOVE</p>
                        <p style={{marginTop: "21%"}} className="fgsd14">PAY OFF EDUCTAIONAL LOANS</p>
                    </div>

                </div>
                <div className="col-md-12 col-md-offset-0 col-xs-5 col-xs-offset-3 mt3 mbp2">
                     <div href="" className="btn cbtn_color_black mb3 income_shield_2_applynow_button scroll_up">APPLY NOW</div> 
                </div>
                </div>
            </div>
            </div>

        )
    }

}