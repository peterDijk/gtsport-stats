import { serverSideRequest } from './lib';
import { GT_API } from './lib/constants';

exports.handler = function (event, context, callback) {
  const lambdaResponse = (response) => {
    callback(null, {
      statusCode: response.status,
      body: response.body,
    });
  };

  const queryStringParameters = event.queryStringParameters;
  serverSideRequest(`${GT_API.host}${GT_API.profile}`, queryStringParameters, lambdaResponse);
};
