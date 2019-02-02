import React, { Component } from 'react';

import '../../css/income_shield/income_shield_one.css';

import $ from 'jquery';
import '../../css/top3section/type2.css';

export default class TypeTwo extends Component {
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
                <div className="col-md-12" style={{ backgroundColor: "#00C3FF" }}>
                    <div className="container">
                        <div className="col-md-12 agendabold42 text-center mt3" id="1328">Life insurance in a few easy steps</div>
                        <div className="col-md-8 mt1 col-md-offset-2 ltr20 text-center" id="1329">We know you're busy so we made getting life insurance streamlined and hassle-free.  Apply online and get a decision in minutes. Coverage begins upon approval and payment. It's that simple.</div>
                        {/* <div className="col-md-12"> 
                        <ul className="nav nav-tabs user_tab agendabold32 thirteen" style={{borderBottom:"unset"}}>
                            <li>
                                <div className="a">
                                    <span className="round-tabs three">
                                        1
                                    </span> </div></li>
                        <li> <hr style={{marginTop: "30%",borderTop: "2px solid black"}}/> </li>
                        <li><div className="a">
                            <span className="round-tabs three">
                                2
                            </span> </div>
                        </li>
                        <li> <hr style={{marginTop: "30%",borderTop: "2px solid black"}}/></li>
                        <li><div className="a">
                            <span className="round-tabs three">
                                3
                            </span> </div>
                            </li>
                            <li> <hr style={{marginTop: "30%",borderTop: "2px solid black"}}/> </li>
                            <li><div className="a">
                                <span className="round-tabs three">
                                    4
                                </span> </div></li>
                            
                            
                            </ul>
                    </div> */}
                        <div className="col-md-12 col-sm-12 text-center mt3 mb3">
                            <div className="col-md-3 col-sm-12 px4">
                                <div className="col-md-12 col-sm-12">
                                    <div className="agendabold42 top_number_thirteen"> 1</div>
                                    <div className="top_number_line"></div>
                                </div>
                                <div className="col-md-12 col-md-offset-0 col-sm-8 col-sm-offset-2 box_height_thirteen" style={{ backgroundColor: "#FDFDFD", borderRadius: "16px", height: "210px" }}><br />
                                    <p className="fgsd14 mt4" id="1331">  SELECT</p>
                                    <p className="mt1 ltr20 px8" id="1335"> a monthly income benefit to cover your family’s needs. </p>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-12 px4">
                                <div className="col-md-12 col-sm-12">
                                    <div className="agendabold42 top_number_thirteen"> 2</div>
                                    <div className="top_number_line"></div>
                                </div>
                                <div className="col-md-12 col-md-offset-0 col-sm-8 col-sm-offset-2 box_height_thirteen" style={{ backgroundColor: "#FDFDFD", borderRadius: "16px", height: "210px" }}><br />
                                    <p className="fgsd14 mt4" id="1332">  ADD</p>
                                    <p className="mt1 ltr20 px8" id="1336"> an optional immediate, one-time benefit to cover major expenses or pay off debt. </p>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-12 px4">
                                <div className="col-md-12 col-sm-12">
                                    <div className="agendabold42 top_number_thirteen"> 3</div>
                                    <div className="top_number_line"></div>
                                </div>
                                <div className="col-md-12 col-md-offset-0 col-sm-8 col-sm-offset-2 box_height_thirteen" style={{ backgroundColor: "#FDFDFD", borderRadius: "16px", height: "210px" }}><br />
                                    <p className="fgsd14 mt4" id="1333"> ANSWER</p>
                                    <p className="mt1 ltr20 px8" id="1337"> a few simple health questions to get an instant decision.  No medical exam needed. </p>
                                </div>
                            </div>
                            <div className="col-md-3 px4 col-sm-12">
                                <div className="col-md-12 col-sm-12">
                                    <div className="agendabold42 top_number_thirteen"> 4</div>
                                </div>
                                <div className="col-md-12 col-sm-8 col-sm-offset-2 col-md-offset-0 box_height_thirteen" style={{ backgroundColor: "#FDFDFD", borderRadius: "16px", height: "210px" }}><br />
                                    <p className="fgsd14 mt4" id="1334"> COMPLETE</p>
                                    <p className="mt1 ltr18 px8" id="1338"> your application and if approved,  pay by credit card or bank draft for immediate coverage. </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 col-sm-12 text-center mb3 mt2">
                            <div className="btn cbtn_color tt  scroll_up" id="1339">continue</div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }

}