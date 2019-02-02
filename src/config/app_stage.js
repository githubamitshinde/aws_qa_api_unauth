var exports = module.exports = {};
var $ = require('jquery');
var ApiList = require("./base.json")

var firstPassword;
var secondUserName;
var tokenGlobal;
var tokenGlobalAfficient;

exports.save_app_stage = function (visit_id, stage) {
    let datastring = {
        "application": {
            "visit_id": visit_id,
            "app_stage_completed": stage
        }
    }

    $.ajax({
        url: ApiList.current.base_api_url + '/application/updateAppStageCompleted',
        type: 'POST',
        data: JSON.stringify(datastring),
        headers: {
                    
                    'Content-Type': 'application/json'
        },
        success: (data) => {
            console.log("app stage res on" + stage + " - " + JSON.stringify(data))
        },
        error: (err) => {
            console.log("ERROR in app stage save on page" + stage + " - " + JSON.stringify(err));
        }
    })
}
