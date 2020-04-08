import axios from 'axios';
import qs, { ParsedUrlQueryInput } from 'querystring';
import { ResponseParams } from '../gt-sport-profile';

export async function serverSideRequest(url, params, responseCallback) {
  console.log({ params });

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  try {
    const response = await axios.post(url, qs.stringify(params), config);

    responseCallback({ status: response.status, body: JSON.stringify(response.data) });
  } catch (e) {
    console.log(e);
    responseCallback({ status: 400, body: JSON.stringify(e) });
  }
}
