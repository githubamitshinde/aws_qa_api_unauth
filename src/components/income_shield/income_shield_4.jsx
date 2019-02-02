import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import ApiList from "../../config/base.json"
import $ from 'jquery';
import '../../css/income_shield/income_shield_one.css';

const journey_09 = ApiList.base_cdn_src+"/images/Icons/TIAA_IncomeShield-journey_styleguide-dev-09.png";
const journey_19 = ApiList.base_cdn_src+"/images/Icons/TIAA_IncomeShield-journey_styleguide-dev-19.png";
const journey_11 = ApiList.base_cdn_src+"/images/Icons/TIAA_IncomeShield-journey_styleguide-dev-11.png";
const close_model = ApiList.base_cdn_src+"/images/SVG/Close_icon.svg"

export default class IncomeShieldFour extends Component {
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
                <div id="income_s" className="col-md-12 text-center section" style={{ backgroundColor: "#F9E038" }}>
                    <div className="container">
                        <div className="col-md-12 mtp2">
                            <span className="fgsd14" id="312">GET THE BASICS </span>
                        </div>
                        <div className="col-md-12">
                            <h1 className="agendabold42" id="313">Salary Shield</h1>
                        </div>  
                        <div className="col-md-12">
                            <h4 className="ltr20 col-md-8 col-md-offset-2" id="314">Life insurance designed to provide your family loved ones with monthly income to help replace your paycheck. </h4>
                        </div>
                        <div className="col-md-12 mt3">
                            <div className="col-md-4 bd_right" style={{ padding: "0 6%", }} >
                            <div class="vl"></div>
                                <img src={journey_09} alt="" height="100px" id="315" />
                                <h5 className="fgsd14" id="318">SIMPLE</h5>

                                <p className="ltr18" id="321"> Apply online and get an instant decision.</p>
                            </div>
                            <div className="col-md-4 bd_right" style={{ padding: "0 6%",  }}>
                            <div class="vl"></div>
                                <img src={journey_19} alt="" height="100px" id="316" />
                                <h5 className="fgsd14 " id="319">CONVENIENT</h5>
                                <p className="ltr18" id="322"> Budget-friendly coverage that starts immediately. </p>
                            </div>
                            <div className="col-md-4" style={{ padding: "0 6%" }}>
                                <img src={journey_11} alt=""height="100px" id="317" />
                                <h5 className="fgsd14" id="320">GUARANTEED</h5>
                                <p className="ltr18" id="323">Your family will receive steady income every month.</p>
                            </div>

                        </div>
                        <div className="col-md-8 mt4 col-md-offset-2 ltr18" id="325">
                            Salary Shield continues TIAA Life’s commitment to helping families find new and innovative ways to protect their income and provide for their loved ones. Learn more about <span style={{ textDecoration: "underline" }} type="button" class="" data-toggle="modal" data-target="#more_about_tiaa"> TIAA Life</span>, one of the most highly rated life insurers in the country.
                        </div>
                         {/* model box */}
                         <div id="more_about_tiaa" class="modal fade" role="dialog">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-body text-left">
                                        <span className="fgsb20" style={{ color: "rgba(226, 22, 42, 1)" }}></span><button type="button" className="close" style={{ position: "absolute", right: "20px", opacity: 1 }} data-dismiss="modal"><img src={close_model} alt="" style={{ width: "30px", height: "31px" }} /></button>
                                        <div className="mt6 ltr18">
                                            <p>We're one of the world's most admired companies in the life and health insurance category for over five years.1
                                         </p>
                                            <p className="mt4">TIAA is a member of one of only three insurance groups in the United States to hold the highest possible rating from three of the four leading independent insurance company rating agencies.2 </p>
                                            <ul style={{ paddingLeft: "20px" }}>
                                                <li className="mt3">A++ Superior by A.M. Best Company</li>
                                                <li className="mt3">AAA Exceptionally Strong by Fitch Ratings </li>
                                                <li className="mt3">Aa1 (Second highest) Very Strong by Moody's Investors Services</li>
                                                <li className="mt3">AA+ (Second highest) Very Strong - Standard & Poors </li>
                                            </ul>
                                            <p className="mt4">1TIAA Life is part of the TIAA family of companies. TIAA was rated in the top 10 in FORTUNE® magazine's World's Most Admired Companies ranking in the Insurance: Life and Health category for the years 2011, 2012, 2013, 2014, 2015, 2016 and 2017.</p>
                                            <p className="mt4">2 For its stability, claims-paying ability and overall financial strength, Teachers Insurance and Annuity Association of America (TIAA) is a member of one of only three insurance groups in the United States to currently hold the highest rating available to U.S. insurers from three of the four leading insurance company rating agencies: <span style={{ textShadow: "1px 0px 0px black" }}>
                                                A.M. Best (A++ as of 6/18), Fitch (AAA as of 6/18) and Standard & Poor's (AA+ as of 8/17),</span> and the second highest possible rating from
                                            <span style={{ textShadow: "1px 0px 0px black" }}>Moody's Investors Service (Aa1 as of 2/18).</span> There is no guarantee that current ratings will be maintained. The financial strength ratings represent a company's ability to meet policyholders' obligations and do not apply to variable annuities or any other product or service not fully backed by TIAA's claims-paying ability. The ratings also do not apply to the safety or the performance of the variable accounts, which will fluctuate in value. </p>
                                            <p className="mt3">
                                                Each of TIAA Life and TIAA are solely responsible for their financial conditions and contractual obligations.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* model box closed     */}
                        <div className="col-md-12 mt3 mbp2">
                            <div className="btn cbtn_color_black mb3 tt income_shield_four_continue scroll_up" id="324">continue</div>

                        </div>
                        <div className="col-md-12 mt2 mb3 text-center">
                            *For a defined period; see personalized quote for details.
                        </div>
                    </div>
                </div>

            </div>

        )
    }

}