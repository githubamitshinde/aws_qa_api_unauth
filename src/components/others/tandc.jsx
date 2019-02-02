import React, { Component } from 'react';
import ApiList from "../../config/base.json"


import '../../css/other/tandc.css'

const img = ApiList.base_cdn_src+"/images/Icons/TIAA_IncomeShield-journey_styleguide-dev-05.png";
export default class tandc extends Component {
    constructor() {
        super();
        this.state = {
        }
    }

    componentDidMount() {

    }


    // function=()=>{

    // }

    render() {
        return (
            <div>
                <div id="tandc" className="col-md-12 col-sm-12 text-center" style={{ backgroundColor: 'black', color: 'white', fontWeight: '200', letterSpacing: '1px' }}>
                    <div className="container fgsb14" style={{ fontSize: '15px' }}>
                        <div style={{ padding: '14px' }}>
                            <div className="col-md-12 col-sm-12 mt3 text-left tandc_block_1">
                                <div className="col-md-2 col-sm-2 pd0" ><a href="https://www.tiaa.org" className="" target="_blank"><img src={img} height="60px" alt="image"  /></a></div>
                                {/* <span id="149" className="fgsb14 pd0 col-md-5 col-md-offset-1" >* For a defined period; see personalized quote for details</span> */}
                                <a href="https://www.afficiency.com" target="_blank" className="pull-right" style={{ letterSpacing: '1px' , marginTop:24 }} id="150">Powered by Afficiency, Inc</a>
                            </div>
                            <div className="col-md-12 col-sm-12">
                                <div className="col-md-12 col-sm-12" style={{ borderTop: '2px solid #323232',marginBottom:25 }} >
                                </div>
                                <div className="col-md-12 col-sm-12 tandc_block_2" style={{ borderBottom: '2px solid #323232' }}>

                                    <div className="col-md-2 col-sm-2 first_col_tandc">
                                        <a href="https://www.tiaa.org/public/support/security-center" target="_blank"> Security</a>
                                    </div>
                                    <div className="col-md-2 col-sm-2">
                                        <a href="https://www.tiaa.org/public/support/web-accessibility" target="_blank">Accessibility</a>
                                    </div>
                                    <div className="col-md-2 col-sm-2 tc_text">
                                        <a href="https://www.tiaa.org/public/support/terms-conditions" target="_blank">Terms & Conditions</a>
                                    </div>
                                    <div className="col-md-2 col-sm-2 mb2">
                                        <a href="https://www.tiaa.org/public/support/privacy-policy" target="_blank">Privacy</a>
                                    </div>
                                </div>

                            </div>
                            <div className="col-md-12 col-sm-12 text-left mt3 fgsb17 mb3">
                                <p>Investment, insurance and annuity products are not FDIC insured, are not bank guaranteed, are not deposits, are not insured by any federal government agency, are not a condition to any banking service or activity, and may lose value.</p>
                               <p>This product is not available in all states.</p>
                               <p>All guarantees are based on the claims-paying ability of TIAA-CREF Life Insurance Company.</p>
                               <p>Salary Shield is issued by TIAA Life, on policy form #ICC18 TCL-DTP and Lump Sum Level Term Rider form #ICC18 TCL-DTP-LSR. TIAA Life is domiciled in New York, NY with its principal place of business in New York, NY.</p>
                               {/* <p>Like most insurance policies, Salary Shield contains exclusions and limitations. We can provide you with costs and complete details. TIAA Life has the right to contest the policy for misrepresentation by the applicant.  </p> */}
                               <p>Terms, conditions and availability may vary by state. Exclusions, restrictions, limitations, and reductions in benefits will, in certain situations, apply to your policy. TIAA Life has the right to contest the policy for misrepresentation by the applicant.</p>
                               <p>The TIAA group of companies does not provide legal or tax advice. Please consult your legal or tax advisor.</p>
                               <p> &copy; 2018 TIAA-CREF Life Insurance Company, 730 Third Avenue, New York, NY 10017</p>
                               <p>549576</p>
                            </div>
                        </div>

                    </div>

                </div>
            </div>

        )
    }

}