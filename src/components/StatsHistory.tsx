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
import {
  useUserInfoRequest,
  useStatsDetailsRequest,
  useStatsHistoryRequest,
} from '../lib/hooks/useGtsportRequest';
import { currentVsLastPoints } from '../lib/ratings';
import { parseStatsHistoryJson } from '../lib/fromJson';

export const StatsHistory: FunctionalComponent = () => {
  const statsHistory = gtsportStore(state => state.statsHistory);
  const setStatsHistory = gtsportStore(state => state.setStatsHistory);
  const userId = gtsportStore(state => state.userId);
  const triggerRequest = gtsportStore(state => state.triggerRequest);

  useEffect(() => {
    const getStatsHistory = async () => {
      const response = await useStatsHistoryRequest(userId);
      const parsedStatsHistory = parseStatsHistoryJson(response);

      setStatsHistory(parsedStatsHistory);
    };
    if (userId) {
      getStatsHistory();
    }
  }, [userId]);

  const {
    lastDriverPoints,
    previousDriverPoints,
    lastMannerPoints,
    previousMannerPoints,
  } = currentVsLastPoints(statsHistory);

  return (
    <div class="mt-6">
      <h2 class="text-base text-xl">stats history: </h2>
      <Rating
        title="Driver rating"
        current={lastDriverPoints}
        previous={previousDriverPoints}
        ratingRange={DriverRatingRanges}
      />
      <Rating
        title="Sportsmanship rating"
        current={lastMannerPoints}
        previous={previousMannerPoints}
        ratingRange={MannerRatingRanges}
      />
    </div>
  );
};

export default StatsDetails;
