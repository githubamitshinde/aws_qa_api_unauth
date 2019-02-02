import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import cookie from 'react-cookies'
import $ from 'jquery';
import EventMapper from "../../config/handle_window_event";
import ApiList from "../../config/base.json"
const img_one =ApiList.base_cdn_src+'/images/SVG/star.svg'
const check_svg =ApiList.base_cdn_src+'/images/SVG/check_mark.svg'
export default class congratulation extends Component {
    constructor() {
        super();
        this.state = {
        }
    }

    componentDidMount() {

        var self = this;
        var afficiency_id = EventMapper.query('arcID');
        var visit_id = EventMapper.query('visitId');

        if (visit_id != null && afficiency_id != null) {
            $('.header_number').text('1-844-475-7020')
            console.log("------------------------ Reurn from cyber source -----------------------")

            self.button_url(visit_id, afficiency_id)

        }


    }

    button_url = (visit_id, afficiency_id) => {
        var timeleft = 60;
        var downloadTimer = setInterval(function () {
            timeleft--;

            // console.log(Timer_value)
            if (timeleft > 0) {
                let datastring = {
                    "application": {
                        "visit_id": visit_id,
                        "afficiency_id": afficiency_id
                    }
                }

                console.log("get policy datastring >>> " + JSON.stringify(datastring))
                console.log(ApiList.current.base_api_url + ApiList.congrtulation.get_policy);
                $.ajax({
                    url: ApiList.current.base_api_url + ApiList.congrtulation.get_policy,
                    type: 'POST',
                    data: JSON.stringify(datastring),
                    headers: {
                                'Authorization': 'Bearer '+ sessionStorage.getItem('authtoken'),
                                'Content-Type': 'application/json'
                    },
                    success: (data) => {
                        console.log("Get policy response >> " + JSON.stringify(data))
                        $('.login_button').css('display', 'block !important')
                        if (data) {
                            if (data.admin_portal_url != null) {
                                $('.login_button_div').css('display', 'block')
                                $('.login_button').attr('href', data.admin_portal_url)
                                // $('.policy_no_div').text('Policy number ' + data.policy_no)
                                timeleft = 0;
                            }

                        }
                    },
                    error: (err) => {
                        console.log("ERROR in get policy api " + JSON.stringify(err));
                    }
                })
            }
            if (timeleft <= 0) {
                clearInterval(downloadTimer);
            }
        }, 1000);

    }




    // function=()=>{

    // }

    render() {
        return (
            <div>
                <div className="col-md-12 text-center" style={{ backgroundColor: "#00C3FF" }}>
                    <div className="container mt1 mb2">
                        <div className="col-md-12 mt2"> <img src={img_one} width="65px" focusable="false" alt="star image" role="img" aria-hidden="true" />  </div>

                        <h1 className="col-md-12 agendabold46 mt1" id="1203">Congratulations</h1>
                        <div className="col-md-6 col-md-offset-3 mt2 mb2 agendabold32" style={{ lineHeight: '35px', padding: 0 }} id="1204">You’ve protected your loved ones with Salary Shield</div>

                    </div>
                </div>
                <div className="col-md-12">
                    <div className="container  mt3">
                        <h2 className=" col-md-12 text-center agendabold32 mt2" id="1205">Login to your customer service portal to:</h2>
                        <div className="col-md-5 col-md-offset-1 ltr20 mt2">
                            <ul className="list-unstyled">
                                <li className="mt2"><img src={check_svg} width="19px" focusable="false" alt="image" role="img" aria-hidden="true" id="1206" style={{ marginRight: 10 }} /> Download and review your policy. </li>
                                <li className="mt2"> <img src={check_svg} width="19px" focusable="false" alt="image" role="img" aria-hidden="true" id="1207" style={{ marginRight: 10 }} /> Review payment information</li>
                                <li className="mt2"><img src={check_svg} width="19px" focusable="false" alt="image" role="img" aria-hidden="true" id="1208" style={{ marginRight: 10 }} /> Provide more details about your beneficiaries</li>
                            </ul>
                        </div>
                        <div className="col-md-5 ltr20 mt2">
                            <ul className="list-unstyled">
                                <li className="mt2"><img src={check_svg} width="19px" focusable="false" alt="image" role="img" aria-hidden="true" id="1209" style={{ marginRight: 10 }} /> Tell us who to contact if you miss a payment</li>
                                <li className="mt2"><img src={check_svg} width="19px" focusable="false" alt="image" role="img" aria-hidden="true" id="1210" style={{ marginRight: 10 }} /> Make changes and more</li>
                            </ul>
                        </div>
                        <div className="col-md-12 text-center mt3 login_button_div" style={{ display: 'none' }}> <a className="login_button"><button class="btn fgsd14" style={{ width: '150px', backgroundColor: '#F9E038', borderRadius: '20px', padding: '9px 12px 3px' }} id="1211"> LOG IN </button> </a></div>
                        <div className="col-md-12 text-right policy_no_div fgsd16 mt3"></div>
                    </div>
                </div>
            </div>

        )
    }

}
