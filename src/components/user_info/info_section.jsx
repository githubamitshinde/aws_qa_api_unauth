import React, { Component } from 'react';
import $ from 'jquery';
import img_one from "../../images/SVG/down_arrow.svg";
import '../../css/user_info/info_section.css';



export default class InfoSection extends Component {
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
                <div id="section1" className="col-md-12 section1_1 text-left section">
                    <div className="container mt2" style={{ color: "black" }}>

                        <div className="col-md-12 text-center fgsd14" id="402">
                            APPLY NOW IN A FEW EASY STEPS
            </div>
                        <div className="col-md-12 text-center mt1 mb2 agendabold42">
                            Step 1: Tell us more about yourself
                </div>

                        <div className="col-md-7 col-md-offset-3">

                            <ul className="nav nav-tabs user_tab " id="myTab">
                                <div className="liner1"></div>
                                <li className="active">
                                    <a href="#home" data-toggle="tab" title="welcome">
                                        <span className="round-tabs one agendabold42">
                                            1
                      </span>
                                    </a>
                                    <div className="bottom_line"></div>
                                    <div className="text-center fgsd14 mt3 bottom_text">About You</div>
                                </li>
                                <li> <hr style={{ marginTop: "56%", borderTop: "2px solid #BBBBBB" }} /> </li>
                                <li><a href="#" data-toggle="tab" title="profile">
                                    <span className="round-tabs two agendabold42" id="602">
                                        2
                     </span>
                                </a>
                                    <div className="bottom_line"></div>
                                    <div className="text-center fgsd14 mt3 bottom_text" style={{ position: "absolute", width: "115px", left: "-10px" }} id="603">About Your Health</div>
                                </li>
                                <li> <hr style={{ marginTop: "56%", borderTop: "2px solid #BBBBBB" }} /> </li>
                                <li><a href="#" data-toggle="tab" title="bootsnipp goodies">
                                    <span className="round-tabs three agendabold42" id="702">
                                        3
                     </span> </a>
                                    <div className="bottom_line"></div>
                                    <div className="text-center fgsd14 mt3 bottom_text" style={{ position: 'absolute', width: "115px", left: "-10px" }} id="703">Your Beneficiaries</div>
                                </li>
                                <li> <hr style={{ marginTop: "56%", borderTop: "2px solid #BBBBBB" }} /> </li>
                                <li><a href="#" data-toggle="tab" title="blah blah">
                                    <span className="round-tabs four agendabold42" id="1004">
                                        4
                         </span>
                                </a>
                                    <div className="bottom_line"></div>
                                    <div className="text-center fgsd14 mt3 bottom_text" id="1005">Sign & Pay</div> </li>


                            </ul>
                        </div>

                        <div className="tab-content ">

                            <div className="tab-pane fade in active" id="home">
                                <div className="col-md-7 col-md-offset-3 mt3 text-left" style={{ display: "none" }}>
                                    <form action="" id="info_form" role="form" data-toggle="validator">
                                        <div className="col-md-12 fgsd14 ">
                                            <div className="col-md-6 pd0">
                                                <div className="col-md-12">FIRST NAME</div>
                                                <div className="col-md-12"><div className="form-group"><input type="text" name="ifirstname" placeholder="Sunil" /></div></div>
                                            </div>
                                            <div className="col-md-6 pd0">
                                                <div className="col-md-12">LAST NAME</div>
                                                <div className="col-md-12"> <div className="form-group"> <input type="text" name="ilastname" placeholder="Sahu" /> </div></div>
                                            </div>

                                        </div>
                                        <div className="col-md-12 mt3 fgsd14">
                                            <div className="col-md-6 pd0">
                                                <div className="col-md-12">PHONE</div>
                                                <div className="col-md-12"><div className="form-group"><input type="text" name="iphonenumber" placeholder="9856897415" /> </div></div>
                                            </div>
                                            <div className="col-md-6 pd0">
                                                <div className="col-md-12">EMAIL</div>
                                                <div className="col-md-12"> <div className="form-group"><input type="text" name="iemail" placeholder="as00h@gmail.com" /> </div></div>
                                            </div>

                                        </div>
                                        <div className="col-md-12 text-center mb3">
                                            <div type="submit" id="info_form_btm" className="btn cbtn_color mt4 ">CONTINUE</div>
                                        </div>
                                    </form>
                                    <div className="col-md-12 mb3 mt1">
                                        <p className="fgsb12">By clicking continue,you agree that TIAA or a third party acting on TIAA's behalf may contact you at the number you've provided,possibly using automated technology or prerecorded voice, to talk about our products and services. If you don't want to give this premission, you can still get a quote or make a purchase by calling us directly at [phone number].</p>
                                    </div>
                                </div>
                                <div className="col-md-12 mb3 text-left" style={{
                                    display: "block"
                                }}>
                                    <form action="" id="info_form2">
                                        < div className="col-md-4 mt3">
                                            <ul className="list-unstyled">
                                                <li className="fgsd14"><div for="" id="406">HOME ADDRESS 1 (NO PO BOX)</div></li>
                                                <li><div className="form-group"> <input type="text" name="homeaddress1" placeholder="Flat no.602, cross street" /> </div> </li>
                                                <li className="mt5 fgsd14"><div for="" id="409">CITY</div></li>
                                                <li><div className="form-group"> <input type="text" name="city" placeholder="Mumbai" /> </div> </li>
                                                <li className="mt5 fgsd14"><div for="" id="412">ZIP CODE</div></li>
                                                <li><div className="form-group"> <input type="text" name="zipcode2" placeholder="10020" /> </div> </li>
                                            </ul>
                                        </div>
                                        <div className="col-md-4 mt3">
                                            <ul className="list-unstyled">
                                                <li className="fgsd14"><div for="" id="407">HOME ADDRESS 2 </div></li>
                                                <li><div className="form-group"> <input type="text" name="homeaddress2" placeholder="near square bridge" /> </div> </li>
                                                <li className="mt5 fgsd14"><div for="" id="410">STATE</div></li>
                                                <li><div className="form-group"> <input type="text" name="state" placeholder="Maharashtra" /> </div> </li>

                                            </ul>
                                        </div>
                                        <div className="col-md-4 mt3">
                                            <div className="panel-body text-center tab1_panel_body">
                                                <div className="col-md-12 mt6 fgsb14">
                                                    you are applying for:
                                       </div>
                                                <div className="col-md-12 mt5 agendabold42">
                                                    $XXXX.XX
                                       </div>
                                                <div className="col-md-12 mt1 fgsd14" id="411">
                                                    monthly benefit
                                       </div>
                                                <div className="col-md-12 mt5 fgsd24">
                                                    $XXXX.XX
                                       </div>
                                                <div className="col-md-12 mt1 mb4 fgsd14">
                                                    one time additional payment
                                       </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12 mt4 radio__container" >
                                            <p className="fgsb18" id="414">Do you plan to replace, cancel or change any existing life insurance or annuity in connection with the application?</p>

                                            <div className="radio-inline fgsd18">
                                                <input className="radio" id="awesome-item-1" name="radio" type="radio" value="AwesomeItem1" checked />
                                                <label style={{ fontWeight: "unset" }} className="radio__label" for="awesome-item-1" id="415">YES</label>
                                            </div>
                                            <div className="radio-inline fgsd18">
                                                <input className="radio" id="awesome-item" name="radio" type="radio" value="AwesomeItem1" />
                                                <label style={{ fontWeight: "unset" }} className="radio__label" for="awesome-item" id="416">NO</label>
                                            </div>


                                        </div>
                                        <div className="col-md-12 text-center mb3">
                                            <div className="btn cbtn" id="417">PREVIOUS</div>&nbsp;&nbsp;&nbsp;
                                         <div className="btn cbtn_color" id="info_form2_btn" id="418">NEXT</div>
                                        </div>
                                    </form>
                                </div>



                            </div>

                            <div className="tab-pane fade" id="profile" style={{
                                color: "black"
                            }}>
                                <div className="col-md-12">

                                    < div className="col-md-4 col-md-offset-4 text-left mt3">
                                        <ul className="list-unstyled">
                                            <li className="text-center ltr20" id="604">We respect the sensitive nature of this information. We only use it to review your application and provide you with the best price possible.</li>
                                            <li className="mt5 fgsd14" id="605">LAST 4 DIGITS OF SNN</li>
                                            <li><input type="text" /></li>

                                            <li className="mt5 fgsd14" id="606">DO YOU HAVE A DRIVER'S LICENSE ?</li>
                                            <li className="mt2 mb3">  <div className="radio__container" >
                                                <div className="radio-inline fgsd18">
                                                    <input className="radio" id="aw1" name="radio" type="radio" value="AwesomeItem1" checked />
                                                    <label style={{ fontWeight: "unset" }} className="radio__label" for="aw1" id="607">YES</label>
                                                </div>
                                                <div className="radio-inline fgsd18">
                                                    <input className="radio" id="aw2" name="radio" type="radio" value="AwesomeItem1" />
                                                    <label style={{ fontWeight: "unset" }} className="radio__label" for="aw2" id="608">NO</label>
                                                </div>


                                            </div>
                                            </li>
                                            <li className="mt5 fgsd14" id="609">DRIVER'S LICENSE</li>
                                            <li><input type="text" /></li>
                                            <li className="mt5 fgsd14" id="610">DL STATE</li>
                                            <li><div className="rail-select">
                                                <div className="select-side">
                                                    <img sc={img_one} alt="" />
                                    </div>
                                                    <select className="form-control" id="" >
                                                        <option>120lbs</option>
                                                        <option>180lbs</option>
                                                    </select>
                                                </div></li>
                            </ul>
                          </div>
                                        <div className="col-md-12 mb3 mt4">
                                            <div className="col-md-8 round col-md-offset-2">
                                                <div className="col-md-1"><input type="checkbox" id="checkbox" checked style={{
                                                    width: "20px"
                                                }} />
                                                    < label for="checkbox" ></label></div>
                                                <div className="col-md-10 fgsd14" id="611">I agree that I have reviewed and accepted this <span style={{ textDecoration: "underline" }}>important information</span>about how TIAA handles my information.</div>


                                            </div>
                                        </div>
                                        <div className="col-md-12 text-center mb3">
                                            <div className="btn cbtn">PREVIOUS</div>&nbsp;&nbsp;&nbsp;
                                <div className="btn cbtn_color" id="613">NEXT</div>
                                        </div>
                                    </div>

                                </div>


                                <div className="tab-pane fade" id="messages">
                                    <div className="col-md-12 text-center">
                                        <div className="col-md-12 text-center mt5 fgsd14">
                                            APPLY NOW IN A FEW EASY STEPS
                                    </div>
                                        <div className="col-md-12 text-center mt1 agendabold42">
                                            Add your beneficiaries now
                                        </div>
                                        <div className="col-md-12 text-center mt1 ltr20" id="705">
                                            Who do you want to receive the benefits  from your policy if you die while covered?  Provide their information in the boxes below.
                                            </div>
                                        <div className="col-md-12 mt3 text-left table-responsive">
                                            <table className="table borderless">
                                                <thead>
                                                    <tr>
                                                        <th id="706">FIRST NAME</th>
                                                        <th id="707">LAST NAME</th>
                                                        <th id="708">DATE OF BIRTH</th>
                                                        <th id="709">RELATIONSHIP</th>
                                                        <th id="710">PERCENTAGE</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td><input type="text" /></td>
                                                        <td><input type="text" /></td>
                                                        <td><input type="text" /></td>
                                                        <td><div className="rail-select">
                                                            <div className="select-side">
                                                                <img sc={img_one} alt="" />
                                                            </div>
                                                            <select className="" id="" style={{
                                                                width: "199px"
                                                            }}>
                                                                < option > 120lbs</option>
                                                                <option>180lbs</option>
                                                            </select>
                                                        </div></td>
                                                        <td><input type="text" placeholder="0%" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td><input type="text" /></td>
                                                        <td><input type="text" /></td>
                                                        <td><input type="text" /></td>
                                                        <td><div className="rail-select">
                                                            <div className="select-side">
                                                                <img sc={img_one} alt="" />
                                                            </div>
                                                            <select className="" id="" style={{
                                                                width: "199px"
                                                            }}>
                                                                < option > 120lbs</option>
                                                                <option>180lbs</option>
                                                            </select>
                                                        </div></td>
                                                        <td><input type="text" placeholder="0%" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td><input type="text" /></td>
                                                        <td><input type="text" /></td>
                                                        <td><input type="text" /></td>
                                                        <td><div className="rail-select">
                                                            <div className="select-side">
                                                                <img sc={img_one} alt="" />
                                                            </div>
                                                            <select className="" id="" style={{
                                                                width: "199px"
                                                            }}>
                                                                < option > 120lbs</option>
                                                                <option>180lbs</option>
                                                            </select>
                                                        </div></td>
                                                        <td><input type="text" placeholder="0%" /></td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                        </div>
                                        <div className="col-md-12"> <div style={{ borderTop: "2px solid grey", margin: "0px 8px" }}></div></div>
                                        <div className="col-md-12 mt2 fgsb18">
                                            <div className="col-md-5 col-md-offset-5 " id="711">Total must equal to 100%</div>
                                            <div className="col-md-1"> 100%</div>
                                        </div>
                                        <div className="col-md-12 mt2 text-left">
                                            <div className="btn cbtn" style={{ width: "230px" }} id="712">ADD ANOTHER BENEFICIARY</div>
                                        </div>
                                        <div className="col-md-12 mb3 mt6">


                                            <div className="btn cbtn_color" id="713">NEXT</div>

                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="settings">

                                </div>


                            </div>
                        </div>
                    </div>


                </div>

                )
            }
        
}