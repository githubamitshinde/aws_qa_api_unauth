import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import CircularProgressbar from 'react-circular-progressbar';
import progress_circle_img from '../../images/Icons/TIAA_IncomeShield-78percent logo.png'
import white_circle from '../../images/SVG/white_circle.svg';
import $ from 'jquery';
import '../../css/income_shield/income_shield_one.css';


export default class TypeFive extends Component {
    constructor() {
        super();
        this.state = {
        }
    }

    componentDidMount() {

    }

    scroll_up=()=>{
        $("html, body").animate({ scrollTop: 0 }, 1200);
        return false;
    }

    // function=()=>{

    // }

    render() {
        return (
            <div>
                <div className="col-md-12" style={{ color: "black", backgroundColor: "#F9E038" }}>
                    <div className="container">
                        <div className="col-md-12 text-center mt4 mb3" style={{ 'margin-top': '-1%' }}>
                            <div className="col-md-12 text-center mt2" style={{ 'margin-bottom': '-5%' }} >
                                {/* <CircularProgressbar
                                    className="circularprogressbar"
                                    styles={{
                                        path: { stroke: '#010101' },
                                    }}
                                    strokeWidth={6}
                                    percentage={76}
                                    textForPercentage={'50%'}
                                    initialAnimation={true}
                                /> */}
                               <img src={progress_circle_img} alt="" className="blue_circle_svg_" style={{height: "200px"}}/> 
                                 {/* <div className="agendabold42 circularprogressbar_text">74%</div>  */}
                            </div>
                            <div className="col-md-12 mt4">
                                <p className="agendabold42" id="615">3 out of 4 of people are living paycheck to paycheck</p>
                                <p className="ltr22 mt2 col-md-8 col-md-offset-2" id="616"></p>
                                
                            </div>
                            <div className="col-md-12 mt5 mb3"><Link to="#" onClick={this.scroll_up} className="btn cbtn_color_black tt top_three_section_type_five_continue" id="619">CONTINUE</Link> </div>
                            <p className="ltr14 mt4 mb3" id="617">Source: CareerBuilder.com 2017</p>
                        </div>
                    </div>
                </div>
            </div>

        )
    }

}