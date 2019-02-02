import React, { Component } from "react";
import { Link } from 'react-router-dom'
import { PanelGroup, Panel } from "react-bootstrap";
import ApiList from "../../config/base.json"


import "../../css/faq/faq.css";
import $ from "jquery";

const plus_icon  = ApiList.base_cdn_src+"/images/SVG/plus_circle.svg";
const minus_icon = ApiList.base_cdn_src+"/images/SVG/minus.svg";


export default class LandingFaq extends Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        $(document).on("click", ".img_for_collapse", function () {
            if ($(this).hasClass("plus")) {
                $(this).find('img').attr("src", minus_icon);
                $(this).removeClass("plus");
            } else {
                $(this).find('img').attr("src", plus_icon);
                $(this).addClass("plus");
            }
        });
    }

    // function=()=>{

    // }

    render() {
        return (
            <div>
                <div id="faq" className="col-md-12 text-center" style={{ backgroundColor: "#F3F2F2", color: "black" }} >
                    <div className="container">
                        <div className="col-md-12 mtp2">
                            <span className="fgsd14" id="138">
                                FAQS
              </span>
                        </div>
                        <div className="col-md-12">
                            <h1 className="agendabold42" id="139">
                                Have a question? We've got answers.
              </h1>
                        </div>
                        <div className="col-md-8 col-md-offset-2 text-left mt2 mbp2">
                            <PanelGroup id="accordion-example">

                                <Panel eventKey="1">
                                    <Panel.Heading>
                                        <Panel.Title toggle>
                                            <h2 className="panel-title agendabold32 img_for_collapse plus">
                                                <Link role="button" data-toggle="collapse" data-parent="#" to="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                    <img
                                                        className="pull-right "
                                                        src={plus_icon}
                                                        width="35px"
                                                        alt=""
                                                    />
                                                    <span id="">About TIAA</span>
                                                </Link>
                                            </h2>
                                        </Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body collapsible>
                                        <p className="fgsd16">Who is TIAA Life Insurance Company ?</p>
                                        <p className="fgsb16">In 1999, TIAA-CREF Life Insurance Company, a wholly owned subsidiary of TIAA, was created to make our insurance available to family and friends of TIAA clients and to the general public.</p>
                                        <p className="fgsb16">Its parent company, TIAA, was founded 100 years ago by one of history’s great philanthropists, Andrew Carnegie, and is committed to helping individuals pursue positive outcomes through an array of financial services and products.</p>
                                        <p className="fgsb16">As a Fortune 100 financial services organization, TIAA is grounded by our core values, building on our legacy of serving the broad financial needs of those who make a difference in the world.</p>
                                    </Panel.Body>
                                </Panel>

                                <Panel eventKey="2">
                                    <Panel.Heading>
                                        <Panel.Title toggle>
                                            <h2 className="panel-title agendabold32 img_for_collapse plus">
                                                <Link role="button" data-toggle="collapse" data-parent="#" to="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                    <img
                                                        className="pull-right "
                                                        src={plus_icon}
                                                        width="35px"
                                                        alt=""
                                                    />
                                                    <span id="">Why TIAA Life?</span>
                                                </Link>
                                            </h2>
                                        </Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body collapsible>
                                        <p className="fgsd16">We’re one of the world’s most admired companies in the life and health insurance category for over five years.<sup>1</sup></p>
                                        <p className="fgsb16">TIAA Life is a member of one of only three insurance groups in the United States to hold the highest rating available to U.S. insurers from three of the four leading independent insurance company rating agencies. TIAA Life holds the following ratings as a result of its relationship with TIAA. <sup>2</sup> </p>
                                        <ul>
                                            <li> <p className="fgsb16">	A++ Superior by A.M. Best Company</p></li>
                                            <li> <p className="fgsb16"> AAA Exceptionally Strong by Fitch Ratings</p></li>
                                            <li> <p className="fgsb16">Aa1 (Second highest) Very Strong by Moody’s Investors Services</p></li>
                                            <li> <p className="fgsb16">AA+ (Second highest) Very Strong – Standard & Poors</p></li>
                                        </ul>
                                        <p className="fgsb16"> <sup>1</sup> TIAA Life is part of the TIAA family of companies. TIAA was rated in the top 10 in FORTUNE® magazine's World's Most Admired Companies ranking in the Insurance: Life and Health category for the years 2011, 2012, 2013, 2014, 2015, 2016 and 2017.</p>

                                        <p className="fgsb16"> <sup>2</sup> For its stability, claims-paying ability and overall financial strength, TIAA-CREF Life Insurance Company is a member of one of only three insurance groups in the United States to hold the highest rating available to U.S. insurers from three of the four leading independent insurance company rating agencies. TIAA-CREF Life Insurance Company (TIAA Life) is a wholly owned subsidiary of Teachers Insurance and Annuity Association of America (TIAA). TIAA Life holds the following ratings as a result of its relationship with TIAA: A.M. Best (A++ as of 6/18), Fitch (AAA as of 6/18) and Standard & Poor's (AA+ as of 10/18), and the second highest possible rating from Moody's Investors Service (Aa1 as of 9/18). There is no guarantee that current ratings will be maintained. The financial strength ratings represent a company's ability to meet policyholders' obligations and claims and do not apply to variable annuities or any other product or service not fully backed by TIAA's claims-paying ability. The ratings also do not apply to the safety or the performance of the variable accounts, which will fluctuate in value.  Each of TIAA Life and TIAA are solely responsible for their financial conditions and contractual obligations.</p>
                                                                              
                                    </Panel.Body>
                                </Panel>


                                <Panel eventKey="3">
                                    <Panel.Heading>
                                        <Panel.Title toggle>
                                            <h2 className="panel-title agendabold32 img_for_collapse plus">
                                                <Link role="button" data-toggle="collapse" data-parent="#" to="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                    <img
                                                        className="pull-right "
                                                        src={plus_icon}
                                                        width="35px"
                                                        alt=""
                                                    />
                                                    <span id="" >Tell me more about Salary Shield</span>
                                                </Link>
                                            </h2>
                                        </Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body collapsible>
                                        <p className="fgsd16">What is “income benefit life insurance?"</p>
                                        <p className="fgsb16">It’s a term life insurance policy that provides a monthly income benefit to beneficiaries if the insured dies while the policy is in force. Most term life insurance only provides a one-time lump-sum payment if an insured dies, which could leave a family overwhelmed by managing the money and setting aside enough income to meet their future needs. Income benefit insurance has the unique approach of automatically providing families with ongoing monthly income until the benefit period ends.  </p>
                                        <p className="fgsd16">When will my coverage start?</p>
                                        <p className="fgsb16"> We give you an instant on-line decision. If approved, your coverage begins immediately when we receive your first payment.</p>
                                        <p className="fgsd16">How long does my coverage last?.</p>
                                        <p className="fgsb16">Salary Shield covers you for 20 years from the time you buy it or to age 65, whichever comes first.</p>
                                        <p className="fgsd16">How long will my beneficiaries receive monthly income payments if I die?</p>
                                        <p className="fgsb16"> It depends on how old you are when you buy the policy. If you purchase Salary Shield between:</p>
                                        <p className="fgsb16"> <span className="fgsd16" >Ages 20-35</span>: If you die while covered, your policy will pay a monthly benefit to your beneficiaries from when you die until 30 years from when you bought the policy. For example, if you purchase coverage at age 33, we’ll make monthly payments to your beneficiaries until you would have been age 63 if you die during the coverage period.</p>
                                        <p className="fgsb16"> <span className="fgsd16" >Ages 36-50</span>: If you die while covered, your policy will pay a monthly benefit to your beneficiaries until you would have been age 65. For example, if you purchase coverage at age 40, we’ll make monthly payments to your beneficiaries until you would have been age 65 if you die during the coverage period. We guarantee that your beneficiaries will never receive less than 5 years of payments.</p>
                                        <p className="fgsd16">What is the shortest amount of time my beneficiaries will receive monthly benefits if I die while I’m covered?</p>
                                        <p className="fgsb16"> Your beneficiaries will never receive fewer than five years of monthly payments if you die while covered. For example, if your policy covers you to age 65 and you died at age 64, your beneficiaries would still receive monthly benefits for five years.</p>


                                    </Panel.Body>
                                </Panel>

                                <Panel eventKey="4">
                                    <Panel.Heading>
                                        <Panel.Title toggle>
                                            <h2 className="panel-title agendabold32 img_for_collapse plus">
                                                <Link role="button" data-toggle="collapse" data-parent="#" to="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                    <img
                                                        className="pull-right "
                                                        src={plus_icon}
                                                        width="35px"
                                                        alt=""
                                                    />
                                                    <span id="" >What is the one time optional benefit?</span>
                                                </Link>
                                            </h2>
                                        </Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body collapsible>
                                        <p className="fgsd16">What is the optional one-time payment benefit? </p>
                                        <p className="fgsb16">When a loved one passes away, many families may need extra money to help meet expenses such as hospital and funeral costs. Salary Shield includes an optional, lump-sum benefit that you can add to your policy at issue for an additional cost. If you die during the coverage period, your beneficiaries receive a one-time lump sum benefit of up to $100,000 in addition to the monthly income benefit. You select the amount of both benefits.</p>

                                    </Panel.Body>

                                </Panel>

                                <Panel eventKey="5">
                                    <Panel.Heading>
                                        <Panel.Title toggle>
                                            <h2 className="panel-title agendabold32 img_for_collapse plus">
                                                <Link role="button" data-toggle="collapse" data-parent="#" to="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                    <img
                                                        className="pull-right "
                                                        src={plus_icon}
                                                        width="35px"
                                                        alt=""
                                                    />
                                                    <span id="" >Who can buy a Salary Shield policy?</span>
                                                </Link>
                                            </h2>
                                        </Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body collapsible>
                                        <p className="fgsd16">Can I buy a Salary Shield policy for someone else?</p>
                                        <p className="fgsb16">No.</p>
                                        <p className="fgsd16">What will happen if I don’t provide accurate information on my application?</p>
                                        <p className="fgsb16">It is important that you answer all questions honestly on a life insurance application.  We have the right to contest your coverage during the first two years, and any false information you provide that materially impacts your application may be grounds for us to rescind your coverage.</p>                                    </Panel.Body>
                                </Panel>




                            </PanelGroup>


                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
