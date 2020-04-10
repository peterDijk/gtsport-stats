import { h, FunctionalComponent } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { Router, RouterOnChangeArgs } from 'preact-router';
import shallow from 'zustand/shallow';

import Header from './components/Header';
import Home from './routes/Home';
import { gtsportStore } from './lib/hooks/gtsportStore';
import { useUserInfoRequest } from './lib/hooks/useGtsportRequest';

const App: FunctionalComponent = () => {
  const handleRoute = (args: RouterOnChangeArgs) => {
    // console.log('do something with route?', { args });
  };

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
