import axios from 'axios';
import { serverSidePostRequest, parseSearchResponse } from './lib';

var FormData = require('form-data');

import { config as dotenvConfig } from 'dotenv';
dotenvConfig();

exports.handler = async function(event, context, callback) {
  if (!process.env.SEARCH_PROFILE_API) {
    callback(null, {
      headers: {
        "Access-Control-Allow-Origin": "*", // Allow from anywhere 
      },
      statusCode: 500,
      body: 'no environment variables detected',
    });
    return;
  }

  const lambdaResponse = response => {

    callback(null, {
      headers: {
        "Access-Control-Allow-Origin": "*", // Allow from anywhere 
      },      
      statusCode: response.status,
      body: JSON.stringify({ user_no: parseSearchResponse(JSON.parse(response.body)) }),
    });
  };

  const queryStringParameters = event.queryStringParameters;

  const config = { "kudosPrimeApi": "https://www.kudosprime.com/gts/gt_com_api.php" };

   let formdata = new FormData();
   formdata.append('mode', 'get_profile_by_name');
   formdata.append('output', 'links');
   formdata.append('online_id[]', queryStringParameters.online_id);

   let requestOptions = {
        method: 'POST',
        url: config.kudosPrimeApi,
        data: formdata,
        headers: formdata.getHeaders(),
    };

    const response = await axios({...requestOptions});
    console.log({ response })
    lambdaResponse({ status: response.status, body: JSON.stringify(response.data)});
};
