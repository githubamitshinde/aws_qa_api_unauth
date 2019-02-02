import $ from 'jquery';

// ######################### VALIDATION FOR ZIPCODE STARTS HERE #########################
$(document).on('blur', '.zipcode', function (e) {
    if (this.value != "" & this.value.length == 6) {
        $(this).css('border-color', 'black');
        return true;
    } else {
        $(this).css('border-color', 'red');
        return false;
    }
});

$(document).on('keypress', '.zipcode', function (e) {
    // console.log(e.keyCode)
    var code = e.keyCode || e.charCode

    if ((code >= 48 && code <= 57) || code == 8 || code == 9) {
        return true;
    } else {
        e.preventDefault();
    }
});
// ######################### VALIDATION FOR ZIPCODE ENDS HERE #########################



// ######################### VALIDATION FOR WEIGHT STARTS HERE #########################
$(document).on('blur', '.person-weight', function (e) {
    if (this.value != "" & this.value.length == 6) {
        $(this).css('border-color', 'black');
        return true;
    } else {
        $(this).css('border-color', 'red');
        return false;
    }
});

$(document).on('keypress', '.person-weight', function (e) {
    // console.log(e.keyCode)
    var code = e.keyCode || e.charCode

    if ((code >= 48 && code <= 57) || code == 8 || code == 9) {
        return true;
    } else {
        e.preventDefault();
    }
});

// ######################### VALIDATION FOR WEIGHT STARTS HERE #########################