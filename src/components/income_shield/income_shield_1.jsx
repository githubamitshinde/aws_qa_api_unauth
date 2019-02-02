import React, { Component } from 'react';
import $ from 'jquery';
import '../../css/income_shield/income_shield_one.css';

import journey_09 from '../../images/Icons/TIAA_IncomeShield-journey_styleguide-dev-09.png';
import journey_19 from '../../images/Icons/TIAA_IncomeShield-journey_styleguide-dev-20.png';
import journey_11 from '../../images/Icons/doller_sign_without.png';


export default class IncomeShieldOne extends Component {
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
                <div id="income_s" classNameName="col-md-12 text-center section" style={{ backgroundColor: "#FDFDFD" }}>
                    <div className="container">
                        {/* <div className="col-md-12 mtp2 text-center">
                    <span className="fgsd14">GET THE BASICS </span>
                </div> */}
                        <div className="col-md-12 mt3 text-center">
                            <h1 className="agendabold42" id="1315">Salary Shield</h1>
                        </div>
                        <div className="col-md-8 col-md-offset-2 pd0" style={{ textAlign: 'center' }}>
                            <h4 className="ltr20" id="1316">Life insurance designed to provide your loved ones with monthly income to help replace your paycheck. Your policy lasts for 20 years or to age 65, whichever comes first. </h4>
                        </div>



                        {/* <div className="col-md-12 mt3 text-center">
                            <div className="col-md-4 " style={{height:150}}>
                               
                            </div>
                            <div className="col-md-4 " style={{height:150}}>
                               
                            </div>
                            <div className="col-md-4">
                             
                            </div>
                        </div> */}

                        <div className="col-md-12 mt3 text-center">
                            <div className="col-md-4 is1_col_vl" style={{height:150}}>
                            <img src={journey_09} alt="" width="125px" id="1317" />
                                <h5 className="fgsd14 text-center" id="1320">SIMPLE</h5>
                                <p className="ltr20 col-md-10 col-md-offset-1" id="1323"> You choose the amount of monthly income you want your family to receive. You can add an optional one-time benefit amount to cover larger expenses. </p>
                            </div>
                            <div className="col-md-4 is1_col_vl" style={{height:150}}>
                            <img src={journey_19} alt="" width="160px" id="1318" />
                                <h5 className="fgsd14 text-center" id="1321">CONVENIENT</h5>
                                <p className="ltr20 col-md-10 col-md-offset-1" id="1324"> In less than ten minutes apply and be approved for affordable coverage. No medical exam is required... just answer a few health questions. </p>
                            </div>
                            <div className="col-md-4">
                            <img src={journey_11} alt="" width="75px" id="1319" />
                                <h5 className="fgsd14 text-center" id="1322">GUARANTEED</h5>
                                <p className="ltr20 col-md-10 col-md-offset-1" id="1325">Guaranteed monthly income helps provide for your loved ones if you die. Payments to your family continue until you would have turned 65*.</p>
                            </div>
                        </div>




                        <div className="col-md-12 mt3  text-center">
                            <div className="btn cbtn_color mb3 tt scroll_up" id="1326">continue</div>

                        </div>
                        <div className="col-md-12 mbp2 mt3 text-center">
                            <div className="ltr14">*For most people. However, for issue ages 20 - 34 benefits last until you would have been your issue age plus 30 years.</div>
                        </div>
                    </div>
                </div>

            </div>

        )
    }

}