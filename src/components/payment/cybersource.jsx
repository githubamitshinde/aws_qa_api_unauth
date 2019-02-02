import React, { Component } from 'react';

import $ from 'jquery';
import request from 'request';
import cookie from 'react-cookies'
import moment from 'moment-timezone';
import ApiList from "../../config/base.json"
import uuid from 'react-native-uuid';
import CryptoJS from "crypto-js";
import querystring from 'querystring';

import '../../css/income_shield/income_shield_one.css';


let user_data = JSON.parse(sessionStorage.getItem('user_data'));

let CYBERSOURCE_CONFIG = {
  signed_field_names: 'access_key,profile_id,transaction_uuid,signed_field_names,unsigned_field_names,signed_date_time,locale,transaction_type,reference_number,amount,currency,payment_method,bill_to_forename,bill_to_surname,bill_to_email,bill_to_phone,bill_to_address_line1,bill_to_address_city,bill_to_address_state,bill_to_address_country,bill_to_address_postal_code',
  signed_field_array: ["access_key", "profile_id", "transaction_uuid", "signed_field_names", "unsigned_field_names", "signed_date_time", "locale", "transaction_type", "reference_number", "amount", "currency", "payment_method", "bill_to_forename", "bill_to_surname", "bill_to_email", "bill_to_phone", "bill_to_address_line1", "bill_to_address_city", "bill_to_address_state", "bill_to_address_country", "bill_to_address_postal_code"],
  unsigned_field_names: 'card_type,card_number,card_expiry_date',
  algo: 'HmacSHA256',
  locale: 'en-US',
  amount: '12',
  currency: 'USD',
  payment_method: 'card',
  transaction_type: 'create_payment_token',
  card_type: '001',
  profile_id: "8A201E1E-A219-4AD6-ABF3-FD07E1A2C226",
  access_key: 'a7fbe645161332148407a59b415fa70f',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin': '*'
  },

  timezone: 'America/Los_Angeles',
  secert_key: '5f8834d020be4a5683416c9a4cda62cfe26592c195a34a3ba38d3358fe7b5e25917bf381fdc94aa99f88583d439ea366c93591bd9bb64fcfb9ede5fd034c6fe8eb83fce2230c4b9590c6b97a968530541a69c56219924582b2f122f0c750b0a1c297580978a24a8bb0a7557af4e31a0eab5b0327ff0949cf9c94fe7f4dcee084'
};
// 'User-Agent': 'Super Agent/0.0.1',
let CYBERSOURCE_CONFIG_REST_API = {
  development: {
    // payment_token_url: 'https://testsecureacceptance.cybersource.com/silent/token/create',
    payment_token_url: 'https://testsecureacceptance.cybersource.com/silent/embedded/token/create'

  }
}

export default class CyberSourcetest extends Component {
  constructor() {
    super();
    this.state = {
      cybersource_data: null
    }
  }

  componentDidMount() {
    try {
      console.log('################################# SIGNATURE GENERATION POST CALL 1 ########################');
      let _date = moment.tz((new Date()).getTime(), CYBERSOURCE_CONFIG.timezone);
      let signed_date_time = _date.utc().format();
      $('#signed_date_time').val(signed_date_time)
      let signature_params = {
        access_key: CYBERSOURCE_CONFIG.access_key,
        profile_id: CYBERSOURCE_CONFIG.profile_id,
        transaction_uuid: uuid.v1(),//'58e7adfb-0cf8-4c59-83fe-fa1a29589cc5',//uuidv1(),
        //transaction_uuid: "10c173a1-dae9-4c4b-9fa3-3bcf3db5bbfe",
        signed_field_names: CYBERSOURCE_CONFIG.signed_field_names,
        unsigned_field_names: CYBERSOURCE_CONFIG.unsigned_field_names,
        signed_date_time: signed_date_time,
        locale: CYBERSOURCE_CONFIG.locale,
        transaction_type: CYBERSOURCE_CONFIG.transaction_type,
        reference_number: cookie.load('aff2') + "V" + cookie.load('visit_id'),
        amount: CYBERSOURCE_CONFIG.amount,
        currency: CYBERSOURCE_CONFIG.currency,
        payment_method: CYBERSOURCE_CONFIG.payment_method,
        bill_to_forename: user_data.first_name,
        bill_to_surname: user_data.last_name,
        bill_to_email: 'susan@gmail.com',  //user_data.email,
        bill_to_phone: user_data.phone_number,
        bill_to_address_line1: user_data.apt_no,
        bill_to_address_city: user_data.city,
        bill_to_address_state: user_data.state,
        bill_to_address_country: user_data.country,
        bill_to_address_postal_code: user_data.zipcode
      }
      console.log('####################### SIGNATURE PARAMS ###################');
      console.log(signature_params);
      var dataToSign = [];
      var _signedFieldArray = CYBERSOURCE_CONFIG.signed_field_array;
      console.log(_signedFieldArray);
      _signedFieldArray.forEach(function (item) {
        dataToSign.push(item + "=" + signature_params[item]);
      });
      dataToSign = dataToSign.join(",");
      var _hashInBase64 = CryptoJS.HmacSHA256(dataToSign, CYBERSOURCE_CONFIG.secert_key).toString(CryptoJS.enc.Base64);
      signature_params.signature = _hashInBase64;
      console.log("signature: " + _hashInBase64);
      console.log('signed_date_time : ' + signed_date_time);
      console.log('transaction_uuid: ' + signature_params.transaction_uuid);
      signature_params.card_expiry_date = '12-2020';
      signature_params.card_number = '4111111111111111';
      signature_params.card_type = CYBERSOURCE_CONFIG.card_type;



      document.getElementById("signed_date_time").value = signature_params.signed_date_time;
      document.getElementById("signed_date_time").style.display = "none";

      document.getElementById("amount").value = signature_params.amount;
      document.getElementById("amount").style.display = "none";

      document.getElementById("bill_to_address_postal_code").value = signature_params.bill_to_address_postal_code;
      document.getElementById("bill_to_address_postal_code").style.display = "none";

      document.getElementById("bill_to_address_state").value = signature_params.bill_to_address_state;
      document.getElementById("bill_to_address_state").style.display = "none";

      document.getElementById("bill_to_email").value = signature_params.bill_to_email;
      document.getElementById("bill_to_email").style.display = "none";

      document.getElementById("reference_number").value = signature_params.reference_number;
      document.getElementById("reference_number").style.display = "none";

      document.getElementById("bill_to_address_country").value = signature_params.bill_to_address_country;
      document.getElementById("bill_to_address_country").style.display = "none";

      document.getElementById("bill_to_surname").value = signature_params.bill_to_surname;
      document.getElementById("bill_to_surname").style.display = "none";

      document.getElementById("bill_to_address_line1").value = signature_params.bill_to_address_line1;
      document.getElementById("bill_to_address_line1").style.display = "none";

      document.getElementById("bill_to_phone").value = signature_params.bill_to_phone;
      document.getElementById("bill_to_phone").style.display = "none";

      document.getElementById("bill_to_address_city").value = signature_params.bill_to_address_city;
      document.getElementById("bill_to_address_city").style.display = "none";

      document.getElementById("bill_to_forename").value = signature_params.bill_to_forename;
      document.getElementById("bill_to_forename").style.display = "none";


      document.getElementById("transaction_uuid").value = signature_params.transaction_uuid;
      document.getElementById("transaction_uuid").style.display = "none";

      document.getElementById("signature").value = signature_params.signature;
      document.getElementById("signature").style.display = "none";


      //HIDDEN FIELDS
      document.getElementById("unsigned_field_names").style.display = "none";
      document.getElementById("signed_field_names").style.display = "none";
      document.getElementById("locale").style.display = "none";
      document.getElementById("transaction_type").style.display = "none";
      document.getElementById("profile_id").style.display = "none";
      document.getElementById("access_key").style.display = "none";
      document.getElementById("currency").style.display = "none";
      document.getElementById("payment_method").style.display = "none";


      document.getElementById("card_type").value = signature_params.card_type;
      document.getElementById("card_type").style.display = "none";

      //   document.getElementById("card_number").value = signature_params.card_number;
      document.getElementById("card_number").style.display = "none";

      //   document.getElementById("card_expiry_date").value = signature_params.card_expiry_date;
      document.getElementById("card_expiry_date").style.display = "none";



      document.getElementById("amount").style.display = "none";

      $('.button_click_cs').hide()

    } catch (ex) {
      console.error(ex);
      let _response = {
        code: 500,
        error: JSON.stringify(ex),
        message: 'Internal Server Error.'
      }
      console.log("Response cyber source :- " + JSON.stringify(_response));
    }
  }
  cybersource__call = () => {

  }


  check() {
    console.log(ApiList.current.ui_url + '/apiaff/cybersource/info/' + cookie.load('visit_id'))
    $.ajax({
      // async: false,
      url: ApiList.current.ui_url + '/apiafficiency/cybersource/info/' + cookie.load('visit_id'),
      method: 'GET',
      dataType: "json",
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + sessionStorage.getItem('authtoken')
      },
      success: (data) => {
        console.log('data', data);
        window.stop();
        if (data.cybersource_status == 'ACCEPT') {
          window.location.href = "http://localhost:3000/life-insurance-online-payment"
        } else {
          window.location = "http://localhost:3000/life-insurance-application-call-now"
        }
      },
      error: (err) => {
        console.log("ERROR in identity aff2  " + JSON.stringify(err));

      }
    })


    // console.log('called', res);
    // fetch('https://ssdev.afficiency.com/apiaff//cybersource/info' + '/' + cookie.load('aff2'), {
    //   method: 'GET'
    // })

    //   .then((response) => response.json())
    //   .then((responseJSON) => {
    //     if (responseJSON.cybersource_status == 'ACCEPT') {
    //       console.log('inside');
    //       window.stop();
    //       window.location = "http://localhost:3000/life-insurance-online-payment"
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   })
  }
  // function=()=>{

  // }

  render() {
    const { cybersource_data } = this.state;
    // var options = "";
    // for (var key in cybersource_data) {
    //     options+='<input type="text" value='+cybersource_data[key]+' />'
    // }




    return (
      <div>
        {/* <div className="col-md-8 col-md-offset-2 mt4 mb3">
      <form method="POST" target="_blank" action="https://testsecureacceptance.cybersource.com/silent/token/create" enctype="application/x-www-form-urlencoded">
      <table className="cyber_source col-md-12">

      </table>
      <input type="submit" className="cyber_source_button_" value="CyberSourec Test" />
      </form>
      </div> */}
        <form id="payment_confirmation" className="col-md-12" action="https://testsecureacceptance.cybersource.com/silent/token/create" method="post" onSubmit={this.props.call ? this.check() : null}>


          <input type="text" id="unsigned_field_names" name="unsigned_field_names" value="card_type,card_number,card_expiry_date" />
          <input type="text" id="amount" name="amount" />
          <input type="text" id="bill_to_address_postal_code" name="bill_to_address_postal_code" />

          <input type="text" id="bill_to_address_state" name="bill_to_address_state" />
          <input type="text" id="transaction_uuid" name="transaction_uuid" />
          <input type="text" id="signed_field_names" name="signed_field_names" value="access_key,profile_id,transaction_uuid,signed_field_names,unsigned_field_names,signed_date_time,locale,transaction_type,reference_number,amount,currency,payment_method,bill_to_forename,bill_to_surname,bill_to_email,bill_to_phone,bill_to_address_line1,bill_to_address_city,bill_to_address_state,bill_to_address_country,bill_to_address_postal_code" />
          <input type="text" id="locale" name="locale" value="en-US" />
          <input type="text" id="transaction_type" name="transaction_type" value="create_payment_token" />
          <input type="text" id="bill_to_email" name="bill_to_email" />
          <input type="text" id="reference_number" name="reference_number" />
          <input type="text" id="bill_to_address_country" name="bill_to_address_country" />
          <input type="text" id="bill_to_surname" name="bill_to_surname" />
          <input type="text" id="bill_to_address_line1" name="bill_to_address_line1" />
          <input type="text" id="profile_id" name="profile_id" value="8A201E1E-A219-4AD6-ABF3-FD07E1A2C226" />
          <input type="text" id="access_key" name="access_key" value="a7fbe645161332148407a59b415fa70f" />
          <input type="text" id="bill_to_phone" name="bill_to_phone" />
          <input type="text" id="bill_to_address_city" name="bill_to_address_city" />
          <input type="text" id="currency" name="currency" value="USD" />
          <input type="text" id="bill_to_forename" name="bill_to_forename" />
          <input type="text" id="signed_date_time" name="signed_date_time" />
          <input type="text" id="payment_method" name="payment_method" value="card" />
          <input type="text" id="signature" name="signature" />
          {/* <input type="text" id="submit" name="submit" value="Submit"/> */}

          <fieldset>


            <div id="UnsignedDataSection" class="">
              <input type="text" id="card_type" name="card_type" />
              <input type="text" id="card_number" className="card_no_cb" name="card_number" />
              <input type="text" id="card_expiry_date" className="card_expire_cb" name="card_expiry_date" />
            </div>
          </fieldset>
          <input type="submit" id="submit" className="button_click_cs" value="Confirm " />


        </form>

      </div>


    )
  }

}
