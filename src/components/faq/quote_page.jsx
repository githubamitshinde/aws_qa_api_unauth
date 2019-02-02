import React, { Component } from "react";
import { Link } from 'react-router-dom'
import { PanelGroup, Panel } from "react-bootstrap";
import ApiList from "../../config/base.json"

import "../../css/faq/faq.css";
import $ from "jquery";

const plus_icon  = ApiList.base_cdn_src+"/images/SVG/plus_circle.svg";
const minus_icon = ApiList.base_cdn_src+"/images/SVG/minus.svg";

export default class QuoteFaq extends Component {
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



                                <Panel eventKey="4">
                                    <Panel.Heading>
                                        <Panel.Title toggle>
                                            <h2 className="panel-title agendabold32 img_for_collapse plus">
                                                <Link
                                                    role="button"
                                                    data-toggle="collapse"
                                                    data-parent="#"
                                                    to="#collapsethree"
                                                    aria-expanded="true"
                                                    aria-controls="collapsethree"
                                                >
                                                    <img
                                                        className="pull-right "
                                                        src={plus_icon}
                                                        width="35px"
                                                        alt=""
                                                    />

                                                    <span >Tell me more about Salary Shield</span>
                                                </Link>
                                            </h2>
                                        </Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body collapsible>
                                        <p className="fgsd16"> How can I figure out how much insurance I need? </p>
                                        <p className="fgsb16">   Look at the monthly income your family relies on you for, and then match it to a monthly benefit amount between $1,000 and $7,000. We offer coverage in $500 increments (e.g., $1,000, $1,500, $2,000). You can also add at issue a one-time, lump sum benefit of up to $100,000 to help pay for things like funeral expenses, mortgages, college costs and other debt.</p>
                                    </Panel.Body>
                                </Panel>


                                <Panel eventKey="5">
                                    <Panel.Heading>
                                        <Panel.Title toggle>
                                            <h2 className="panel-title agendabold32 img_for_collapse plus">
                                                <Link
                                                    role="button"
                                                    data-toggle="collapse"
                                                    data-parent="#"
                                                    to="#collapsethree"
                                                    aria-expanded="true"
                                                    aria-controls="collapsethree"
                                                >
                                                    <img
                                                        className="pull-right "
                                                        src={plus_icon}
                                                        width="35px"
                                                        alt=""
                                                    />

                                                    <span  >How much does Salary Shield cost?</span>
                                                </Link>
                                            </h2>
                                        </Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body collapsible>
                                        <p className="fgsd16"> Will my premiums ever go up?</p>
                                        <p className="fgsb16">No, your premiums are guaranteed never to increase.</p>
                                        <p className="fgsd16">Can I reduce my premium payments?</p>
                                        <p className="fgsb16"> Yes, you can reduce your premium by lowering your monthly income benefit coverage by a minimum of $500 at one time. You can continue to lower it by a minimum of $500 at a time as long as you do not fall below the policy minimum benefit of $1,000/month. </p>
                                        <p className="fgsd16">Why may my final price and my quote be different?</p>
                                        <p className="fgsb16">The quote we provide estimates the price you’d pay for your selected coverage, but then we customize your rate based on your specific health profile and personal history. Your final price is displayed at the end of the application process.</p>


                                    </Panel.Body>
                                </Panel>

                                <Panel eventKey="6">
                                    <Panel.Heading>
                                        <Panel.Title toggle>
                                            <h2 className="panel-title agendabold32 img_for_collapse plus">
                                                <Link
                                                    role="button"
                                                    data-toggle="collapse"
                                                    data-parent="#"
                                                    to="#collapsethree"
                                                    aria-expanded="true"
                                                    aria-controls="collapsethree"
                                                >
                                                    <img
                                                        className="pull-right "
                                                        src={plus_icon}
                                                        width="35px"
                                                        alt=""
                                                    />

                                                    <span  >How can I pay for my Salary Shield policy?</span>
                                                </Link>
                                            </h2>
                                        </Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body collapsible>
                                        <p className="fgsd16"> How do I pay for my policy?</p>
                                        <p className="fgsb16">You can pay by credit/debit card or electronic fund transfer (EFT) from a bank account. Payments are automatically deducted based on the payment frequency you select. You can update your payment information anytime by logging into the Client Self-Service portal. As Salary Shield is a 100% online process, we do not accept payment by check or money order.</p>
                                        <p className="fgsd16">How will my personal and financial information be kept secure?</p>
                                        <p className="fgsb16"> Our platforms use leading industry encryption and security measures to protect your information. For more information, click on the ‘Security’ link at the bottom of this page. </p>
                                        <p className="fgsd16">How often do I pay my premium?</p>
                                        <p className="fgsb16">You can pay once a year or in 12 monthly payments each year. Monthly premiums are slightly more expensive than annual premiums, so you will save money by paying annually.</p>
                                        <p className="fgsd16">How long will I pay premiums?</p>
                                        <p className="fgsb16">You are required to pay monthly or annual premiums to keep  the policy is in force. Salary Shield provides coverage for 20 years or until you reach age 65, whichever comes first. Paying annually is slightly cheaper than paying monthly. You can cancel at any time without penalty.</p>
                                        <p className="fgsd16">Can I get my money back if I change my mind?</p>
                                        <p className="fgsb16">If you change your mind and notify us in the first 30 days after you receive your policy, you can return it for a full refund. </p>
                                    </Panel.Body>
                                </Panel>


                                <Panel eventKey="7">
                                    <Panel.Heading>
                                        <Panel.Title toggle>
                                            <h2 className="panel-title agendabold32 img_for_collapse plus">
                                                <Link
                                                    role="button"
                                                    data-toggle="collapse"
                                                    data-parent="#"
                                                    to="#collapsethree"
                                                    aria-expanded="true"
                                                    aria-controls="collapsethree"
                                                >
                                                    <img
                                                        className="pull-right "
                                                        src={plus_icon}
                                                        width="35px"
                                                        alt=""
                                                    />

                                                    <span >What is the one time optional benefit?</span>
                                                </Link>
                                            </h2>
                                        </Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body collapsible>
                                        <p className="fgsd16"> What is the optional one-time payment benefit? </p>
                                        <p className="fgsb16">When a loved one passes away, many families may need extra money to help meet expenses such as hospital and funeral costs. Salary Shield includes an optional, lump-sum benefit that you can add to your policy at issue for an additional cost. If you die during the coverage period, your beneficiaries receive a one-time lump sum benefit of up to $100,000 in addition to the monthly income benefit. You select the amount of both benefits.</p>
                                        <p className="fgsd16">How much does the optional benefit cost?</p>
                                        <p className="fgsb16"> Premium costs vary based on the same factors as your Salary Shield policy.</p>

                                    </Panel.Body>
                                </Panel>


                                <Panel eventKey="8">
                                    <Panel.Heading>
                                        <Panel.Title toggle>
                                            <h2 className="panel-title agendabold32 img_for_collapse plus">
                                                <Link
                                                    role="button"
                                                    data-toggle="collapse"
                                                    data-parent="#"
                                                    to="#collapsethree"
                                                    aria-expanded="true"
                                                    aria-controls="collapsethree"
                                                >
                                                    <img
                                                        className="pull-right "
                                                        src={plus_icon}
                                                        width="35px"
                                                        alt=""
                                                    />

                                                    <span  >What personal information do you check?</span>
                                                </Link>
                                            </h2>
                                        </Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body collapsible>
                                        <p className="fgsd16">What records do you check when I apply for a policy? </p>
                                        <p className="fgsb16">With your permission, we check consumer databases of motor vehicle records, medical history, and prescription records. </p>
                                        <p className="fgsd16">Why do you need to know my Social Security Number?</p>
                                        <p className="fgsb16">We ask for the last 4 digits of your Social Security number to verify your identity for security purposes.</p>

                                    </Panel.Body>
                                </Panel>

                                <Panel eventKey="10">
                                    <Panel.Heading>
                                        <Panel.Title toggle>
                                            <h2 className="panel-title agendabold32 img_for_collapse plus">
                                                <Link
                                                    role="button"
                                                    data-toggle="collapse"
                                                    data-parent="#"
                                                    to="#collapsethree"
                                                    aria-expanded="true"
                                                    aria-controls="collapsethree"
                                                >
                                                    <img
                                                        className="pull-right "
                                                        src={plus_icon}
                                                        width="35px"
                                                        alt=""
                                                    />

                                                    <span > Can I buy another Salary Shield policy?</span>
                                                </Link>
                                            </h2>
                                        </Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body collapsible>
                                        <p className="fgsd16"> If the term period of my Salary Shield policy ends, can I purchase another Salary Shield policy?</p>
                                        <p className="fgsb16">Yes, if you are age 50 or younger when your policy ends, you can apply for another policy.  If approved, your premium payments may be higher than your original policy based on your age and our underwriting at the time you apply. </p>
                                        <p className="fgsd16">Can I increase my monthly benefit?</p>
                                        <p className="fgsb16"> Yes by purchasing another Salary Shield policy. If after purchasing a Salary Shield policy you want additional coverage, you can apply for another policy(ies) up to a maximum combined benefit of $7,000/month. Any additional policy(ies) would require you to apply and meet our underwriting requirements at that time.</p>

                                    </Panel.Body>
                                </Panel>


                                <Panel eventKey="11">
                                    <Panel.Heading>
                                        <Panel.Title toggle>
                                            <h2 className="panel-title agendabold32 img_for_collapse plus">
                                                <Link
                                                    role="button"
                                                    data-toggle="collapse"
                                                    data-parent="#"
                                                    to="#collapsethree"
                                                    aria-expanded="true"
                                                    aria-controls="collapsethree"
                                                >
                                                    <img
                                                        className="pull-right "
                                                        src={plus_icon}
                                                        width="35px"
                                                        alt=""
                                                    />

                                                    <span > Who can buy a Salary Shield policy?</span>
                                                </Link>
                                            </h2>
                                        </Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body collapsible>
                                        <p className="fgsd16"> Can I buy a Salary Shield policy for someone else?</p>
                                        <p className="fgsb16">No.</p>
                                
                                    </Panel.Body>
                                </Panel>

                            </PanelGroup>


                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
