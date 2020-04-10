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

export const UserInfo: FunctionalComponent = () => {
  const userInfo = gtsportStore(state => state.userInfo);
  const setUserInfo = gtsportStore(state => state.setUserInfo);
  const userId = gtsportStore(state => state.userId);

  useEffect(() => {
    const getUserInfo = async () => {
      const response = await useUserInfoRequest(userId);
      setUserInfo(response.profile);
    };
    if (userId) {
      getUserInfo();
    }
  }, [userId]);

  return (
    <div class="mt-6 w-full">
      <h2 class="text-base text-xl">user info: </h2>
      <div class="bg-orange-700 text-2xl whitespace-pre-wrap">{JSON.stringify(userInfo)}</div>
    </div>
  );
};

export default UserInfo;
