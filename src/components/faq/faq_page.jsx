import React, { Component } from "react";
import ApiList from "../../config/base.json"
import { Link } from 'react-router-dom'
import { PanelGroup, Panel } from "react-bootstrap";

import "../../css/faq/faq.css";
import $ from "jquery";

const plus_icon  = ApiList.base_cdn_src+"/images/SVG/plus_circle.svg";
const minus_icon = ApiList.base_cdn_src+"/images/SVG/minus.svg";
export default class FaqFaq extends Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        $('html, body').animate({
            scrollTop: $(".navigate_on_load").offset().top
        }, 2000);
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
                <div id="faq" className="col-md-12 text-center   navigate_on_load" style={{ backgroundColor: "#F3F2F2", color: "black" }} >
                    <div className="container">
                        <div className="col-md-12 mtp2">
                            <span className="fgsd14" id="138">
                                
              </span>
                        </div>
                        <div className="col-md-12">
                            <h1 className="agendabold42" id="139">
                               
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

                                                    <span>About TIAA</span>
                                                </Link>
                                            </h2>
                                        </Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body collapsible>

                                        <p className="fgsd16">Who is TIAA Life Insurance Company?</p>
                                        <p className="fgsb16">In 1999, TIAA-CREF Life Insurance Company, a wholly owned subsidiary of TIAA, was created to make our insurance available to family and friends of TIAA clients and to the general public.</p>
                                        <p className="fgsb16">Its parent company, TIAA, was founded 100 years ago by one of history’s great philanthropists, Andrew Carnegie, and is committed to helping individuals pursue positive outcomes through an array of financial services and products.</p>
                                        <p className="fgsb16">As a Fortune 100 financial services organization, TIAA is grounded by our core values, building on our legacy of serving the broad financial needs of those who make a difference in the world.</p>


                                    </Panel.Body>
                                </Panel>


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

                                                    <span >Why TIAA Life?</span>
                                                </Link>
                                            </h2>
                                        </Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body collapsible>


                                        <p className="fgsd16"> We’re one of the world’s most admired companies in the life and health insurance category for over five years.<sup>1</sup>  </p>
                                        <p className="fgsb16">TIAA Life is a member of one of only three insurance groups in the United States to hold the highest rating available to U.S. insurers from three of the four leading independent insurance company rating agencies. TIAA Life holds the following ratings as a result of its relationship with TIAA.<sup>2</sup></p>
                                        <ul>
                                            <li>  <p className="fgsb16">A++ Superior by A.M. Best Company</p></li>
                                            <li>  <p className="fgsb16">AAA Exceptionally Strong by Fitch Ratings </p></li>
                                            <li> <p className="fgsb16">Aa1 (Second highest) Very Strong by Moody’s Investors Services</p></li>
                                            <li ><p className="fgsb16">AA+ (Second highest) Very Strong – Standard & Poors </p></li>
                                        </ul>
                                        <p className="fgsb14"><sup>1</sup>TIAA Life is part of the TIAA family of companies. TIAA was rated in the top 10 in FORTUNE® magazine’s World’s Most Admired Companies ranking in the Insurance: Life and Health category for the years 2011, 2012, 2013, 2014, 2015, 2016 and 2017.</p>
                                        <p className="fgsb14">
                                        <sup>2</sup>For its stability, claims-paying ability and overall financial strength,
                                            TIAA-CREF Life Insurance Company is a member of one of only three insurance
                                            groups in the United States to hold the highest rating available to U.S.
                                            insurers from three of the four leading independent insurance company rating
                                            agencies. TIAA-CREF Life Insurance Company (TIAA Life) is a wholly owned subsidiary
                                             of Teachers Insurance and Annuity Association of America (TIAA).
                                             TIAA Life holds the following ratings as a result of its relationship
                                             with TIAA: A.M. Best (A++ as of 6/18), Fitch (AAA as of 6/18) and
                                             Standard & Poor's (AA+ as of 8/17), and the second highest possible
                                             rating from Moody’s Investors Service (Aa1 as of 2/18). There is no
                                              guarantee that current ratings will be maintained. The financial
                                              strength ratings represent a company’s ability to meet policyholders’
                                              obligations and claims and do not apply to variable annuities or any
                                              other product or service not fully backed by TIAA Life’s claims-paying
                                               ability. The ratings also do not apply to the safety or the performance
                                               of the variable accounts, which will fluctuate in value. Each of TIAA
                                               Life and TIAA are solely responsible for their own financial
                                             conditions and contractual obligations.
                                 </p>

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

                                                    <span>Tell me more about Salary Shield</span>
                                                </Link>
                                            </h2>
                                        </Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body collapsible>
                                        <p className="fgsd16">What is “income benefit life insurance?"</p>
                                        <p className="fgsb16"> It’s a term life insurance policy that provides a monthly income benefit to beneficiaries if the insured dies while the policy is in force. Most term life insurance only provides a one-time lump-sum payment if an insured dies, which could leave a family overwhelmed by managing the money and setting aside enough income to meet their future needs. Income benefit insurance has the unique approach of automatically providing families with ongoing monthly income until the benefit period ends.  </p>
                                        <p className="fgsd16">How can I figure out how much insurance I need?</p>
                                        <p className="fgsb16">Look at the monthly income your family relies on you for, and then match it to a monthly benefit amount between $1,000 and $7,000. We offer coverage in $500 increments (e.g., $1,000, $1,500, $2,000). You can also add at issue a one-time, lump sum benefit of up to $100,000 to help pay for things like funeral expenses, mortgages, college costs and debt.</p>
                                        <p className="fgsd16">When will my coverage start?</p>
                                        <p className="fgsb16"> We give you an instant on-line decision. If approved, your coverage begins immediately when we receive your first payment.</p>
                                        <p className="fgsd16">How long does my coverage last?</p>
                                        <p className="fgsb16">Salary Shield covers you for 20 years from the time you buy it or to age 65, whichever comes first. </p>
                                        <p className="fgsd16"> How long will my beneficiaries receive monthly income payments if I die?</p>
                                        <p className="fgsb16">It depends on how old you are when you buy the policy. If you purchase Salary Shield between:</p>
                                        <p className="fgsb16"> <span className="fgsd16">Ages 20-35</span>: If you die while covered, your policy will pay a monthly benefit to your beneficiaries from when you die until 30 years from when you bought the policy. For example, if you purchase coverage at age 33, we’ll make monthly payments to your beneficiaries until you would have been age 63 if you die during the coverage period.</p>
                                        <p className="fgsb16"> <span className="fgsd16"> Ages 36-50</span>: If you die while covered, your policy will pay a monthly benefit to your beneficiaries until you would have been age 65. For example, if you purchase coverage at age 40, we’ll make monthly payments to your beneficiaries until you would have been age 65 if you die during the coverage period. We guarantee that your beneficiaries will never receive less than 5 years of payments.</p>
                                        <p className="fgsd16">Are the Salary Shield benefits taxable to my beneficiaries?</p>
                                        <p className="fgsb16">A small portion of the monthly benefit that the IRS attributes to interest may be taxable.  Consult with your personal tax advisor. If the one-time additional benefit is selected, that amount is generally income tax free to your beneficiaries according to IRC Section 101(a).</p>
                                        <p className="fgsd16"> What is the shortest amount of time my beneficiaries will receive monthly benefits if I die while I’m covered?</p>
                                        <p className="fgsb16">Your beneficiaries will never receive less than five years of monthly payments if you die while covered. For example, if your policy covers you to age 65 and you die at age 64, your beneficiaries will still receive monthly benefits for five years.</p>
                                        <p className="fgsd16">When will I receive my policy?</p>
                                        <p className="fgsb16">Within minutes of your approval and first payment, you will receive an email with an electronic copy of your policy.</p>
                                        <p className="fgsd16">What happens at the end of my policy term?</p>
                                        <p className="fgsb16">At the end of your policy term, your coverage expires. You have the option to buy a new policy at that time, if you qualify. </p>
                                        <p className="fgsd16">What is the total face amount of my policy?</p>
                                        <p className="fgsb16">Unlike most term life insurance products, Salary Shield is not designed to offer only a single lump sum payout. It offers your beneficiaries a reliable stream of payments to help replace your income for up to 30 years or until you turn 65, whichever comes first. Of course, your policy must be in force for your beneficiaries to claim this benefit. We think this is a better solution for many modern families.</p>
                                        <p className="fgsd16">Are the Salary Shield benefits taxable to my beneficiaries?</p>
                                        <p className="fgsb16">A small portion of the monthly benefit that the IRS attributes to interest may be taxable. Consult with your personal tax advisor. If the one-time additional benefit is selected, that amount is generally income tax free to your beneficiaries according to IRC Section 101(a).</p>
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

                                                    <span>Do I need to have a medical exam or blood work?</span>
                                                </Link>
                                            </h2>
                                        </Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body collapsible>
                                        <p className="fgsd16">Are medical exams or blood work required to get coverage?</p>
                                        <p className="fgsb16"> No, all information is collected online without medical testing. You will answer a brief set of health questions and we will run some automated checks. </p>




                                    </Panel.Body>
                                </Panel>


                                <Panel eventKey="120">
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

                                                    <span >How much does Salary Shield cost?</span>
                                                </Link>
                                            </h2>
                                        </Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body collapsible>
                                        <p className="fgsd16">How do you determine the cost of my Salary Shield policy? </p>
                                        <p className="fgsb16">Your cost depends on your age at policy issue, plus your gender, height, weight; amount of coverage; responses to underwriting questions; tobacco use; and medical, prescription and motor vehicle database checks if you are approved.</p>
                                        <p className="fgsd16"> Will my premiums ever go up?</p>
                                        <p className="fgsb16">No, your premiums are guaranteed never to increase. </p>
                                        <p className="fgsd16"> Can I reduce my premium payments?</p>
                                        <p className="fgsb16">Yes, you can reduce your premium by lowering your monthly income benefit coverage by a minimum of $500 at one time. You can continue to lower it by a minimum of $500 at a time as long as you do not fall below the policy minimum benefit of $1,000/month. </p>
                                        <p className="fgsd16">Why might my final price and my quote be different?</p>
                                        <p className="fgsb16"> The quote we provide estimates the price you’d pay for your selected coverage, but then we customize your rate based on your specific health profile and personal history. Your final price is displayed at the end of the application process.</p>
                                    </Panel.Body>
                                </Panel>

                                <Panel eventKey="120">
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

                                                    <span >How can I pay for my Salary Shield policy?</span>
                                                </Link>
                                            </h2>
                                        </Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body collapsible>
                                        <p className="fgsd16"> How do I pay for my policy?</p>
                                        <p className="fgsb16"> You can pay by credit/debit card or electronic fund transfer (EFT) from a bank account. Payments are automatically deducted based on the payment frequency you select. You can update your payment information anytime by logging into the Client Self-Service portal. As Salary Shield is a 100% online process, we do not accept payment by check or money order. </p>
                                        <p className="fgsd16">How will my personal and financial information be kept secure?</p>
                                        <p className="fgsb16"> Our platforms use leading industry encryption and security measures to protect your information. For more information, click on the ‘Security’ link at the bottom of this page.</p>
                                        <p className="fgsd16"> How often do I pay my premium?</p>
                                        <p className="fgsb16"> You can pay once a year or in 12 monthly payments each year. Monthly premiums are slightly more expensive than annual premiums, so you will save money by paying annually. </p>
                                        <p className="fgsd16">How long will I pay premiums?</p>
                                        <p className="fgsb16"> You are required to pay monthly or annual premiums to keep  the policy is in force. Salary Shield provides coverage for 20 years or until you reach age 65, whichever comes first. Paying annually is slightly cheaper than paying monthly. You can cancel at any time without penalty.</p>
                                        <p className="fgsd16">Can I get my money back if I change my mind?</p>
                                        <p className="fgsb16"> If you change your mind and notify us within 30 days of receiving your policy, you can return it for a full refund. </p>

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

                                                    <span >What is the one-time optional benefit?</span>
                                                </Link>
                                            </h2>
                                        </Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body collapsible>
                                        <p className="fgsd16">What is the optional one-time payment benefit? </p>
                                        <p className="fgsb16">When a loved one passes away, many families may need extra money to help meet expenses such as hospital and funeral costs. Salary Shield includes an optional, lump-sum benefit that you can add to your policy at issue for an additional cost. If you die during the coverage period, your beneficiaries receive a one-time lump sum benefit of up to $100,000 in addition to the monthly income benefit. You select the amount of both benefits.</p>
                                        <p className="fgsd16">How much does the optional benefit cost?</p>
                                        <p className="fgsb16"> Premium costs vary based on the same factors as your Salary Shield policy.</p>


                                    </Panel.Body>
                                </Panel>

                                <Panel eventKey="11220">
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

                                                    <span >Naming a beneficiary</span>
                                                </Link>
                                            </h2>
                                        </Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body collapsible>

                                        <p className="fgsd16">What is a beneficiary? </p>
                                        <p className="fgsb16"> Your beneficiary is the person or persons you select to whom we will pay the monthly benefit (and one-time optional benefit, if you chose to include it) if you die.</p>
                                        <p className="fgsd16">   How do I change a beneficiary if my situation changes, such as divorce or death of a beneficiary?</p>
                                        <p className="fgsb16"> You can log on to the Client Self Service Portal and update your beneficiaries anytime during your policy term. </p>
                                        <p className="fgsd16">Where can I find my username and password if I don’t have it with me?</p>
                                        <p className="fgsb16">You can find your account information by going to your Client Self Service Portal and following the simple steps to recover your information.  </p>

                                    </Panel.Body>
                                </Panel>


                                <Panel eventKey="9">
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

                                                    <span >Can I convert or replace my Salary Shield policy?</span>
                                                </Link>
                                            </h2>
                                        </Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body collapsible>
                                        <p className="fgsd16">Can I convert my Salary Shield policy to another Salary Shield or other life insurance policy? </p>
                                        <p className="fgsb16">No, Salary Shield does not have a conversion option. </p>
                                        <p className="fgsd16">Can I replace an existing life insurance policy with a new Salary Shield policy?</p>
                                        <p className="fgsb16"> No, we do not offer Salary Shield as a replacement for existing life insurance coverage.</p>


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

                                                    <span>What personal information do you check?</span>
                                                </Link>
                                            </h2>
                                        </Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body collapsible>
                                        <p className="fgsd16"> What records do you check when I apply for a policy?</p>
                                        <p className="fgsb16">With your permission, we check consumer databases of motor vehicle records, medical history, and prescription records. </p>
                                        <p className="fgsd16"> Why do you need to know my Social Security Number?</p>
                                        <p className="fgsb+16"> We ask for the last 4 digits of your Social Security number to verify your identity for security purposes.  </p>


                                    </Panel.Body>
                                </Panel>






                                <Panel eventKey="12">
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

                                                    <span>Can I buy another Salary Shield policy?</span>
                                                </Link>
                                            </h2>
                                        </Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body collapsible>
                                        <p className="fgsd16"> If the term period of my Salary Shield policy ends, can I purchase another Salary Shield policy?</p>
                                        <p className="fgsb16"> Yes, if you are age 50 or younger when your policy ends, you can apply for another policy.  If approved, your premium payments may be higher than your original policy based on your age and our underwriting at the time you apply. </p>
                                        <p className="fgsd16">Can I increase my monthly benefit?</p>
                                        <p className="fgsb16">Yes, by purchasing another Salary Shield policy. If after purchasing a Salary Shield policy you want additional coverage, you can apply for another policy(ies) up to a maximum combined benefit of $7,000/month. Any additional policy(ies) would require you to apply and meet our underwriting requirements at that time.</p>
                                    </Panel.Body>
                                </Panel>




                                <Panel eventKey="121">
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

                                                    <span>Who can buy a Salary Shield policy?</span>
                                                </Link>
                                            </h2>
                                        </Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body collapsible>
                                        <p className="fgsd16">Who can apply for a Salary Shield policy?</p>
                                        <p className="fgsb16"> Anyone between ages 20 and 50 who resides in the states in which we offer Salary Shield can apply for coverage</p>
                                        <p className="fgsd16"> Who can own a Salary Shield policy?</p>
                                        <p className="fgsb16">Only an individual who is also the insured can own a policy. </p>
                                        <p className="fgsd16"> Can I buy a Salary Shield policy for someone else?</p>
                                        <p className="fgsb16"> No.  </p>
                                        <p className="fgsd16"> What will happen if I don’t provide accurate information on my application?</p>
                                        <p className="fgsb16"> It is important that you answer all questions honestly on a life insurance application.  We have the right to contest your coverage during the first two years, and any false information you provide that materially impacts your application may be grounds for us to rescind your coverage.</p>
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
