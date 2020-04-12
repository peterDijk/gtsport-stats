import { h, FunctionalComponent } from 'preact';

const Test: FunctionalComponent<{ testParam?: string }> = ({ testParam }) => {
  console.log({ testParam });
  return <div>TESTEST</div>;
};

export default Test;
