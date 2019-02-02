import React, { Component } from 'react';

import $ from 'jquery';
import request from 'request';
import cookie from 'react-cookies'
import ApiList from "../../config/base.json"
import moment from 'moment-timezone';
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
  amount: '2',
  currency: 'USD',
  payment_method: 'card',
  transaction_type: 'create_payment_token',

  // card_type: '001',
  profile_id: "AB7265C1-283F-4FF2-880B-A8022E8D9C89",
  access_key: '558a2722b701380198d3b38d3a093e14',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin': '*'
  },

  timezone: 'America/Los_Angeles',
  secert_key: 'b21971c40cf545c78204439899379b6ee97091207cbe41b4839ee341ba1ae806eb1450e08763418296a6f6d0a2921b63ab208d0d503846e484d9763cfb1bc428311170f3bedc4e0695573eea9d24371d37e0d4040ccf40b3b1d1887973a857e68aa19e0a31404be48487c9e09d90f19b9c5fc1294b1844818e954a7c1e6c997b'
};
// 'User-Agent': 'Super Agent/0.0.1',
let CYBERSOURCE_CONFIG_REST_API = {
  development: {
    // payment_token_url: 'https://testsecureacceptance.cybersource.com/silent/token/create',
    payment_token_url: 'https://testsecureacceptance.cybersource.com/silent/embedded/token/create'

  }
}

var card;

export default class CyberSourcetest extends Component {
  constructor() {
    super();
    this.state = {
      cybersource_data: null
    }
  }

  componentDidMount() {
    card = sessionStorage.getItem('sessionCardNumber');
    console.log(card);
    try {
      user_data = JSON.parse(sessionStorage.getItem('user_data'));

      console.log('################################# SIGNATURE GENERATION POST CALL 1 ########################');
      let _date = moment.tz((new Date()).getTime(), 'America/Los_Angeles');
      let signed_date_time = _date.utc().format();
      $('#signed_date_time').val(signed_date_time)
      console.log(sessionStorage);
      let signature_params = {
        access_key: 'a7fbe645161332148407a59b415fa70f',
        profile_id: "8A201E1E-A219-4AD6-ABF3-FD07E1A2C226",
        transaction_uuid: uuid.v1(),//'58e7adfb-0cf8-4c59-83fe-fa1a29589cc5',//uuidv1(),
        //transaction_uuid: "10c173a1-dae9-4c4b-9fa3-3bcf3db5bbfe",
        signed_field_names: 'access_key,profile_id,transaction_uuid,signed_field_names,unsigned_field_names,signed_date_time,locale,transaction_type,reference_number,amount,currency,payment_method,bill_to_forename,bill_to_surname,bill_to_email,bill_to_phone,bill_to_address_line1,bill_to_address_city,bill_to_address_state,bill_to_address_country,bill_to_address_postal_code',
        unsigned_field_names: 'card_type,card_number,card_expiry_date',
        signed_date_time: signed_date_time,
        locale: 'en-US',
        transaction_type: 'create_payment_token',
        reference_number: user_data.aff2 + "V" + cookie.load('visit_id'),  //document.getElementById("reference_number").value,    //"ARC2438TI007V2001",
        amount: this.props.amount,
        currency: 'USD',
        payment_method: 'card',
        bill_to_forename: user_data.first_name,
        bill_to_surname: user_data.last_name,
        bill_to_email: user_data.email,
        bill_to_phone: user_data.phone_number ? user_data.phone_number : "2106666666",
        bill_to_address_line1: user_data.apt_no,
        bill_to_address_city: user_data.city,
        bill_to_address_state: user_data.state,
        bill_to_address_country: user_data.country,
        bill_to_address_postal_code: this.props.zipcode,
        // card_num: user_data.card_number,
      }
      console.log('####################### SIGNATURE PARAMS ###################');
      console.log(JSON.stringify(signature_params));
      var dataToSign = [];
      var _signedFieldArray = ["access_key", "profile_id", "transaction_uuid", "signed_field_names", "unsigned_field_names", "signed_date_time", "locale", "transaction_type", "reference_number", "amount", "currency", "payment_method", "bill_to_forename", "bill_to_surname", "bill_to_email", "bill_to_phone", "bill_to_address_line1", "bill_to_address_city", "bill_to_address_state", "bill_to_address_country", "bill_to_address_postal_code"];
      console.log(_signedFieldArray);
      _signedFieldArray.forEach(function (item) {
        dataToSign.push(item + "=" + signature_params[item]);
      });
      dataToSign = dataToSign.join(",");
      var _hashInBase64 = CryptoJS.HmacSHA256(dataToSign, '5f8834d020be4a5683416c9a4cda62cfe26592c195a34a3ba38d3358fe7b5e25917bf381fdc94aa99f88583d439ea366c93591bd9bb64fcfb9ede5fd034c6fe8eb83fce2230c4b9590c6b97a968530541a69c56219924582b2f122f0c750b0a1c297580978a24a8bb0a7557af4e31a0eab5b0327ff0949cf9c94fe7f4dcee084').toString(CryptoJS.enc.Base64);
      signature_params.signature = _hashInBase64;
      console.log("signature: " + _hashInBase64);
      console.log('signed_date_time : ' + signed_date_time);
      console.log('transaction_uuid: ' + signature_params.transaction_uuid);
      // signature_params.card_expiry_date = user_data.expiry_date;
      // signature_params.card_number = user_data.card_number;
      // signature_params.card_type = CYBERSOURCE_CONFIG.card_type;


      // document.getElementById("card_number").value = signature_params.card_num;
      document.getElementById("signed_date_time").value = signature_params.signed_date_time;


      // document.getElementById("amount").value = signature_params.amount;


      // document.getElementById("bill_to_address_postal_code").value = signature_params.bill_to_address_postal_code;


      document.getElementById("bill_to_address_state").value = signature_params.bill_to_address_state;


      document.getElementById("bill_to_email").value = signature_params.bill_to_email;


      document.getElementById("reference_number").value = signature_params.reference_number;


      document.getElementById("bill_to_address_country").value = signature_params.bill_to_address_country;


      document.getElementById("bill_to_surname").value = signature_params.bill_to_surname;


      document.getElementById("bill_to_address_line1").value = signature_params.bill_to_address_line1;


      document.getElementById("bill_to_phone").value = signature_params.bill_to_phone;


      document.getElementById("bill_to_address_city").value = signature_params.bill_to_address_city;


      document.getElementById("bill_to_forename").value = signature_params.bill_to_forename;



      document.getElementById("transaction_uuid").value = signature_params.transaction_uuid;


      document.getElementById("signature").value = signature_params.signature;



      //HIDDEN FIELDS 
      // document.getElementById("unsigned_field_names").style.display = "none";
      // document.getElementById("signed_field_names").style.display = "none";
      // document.getElementById("locale").style.display = "none";
      // document.getElementById("transaction_type").style.display = "none";
      // document.getElementById("profile_id").style.display = "none";
      // document.getElementById("access_key").style.display = "none";
      // document.getElementById("currency").style.display = "none";
      // document.getElementById("payment_method").style.display = "none";


      // document.getElementById("card_type").value = signature_params.card_type;
      // document.getElementById("card_type").style.display = "none";

      // document.getElementById("card_number").value = signature_params.card_number;
      // //  document.getElementById("card_number").style.display = "none";

      // document.getElementById("card_expiry_date").value = signature_params.card_expiry_date;
      // document.getElementById("card_expiry_date").style.display = "none";



      document.getElementById("amount").style.display = "none";

      $('.button_click_cs').show()

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

  componentDidUpdate() {
    { $('.button_click_cs').click() }
  }

  cybersource__call = () => {

  }

  // function=()=>{

  // }

  check(res) {
    window.stop();
    // console.log('called', res);
    setTimeout(console.log(), 3000);
    $.ajax({
      // async: false,
      url: ApiList.current.ui_url + '/apiafficiency/cybersource/info/' + cookie.load('visit_id'),
      method: 'GET',
      dataType: "json",
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Origin': '*'
      },
      success: (data) => {
        console.log('data', data);
        window.stop();
        if (data.cybersource_status == 'ACCEPT') {
          // window.location.href = "https://ssdev.afficiency.com/life-insurance-instant-approval"
        } else {
          // window.location.href = "https://ssdev.afficiency.com/life-insurance-call-now"
        }
      },
      error: (err) => {
        console.log("ERROR in cyber source  " + JSON.stringify(err));

      }
    })

    // check(res) {
    //   window.stop();
    //   setTimeout(function(){console.log('data')}, 3000);
    //   fetch('https://ssdev.afficiency.com/apiafficiency/cybersource/info'+ '/'+1585, {
    //     method: 'GET',
    //   })
    //   .then((response) => response.json())
    //   .then((responseJSON) => {
    //     window.stop();
    //     console.log(responseJSON);
    //     if(responseJSON.cybersource_status == 'ACCEPT') {
    //       console.log('inside');
    //       window.location = "http://localhost:3000/life-insurance-online-payment"
    //     }
    //   })
    // }


    // fetch('https://ssdev.afficiency.com/apiaff/cybersource/info' + '/' + 1471, {
    //   method: 'GET'
    // })
    //   .then((response) => response.json())
    //   .then((responseJSON) => {
    //     console.log('called1', responseJSON);
    //     if (responseJSON.cybersource_status == 'ACCEPT') {

    //       console.log('inside');

    //       window.location = "http://localhost:3000/life-insurance-online-payment"
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   })
  }


  render() {
    const { cybersource_data } = this.state;
    console.log(this.props.card);
    // var options = "";
    // for (var key in cybersource_data) {
    //     options+='<input type="text" value='+cybersource_data[key]+' />'
    // }


    console.log(this.props)
    return (
      <div>
        {/* <div className="col-md-8 col-md-offset-2 mt4 mb3">
      <form method="POST" target="_blank" action="https://testsecureacceptance.cybersource.com/silent/token/create" enctype="application/x-www-form-urlencoded">
      <table className="cyber_source col-md-12">

      </table>
      <input type="submit" className="cyber_source_button_" value="CyberSourec Test" />
      </form>
      </div> */}
        <form id="payment_confirmation" style={{ display: 'none' }} className="col-md-12" action="https://testsecureacceptance.cybersource.com/silent/token/create" method="post">


          <input type="text" id="unsigned_field_names" name="unsigned_field_names" value="card_type,card_number,card_expiry_date" />
          {/* <input type="text" id="amount" name="amount" /> */}
          <input type="text" id="bill_to_address_postal_code" name="bill_to_address_postal_code" value={this.props.zipcode} />
          <input type="text" id="amount" name="amount" value={this.props.amount} />
          {/* <input type="text" id="bill_to_address_postal_code" name="bill_to_address_postal_code" /> */}

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
              <input type="text" id="card_type" name="card_type" value={this.props.type} />
              <input type="text" id="card_number" name="card_number" value={this.props.card} />
              <input type="text" id="card_expiry_date" name="card_expiry_date" value={this.props.exp} />
            </div>
          </fieldset>
          <input type="submit" id="submit" className="button_click_cs" value="Confirm " />


        </form>

      </div>


    )
  }

}