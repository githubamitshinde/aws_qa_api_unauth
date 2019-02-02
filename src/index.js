// This must be the first line in src/index.js

import React from 'react';

import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import ApiList from "../src/config/base.json";


import JourneyPlanner from './components/journey_planner';

import PageOne from './components/home/page_one/parent_pg_one';
import PageTwoA from './components/home/page_two_a';
import PageTwoB from './components/home/page_two_b';
import PageTwoC from './components/home/page_two_c';
import PageTwoD from './components/home/page_two_d';
import PageThree from './components/home/page_three';
import PageFour from './components/home/page_four';
import PageFive from './components/home/page_five';
import PageSix from './components/home/page_six';
import PageSixA from './components/home/page_six_a';
import PageSeven from './components/home/page_seven';
import PageEight from './components/home/page_eight';
import PageNine from './components/home/page_nine';
import PageTen from './components/home/page_ten';
import PageEleven from './components/home/page_eleven';
import PageTwelve from './components/home/page_twelve';
import PageThirteen from './components/home/page_thirteen';
import PageFourteen from './components/home/page_fourteen';
import EmailConsent from './components/home/email_consent'

import Agent from './components/agent/agent_login';
// import AgentOne from './components/agent/agent_one';
// import AgentTwoA from './components/agent/agent_two_a';
// import AgentTwoB from './components/agent/agent_two_b';
// import AgentTwoC from './components/agent/agent_two_c';
// import AgentTwoD from './components/agent/agent_two_d';
// import AgentThree from './components/agent/agent_three';
// import AgentFour from './components/agent/agent_four';
// import AgentFive from './components/agent/agent_five';
// import AgentSix from './components/agent/agent_six';
// import AgentSixA from './components/agent/agent_six_a';
// import AgentSeven from './components/agent/agent_seven';
// import AgentEight from './components/agent/agent_eight';
// import AgentNine from './components/agent/agent_nine';
// import AgentTen from './components/agent/agent_ten';
// import AgentEleven from './components/agent/agent_eleven';
// import AgentTwelve from './components/agent/agent_twelve';
// import AgentThirteen from './components/agent/agent_thirteen';
// import AgentFourteen from './components/agent/agent_fourteen';

import CbTest from './components/payment/cybertest.jsx';

import Consent from './components/consent.jsx';

//** PDF TEST */
// import PDFTEST from './components/pdf/pdf_final_v2';
// import HIPPADOWNLOAD from './components/pdf/hippa_download';
// import DOWNLOAD2PDFTEST from './components/pdf/hippa_application_pdf_dxc'
import SocketContext from './socket-context.js';
import io from 'socket.io-client';

//Socket Object
// const socket = io.connect((ApiList.current.decision_api_ws+':9005'), {transports: ['websocket'], upgrade: false, secure: true});

const socket = io.connect((ApiList.current.decision_api_ws), { secure: true, reconnection: true, reconnectionDelay: 1000 });
ReactDOM.render(
    <SocketContext.Provider value={socket}>
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={JourneyPlanner} />
                <Route exact path="/instant-life-insurance" component={PageOne} />
                <Route exact path="/two_a" component={PageTwoA} />
                <Route exact path="/two_b" component={PageTwoB} />
                <Route exact path="/two_c" component={PageTwoC} />
                <Route exact path="/life-insurance-quote" component={PageTwoD} />
                <Route exact path="/life-insurance-apply-online" component={PageThree} />
                <Route exact path="/life-insurance-online-application" component={PageFour} />
                <Route exact path="/life-insurance-online-questionnaire" component={PageFive} />
                <Route exact path="/life-insurance-online-questionnaire-complete" component={PageSix} />
                <Route exact path="/life-insurance-online-questionnaire-complete-b" component={PageSixA} />
                <Route exact path="/life-insurance-beneficiaries" component={PageSeven} />
                <Route exact path="/life-insurance-additional-questionaire" component={PageEight} />
                <Route exact path="/life-insurance-application-call-now" component={PageNine} />
                <Route exact path="/life-insurance-instant-offer" component={PageTen} />
                <Route exact path="/life-insurance-online-payment" component={PageEleven} />
                <Route exact path="/life-insurance-instant-approval" component={PageTwelve} />
                <Route exact path="/life-insurance-how-it-works" component={PageThirteen} />
                <Route exact path="/life-insurance-faq" component={PageFourteen} />
                <Route exact path="/Set-Email-Consent-Flag" component={EmailConsent} />
                <Route path="/life-insurance-online-payment?arcid=:id&visitId=:visitid" component={PageEleven} />
                <Route path="/life-insurance-instant-approval?arcid=:id&visitId=:visitid" component={PageEleven} />
                <Route path="/life-insurance-application-call-now?arcid=:id&visitId=:visitid" component={PageEleven} />
                <Route exact path="/login" component={Agent} />
                <Route exact path="/cbtest" component={CbTest} />
                <Route exact path="/consent" component={Consent} />
                <Route path="/life-insurance-online-payment?arcid=:id&visitId=:visitid" component={PageEleven} />
            </Switch>
        </BrowserRouter>
    </SocketContext.Provider>,document.getElementById('root'));


// registerServiceWorker();
