import React, { Component } from 'react';
import $ from 'jquery';


import EventMapper from "../../config/handle_window_event";
import ApiList from "../../config/base.json"

var firstPassword;
var secondUserName;
var tokenGlobal;
var tokenGlobalAfficient;

export default class congratulation extends Component {
    constructor() {
        super();
        this.state = {
        }
    }

    componentDidMount() {
        var afficiency_id = EventMapper.query('arcID');
        var visit_id = EventMapper.query('visitId');
        if (visit_id != null && afficiency_id != null) {
            console.log("------------------------ inside -----------------------")

            console.log(ApiList.current.base_api_url + ApiList.set_consent_flag + visit_id + '/' + afficiency_id)
            $.ajax({
                url: ApiList.current.base_api_url + ApiList.set_consent_flag + visit_id + '/' + afficiency_id,
                type: 'GET',
                headers: {
                    
                    'Content-Type': 'application/json'
                },
                success: (data) => {
                    console.log("GET consent >> " + JSON.stringify(data))
                    $('.consent_text').text('Consent Captured.')

                },
                error: (err) => {
                    console.log("ERROR in gset consent api " + JSON.stringify(err));
                }
            })

        }
    }


    // function=()=>{

    // }

    render() {
        return (
            <div>
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, background: 'rgba(193, 193, 193,0.62)', overflow: 'hidden', opacity: '0.90' }}>


                    <div className="agendabold32 consent_text" style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        margin: 'auto',
                        width: 250,
                        height: 125,
                        transform: 'translate3d(0, 0, 0)'
                    }}>Please wait</div>
                </div>
            </div>

        )
    }

}
