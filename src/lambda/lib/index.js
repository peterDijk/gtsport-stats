import axios from 'axios';
import qs from 'querystring';

export async function serverSidePostRequest(url, params, responseCallback) {
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  try {
    const response = await axios.post(url, qs.stringify(params), config);

    console.log(response);

    responseCallback({ status: response.status, body: JSON.stringify(response.data) });
  } catch (e) {
    console.log('*** axios request error, e: ***', e);
    responseCallback({ status: 400, body: JSON.stringify(e) });
  }
}

export function parseSearchResponse(body) {
  console.log({ body });
  try {
    const splitChunksOne = body.split('=');
    const splitChunksTwo = splitChunksOne[2].split('"');

    return splitChunksTwo[0];
  } catch (e) {
    return '';
  }
}
