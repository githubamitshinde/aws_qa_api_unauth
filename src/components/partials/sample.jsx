import React, { Component } from 'react';

import $ from 'jquery';

import '../../css/income_shield/income_shield_one.css';



export default class PageName extends Component {
    constructor() {
        super();
        this.state = {
        }
    }

    componentDidMount() {
        var random_number = Math.floor(Math.random() * 100) + 1;
        var distributor = 101;
        var journey_id = distributor === 101 ? (random_number < 95 ? 20 : 1) : (random_number < 95 ? 40 : 21)
        $('.jid').text(journey_id)
        $('.random').text(random_number)
    }


    // function=()=>{

    // }

    render() {
        return (
            <div>
                <div className="random"></div>
                <div className="jid"></div>

            </div>

        )
    }

}