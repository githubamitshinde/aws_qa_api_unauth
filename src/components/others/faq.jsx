import React, { Component } from "react";
import { PanelGroup, Panel } from "react-bootstrap";
import plus_icon from "../../images/SVG/plus_circle.svg";
import minus_icon from "../../images/SVG/minus.svg";

import "../../css/faq/faq.css";
import $ from "jquery";

export default class faq extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    $(document).on("click", ".img_for_collapse", function () {
      if ($(this).hasClass("plus")) {
        $(this).attr("src", minus_icon);
        $(this).removeClass("plus");
      } else {
        $(this).attr("src", plus_icon);
        $(this).addClass("plus");
      }
    });
  }

  // function=()=>{

  // }

  render() {
    return (
      <div>
        <div id="faq" className="col-md-12 text-center" style={{ backgroundColor: "#F3F2F2", color: "black" }} >
          <div className="container">
            <div className="col-md-12 mtp2">
              <span className="fgsd14" id="138">
                FAQ TOPICS
              </span>
            </div>
            <div className="col-md-12">
              <h1 className="agendabold42" id="139">
                Select an FAQ topic to get started
              </h1>
            </div>
            <div className="col-md-8 col-md-offset-2 text-left mt2 mbp2">
              <PanelGroup id="accordion-example">
                <Panel eventKey="1">
                  <Panel.Heading>
                    <Panel.Title toggle>
                      <h2 className="panel-title agendabold32">
                        <a role="button" data-toggle="collapse" data-parent="#" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                          <img
                            className="pull-right img_for_collapse plus"
                            src={plus_icon}
                            width="35px"
                            alt=""
                          />
                          <span id="140">FAQ 1</span>
                        </a>
                      </h2>
                    </Panel.Title>
                  </Panel.Heading>
                  <Panel.Body collapsible>
                    Anim pariatur cliche reprehenderit, enim eiusmod high life
                    accusamus terry richardson ad squid. 3 wolf moon officia
                    aute, non cupidatat skateboard dolor brunch. Food truck
                    quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor,
                    sunt aliqua put a bird on it squid single-origin coffee
                    nulla assumenda shoreditch et. Nihil anim keffiyeh
                    helvetica, craft beer labore wes anderson cred nesciunt
                    sapiente ea proident. Ad vegan excepteur butcher vice lomo.
                    Leggings occaecat craft beer farm-to-table, raw denim
                    aesthetic synth nesciunt you probably haven't heard of them
                    accusamus labore sustainable VHS.
                  </Panel.Body>
                </Panel>
                <Panel eventKey="2">
                  <Panel.Heading>
                    <Panel.Title toggle>
                      <h4 className="panel-title agendabold32">
                        <a
                          className="collapsed"
                          role="button"
                          data-toggle="collapse"
                          data-parent="#"
                          href="#collapseTwo"
                          aria-expanded="false"
                          aria-controls="collapseTwo"
                        >
                          <img
                            className="pull-right img_for_collapse plus"
                            src={plus_icon}
                            width="35px"
                            alt=""
                          />
                          <span id="141">FAQ 2</span>
                        </a>
                      </h4>
                    </Panel.Title>
                  </Panel.Heading>
                  <Panel.Body collapsible>
                    Anim pariatur cliche reprehenderit, enim eiusmod high life
                    accusamus terry richardson ad squid. 3 wolf moon officia
                    aute, non cupidatat skateboard dolor brunch. Food truck
                    quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor,
                    sunt aliqua put a bird on it squid single-origin coffee
                    nulla assumenda shoreditch et. Nihil anim keffiyeh
                    helvetica, craft beer labore wes anderson cred nesciunt
                    sapiente ea proident. Ad vegan excepteur butcher vice lomo.
                    Leggings occaecat craft beer farm-to-table, raw denim
                    aesthetic synth nesciunt you probably haven't heard of them
                    accusamus labore sustainable VHS.
                  </Panel.Body>
                </Panel>
                <Panel eventKey="3">
                  <Panel.Heading>
                    <Panel.Title toggle>
                      <h2 className="panel-title agendabold32">
                        <a
                          role="button"
                          data-toggle="collapse"
                          data-parent="#"
                          href="#collapsethree"
                          aria-expanded="true"
                          aria-controls="collapsethree"
                        >
                          <img
                            className="pull-right img_for_collapse plus"
                            src={plus_icon}
                            width="35px"
                            alt=""
                          />

                          <span id="142">FAQ 3</span>
                        </a>
                      </h2>
                    </Panel.Title>
                  </Panel.Heading>
                  <Panel.Body collapsible>
                    Anim pariatur cliche reprehenderit, enim eiusmod high life
                    accusamus terry richardson ad squid. 3 wolf moon officia
                    aute, non cupidatat skateboard dolor brunch. Food truck
                    quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor,
                    sunt aliqua put a bird on it squid single-origin coffee
                    nulla assumenda shoreditch et. Nihil anim keffiyeh
                    helvetica, craft beer labore wes anderson cred nesciunt
                    sapiente ea proident. Ad vegan excepteur butcher vice lomo.
                    Leggings occaecat craft beer farm-to-table, raw denim
                    aesthetic synth nesciunt you probably haven't heard of them
                    accusamus labore sustainable VHS.
                  </Panel.Body>
                </Panel>
              </PanelGroup>

              {/* <div className="panel-group faqdata" id="accordion" role="tablist" aria-multiselectable="true">

                                <div className="panel panel-default">
                                    <div className="panel-heading faq_panel_heading" role="tab" id="headingOne">
                                        <h2 className="panel-title agendabold32">
                                            <a role="button" data-toggle="collapse" data-parent="#" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                <img className="pull-right" src={plus_icon} width="35px" alt="" />


                                                <span id="123">FAQ 1</span>
                                            </a>
                                        </h2>
                                    </div>
                                    <div id="collapseOne" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
                                        <div className="inner_panel_text">

                                            <p>
                                                <span className="ltr14"> Some random text<br />
                                                    <br />
                                                </span></p>

                                        </div>
                                    </div>
                                </div>
                                <div className="panel panel-default">
                                    <div className="panel-heading faq_panel_heading" role="tab" id="headingTwo">
                                        <h4 className="panel-title agendabold32">
                                            <a className="collapsed" role="button" data-toggle="collapse" data-parent="#" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                <img className="pull-right" src={plus_icon} width="35px" alt="" />
                                                <span id="124">FAQ 2</span>
                                            </a>
                                        </h4>
                                    </div>
                                    <div id="collapseTwo" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
                                        <div className="">

                                            <p>
                                                <span className="ltr14">Some random text<br />
                                                    <br />
                                                </span></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="panel panel-default">
                                    <div className="panel-heading faq_panel_heading" role="tab" id="headingthree">
                                        <h2 className="panel-title agendabold32">
                                            <a role="button" data-toggle="collapse" data-parent="#" href="#collapsethree" aria-expanded="true" aria-controls="collapsethree">
                                                <img className="pull-right" src={plus_icon} width="35px" alt="" />


                                                <span id="125">FAQ 3</span>
                                            </a>
                                        </h2>
                                    </div>
                                    <div id="collapsethree" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingthree">
                                        <div className="inner_panel_text">

                                            <p>
                                                <span className="ltr14"> Some random text<br />
                                                    <br />
                                                </span></p>

                                        </div>
                                    </div>
                                </div>
                            </div> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
