import React, { Component } from 'react';
import ApiList from "../../config/base.json"

//import progress_circle_img from '../../images/Icons/TIAA_IncomeShield-50 percent logo.png'

import '../../css/income_shield/income_shield_one.css';
import '../../css/other/circular_progress.css'

const progress_circle_img = ApiList.base_cdn_src+"/images/Icons/TIAA_IncomeShield-50 percent logo.png";
export default class TypeOne extends Component {
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
            <div className="col-md-12" style={{color: "black"}}>
            <div className="container">
            <div className="col-md-12 text-center mt4 mb3">
                <div className="col-md-12 text-center mt2">
{/*                        
                        <CircularProgressbar
                            className="circularprogressbar"
                            styles={{
                            path: { stroke: '#010101' },
                            }}
                            strokeWidth={6}
                            percentage={50}
                            textForPercentage={'50%'}
                            initialAnimation={true}
                        /> */}
                            <img src={progress_circle_img} alt="" className="blue_circle_svg_" style={{height: "200px"}}/> 
                    {/* <div className="agendabold42 circularprogressbar_text">50%</div>  */}
                </div>
                <div className="col-md-10 col-md-offset-1 mt4">
                        <p className="agendabold32" id="118"><sup>1</sup> </p>
                        <p className="ltr20 mt2" id="119"></p>
                        <p className="ltr18 mt3" id="120"></p>
                        <p className="ltr18 mt1"> <sup>2</sup> Based on comparing Salary Shield annual premiums for comparable coverage to the average annual premium of the ten lowest-priced 20-year term products. August 2018</p>
                </div>
                </div>
            </div>
            </div>
            </div>

        )
    }

}