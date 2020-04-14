import { serverSidePostRequest, parseSearchResponse } from './lib';

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

  const queryStringParameters = event.queryStringParameters;

  serverSidePostRequest(
    `${process.env.SEARCH_PROFILE_API_EXT}`,
    queryStringParameters,
    lambdaResponse,
  );
};
