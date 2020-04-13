import axios from 'axios';
import qs from 'querystring';

export async function serverSideRequest(url, params, responseCallback) {
  console.log({ params });

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Credentials': true,
      'User-Agent': 'PostmanRuntime',
    },
  };

  try {
    // const axiosInstance = axios.create({
    //   timeout: 10000,
    //   // withCredentials: true,
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //     'Access-Control-Allow-Credentials': true,
    //     'User-Agent': 'Postman',
    //   },
    //   // params: {
    //   //   id: 37880978,
    //   //   updateTime: -1,
    //   // },
    // });
    axios.defaults.withCredentials = true;

    const response = await axios.post(url, qs.stringify(params), config);
    console.log({
      request: response.request,
      config: response.config,
      status: response.status,
      data: response.data,
    });

    responseCallback({ status: response.status, body: JSON.stringify(response.data) });
  } catch (e) {
    console.log('*** axios request error, config: ***', e.config);
    responseCallback({ status: 400, body: JSON.stringify(e) });
  }
}

export function parseSearchResponse(body) {
  const splitChunksOne = body.split('=');
  const splitChunksTwo = splitChunksOne[2].split('"');

  return splitChunksTwo[0];
}
