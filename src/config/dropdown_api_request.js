var exports = module.exports = {};
var $ = require('jquery');
var ApiList = require("./base.json")
var Promise = require('bluebird');

exports.dropdown_req = function (table_name, col_name, id, preselected, blank_option) {

    $.ajax({
        url: ApiList.current.base_api_url + ApiList.dropdown_base_url,
        type: 'POST',
        data: JSON.stringify({
            "dropdown_list": {
                "table_name": table_name,
                "column_name": col_name
            }
        }),
        headers: {
            'Content-Type': "application/json"
        },
        success: (data) => {
            var options = "";
            if (blank_option) {
                options += "<option value=></option>";
            }

            for (var i = 0; i < data.length; i++) {
                if (preselected != null) {
                    if (preselected == data[i].refValue) {
                        options += '<option value=' + data[i].refValue + ' selected>' + data[i].ref_key + '</option>'
                    } else {
                        options += '<option value=' + data[i].refValue + '>' + data[i].ref_key + '</option>'
                    }
                } else {
                    options += '<option value=' + data[i].refValue + '>' + data[i].ref_key + '</option>'
                }
                if (i == data.length - 1) {
                    $('#' + id).append(options);
                }
            }
        },
        error: (err) => {
            console.log("ERROR in dropdown " + id + + JSON.stringify(err));
        }
    })
}


exports.dropdown_req_sync = function (table_name, col_name, id, preselected, blank_option) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: ApiList.current.base_api_url + ApiList.dropdown_base_url,
            type: 'POST',
            data: JSON.stringify({
                "dropdown_list": {
                    "table_name": table_name,
                    "column_name": col_name
                }
            }),
            headers: {
                'Content-Type': "application/json"
            },
            success: (data) => {
                var options = "";
                if (blank_option) {
                    options += "<option value=></option>";
                }

                for (var i = 0; i < data.length; i++) {
                    if (preselected != null) {
                        if (preselected == data[i].refValue) {
                            options += '<option value=' + data[i].refValue + ' selected>' + data[i].ref_key + '</option>'
                        } else {
                            options += '<option value=' + data[i].refValue + '>' + data[i].ref_key + '</option>'
                        }
                    } else {
                        options += '<option value=' + data[i].refValue + '>' + data[i].ref_key + '</option>'
                    }
                    if (i == data.length - 1) {
                        $('#' + id).append(options);
                        resolve();
                    }
                }
            },
            error: (err) => {
                console.log("ERROR in dropdown " + id + + JSON.stringify(err));
                reject();
            }
        })
    });
}