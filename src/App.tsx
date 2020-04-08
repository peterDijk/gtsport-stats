import { h, FunctionalComponent } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { Router, RouterOnChangeArgs } from 'preact-router';
import shallow from 'zustand/shallow';

import Header from './components/Header';
import Home from './routes/Home';
import { testStore } from './lib/hooks/testStore';

export const sleep = (time: number): Promise<string> =>
  new Promise(resolve => {
    setTimeout(() => resolve('Preact PWA - Typescript w/ Rollup Starter Pack'), time);
  });

const App: FunctionalComponent = () => {
  const handleRoute = (args: RouterOnChangeArgs) => {
    console.log('do something with route?', { args });
  };

  const { text, setText } = testStore(
    state => ({ text: state.text, setText: state.setText }),
    shallow,
  );

  console.log({ text });
  useEffect(() => {
    setText('changeddddd');
  }, []);

  return (
    <div id="app" class="relative overflow-hidden mb-8 ">
      <Header />
      <Router onChange={handleRoute}>
        <Home path="/" />
      </Router>
    </div>
  );
};

export default App;
