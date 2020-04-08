import { h, FunctionComponent } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import axios from 'axios';

export const sleep = (time: number): Promise<string> =>
  new Promise(resolve => {
    setTimeout(() => resolve('Preact PWA - Typescript w/ Rollup Starter Pack'), time);
  });

const host = '/.netlify/functions/gt-sport-profile';

export const App: FunctionComponent = () => {
  const [text, setText] = useState<string>('...');

  useEffect(() => {
    async function getResponse() {
      const response = await axios.post(host, null, { params: { job: '1', user_no: '10489475' } });
      console.log({ data: response.data });
    }
    setText('GT Sport Stats PWA rating checker');
    getResponse();
  }, []);

  return (
    <div>
      <div>
        <a href="https://github.com/peterDijk/preact-typescript-rollup-starter" target="_blank">
          <img src="images/GitHub-Mark-Light-32px.png" />
        </a>
      </div>
      {text}
    </div>
  );
};
