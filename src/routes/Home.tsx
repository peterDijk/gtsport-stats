import { h, FunctionalComponent } from 'preact';
import { useEffect, useState, useRef } from 'preact/hooks';

import Router from 'preact-router';
import Match from 'preact-router/match';

import preactLocalStorage from 'preact-localstorage';

import { MdAutorenew } from 'preact-icons/md';
// import { useUserInfoContext } from '../../components/UserInfoProvider/UserInfoProvider';
import Rating from '../components/Rating';
import { DriverRatingRanges, MannerRatingRanges } from '../types';
import { gtsportStore } from '../lib/hooks/gtsportStore';
import { useUserInfoRequest } from '../lib/hooks/useGtsportRequest';
import UserInfo from '../components/UserInfo';
import StatsDetails from '../components/StatsDetails';
import { StatsHistory } from '../components/StatsHistory';

const Home: FunctionalComponent = () => {
  const fromLocalStorage = preactLocalStorage.get('local-user-id', '');
  const setUserId = gtsportStore(state => state.setUserId);
  const userId = gtsportStore(state => state.userId);

  useEffect(() => {
    if (fromLocalStorage) {
      setUserId(fromLocalStorage);
    }
    if (!fromLocalStorage) {
      preactLocalStorage.set('local-user-id', userId);
    }
  }, [userId]);

  return (
    <div>
      <div class="relative">Home</div>

      <input
        class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 mb-4 block w-full appearance-none leading-normal text-gray-600"
        type="text"
        placeholder="gran turismo user id"
        value={userId}
        onChange={(e: any) => setUserId(e.target.value)}
      />
      <UserInfo />
      {/* <StatsDetails /> */}
      <StatsHistory />
    </div>
  );
  // const {
  //   user_no,
  //   setUser_no,
  //   userInfo,
  //   getUserInfo,
  //   statsDetails,
  //   getStatsDetails,
  //   statsHistory,
  //   getStatsHistory,
  //   error,
  //   loading,
  // } = useUserInfoContext();
  // const onRenew = () => {
  //   getStatsHistory();
  //   // getStatsDetails();
  // };
  // const lastMonth = statsHistory?.[statsHistory?.length - 1] ?? null;
  // const lastMonthFilteredDriverPoints = lastMonth?.driverPoints.filter(points => points !== 0);
  // const lastDriverPoints =
  //   lastMonthFilteredDriverPoints?.[lastMonthFilteredDriverPoints?.length - 1] ?? null;
  // const previousDriverPoints =
  //   lastMonthFilteredDriverPoints?.[lastMonthFilteredDriverPoints?.length - 2] ?? null;
  // const lastMonthFilteredMannerPoints = lastMonth?.mannerPoints.filter(points => points !== 0);
  // const lastMannerPoints =
  //   lastMonthFilteredMannerPoints?.[lastMonthFilteredMannerPoints?.length - 1] ?? null;
  // const previousMannerPoints =
  //   lastMonthFilteredMannerPoints?.[lastMonthFilteredMannerPoints?.length - 2] ?? null;
  // return (
  //   <div class="bg-white rounded-t-lg rounded-b-lg overflow-hidden border-t border-l border-r border-b border-gray-400 p-2 bg-gray-200 px-6 py-8 flex-col items-center">
  //     <input
  //       class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 mb-4 block w-full appearance-none leading-normal text-gray-600"
  //       type="text"
  //       placeholder="gran turismo user id"
  //       value={user_no}
  //       onChange={(e: any) => setUser_no(e.target.value)}
  //     />
  //     <div class="flex flex-row">
  //       <div class="w-2/4 mx-auto flex p-3 m-3 bg-white rounded-lg shadow-xl">
  //         <div class="ml-6 pt-1">
  //           <p class="text-base text-gray-600 leading-normal">driver</p>
  //           <h4 class="text-xl text-gray-900 leading-tight">{userInfo?.id ?? '..'}</h4>
  //         </div>
  //       </div>
  //       <button
  //         onClick={onRenew}
  //         class={`bg-white rounded-t-lg rounded-b-lg text-3xl px-3 py-3 mx-auto flex ${loading &&
  //           `text-gray-600`}`}
  //       >
  //         <MdAutorenew />
  //       </button>
  //     </div>
  //     <Rating
  //       title="Driver rating"
  //       current={lastDriverPoints}
  //       previous={previousDriverPoints}
  //       ratingRange={DriverRatingRanges}
  //     />
  //     <Rating
  //       title="Sportsmanship rating"
  //       current={lastMannerPoints}
  //       previous={previousMannerPoints}
  //       ratingRange={MannerRatingRanges}
  //     />
  //   </div>
  // );
};

export default Home;
