var exports = module.exports = {};

var journey_data = JSON.parse(sessionStorage.getItem('journey_data'));
var agent_present = sessionStorage.getItem('agent_present_flag') ? parseInt(sessionStorage.getItem('agent_present_flag')) : 0;

exports.getPageURL = function (page_id) {
    if (page_id == '101' || page_id == '1') {
        return "/instant-life-insurance";
    } else if (page_id == '201') {
        return "/two_a";
    } else if (page_id == '202') {
        return "/two_b";
    } else if (page_id == '203') {
        return "/two_c";
    } else if (page_id == '204') {
        return "/life-insurance-quote";
    } else if (page_id == '301' || page_id == '3') {
        return "/life-insurance-apply-online";
    } else if (page_id == '401' || page_id == '4') {
        return "/life-insurance-online-application";
    } else if (page_id == '501' || page_id == '5') {
        return "/life-insurance-online-questionnaire";
    } else if (page_id == '601') {
        return "/life-insurance-online-questionnaire-complete";
    } else if (page_id == '602') {
        return "/life-insurance-online-questionnaire-complete-b";
    } else if (page_id == '701' || page_id == '7') {
        return "/life-insurance-beneficiaries";
    } else if (page_id == '801' || page_id == '8') {
        return "/life-insurance-additional-questionaire";
    } else if (page_id == '901' || page_id == '9') {
        return "/life-insurance-application-call-now";
    } else if (page_id == '1001' || page_id == '10') {
        return "/life-insurance-instant-offer";
    } else if (page_id == '1101' || page_id == '11') {
        return "/life-insurance-online-payment";
    } else if (page_id == '1201' || page_id == '12') {
        return "/life-insurance-instant-approval";
    } else if (page_id == '1301' || page_id == '13') {
        return "/life-insurance-how-it-works";
    } else if (page_id == '1401' || page_id == '14') {
        return "/life-insurance-faq";
    }
}


exports.getPageData = function (current_index) {
    var final_json = '';
    current_index++;
    journey_data = JSON.parse(sessionStorage.getItem('journey_data'));
    var screen_array = journey_data.journey.screen;
    // alert(JSON.stringify(screen_array))

    // alert( screen_array.length)
    for (var i = 0; i < screen_array.length; i++) {
        // alert(screen_array[i].screenID +"----"+ current_index)
        if (screen_array[i].screenID == current_index) {

            final_json = screen_array[i]
            console.log("final--json" + JSON.stringify(final_json))
            return final_json;

        }
    }
    // alert(JSON.stringify(screen_array[0].screenID.1.design))

}

//FOR OTHER SCREENS WHERE WE DON'T HAVE MULTIPLE DESIGNS
exports.getNextPageId = function (current_index) {
    journey_data = JSON.parse(sessionStorage.getItem('journey_data'));
    var screen_array = journey_data.journey.screen;
    // alert(sessionStorage.getItem('current_index'))
    return screen_array[current_index].screenID;
}

//FOR PAGE TWO ONLY - HERE WE'RE FETCHING DESIGN ID NOT SCREEN ID
exports.getNextDesignId = function (current_index) {
    journey_data = JSON.parse(sessionStorage.getItem('journey_data'));
    var screen_array = journey_data.journey.screen;
    // alert(sessionStorage.getItem('current_index'))
    return screen_array[current_index].design.id;
}