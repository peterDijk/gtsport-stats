import { serverSideRequest, parseSearchResponse } from './lib';

import { config as dotenvConfig } from 'dotenv';
dotenvConfig();

exports.handler = function(event, context, callback) {
  if (!process.env.SEARCH_PROFILE_API) {
    callback(null, {
      statusCode: 500,
      body: 'no environment variables detected',
    });
    return;
  }

  const lambdaResponse = response => {
    callback(null, {
      statusCode: response.status,
      body: JSON.stringify({ user_no: parseSearchResponse(JSON.parse(response.body)) }),
    });
  };

  const envParams = JSON.parse(process.env.SEARCH_PARAMS);

  const queryStringParameters = {
    ...envParams,
    [envParams.username_field]: event.queryStringParameters.username,
  };

  serverSideRequest(`${process.env.SEARCH_PROFILE_API_EXT}`, queryStringParameters, lambdaResponse);
};
