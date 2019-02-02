import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import GTM from 'react-tag-manager'

import PageOneIdOne from './page_one_one';
import PageOneIdTwenty from './page_one_twenty';
import PageOneIdTwentyOne from './page_one_twentyone';
import PageOneIdForty from './page_one_forty';
import JourneyPlanner from '../../journey_planner';

class ParentPageOne extends Component {
    constructor() {
        super();
        this.state = {
            data: sessionStorage.getItem('pe_journey_id')
        }
    }
    componentDidMount() {


        console.log(window.location.hostname)
    }

    render() {
        const { data } = this.state;


        return (
            <GTM
                gtm={{
                    id: sessionStorage.getItem('container_id')
                }}
                settings={{
                    sendPageView: true,     // default false
                    pageView: {             // default null
                        event: 'pageview',    // default
                        data: {},            // default

                        settings: {
                            locationProp: 'pathname', // default
                            sendAs: 'url',      // default
                        },
                    }
                }}>

                {(data == 1) ? <PageOneIdOne /> : null}
                {(data == 20) ? <PageOneIdTwenty /> : null}
                {(data == 21) ? <PageOneIdTwentyOne /> : null}
                {(data == 40) ? <PageOneIdForty /> : null}
            </GTM>
        )
    }
}

export default ParentPageOne