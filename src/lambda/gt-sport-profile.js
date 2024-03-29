import { serverSidePostRequest } from './lib';
import { GT_API } from './lib/constants';

import { config as dotenvConfig } from 'dotenv';
dotenvConfig();

exports.handler = function(event, context, callback) {
  const lambdaResponse = response => {
    callback(null, {
      headers: {
        "Access-Control-Allow-Origin": "*", // Allow from anywhere 
      },
      statusCode: response.status,
      body: response.body,
    });
  };

  if (!process.env.GT_API) {
    callback(null, {
      statusCode: 500,
      body: 'no environment variables detected',
    });
  }

  const queryStringParameters = event.queryStringParameters;
  serverSidePostRequest(
    `${process.env.GT_API}${GT_API.profile}`,
    queryStringParameters,
    lambdaResponse,
  );
};
