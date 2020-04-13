import axios from 'axios';
import qs from 'querystring';

export async function serverSideRequest(url, params, responseCallback) {
  console.log({ params });

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Credentials': true,
      cookie:
        '__cfduid=d48e78e5652d74784f3febbdab6e4604c1586798090; PHPSESSID=kh8sn6493cacushkn97dmji412; __utmc=137753130; __utmz=137753130.1586798089.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); __utma=137753130.799065148.1586798089.1586798089.1586801369.2; __utmt=1; __utmb=137753130.1.10.1586801369; __atuvc=2%7C16; __atuvs=5e94aad960611dc5000',
    },
  };

  try {
    const response = await axios.post(url, qs.stringify(params), config);
    console.log({
      succesfulResponseRequestHeaders: response.headers,
      status: response.status,
      data: response.data,
    });

    // responseCallback({ status: response.status, body: JSON.stringify(response.data) });
  } catch (e) {
    console.log('*** axios request error ***', e);
    responseCallback({ status: 400, body: JSON.stringify(e) });
  }
}

export function parseSearchResponse(body) {
  const splitChunksOne = body.split('=');
  const splitChunksTwo = splitChunksOne[2].split('"');

  return splitChunksTwo[0];
}
