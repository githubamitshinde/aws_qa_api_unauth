import React, { Component } from "react";
import { Link } from 'react-router-dom'
import { PanelGroup, Panel } from "react-bootstrap";
import ApiList from "../../config/base.json"

import "../../css/faq/faq.css";
import $ from "jquery";

const plus_icon  = ApiList.base_cdn_src+"/images/SVG/plus_circle.svg";
const minus_icon = ApiList.base_cdn_src+"/images/SVG/minus.svg";
export default class HowItWorksFaq extends Component {
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
                            <span className="fgsd16" className="" id="138">
                                FAQS
              </span>
                        </div>
                        <div className="col-md-12">
                            <h1 className="agendabold42" id="">
                                Have a question? We've got answers.
              </h1>
                        </div>
                        <div className="col-md-8 col-md-offset-2 text-left mt2 mbp2">
                            <PanelGroup id="accordion-example">


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
                                                    <span >Tell me more about Salary Shield</span>
                                                </Link>
                                            </h2>
                                        </Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body collapsible>
                                        <p className="fgsd16">What is “income benefit life insurance”?</p>
                                        <p className="fgsb16">It’s a term life insurance policy that provides a monthly income benefit to beneficiaries if the insured dies while the policy is in force. Most term life insurance only provides a one-time lump-sum payment if an insured dies, which could leave a family overwhelmed by managing the money and setting aside enough income to meet their future needs. Income benefit insurance has the unique approach of automatically providing families with ongoing monthly income until the benefit period ends.  </p>                                        <p className="fgsd16">How can I figure out how much insurance I need?</p>
                                        <p className="fgsb16">Look at the monthly income your family relies on you for, and then match it to a monthly benefit amount between $1,000 and $7,000. We offer coverage in $500 increments (e.g., $1,000, $1,500, $2,000). You can also add at issue a one-time, lump sum benefit of up to $100,000 to help pay for things like funeral expenses, mortgages, college costs, and debt.</p>
                                        <p className="fgsd16"> When will my coverage start?</p>
                                        <p className="fgsb16">We give you an instant on-line decision. If approved, your coverage begins immediately when we receive your first payment.</p>
                                        <p className="fgsd16"> How long does my coverage last?</p>
                                        <p className="fgsb16">Salary Shield covers you for 20 years from the time you buy it or to age 65, whichever comes first. </p>
                                        <p className="fgsd16">How long will my beneficiaries receive monthly income payments if I die?</p>

                                        <p className="fgsb16"> It depends on how old you are when you buy the policy. If you purchase Salary Shield between:</p>
                                        <p className="fgsb16"><span className="fgsd16">Ages 20-35</span>: If you die while covered, your policy will pay a monthly benefit to your beneficiaries from when you die until 30 years from when you bought the policy. For example, if you purchase coverage at age 33, we’ll make monthly payments to your beneficiaries until you would have been age 63 if you die during the coverage period.</p>
                                        <p className="fgsb16"> <span className="fgsd16"> Ages 36-50</span>: If you die while covered, your policy will pay a monthly benefit to your beneficiaries until you would have been age 65. For example, if you purchase coverage at age 40, we’ll make monthly payments to your beneficiaries until you would have been age 65 if you die during the coverage period. We guarantee that your beneficiaries will never receive less than 5 years of payments.</p>
                                        <p className="fgsd16">What is the shortest amount of time my beneficiaries will receive monthly benefits if I die while I’m covered? </p>
                                        <p className="fgsb16">Your beneficiaries will never receive fewer than five years of monthly payments if you die while covered. For example, if your policy covers you to age 65 and you died at age 64, your beneficiaries would still receive monthly benefits for five years.</p>
                                        <p className="fgsd16">When will I receive my policy?</p>
                                        <p className="fgsb16">Within minutes of your approval and first payment, you will receive an email with an electronic copy of your policy.</p>
                                        <p className="fgsd16">What happens at the end of my policy term?</p>
                                        <p className="fgsb16">At the end of your policy term, your coverage expires. You have the option to buy a new policy at that time, if you qualify. </p>
                                    </Panel.Body>
                                </Panel>




                                <Panel eventKey="6">
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
                                                    <span>Do I need to have a medical exam or blood work?</span>
                                                </Link>
                                            </h2>
                                        </Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body collapsible>
                                        <p className="fgsd16">Are medical exams or blood work required to get coverage?</p>

                                        <p className="fgsb16"> No, all information is collected online without medical testing. You will answer a brief set of health questions and we will run some automated checks.</p>


                                    </Panel.Body>
                                </Panel>



                                <Panel eventKey="7">
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
                                                    <span >How much does Salary Shield cost?</span>
                                                </Link>
                                            </h2>
                                        </Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body collapsible>
                                        <p className="fgsd16">How do you determine the cost of my Salary Shield policy?</p>

                                        <p className="fgsb16"> Your cost depends on your age at policy issue, plus your gender, height & weight; amount of coverage; responses to underwriting questions; tobacco use; and medical, prescription and motor vehicle database checks if you are approved.</p>

                                        <p className="fgsd16">Will my premiums ever go up?</p>
                                        <p className="fgsb16"> No, your premiums are guaranteed never to increase. </p>



                                    </Panel.Body>
                                </Panel>

                                <Panel eventKey="8">
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
                                                    <span >How can I pay for my Salary Shield policy?</span>
                                                </Link>
                                            </h2>
                                        </Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body collapsible>
                                        <p className="fgsd16">How long will I pay premiums?</p>

                                        <p className="fgsb16">You are required to pay monthly or annual premiums to keep  the policy is in force. Salary Shield provides coverage for 20 years or until you reach age 65, whichever comes first. Paying annually is slightly cheaper than paying monthly. You can cancel at any time without penalty.</p>

                                        <p className="fgsd16"> Can I get my money back if I change my mind?</p>

                                        <p className="fgsb16">If you change your mind and notify us within 30 days of receiving your policy, you can return it for a full refund. </p>

                                    </Panel.Body>
                                </Panel>

                                <Panel eventKey="9">
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
                                                    <span>What is the one time optional benefit?</span>
                                                </Link>
                                            </h2>
                                        </Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body collapsible>
                                        <p className="fgsd16">What is the optional one-time payment benefit? </p>

                                        <p className="fgsb16">When a loved one passes away, many families may need extra money to help meet expenses such as hospital and funeral costs. Salary Shield includes an optional, lump-sum benefit that you can add to your policy at issue for an additional cost. If you die during the coverage period, your beneficiaries receive a one-time lump sum benefit of up to $100,000 in addition to the monthly income benefit. You select the amount of both benefits.</p>

                                        <p className="fgsd16">How much does the optional benefit cost?</p>

                                        <p className="fgsb16">Premium costs vary based on the same factors as your Salary Shield policy. </p>

                                    </Panel.Body>
                                </Panel>

                                <Panel eventKey="10">
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
                                                    <span>What personal information do you check? </span>
                                                </Link>
                                            </h2>
                                        </Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body collapsible>
                                        <p className="fgsd16">What records do you check when I apply for a policy? </p>

                                        <p className="fgsb16">With your permission, we check consumer databases of motor vehicle records, medical history, and prescription records. </p>

                                    </Panel.Body>
                                </Panel>

                                <Panel eventKey="11">
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
                                                    <span  >Who can buy a Salary Shield policy? </span>
                                                </Link>
                                            </h2>
                                        </Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body collapsible>
                                        <p className="fgsd16">Who can buy a Salary Shield policy?</p>

                                        <p className="fgsb16">Anyone between ages 20 and 50 who resides in the states in which we offer Salary Shield can apply for coverage.</p>
                                        <p className="fgsd16">Who can own a Salary Shield policy?</p>
                                        <p className="fgsb16">Only an individual who is also the insured can own a policy.</p>
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
