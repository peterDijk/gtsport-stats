import { h, FunctionalComponent } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { Router, RouterOnChangeArgs } from 'preact-router';
import shallow from 'zustand/shallow';

import Header from './components/Header';
import Home from './routes/Home';
import { testStore } from './lib/hooks/testStore';
import { gtsportStore } from './lib/hooks/gtsportStore';
import { useUserInfoRequest } from './lib/hooks/useGtsportRequest';

export const sleep = (time: number): Promise<string> =>
  new Promise(resolve => {
    setTimeout(() => resolve('Preact PWA - Typescript w/ Rollup Starter Pack'), time);
  });

const App: FunctionalComponent = () => {
  const handleRoute = (args: RouterOnChangeArgs) => {
    // console.log('do something with route?', { args });
  };

  const {
    statsDetails,
    setStatsHistory,
    setUserInfo,
    userInfo,
    statsHistory,
    setStatsDetails,
  } = gtsportStore(
    state => ({
      statsDetails: state.statsDetails,
      setStatsDetails: state.setStatsDetails,
      statsHistory: state.statsHistory,
      setStatsHistory: state.setStatsHistory,
      userInfo: state.userInfo,
      setUserInfo: state.setUserInfo,
    }),
    shallow,
  );

  useEffect(() => {
    const getUserInfo = async () => {
      const response = await useUserInfoRequest('10489475');
      setUserInfo(response.profile);
    };
    getUserInfo();
  }, []);

  useEffect(() => {
    console.log({
      statsDetails,
      setStatsHistory,
      setUserInfo,
      userInfo,
      statsHistory,
      setStatsDetails,
    });
  }, [statsDetails, setStatsHistory, setUserInfo, userInfo, statsHistory, setStatsDetails]);

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
